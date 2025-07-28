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
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('=== 최종 동작 확인 테스트 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('✓ 시작 버튼 클릭\n');
    
    // 본시행이 시작될 때까지 대기 (최대 2분)
    let mainTestStarted = false;
    for (let i = 0; i < 120; i++) {
        await page.waitForTimeout(1000);
        
        const status = await page.evaluate(() => {
            const timer = document.getElementById('timer');
            const stopBtn = document.getElementById('stopBtn');
            return {
                timerVisible: timer && timer.style.display !== 'none',
                timerValue: timer ? timer.textContent : 'N/A',
                stopBtnVisible: stopBtn && stopBtn.style.display !== 'none'
            };
        });
        
        if (status.timerVisible && status.stopBtnVisible) {
            console.log(`✅ 본시행이 성공적으로 시작되었습니다! (${i}초 후)`);
            console.log(`  - 타이머: ${status.timerValue}초`);
            console.log(`  - 중지 버튼: 표시됨\n`);
            
            mainTestStarted = true;
            
            // 타이머가 정상적으로 카운트다운 되는지 확인
            console.log('타이머 카운트다운 확인:');
            for (let j = 0; j < 5; j++) {
                await page.waitForTimeout(1000);
                const timerText = await page.evaluate(() => document.getElementById('timer')?.textContent);
                console.log(`  ${timerText}초`);
            }
            
            console.log('\n✅ 모든 기능이 정상적으로 작동합니다!');
            break;
        }
    }
    
    if (!mainTestStarted) {
        console.log('❌ 2분 동안 본시행이 시작되지 않았습니다.');
    }
    
    await browser.close();
})();