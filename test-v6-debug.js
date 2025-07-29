const { chromium } = require('playwright');

async function testV6StartButton() {
    console.log('=== V6 시작 버튼 디버깅 시작 ===');
    
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    // 콘솔 메시지 수집
    const consoleMessages = [];
    page.on('console', msg => {
        consoleMessages.push(`${msg.type()}: ${msg.text()}`);
        console.log(`콘솔 ${msg.type()}: ${msg.text()}`);
    });
    
    // 오류 수집
    page.on('pageerror', err => {
        console.log('페이지 오류:', err.message);
    });
    
    try {
        console.log('1. 페이지 로딩 중...');
        await page.goto('https://psykim.github.io/CFTADMIN/animal-fluency-test-v6.html', {
            waitUntil: 'networkidle',
            timeout: 30000
        });
        
        console.log('2. 페이지 로드 완료, 요소 확인 중...');
        
        // 기본 페이지 정보
        const title = await page.title();
        console.log('페이지 타이틀:', title);
        
        // 모든 페이지 요소 확인
        await page.waitForTimeout(2000); // 2초 대기
        
        const pageInfo = await page.evaluate(() => {
            return {
                url: window.location.href,
                readyBox: {
                    exists: !!document.getElementById('readyBox'),
                    display: document.getElementById('readyBox') ? window.getComputedStyle(document.getElementById('readyBox')).display : 'not found',
                    visibility: document.getElementById('readyBox') ? window.getComputedStyle(document.getElementById('readyBox')).visibility : 'not found'
                },
                manualStartBtn: {
                    exists: !!document.getElementById('manualStartBtn'),
                    display: document.getElementById('manualStartBtn') ? window.getComputedStyle(document.getElementById('manualStartBtn')).display : 'not found',
                    visibility: document.getElementById('manualStartBtn') ? window.getComputedStyle(document.getElementById('manualStartBtn')).visibility : 'not found',
                    opacity: document.getElementById('manualStartBtn') ? window.getComputedStyle(document.getElementById('manualStartBtn')).opacity : 'not found',
                    zIndex: document.getElementById('manualStartBtn') ? window.getComputedStyle(document.getElementById('manualStartBtn')).zIndex : 'not found'
                },
                testPage: {
                    exists: !!document.getElementById('testPage'),
                    hasActiveClass: document.getElementById('testPage') ? document.getElementById('testPage').classList.contains('active') : false,
                    display: document.getElementById('testPage') ? window.getComputedStyle(document.getElementById('testPage')).display : 'not found'
                },
                testContent: {
                    exists: !!document.querySelector('.test-content'),
                    display: document.querySelector('.test-content') ? window.getComputedStyle(document.querySelector('.test-content')).display : 'not found'
                }
            };
        });
        
        console.log('3. 페이지 요소 정보:');
        console.log(JSON.stringify(pageInfo, null, 2));
        
        // 스크린샷 찍기
        await page.screenshot({ path: 'v6-debug-screenshot.png', fullPage: true });
        console.log('4. 스크린샷 저장: v6-debug-screenshot.png');
        
        // 시작 버튼 찾기 시도
        const startButton = await page.$('#manualStartBtn');
        if (startButton) {
            console.log('5. 시작 버튼 찾음!');
            
            // 버튼 위치와 크기 확인
            const box = await startButton.boundingBox();
            console.log('버튼 위치/크기:', box);
            
            // 버튼이 보이는지 확인
            const isVisible = await startButton.isVisible();
            console.log('버튼 가시성:', isVisible);
            
            if (isVisible) {
                console.log('6. 버튼 클릭 시도...');
                await startButton.click();
                await page.waitForTimeout(1000);
                console.log('버튼 클릭 완료');
            } else {
                console.log('6. 버튼이 보이지 않아 클릭할 수 없음');
                
                // 강제로 버튼 표시 시도
                await page.evaluate(() => {
                    const btn = document.getElementById('manualStartBtn');
                    if (btn) {
                        btn.style.display = 'block';
                        btn.style.visibility = 'visible';
                        btn.style.opacity = '1';
                        btn.style.position = 'relative';
                        btn.style.zIndex = '99999';
                        btn.style.background = 'red'; // 빨간색으로 강조
                        btn.style.width = '200px';
                        btn.style.height = '200px';
                    }
                });
                
                console.log('강제 표시 후 스크린샷 찍기...');
                await page.screenshot({ path: 'v6-debug-forced.png', fullPage: true });
                
                // 다시 가시성 확인
                const isVisibleAfter = await startButton.isVisible();
                console.log('강제 표시 후 가시성:', isVisibleAfter);
            }
        } else {
            console.log('5. 시작 버튼을 찾을 수 없음!');
        }
        
        // 모든 버튼 요소 찾기
        const allButtons = await page.$$('button');
        console.log('7. 페이지의 모든 버튼 수:', allButtons.length);
        
        for (let i = 0; i < allButtons.length; i++) {
            const btnInfo = await allButtons[i].evaluate(btn => ({
                id: btn.id,
                className: btn.className,
                textContent: btn.textContent.trim(),
                display: window.getComputedStyle(btn).display,
                visibility: window.getComputedStyle(btn).visibility
            }));
            console.log(`버튼 ${i + 1}:`, btnInfo);
        }
        
        console.log('\n=== 콘솔 메시지 요약 ===');
        consoleMessages.forEach(msg => console.log(msg));
        
    } catch (error) {
        console.error('테스트 중 오류:', error);
    } finally {
        await browser.close();
    }
}

testV6StartButton().catch(console.error);