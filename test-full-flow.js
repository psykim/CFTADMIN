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
    const logs = [];
    page.on('console', msg => {
        const text = msg.text();
        logs.push(`[${msg.type()}] ${text}`);
        console.log(`[${msg.type()}] ${text}`);
    });
    
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 1. 페이지 로드 완료 ===\n');
    await page.waitForTimeout(2000);
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('\n=== 2. 시작 버튼 클릭 ===\n');
    
    // 연습 안내가 끝날 때까지 대기 (약 15초)
    console.log('연습 안내 대기 중...');
    await page.waitForTimeout(15000);
    
    // 연습 모드 상태 확인
    const practiceStatus = await page.evaluate(() => {
        return {
            isPracticePhase: window.isPracticePhase,
            practiceItems: window.practiceItems,
            isRecognizing: window.isRecognizing,
            micIconActive: document.getElementById('testMicIcon')?.classList.contains('active')
        };
    });
    
    console.log('\n=== 3. 연습 모드 상태 ===');
    console.log(JSON.stringify(practiceStatus, null, 2));
    
    // 10초 연습 시간
    console.log('\n연습 시간 10초 대기...');
    await page.waitForTimeout(10000);
    
    // 연습 종료 후 상태
    const afterPracticeStatus = await page.evaluate(() => {
        return {
            isPracticePhase: window.isPracticePhase,
            practiceItems: window.practiceItems,
            practiceItemsCount: window.practiceItems?.length || 0
        };
    });
    
    console.log('\n=== 4. 연습 종료 후 상태 ===');
    console.log(JSON.stringify(afterPracticeStatus, null, 2));
    
    // 본시행까지 대기 (약 20초 더)
    console.log('\n본시행 대기 중...');
    await page.waitForTimeout(20000);
    
    // 본시행 상태 확인
    const mainTestStatus = await page.evaluate(() => {
        return {
            testScreen: document.getElementById('testScreen')?.classList.contains('active'),
            timer: {
                display: document.getElementById('timer')?.style.display,
                text: document.getElementById('timer')?.textContent
            },
            stopBtn: {
                display: document.getElementById('stopBtn')?.style.display
            },
            isRecognizing: window.isRecognizing,
            timeRemaining: window.timeRemaining,
            timerInterval: window.timerInterval ? 'running' : 'not running'
        };
    });
    
    console.log('\n=== 5. 본시행 상태 ===');
    console.log(JSON.stringify(mainTestStatus, null, 2));
    
    // 5초 더 대기하며 타이머 확인
    for (let i = 0; i < 5; i++) {
        await page.waitForTimeout(1000);
        const timerText = await page.evaluate(() => document.getElementById('timer')?.textContent);
        console.log(`타이머: ${timerText}`);
    }
    
    // 중요 로그 확인
    console.log('\n=== 중요 로그 ===');
    const importantLogs = logs.filter(log => 
        log.includes('연습') || 
        log.includes('본시행') || 
        log.includes('startTest') ||
        log.includes('음성인식') ||
        log.includes('모든 안내 완료')
    );
    importantLogs.forEach(log => console.log(log));
    
    await browser.close();
})();