const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 200
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to CFTSCORING website...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'domcontentloaded'
    });
    
    await page.waitForTimeout(2000);
    
    // Fill form quickly
    console.log('Filling form...');
    await page.fill('#subjectId', 'test001');
    
    // Select male gender using evaluate
    await page.evaluate(() => {
      document.getElementById('gender-male').checked = true;
    });
    
    await page.fill('#age', '65');
    await page.fill('#education', '12');
    
    // Fill animal inputs
    const animalInputs = ['#input-0-15', '#input-15-30', '#input-30-45', '#input-45-60'];
    const animalGroups = [
      '개 고양이 호랑이 사자 코끼리',
      '기린 원숭이 토끼 곰 늑대',
      '여우 말 소 돼지 양',
      '닭 오리 거위 독수리 비둘기'
    ];
    
    for (let i = 0; i < animalInputs.length; i++) {
      await page.fill(animalInputs[i], animalGroups[i]);
    }
    
    // Click calculate button
    console.log('Clicking calculate button...');
    await page.click('button:has-text("점수 계산하기")');
    
    // Wait a bit
    await page.waitForTimeout(3000);
    
    // Force show the results div
    console.log('Forcing results to show...');
    await page.evaluate(() => {
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.style.visibility = 'visible';
        console.log('Results div made visible');
      }
      
      // Also check for any elements with class 'score-table'
      const scoreTables = document.querySelectorAll('.score-table');
      scoreTables.forEach(table => {
        table.style.display = 'table';
        table.style.visibility = 'visible';
      });
    });
    
    await page.waitForTimeout(1000);
    
    // Extract all score-related information
    console.log('Extracting score information...');
    const scoreData = await page.evaluate(() => {
      const data = {};
      
      // Look for score table
      const scoreTable = document.querySelector('.score-table');
      if (scoreTable) {
        const rows = scoreTable.querySelectorAll('tr');
        data.scoreTableRows = [];
        rows.forEach(row => {
          const cells = row.querySelectorAll('td, th');
          const rowData = Array.from(cells).map(cell => cell.textContent.trim());
          if (rowData.length > 0) {
            data.scoreTableRows.push(rowData);
          }
        });
      }
      
      // Look for any elements containing scores
      const scoreElements = document.querySelectorAll('[class*="score"], [id*="score"]');
      data.scoreElements = [];
      scoreElements.forEach(el => {
        if (el.textContent.trim()) {
          data.scoreElements.push({
            tag: el.tagName,
            class: el.className,
            id: el.id,
            text: el.textContent.trim()
          });
        }
      });
      
      // Check results div content
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        data.resultsContent = resultsDiv.innerHTML;
        data.resultsText = resultsDiv.textContent.trim();
        
        // Look for specific score values
        const allText = resultsDiv.textContent;
        const numberPattern = /\d+(\.\d+)?/g;
        const numbers = allText.match(numberPattern);
        data.numbersFound = numbers;
      }
      
      // Look for interpretation text
      const interpretationElements = document.querySelectorAll('.interpretation, [class*="interpret"]');
      data.interpretations = [];
      interpretationElements.forEach(el => {
        if (el.textContent.trim()) {
          data.interpretations.push(el.textContent.trim());
        }
      });
      
      return data;
    });
    
    console.log('Score data extracted:', JSON.stringify(scoreData, null, 2));
    fs.writeFileSync('score-data.json', JSON.stringify(scoreData, null, 2));
    
    // Take screenshot of results
    await page.screenshot({ path: 'results-visible.png', fullPage: true });
    
    // Try to scroll to results
    await page.evaluate(() => {
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'results-focused.png' });
    
    // Get the complete HTML of the results section
    const resultsHTML = await page.evaluate(() => {
      const resultsDiv = document.getElementById('results');
      return resultsDiv ? resultsDiv.outerHTML : 'No results div found';
    });
    
    fs.writeFileSync('results-section.html', resultsHTML);
    console.log('Results HTML saved to results-section.html');
    
    console.log('Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'error-state.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('Done.');
  }
})();