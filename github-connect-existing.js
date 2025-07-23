const { chromium } = require('playwright');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('Connecting to existing Chrome browser...');
  console.log('Please make sure Chrome is running and you are logged into GitHub.');
  console.log('\nTo enable remote debugging:');
  console.log('1. Close all Chrome windows');
  console.log('2. Run: /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222');
  console.log('3. Login to GitHub in the opened Chrome');
  console.log('4. Run this script again\n');
  
  try {
    // 기존 Chrome 브라우저에 연결
    const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
    const contexts = browser.contexts();
    const context = contexts[0] || await browser.newContext();
    
    // 새 탭 열기
    const page = await context.newPage();
    
    console.log('Connected to Chrome!');
    
    // Step 1: 새 저장소 생성
    console.log('\nStep 1: Creating new repository...');
    await page.goto('https://github.com/new');
    await page.waitForTimeout(2000);
    
    // 로그인 확인
    const isOnNewRepoPage = await page.$('input[name="repository[name]"]');
    if (!isOnNewRepoPage) {
      console.log('You need to be logged in to GitHub first.');
      console.log('Please login manually and run the script again.');
      await browser.close();
      return;
    }
    
    // 저장소 이름 입력
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    console.log(`Repository name: ${REPO_NAME}`);
    
    // Public 선택
    await page.click('input#repository_visibility_public');
    console.log('Visibility: Public');
    
    // Create repository
    await page.click('button:has-text("Create repository")');
    await page.waitForURL(/github\.com\/[^\/]+\/cftadmin/);
    console.log('Repository created!');
    
    // username 추출
    const repoUrl = page.url();
    const username = repoUrl.match(/github\.com\/([^\/]+)\//)[1];
    console.log(`Username: ${username}`);
    
    // Step 2: Git push
    console.log('\nStep 2: Pushing code...');
    
    try {
      await execPromise('git remote remove origin').catch(() => {});
      await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
      await execPromise('git branch -M main');
      await execPromise('git push -u origin main');
      console.log('Code pushed!');
    } catch (e) {
      console.log('Push error:', e.message);
    }
    
    // Step 3: Pages 설정
    console.log('\nStep 3: Enabling GitHub Pages...');
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    await page.waitForTimeout(2000);
    
    // Branch 선택
    const noneButton = await page.$('button:has-text("None")');
    if (noneButton) {
      await noneButton.click();
      await page.waitForTimeout(500);
      await page.click('button[role="menuitemradio"]:has-text("main")');
      await page.waitForTimeout(500);
      await page.click('button:has-text("Save")');
      console.log('Pages enabled!');
    }
    
    console.log('\n✅ Done!');
    console.log(`URL: https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    console.log('(Wait 5-10 minutes for deployment)');
    
    await page.waitForTimeout(5000);
    await browser.close();
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nMake sure Chrome is running with remote debugging enabled.');
  }
})();