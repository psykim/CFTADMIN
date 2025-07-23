const { chromium } = require('playwright');

(async () => {
  console.log('Starting GitHub setup automation...\n');
  console.log('This script will:');
  console.log('1. Open GitHub in a browser');
  console.log('2. Wait for you to login');
  console.log('3. Create a new repository');
  console.log('4. Show you the git commands to run\n');
  
  const REPO_NAME = 'cftadmin';
  let username = '';
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: null
  });
  
  const page = await context.newPage();
  
  try {
    // Step 1: Open GitHub
    console.log('Opening GitHub...');
    await page.goto('https://github.com');
    
    // Wait for user to login (check for avatar menu)
    console.log('Waiting for login... (checking every 2 seconds)');
    let loggedIn = false;
    let attempts = 0;
    
    while (!loggedIn && attempts < 60) { // 2 minutes max
      try {
        await page.waitForSelector('img[alt*="@"]', { timeout: 2000 });
        loggedIn = true;
        console.log('✓ Login detected!');
      } catch {
        attempts++;
        console.log(`  Checking... (${attempts * 2}s)`);
      }
    }
    
    if (!loggedIn) {
      console.log('❌ Login timeout. Please run the script again after logging in.');
      await browser.close();
      return;
    }
    
    // Step 2: Create repository
    console.log('\nNavigating to create new repository...');
    await page.goto('https://github.com/new');
    await page.waitForSelector('input[name="repository[name]"]');
    
    console.log('Filling repository details...');
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    
    // Make it public
    const publicRadio = await page.$('input#repository_visibility_public');
    if (publicRadio) {
      await publicRadio.click();
      console.log('✓ Set to Public');
    }
    
    console.log('Creating repository...');
    await page.click('button[type="submit"]:has-text("Create repository")');
    
    // Wait for repository page
    await page.waitForURL(/github\.com\/[^\/]+\/cftadmin/);
    console.log('✓ Repository created!');
    
    // Get username from URL
    const url = page.url();
    const match = url.match(/github\.com\/([^\/]+)\//);
    username = match ? match[1] : 'YOUR_USERNAME';
    
    console.log(`\n📋 Repository URL: ${url}`);
    console.log(`👤 Username: ${username}`);
    
    // Step 3: Show git commands
    console.log('\n📝 Run these commands in your terminal:\n');
    console.log(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
    console.log('git branch -M main');
    console.log('git push -u origin main');
    
    // Step 4: Navigate to Pages settings
    console.log('\n\nNavigating to GitHub Pages settings...');
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    
    console.log('\n⚙️  To enable GitHub Pages:');
    console.log('1. In the browser, find "Branch" section');
    console.log('2. Click the "None" dropdown');
    console.log('3. Select "main"');
    console.log('4. Click "Save"');
    
    console.log(`\n🌐 Your site will be available at:`);
    console.log(`https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    
    console.log('\n✅ Script complete! Browser will close in 30 seconds...');
    console.log('(You can close it earlier if you\'re done)');
    
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('- Make sure you\'re logged into GitHub');
    console.log('- The repository name might already exist');
    console.log('- Check your internet connection');
  } finally {
    await browser.close();
  }
})();