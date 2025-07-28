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
    
    await page.waitForTimeout(3000);
    
    // Fill in all required fields
    console.log('Filling in form data...');
    
    // Demographics (optional but let's fill them)
    await page.fill('#subjectId', 'TEST001');
    
    // Try to select gender
    const maleRadio = await page.$('#gender-male');
    if (maleRadio) {
      await maleRadio.click();
    }
    
    await page.fill('#age', '65');
    await page.fill('#education', '12');
    
    // Enter animal names
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    await page.waitForTimeout(1000);
    
    // Click calculate button
    console.log('Clicking calculate button...');
    await page.click('button.calculate-btn, button:has-text("점수 계산하기")');
    
    // Wait for modal or results to appear
    console.log('Waiting for results...');
    
    // Method 1: Wait for modal
    try {
      await page.waitForSelector('.modal.show, .modal[style*="display: block"], #resultsModal', {
        timeout: 5000
      });
      console.log('Modal appeared!');
      
      // Wait a bit for content to load
      await page.waitForTimeout(2000);
      
      // Look for results table in modal
      const modalTable = await page.$('.modal table, #resultsModal table');
      if (modalTable) {
        console.log('Found table in modal');
        
        // Analyze the table
        const tableData = await modalTable.evaluate(table => {
          const data = {
            headers: [],
            rows: []
          };
          
          // Get headers
          const headers = table.querySelectorAll('th');
          headers.forEach(th => {
            data.headers.push({
              text: th.textContent.trim(),
              backgroundColor: window.getComputedStyle(th).backgroundColor
            });
          });
          
          // Get all rows
          const rows = table.querySelectorAll('tr');
          rows.forEach((row, rowIdx) => {
            const rowData = {
              index: rowIdx,
              backgroundColor: window.getComputedStyle(row).backgroundColor,
              cells: []
            };
            
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
              rowData.cells.push({
                text: cell.textContent.trim(),
                backgroundColor: window.getComputedStyle(cell).backgroundColor,
                color: window.getComputedStyle(cell).color
              });
            });
            
            if (rowData.cells.length > 0) {
              data.rows.push(rowData);
            }
          });
          
          return data;
        });
        
        console.log('\nTable Analysis:');
        console.log('Headers:', tableData.headers);
        console.log('\nRows with styling:');
        tableData.rows.forEach(row => {
          console.log(`Row ${row.index}:`);
          console.log(`  Background: ${row.backgroundColor}`);
          row.cells.forEach((cell, idx) => {
            console.log(`  Cell ${idx}: "${cell.text}" (bg: ${cell.backgroundColor}, color: ${cell.color})`);
          });
        });
        
        // Take screenshot of modal
        const modal = await page.$('.modal.show, .modal[style*="display: block"]');
        if (modal) {
          const modalBox = await modal.boundingBox();
          if (modalBox) {
            await page.screenshot({
              path: 'cft-results-modal-full.png',
              clip: modalBox
            });
            console.log('\nModal screenshot saved as cft-results-modal-full.png');
          }
        }
        
        // Take close-up of just the table
        const tableBox = await modalTable.boundingBox();
        if (tableBox) {
          await page.screenshot({
            path: 'cft-results-table-only.png',
            clip: {
              x: Math.max(0, tableBox.x - 5),
              y: Math.max(0, tableBox.y - 5),
              width: tableBox.width + 10,
              height: tableBox.height + 10
            }
          });
          console.log('Table close-up saved as cft-results-table-only.png');
        }
      }
      
    } catch (e) {
      console.log('No modal found, checking for inline results...');
    }
    
    // Method 2: Check for any results section
    const resultsSection = await page.$('[class*="result"], [id*="result"], .score-display');
    if (resultsSection) {
      console.log('Found results section');
      const resultsBox = await resultsSection.boundingBox();
      if (resultsBox) {
        await page.screenshot({
          path: 'cft-results-section.png',
          clip: resultsBox
        });
      }
    }
    
    // Get all visible elements with gray backgrounds
    console.log('\nChecking for gray elements...');
    const grayElements = await page.evaluate(() => {
      const elements = [];
      document.querySelectorAll('*').forEach(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        
        // Check for gray colors
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgbMatch = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (rgbMatch) {
            const [_, r, g, b] = rgbMatch;
            // Check if it's a shade of gray (r, g, b are close to each other)
            if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0 && el.offsetParent !== null) {
                elements.push({
                  tagName: el.tagName,
                  id: el.id,
                  className: el.className,
                  backgroundColor: bg,
                  text: el.textContent.substring(0, 50),
                  isTable: el.tagName === 'TABLE',
                  isTR: el.tagName === 'TR'
                });
              }
            }
          }
        }
      });
      return elements;
    });
    
    console.log(`Found ${grayElements.length} elements with gray backgrounds`);
    const tableElements = grayElements.filter(el => el.isTable || el.isTR);
    if (tableElements.length > 0) {
      console.log('\nGray table elements:');
      tableElements.forEach(el => {
        console.log(`- ${el.tagName}#${el.id}.${el.className} - Background: ${el.backgroundColor}`);
      });
    }
    
    // Final screenshots
    await page.screenshot({
      path: 'cft-complete-final.png',
      fullPage: true
    });
    
    // Also take a viewport screenshot
    await page.screenshot({
      path: 'cft-complete-viewport.png'
    });
    
    console.log('\nAll screenshots saved. Check the PNG files for results.');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\nKeeping browser open for 30 seconds for manual inspection...');
    console.log('You can interact with the page to see if results appear.');
    await page.waitForTimeout(30000);
    await browser.close();
  }
})();