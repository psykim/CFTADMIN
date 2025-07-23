const { chromium } = require('playwright');
const path = require('path');
const os = require('os');

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('Starting GitHub automation with existing Chrome profile...');
  
  // Chrome 사용자 데이터 경로
  const userDataDir = path.join(os.homedir(), 'Library', 'Application Support', 'Google', 'Chrome');
  
  const browser = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    slowMo: 500,
    channel: 'chrome', // 시스템의 Chrome 사용
    args: ['--profile-directory=Default'] // 기본 프로필 사용
  });
  
  const page = await browser.newPage();
  
  try {
    // GitHub 페이지로 이동 (이미 로그인되어 있을 것)
    console.log('Navigating to GitHub...');
    await page.goto('https://github.com');
    await page.waitForTimeout(2000);
    
    // 새 저장소 생성 페이지로 이동
    console.log('Creating new repository...');
    await page.goto('https://github.com/new');
    
    // 저장소 이름 입력
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    
    // Public 선택
    const publicRadio = await page.$('input[value="public"]');
    if (publicRadio) {
      await publicRadio.click();
    }
    
    // Create repository 버튼 클릭
    await page.click('button[type="submit"]:has-text("Create repository")');
    
    // 저장소가 생성될 때까지 대기
    await page.waitForTimeout(3000);
    console.log('Repository created successfully!');
    
    // 현재 URL에서 username 추출
    const currentUrl = page.url();
    const usernameMatch = currentUrl.match(/github\.com\/([^\/]+)\/[^\/]+/);
    const actualUsername = usernameMatch ? usernameMatch[1] : 'your-username';
    
    // Settings 페이지로 이동
    console.log('Navigating to repository settings...');
    await page.goto(`https://github.com/${actualUsername}/${REPO_NAME}/settings`);
    
    // Pages 섹션으로 이동
    console.log('Navigating to Pages settings...');
    await page.click('a[href*="/settings/pages"]');
    await page.waitForTimeout(2000);
    
    // Source 설정
    console.log('Configuring GitHub Pages...');
    
    // Branch 선택 드롭다운 찾기
    const branchButton = await page.$('button[id*="branch-select"]');
    if (branchButton) {
      await branchButton.click();
      await page.waitForTimeout(1000);
      
      // main 브랜치 선택
      const mainOption = await page.$('span:has-text("main")');
      if (mainOption) {
        await mainOption.click();
      }
    }
    
    // Save 버튼 클릭
    await page.waitForTimeout(1000);
    const saveButton = await page.$('button:has-text("Save")');
    if (saveButton) {
      await saveButton.click();
      console.log('GitHub Pages configuration saved!');
    }
    
    console.log(`\nSetup complete! Your site will be available at:`);
    console.log(`https://${actualUsername}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    
    console.log(`\nNow run these commands to push your code:`);
    console.log(`git remote add origin https://github.com/${actualUsername}/${REPO_NAME}.git`);
    console.log(`git branch -M main`);
    console.log(`git push -u origin main`);
    
  } catch (error) {
    console.error('Error during automation:', error);
  }
  
  // 브라우저를 열어둡니다
  console.log('\nPress Ctrl+C to close the browser...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();