const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 200 
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the HTML file
  const filePath = path.join(__dirname, 'CFTSCORING.html');
  await page.goto(`file://${filePath}`);
  
  console.log('Page loaded');
  await page.screenshot({ path: 'step1-initial.png' });
  
  // Wait for the page to be ready
  await page.waitForSelector('.calculate-btn');
  
  // Fill in basic info
  await page.fill('#subjectId', '테스트');
  await page.fill('#age', '65');
  await page.fill('#education', '12');
  
  console.log('Basic info filled');
  await page.screenshot({ path: 'step2-info-filled.png' });
  
  // Add some test responses for each time period
  const testAnimals = ['개', '고양이', '호랑이', '사자', '코끼리', '기린', '원숭이', '토끼', '말', '소', '돼지', '닭', '오리', '거위', '참새', '비둘기', '까마귀', '독수리'];
  
  // Add animals manually with better error handling
  for (let i = 0; i < 4; i++) {
    const period = ['0-15', '15-30', '30-45', '45-60'][i];
    const inputId = `#input-${period}`;
    
    for (let j = 0; j < 4; j++) {
      const animalIndex = i * 4 + j;
      if (animalIndex < testAnimals.length) {
        await page.fill(inputId, testAnimals[animalIndex]);
        await page.click(`button[onclick="addResponse('${period}')"]`);
        await page.waitForTimeout(200);
        console.log(`Added ${testAnimals[animalIndex]} to period ${period}`);
      }
    }
  }
  
  console.log('All animals added');
  await page.screenshot({ path: 'step3-animals-added.png' });
  
  // Click calculate button
  console.log('Clicking calculate button...');
  await page.click('.calculate-btn');
  
  // Wait a bit for processing
  await page.waitForTimeout(2000);
  
  // Check if results are visible
  const resultsVisible = await page.evaluate(() => {
    const results = document.getElementById('results');
    if (results) {
      const style = window.getComputedStyle(results);
      return {
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        innerHTML: results.innerHTML.substring(0, 200) + '...'
      };
    }
    return null;
  });
  
  console.log('Results visibility:', resultsVisible);
  await page.screenshot({ path: 'step4-after-calculate.png', fullPage: true });
  
  // Try to find score table even if results div is hidden
  const scoreTableInfo = await page.evaluate(() => {
    const table = document.querySelector('.score-table');
    if (table) {
      // Get score cells
      const cells = ['totalScore', 'categoryScore', 'avgClusterSize'];
      const cellInfo = {};
      
      cells.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const computedStyle = window.getComputedStyle(element);
          cellInfo[id] = {
            exists: true,
            text: element.textContent,
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            display: computedStyle.display,
            visibility: computedStyle.visibility
          };
        } else {
          cellInfo[id] = { exists: false };
        }
      });
      
      return {
        tableExists: true,
        tableDisplay: window.getComputedStyle(table).display,
        cells: cellInfo
      };
    }
    return { tableExists: false };
  });
  
  console.log('\nScore table info:', JSON.stringify(scoreTableInfo, null, 2));
  
  // Check for any error messages
  const errorCheck = await page.evaluate(() => {
    const allText = document.body.textContent;
    const hasError = allText.includes('오류') || allText.includes('Error') || allText.includes('에러');
    return {
      hasError,
      bodyText: allText.substring(0, 500)
    };
  });
  
  console.log('\nError check:', errorCheck.hasError);
  if (errorCheck.hasError) {
    console.log('Body text sample:', errorCheck.bodyText);
  }
  
  // Try to force show results
  await page.evaluate(() => {
    const results = document.getElementById('results');
    if (results) {
      results.style.display = 'block';
      results.style.visibility = 'visible';
      results.style.opacity = '1';
    }
  });
  
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'step5-forced-results.png', fullPage: true });
  
  // If score table exists, take a close-up
  const tableExists = await page.locator('.score-table').count() > 0;
  if (tableExists) {
    const scoreTable = await page.locator('.score-table');
    await scoreTable.screenshot({ path: 'score-table-closeup.png' });
    console.log('Score table screenshot saved');
  }
  
  console.log('\nBrowser will remain open for manual inspection...');
  console.log('Press Ctrl+C to close');
  
  // Keep the process alive
  await new Promise(() => {});
})();