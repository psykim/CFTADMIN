const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to CFTSCORING website...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'domcontentloaded'
    });
    
    await page.waitForTimeout(2000);
    
    // Fill basic info
    console.log('Filling basic information...');
    await page.fill('#subjectId', 'test001');
    
    // Click the male radio button directly
    await page.click('label[for="gender-male"]');
    
    await page.fill('#age', '65');
    await page.fill('#education', '12');
    
    // Now we need to understand how the animal entry works
    // It seems like we need to add animals one by one using an autocomplete system
    
    console.log('Looking for animal input method...');
    
    // Define animals for each time period
    const animalsToAdd = [
      { period: '0-15', animals: ['개', '고양이', '호랑이', '사자', '코끼리'] },
      { period: '15-30', animals: ['기린', '원숭이', '토끼', '곰', '늑대'] },
      { period: '30-45', animals: ['여우', '말', '소', '돼지', '양'] },
      { period: '45-60', animals: ['닭', '오리', '거위', '독수리', '비둘기'] }
    ];
    
    // Try to add animals for each period
    for (const periodData of animalsToAdd) {
      const inputId = `#input-${periodData.period}`;
      console.log(`Adding animals to ${periodData.period} section...`);
      
      // Click on the input field
      await page.click(inputId);
      
      // Type each animal and press Enter
      for (const animal of periodData.animals) {
        await page.type(inputId, animal);
        await page.waitForTimeout(500); // Wait for autocomplete
        
        // Try pressing Enter to add the animal
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);
        
        // Clear the input for the next animal
        await page.click(inputId, { clickCount: 3 }); // Triple click to select all
        await page.keyboard.press('Delete');
      }
      
      // Alternative method: just type all animals separated by space
      await page.fill(inputId, periodData.animals.join(' '));
    }
    
    // Take screenshot before calculation
    await page.screenshot({ path: 'form-filled-correct.png', fullPage: true });
    
    // Click calculate button
    console.log('Clicking calculate button...');
    await page.click('button:has-text("점수 계산하기")');
    
    // Wait for calculation
    await page.waitForTimeout(3000);
    
    // Force show results
    await page.evaluate(() => {
      const resultsDiv = document.getElementById('results');
      if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.style.visibility = 'visible';
      }
    });
    
    // Extract detailed results
    const detailedResults = await page.evaluate(() => {
      const results = {};
      
      // Get all score values
      results.totalScore = document.getElementById('totalScore')?.textContent || 'N/A';
      results.totalZScore = document.getElementById('totalZScore')?.textContent || 'N/A';
      results.totalPercentile = document.getElementById('totalPercentile')?.textContent || 'N/A';
      results.firstHalfScore = document.getElementById('firstHalfScore')?.textContent || 'N/A';
      results.secondHalfScore = document.getElementById('secondHalfScore')?.textContent || 'N/A';
      results.perseverationScore = document.getElementById('perseverationScore')?.textContent || 'N/A';
      results.intrusionScore = document.getElementById('intrusionScore')?.textContent || 'N/A';
      
      // Get category analysis scores
      results.categoryScore = document.getElementById('categoryScore')?.textContent || 'N/A';
      results.avgClusterSize = document.getElementById('avgClusterSize')?.textContent || 'N/A';
      results.maxClusterSize = document.getElementById('maxClusterSize')?.textContent || 'N/A';
      results.switchingScore = document.getElementById('switchingScore')?.textContent || 'N/A';
      results.inefficientSwitchingScore = document.getElementById('inefficientSwitchingScore')?.textContent || 'N/A';
      
      // Get 30-second scores
      results.first30SecCategoryScore = document.getElementById('first30SecCategoryScore')?.textContent || 'N/A';
      results.first30SecAvgClusterSize = document.getElementById('first30SecAvgClusterSize')?.textContent || 'N/A';
      results.first30SecMaxClusterSize = document.getElementById('first30SecMaxClusterSize')?.textContent || 'N/A';
      results.first30SecSwitchingScore = document.getElementById('first30SecSwitchingScore')?.textContent || 'N/A';
      results.first30SecInefficient = document.getElementById('first30SecInefficient')?.textContent || 'N/A';
      results.first30SecPerseverationScore = document.getElementById('first30SecPerseverationScore')?.textContent || 'N/A';
      results.first30SecIntrusionScore = document.getElementById('first30SecIntrusionScore')?.textContent || 'N/A';
      
      // Get any pattern analysis
      const patternAnalysis = document.getElementById('patternAnalysis');
      if (patternAnalysis) {
        results.patternAnalysis = patternAnalysis.textContent.trim();
      }
      
      // Get cluster analysis
      const clusterAnalysis = document.getElementById('clusterAnalysis');
      if (clusterAnalysis) {
        results.clusterAnalysis = clusterAnalysis.textContent.trim();
      }
      
      return results;
    });
    
    console.log('Detailed Results:', JSON.stringify(detailedResults, null, 2));
    fs.writeFileSync('detailed-results.json', JSON.stringify(detailedResults, null, 2));
    
    // Take final screenshots
    await page.screenshot({ path: 'final-results.png', fullPage: true });
    
    // Scroll to results and take another screenshot
    await page.evaluate(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'results-closeup.png' });
    
    // Check what's actually in the input fields
    const inputContents = await page.evaluate(() => {
      const inputs = {};
      inputs['0-15'] = document.getElementById('input-0-15')?.value || '';
      inputs['15-30'] = document.getElementById('input-15-30')?.value || '';
      inputs['30-45'] = document.getElementById('input-30-45')?.value || '';
      inputs['45-60'] = document.getElementById('input-45-60')?.value || '';
      return inputs;
    });
    
    console.log('Input field contents:', inputContents);
    fs.writeFileSync('input-contents.json', JSON.stringify(inputContents, null, 2));
    
    console.log('Keeping browser open for observation...');
    await page.waitForTimeout(15000);
    
  } catch (error) {
    console.error('Error:', error);
    await page.screenshot({ path: 'error-state.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('Done.');
  }
})();