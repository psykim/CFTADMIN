const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    devtools: true 
  });
  const context = await browser.newContext({
    permissions: ['microphone']
  });
  const page = await context.newPage();

  // Enable console logging
  page.on('console', msg => {
    console.log(`CONSOLE [${msg.type()}]:`, msg.text());
  });

  // Enable error logging
  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error);
  });

  try {
    // Load the file
    const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v19.html')}`;
    console.log('Loading:', filePath);
    await page.goto(filePath);
    
    // Take initial screenshot
    await page.screenshot({ path: 'v19-1-initial.png', fullPage: true });
    
    // Click 시작하기 button
    console.log('\n--- Clicking 시작하기 button ---');
    await page.click('button:has-text("시작하기")');
    await page.waitForTimeout(2000);
    
    // Check if we're in practice phase
    const practiceVisible = await page.isVisible('#practiceSection');
    console.log('Practice section visible:', practiceVisible);
    
    if (practiceVisible) {
      // Wait for practice phase to complete (it should auto-advance after 10 seconds)
      console.log('\n--- Waiting for practice phase to complete ---');
      await page.screenshot({ path: 'v19-2-practice.png', fullPage: true });
      
      // Wait for practice to end and main test to start
      await page.waitForSelector('#mainTestSection', { state: 'visible', timeout: 15000 });
      console.log('Main test section is now visible');
    }
    
    // Now in main test phase
    console.log('\n--- Main test phase started ---');
    await page.screenshot({ path: 'v19-3-main-test.png', fullPage: true });
    
    // Check timer status
    const timerText = await page.textContent('#timer');
    console.log('Timer text:', timerText);
    
    // Simulate saying some animal names by programmatically adding them
    console.log('\n--- Simulating animal input ---');
    
    // Check if we can interact with the speech recognition simulation
    // First, let's see what's in the page
    const mainTestHTML = await page.evaluate(() => {
      const mainTest = document.getElementById('mainTestSection');
      return mainTest ? mainTest.innerHTML : 'Main test section not found';
    });
    console.log('Main test section HTML:', mainTestHTML.substring(0, 500) + '...');
    
    // Wait for the test to complete (60 seconds)
    console.log('\n--- Waiting for test completion (monitoring for 65 seconds) ---');
    
    // Monitor for results section appearance
    let resultsAppeared = false;
    const startTime = Date.now();
    
    while (Date.now() - startTime < 65000) {
      // Check multiple conditions
      const resultsVisible = await page.isVisible('#resultsSection').catch(() => false);
      const resultsText = await page.textContent('body');
      const containsResultsPhrase = resultsText.includes('결과를 확인해 주세요');
      
      if (resultsVisible || containsResultsPhrase) {
        console.log('\n!!! Results trigger detected !!!');
        console.log('Results section visible:', resultsVisible);
        console.log('Contains results phrase:', containsResultsPhrase);
        resultsAppeared = true;
        break;
      }
      
      // Log timer status every 5 seconds
      if ((Date.now() - startTime) % 5000 < 1000) {
        const currentTimer = await page.textContent('#timer').catch(() => 'Timer not found');
        console.log(`Time elapsed: ${Math.floor((Date.now() - startTime) / 1000)}s, Timer: ${currentTimer}`);
      }
      
      await page.waitForTimeout(1000);
    }
    
    console.log('\n--- Test completion phase ---');
    await page.screenshot({ path: 'v19-4-after-test.png', fullPage: true });
    
    // Get all console errors from browser
    const consoleErrors = await page.evaluate(() => {
      const errors = [];
      // Check if there are any uncaught errors
      return errors;
    });
    
    // Check results section in detail
    console.log('\n--- Checking results section ---');
    const resultsData = await page.evaluate(() => {
      const results = document.getElementById('resultsSection');
      const data = {
        exists: !!results,
        id: results?.id,
        className: results?.className,
        style: results ? {
          display: results.style.display,
          visibility: results.style.visibility,
          opacity: results.style.opacity,
          position: results.style.position,
          computedDisplay: window.getComputedStyle(results).display,
          computedVisibility: window.getComputedStyle(results).visibility,
          computedOpacity: window.getComputedStyle(results).opacity
        } : null,
        innerHTML: results ? results.innerHTML.substring(0, 200) : null,
        parentElement: results ? results.parentElement.tagName : null,
        offsetParent: results ? (results.offsetParent ? results.offsetParent.tagName : 'null') : null,
        boundingRect: results ? results.getBoundingClientRect() : null
      };
      
      // Also check all sections
      const sections = ['startSection', 'practiceSection', 'mainTestSection', 'resultsSection'];
      data.allSections = {};
      sections.forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
          data.allSections[id] = {
            display: window.getComputedStyle(elem).display,
            visibility: window.getComputedStyle(elem).visibility
          };
        }
      });
      
      return data;
    });
    
    console.log('\nResults section data:', JSON.stringify(resultsData, null, 2));
    
    // Check for showResults function
    const showResultsExists = await page.evaluate(() => {
      return typeof showResults === 'function';
    });
    console.log('\nshowResults function exists:', showResultsExists);
    
    // Try to manually call showResults if it exists
    if (showResultsExists) {
      console.log('\n--- Manually calling showResults() ---');
      await page.evaluate(() => {
        if (typeof showResults === 'function') {
          console.log('Calling showResults() manually');
          showResults();
        }
      });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: 'v19-5-after-manual-showResults.png', fullPage: true });
    }
    
    // Get final state of all sections
    const finalState = await page.evaluate(() => {
      const state = {
        sections: {},
        globalVariables: {}
      };
      
      // Check all sections
      ['startSection', 'practiceSection', 'mainTestSection', 'resultsSection'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
          state.sections[id] = {
            exists: true,
            display: window.getComputedStyle(elem).display,
            innerHTML: elem.innerHTML.substring(0, 100)
          };
        } else {
          state.sections[id] = { exists: false };
        }
      });
      
      // Check global variables
      const globalVars = ['allAnimals', 'isRecording', 'isPractice', 'mainTestStartTime'];
      globalVars.forEach(varName => {
        try {
          state.globalVariables[varName] = window[varName];
        } catch (e) {
          state.globalVariables[varName] = 'undefined';
        }
      });
      
      return state;
    });
    
    console.log('\n--- Final State ---');
    console.log(JSON.stringify(finalState, null, 2));
    
    // Save the full page HTML for analysis
    const fullHTML = await page.content();
    require('fs').writeFileSync('v19-final-page.html', fullHTML);
    console.log('\nFull page HTML saved to v19-final-page.html');
    
    // Take final screenshot
    await page.screenshot({ path: 'v19-6-final.png', fullPage: true });

  } catch (error) {
    console.error('Test error:', error);
    await page.screenshot({ path: 'v19-error.png', fullPage: true });
  }

  // Keep browser open for manual inspection
  console.log('\n--- Test complete. Browser will remain open for inspection. ---');
  console.log('Press Ctrl+C to close.');
  
  // Wait indefinitely
  await new Promise(() => {});
})();