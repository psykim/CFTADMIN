const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ 
    headless: true
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the HTML file
  const filePath = path.join(__dirname, 'CFTSCORING.html');
  await page.goto(`file://${filePath}`);
  
  console.log('Page loaded, analyzing CSS rules...\n');
  
  // Extract all CSS rules related to score table
  const cssRules = await page.evaluate(() => {
    const rules = {
      scoreTable: [],
      tableCells: [],
      specificIds: [],
      allTableRules: []
    };
    
    // Helper to extract CSS text
    const getCSSText = (rule) => {
      if (rule.style) {
        const styles = {};
        for (let i = 0; i < rule.style.length; i++) {
          const prop = rule.style[i];
          styles[prop] = rule.style.getPropertyValue(prop);
        }
        return styles;
      }
      return {};
    };
    
    // Search through all stylesheets
    for (let sheet of document.styleSheets) {
      try {
        for (let rule of sheet.cssRules || sheet.rules) {
          if (rule.selectorText) {
            // Score table specific
            if (rule.selectorText.includes('.score-table')) {
              rules.scoreTable.push({
                selector: rule.selectorText,
                styles: getCSSText(rule)
              });
            }
            
            // Table cells
            if (rule.selectorText.includes('td') || rule.selectorText.includes('th')) {
              const styles = getCSSText(rule);
              if (Object.keys(styles).length > 0) {
                rules.tableCells.push({
                  selector: rule.selectorText,
                  styles: styles
                });
              }
            }
            
            // Specific IDs
            if (rule.selectorText.includes('#totalScore') || 
                rule.selectorText.includes('#categoryScore') || 
                rule.selectorText.includes('#avgClusterSize')) {
              rules.specificIds.push({
                selector: rule.selectorText,
                styles: getCSSText(rule)
              });
            }
            
            // All table-related rules
            if (rule.selectorText.includes('table')) {
              rules.allTableRules.push({
                selector: rule.selectorText,
                styles: getCSSText(rule)
              });
            }
          }
        }
      } catch (e) {
        // Some stylesheets might not be accessible
      }
    }
    
    return rules;
  });
  
  console.log('=== SCORE TABLE CSS RULES ===');
  console.log(JSON.stringify(cssRules.scoreTable, null, 2));
  
  console.log('\n=== TABLE CELL CSS RULES ===');
  cssRules.tableCells.forEach(rule => {
    if (rule.styles['background-color'] || rule.styles['background']) {
      console.log(`${rule.selector}:`);
      console.log(`  Background: ${rule.styles['background-color'] || rule.styles['background']}`);
    }
  });
  
  console.log('\n=== SPECIFIC ID CSS RULES ===');
  console.log(JSON.stringify(cssRules.specificIds, null, 2));
  
  console.log('\n=== ALL TABLE-RELATED RULES ===');
  cssRules.allTableRules.forEach(rule => {
    if (rule.styles['background-color'] || rule.styles['background']) {
      console.log(`${rule.selector}:`);
      console.log(`  Background: ${rule.styles['background-color'] || rule.styles['background']}`);
    }
  });
  
  await browser.close();
})();