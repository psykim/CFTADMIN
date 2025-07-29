const { chromium } = require('playwright');

async function testClickFunction() {
    console.log('=== V6 클릭 함수 테스트 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log(`[CONSOLE]: ${msg.text()}`);
    });
    
    try {
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html');
        await page.waitForTimeout(3000);
        
        console.log('1. 직접 handleStartClick 함수 호출 테스트...');
        
        const result = await page.evaluate(() => {
            try {
                if (typeof window.handleStartClick === 'function') {
                    console.log('handleStartClick 함수 직접 호출 시도...');
                    window.handleStartClick();
                    return { success: true, message: 'handleStartClick 호출됨' };
                } else {
                    return { success: false, message: 'handleStartClick 함수가 없음' };
                }
            } catch (error) {
                return { success: false, message: error.message };
            }
        });
        
        console.log('직접 호출 결과:', result);
        
        // 3초 후 상태 확인
        await page.waitForTimeout(3000);
        
        const afterState = await page.evaluate(() => {
            const voiceGuide = document.getElementById('voiceGuideText');
            return {
                voiceGuideText: voiceGuide ? voiceGuide.textContent.trim() : 'not found',
                speechSynthesis: {
                    speaking: window.speechSynthesis ? window.speechSynthesis.speaking : 'not available'
                }
            };
        });
        
        console.log('3초 후 상태:', afterState);
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

testClickFunction().catch(console.error);