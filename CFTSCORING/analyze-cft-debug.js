const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html', {
      waitUntil: 'networkidle'
    });
    
    // Wait longer for dynamic content
    await page.waitForTimeout(5000);
    
    // Debug: List all buttons on the page
    const buttons = await page.evaluate(() => {
      const buttons = [];
      document.querySelectorAll('button, input[type="button"], input[type="submit"], .btn').forEach((btn, idx) => {
        const rect = btn.getBoundingClientRect();
        buttons.push({
          index: idx,
          tagName: btn.tagName,
          text: btn.textContent || btn.value || '',
          classes: btn.className,
          id: btn.id,
          visible: btn.offsetParent !== null,
          display: window.getComputedStyle(btn).display,
          position: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          },
          backgroundColor: window.getComputedStyle(btn).backgroundColor
        });
      });
      return buttons;
    });
    
    console.log('Found buttons:');
    buttons.forEach(btn => {
      console.log(`- ${btn.tagName}#${btn.id || 'no-id'} "${btn.text.trim()}" 
        Classes: ${btn.classes}
        Visible: ${btn.visible}
        Display: ${btn.display}
        Position: ${JSON.stringify(btn.position)}
        Background: ${btn.backgroundColor}`);
    });
    
    // Enter animal names
    console.log('\nEntering animal names...');
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    await page.waitForTimeout(1000);
    
    // Try to find and click the calculate button using multiple strategies
    console.log('\nTrying to find calculate button...');
    
    // Strategy 1: Look for visible button with calculate text
    const calculateBtn = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, input[type="button"]'));
      const calcButton = buttons.find(btn => {
        const text = (btn.textContent || btn.value || '').toLowerCase();
        return (text.includes('계산') || text.includes('calculate')) && btn.offsetParent !== null;
      });
      if (calcButton) {
        calcButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return true;
      }
      return false;
    });
    
    if (calculateBtn) {
      await page.waitForTimeout(1000);
      
      // Click using JavaScript
      console.log('Clicking calculate button via JavaScript...');
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, input[type="button"]'));
        const calcButton = buttons.find(btn => {
          const text = (btn.textContent || btn.value || '').toLowerCase();
          return text.includes('계산') || text.includes('calculate');
        });
        if (calcButton) {
          calcButton.click();
        }
      });
      
      await page.waitForTimeout(3000);
    }
    
    // Check for any changes after clicking
    console.log('\nChecking for results...');
    
    // Look for any new visible elements
    const visibleElements = await page.evaluate(() => {
      const elements = [];
      
      // Check all elements for results-related content
      document.querySelectorAll('*').forEach(el => {
        const text = el.textContent || '';
        const id = el.id || '';
        const className = el.className || '';
        
        if ((text.includes('결과') || text.includes('점수') || text.includes('Result') || 
             text.includes('Score') || id.includes('result') || className.includes('result')) &&
            el.offsetParent !== null && el.children.length < 20) {
          
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            elements.push({
              tagName: el.tagName,
              id: id,
              className: className,
              text: text.substring(0, 200),
              backgroundColor: window.getComputedStyle(el).backgroundColor,
              display: window.getComputedStyle(el).display,
              bounds: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
            });
          }
        }
      });
      
      return elements;
    });
    
    console.log(`Found ${visibleElements.length} potential result elements`);
    visibleElements.slice(0, 5).forEach(el => {
      console.log(`- ${el.tagName}#${el.id}.${el.className}`);
      console.log(`  Text: ${el.text.substring(0, 50)}...`);
      console.log(`  Background: ${el.backgroundColor}`);
    });
    
    // Try to find and screenshot any tables
    const tables = await page.$$('table');
    console.log(`\nFound ${tables.length} tables`);
    
    for (let i = 0; i < tables.length; i++) {
      const isVisible = await tables[i].isVisible();
      if (isVisible) {
        const tableInfo = await tables[i].evaluate(table => {
          const info = {
            className: table.className,
            id: table.id,
            rowCount: table.rows.length,
            backgroundColor: window.getComputedStyle(table).backgroundColor,
            firstRowText: table.rows[0] ? table.rows[0].textContent.substring(0, 100) : ''
          };
          
          // Get background colors of first few rows
          info.rowBackgrounds = [];
          for (let i = 0; i < Math.min(5, table.rows.length); i++) {
            const row = table.rows[i];
            info.rowBackgrounds.push({
              index: i,
              backgroundColor: window.getComputedStyle(row).backgroundColor,
              text: row.textContent.substring(0, 50)
            });
          }
          
          return info;
        });
        
        console.log(`\nTable ${i + 1}:`, tableInfo);
        
        // Screenshot the table
        const box = await tables[i].boundingBox();
        if (box) {
          await page.screenshot({
            path: `cft-table-${i + 1}-closeup.png`,
            clip: {
              x: Math.max(0, box.x - 10),
              y: Math.max(0, box.y - 10),
              width: box.width + 20,
              height: box.height + 20
            }
          });
          console.log(`Table ${i + 1} screenshot saved`);
        }
      }
    }
    
    // Final screenshots
    await page.screenshot({
      path: 'cft-debug-final.png',
      fullPage: true
    });
    console.log('\nFinal screenshot saved');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\nKeeping browser open for manual inspection...');
    await page.waitForTimeout(20000);
    await browser.close();
  }
})();