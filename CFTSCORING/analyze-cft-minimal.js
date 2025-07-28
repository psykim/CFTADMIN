const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html');
    
    // Wait for page to stabilize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Just fill the animal names - skip demographics
    console.log('Entering animal names...');
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    await page.waitForTimeout(1000);
    
    // Force click the calculate button using JavaScript
    console.log('Clicking calculate button...');
    await page.evaluate(() => {
      const btn = document.querySelector('button.calculate-btn') || 
                  document.querySelector('button:has-text("점수 계산하기")') ||
                  Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('계산'));
      if (btn) {
        btn.click();
        console.log('Button clicked!');
      }
    });
    
    // Wait for any changes
    await page.waitForTimeout(3000);
    
    // Check page state after clicking
    console.log('\nChecking page state after calculation...');
    
    // Method 1: Check for any modal dialogs
    const modals = await page.$$('.modal');
    console.log(`Found ${modals.length} modal elements`);
    
    for (let i = 0; i < modals.length; i++) {
      const modalInfo = await modals[i].evaluate(modal => {
        const styles = window.getComputedStyle(modal);
        return {
          display: styles.display,
          visibility: styles.visibility,
          opacity: styles.opacity,
          classList: modal.classList.toString(),
          hasShow: modal.classList.contains('show'),
          innerHTML: modal.innerHTML.substring(0, 200)
        };
      });
      
      console.log(`\nModal ${i + 1}:`, modalInfo);
      
      if (modalInfo.display !== 'none' || modalInfo.hasShow) {
        console.log('This modal appears to be visible!');
        
        // Screenshot the modal
        const box = await modals[i].boundingBox();
        if (box) {
          await page.screenshot({
            path: `cft-modal-${i + 1}.png`,
            clip: box
          });
          console.log(`Modal ${i + 1} screenshot saved`);
        }
        
        // Look for table inside modal
        const modalTable = await modals[i].$('table');
        if (modalTable) {
          const tableBox = await modalTable.boundingBox();
          if (tableBox) {
            await page.screenshot({
              path: `cft-modal-table-${i + 1}.png`,
              clip: {
                x: Math.max(0, tableBox.x - 10),
                y: Math.max(0, tableBox.y - 10),
                width: tableBox.width + 20,
                height: tableBox.height + 20
              }
            });
            console.log(`Modal table ${i + 1} screenshot saved`);
            
            // Analyze table structure
            const tableAnalysis = await modalTable.evaluate(table => {
              const analysis = {
                rowCount: table.rows.length,
                rows: []
              };
              
              for (let i = 0; i < table.rows.length; i++) {
                const row = table.rows[i];
                const rowData = {
                  backgroundColor: window.getComputedStyle(row).backgroundColor,
                  cells: []
                };
                
                for (let j = 0; j < row.cells.length; j++) {
                  const cell = row.cells[j];
                  rowData.cells.push({
                    text: cell.textContent.trim(),
                    backgroundColor: window.getComputedStyle(cell).backgroundColor,
                    tagName: cell.tagName
                  });
                }
                
                analysis.rows.push(rowData);
              }
              
              return analysis;
            });
            
            console.log('\nTable analysis:');
            tableAnalysis.rows.forEach((row, idx) => {
              console.log(`Row ${idx + 1} - Background: ${row.backgroundColor}`);
              row.cells.forEach((cell, cellIdx) => {
                console.log(`  ${cell.tagName} ${cellIdx + 1}: "${cell.text}" (bg: ${cell.backgroundColor})`);
              });
            });
          }
        }
      }
    }
    
    // Method 2: Check if page content changed
    const pageText = await page.textContent('body');
    if (pageText.includes('결과') || pageText.includes('점수') || pageText.includes('총점')) {
      console.log('\nPage contains result-related text');
    }
    
    // Method 3: Look for any new visible tables
    const allTables = await page.$$('table:visible');
    console.log(`\nFound ${allTables.length} visible tables`);
    
    // Take final screenshots
    await page.screenshot({
      path: 'cft-minimal-final.png',
      fullPage: true
    });
    
    await page.screenshot({
      path: 'cft-minimal-viewport.png'
    });
    
    console.log('\nScreenshots saved. Please check:');
    console.log('- cft-minimal-final.png (full page)');
    console.log('- cft-minimal-viewport.png (viewport)');
    console.log('- cft-modal-*.png (if any modals were found)');
    console.log('- cft-modal-table-*.png (if any tables in modals were found)');
    
  } catch (error) {
    console.error('Error:', error.message);
    
    // Take error screenshot
    await page.screenshot({
      path: 'cft-error-state.png',
      fullPage: true
    });
  } finally {
    console.log('\nBrowser will remain open for 20 seconds...');
    await page.waitForTimeout(20000);
    await browser.close();
  }
})();