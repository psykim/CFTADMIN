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
    
    // 모든 콘솔 로그 캡처
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });
    
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 상세 로그 테스트 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    
    // 2분 30초 대기
    await page.waitForTimeout(150000);
    
    // 최종 상태 확인
    const finalState = await page.evaluate(() => {
        return {
            timer: {
                display: document.getElementById('timer')?.style.display,
                text: document.getElementById('timer')?.textContent
            },
            stopBtn: {
                display: document.getElementById('stopBtn')?.style.display
            }
        };
    });
    
    console.log('\n최종 상태:', JSON.stringify(finalState, null, 2));
    
    await browser.close();
})();