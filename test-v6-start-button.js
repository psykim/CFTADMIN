const { chromium } = require('playwright');

async function testV6StartButton() {
    console.log('=== V6 시작 버튼 작동 테스트 ===');
    
    const browser = await chromium.launch({ 
        headless: false,
        slowMo: 1000
    });
    const page = await browser.newPage();
    
    // 콘솔 메시지 수집
    page.on('console', msg => {
        const message = `${msg.type()}: ${msg.text()}`;
        console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
    });
    
    // 에러 수집
    page.on('pageerror', err => {
        console.log(`[${new Date().toLocaleTimeString()}] 페이지 오류:`, err.message);
    });
    
    try {
        console.log('1. 페이지 로딩...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        await page.waitForTimeout(3000);
        
        console.log('2. 시작 버튼 상태 확인...');
        const buttonInfo = await page.evaluate(() => {
            const btn = document.getElementById('manualStartBtn');
            if (!btn) return { error: 'Button not found' };
            
            const style = window.getComputedStyle(btn);
            return {
                exists: true,
                text: btn.textContent.trim(),
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                disabled: btn.disabled,
                onclick: btn.onclick ? 'has onclick' : 'no onclick',
                eventListeners: btn.getEventListeners ? 'has listeners' : 'unknown',
                boundingBox: btn.getBoundingClientRect(),
                zIndex: style.zIndex
            };
        });
        
        console.log('시작 버튼 상태:', JSON.stringify(buttonInfo, null, 2));
        
        console.log('3. 시작 버튼 클릭 시도...');
        const startButton = await page.$('#manualStartBtn');
        
        if (startButton) {
            const isVisible = await startButton.isVisible();
            const isEnabled = await startButton.isEnabled();
            
            console.log(`버튼 가시성: ${isVisible}, 활성화: ${isEnabled}`);
            
            if (isVisible && isEnabled) {
                console.log('버튼 클릭 중...');
                await startButton.click();
                console.log('클릭 완료');
                
                // 클릭 후 상태 변화 관찰
                await page.waitForTimeout(3000);
                
                const afterClickState = await page.evaluate(() => {
                    const voiceGuide = document.getElementById('voiceGuideText');
                    const btn = document.getElementById('manualStartBtn');
                    return {
                        voiceGuideText: voiceGuide ? voiceGuide.textContent.trim() : 'not found',
                        buttonText: btn ? btn.textContent.trim() : 'not found',
                        buttonDisplay: btn ? window.getComputedStyle(btn).display : 'not found',
                        speechSynthesis: {
                            speaking: window.speechSynthesis ? window.speechSynthesis.speaking : 'not available',
                            pending: window.speechSynthesis ? window.speechSynthesis.pending : 'not available'
                        }
                    };
                });
                
                console.log('클릭 후 상태:', JSON.stringify(afterClickState, null, 2));
            } else {
                console.log(`버튼을 클릭할 수 없음 - 가시성: ${isVisible}, 활성화: ${isEnabled}`);
                
                // 강제로 버튼 활성화 시도
                await page.evaluate(() => {
                    const btn = document.getElementById('manualStartBtn');
                    if (btn) {
                        btn.disabled = false;
                        btn.style.display = 'block';
                        btn.style.visibility = 'visible';
                        btn.style.opacity = '1';
                        btn.style.pointerEvents = 'auto';
                        console.log('버튼 강제 활성화 완료');
                    }
                });
                
                console.log('강제 활성화 후 재시도...');
                await startButton.click();
                await page.waitForTimeout(3000);
            }
        } else {
            console.log('시작 버튼을 찾을 수 없음');
        }
        
        // JavaScript 함수들 존재 여부 확인
        console.log('4. JavaScript 함수 확인...');
        const jsState = await page.evaluate(() => {
            return {
                handleStartClick: typeof window.handleStartClick,
                startInstructions: typeof startInstructions,
                isStartClicked: typeof isStartClicked !== 'undefined' ? isStartClicked : 'undefined',
                isInstructionsStarted: typeof isInstructionsStarted !== 'undefined' ? isInstructionsStarted : 'undefined'
            };
        });
        
        console.log('JavaScript 상태:', JSON.stringify(jsState, null, 2));
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

testV6StartButton().catch(console.error);