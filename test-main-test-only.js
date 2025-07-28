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
    
    // 콘솔 메시지 필터링
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('연습') || 
            text.includes('본시행') || 
            text.includes('proceedToMainTest') ||
            text.includes('startTest') ||
            text.includes('모든 안내 완료') ||
            text.includes('타이머')) {
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
    
    // 전체 플로우 대기 (60초)
    for (let i = 0; i < 60; i++) {
        await page.waitForTimeout(1000);
        
        if (i % 10 === 0) {
            const status = await page.evaluate((time) => {
                return {
                    time: time,
                    isPractice: window.isPracticePhase,
                    practiceItems: window.practiceItems?.length || 0,
                    timerDisplay: document.getElementById('timer')?.style.display,
                    timerText: document.getElementById('timer')?.textContent,
                    stopBtnDisplay: document.getElementById('stopBtn')?.style.display,
                    testScreenActive: document.getElementById('testScreen')?.classList.contains('active')
                };
            }, i);
            console.log(`\n${i}초 상태:`, JSON.stringify(status, null, 2));
        }
    }
    
    await browser.close();
})();