const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream'] // 마이크 권한 자동 허용
    });
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    const page = await context.newPage();
    
    // 콘솔 메시지 캡처
    page.on('console', msg => console.log('페이지 콘솔:', msg.text()));
    page.on('pageerror', error => console.error('페이지 에러:', error));
    
    // 로컬 HTML 파일 열기
    const filePath = path.join(__dirname, 'animal-fluency-test-v2.html');
    await page.goto(`file://${filePath}`);
    
    console.log('페이지 로드 완료');
    
    // 시작 버튼 클릭
    await page.waitForSelector('#manualStartBtn', { state: 'visible' });
    console.log('시작 버튼 발견');
    await page.click('#manualStartBtn');
    
    // 하드웨어 설정에서 계속 버튼 클릭
    await page.waitForSelector('#hardwareContinueBtn', { state: 'visible', timeout: 10000 });
    console.log('하드웨어 설정 화면 표시됨');
    await page.click('#hardwareContinueBtn');
    
    // 연습 화면 대기
    await page.waitForSelector('.practice-section', { state: 'visible', timeout: 10000 });
    console.log('연습 화면 표시됨');
    
    // 음성인식 상태 확인
    const recognitionStatus = await page.evaluate(() => {
        return {
            isRecognizing: window.isRecognizing,
            recognition: window.recognition ? 'initialized' : 'not initialized',
            audioContext: window.audioContext ? 'initialized' : 'not initialized'
        };
    });
    console.log('음성인식 상태:', recognitionStatus);
    
    // 5초 대기하면서 음성인식 동작 관찰
    console.log('5초간 연습 시행 관찰...');
    await page.waitForTimeout(5000);
    
    // 음성인식 결과 확인
    const practiceItems = await page.evaluate(() => {
        return window.practiceItems || [];
    });
    console.log('연습에서 인식된 항목:', practiceItems);
    
    // 준비 완료 버튼 클릭
    const readyButton = await page.$('#testReadyBtn');
    if (readyButton) {
        console.log('준비 완료 버튼 발견');
        await readyButton.click();
        
        // 본시행 시작 대기
        console.log('본시행 시작 대기...');
        await page.waitForTimeout(3000);
        
        // 테스트 화면 표시 여부 확인
        const testScreenVisible = await page.evaluate(() => {
            const testScreen = document.getElementById('testScreen');
            return testScreen && testScreen.classList.contains('active');
        });
        console.log('테스트 화면 활성화:', testScreenVisible);
        
        // 마이크 아이콘 상태 확인
        const micStatus = await page.evaluate(() => {
            const micIcon = document.querySelector('.test-screen .mic-icon');
            return micIcon ? micIcon.classList.contains('active') : false;
        });
        console.log('마이크 아이콘 활성화:', micStatus);
        
        // 타이머 상태 확인
        const timerStatus = await page.evaluate(() => {
            const timer = document.getElementById('timer');
            return {
                visible: timer ? timer.style.display !== 'none' : false,
                text: timer ? timer.textContent : 'N/A'
            };
        });
        console.log('타이머 상태:', timerStatus);
    }
    
    // 10초 대기
    await page.waitForTimeout(10000);
    
    await browser.close();
})();