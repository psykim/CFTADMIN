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
    
    // 주요 이벤트 추적
    const events = [];
    
    page.on('console', msg => {
        const text = msg.text();
        const time = new Date().toLocaleTimeString();
        
        if (text.includes('연습') || 
            text.includes('본시행') || 
            text.includes('proceedToMainTest') ||
            text.includes('startTest') ||
            text.includes('모든 안내 완료') ||
            text.includes('타이머') ||
            text.includes('10초')) {
            events.push(`[${time}] ${text}`);
            console.log(`[${time}] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 테스트 시작 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    
    // 90초 동안 대기하면서 상태 모니터링
    for (let i = 0; i < 90; i++) {
        await page.waitForTimeout(1000);
        
        // 본시행이 시작되었는지 확인
        const mainTestStarted = await page.evaluate(() => {
            const timer = document.getElementById('timer');
            const stopBtn = document.getElementById('stopBtn');
            return {
                timerVisible: timer && timer.style.display !== 'none',
                timerValue: timer ? timer.textContent : 'N/A',
                stopBtnVisible: stopBtn && stopBtn.style.display !== 'none',
                timerRunning: window.timerInterval ? true : false
            };
        });
        
        if (mainTestStarted.timerVisible && mainTestStarted.timerRunning) {
            console.log(`\n✅ 본시행 시작됨! (${i}초 경과)`);
            console.log('타이머:', mainTestStarted.timerValue);
            console.log('중지 버튼:', mainTestStarted.stopBtnVisible ? '표시됨' : '숨김');
            
            // 5초 더 관찰
            for (let j = 0; j < 5; j++) {
                await page.waitForTimeout(1000);
                const timerText = await page.evaluate(() => document.getElementById('timer')?.textContent);
                console.log(`타이머: ${timerText}`);
            }
            
            console.log('\n✅ 테스트 성공적으로 완료!');
            break;
        }
    }
    
    console.log('\n=== 이벤트 로그 ===');
    events.forEach(event => console.log(event));
    
    await browser.close();
})();