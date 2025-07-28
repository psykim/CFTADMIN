const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream'] 
    });
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    const page = await context.newPage();
    
    // 모든 콘솔 메시지 캡처
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 페이지 로드 완료 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('\n=== 시작 버튼 클릭 ===\n');
    
    // 60초 동안 대기
    await page.waitForTimeout(60000);
    
    // 최종 상태 확인
    const finalStatus = await page.evaluate(() => {
        return {
            timer: document.getElementById('timer')?.textContent,
            timerDisplay: document.getElementById('timer')?.style.display,
            stopBtnDisplay: document.getElementById('stopBtn')?.style.display,
            testScreenActive: document.getElementById('testScreen')?.classList.contains('active'),
            timeRemaining: window.timeRemaining,
            timerInterval: window.timerInterval ? 'running' : 'not running'
        };
    });
    
    console.log('\n=== 최종 상태 ===');
    console.log(JSON.stringify(finalStatus, null, 2));
    
    await browser.close();
})();