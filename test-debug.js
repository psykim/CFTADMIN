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
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('\n=== 페이지 로드 완료 ===\n');
    
    // 시작 버튼 클릭
    await page.click('#manualStartBtn');
    console.log('\n=== 시작 버튼 클릭 ===\n');
    
    // 30초 동안 기다리면서 startTest 관련 로그 확인
    await page.waitForTimeout(30000);
    
    // DOM 상태 확인
    const domStatus = await page.evaluate(() => {
        return {
            startBtn: document.getElementById('startBtn') ? 'exists' : 'null',
            stopBtn: document.getElementById('stopBtn') ? 'exists' : 'null',
            timer: document.getElementById('timer') ? 'exists' : 'null',
            testScreen: document.getElementById('testScreen') ? 'exists' : 'null',
            readyBox: document.getElementById('readyBox') ? 'exists' : 'null'
        };
    });
    
    console.log('\n=== DOM 요소 상태 ===');
    console.log(domStatus);
    
    await browser.close();
})();