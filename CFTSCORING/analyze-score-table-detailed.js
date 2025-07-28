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
    await page.fill('input[name="participantID"]', 'TEST001');
    await page.fill('input[name="age"]', '65');
    await page.selectOption('select[name="sex"]', 'male');
    await page.selectOption('select[name="education"]', 'high');
    await page.fill('input[name="testDate"]', '2024-01-15');
    
    console.log('3. Adding animal names...');
    const animals = ['개', '고양이', '소', '말', '돼지', '닭', '오리', '토끼', '호랑이', '사자', 
                     '코끼리', '기린', '원숭이', '곰', '여우', '늑대', '사슴', '다람쥐', '쥐', '뱀'];
    
    for (let i = 0; i < animals.length; i++) {
      await page.fill(`#animal${i + 1}`, animals[i]);
    }
    
    console.log('4. Clicking calculate button...');
    await page.click('#calculateButton');
    await page.waitForTimeout(2000);
    
    console.log('5. Making results visible...');
    await page.evaluate(() => {
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.style.visibility = 'visible';
        resultsDiv.style.opacity = '1';
      }
      
      // Also make score table visible
      const scoreTable = document.querySelector('.score-table');
      if (scoreTable) {
        scoreTable.style.display = 'table';
        scoreTable.style.visibility = 'visible';
        scoreTable.style.opacity = '1';
      }
    });
    
    await page.waitForTimeout(1000);
    
    console.log('6. Analyzing score table structure and styles...');
    const tableAnalysis = await page.evaluate(() => {
      const table = document.querySelector('.score-table');
      if (!table) return { error: 'Score table not found' };
      
      // Get the first few rows HTML
      const rows = table.querySelectorAll('tr');
      const firstRowsHTML = Array.from(rows).slice(0, 5).map(row => row.outerHTML);
      
      // Analyze specific cells
      const totalScoreCell = document.getElementById('totalScore');
      const categoryScoreCell = document.getElementById('categoryScore');
      
      const analysis = {
        tableFound: true,
        tableHTML: table.outerHTML.substring(0, 2000), // First 2000 chars
        firstRowsHTML: firstRowsHTML,
        totalRowsCount: rows.length,
        
        totalScoreCell: totalScoreCell ? {
          exists: true,
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
          id: cell.id,
          className: cell.className,
          backgroundColor: window.getComputedStyle(cell).backgroundColor,
          textContent: cell.textContent
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
    });
    
    console.log('7. Table Analysis Results:');
    console.log(JSON.stringify(tableAnalysis, null, 2));
    
    // Save the analysis to a file
    const fs = require('fs');
    fs.writeFileSync('score-table-analysis.json', JSON.stringify(tableAnalysis, null, 2));
    
    console.log('8. Taking screenshot of score table...');
    const scoreTable = await page.$('.score-table');
    if (scoreTable) {
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
    }
    
    console.log('9. Saving complete table HTML...');
    const tableHTML = await page.evaluate(() => {
      const table = document.querySelector('.score-table');
      return table ? table.outerHTML : null;
    });
    
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
  </style>
</head>
<body>
${tableHTML}
</body>
</html>
      `);
      console.log('Complete table HTML saved to score-table-complete.html');
    }
    
    console.log('10. Process completed successfully!');
    
  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-detailed-screenshot.png' });
  }
  
  await browser.close();
})();