const { chromium } = require('playwright');

(async () => {
    console.log('=== animal-fluency-test-v2.html 테스트 시작 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        devtools: true 
    });
    
    const page = await browser.newPage();
    
    // 콘솔 메시지 캡처
    page.on('console', msg => {
        console.log(`[브라우저 콘솔] ${msg.type()}: ${msg.text()}`);
    });
    
    // 페이지 에러 캡처
    page.on('pageerror', error => {
        console.error(`[페이지 에러]: ${error.message}`);
        console.error(error.stack);
    });
    
    try {
        // GitHub Pages URL로 이동
        console.log('\n1. 페이지 로드 중...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v2.html', {
            waitUntil: 'networkidle'
        });
        
        // 페이지 로드 완료 대기
        await page.waitForTimeout(3000);
        
        // DOM 요소 확인
        console.log('\n2. DOM 요소 확인 중...');
        const manualStartBtn = await page.$('#manualStartBtn');
        console.log('시작하기 버튼 존재:', !!manualStartBtn);
        
        // handleStartClick 함수 존재 여부 확인
        const handleStartClickExists = await page.evaluate(() => {
            return typeof window.handleStartClick !== 'undefined';
        });
        console.log('handleStartClick 함수 존재:', handleStartClickExists);
        
        // 테스트 버튼 클릭
        console.log('\n3. 테스트 버튼 클릭 시도...');
        const testButton = await page.$('button[onclick="testClick()"]');
        if (testButton) {
            await testButton.click();
            await page.waitForTimeout(1000);
        } else {
            console.log('테스트 버튼을 찾을 수 없습니다.');
        }
        
        // 시작하기 버튼 클릭
        console.log('\n4. 시작하기 버튼 클릭 시도...');
        if (manualStartBtn) {
            await manualStartBtn.click();
            console.log('시작하기 버튼 클릭됨');
            await page.waitForTimeout(2000);
        } else {
            console.log('시작하기 버튼을 찾을 수 없습니다.');
        }
        
        // JavaScript 에러 확인
        console.log('\n5. JavaScript 에러 확인...');
        const jsErrors = await page.evaluate(() => {
            const errors = [];
            // 전역 함수들 확인
            if (typeof handleStartClick === 'undefined') {
                errors.push('handleStartClick 함수가 정의되지 않음');
            }
            if (typeof startVoiceIntroduction === 'undefined') {
                errors.push('startVoiceIntroduction 함수가 정의되지 않음');
            }
            if (typeof testClick === 'undefined') {
                errors.push('testClick 함수가 정의되지 않음');
            }
            return errors;
        });
        
        if (jsErrors.length > 0) {
            console.log('발견된 문제들:');
            jsErrors.forEach(error => console.log(`  - ${error}`));
        } else {
            console.log('JavaScript 함수들이 모두 정의되어 있습니다.');
        }
        
        // 10초 대기 (추가 콘솔 메시지 확인)
        console.log('\n추가 확인을 위해 10초 대기 중...');
        await page.waitForTimeout(10000);
        
    } catch (error) {
        console.error('테스트 중 오류 발생:', error);
    }
    
    console.log('\n=== 테스트 완료 ===');
    console.log('브라우저를 수동으로 닫아주세요.');
    
    // 브라우저 열어둠
    await page.waitForTimeout(300000); // 5분 대기
})();