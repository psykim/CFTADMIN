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
    
    // 에러 처리
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 콘솔 로그 모니터링
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('본시행') || 
            text.includes('startTest') || 
            text.includes('타이머') ||
            text.includes('ERROR') ||
            text.includes('error')) {
            console.log(`[Console] ${text}`);
        }
    });
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('=== 본시행 동작 검증 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('시작 버튼 클릭\n');
    
    // 본시행 시작까지 대기
    console.log('본시행 시작 대기 중...');
    let testStarted = false;
    
    for (let i = 0; i < 150; i++) {
        await page.waitForTimeout(1000);
        
        // 5초마다 상태 체크
        if (i % 5 === 0) {
            const status = await page.evaluate(() => {
                const timer = document.getElementById('timer');
                const stopBtn = document.getElementById('stopBtn');
                const testScreen = document.getElementById('testScreen');
                
                return {
                    time: new Date().toLocaleTimeString(),
                    timer: {
                        exists: !!timer,
                        display: timer?.style.display,
                        text: timer?.textContent
                    },
                    stopBtn: {
                        exists: !!stopBtn,
                        display: stopBtn?.style.display
                    },
                    testScreen: {
                        exists: !!testScreen,
                        active: testScreen?.classList.contains('active')
                    }
                };
            });
            
            console.log(`[${i}초] 상태:`, JSON.stringify(status, null, 2));
            
            // 타이머가 표시되고 있는지 확인
            if (status.timer.display !== 'none' && status.stopBtn.display !== 'none') {
                testStarted = true;
                console.log('\n✅ 본시행 시작 확인!');
                console.log(`타이머: ${status.timer.text}초`);
                console.log('중지 버튼: 표시됨\n');
                
                // 10초 더 관찰
                console.log('타이머 카운트다운 확인:');
                for (let j = 0; j < 10; j++) {
                    await page.waitForTimeout(1000);
                    const timerValue = await page.evaluate(() => {
                        return document.getElementById('timer')?.textContent;
                    });
                    console.log(`  ${timerValue}초`);
                }
                break;
            }
        }
    }
    
    if (!testStarted) {
        console.log('\n❌ 본시행이 시작되지 않았습니다.');
        
        // 현재 화면 상태 캡처
        const finalState = await page.evaluate(() => {
            return {
                bodyText: document.body.innerText.substring(0, 200),
                activeElements: Array.from(document.querySelectorAll('.active')).map(el => ({
                    tag: el.tagName,
                    id: el.id,
                    class: el.className
                }))
            };
        });
        
        console.log('\n최종 화면 상태:', JSON.stringify(finalState, null, 2));
    }
    
    console.log('\n테스트 종료');
    await page.waitForTimeout(5000); // 브라우저를 5초간 열어둠
    await browser.close();
})();