const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 200 
  });
  
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    console.log('1. Navigating to CFTSCORING.html...');
    await page.goto(`file://${__dirname}/CFTSCORING.html`);
    await page.waitForTimeout(1000);
    
    console.log('2. Filling participant information...');
    // Fill ID
    await page.fill('#subjectId', 'TEST001');
    
    // Fill age
    await page.fill('#age', '65');
    
    // Click gender label (this will select the radio button)
    await page.click('label[for="gender-male"]');
    await page.waitForTimeout(500);
    
    // Fill education
    await page.fill('#education', '12');
    
    console.log('3. Adding animal names for each time period...');
    const animals = [
      ['개', '고양이', '소', '말', '돼지'],           // 0-15초
      ['닭', '오리', '토끼', '호랑이', '사자'],       // 15-30초
      ['코끼리', '기린', '원숭이', '곰', '여우'],      // 30-45초
      ['늑대', '사슴', '다람쥐', '쥐', '뱀']         // 45-60초
    ];
    
    const timeRanges = ['0-15', '15-30', '30-45', '45-60'];
    
    // Add animals for each time range
    for (let i = 0; i < timeRanges.length; i++) {
      const range = timeRanges[i];
      const rangeAnimals = animals[i];
      
      console.log(`  Adding animals for ${range}초...`);
      for (const animal of rangeAnimals) {
        await page.fill(`#input-${range}`, animal);
        await page.click(`button[onclick="addResponse('${range}')"]`);
        await page.waitForTimeout(300);
      }
    }
    
    console.log('4. Clicking calculate button...');
    // Click the green "점수 계산하기" button
    await page.click('button:has-text("점수 계산하기")');
    await page.waitForTimeout(3000);
    
    console.log('5. Looking for results and tables...');
    
    // First, let's see what's on the page after calculation
    const pageContent = await page.evaluate(() => {
      return {
        hasResults: !!document.querySelector('.results-section, #results, [class*="result"]'),
        tableCount: document.querySelectorAll('table').length,
        visibleElements: Array.from(document.querySelectorAll('*')).filter(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return rect.width > 0 && rect.height > 0 && 
                 style.display !== 'none' && 
                 style.visibility !== 'hidden' &&
                 el.textContent.includes('점수');
        }).slice(0, 10).map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          text: el.textContent.substring(0, 50)
        }))
      };
    });
    
    console.log('Page content after calculation:', JSON.stringify(pageContent, null, 2));
    
    // Scroll down to find results
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    
    // Look for any tables
    const tables = await page.evaluate(() => {
      const allTables = document.querySelectorAll('table');
      return Array.from(allTables).map((table, index) => {
        const rect = table.getBoundingClientRect();
        return {
          index,
          className: table.className,
          id: table.id,
          isVisible: rect.width > 0 && rect.height > 0,
          position: { 
            top: rect.top + window.scrollY, 
            left: rect.left + window.scrollX, 
            width: rect.width, 
            height: rect.height 
          },
          rowCount: table.querySelectorAll('tr').length,
          firstCells: Array.from(table.querySelectorAll('td, th')).slice(0, 5).map(cell => ({
            text: cell.textContent.trim(),
            tagName: cell.tagName
          })),
          containsScore: table.textContent.includes('점수') || table.textContent.includes('총')
        };
      });
    });
    
    console.log('6. Tables found:', JSON.stringify(tables, null, 2));
    fs.writeFileSync('all-tables-data.json', JSON.stringify(tables, null, 2));
    
    // Find score table (the one that contains "점수")
    const scoreTable = tables.find(t => t.containsScore && t.isVisible) || tables.find(t => t.isVisible);
    
    if (scoreTable && scoreTable.index !== undefined) {
      console.log(`7. Found score table at index ${scoreTable.index}, capturing it...`);
      
      // Scroll to the table
      await page.evaluate((tableIndex) => {
        const table = document.querySelectorAll('table')[tableIndex];
        if (table) {
          table.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, scoreTable.index);
      
      await page.waitForTimeout(1000);
      
      // Get detailed table analysis
      const detailedAnalysis = await page.evaluate((tableIndex) => {
        const table = document.querySelectorAll('table')[tableIndex];
        if (!table) return null;
        
        const rows = Array.from(table.querySelectorAll('tr'));
        
        return {
          fullHTML: table.outerHTML,
          structure: {
            totalRows: rows.length,
            totalColumns: rows[0] ? rows[0].querySelectorAll('td, th').length : 0,
            hasHeader: !!table.querySelector('thead') || !!table.querySelector('th')
          },
          rowsData: rows.map((row, rowIdx) => ({
            rowIndex: rowIdx,
            cells: Array.from(row.querySelectorAll('td, th')).map((cell, cellIdx) => ({
              cellIndex: cellIdx,
              tagName: cell.tagName,
              text: cell.textContent.trim(),
              className: cell.className,
              id: cell.id,
              styles: {
                backgroundColor: window.getComputedStyle(cell).backgroundColor,
                color: window.getComputedStyle(cell).color,
                fontWeight: window.getComputedStyle(cell).fontWeight,
                border: window.getComputedStyle(cell).border
              }
            }))
          }))
        };
      }, scoreTable.index);
      
      if (detailedAnalysis) {
        fs.writeFileSync('score-table-complete-analysis.json', JSON.stringify(detailedAnalysis, null, 2));
        
        // Save the HTML
        fs.writeFileSync('score-table-final.html', `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px; 
      background: #f5f5f5;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 { 
      color: #333; 
      margin-bottom: 20px;
    }
    table { 
      border-collapse: collapse; 
      width: 100%;
      margin-top: 20px;
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
    tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    .highlight {
      background-color: #fff3cd !important;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>동물범주형유창성검사 결과표</h1>
    ${detailedAnalysis.fullHTML}
  </div>
</body>
</html>
        `);
      }
      
      // Take screenshot of just the table
      console.log('8. Taking screenshot of score table...');
      const tableElement = await page.$(`table:nth-of-type(${scoreTable.index + 1})`);
      if (tableElement) {
        await tableElement.screenshot({ path: 'score-table-element-only.png' });
        
        // Screenshot with context
        const box = await tableElement.boundingBox();
        if (box) {
          await page.screenshot({
            path: 'score-table-with-surroundings.png',
            clip: {
              x: Math.max(0, box.x - 100),
              y: Math.max(0, box.y - 100),
              width: Math.min(page.viewportSize().width - box.x + 100, box.width + 200),
              height: box.height + 200
            }
          });
        }
      }
    } else {
      console.log('No score table found!');
    }
    
    // Take full page screenshot
    console.log('9. Taking full page screenshot...');
    await page.screenshot({ path: 'complete-page-with-results.png', fullPage: true });
    
    console.log('10. Process completed successfully!');
    
  } catch (error) {
    console.error('Error occurred:', error);
    console.error('Error stack:', error.stack);
    await page.screenshot({ path: 'error-state-screenshot.png', fullPage: true });
  }
  
  // Keep browser open for a moment to see results
  await page.waitForTimeout(2000);
  await browser.close();
})();