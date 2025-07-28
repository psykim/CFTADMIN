const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100 
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the HTML file
  const filePath = path.join(__dirname, 'CFTSCORING.html');
  await page.goto(`file://${filePath}`);
  
  console.log('Page loaded');
  
  // Wait for the page to be ready
  await page.waitForSelector('.calculate-btn');
  
  // Fill in basic info
  await page.fill('#subjectId', '테스트');
  await page.fill('#age', '65');
  await page.fill('#education', '12');
  
  // Add some test responses for each time period
  const testAnimals = ['개', '고양이', '호랑이', '사자', '코끼리', '기린', '원숭이', '토끼', '말', '소', '돼지', '닭', '오리', '거위', '참새', '비둘기', '까마귀', '독수리'];
  
  // Function to add responses for a time period
  async function addAnimalsForPeriod(period) {
    const animalsPerPeriod = 4; // Add 4 animals per 15-second period
    const startIndex = period * animalsPerPeriod;
    
    for (let i = 0; i < animalsPerPeriod && startIndex + i < testAnimals.length; i++) {
      const inputSelector = `#input-${getPeriodString(period)}`;
      await page.fill(inputSelector, testAnimals[startIndex + i]);
      await page.click(`button[onclick="addResponse('${getPeriodString(period)}')"]`);
      await page.waitForTimeout(100);
    }
  }
  
  function getPeriodString(period) {
    const periods = ['0-15', '15-30', '30-45', '45-60'];
    return periods[period];
  }
  
  // Add animals for each time period
  for (let period = 0; period < 4; period++) {
    await addAnimalsForPeriod(period);
  }
  
  console.log('Animals added');
  
  // Click calculate button
  await page.click('.calculate-btn');
  
  // Wait for results to be visible
  await page.waitForSelector('#results', { state: 'visible' });
  await page.waitForTimeout(1000);
  
  console.log('\n=== RESULTS VISIBLE ===\n');
  
  // Get computed styles for score cells
  const scoreStyles = await page.evaluate(() => {
    const results = {};
    
    // Get the score cells
    const cells = ['totalScore', 'categoryScore', 'avgClusterSize'];
    
    cells.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const parentTr = element.closest('tr');
        const parentStyle = parentTr ? window.getComputedStyle(parentTr) : null;
        
        results[id] = {
          element: {
            backgroundColor: computedStyle.backgroundColor,
            color: computedStyle.color,
            border: computedStyle.border,
            padding: computedStyle.padding,
            innerHTML: element.innerHTML,
            className: element.className,
            style: element.getAttribute('style')
          },
          parent: parentTr ? {
            backgroundColor: parentStyle.backgroundColor,
            className: parentTr.className,
            style: parentTr.getAttribute('style')
          } : null
        };
      }
    });
    
    // Also get the table styles
    const table = document.querySelector('.score-table');
    if (table) {
      const tableStyle = window.getComputedStyle(table);
      results.table = {
        backgroundColor: tableStyle.backgroundColor,
        className: table.className
      };
    }
    
    // Get all CSS rules for score-table
    const styleSheets = Array.from(document.styleSheets);
    results.cssRules = [];
    
    styleSheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.selectorText && rule.selectorText.includes('score-table')) {
            results.cssRules.push({
              selector: rule.selectorText,
              style: rule.style.cssText
            });
          }
        });
      } catch (e) {
        // Some stylesheets might not be accessible
      }
    });
    
    return results;
  });
  
  console.log('=== COMPUTED STYLES ===');
  console.log(JSON.stringify(scoreStyles, null, 2));
  
  // Take a close-up screenshot of just the score table
  const scoreTable = await page.locator('.score-table');
  await scoreTable.screenshot({ path: 'score-table-closeup.png' });
  console.log('\nScore table screenshot saved as: score-table-closeup.png');
  
  // Get the actual background colors being applied
  const actualColors = await page.evaluate(() => {
    const getActualBgColor = (id) => {
      const element = document.getElementById(id);
      if (!element) return null;
      
      // Get all styles that could affect background
      const styles = {
        computedBgColor: window.getComputedStyle(element).backgroundColor,
        elementBgColor: element.style.backgroundColor,
        parentBgColor: element.parentElement ? window.getComputedStyle(element.parentElement).backgroundColor : null,
        hasClassWithBg: element.className,
        rect: { 
          left: element.getBoundingClientRect().left, 
          top: element.getBoundingClientRect().top, 
          width: element.getBoundingClientRect().width, 
          height: element.getBoundingClientRect().height 
        }
      };
      
      // Check all parent elements for background colors
      let parent = element.parentElement;
      const parentBgs = [];
      while (parent && parent !== document.body) {
        const parentBg = window.getComputedStyle(parent).backgroundColor;
        if (parentBg && parentBg !== 'rgba(0, 0, 0, 0)') {
          parentBgs.push({
            tagName: parent.tagName,
            className: parent.className,
            backgroundColor: parentBg
          });
        }
        parent = parent.parentElement;
      }
      styles.parentBackgrounds = parentBgs;
      
      return styles;
    };
    
    return {
      totalScore: getActualBgColor('totalScore'),
      categoryScore: getActualBgColor('categoryScore'),
      avgClusterSize: getActualBgColor('avgClusterSize')
    };
  });
  
  console.log('\n=== ACTUAL BACKGROUND COLORS ===');
  console.log(JSON.stringify(actualColors, null, 2));
  
  // Check specific CSS rules
  const cssAnalysis = await page.evaluate(() => {
    const analysis = {
      scoreTableCSS: [],
      tdCSS: [],
      specificCellCSS: []
    };
    
    // Get all stylesheets
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules) {
          if (rule.selectorText) {
            // Check for score-table related rules
            if (rule.selectorText.includes('.score-table')) {
              analysis.scoreTableCSS.push({
                selector: rule.selectorText,
                style: rule.style.cssText
              });
            }
            // Check for td rules
            if (rule.selectorText.includes('td') && rule.style.backgroundColor) {
              analysis.tdCSS.push({
                selector: rule.selectorText,
                backgroundColor: rule.style.backgroundColor
              });
            }
            // Check for specific ID rules
            if (rule.selectorText.includes('#totalScore') || 
                rule.selectorText.includes('#categoryScore') || 
                rule.selectorText.includes('#avgClusterSize')) {
              analysis.specificCellCSS.push({
                selector: rule.selectorText,
                style: rule.style.cssText
              });
            }
          }
        }
      } catch (e) {
        // Some stylesheets may not be accessible
      }
    }
    
    return analysis;
  });
  
  console.log('\n=== CSS ANALYSIS ===');
  console.log(JSON.stringify(cssAnalysis, null, 2));
  
  // Take a full page screenshot for reference
  await page.screenshot({ path: 'full-results-page.png', fullPage: true });
  console.log('Full page screenshot saved as: full-results-page.png');
  
  // Keep browser open for inspection
  console.log('\nBrowser will remain open for manual inspection...');
  console.log('Press Ctrl+C to close');
  
  // Keep the process alive
  await new Promise(() => {});
})();