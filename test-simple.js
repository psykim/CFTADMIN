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
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('startTest') || text.includes('startTestCountdown') || text.includes('모든 안내 완료')) {
            console.log(`[${msg.type()}] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('페이지 로드 완료');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('시작 버튼 클릭');
    
    // 음성 안내가 완료될 때까지 대기 (약 30초)
    console.log('음성 안내 대기 중...');
    
    // 주기적으로 상태 확인
    for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(1000);
        
        const status = await page.evaluate(() => {
            const testScreen = document.getElementById('testScreen');
            const timer = document.getElementById('timer');
            return {
                testScreenActive: testScreen && testScreen.classList.contains('active'),
                timerVisible: timer && timer.style.display !== 'none',
                timerText: timer ? timer.textContent : 'N/A',
                isRecognizing: window.isRecognizing,
                timeRemaining: window.timeRemaining
            };
        });
        
        if (status.testScreenActive || status.timerVisible) {
            console.log(`${i}초: 본시행 시작됨!`, status);
            break;
        } else if (i % 5 === 0) {
            console.log(`${i}초: 대기 중...`, status);
        }
    }
    
    // 최종 상태 확인
    const finalStatus = await page.evaluate(() => {
        return {
            testScreen: document.getElementById('testScreen')?.classList.contains('active'),
            timer: document.getElementById('timer')?.style.display,
            timerText: document.getElementById('timer')?.textContent,
            startBtn: document.getElementById('startBtn')?.style.display,
            stopBtn: document.getElementById('stopBtn')?.style.display
        };
    });
    
    console.log('최종 상태:', finalStatus);
    
    await page.waitForTimeout(5000);
    await browser.close();
})();