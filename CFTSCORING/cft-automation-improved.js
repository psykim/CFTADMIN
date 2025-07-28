const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false, // Set to true if you don't want to see the browser
    slowMo: 300 // Slow down actions to see what's happening
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to CFTSCORING website...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    // Wait a bit for any JavaScript to initialize
    await page.waitForTimeout(2000);
    
    // Take initial screenshot
    await page.screenshot({ path: 'initial-page.png', fullPage: true });
    console.log('Initial screenshot saved.');
    
    // First, let's analyze the page structure
    console.log('Analyzing page structure...');
    const inputInfo = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map(input => ({
        type: input.type,
        name: input.name,
        id: input.id,
        placeholder: input.placeholder,
        value: input.value,
        visible: input.offsetParent !== null
      }));
    });
    
    console.log('Found inputs:', JSON.stringify(inputInfo, null, 2));
    fs.writeFileSync('inputs-found.json', JSON.stringify(inputInfo, null, 2));
    
    // Try to fill ID using various selectors
    console.log('Attempting to fill ID field...');
    const idSelectors = [
      'input[name="id"]',
      'input[id="id"]',
      'input[placeholder*="ID"]',
      'input[type="text"]:first-of-type',
      '#id'
    ];
    
    let idFilled = false;
    for (const selector of idSelectors) {
      try {
        if (await page.locator(selector).count() > 0) {
          await page.fill(selector, 'test001');
          console.log(`ID filled using selector: ${selector}`);
          idFilled = true;
          break;
        }
      } catch (e) {
        console.log(`Selector ${selector} failed:`, e.message);
      }
    }
    
    if (!idFilled) {
      console.log('Could not fill ID field with selectors, trying direct evaluation...');
      await page.evaluate(() => {
        const inputs = document.querySelectorAll('input[type="text"]');
        if (inputs.length > 0) {
          inputs[0].value = 'test001';
          inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }
    
    // Select gender
    console.log('Selecting gender...');
    await page.evaluate(() => {
      // Find radio buttons
      const radios = document.querySelectorAll('input[type="radio"]');
      for (const radio of radios) {
        // Check if this is the male option
        const label = radio.parentElement.textContent || '';
        const nextText = radio.nextSibling?.textContent || '';
        const prevText = radio.previousSibling?.textContent || '';
        
        if (label.includes('남') || nextText.includes('남') || prevText.includes('남') ||
            radio.value === 'M' || radio.value === '남' || radio.value === 'male') {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('Selected male radio button');
          break;
        }
      }
    });
    
    // Fill age
    console.log('Filling age...');
    const ageSelectors = [
      'input[name="age"]',
      'input[id="age"]',
      'input[placeholder*="나이"]',
      'input[placeholder*="Age"]'
    ];
    
    for (const selector of ageSelectors) {
      try {
        if (await page.locator(selector).count() > 0) {
          await page.fill(selector, '65');
          console.log(`Age filled using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    // Fill education
    console.log('Filling education...');
    const eduSelectors = [
      'input[name="education"]',
      'input[id="education"]',
      'input[placeholder*="교육"]',
      'input[placeholder*="Education"]'
    ];
    
    for (const selector of eduSelectors) {
      try {
        if (await page.locator(selector).count() > 0) {
          await page.fill(selector, '12');
          console.log(`Education filled using selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    // If specific selectors don't work, try filling by order
    console.log('Filling remaining fields by position...');
    await page.evaluate(() => {
      const textInputs = Array.from(document.querySelectorAll('input[type="text"]'));
      // Assuming order: ID (0), Age (1), Education (2), then animal inputs
      if (textInputs.length > 2) {
        if (!textInputs[1].value) textInputs[1].value = '65';
        if (!textInputs[2].value) textInputs[2].value = '12';
      }
    });
    
    await page.waitForTimeout(1000);
    
    // Fill animal names
    console.log('Filling animal names...');
    const animals = [
      '개', '고양이', '호랑이', '사자', '코끼리',
      '기린', '원숭이', '토끼', '곰', '늑대',
      '여우', '말', '소', '돼지', '양'
    ];
    
    await page.evaluate((animalList) => {
      const textInputs = Array.from(document.querySelectorAll('input[type="text"]'));
      // Skip the first 3 inputs (ID, age, education)
      let animalIndex = 0;
      for (let i = 3; i < textInputs.length && animalIndex < animalList.length; i++) {
        if (!textInputs[i].value) {
          textInputs[i].value = animalList[animalIndex];
          textInputs[i].dispatchEvent(new Event('input', { bubbles: true }));
          animalIndex++;
        }
      }
    }, animals);
    
    await page.waitForTimeout(1000);
    
    // Take screenshot before calculation
    await page.screenshot({ path: 'filled-form.png', fullPage: true });
    console.log('Form filled screenshot saved.');
    
    // Find and click calculate button
    console.log('Looking for calculate button...');
    const buttonSelectors = [
      'button:has-text("점수 계산하기")',
      'input[type="button"][value="점수 계산하기"]',
      'button:has-text("계산")',
      'input[type="submit"]',
      'button[onclick*="calculate"]',
      'input[onclick*="calculate"]',
      'button[onclick*="score"]',
      'input[onclick*="score"]'
    ];
    
    let buttonClicked = false;
    for (const selector of buttonSelectors) {
      try {
        const button = page.locator(selector).first();
        if (await button.count() > 0 && await button.isVisible()) {
          await button.click();
          console.log(`Clicked button with selector: ${selector}`);
          buttonClicked = true;
          break;
        }
      } catch (e) {
        console.log(`Button selector ${selector} failed:`, e.message);
      }
    }
    
    if (!buttonClicked) {
      console.log('Trying to find button by text content...');
      await page.evaluate(() => {
        const buttons = [...document.querySelectorAll('button'), ...document.querySelectorAll('input[type="button"]')];
        for (const btn of buttons) {
          if (btn.textContent?.includes('계산') || btn.value?.includes('계산') ||
              btn.textContent?.includes('점수') || btn.value?.includes('점수')) {
            btn.click();
            console.log('Clicked button by text content');
            break;
          }
        }
      });
    }
    
    // Wait for results
    console.log('Waiting for results to appear...');
    await page.waitForTimeout(5000);
    
    // Look for results
    console.log('Searching for results...');
    const resultsInfo = await page.evaluate(() => {
      const possibleResults = [];
      
      // Check for elements with result-related IDs or classes
      const selectors = [
        '#results', '#result', '.results', '.result',
        '[id*="result"]', '[class*="result"]',
        '[id*="score"]', '[class*="score"]',
        'div:has-text("점수")', 'div:has-text("결과")'
      ];
      
      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            if (el.textContent.trim()) {
              possibleResults.push({
                selector: selector,
                text: el.textContent.trim().substring(0, 200),
                visible: el.offsetParent !== null,
                display: window.getComputedStyle(el).display,
                visibility: window.getComputedStyle(el).visibility
              });
            }
          });
        } catch (e) {}
      });
      
      // Also check for any newly visible elements
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        if (div.offsetParent !== null && div.textContent.includes('점')) {
          possibleResults.push({
            selector: 'div with 점',
            text: div.textContent.trim().substring(0, 200),
            visible: true
          });
        }
      });
      
      return possibleResults;
    });
    
    console.log('Possible results found:', JSON.stringify(resultsInfo, null, 2));
    fs.writeFileSync('results-info.json', JSON.stringify(resultsInfo, null, 2));
    
    // Try to make hidden results visible
    await page.evaluate(() => {
      const hiddenElements = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"]');
      hiddenElements.forEach(el => {
        el.style.display = 'block';
        el.style.visibility = 'visible';
      });
    });
    
    await page.waitForTimeout(1000);
    
    // Take final screenshots
    await page.screenshot({ path: 'after-calculation-full.png', fullPage: true });
    await page.screenshot({ path: 'after-calculation-viewport.png' });
    console.log('Final screenshots saved.');
    
    // Save page content
    const pageContent = await page.content();
    fs.writeFileSync('final-page.html', pageContent);
    console.log('Page HTML saved to final-page.html');
    
    // Get all text content
    const allText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync('page-text.txt', allText);
    console.log('Page text saved to page-text.txt');
    
    // Keep browser open for manual inspection
    console.log('Keeping browser open for 15 seconds for manual inspection...');
    await page.waitForTimeout(15000);
    
  } catch (error) {
    console.error('Error occurred:', error);
    await page.screenshot({ path: 'error-screenshot.png', fullPage: true });
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();