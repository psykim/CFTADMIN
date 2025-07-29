const { chromium } = require('playwright');

async function testV9SpeechRecognition() {
    console.log('=== V9 음성인식 테스트 시작 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        args: [
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream'
        ]
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // 콘솔 로그 캡처
    page.on('console', msg => {
        console.log(`[브라우저]: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
        console.error(`[페이지 오류]: ${error.message}`);
    });
    
    try {
        console.log('1. V9 페이지 로드 중...');
        await page.goto('file:///Users/kwk/development/CFTADMIN/animal-fluency-test-v9.html');
        await page.waitForTimeout(2000);
        
        console.log('2. 시작 버튼 클릭...');
        await page.click('#manualStartBtn');
        await page.waitForTimeout(3000);
        
        console.log('3. 연습 시작 대기...');
        // 연습 시작까지 대기 (음성 안내 시간)
        await page.waitForTimeout(15000);
        
        console.log('4. 음성인식 상태 확인...');
        const recognitionState = await page.evaluate(() => {
            return {
                recognition: window.recognition ? 'exists' : 'null',
                isRecognizing: window.isRecognizing,
                isPracticePhase: window.isPracticePhase,
                micIconActive: document.querySelector('.test-mic-icon')?.classList.contains('active'),
                practiceItems: window.practiceItems
            };
        });
        
        console.log('음성인식 상태:', recognitionState);
        
        console.log('5. 음성인식 객체 상세 확인...');
        const recognitionDetails = await page.evaluate(() => {
            if (!window.recognition) {
                return { error: 'recognition 객체가 없음' };
            }
            
            const rec = window.recognition;
            return {
                continuous: rec.continuous,
                interimResults: rec.interimResults,
                lang: rec.lang,
                maxAlternatives: rec.maxAlternatives,
                onstart: rec.onstart ? 'defined' : 'null',
                onresult: rec.onresult ? 'defined' : 'null',
                onerror: rec.onerror ? 'defined' : 'null',
                onend: rec.onend ? 'defined' : 'null'
            };
        });
        
        console.log('음성인식 객체 상세:', recognitionDetails);
        
        // 연습 모드 종료 대기
        await page.waitForTimeout(10000);
        
        console.log('6. 본 검사 시작 대기...');
        await page.waitForTimeout(10000);
        
        console.log('7. 본 검사 중 음성인식 상태 확인...');
        const mainTestState = await page.evaluate(() => {
            return {
                isRecognizing: window.isRecognizing,
                isPracticePhase: window.isPracticePhase,
                timeRemaining: window.timeRemaining,
                animals: window.animals,
                micIconActive: document.querySelector('.test-mic-icon')?.classList.contains('active')
            };
        });
        
        console.log('본 검사 상태:', mainTestState);
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

testV9SpeechRecognition().catch(console.error);