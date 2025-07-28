const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 // Slower to see what's happening
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the CFT scoring page
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'networkidle'
    });
    
    // Wait for the page to be fully loaded
    await page.waitForTimeout(2000);
    
    // Fill in demographic data first
    console.log('Filling in demographic data...');
    
    // Fill ID
    await page.fill('input#subjectId', '12345');
    
    // Select gender (male)
    await page.click('input[value="남성"]');
    
    // Fill age
    await page.fill('input#age', '65');
    
    // Fill education years
    await page.fill('input#education', '12');
    
    // Fill in test data for each time section
    console.log('Filling in test scores for each time section...');
    
    // 0-15 seconds
    await page.fill('input#input-0-15', '6');
    
    // 15-30 seconds
    await page.fill('input#input-15-30', '5');
    
    // 30-45 seconds
    await page.fill('input#input-30-45', '4');
    
    // 45-60 seconds
    await page.fill('input#input-45-60', '3');
    
    // Wait a moment
    await page.waitForTimeout(1000);
    
    // Click the calculate button (green button)
    console.log('Clicking calculate button...');
    const calculateButton = await page.$('button:has-text("점수 계산하기"), button.btn-success');
    if (calculateButton) {
      await calculateButton.click();
      await page.waitForTimeout(3000); // Wait for calculation
    }
    
    // Now look for the results
    console.log('\nLooking for results...');
    
    // Check if a results modal or section appeared
    const resultModal = await page.$('.modal.show, .modal.in, [role="dialog"]:visible');
    if (resultModal) {
      console.log('Found results modal');
      
      // Take screenshot of the modal
      const modalBox = await resultModal.boundingBox();
      if (modalBox) {
        await page.screenshot({
          path: 'cft-results-modal.png',
          clip: {
            x: modalBox.x - 10,
            y: modalBox.y - 10,
            width: modalBox.width + 20,
            height: modalBox.height + 20
          }
        });
        console.log('Results modal screenshot saved');
      }
    }
    
    // Look for any results table that may have appeared
    const resultsTable = await page.$('table:visible');
    if (resultsTable) {
      // Analyze the table styling
      const tableAnalysis = await resultsTable.evaluate(table => {
        const analysis = {
          tableStyles: window.getComputedStyle(table),
          rows: []
        };
        
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
          const rowData = {
            index: rowIndex,
            styles: {
              backgroundColor: window.getComputedStyle(row).backgroundColor,
              color: window.getComputedStyle(row).color,
              border: window.getComputedStyle(row).border
            },
            cells: []
          };
          
          const cells = row.querySelectorAll('td, th');
          cells.forEach((cell, cellIndex) => {
            rowData.cells.push({
              index: cellIndex,
              tagName: cell.tagName,
              text: cell.textContent.trim(),
              styles: {
                backgroundColor: window.getComputedStyle(cell).backgroundColor,
                color: window.getComputedStyle(cell).color,
                border: window.getComputedStyle(cell).border,
                padding: window.getComputedStyle(cell).padding
              }
            });
          });
          
          analysis.rows.push(rowData);
        });
        
        return analysis;
      });
      
      console.log('\nDetailed table analysis:');
      console.log('Table background:', tableAnalysis.tableStyles.backgroundColor);
      
      tableAnalysis.rows.forEach(row => {
        console.log(`\nRow ${row.index}:`);
        console.log('  Background:', row.styles.backgroundColor);
        row.cells.forEach(cell => {
          console.log(`  ${cell.tagName} [${cell.index}]: "${cell.text}"`);
          console.log(`    Background: ${cell.styles.backgroundColor}`);
        });
      });
      
      // Take close-up screenshot of the table
      const tableBox = await resultsTable.boundingBox();
      if (tableBox) {
        await page.screenshot({
          path: 'cft-results-table-closeup.png',
          clip: {
            x: tableBox.x - 5,
            y: tableBox.y - 5,
            width: tableBox.width + 10,
            height: tableBox.height + 10
          }
        });
        console.log('\nResults table close-up screenshot saved');
      }
    }
    
    // Also check for any alert or notification with results
    const alerts = await page.$$('.alert, .notification, .result-message');
    if (alerts.length > 0) {
      console.log(`\nFound ${alerts.length} alert/notification elements`);
      for (const alert of alerts) {
        const text = await alert.textContent();
        console.log('Alert text:', text);
      }
    }
    
    // Take a full page screenshot after calculation
    await page.screenshot({ 
      path: 'cft-after-calculation.png',
      fullPage: true
    });
    console.log('\nFull page screenshot after calculation saved');
    
    // Check what changed on the page
    const pageContent = await page.content();
    if (pageContent.includes('결과') || pageContent.includes('점수') || pageContent.includes('Result') || pageContent.includes('Score')) {
      console.log('\nPage contains results-related text');
    }
    
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Keep browser open for inspection
    console.log('\nKeeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
})();