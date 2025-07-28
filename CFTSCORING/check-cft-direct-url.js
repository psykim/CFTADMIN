const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Try different possible URLs
    const urls = [
      'https://psykim.github.io/CFTSCORING/CFTSCORING.html',
      'https://psykim.github.io/CFTSCORING/',
      'https://psykim.github.io/CFTSCORING/index.html',
      'https://psykim.github.io/CFT/',
      'https://psykim.github.io/cft-scoring/'
    ];
    
    for (const url of urls) {
      console.log(`\nTrying URL: ${url}`);
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(2000);
        
        // Check page title and content
        const title = await page.title();
        const pageText = await page.evaluate(() => document.body.innerText);
        
        console.log(`Title: ${title}`);
        console.log(`Content preview: ${pageText.substring(0, 200)}...`);
        
        // Check if it's the CFT scoring page
        if (title.includes('CFT') || title.includes('Rey') || 
            pageText.includes('복사') || pageText.includes('즉시회상') || 
            pageText.includes('지연회상') || pageText.includes('재인')) {
          console.log('✓ This appears to be the CFT scoring page!');
          
          // Take screenshot
          await page.screenshot({ 
            path: `screenshots/url-check-${url.replace(/[^a-z0-9]/gi, '_')}.png`, 
            fullPage: true 
          });
          
          // Look for form fields
          const hasNameField = await page.$('#name') !== null;
          const hasCopyFields = await page.$('#copy1') !== null;
          
          console.log(`Has name field: ${hasNameField}`);
          console.log(`Has copy fields: ${hasCopyFields}`);
          
          if (hasNameField && hasCopyFields) {
            console.log('✓ Found CFT form fields!');
            break;
          }
        } else {
          console.log('✗ Not the CFT scoring page');
        }
      } catch (error) {
        console.log(`Error loading ${url}: ${error.message}`);
      }
    }
    
    // Also check GitHub repository
    console.log('\n\nChecking GitHub repository for clues...');
    await page.goto('https://github.com/psykim/CFTSCORING');
    await page.waitForTimeout(2000);
    
    const repoExists = await page.evaluate(() => {
      return !document.body.innerText.includes('404');
    });
    
    if (repoExists) {
      console.log('GitHub repository exists');
      await page.screenshot({ path: 'screenshots/github-repo.png', fullPage: true });
      
      // Check for any README or description
      const description = await page.$eval('.f4.my-3', el => el.textContent).catch(() => 'No description');
      console.log('Repository description:', description);
    } else {
      console.log('GitHub repository not found or private');
    }
    
    console.log('\nSearch completed. Browser will remain open.');
    
  } catch (error) {
    console.error('Error:', error);
  }
})();