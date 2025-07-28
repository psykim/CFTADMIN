const { chromium } = require('playwright');

(async () => {
  // Launch browser
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 300 // Slow down for visibility
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('Navigating directly to CFTSCORING form...');
    // Try navigating directly to the form with parameters
    await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html#form');
    
    // Wait a bit for page to load
    await page.waitForTimeout(2000);
    
    // Take initial screenshot
    await page.screenshot({ path: 'screenshots/direct-1-initial.png', fullPage: true });
    console.log('Initial screenshot taken');
    
    // Check if we're on the form page by looking for form elements
    const hasNameField = await page.$('#name') !== null;
    const hasAgeField = await page.$('#age') !== null;
    
    if (!hasNameField || !hasAgeField) {
      console.log('Form fields not found. Trying alternative navigation...');
      
      // Navigate back to main page
      await page.goto('https://psykim.github.io/CFTSCORING/CFTSCORING.html');
      await page.waitForTimeout(1000);
      
      // Try clicking on age group and then navigating
      console.log('Clicking on 45-60 age group...');
      // Look for buttons containing "추가"
      const buttons = await page.$$('button:has-text("추가")');
      if (buttons.length >= 4) {
        await buttons[3].click(); // 45-60 is the 4th button (0-indexed)
        console.log('Clicked 45-60 age group button');
      }
      
      await page.waitForTimeout(2000);
      
      // Now check for any navigation that might have occurred
      const currentUrl = page.url();
      console.log('Current URL:', currentUrl);
      
      // Check if there's a form displayed now
      const formVisible = await page.$('#assessmentForm') !== null;
      if (formVisible) {
        console.log('Assessment form found!');
      } else {
        // Try clicking the database query button
        console.log('Trying database query button...');
        const dbButton = await page.$('button:has-text("동물 데이터베이스 관리")');
        if (dbButton) {
          await dbButton.click();
          await page.waitForTimeout(2000);
        }
      }
    }
    
    // Take another screenshot
    await page.screenshot({ path: 'screenshots/direct-2-after-navigation.png', fullPage: true });
    
    // Try to find and fill form fields with different selectors
    console.log('Looking for form fields...');
    
    // Check for different possible selectors
    const selectors = {
      name: ['#name', 'input[name="name"]', 'input[placeholder*="이름"]'],
      age: ['#age', 'input[name="age"]', 'input[placeholder*="나이"]'],
      sex: ['#sex', 'select[name="sex"]'],
      education: ['#education', 'input[name="education"]', 'input[placeholder*="교육"]'],
      date: ['#testDate', 'input[type="date"]']
    };
    
    // Try to find fields
    for (const [field, selectorList] of Object.entries(selectors)) {
      for (const selector of selectorList) {
        const element = await page.$(selector);
        if (element) {
          console.log(`Found ${field} field with selector: ${selector}`);
          break;
        }
      }
    }
    
    // Get page content to analyze structure
    const pageContent = await page.content();
    const hasFormElements = pageContent.includes('name') || pageContent.includes('age');
    console.log('Page contains form-related content:', hasFormElements);
    
    // Save page HTML for analysis
    require('fs').writeFileSync('page-content.html', pageContent);
    console.log('Page HTML saved to page-content.html');
    
    // Check what's visible on the page
    const visibleText = await page.evaluate(() => document.body.innerText);
    console.log('\nVisible text preview (first 500 chars):');
    console.log(visibleText.substring(0, 500));
    
    console.log('\nTest completed. Browser will remain open for inspection.');
    
  } catch (error) {
    console.error('Error during test:', error);
    await page.screenshot({ path: 'screenshots/direct-error.png' });
  }
})();