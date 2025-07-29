const { chromium } = require('playwright');

async function testV6DetailedFlow() {
    console.log('=== V6 상세 플로우 테스트 시작 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000 // 천천히 실행
    });
    const page = await browser.newPage();
    
    // 콘솔 메시지 수집
    const consoleMessages = [];
    page.on('console', msg => {
        const message = `${msg.type()}: ${msg.text()}`;
        consoleMessages.push(message);
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    });
    
    // 오류 수집
    page.on('pageerror', err => {
        console.log(`[${new Date().toLocaleTimeString()}] 페이지 오류:`, err.message);
    });
    
    try {
        console.log('1. 페이지 로딩...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(3000); // 3초 대기
        
        console.log('2. 초기 상태 확인...');
        const initialState = await page.evaluate(() => {
            return {
                startBtnVisible: document.getElementById('manualStartBtn') ? 
                    window.getComputedStyle(document.getElementById('manualStartBtn')).display !== 'none' : false,
                startBtnText: document.getElementById('manualStartBtn') ? 
                    document.getElementById('manualStartBtn').textContent : 'not found',
                voiceGuideText: document.getElementById('voiceGuideText') ? 
                    document.getElementById('voiceGuideText').textContent : 'not found',
                readyBoxVisible: document.getElementById('readyBox') ?
                    window.getComputedStyle(document.getElementById('readyBox')).display !== 'none' : false
            };
        });
        
        console.log('초기 상태:', JSON.stringify(initialState, null, 2));
        
        console.log('3. 시작 버튼 클릭...');
        const startButton = await page.$('#manualStartBtn');
        if (startButton && await startButton.isVisible()) {
            await startButton.click();
            console.log('시작 버튼 클릭됨');
            
            // 클릭 후 상태 변화 모니터링
            for (let i = 0; i < 10; i++) {
                await page.waitForTimeout(2000); // 2초씩 대기
                
                const currentState = await page.evaluate(() => {
                    return {
                        timestamp: new Date().toLocaleTimeString(),
                        startBtnDisplay: document.getElementById('manualStartBtn') ? 
                            window.getComputedStyle(document.getElementById('manualStartBtn')).display : 'not found',
                        voiceGuideText: document.getElementById('voiceGuideText') ? 
                            document.getElementById('voiceGuideText').textContent.trim() : 'not found',
                        voiceGuideVisible: document.getElementById('voiceGuideBox') ?
                            window.getComputedStyle(document.getElementById('voiceGuideBox')).display !== 'none' : false,
                        readyBoxVisible: document.getElementById('readyBox') ?
                            window.getComputedStyle(document.getElementById('readyBox')).display !== 'none' : false,
                        speechSynthesisActive: window.speechSynthesis ? window.speechSynthesis.speaking : false,
                        speechSynthesisPending: window.speechSynthesis ? window.speechSynthesis.pending : false
                    };
                });
                
                console.log(`상태 체크 ${i+1}:`, JSON.stringify(currentState, null, 2));
                
                // 스크린샷 찍기
                await page.screenshot({ path: `v6-state-${i+1}.png`, fullPage: true });
                
                // 음성이 끝났는지 확인
                if (!currentState.speechSynthesisActive && !currentState.speechSynthesisPending) {
                    console.log(`음성 완료됨 (체크 ${i+1})`);
                    break;
                }
            }
        } else {
            console.log('시작 버튼을 찾을 수 없거나 보이지 않음');
        }
        
        console.log('4. 최종 상태 확인...');
        const finalState = await page.evaluate(() => {
            const allButtons = Array.from(document.querySelectorAll('button')).map(btn => ({
                id: btn.id,
                text: btn.textContent.trim(),
                display: window.getComputedStyle(btn).display,
                visible: window.getComputedStyle(btn).display !== 'none'
            }));
            
            return {
                buttons: allButtons,
                currentVoiceText: document.getElementById('voiceGuideText') ? 
                    document.getElementById('voiceGuideText').textContent.trim() : 'not found',
                speechSynthesisState: window.speechSynthesis ? {
                    speaking: window.speechSynthesis.speaking,
                    pending: window.speechSynthesis.pending,
                    paused: window.speechSynthesis.paused
                } : 'not available'
            };
        });
        
        console.log('최종 상태:', JSON.stringify(finalState, null, 2));
        
        // 최종 스크린샷
        await page.screenshot({ path: 'v6-final-state.png', fullPage: true });
        
        console.log('\n=== 수집된 콘솔 메시지 ===');
        consoleMessages.forEach((msg, index) => {
            console.log(`${index + 1}: ${msg}`);
        });
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000); // 5초 더 대기
        await browser.close();
    }
}

testV6DetailedFlow().catch(console.error);