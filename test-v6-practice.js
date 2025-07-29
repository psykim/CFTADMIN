const { chromium } = require('playwright');

async function testV6Practice() {
    console.log('=== V6 연습 재시행 테스트 시작 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 500
    });
    const page = await browser.newPage();
    
    // 콘솔 메시지 수집
    page.on('console', msg => {
        const message = `${msg.type()}: ${msg.text()}`;
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    });
    
    try {
        console.log('1. 페이지 로딩...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(3000);
        
        console.log('2. 시작 버튼 클릭...');
        const startButton = await page.$('#manualStartBtn');
        if (startButton && await startButton.isVisible()) {
            await startButton.click();
            console.log('시작 버튼 클릭됨');
            
            // 음성 안내 완료까지 기다리기 (약 20초)
            console.log('3. 음성 안내 완료 대기...');
            await page.waitForTimeout(25000);
            
            // 연습 시행 중 시작 버튼 상태 확인
            console.log('4. 연습 시행 중 버튼 상태 확인...');
            const buttonState = await page.evaluate(() => {
                const btn = document.getElementById('manualStartBtn');
                const micIcon = document.getElementById('testMicIcon');
                return {
                    buttonExists: !!btn,
                    buttonVisible: btn ? window.getComputedStyle(btn).display !== 'none' : false,
                    buttonText: btn ? btn.textContent.trim() : 'not found',
                    micActive: micIcon ? micIcon.classList.contains('active') : false
                };
            });
            
            console.log('연습 시행 중 상태:', JSON.stringify(buttonState, null, 2));
            
            // 연습 시행이 끝날 때까지 대기 (10초)
            console.log('5. 연습 시행 완료 대기 (무응답으로 재시행 유도)...');
            await page.waitForTimeout(12000);
            
            // 재시행 안내 메시지 확인
            console.log('6. 재시행 안내 후 상태 확인...');
            await page.waitForTimeout(5000);
            
            const retryState = await page.evaluate(() => {
                const voiceGuideText = document.getElementById('voiceGuideText');
                const micIcon = document.getElementById('testMicIcon');
                return {
                    voiceText: voiceGuideText ? voiceGuideText.textContent.trim() : 'not found',
                    micActive: micIcon ? micIcon.classList.contains('active') : false
                };
            });
            
            console.log('재시행 상태:', JSON.stringify(retryState, null, 2));
            
            // 재시행 완료까지 대기
            console.log('7. 재시행 완료 대기...');
            await page.waitForTimeout(15000);
            
            console.log('8. 최종 상태 확인...');
            const finalState = await page.evaluate(() => {
                const voiceGuideText = document.getElementById('voiceGuideText');
                return {
                    voiceText: voiceGuideText ? voiceGuideText.textContent.trim() : 'not found'
                };
            });
            
            console.log('최종 상태:', JSON.stringify(finalState, null, 2));
            
        } else {
            console.log('시작 버튼을 찾을 수 없거나 보이지 않음');
        }
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

testV6Practice().catch(console.error);