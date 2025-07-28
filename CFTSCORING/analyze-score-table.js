const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to CFT scoring page...');
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    // Fill animal names
    console.log('Entering animal names...');
    await page.fill('#input-0-15', '개, 고양이, 호랑이, 사자, 토끼, 곰');
    await page.fill('#input-15-30', '원숭이, 코끼리, 기린, 얼룩말, 하마');
    await page.fill('#input-30-45', '독수리, 참새, 비둘기, 까치');
    await page.fill('#input-45-60', '뱀, 거북이, 악어');
    
    // Click calculate
    console.log('Clicking calculate button...');
    await page.evaluate(() => {
      const btn = document.querySelector('button.calculate-btn');
      if (btn) btn.click();
    });
    
    // Wait for score table to appear
    console.log('Waiting for score table...');
    await page.waitForTimeout(3000);
    
    // Find and analyze the score table
    const scoreTable = await page.$('table.score-table');
    if (scoreTable) {
      console.log('\nFound score table!');
      
      // Scroll to the table
      await scoreTable.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      
      // Detailed analysis of the score table
      const tableAnalysis = await scoreTable.evaluate(table => {
        const analysis = {
          tableStyles: {
            backgroundColor: window.getComputedStyle(table).backgroundColor,
            border: window.getComputedStyle(table).border,
            borderCollapse: window.getComputedStyle(table).borderCollapse,
            width: window.getComputedStyle(table).width,
            margin: window.getComputedStyle(table).margin
          },
          rows: []
        };
        
        // Get tbody if exists
        const tbody = table.querySelector('tbody') || table;
        const tbodyStyles = window.getComputedStyle(tbody);
        analysis.tbodyStyles = {
          backgroundColor: tbodyStyles.backgroundColor
        };
        
        // Analyze each row
        const rows = table.querySelectorAll('tr');
        rows.forEach((row, rowIndex) => {
          const rowStyles = window.getComputedStyle(row);
          const rowData = {
            index: rowIndex,
            styles: {
              backgroundColor: rowStyles.backgroundColor,
              color: rowStyles.color,
              border: rowStyles.border,
              height: rowStyles.height
            },
            cells: []
          };
          
          // Check if this is a gray row
          const bg = rowStyles.backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)') {
            const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
              const [_, r, g, b] = match;
              if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20) {
                rowData.isGrayRow = true;
                rowData.grayShade = `rgb(${r}, ${g}, ${b})`;
              }
            }
          }
          
          // Analyze each cell
          const cells = row.querySelectorAll('td, th');
          cells.forEach((cell, cellIndex) => {
            const cellStyles = window.getComputedStyle(cell);
            const cellData = {
              index: cellIndex,
              tagName: cell.tagName,
              text: cell.textContent.trim(),
              styles: {
                backgroundColor: cellStyles.backgroundColor,
                color: cellStyles.color,
                border: cellStyles.border,
                padding: cellStyles.padding,
                textAlign: cellStyles.textAlign,
                fontWeight: cellStyles.fontWeight
              }
            };
            
            // Check if cell has gray background
            const cellBg = cellStyles.backgroundColor;
            if (cellBg && cellBg !== 'rgba(0, 0, 0, 0)') {
              const match = cellBg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
              if (match) {
                const [_, r, g, b] = match;
                if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20) {
                  cellData.isGrayCell = true;
                  cellData.grayShade = `rgb(${r}, ${g}, ${b})`;
                }
              }
            }
            
            rowData.cells.push(cellData);
          });
          
          analysis.rows.push(rowData);
        });
        
        return analysis;
      });
      
      console.log('\n=== SCORE TABLE ANALYSIS ===');
      console.log('\nTable Styles:', tableAnalysis.tableStyles);
      console.log('Tbody Styles:', tableAnalysis.tbodyStyles);
      
      console.log('\n=== ROW BY ROW ANALYSIS ===');
      tableAnalysis.rows.forEach(row => {
        console.log(`\nRow ${row.index + 1}:`);
        console.log(`  Background: ${row.styles.backgroundColor}`);
        if (row.isGrayRow) {
          console.log(`  >>> THIS ROW HAS GRAY BACKGROUND: ${row.grayShade} <<<`);
        }
        
        console.log('  Cells:');
        row.cells.forEach(cell => {
          console.log(`    ${cell.tagName}[${cell.index}]: "${cell.text}"`);
          console.log(`      Background: ${cell.styles.backgroundColor}`);
          console.log(`      Text color: ${cell.styles.color}`);
          if (cell.isGrayCell) {
            console.log(`      >>> THIS CELL HAS GRAY BACKGROUND: ${cell.grayShade} <<<`);
          }
        });
      });
      
      // Take close-up screenshot of the score table
      const tableBox = await scoreTable.boundingBox();
      if (tableBox) {
        await page.screenshot({
          path: 'cft-score-table-closeup.png',
          clip: {
            x: Math.max(0, tableBox.x - 10),
            y: Math.max(0, tableBox.y - 10),
            width: tableBox.width + 20,
            height: tableBox.height + 20
          }
        });
        console.log('\n✅ Score table close-up screenshot saved as: cft-score-table-closeup.png');
      }
      
      // Also take a zoomed screenshot
      await page.evaluate(() => {
        document.body.style.zoom = '150%';
      });
      await page.waitForTimeout(500);
      
      const zoomedBox = await scoreTable.boundingBox();
      if (zoomedBox) {
        await page.screenshot({
          path: 'cft-score-table-zoomed.png',
          clip: {
            x: Math.max(0, zoomedBox.x - 10),
            y: Math.max(0, zoomedBox.y - 10),
            width: zoomedBox.width + 20,
            height: zoomedBox.height + 20
          }
        });
        console.log('✅ Zoomed score table screenshot saved as: cft-score-table-zoomed.png');
      }
      
      // Reset zoom
      await page.evaluate(() => {
        document.body.style.zoom = '100%';
      });
      
    } else {
      console.log('Score table not found!');
    }
    
    // Check for any other gray elements on the page
    console.log('\n=== CHECKING FOR OTHER GRAY ELEMENTS ===');
    const grayElements = await page.evaluate(() => {
      const grays = [];
      document.querySelectorAll('*').forEach(el => {
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (match) {
            const [_, r, g, b] = match;
            if (Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20 && 
                r > 100 && r < 250) { // Gray range, not white or black
              grays.push({
                tagName: el.tagName,
                className: el.className,
                id: el.id,
                backgroundColor: bg,
                text: el.textContent.substring(0, 50)
              });
            }
          }
        }
      });
      return grays.slice(0, 20); // First 20 gray elements
    });
    
    if (grayElements.length > 0) {
      console.log(`Found ${grayElements.length} elements with gray backgrounds:`);
      grayElements.forEach(el => {
        console.log(`- ${el.tagName}#${el.id}.${el.className} - ${el.backgroundColor}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\nBrowser will remain open for 20 seconds...');
    await page.waitForTimeout(20000);
    await browser.close();
  }
})();