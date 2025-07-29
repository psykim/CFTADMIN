const { chromium } = require('playwright');

async function testDirectLoad() {
    console.log('=== 직접 로드 테스트 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        devtools: true
    });
    const page = await browser.newPage();
    
    // 콘솔 메시지와 에러 수집
    page.on('console', msg => {
        console.log(`[CONSOLE ${msg.type()}]: ${msg.text()}`);
    });
    
    page.on('pageerror', err => {
        console.log(`[PAGE ERROR]: ${err.message}`);
        console.log(`Stack: ${err.stack}`);
    });
    
    try {
        console.log('페이지 로딩...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html');
        
        // 페이지가 완전히 로드될 때까지 대기
        await page.waitForTimeout(5000);
        
        // 개발자 도구에서 JavaScript 오류 확인
        const errors = await page.evaluate(() => {
            // 글로벌 JavaScript 에러 확인
            const testResults = {};
            
            try {
                // 주요 함수들 존재 여부 확인
                testResults.handleStartClick = typeof window.handleStartClick;
                testResults.startInstructions = typeof startInstructions;
                testResults.playNextInQueue = typeof playNextInQueue;
                testResults.speak = typeof speak;
            } catch (e) {
                testResults.error = e.message;
            }
            
            return testResults;
        });
        
        console.log('JavaScript 함수 상태:', JSON.stringify(errors, null, 2));
        
        // 수동으로 브라우저 창 열어두기
        console.log('브라우저 창이 열려있습니다. 개발자 도구에서 오류를 확인해주세요.');
        console.log('아무 키나 누르면 브라우저가 닫힙니다...');
        
        // 사용자 입력 대기 (간단한 방법)
        await page.waitForTimeout(30000); // 30초 대기
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await browser.close();
    }
}

testDirectLoad().catch(console.error);