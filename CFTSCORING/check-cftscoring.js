const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500 // Slow down for visibility
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating to CFTSCORING...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html');
    
    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/1-initial-page.png', fullPage: true });
    console.log('Initial screenshot taken');

    // First, we need to select an age group and proceed
    console.log('Selecting age group 45-60...');
    // Click on the 45-60 age group button
    const ageGroupButton = await page.getByRole('button', { name: '추가' }).nth(3);
    await ageGroupButton.click();
    
    // Wait for the assessment form to load
    await page.waitForTimeout(2000);
    
    // Take screenshot of assessment form
    await page.screenshot({ path: 'screenshots/2-assessment-form.png', fullPage: true });
    console.log('Assessment form screenshot taken');

    // Fill in test data
    console.log('Filling in test data...');
    
    // Basic info
    await page.fill('#name', '테스트');
    await page.fill('#age', '65');
    await page.selectOption('#sex', 'M');
    await page.fill('#education', '12');
    await page.fill('#testDate', '2025-01-25');
    
    // Fill in Rey CFT scores
    // Copy scores
    await page.fill('#copy1', '3');
    await page.fill('#copy2', '3');
    await page.fill('#copy3', '3');
    await page.fill('#copy4', '2');
    await page.fill('#copy5', '2');
    
    // Immediate recall scores
    await page.fill('#imm1', '2');
    await page.fill('#imm2', '2');
    await page.fill('#imm3', '2');
    await page.fill('#imm4', '1');
    await page.fill('#imm5', '1');
    
    // Delayed recall scores
    await page.fill('#del1', '2');
    await page.fill('#del2', '2');
    await page.fill('#del3', '1');
    await page.fill('#del4', '1');
    await page.fill('#del5', '1');
    
    // Recognition scores (모두 정반응으로 설정)
    for (let i = 1; i <= 24; i++) {
      await page.check(`#recog${i}_1`);
    }
    
    // Take screenshot after filling data
    await page.screenshot({ path: 'screenshots/3-data-filled.png', fullPage: true });
    console.log('Data filled screenshot taken');
    
    // Click calculate button
    console.log('Calculating scores...');
    await page.click('#calculateBtn');
    
    // Wait for results
    await page.waitForSelector('#resultsSection', { state: 'visible' });
    
    // Take screenshot of results
    await page.screenshot({ path: 'screenshots/4-results-page.png', fullPage: true });
    console.log('Results screenshot taken');
    
    // Check for percentile format
    console.log('\nChecking percentile display format...');
    const percentileElements = await page.$$('.percentile');
    for (const element of percentileElements) {
      const text = await element.textContent();
      console.log('Percentile text found:', text);
      if (text.includes('%ile')) {
        console.log('⚠️  Found old format with "%ile"');
      } else if (text.includes('<5') || text.includes('≥5')) {
        console.log('✓ Found new format with "<5" or "≥5"');
      }
    }
    
    // Check for "분석 과정 보기" button
    console.log('\nChecking for analysis button...');
    const analysisButton = await page.$('text=분석 과정 보기');
    if (analysisButton) {
      console.log('✓ Found "분석 과정 보기" button');
      
      // Click the button
      await analysisButton.click();
      await page.waitForTimeout(1000);
      
      // Take screenshot of analysis details
      await page.screenshot({ path: 'screenshots/5-analysis-details.png', fullPage: true });
      console.log('Analysis details screenshot taken');
      
      // Check if analysis details are shown
      const analysisDetails = await page.$('#analysisDetails');
      if (analysisDetails && await analysisDetails.isVisible()) {
        console.log('✓ Analysis details are displayed');
      } else {
        console.log('⚠️  Analysis details not visible');
      }
    } else {
      console.log('⚠️  "분석 과정 보기" button not found');
    }
    
    // Get and save the raw HTML
    console.log('\nFetching raw HTML source...');
    const htmlContent = await page.content();
    require('fs').writeFileSync('raw-html-source.html', htmlContent);
    console.log('Raw HTML saved to raw-html-source.html');
    
    // Also check specific elements in the HTML
    const resultsHTML = await page.$eval('#resultsSection', el => el.innerHTML);
    require('fs').writeFileSync('results-section.html', resultsHTML);
    console.log('Results section HTML saved to results-section.html');
    
    // Check all percentile displays in detail
    console.log('\nDetailed percentile check:');
    const allPercentiles = await page.$$eval('.percentile, [class*="percentile"]', elements => 
      elements.map(el => ({
        text: el.textContent,
        className: el.className,
        html: el.outerHTML
      }))
    );
    
    allPercentiles.forEach((p, index) => {
      console.log(`Percentile ${index + 1}:`, p);
    });
    
    console.log('\nTest completed successfully!');
    
  } catch (error) {
    console.error('Error during test:', error);
    await page.screenshot({ path: 'screenshots/error-screenshot.png' });
  } finally {
    // Keep browser open for manual inspection
    console.log('\nBrowser will remain open for inspection. Press Ctrl+C to close.');
    // await browser.close();
  }
})();