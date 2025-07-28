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
    
    // 주요 콘솔 메시지만 캡처
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('startTest') || text.includes('모든 안내') || text.includes('콜백')) {
            console.log(`[LOG] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('페이지 로드 완료');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('시작 버튼 클릭');
    
    // 음성 안내가 끝날 때까지 대기
    console.log('음성 안내 대기 중...');
    await page.waitForTimeout(25000);
    
    // 테스트 상태 확인
    const testStatus = await page.evaluate(() => {
        const testScreen = document.getElementById('testScreen');
        const timer = document.getElementById('timer');
        const stopBtn = document.getElementById('stopBtn');
        
        return {
            testScreenActive: testScreen?.classList.contains('active'),
            timerDisplay: timer ? window.getComputedStyle(timer).display : 'not found',
            timerText: timer?.textContent,
            stopBtnDisplay: stopBtn ? window.getComputedStyle(stopBtn).display : 'not found',
            // 전역 변수 확인
            timeRemaining: window.timeRemaining,
            timerInterval: window.timerInterval ? 'running' : 'not running',
            isRecognizing: window.isRecognizing
        };
    });
    
    console.log('\n테스트 상태:', JSON.stringify(testStatus, null, 2));
    
    // 5초 더 대기하면서 타이머 변화 관찰
    for (let i = 0; i < 5; i++) {
        await page.waitForTimeout(1000);
        const timerText = await page.evaluate(() => document.getElementById('timer')?.textContent);
        console.log(`${i+1}초 후 타이머: ${timerText}`);
    }
    
    await browser.close();
})();