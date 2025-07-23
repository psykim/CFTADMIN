const { chromium } = require('playwright');

(async () => {
  const GITHUB_USERNAME = 'kwk'; // 현재 디렉토리 이름에서 추측
  const REPO_NAME = 'cftadmin';
  
  console.log('Starting GitHub automation...');
  
  const browser = await chromium.launch({ 
    headless: false, // 화면을 보면서 진행
    slowMo: 500 // 각 액션 사이에 딜레이
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // 바로 새 저장소 생성 페이지로 이동
    console.log('Creating new repository...');
    await page.goto('https://github.com/new');
    
    // 로그인 페이지로 리다이렉트되는지 확인
    if (page.url().includes('/login')) {
      console.log('You need to login first. Please login manually and run the script again.');
      await browser.close();
      return;
    }
    
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
    const actualUsername = usernameMatch ? usernameMatch[1] : GITHUB_USERNAME;
    
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
  
  // 브라우저를 열어둡니다 (결과 확인용)
  console.log('\nPress Ctrl+C to close the browser...');
  await page.waitForTimeout(30000);
  
  await browser.close();
})();