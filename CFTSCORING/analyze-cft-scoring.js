const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false, // Set to true if you don't want to see the browser
    slowMo: 50 // Slow down actions by 50ms to see what's happening
  });
  
  const page = await browser.newPage();
  
  try {
    // Navigate to the CFT scoring page
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'networkidle'
    });
    
    // Wait for the page to be fully loaded
    await page.waitForTimeout(2000);
    
    // Fill in test data
    console.log('Filling in test data...');
    
    // Enter some test scores for immediate memory
    const immediateScores = [8, 7, 9]; // Example scores for 3 trials
    for (let i = 0; i < immediateScores.length; i++) {
      const selector = `input[id*="immediate"]:nth-of-type(${i + 1}), input[name*="immediate"]:nth-of-type(${i + 1}), input:nth-of-type(${i + 1})`;
      try {
        await page.fill(selector, immediateScores[i].toString());
      } catch (e) {
        // Try alternative selectors
        console.log(`Trying alternative selector for immediate trial ${i + 1}`);
        const inputs = await page.$$('input[type="number"], input[type="text"]');
        if (inputs[i]) {
          await inputs[i].fill(immediateScores[i].toString());
        }
      }
    }
    
    // Enter delayed recall score
    const delayedScore = 6;
    const delayedInputs = await page.$$('input[type="number"], input[type="text"]');
    if (delayedInputs.length > 3) {
      await delayedInputs[3].fill(delayedScore.toString());
    }
    
    // Enter recognition score
    const recognitionScore = 14;
    if (delayedInputs.length > 4) {
      await delayedInputs[4].fill(recognitionScore.toString());
    }
    
    // Wait a moment for any calculations to complete
    await page.waitForTimeout(1000);
    
    // Click calculate button if exists
    const calculateButton = await page.$('button:has-text("Calculate"), button:has-text("계산"), input[type="button"][value*="Calculate"], input[type="button"][value*="계산"]');
    if (calculateButton) {
      console.log('Clicking calculate button...');
      await calculateButton.click();
      await page.waitForTimeout(2000);
    }
    
    // Analyze the results table styling
    console.log('\nAnalyzing table styling...');
    
    // Find all tables on the page
    const tables = await page.$$('table');
    console.log(`Found ${tables.length} tables on the page`);
    
    // Check each table for gray backgrounds
    for (let i = 0; i < tables.length; i++) {
      const tableStyles = await tables[i].evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          border: computed.border,
          borderColor: computed.borderColor
        };
      });
      console.log(`\nTable ${i + 1} styles:`, tableStyles);
      
      // Check TR elements within this table
      const trs = await tables[i].$$('tr');
      console.log(`  Found ${trs.length} TR elements in table ${i + 1}`);
      
      for (let j = 0; j < Math.min(trs.length, 5); j++) { // Check first 5 rows
        const trStyles = await trs[j].evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            border: computed.border
          };
        });
        console.log(`    TR ${j + 1} styles:`, trStyles);
        
        // Check TD elements within this TR
        const tds = await trs[j].$$('td');
        if (tds.length > 0) {
          const tdStyles = await tds[0].evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              backgroundColor: computed.backgroundColor,
              color: computed.color
            };
          });
          console.log(`      First TD styles:`, tdStyles);
        }
      }
    }
    
    // Look for any results section
    const resultsSection = await page.$('.results, #results, [class*="result"], [id*="result"]');
    if (resultsSection) {
      console.log('\nFound results section, checking its styling...');
      const resultStyles = await resultsSection.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          padding: computed.padding,
          margin: computed.margin
        };
      });
      console.log('Results section styles:', resultStyles);
    }
    
    // Take screenshots
    console.log('\nTaking screenshots...');
    
    // Full page screenshot
    await page.screenshot({ 
      path: 'cft-scoring-full-page.png',
      fullPage: true
    });
    console.log('Full page screenshot saved as: cft-scoring-full-page.png');
    
    // Try to capture just the results table
    let resultTableFound = false;
    
    // Look for a table that might contain results
    const possibleResultSelectors = [
      'table:has(td:has-text("Total"))',
      'table:has(td:has-text("합계"))',
      'table:has(td:has-text("Score"))',
      'table:has(td:has-text("점수"))',
      'table:last-of-type',
      '.results table',
      '#results table'
    ];
    
    for (const selector of possibleResultSelectors) {
      try {
        const resultTable = await page.$(selector);
        if (resultTable) {
          const box = await resultTable.boundingBox();
          if (box) {
            await page.screenshot({
              path: 'cft-scoring-results-table.png',
              clip: {
                x: box.x - 10,
                y: box.y - 10,
                width: box.width + 20,
                height: box.height + 20
              }
            });
            console.log('Results table screenshot saved as: cft-scoring-results-table.png');
            resultTableFound = true;
            break;
          }
        }
      } catch (e) {
        // Continue trying other selectors
      }
    }
    
    if (!resultTableFound) {
      console.log('Could not find a specific results table, taking viewport screenshot instead');
      await page.screenshot({
        path: 'cft-scoring-viewport.png'
      });
    }
    
    // Check for any gray elements
    console.log('\nChecking for gray elements...');
    const grayElements = await page.$$eval('*', elements => {
      return elements
        .filter(el => {
          const computed = window.getComputedStyle(el);
          const bgColor = computed.backgroundColor;
          // Check if background color contains gray values
          return bgColor.includes('gray') || 
                 bgColor.includes('grey') ||
                 (bgColor.includes('rgb') && bgColor.match(/rgb\((\d+),\s*\1,\s*\1\)/));
        })
        .slice(0, 10) // Get first 10 gray elements
        .map(el => ({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          backgroundColor: window.getComputedStyle(el).backgroundColor,
          text: el.textContent.substring(0, 50)
        }));
    });
    
    if (grayElements.length > 0) {
      console.log('\nFound elements with gray backgrounds:');
      grayElements.forEach((el, i) => {
        console.log(`${i + 1}. ${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className : ''}`);
        console.log(`   Background: ${el.backgroundColor}`);
        console.log(`   Text: ${el.text}...`);
      });
    } else {
      console.log('No gray background elements found');
    }
    
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Keep browser open for 5 seconds to see the result
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();