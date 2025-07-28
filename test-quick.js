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
    
    // 중요한 콘솔 메시지만 캡처
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('연습 모드 건너뛰고') || 
            text.includes('startTest') || 
            text.includes('모든 안내') ||
            text.includes('타이머') ||
            text.includes('버튼')) {
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
    
    // 40초 동안 대기하면서 상태 확인
    for (let i = 0; i < 40; i++) {
        await page.waitForTimeout(1000);
        
        if (i % 5 === 0) {
            const status = await page.evaluate(() => {
                const timer = document.getElementById('timer');
                const stopBtn = document.getElementById('stopBtn');
                return {
                    timerText: timer?.textContent,
                    timerDisplay: timer?.style.display,
                    stopBtnDisplay: stopBtn?.style.display,
                    timeRemaining: window.timeRemaining
                };
            });
            console.log(`${i}초:`, status);
        }
    }
    
    await browser.close();
})();