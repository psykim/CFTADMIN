const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    console.log('1. Navigating to CFTSCORING.html...');
    await page.goto(`file://${__dirname}/CFTSCORING.html`);
    await page.waitForTimeout(1000);
    
    console.log('2. Filling participant information...');
    await page.fill('#subjectId', 'TEST001');
    await page.fill('#age', '65');
    await page.click('#gender-male');
    await page.fill('#education', '12');
    
    console.log('3. Adding animal names for each time period...');
    const animals0_15 = ['개', '고양이', '소', '말', '돼지'];
    const animals15_30 = ['닭', '오리', '토끼', '호랑이', '사자'];
    const animals30_45 = ['코끼리', '기린', '원숭이', '곰', '여우'];
    const animals45_60 = ['늑대', '사슴', '다람쥐', '쥐', '뱀'];
    
    // Add animals for 0-15 seconds
    for (const animal of animals0_15) {
      await page.fill('#input-0-15', animal);
      await page.click('button[onclick="addResponse(\'0-15\')"]');
      await page.waitForTimeout(200);
    }
    
    // Add animals for 15-30 seconds
    for (const animal of animals15_30) {
      await page.fill('#input-15-30', animal);
      await page.click('button[onclick="addResponse(\'15-30\')"]');
      await page.waitForTimeout(200);
    }
    
    // Add animals for 30-45 seconds
    for (const animal of animals30_45) {
      await page.fill('#input-30-45', animal);
      await page.click('button[onclick="addResponse(\'30-45\')"]');
      await page.waitForTimeout(200);
    }
    
    // Add animals for 45-60 seconds
    for (const animal of animals45_60) {
      await page.fill('#input-45-60', animal);
      await page.click('button[onclick="addResponse(\'45-60\')"]');
      await page.waitForTimeout(200);
    }
    
    console.log('4. Clicking calculate button...');
    // Find and click the calculate button
    const calculateButton = await page.$('button:has-text("결과 계산"), button:has-text("계산"), button:has-text("Calculate")');
    if (calculateButton) {
      await calculateButton.click();
    } else {
      // Try to find by onclick attribute
      await page.click('button[onclick*="calculate"]');
    }
    await page.waitForTimeout(2000);
    
    console.log('5. Making results visible...');
    await page.evaluate(() => {
      // Find and show results section
      const resultsDiv = document.getElementById('results') || 
                        document.querySelector('.results-section') ||
                        document.querySelector('[class*="result"]');
      if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.style.visibility = 'visible';
        resultsDiv.style.opacity = '1';
      }
      
      // Make score table visible
      const scoreTable = document.querySelector('.score-table') || 
                        document.querySelector('table[class*="score"]') ||
                        document.querySelector('table');
      if (scoreTable) {
        scoreTable.style.display = 'table';
        scoreTable.style.visibility = 'visible';
        scoreTable.style.opacity = '1';
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('6. Looking for score table...');
    // Try multiple selectors to find the score table
    const tableSelectors = [
      '.score-table',
      'table.score-table',
      'table[class*="score"]',
      '#scoreTable',
      'table'
    ];
    
    let scoreTable = null;
    for (const selector of tableSelectors) {
      scoreTable = await page.$(selector);
      if (scoreTable) {
        console.log(`Found table with selector: ${selector}`);
        break;
      }
    }
    
    if (!scoreTable) {
      console.log('No score table found. Taking full page screenshot...');
      await page.screenshot({ path: 'full-page-no-table.png', fullPage: true });
      
      // List all tables on the page
      const tables = await page.evaluate(() => {
        const allTables = document.querySelectorAll('table');
        return Array.from(allTables).map((table, index) => ({
          index,
          className: table.className,
          id: table.id,
          html: table.outerHTML.substring(0, 200)
        }));
      });
      console.log('Tables found on page:', JSON.stringify(tables, null, 2));
      
    } else {
      console.log('7. Analyzing score table structure and styles...');
      const tableAnalysis = await page.evaluate((selector) => {
        const table = document.querySelector(selector);
        if (!table) return { error: 'Score table not found' };
        
        // Get the first few rows HTML
        const rows = table.querySelectorAll('tr');
        const firstRowsHTML = Array.from(rows).slice(0, 5).map(row => row.outerHTML);
        
        // Look for score cells with various possible IDs/classes
        const totalScoreCell = document.getElementById('totalScore') || 
                              document.querySelector('[id*="total"]') ||
                              document.querySelector('.total-score');
                              
        const categoryScoreCell = document.getElementById('categoryScore') || 
                                 document.querySelector('[id*="category"]') ||
                                 document.querySelector('.category-score');
        
        const analysis = {
          tableFound: true,
          tableSelector: selector,
          tableHTML: table.outerHTML.substring(0, 2000),
          firstRowsHTML: firstRowsHTML,
          totalRowsCount: rows.length,
          
          totalScoreCell: totalScoreCell ? {
            exists: true,
            tagName: totalScoreCell.tagName,
            id: totalScoreCell.id,
            className: totalScoreCell.className,
            hasDataCellClass: totalScoreCell.classList.contains('data-cell'),
            computedBackgroundColor: window.getComputedStyle(totalScoreCell).backgroundColor,
            computedColor: window.getComputedStyle(totalScoreCell).color,
            textContent: totalScoreCell.textContent,
            innerHTML: totalScoreCell.innerHTML
          } : { exists: false },
          
          categoryScoreCell: categoryScoreCell ? {
            exists: true,
            tagName: categoryScoreCell.tagName,
            id: categoryScoreCell.id,
            className: categoryScoreCell.className,
            hasDataCellClass: categoryScoreCell.classList.contains('data-cell'),
            computedBackgroundColor: window.getComputedStyle(categoryScoreCell).backgroundColor,
            computedColor: window.getComputedStyle(categoryScoreCell).color,
            textContent: categoryScoreCell.textContent,
            innerHTML: categoryScoreCell.innerHTML
          } : { exists: false },
          
          // Check all cells with data-cell class
          dataCells: Array.from(table.querySelectorAll('.data-cell')).map(cell => ({
            tagName: cell.tagName,
            id: cell.id,
            className: cell.className,
            backgroundColor: window.getComputedStyle(cell).backgroundColor,
            textContent: cell.textContent
          })),
          
          // Check all td and th elements
          allCells: Array.from(table.querySelectorAll('td, th')).slice(0, 20).map(cell => ({
            tagName: cell.tagName,
            id: cell.id,
            className: cell.className,
            backgroundColor: window.getComputedStyle(cell).backgroundColor,
            textContent: cell.textContent.substring(0, 50)
          })),
          
          // Table computed styles
          tableStyles: {
            display: window.getComputedStyle(table).display,
            visibility: window.getComputedStyle(table).visibility,
            opacity: window.getComputedStyle(table).opacity,
            width: window.getComputedStyle(table).width,
            height: window.getComputedStyle(table).height
          }
        };
        
        return analysis;
      }, tableSelectors.find(s => scoreTable));
      
      console.log('Table Analysis Results:');
      console.log(JSON.stringify(tableAnalysis, null, 2));
      
      // Save the analysis to a file
      const fs = require('fs');
      fs.writeFileSync('score-table-analysis.json', JSON.stringify(tableAnalysis, null, 2));
      
      console.log('8. Taking screenshot of score table...');
      await scoreTable.screenshot({ path: 'score-table-element.png' });
      console.log('Score table screenshot saved as score-table-element.png');
      
      // Also take a screenshot with some padding around it
      const box = await scoreTable.boundingBox();
      if (box) {
        await page.screenshot({
          path: 'score-table-with-padding.png',
          clip: {
            x: Math.max(0, box.x - 20),
            y: Math.max(0, box.y - 20),
            width: box.width + 40,
            height: box.height + 40
          }
        });
        console.log('Score table with padding screenshot saved');
      }
      
      console.log('9. Saving complete table HTML...');
      const tableHTML = await page.evaluate((selector) => {
        const table = document.querySelector(selector);
        return table ? table.outerHTML : null;
      }, tableSelectors.find(s => scoreTable));
      
      if (tableHTML) {
        fs.writeFileSync('score-table-complete.html', `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .score-table { border-collapse: collapse; width: 100%; }
    .score-table th, .score-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .score-table th { background-color: #f2f2f2; }
    .data-cell { background-color: #e8f4f8; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
${tableHTML}
</body>
</html>
        `);
        console.log('Complete table HTML saved to score-table-complete.html');
      }
    }
    
    // Take a full page screenshot regardless
    await page.screenshot({ path: 'full-page-after-calculation.png', fullPage: true });
    console.log('Full page screenshot saved');
    
    console.log('10. Process completed!');
    
  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-detailed-screenshot.png', fullPage: true });
  }
  
  await browser.close();
})();