const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 200
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'networkidle'
    });
    
    await page.waitForTimeout(2000);
    
    // The inputs expect animal names, not numbers
    console.log('Entering animal names in Korean...');
    
    // Enter animal names for each time period
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    await page.waitForTimeout(1000);
    
    // Click the green calculate button
    console.log('Clicking calculate button...');
    const calculateButton = await page.$('button.btn-success');
    if (calculateButton) {
      await calculateButton.click();
      await page.waitForTimeout(3000);
    }
    
    // Wait for any results to appear
    console.log('Waiting for results...');
    await page.waitForTimeout(2000);
    
    // Check what's visible on the page
    const pageState = await page.evaluate(() => {
      // Find all visible elements
      const visibleElements = [];
      
      // Check for tables
      document.querySelectorAll('table').forEach((table, idx) => {
        if (table.offsetParent !== null) { // Element is visible
          visibleElements.push({
            type: 'table',
            index: idx,
            display: window.getComputedStyle(table).display,
            visibility: window.getComputedStyle(table).visibility,
            backgroundColor: window.getComputedStyle(table).backgroundColor
          });
        }
      });
      
      // Check for modals
      document.querySelectorAll('.modal, [role="dialog"]').forEach((modal, idx) => {
        const styles = window.getComputedStyle(modal);
        if (styles.display !== 'none' && styles.visibility !== 'hidden') {
          visibleElements.push({
            type: 'modal',
            index: idx,
            classes: modal.className,
            display: styles.display,
            visibility: styles.visibility
          });
        }
      });
      
      // Check for any results divs
      document.querySelectorAll('[class*="result"], [id*="result"]').forEach((result, idx) => {
        if (result.offsetParent !== null) {
          visibleElements.push({
            type: 'result',
            index: idx,
            id: result.id,
            classes: result.className,
            text: result.textContent.substring(0, 100)
          });
        }
      });
      
      return visibleElements;
    });
    
    console.log('Visible elements:', pageState);
    
    // Try to find and screenshot the results table specifically
    const resultSelectors = [
      'table:visible',
      '.modal:visible table',
      '#resultsModal table',
      '.results-table',
      'table:has(td:has-text("점수"))',
      'table:has(td:has-text("Total"))',
      'table:has(td:has-text("합계"))'
    ];
    
    let foundResult = false;
    for (const selector of resultSelectors) {
      try {
        const element = await page.$(selector);
        if (element && await element.isVisible()) {
          console.log(`Found visible element with selector: ${selector}`);
          
          // Analyze the styling
          const analysis = await element.evaluate(el => {
            const styles = window.getComputedStyle(el);
            const analysis = {
              element: el.tagName,
              backgroundColor: styles.backgroundColor,
              color: styles.color,
              border: styles.border,
              display: styles.display
            };
            
            // If it's a table, analyze rows
            if (el.tagName === 'TABLE') {
              analysis.rows = [];
              el.querySelectorAll('tr').forEach((row, idx) => {
                const rowStyles = window.getComputedStyle(row);
                const rowData = {
                  index: idx,
                  backgroundColor: rowStyles.backgroundColor,
                  cells: []
                };
                
                row.querySelectorAll('td, th').forEach(cell => {
                  const cellStyles = window.getComputedStyle(cell);
                  rowData.cells.push({
                    text: cell.textContent.trim(),
                    backgroundColor: cellStyles.backgroundColor,
                    color: cellStyles.color
                  });
                });
                
                analysis.rows.push(rowData);
              });
            }
            
            return analysis;
          });
          
          console.log('\nElement analysis:', JSON.stringify(analysis, null, 2));
          
          // Take screenshot
          const box = await element.boundingBox();
          if (box) {
            await page.screenshot({
              path: `cft-result-${selector.replace(/[^a-z0-9]/gi, '_')}.png`,
              clip: {
                x: Math.max(0, box.x - 10),
                y: Math.max(0, box.y - 10),
                width: box.width + 20,
                height: box.height + 20
              }
            });
            console.log(`Screenshot saved for ${selector}`);
            foundResult = true;
          }
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    // If we found a modal, try to screenshot the entire modal
    const modal = await page.$('.modal.show, .modal.in, .modal[style*="display: block"]');
    if (modal) {
      console.log('Found visible modal');
      const modalBox = await modal.boundingBox();
      if (modalBox) {
        await page.screenshot({
          path: 'cft-modal-full.png',
          clip: modalBox
        });
        console.log('Modal screenshot saved');
      }
    }
    
    // Take a final full page screenshot
    await page.screenshot({
      path: 'cft-final-full-page.png',
      fullPage: true
    });
    console.log('Full page screenshot saved');
    
    // Also take viewport screenshot
    await page.screenshot({
      path: 'cft-final-viewport.png'
    });
    console.log('Viewport screenshot saved');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('\nKeeping browser open for 15 seconds...');
    await page.waitForTimeout(15000);
    await browser.close();
  }
})();