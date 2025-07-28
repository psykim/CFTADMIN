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
    const logs = [];
    page.on('console', msg => {
        const text = msg.text();
        logs.push(`[${msg.type()}] ${text}`);
        
        // 중요한 로그만 출력
        if (text.includes('startTest') || 
            text.includes('startTimer') || 
            text.includes('콜백') ||
            text.includes('버튼') ||
            text.includes('null') ||
            text.includes('모든 안내')) {
            console.log(`[${msg.type()}] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 페이지 로드 완료 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('\n=== 시작 버튼 클릭 ===\n');
    
    // 30초 동안 대기
    await page.waitForTimeout(30000);
    
    // 최종 상태 확인
    const finalStatus = await page.evaluate(() => {
        return {
            timer: {
                element: document.getElementById('timer') ? 'exists' : 'null',
                display: document.getElementById('timer')?.style.display,
                text: document.getElementById('timer')?.textContent
            },
            stopBtn: {
                element: document.getElementById('stopBtn') ? 'exists' : 'null',
                display: document.getElementById('stopBtn')?.style.display
            },
            testScreen: {
                active: document.getElementById('testScreen')?.classList.contains('active')
            },
            globals: {
                timeRemaining: window.timeRemaining,
                timerInterval: window.timerInterval ? 'exists' : 'null',
                isRecognizing: window.isRecognizing
            }
        };
    });
    
    console.log('\n=== 최종 상태 ===');
    console.log(JSON.stringify(finalStatus, null, 2));
    
    // 모든 로그 중 에러 출력
    console.log('\n=== 에러 로그 ===');
    logs.filter(log => log.includes('error') || log.includes('Error')).forEach(log => console.log(log));
    
    await browser.close();
})();