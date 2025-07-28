const { chromium } = require('playwright');
const fs = require('fs');

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
    // The ID field is already filled as "TEST001" from the screenshot
    // Fill age
    await page.fill('input[placeholder="연령"]', '65');
    
    // Click gender button (남성)
    await page.click('button:has-text("남성")');
    
    // Fill education
    await page.fill('input[placeholder="교육년수 입력"]', '12');
    
    console.log('3. Adding animal names for each time period...');
    const animals = [
      '개', '고양이', '소', '말', '돼지',
      '닭', '오리', '토끼', '호랑이', '사자',
      '코끼리', '기린', '원숭이', '곰', '여우',
      '늑대', '사슴', '다람쥐', '쥐', '뱀'
    ];
    
    // Add animals using the input fields
    let animalIndex = 0;
    
    // For 0-15 seconds
    for (let i = 0; i < 5 && animalIndex < animals.length; i++) {
      await page.fill('input[placeholder="동물 이름 입력"]', animals[animalIndex]);
      await page.click('button:has-text("추가"):near(input[placeholder="동물 이름 입력"])');
      await page.waitForTimeout(200);
      animalIndex++;
    }
    
    // Move to next section (15-30)
    const inputs = await page.$$('input[placeholder="동물 이름 입력"]');
    if (inputs.length > 1) {
      for (let i = 0; i < 5 && animalIndex < animals.length; i++) {
        await inputs[1].fill(animals[animalIndex]);
        await page.click('button:has-text("추가"):nth(1)');
        await page.waitForTimeout(200);
        animalIndex++;
      }
    }
    
    // Continue for 30-45 and 45-60 if available
    if (inputs.length > 2) {
      for (let i = 0; i < 5 && animalIndex < animals.length; i++) {
        await inputs[2].fill(animals[animalIndex]);
        await page.click('button:has-text("추가"):nth(2)');
        await page.waitForTimeout(200);
        animalIndex++;
      }
    }
    
    if (inputs.length > 3) {
      for (let i = 0; i < 5 && animalIndex < animals.length; i++) {
        await inputs[3].fill(animals[animalIndex]);
        await page.click('button:has-text("추가"):nth(3)');
        await page.waitForTimeout(200);
        animalIndex++;
      }
    }
    
    console.log('4. Clicking calculate button...');
    // Try clicking the green button (점수 계산하기)
    await page.click('button:has-text("점수 계산하기")');
    await page.waitForTimeout(3000);
    
    console.log('5. Making results visible and scrolling to them...');
    await page.evaluate(() => {
      // Find and show results section
      const resultsSection = document.querySelector('.results-section') ||
                           document.querySelector('#results') ||
                           document.querySelector('[class*="result"]');
      
      if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.style.visibility = 'visible';
        resultsSection.style.opacity = '1';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      
      // Make all tables visible
      const tables = document.querySelectorAll('table');
      tables.forEach(table => {
        table.style.display = 'table';
        table.style.visibility = 'visible';
        table.style.opacity = '1';
      });
    });
    
    await page.waitForTimeout(2000);
    
    console.log('6. Looking for tables...');
    // Get all tables on the page
    const tables = await page.evaluate(() => {
      const allTables = document.querySelectorAll('table');
      return Array.from(allTables).map((table, index) => {
        const rect = table.getBoundingClientRect();
        return {
          index,
          className: table.className,
          id: table.id,
          isVisible: rect.width > 0 && rect.height > 0,
          position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
          rowCount: table.querySelectorAll('tr').length,
          firstRowText: table.querySelector('tr')?.textContent?.trim().substring(0, 100),
          hasScoreInText: table.textContent.includes('점수') || table.textContent.includes('Score')
        };
      });
    });
    
    console.log('Tables found:', JSON.stringify(tables, null, 2));
    fs.writeFileSync('tables-found.json', JSON.stringify(tables, null, 2));
    
    // Find the most likely score table
    const scoreTable = tables.find(t => t.hasScoreInText && t.isVisible) || tables.find(t => t.isVisible);
    
    if (scoreTable) {
      console.log(`7. Analyzing table ${scoreTable.index}...`);
      
      const tableAnalysis = await page.evaluate((tableIndex) => {
        const table = document.querySelectorAll('table')[tableIndex];
        if (!table) return { error: 'Table not found' };
        
        const rows = Array.from(table.querySelectorAll('tr'));
        const cells = Array.from(table.querySelectorAll('td, th'));
        
        return {
          tableHTML: table.outerHTML,
          rowCount: rows.length,
          cellCount: cells.length,
          
          // Get first 10 rows in detail
          rowsDetail: rows.slice(0, 10).map((row, idx) => ({
            index: idx,
            html: row.outerHTML,
            cells: Array.from(row.querySelectorAll('td, th')).map(cell => ({
              tagName: cell.tagName,
              className: cell.className,
              id: cell.id,
              text: cell.textContent.trim(),
              backgroundColor: window.getComputedStyle(cell).backgroundColor,
              color: window.getComputedStyle(cell).color,
              border: window.getComputedStyle(cell).border
            }))
          })),
          
          // Look for specific score cells
          scoreCells: cells.filter(cell => 
            cell.textContent.includes('점수') || 
            cell.textContent.includes('Score') ||
            cell.id.includes('score') ||
            cell.className.includes('score')
          ).map(cell => ({
            tagName: cell.tagName,
            id: cell.id,
            className: cell.className,
            text: cell.textContent.trim(),
            backgroundColor: window.getComputedStyle(cell).backgroundColor
          })),
          
          // Table styles
          tableStyles: {
            borderCollapse: window.getComputedStyle(table).borderCollapse,
            border: window.getComputedStyle(table).border,
            width: window.getComputedStyle(table).width,
            margin: window.getComputedStyle(table).margin
          }
        };
      }, scoreTable.index);
      
      console.log('Table analysis complete');
      fs.writeFileSync('score-table-detailed-analysis.json', JSON.stringify(tableAnalysis, null, 2));
      
      // Save the table HTML
      if (tableAnalysis.tableHTML) {
        fs.writeFileSync('score-table-extracted.html', `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px; 
      background: #f5f5f5;
    }
    table { 
      border-collapse: collapse; 
      width: 100%;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th, td { 
      border: 1px solid #ddd; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background-color: #f8f9fa;
      font-weight: 600;
    }
    td {
      background-color: white;
    }
    .data-cell, [class*="data"] {
      background-color: #e8f4f8;
    }
  </style>
</head>
<body>
  <h2>Extracted Score Table</h2>
  ${tableAnalysis.tableHTML}
</body>
</html>
        `);
      }
      
      console.log('8. Taking screenshots of the table...');
      // Screenshot the specific table
      const tableElement = await page.$(`table:nth-of-type(${scoreTable.index + 1})`);
      if (tableElement) {
        await tableElement.screenshot({ path: 'score-table-only.png' });
        
        // Screenshot with padding
        const box = await tableElement.boundingBox();
        if (box) {
          await page.screenshot({
            path: 'score-table-with-context.png',
            clip: {
              x: Math.max(0, box.x - 50),
              y: Math.max(0, box.y - 50),
              width: box.width + 100,
              height: box.height + 100
            }
          });
        }
      }
    }
    
    // Take full page screenshot
    console.log('9. Taking full page screenshot...');
    await page.screenshot({ path: 'full-page-with-results.png', fullPage: true });
    
    // Also take viewport screenshot
    await page.screenshot({ path: 'viewport-with-results.png' });
    
    console.log('10. Process completed successfully!');
    
  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-final-screenshot.png', fullPage: true });
    
    // Try to get page content for debugging
    const pageContent = await page.content();
    fs.writeFileSync('error-page-content.html', pageContent);
  }
  
  await browser.close();
})();