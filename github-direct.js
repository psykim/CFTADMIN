const { chromium } = require('playwright');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('GitHub Automation - Direct Mode\n');
  console.log('IMPORTANT: Login to GitHub manually in the browser that opens.\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Open GitHub login page
    console.log('1. Opening GitHub login page...');
    await page.goto('https://github.com/login');
    
    // Wait 60 seconds for manual login
    console.log('2. You have 60 seconds to login...');
    console.log('   (Login with your GitHub credentials in the browser)');
    await page.waitForTimeout(60000);
    
    // Try to create repository
    console.log('\n3. Attempting to create repository...');
    await page.goto('https://github.com/new');
    
    // Check if we're on the new repo page
    const hasRepoForm = await page.$('input[name="repository[name]"]');
    
    if (!hasRepoForm) {
      console.log('❌ Not logged in. Please run again and login faster.');
      await browser.close();
      return;
    }
    
    // Fill repository details
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    await page.click('input#repository_visibility_public');
    
    console.log('4. Creating repository...');
    await page.click('button[type="submit"]:has-text("Create repository")');
    
    // Wait for navigation
    await page.waitForTimeout(3000);
    
    // Get username from URL
    const url = page.url();
    const match = url.match(/github\.com\/([^\/]+)\//);
    const username = match ? match[1] : 'YOUR_USERNAME';
    
    console.log(`✓ Repository created!`);
    console.log(`  URL: ${url}`);
    console.log(`  Username: ${username}`);
    
    // Git commands
    console.log('\n5. Running git commands...');
    
    try {
      await execPromise('git remote remove origin').catch(() => {});
      await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
      await execPromise('git branch -M main');
      await execPromise('git push -u origin main');
      console.log('✓ Code pushed!');
    } catch (e) {
      console.log('Git error:', e.message);
    }
    
    // Navigate to Pages
    console.log('\n6. Opening GitHub Pages settings...');
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    
    console.log('\n📋 Manual steps:');
    console.log('1. In the browser, click "None" dropdown');
    console.log('2. Select "main"');
    console.log('3. Click "Save"');
    
    console.log(`\n🌐 Your site will be at:`);
    console.log(`https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    
    console.log('\nKeeping browser open for 30 seconds...');
    await page.waitForTimeout(30000);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();