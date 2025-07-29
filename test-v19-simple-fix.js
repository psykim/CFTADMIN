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

  try {
    // Load the file
    const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v19.html')}`;
    console.log('Loading:', filePath);
    await page.goto(filePath);
    
    // Directly test showResults function
    console.log('\n--- Testing showResults function ---');
    
    // Initialize test data
    await page.evaluate(() => {
      // Set up mock data
      window.animals = [
        { name: '개', timestamp: 5000, elapsedTime: 5000 },
        { name: '고양이', timestamp: 10000, elapsedTime: 10000 },
        { name: '소', timestamp: 20000, elapsedTime: 20000 },
        { name: '말', timestamp: 35000, elapsedTime: 35000 },
        { name: '돼지', timestamp: 50000, elapsedTime: 50000 }
      ];
      window.uniqueAnimals = new Set(['개', '고양이', '소', '말', '돼지']);
      window.startTime = Date.now() - 60000;
      window.endTime = Date.now();
    });
    
    // Get initial state
    const initialState = await page.evaluate(() => {
      const resultsSection = document.getElementById('resultsSection');
      const stats = document.getElementById('stats');
      return {
        resultsSection: {
          exists: !!resultsSection,
          display: resultsSection ? window.getComputedStyle(resultsSection).display : 'N/A'
        },
        stats: {
          exists: !!stats,
          display: stats ? window.getComputedStyle(stats).display : 'N/A'
        }
      };
    });
    console.log('Initial state:', initialState);
    
    // Call showResults
    console.log('\n--- Calling showResults() ---');
    await page.evaluate(() => {
      if (typeof showResults === 'function') {
        showResults();
      } else {
        console.error('showResults function not found!');
      }
    });
    
    // Check state after showResults
    const afterShowResults = await page.evaluate(() => {
      const resultsSection = document.getElementById('resultsSection');
      const stats = document.getElementById('stats');
      return {
        resultsSection: {
          exists: !!resultsSection,
          display: resultsSection ? window.getComputedStyle(resultsSection).display : 'N/A',
          style: resultsSection ? resultsSection.style.display : 'N/A'
        },
        stats: {
          exists: !!stats,
          display: stats ? window.getComputedStyle(stats).display : 'N/A',
          innerHTML: stats ? stats.innerHTML.substring(0, 200) : 'N/A'
        }
      };
    });
    console.log('After showResults:', afterShowResults);
    
    // Try to manually show resultsSection
    console.log('\n--- Manually showing resultsSection ---');
    await page.evaluate(() => {
      const resultsSection = document.getElementById('resultsSection');
      if (resultsSection) {
        resultsSection.style.display = 'block';
        console.log('Manually set resultsSection display to block');
      }
    });
    
    await page.screenshot({ path: 'v19-manual-results.png', fullPage: true });
    
    // Final state
    const finalState = await page.evaluate(() => {
      const resultsSection = document.getElementById('resultsSection');
      const stats = document.getElementById('stats');
      return {
        resultsSection: {
          exists: !!resultsSection,
          display: resultsSection ? window.getComputedStyle(resultsSection).display : 'N/A',
          visible: resultsSection ? resultsSection.offsetParent !== null : false
        },
        stats: {
          exists: !!stats,
          display: stats ? window.getComputedStyle(stats).display : 'N/A',
          visible: stats ? stats.offsetParent !== null : false
        }
      };
    });
    console.log('\nFinal state:', finalState);

  } catch (error) {
    console.error('Test error:', error);
  }

  console.log('\n--- Test complete. Press Ctrl+C to close. ---');
  await new Promise(() => {});
})();