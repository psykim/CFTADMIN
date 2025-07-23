const { chromium } = require('playwright');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('Starting GitHub automation (assuming logged in)...');
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    // Step 1: 바로 새 저장소 생성 페이지로 이동
    console.log('Step 1: Creating new repository...');
    await page.goto('https://github.com/new');
    await page.waitForSelector('input[name="repository[name]"]', { timeout: 10000 });
    
    // 저장소 이름 입력
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    console.log(`Repository name set to: ${REPO_NAME}`);
    
    // Public 선택
    const publicRadio = await page.$('input#repository_visibility_public');
    if (publicRadio) {
      await publicRadio.click();
      console.log('Repository set to Public');
    }
    
    // Create repository 버튼 클릭
    console.log('Creating repository...');
    await page.click('button:has-text("Create repository")');
    
    // 저장소 생성 완료 대기
    await page.waitForURL(/github\.com\/[^\/]+\/cftadmin/, { timeout: 10000 });
    console.log('Repository created successfully!');
    
    // username 추출
    const repoUrl = page.url();
    const usernameMatch = repoUrl.match(/github\.com\/([^\/]+)\/[^\/]+/);
    const username = usernameMatch ? usernameMatch[1] : 'unknown';
    console.log(`GitHub username: ${username}`);
    
    // Step 2: Git 명령어 실행 (Pages 설정 전에 먼저 푸시)
    console.log('\nStep 2: Pushing code to GitHub...');
    
    try {
      console.log('Adding remote origin...');
      await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
      
      console.log('Renaming branch to main...');
      await execPromise('git branch -M main');
      
      console.log('Pushing to GitHub...');
      await execPromise('git push -u origin main');
      console.log('Push successful!');
    } catch (gitError) {
      console.log('Git push error (might be due to remote already exists):', gitError.message);
      
      // remote가 이미 있다면 제거하고 다시 추가
      try {
        await execPromise('git remote remove origin');
        await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
        await execPromise('git push -u origin main');
        console.log('Push successful after retry!');
      } catch (retryError) {
        console.log('Retry also failed:', retryError.message);
      }
    }
    
    // Step 3: GitHub Pages 설정
    console.log('\nStep 3: Setting up GitHub Pages...');
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    await page.waitForTimeout(3000);
    
    // Branch selector 클릭
    console.log('Configuring Pages source...');
    const noneButton = await page.$('button:has-text("None")');
    if (noneButton) {
      await noneButton.click();
      await page.waitForTimeout(1000);
      
      // main 브랜치 선택
      const mainOption = await page.$('button[role="menuitemradio"]:has-text("main")');
      if (mainOption) {
        await mainOption.click();
        console.log('Main branch selected');
      }
    }
    
    // Save 버튼 클릭
    await page.waitForTimeout(1000);
    const saveButton = await page.$('button:has-text("Save")');
    if (saveButton) {
      await saveButton.click();
      console.log('GitHub Pages enabled!');
    }
    
    // 성공 메시지
    console.log('\n✅ Setup complete!');
    console.log(`\nYour site will be available at:`);
    console.log(`https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    console.log('\nNote: GitHub Pages deployment may take 5-10 minutes.');
    
    // 브라우저 열어두기
    console.log('\nKeeping browser open for 10 seconds to verify...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();