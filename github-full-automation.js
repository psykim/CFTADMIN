const { chromium } = require('playwright');

(async () => {
  const REPO_NAME = 'cftadmin';
  
  console.log('Starting GitHub automation...');
  
  // 브라우저 실행 (headless: false로 화면 표시)
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // 각 액션을 천천히 수행
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  try {
    // Step 1: GitHub 메인 페이지로 이동
    console.log('Step 1: Navigating to GitHub...');
    await page.goto('https://github.com');
    await page.waitForTimeout(2000);
    
    // 로그인 여부 확인
    const isLoggedIn = await page.$('button[aria-label="Open user account menu"]') !== null;
    
    if (!isLoggedIn) {
      console.log('Not logged in. Opening login page...');
      console.log('Please login manually in the browser window.');
      console.log('After logging in, the script will continue automatically...');
      
      await page.goto('https://github.com/login');
      
      // 로그인 완료될 때까지 대기 (최대 2분)
      await page.waitForSelector('button[aria-label="Open user account menu"]', { timeout: 120000 });
      console.log('Login detected! Continuing...');
    } else {
      console.log('Already logged in!');
    }
    
    // Step 2: 새 저장소 생성
    console.log('\nStep 2: Creating new repository...');
    await page.goto('https://github.com/new');
    await page.waitForSelector('input[name="repository[name]"]');
    
    // 저장소 이름 입력
    await page.fill('input[name="repository[name]"]', REPO_NAME);
    console.log(`Repository name set to: ${REPO_NAME}`);
    
    // Public 라디오 버튼 선택
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
    
    // 현재 URL에서 username 추출
    const repoUrl = page.url();
    const usernameMatch = repoUrl.match(/github\.com\/([^\/]+)\/[^\/]+/);
    const username = usernameMatch ? usernameMatch[1] : 'unknown';
    console.log(`GitHub username: ${username}`);
    
    // Step 3: 저장소에 파일 푸시하기 위한 명령어 저장
    const gitCommands = `
git remote add origin https://github.com/${username}/${REPO_NAME}.git
git branch -M main
git push -u origin main`;
    
    console.log('\nStep 3: Git commands ready. Will execute after Pages setup...');
    
    // Step 4: GitHub Pages 설정
    console.log('\nStep 4: Setting up GitHub Pages...');
    await page.goto(`https://github.com/${username}/${REPO_NAME}/settings/pages`);
    
    // Pages 설정이 로드될 때까지 대기
    await page.waitForTimeout(3000);
    
    // Branch 선택 버튼 찾기
    console.log('Looking for branch selector...');
    
    // "None" 버튼 클릭 (branch selector)
    const branchSelector = await page.$('button:has-text("None")');
    if (branchSelector) {
      await branchSelector.click();
      console.log('Branch selector opened');
      
      // main 브랜치 선택
      await page.waitForTimeout(1000);
      const mainBranch = await page.$('button[role="menuitemradio"]:has-text("main")');
      if (mainBranch) {
        await mainBranch.click();
        console.log('Main branch selected');
      }
    }
    
    // Save 버튼 찾아서 클릭
    await page.waitForTimeout(1000);
    const saveButton = await page.$('button:has-text("Save")');
    if (saveButton) {
      await saveButton.click();
      console.log('GitHub Pages settings saved!');
    }
    
    // Step 5: Git 명령어 실행
    console.log('\nStep 5: Now executing git commands...');
    console.log('Closing browser and running git commands...');
    
    await browser.close();
    
    // Git 명령어 실행
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    console.log('\nAdding remote origin...');
    await execPromise(`git remote add origin https://github.com/${username}/${REPO_NAME}.git`);
    
    console.log('Renaming branch to main...');
    await execPromise('git branch -M main');
    
    console.log('Pushing to GitHub...');
    await execPromise('git push -u origin main');
    
    console.log('\n✅ All done! Your site will be available at:');
    console.log(`https://${username}.github.io/${REPO_NAME}/animal-fluency-test-v2.html`);
    console.log('\nNote: It may take a few minutes for GitHub Pages to deploy.');
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nIf the repository was created but push failed, run these commands manually:');
    console.log('git remote add origin https://github.com/YOUR_USERNAME/cftadmin.git');
    console.log('git branch -M main');
    console.log('git push -u origin main');
  }
})();