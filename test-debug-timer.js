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
    
    // 상세한 콘솔 로그 캡처
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });
    
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 초기 DOM 상태 확인 ===');
    const initialDOM = await page.evaluate(() => {
        return {
            timer: document.getElementById('timer') ? {
                exists: true,
                display: document.getElementById('timer').style.display,
                textContent: document.getElementById('timer').textContent
            } : { exists: false },
            stopBtn: document.getElementById('stopBtn') ? {
                exists: true,
                display: document.getElementById('stopBtn').style.display
            } : { exists: false },
            testScreen: document.getElementById('testScreen') ? {
                exists: true,
                classes: document.getElementById('testScreen').className
            } : { exists: false }
        };
    });
    console.log(JSON.stringify(initialDOM, null, 2));
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('\n=== 시작 버튼 클릭 ===\n');
    
    // 본시행이 시작될 때까지 모니터링
    let mainTestStarted = false;
    for (let i = 0; i < 60; i++) {
        await page.waitForTimeout(1000);
        
        // startTest 함수가 호출되었는지 확인
        const testStatus = await page.evaluate(() => {
            const timer = document.getElementById('timer');
            const stopBtn = document.getElementById('stopBtn');
            const testScreen = document.getElementById('testScreen');
            
            return {
                second: new Date().getSeconds(),
                timer: timer ? {
                    display: timer.style.display,
                    text: timer.textContent,
                    visible: timer.style.display !== 'none'
                } : null,
                stopBtn: stopBtn ? {
                    display: stopBtn.style.display,
                    visible: stopBtn.style.display !== 'none'
                } : null,
                testScreen: testScreen ? {
                    hasActive: testScreen.classList.contains('active')
                } : null,
                window: {
                    timeRemaining: window.timeRemaining,
                    timerInterval: window.timerInterval ? 'exists' : 'null',
                    isPracticePhase: window.isPracticePhase
                }
            };
        });
        
        // 주요 상태 변경이 있을 때만 출력
        if (testStatus.timer?.visible || testStatus.stopBtn?.visible || testStatus.window.timerInterval === 'exists') {
            console.log(`\n[${i}초] 주요 상태 변경 감지:`, JSON.stringify(testStatus, null, 2));
            mainTestStarted = true;
            
            // 5초 더 관찰
            for (let j = 0; j < 5; j++) {
                await page.waitForTimeout(1000);
                const timerValue = await page.evaluate(() => {
                    const timer = document.getElementById('timer');
                    return timer ? timer.textContent : 'N/A';
                });
                console.log(`타이머 값: ${timerValue}`);
            }
            break;
        }
        
        // 10초마다 상태 출력
        if (i % 10 === 0) {
            console.log(`[${i}초] 대기 중...`);
        }
    }
    
    if (!mainTestStarted) {
        console.log('\n❌ 60초 동안 본시행이 시작되지 않았습니다.');
        
        // 최종 상태 확인
        const finalState = await page.evaluate(() => {
            return {
                allElements: {
                    timer: document.getElementById('timer') ? 'exists' : 'missing',
                    stopBtn: document.getElementById('stopBtn') ? 'exists' : 'missing',
                    testScreen: document.getElementById('testScreen') ? 'exists' : 'missing'
                },
                functions: {
                    startTest: typeof window.startTest,
                    startTimer: typeof window.startTimer
                }
            };
        });
        console.log('\n최종 상태:', JSON.stringify(finalState, null, 2));
    }
    
    await browser.close();
})();