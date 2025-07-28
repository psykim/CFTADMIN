const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false, // Set to true if you don't want to see the browser
    slowMo: 500 // Slow down actions by 500ms to see what's happening
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to CFTSCORING website...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'networkidle'
    });
    
    console.log('Filling in ID field...');
    await page.fill('input[name="id"]', 'test001');
    
    console.log('Selecting gender (남)...');
    // Try multiple approaches to select the radio button
    try {
      // First try: Direct click on the radio button
      await page.click('input[type="radio"][value="M"]');
    } catch (e) {
      console.log('Direct click failed, trying evaluate method...');
      // Second try: Use page.evaluate to set the radio button
      await page.evaluate(() => {
        const maleRadio = document.querySelector('input[type="radio"][value="M"]');
        if (maleRadio) {
          maleRadio.checked = true;
          maleRadio.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          // Try other possible selectors
          const radios = document.querySelectorAll('input[type="radio"]');
          for (const radio of radios) {
            if (radio.parentElement.textContent.includes('남') || 
                radio.nextSibling?.textContent?.includes('남')) {
              radio.checked = true;
              radio.dispatchEvent(new Event('change', { bubbles: true }));
              break;
            }
          }
        }
      });
    }
    
    console.log('Filling in age...');
    await page.fill('input[name="age"]', '65');
    
    console.log('Filling in education years...');
    await page.fill('input[name="education"]', '12');
    
    console.log('Adding animals in 0-15 section...');
    // Find input fields in the 0-15 section
    const section015Inputs = await page.locator('input[type="text"]').filter({ 
      has: page.locator('xpath=ancestor::*[contains(text(), "0-15") or contains(text(), "0~15")]') 
    }).all();
    
    // If the above doesn't work, try a different approach
    if (section015Inputs.length === 0) {
      console.log('Trying alternative method to find 0-15 section inputs...');
      // Get all text inputs and find the ones in the first section
      const allInputs = await page.locator('input[type="text"]').all();
      const animals015 = ['개', '고양이', '호랑이', '사자', '코끼리'];
      
      // Start from the first available text input (after ID, age, education)
      let startIndex = 3; // Assuming first 3 are ID, age, education
      for (let i = 0; i < 5 && (startIndex + i) < allInputs.length; i++) {
        await allInputs[startIndex + i].fill(animals015[i]);
      }
    } else {
      const animals015 = ['개', '고양이', '호랑이', '사자', '코끼리'];
      for (let i = 0; i < Math.min(5, section015Inputs.length); i++) {
        await section015Inputs[i].fill(animals015[i]);
      }
    }
    
    console.log('Adding animals in other sections...');
    // Find remaining empty text inputs for other sections
    const remainingAnimals = ['기린', '원숭이', '토끼', '곰', '늑대'];
    const emptyInputs = await page.locator('input[type="text"][value=""]').all();
    
    for (let i = 0; i < Math.min(remainingAnimals.length, emptyInputs.length); i++) {
      await emptyInputs[i].fill(remainingAnimals[i]);
    }
    
    // Take a screenshot before clicking calculate
    console.log('Taking screenshot before calculation...');
    await page.screenshot({ 
      path: 'before-calculation.png', 
      fullPage: true 
    });
    
    console.log('Looking for calculate button...');
    // Try different selectors for the calculate button
    const calculateButton = await page.locator('button:has-text("점수 계산하기"), input[type="button"][value="점수 계산하기"], button:has-text("계산"), input[type="submit"]').first();
    
    if (await calculateButton.isVisible()) {
      console.log('Clicking calculate button...');
      await calculateButton.click();
      
      // Wait for results to appear
      console.log('Waiting for results...');
      await page.waitForTimeout(3000); // Wait 3 seconds for any animations/calculations
      
      // Look for results elements
      console.log('Looking for results elements...');
      const resultsSelectors = [
        '#results',
        '.results',
        'div[id*="result"]',
        'div[class*="result"]',
        '[data-results]',
        'div:has-text("점수")',
        'div:has-text("결과")'
      ];
      
      for (const selector of resultsSelectors) {
        const element = await page.locator(selector).first();
        if (await element.count() > 0) {
          console.log(`Found results element with selector: ${selector}`);
          const isVisible = await element.isVisible();
          console.log(`Is visible: ${isVisible}`);
          
          if (!isVisible) {
            // Try to make it visible
            await page.evaluate((sel) => {
              const el = document.querySelector(sel);
              if (el) {
                el.style.display = 'block';
                el.style.visibility = 'visible';
              }
            }, selector);
          }
        }
      }
      
      // Take screenshot after calculation
      console.log('Taking screenshot after calculation...');
      await page.screenshot({ 
        path: 'after-calculation.png', 
        fullPage: true 
      });
      
      // Try to extract any visible text that might be results
      const pageText = await page.evaluate(() => {
        const body = document.body;
        const walker = document.createTreeWalker(
          body,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let text = '';
        let node;
        while (node = walker.nextNode()) {
          if (node.nodeValue.trim()) {
            text += node.nodeValue.trim() + '\n';
          }
        }
        return text;
      });
      
      // Save the page content for analysis
      require('fs').writeFileSync('page-content.txt', pageText);
      console.log('Page content saved to page-content.txt');
      
      // Also save the HTML structure
      const htmlContent = await page.content();
      require('fs').writeFileSync('page-structure.html', htmlContent);
      console.log('HTML structure saved to page-structure.html');
      
    } else {
      console.log('Calculate button not found!');
    }
    
    // Keep browser open for 10 seconds to observe results
    console.log('Keeping browser open for observation...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();