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
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Fill animal names
    console.log('Entering animal names...');
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    // Click calculate
    console.log('Clicking calculate button...');
    await page.evaluate(() => {
      const btn = document.querySelector('button.calculate-btn');
      if (btn) btn.click();
    });
    
    // Wait a bit
    await page.waitForTimeout(2000);
    
    // Force show any hidden modals
    console.log('\nForcing display of any hidden modals...');
    const modalInfo = await page.evaluate(() => {
      const modals = document.querySelectorAll('.modal, [class*="modal"], #resultsModal');
      const modalData = [];
      
      modals.forEach((modal, idx) => {
        const originalDisplay = window.getComputedStyle(modal).display;
        const originalVisibility = window.getComputedStyle(modal).visibility;
        
        // Force show the modal
        modal.style.display = 'block';
        modal.style.visibility = 'visible';
        modal.style.opacity = '1';
        modal.classList.add('show');
        
        // Remove any fade class
        modal.classList.remove('fade');
        
        // Check for backdrop
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.style.display = 'block';
          backdrop.style.opacity = '0.5';
        }
        
        modalData.push({
          index: idx,
          id: modal.id,
          className: modal.className,
          originalDisplay,
          originalVisibility,
          hasTable: modal.querySelector('table') !== null,
          content: modal.textContent.substring(0, 200)
        });
      });
      
      return modalData;
    });
    
    console.log('Modal information:', modalInfo);
    
    if (modalInfo.length > 0) {
      console.log(`\nFound ${modalInfo.length} modals, forcing them to display`);
      
      // Wait for content to render
      await page.waitForTimeout(2000);
      
      // Take screenshots of each modal
      for (let i = 0; i < modalInfo.length; i++) {
        if (modalInfo[i].hasTable) {
          console.log(`\nModal ${i + 1} contains a table!`);
          
          // Screenshot the entire modal
          const modal = await page.$(`.modal:nth-of-type(${i + 1}), #${modalInfo[i].id}`);
          if (modal) {
            const box = await modal.boundingBox();
            if (box) {
              await page.screenshot({
                path: `cft-forced-modal-${i + 1}.png`,
                clip: box
              });
              console.log(`Modal ${i + 1} screenshot saved`);
            }
          }
          
          // Find and analyze the table
          const table = await page.$(`#${modalInfo[i].id} table, .modal:nth-of-type(${i + 1}) table`);
          if (table) {
            console.log('Analyzing table in modal...');
            
            const tableAnalysis = await table.evaluate(table => {
              const analysis = {
                rowCount: table.rows.length,
                columnCount: table.rows[0] ? table.rows[0].cells.length : 0,
                tableBackground: window.getComputedStyle(table).backgroundColor,
                rows: []
              };
              
              // Analyze each row
              for (let i = 0; i < table.rows.length; i++) {
                const row = table.rows[i];
                const rowData = {
                  index: i,
                  backgroundColor: window.getComputedStyle(row).backgroundColor,
                  cells: []
                };
                
                // Analyze each cell
                for (let j = 0; j < row.cells.length; j++) {
                  const cell = row.cells[j];
                  const cellStyle = window.getComputedStyle(cell);
                  rowData.cells.push({
                    text: cell.textContent.trim(),
                    tagName: cell.tagName,
                    backgroundColor: cellStyle.backgroundColor,
                    color: cellStyle.color,
                    border: cellStyle.border,
                    isGray: false
                  });
                  
                  // Check if background is gray
                  const bg = cellStyle.backgroundColor;
                  if (bg && bg !== 'rgba(0, 0, 0, 0)') {
                    const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                    if (match) {
                      const [_, r, g, b] = match;
                      if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
                        rowData.cells[rowData.cells.length - 1].isGray = true;
                      }
                    }
                  }
                }
                
                analysis.rows.push(rowData);
              }
              
              return analysis;
            });
            
            console.log('\nTable Analysis Results:');
            console.log(`Table has ${tableAnalysis.rowCount} rows and ${tableAnalysis.columnCount} columns`);
            console.log(`Table background: ${tableAnalysis.tableBackground}`);
            
            console.log('\nRow-by-row analysis:');
            tableAnalysis.rows.forEach(row => {
              console.log(`\nRow ${row.index + 1} (Background: ${row.backgroundColor}):`);
              row.cells.forEach((cell, idx) => {
                const grayIndicator = cell.isGray ? ' [GRAY]' : '';
                console.log(`  ${cell.tagName} ${idx + 1}: "${cell.text}"${grayIndicator}`);
                console.log(`    Background: ${cell.backgroundColor}, Color: ${cell.color}`);
              });
            });
            
            // Take close-up of just the table
            const tableBox = await table.boundingBox();
            if (tableBox) {
              await page.screenshot({
                path: `cft-forced-table-closeup-${i + 1}.png`,
                clip: {
                  x: Math.max(0, tableBox.x - 5),
                  y: Math.max(0, tableBox.y - 5),
                  width: tableBox.width + 10,
                  height: tableBox.height + 10
                }
              });
              console.log(`Table close-up screenshot saved as cft-forced-table-closeup-${i + 1}.png`);
            }
          }
        }
      }
    }
    
    // Also check for results in the main page
    console.log('\nChecking for results in main page...');
    const resultsOnPage = await page.evaluate(() => {
      const elements = [];
      document.querySelectorAll('table, .results, [class*="score"], [class*="result"]').forEach(el => {
        if (el.offsetParent !== null || window.getComputedStyle(el).display !== 'none') {
          elements.push({
            tagName: el.tagName,
            className: el.className,
            id: el.id,
            text: el.textContent.substring(0, 100)
          });
        }
      });
      return elements;
    });
    
    console.log('Visible result elements:', resultsOnPage);
    
    // Final full page screenshot
    await page.screenshot({
      path: 'cft-forced-final-state.png',
      fullPage: true
    });
    
    console.log('\nAll screenshots saved!');
    console.log('Check these files:');
    console.log('- cft-forced-modal-*.png (forced modal displays)');
    console.log('- cft-forced-table-closeup-*.png (table close-ups)');
    console.log('- cft-forced-final-state.png (final page state)');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\nKeeping browser open for 30 seconds...');
    await page.waitForTimeout(30000);
    await browser.close();
  }
})();