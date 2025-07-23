const { chromium } = require('playwright');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('GitHub Repository Setup with Playwright\n');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Step 1: GitHub 로그인 페이지
    console.log('Opening GitHub...');
    await page.goto('https://github.com');
    
    console.log('\nPlease login to GitHub in the browser window.');
    console.log('After logging in, press Enter here to continue...');
    await question('');
    
    // Step 2: 새 저장소 생성
    console.log('\nCreating new repository...');
    await page.goto('https://github.com/new');
    
    // 저장소 이름 입력
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    
    // Public 선택
    const publicRadio = await page.$('input#repository_visibility_public');
    if (publicRadio) await publicRadio.click();
    
    console.log('Repository name: ' + REPO_NAME);
    console.log('Visibility: Public');
    console.log('\nClick "Create repository" button in the browser.');
    console.log('After creating, press Enter here to continue...');
    await question('');
    
    // username 추출
    const repoUrl = page.url();
    const usernameMatch = repoUrl.match(/github\.com\/([^\/]+)\//);
    const username = usernameMatch ? usernameMatch[1] : await question('Enter your GitHub username: ');
    
    // Step 3: Git push
    console.log('\nPushing code to GitHub...');
    
    try {
      // 기존 remote 제거
      await execPromise('git remote remove origin').catch(() => {});
      
      // 새 remote 추가
      await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
      console.log('Remote added');
      
      // main 브랜치로 변경
      await execPromise('git branch -M main');
      console.log('Branch renamed to main');
      
      // Push
      await execPromise('git push -u origin main');
      console.log('Code pushed successfully!');
    } catch (error) {
      console.log('Git error:', error.message);
      console.log('\nManual commands:');
      console.log(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
      console.log('git branch -M main');
      console.log('git push -u origin main');
    }
    
    // Step 4: GitHub Pages
    console.log('\nSetting up GitHub Pages...');
    console.log('Press Enter to navigate to Pages settings...');
    await question('');
    
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    
    console.log('\nIn the browser:');
    console.log('1. Click on "None" dropdown under "Branch"');
    console.log('2. Select "main"');
    console.log('3. Click "Save"');
    console.log('\nAfter saving, press Enter here...');
    await question('');
    
    console.log('\n✅ Setup complete!');
    console.log(`\nYour site will be available at:`);
    console.log(`https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    console.log('\n(GitHub Pages may take 5-10 minutes to deploy)');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
    await browser.close();
  }
})();