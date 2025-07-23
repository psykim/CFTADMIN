const { chromium } = require('playwright');

(async () => {
  console.log('Opening GitHub in browser...\n');
  console.log('Please follow these steps manually:');
  console.log('1. Login to GitHub');
  console.log('2. Create new repository named "cftadmin"');
  console.log('3. Make it public');
  console.log('4. Click "Create repository"');
  console.log('5. Go to Settings > Pages');
  console.log('6. Select "main" branch and save\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({ viewport: null });
  const page = await context.newPage();
  
  // Open GitHub
  await page.goto('https://github.com');
  
  console.log('Browser is open. Complete the steps above.');
  console.log('\nGit commands to run after creating repository:');
  console.log('git remote add origin https://github.com/YOUR_USERNAME/cftadmin.git');
  console.log('git branch -M main');
  console.log('git push -u origin main');
  
  console.log('\nYour site will be at:');
  console.log('https://YOUR_USERNAME.github.io/cftadmin/animal-fluency-test-v2.html');
  
  // Keep browser open
  await page.waitForTimeout(300000); // 5 minutes
})();