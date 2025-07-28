const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream'] // 마이크 권한 자동 허용
    });
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    const page = await context.newPage();
    
    // 콘솔 메시지 캡처
    page.on('console', msg => console.log(`[${msg.type()}]`, msg.text()));
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('1. 페이지 로드 완료');
    
    // 시작 버튼 클릭
    await page.waitForSelector('#manualStartBtn', { state: 'visible' });
    console.log('2. 시작 버튼 발견');
    await page.click('#manualStartBtn');
    
    // 하드웨어 설정에서 계속 버튼 클릭
    await page.waitForSelector('#hardwareContinueBtn', { state: 'visible', timeout: 10000 });
    console.log('3. 하드웨어 설정 화면 표시됨');
    await page.click('#hardwareContinueBtn');
    
    // 연습 화면 대기
    await page.waitForSelector('.practice-section', { state: 'visible', timeout: 10000 });
    console.log('4. 연습 화면 표시됨');
    
    // 연습 중 음성 안내가 끝날 때까지 대기
    console.log('5. 연습 안내 대기 중...');
    await page.waitForTimeout(8000); // 연습 안내가 끝날 때까지 대기
    
    // 준비 완료 버튼 클릭
    const readyButton = await page.waitForSelector('#testReadyBtn', { state: 'visible', timeout: 10000 });
    console.log('6. 준비 완료 버튼 발견');
    await readyButton.click();
    
    // 본시행 시작 전 안내 대기
    console.log('7. 본시행 시작 안내 대기...');
    await page.waitForTimeout(5000);
    
    // 테스트 화면 표시 여부 확인
    const testScreenStatus = await page.evaluate(() => {
        const testScreen = document.getElementById('testScreen');
        const testMicIcon = document.querySelector('.test-screen .mic-icon');
        const timer = document.getElementById('timer');
        const startBtn = document.getElementById('startBtn');
        
        return {
            testScreenVisible: testScreen && testScreen.classList.contains('active'),
            testScreenDisplay: testScreen ? window.getComputedStyle(testScreen).display : 'not found',
            micIconActive: testMicIcon ? testMicIcon.classList.contains('active') : false,
            timerVisible: timer ? timer.style.display !== 'none' : false,
            timerText: timer ? timer.textContent : 'N/A',
            startBtnDisplay: startBtn ? window.getComputedStyle(startBtn).display : 'not found',
            isRecognizing: window.isRecognizing,
            recognition: window.recognition ? 'initialized' : 'not initialized',
            audioContext: window.audioContext ? 'initialized' : 'not initialized'
        };
    });
    
    console.log('8. 테스트 화면 상태:', JSON.stringify(testScreenStatus, null, 2));
    
    // 시작 버튼이 숨겨져 있는지 확인하고, 필요하면 클릭
    const startBtnVisible = await page.evaluate(() => {
        const btn = document.getElementById('startBtn');
        return btn && window.getComputedStyle(btn).display !== 'none';
    });
    
    if (startBtnVisible) {
        console.log('9. 시작 버튼이 보임 - 클릭');
        await page.click('#startBtn');
        await page.waitForTimeout(2000);
    } else {
        console.log('9. 시작 버튼이 이미 숨겨져 있음');
    }
    
    // 최종 상태 확인
    const finalStatus = await page.evaluate(() => {
        const testScreen = document.getElementById('testScreen');
        const timer = document.getElementById('timer');
        return {
            testScreenActive: testScreen && testScreen.classList.contains('active'),
            timerText: timer ? timer.textContent : 'N/A',
            timeRemaining: window.timeRemaining,
            isTimerRunning: window.timerInterval ? 'running' : 'not running'
        };
    });
    
    console.log('10. 최종 상태:', JSON.stringify(finalStatus, null, 2));
    
    // 10초 대기 후 종료
    await page.waitForTimeout(10000);
    
    await browser.close();
})();