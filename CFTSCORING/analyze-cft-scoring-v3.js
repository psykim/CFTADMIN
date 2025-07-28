const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
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
    
    // Debug: Print all input elements
    const inputs = await page.$$eval('input', elements => 
      elements.map(el => ({
        id: el.id,
        type: el.type,
        name: el.name,
        value: el.value,
        placeholder: el.placeholder
      }))
    );
    console.log('Found inputs:', inputs);
    
    // Fill in demographic data
    console.log('\nFilling in demographic data...');
    
    // Fill ID
    const idInput = await page.$('#subjectId');
    if (idInput) {
      await idInput.fill('12345');
      console.log('Filled ID');
    }
    
    // Try to find and click gender radio button
    const maleRadio = await page.$('input[type="radio"][value="male"], input[type="radio"][value="남성"], #male');
    if (maleRadio) {
      await maleRadio.click();
      console.log('Selected male gender');
    } else {
      // Try label click
      const maleLabel = await page.$('label:has-text("남성"), label:has-text("Male")');
      if (maleLabel) {
        await maleLabel.click();
        console.log('Clicked male label');
      }
    }
    
    // Fill age
    const ageInput = await page.$('#age');
    if (ageInput) {
      await ageInput.fill('65');
      console.log('Filled age');
    }
    
    // Fill education
    const eduInput = await page.$('#education');
    if (eduInput) {
      await eduInput.fill('12');
      console.log('Filled education');
    }
    
    // Fill in test scores
    console.log('\nFilling in test scores...');
    
    // Try different selectors for the time section inputs
    const timeInputs = [
      { selector: '#input-0-15, input[name*="0-15"], input[placeholder*="0-15"]', value: '6' },
      { selector: '#input-15-30, input[name*="15-30"], input[placeholder*="15-30"]', value: '5' },
      { selector: '#input-30-45, input[name*="30-45"], input[placeholder*="30-45"]', value: '4' },
      { selector: '#input-45-60, input[name*="45-60"], input[placeholder*="45-60"]', value: '3' }
    ];
    
    for (const { selector, value } of timeInputs) {
      const input = await page.$(selector);
      if (input) {
        await input.fill(value);
        console.log(`Filled time section with value: ${value}`);
      }
    }
    
    // Try to find all number inputs and fill them if the specific selectors didn't work
    const numberInputs = await page.$$('input[type="number"], input[type="text"]:not(#subjectId):not(#age):not(#education)');
    console.log(`Found ${numberInputs.length} number/text inputs`);
    
    if (numberInputs.length >= 4) {
      const values = ['6', '5', '4', '3'];
      for (let i = 0; i < Math.min(4, numberInputs.length); i++) {
        const currentValue = await numberInputs[i].inputValue();
        if (!currentValue) {
          await numberInputs[i].fill(values[i]);
          console.log(`Filled input ${i} with ${values[i]}`);
        }
      }
    }
    
    await page.waitForTimeout(1000);
    
    // Find and click calculate button
    console.log('\nLooking for calculate button...');
    const calculateButtons = await page.$$('button, input[type="button"], input[type="submit"]');
    console.log(`Found ${calculateButtons.length} buttons`);
    
    for (const button of calculateButtons) {
      const text = await button.textContent();
      const value = await button.getAttribute('value');
      console.log(`Button text: "${text}", value: "${value}"`);
      
      if (text && (text.includes('계산') || text.includes('Calculate') || text.includes('점수'))) {
        console.log('Clicking calculate button...');
        await button.click();
        await page.waitForTimeout(3000);
        break;
      }
    }
    
    // Look for results
    console.log('\nChecking for results...');
    
    // Check for any new elements that appeared
    await page.waitForTimeout(2000);
    
    // Look for tables
    const tables = await page.$$('table');
    console.log(`Found ${tables.length} tables`);
    
    for (let i = 0; i < tables.length; i++) {
      const isVisible = await tables[i].isVisible();
      if (isVisible) {
        console.log(`\nAnalyzing visible table ${i + 1}:`);
        
        const tableData = await tables[i].evaluate(table => {
          const data = {
            backgroundColor: window.getComputedStyle(table).backgroundColor,
            rows: []
          };
          
          const rows = table.querySelectorAll('tr');
          rows.forEach(row => {
            const rowData = {
              backgroundColor: window.getComputedStyle(row).backgroundColor,
              cells: []
            };
            
            const cells = row.querySelectorAll('td, th');
            cells.forEach(cell => {
              rowData.cells.push({
                text: cell.textContent.trim(),
                backgroundColor: window.getComputedStyle(cell).backgroundColor,
                color: window.getComputedStyle(cell).color
              });
            });
            
            data.rows.push(rowData);
          });
          
          return data;
        });
        
        console.log('Table background:', tableData.backgroundColor);
        tableData.rows.forEach((row, idx) => {
          console.log(`Row ${idx + 1} background:`, row.backgroundColor);
          row.cells.forEach((cell, cellIdx) => {
            if (cell.backgroundColor !== 'rgba(0, 0, 0, 0)' && cell.backgroundColor !== 'transparent') {
              console.log(`  Cell ${cellIdx + 1}: "${cell.text}" - Background: ${cell.backgroundColor}`);
            }
          });
        });
        
        // Take screenshot of this table
        const box = await tables[i].boundingBox();
        if (box) {
          await page.screenshot({
            path: `cft-table-${i + 1}.png`,
            clip: {
              x: box.x - 10,
              y: box.y - 10,
              width: box.width + 20,
              height: box.height + 20
            }
          });
          console.log(`Screenshot saved as cft-table-${i + 1}.png`);
        }
      }
    }
    
    // Check for any modal or popup
    const modals = await page.$$('.modal, [role="dialog"], .popup, .overlay');
    console.log(`\nFound ${modals.length} potential modal elements`);
    
    for (const modal of modals) {
      const isVisible = await modal.isVisible();
      if (isVisible) {
        console.log('Found visible modal/popup');
        const modalBox = await modal.boundingBox();
        if (modalBox) {
          await page.screenshot({
            path: 'cft-modal-result.png',
            clip: modalBox
          });
          console.log('Modal screenshot saved');
        }
      }
    }
    
    // Final full page screenshot
    await page.screenshot({
      path: 'cft-final-state.png',
      fullPage: true
    });
    console.log('\nFinal full page screenshot saved');
    
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    console.log('\nKeeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    await browser.close();
  }
})();