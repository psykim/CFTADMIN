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
    
    // 콘솔 메시지 캡처
    page.on('console', msg => {
        const text = msg.text();
        const time = new Date().toLocaleTimeString();
        
        if (text.includes('연습') || 
            text.includes('본시행') || 
            text.includes('proceedToMainTest') ||
            text.includes('startTest') ||
            text.includes('모든 안내 완료') ||
            text.includes('타이머') ||
            text.includes('1초 대기')) {
            console.log(`[${time}] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 테스트 시작 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    
    // 2분 동안 대기하면서 상태 모니터링
    for (let i = 0; i < 120; i++) {
        await page.waitForTimeout(1000);
        
        // 10초마다 상태 확인
        if (i % 10 === 0) {
            const status = await page.evaluate(() => {
                const timer = document.getElementById('timer');
                const stopBtn = document.getElementById('stopBtn');
                return {
                    second: new Date().getSeconds(),
                    timerVisible: timer && timer.style.display !== 'none',
                    timerValue: timer ? timer.textContent : 'N/A',
                    stopBtnVisible: stopBtn && stopBtn.style.display !== 'none',
                    timerRunning: window.timerInterval ? true : false,
                    isPracticePhase: window.isPracticePhase,
                    timeRemaining: window.timeRemaining
                };
            });
            
            console.log(`\n[${i}초] 상태:`, JSON.stringify(status, null, 2));
            
            // 본시행이 시작되면 성공 메시지 출력
            if (status.timerVisible && status.timerRunning) {
                console.log('\n✅ 본시행이 성공적으로 시작되었습니다!');
                
                // 10초 더 관찰
                for (let j = 0; j < 10; j++) {
                    await page.waitForTimeout(1000);
                    const timerText = await page.evaluate(() => document.getElementById('timer')?.textContent);
                    console.log(`타이머: ${timerText}`);
                }
                
                console.log('\n테스트 완료!');
                break;
            }
        }
    }
    
    await browser.close();
})();