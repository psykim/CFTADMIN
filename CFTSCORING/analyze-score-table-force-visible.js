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
    await page.fill('#subjectId', 'TEST001');
    await page.fill('#age', '65');
    await page.click('label[for="gender-male"]');
    await page.waitForTimeout(500);
    await page.fill('#education', '12');
    
    console.log('3. Adding animal names for each time period...');
    const animals = [
      ['개', '고양이', '소', '말', '돼지'],
      ['닭', '오리', '토끼', '호랑이', '사자'],
      ['코끼리', '기린', '원숭이', '곰', '여우'],
      ['늑대', '사슴', '다람쥐', '쥐', '뱀']
    ];
    
    const timeRanges = ['0-15', '15-30', '30-45', '45-60'];
    
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
    await page.click('button:has-text("점수 계산하기")');
    await page.waitForTimeout(3000);
    
    console.log('5. Force showing results and score table...');
    await page.evaluate(() => {
      // Force show results section
      const resultsSection = document.querySelector('.results-section');
      if (resultsSection) {
        resultsSection.style.display = 'block';
        resultsSection.style.visibility = 'visible';
        resultsSection.style.opacity = '1';
        resultsSection.style.height = 'auto';
        resultsSection.style.overflow = 'visible';
      }
      
      // Force show score table
      const scoreTable = document.querySelector('.score-table');
      if (scoreTable) {
        scoreTable.style.display = 'table';
        scoreTable.style.visibility = 'visible';
        scoreTable.style.opacity = '1';
        scoreTable.style.width = '100%';
        
        // Make sure parent elements are visible too
        let parent = scoreTable.parentElement;
        while (parent && parent !== document.body) {
          parent.style.display = 'block';
          parent.style.visibility = 'visible';
          parent.style.opacity = '1';
          parent.style.height = 'auto';
          parent.style.overflow = 'visible';
          parent = parent.parentElement;
        }
        
        // Scroll to table
        scoreTable.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Show any hidden divs that might contain results
      const hiddenDivs = document.querySelectorAll('div[style*="display: none"], div[style*="visibility: hidden"]');
      hiddenDivs.forEach(div => {
        if (div.textContent.includes('점수') || div.textContent.includes('결과')) {
          div.style.display = 'block';
          div.style.visibility = 'visible';
          div.style.opacity = '1';
        }
      });
    });
    
    await page.waitForTimeout(2000);
    
    console.log('6. Getting score table details...');
    const tableData = await page.evaluate(() => {
      const table = document.querySelector('.score-table');
      if (!table) return { error: 'No score table found' };
      
      const rect = table.getBoundingClientRect();
      const rows = Array.from(table.querySelectorAll('tr'));
      
      return {
        found: true,
        visible: rect.width > 0 && rect.height > 0,
        position: {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        },
        computedStyles: {
          display: window.getComputedStyle(table).display,
          visibility: window.getComputedStyle(table).visibility,
          opacity: window.getComputedStyle(table).opacity
        },
        html: table.outerHTML,
        rowsData: rows.map((row, idx) => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          return {
            rowIndex: idx,
            cellCount: cells.length,
            cells: cells.map(cell => ({
              tagName: cell.tagName,
              text: cell.textContent.trim(),
              id: cell.id || '',
              className: cell.className || '',
              backgroundColor: window.getComputedStyle(cell).backgroundColor,
              color: window.getComputedStyle(cell).color,
              fontWeight: window.getComputedStyle(cell).fontWeight
            }))
          };
        })
      };
    });
    
    console.log('Table data:', JSON.stringify(tableData, null, 2));
    fs.writeFileSync('score-table-forced-data.json', JSON.stringify(tableData, null, 2));
    
    if (tableData.html) {
      // Save the complete HTML with styling
      fs.writeFileSync('score-table-forced.html', `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Score Table</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 40px; 
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 { 
      color: #333; 
      margin-bottom: 30px;
      text-align: center;
    }
    .score-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 16px;
    }
    .score-table th,
    .score-table td {
      border: 1px solid #ddd;
      padding: 12px 15px;
      text-align: left;
    }
    .score-table th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #495057;
    }
    .score-table tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    .score-table tr:hover {
      background-color: #e9ecef;
    }
    .data-cell {
      background-color: #e3f2fd !important;
      font-weight: 500;
    }
    #totalScore, #categoryScore {
      background-color: #fff3cd !important;
      font-weight: bold;
      color: #856404;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>동물범주형유창성검사 채점 결과</h1>
    ${tableData.html || '<p>No table data available</p>'}
  </div>
</body>
</html>
      `);
    }
    
    console.log('7. Taking screenshots...');
    
    // Screenshot just the table
    const tableElement = await page.$('.score-table');
    if (tableElement) {
      const box = await tableElement.boundingBox();
      if (box) {
        console.log(`Table found at position: ${box.x}, ${box.y}, size: ${box.width}x${box.height}`);
        
        // Direct table screenshot
        await tableElement.screenshot({ path: 'score-table-direct.png' });
        
        // Table with padding
        await page.screenshot({
          path: 'score-table-padded.png',
          clip: {
            x: Math.max(0, box.x - 50),
            y: Math.max(0, box.y - 50),
            width: Math.min(page.viewportSize().width - (box.x - 50), box.width + 100),
            height: box.height + 100
          }
        });
      }
    }
    
    // Full page screenshot
    await page.screenshot({ path: 'full-page-forced.png', fullPage: true });
    
    // Viewport screenshot
    await page.screenshot({ path: 'viewport-forced.png' });
    
    console.log('8. Process completed!');
    console.log('Files created:');
    console.log('- score-table-forced-data.json (complete table data)');
    console.log('- score-table-forced.html (styled HTML)');
    console.log('- score-table-direct.png (table only)');
    console.log('- score-table-padded.png (table with context)');
    console.log('- full-page-forced.png (full page)');
    
  } catch (error) {
    console.error('Error occurred:', error);
    console.error('Error stack:', error.stack);
    await page.screenshot({ path: 'error-forced-screenshot.png', fullPage: true });
  }
  
  await page.waitForTimeout(2000);
  await browser.close();
})();