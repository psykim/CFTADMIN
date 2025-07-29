const { chromium } = require('playwright');
const path = require('path');

async function testAnimalFluencyV21() {
    console.log('Starting Animal Fluency Test V21 - Final Test...');
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream']
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Capture console messages
    page.on('console', msg => console.log(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', error => console.error('Page error:', error.message));
    
    try {
        // Open the HTML file
        const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v21.html')}`;
        console.log(`Opening: ${filePath}`);
        await page.goto(filePath);
        
        // Wait for page to load
        await page.waitForTimeout(2000);
        
        // Click start button to begin the test flow
        console.log('Starting test...');
        await page.click('#manualStartBtn');
        
        // Wait for instructions to complete (about 20 seconds)
        console.log('Waiting for instructions to complete...');
        await page.waitForTimeout(22000);
        
        // After instructions, we need to start the actual test
        // Check if we need to click the start button again
        await page.evaluate(() => {
            // Check if startTest function exists and call it
            if (typeof window.startTest === 'function') {
                console.log('Starting actual test...');
                window.startTest();
            }
        });
        
        // Wait a moment for test to initialize
        await page.waitForTimeout(3000);
        
        // Inject test data
        console.log('Injecting test animals...');
        await page.evaluate(() => {
            // Initialize animals array if needed
            if (!window.animals) {
                window.animals = [];
            }
            
            // Create test animals with proper timestamps
            const startTime = Date.now();
            const testAnimals = [
                { name: '개', timestamp: startTime + 1000 },
                { name: '고양이', timestamp: startTime + 2000 },
                { name: '사자', timestamp: startTime + 3000 },
                { name: '호랑이', timestamp: startTime + 4000 },
                { name: '토끼', timestamp: startTime + 5000 },
                { name: '말', timestamp: startTime + 7000 },
                { name: '소', timestamp: startTime + 9000 },
                { name: '돼지', timestamp: startTime + 11000 },
                { name: '닭', timestamp: startTime + 13000 },
                { name: '오리', timestamp: startTime + 16000 },
                { name: '거위', timestamp: startTime + 18000 },
                { name: '염소', timestamp: startTime + 20000 },
                { name: '양', timestamp: startTime + 22000 },
                { name: '원숭이', timestamp: startTime + 25000 },
                { name: '코끼리', timestamp: startTime + 31000 },
                { name: '기린', timestamp: startTime + 35000 },
                { name: '하마', timestamp: startTime + 38000 },
                { name: '악어', timestamp: startTime + 40000 }
            ];
            
            window.animals = testAnimals;
            
            // Update display
            const responseList = document.getElementById('responseList');
            if (responseList) {
                responseList.innerHTML = testAnimals.map((animal, index) => 
                    `<div class="response-item">${index + 1}. ${animal.name}</div>`
                ).join('');
            }
            
            // Set test start time if needed
            if (!window.startTime) {
                window.startTime = startTime;
            }
            
            console.log('Injected', testAnimals.length, 'animals');
        });
        
        // Wait for test timer to complete or manually stop
        console.log('Waiting 5 seconds then stopping test...');
        await page.waitForTimeout(5000);
        
        // Stop the test
        await page.evaluate(() => {
            // Try multiple ways to stop the test
            if (typeof window.stopTest === 'function') {
                console.log('Calling stopTest()');
                window.stopTest();
            } else {
                // Click stop button
                const stopBtn = document.getElementById('stopBtn');
                if (stopBtn && stopBtn.style.display !== 'none') {
                    console.log('Clicking stop button');
                    stopBtn.click();
                }
            }
        });
        
        // Wait for analyzing overlay
        console.log('Waiting for analysis to start...');
        const overlayAppeared = await page.waitForFunction(() => {
            const overlay = document.querySelector('#analyzing-overlay');
            return overlay && overlay.style.display === 'flex';
        }, { timeout: 10000 }).catch(() => false);
        
        if (overlayAppeared) {
            console.log('✓ Analyzing overlay appeared');
        } else {
            console.log('✗ Analyzing overlay did not appear');
        }
        
        // Wait for results
        console.log('Waiting for CFTSCORING results...');
        const resultsAppeared = await page.waitForFunction(() => {
            const resultsSection = document.querySelector('#results-section');
            return resultsSection && 
                   resultsSection.style.display !== 'none' && 
                   resultsSection.innerHTML.length > 100;
        }, { timeout: 30000 }).catch(() => false);
        
        if (resultsAppeared) {
            console.log('✓ Results appeared');
            
            // Check for CFTSCORING components
            const cftscoringCheck = await page.evaluate(() => {
                const results = document.querySelector('#results-section');
                if (!results) return { found: false };
                
                const html = results.innerHTML;
                return {
                    found: true,
                    hasCategories: html.includes('카테고리 분석'),
                    hasTimeAnalysis: html.includes('시간 구간별 분석'),
                    hasWeightedScore: html.includes('가중치 점수'),
                    hasAnimalList: html.includes('동물 이름 목록'),
                    totalAnimals: (html.match(/전체 동물 수:\s*(\d+)/) || [])[1],
                    weightedScore: (html.match(/가중치 점수:\s*([\d.]+)/) || [])[1]
                };
            });
            
            console.log('\n=== CFTSCORING Analysis Results ===');
            console.log(`Category Analysis: ${cftscoringCheck.hasCategories ? '✓' : '✗'}`);
            console.log(`Time Analysis: ${cftscoringCheck.hasTimeAnalysis ? '✓' : '✗'}`);
            console.log(`Weighted Score: ${cftscoringCheck.hasWeightedScore ? '✓' : '✗'}`);
            console.log(`Animal List: ${cftscoringCheck.hasAnimalList ? '✓' : '✗'}`);
            console.log(`\nTotal Animals: ${cftscoringCheck.totalAnimals || 'N/A'}`);
            console.log(`Weighted Score: ${cftscoringCheck.weightedScore || 'N/A'}`);
            
            // Take screenshot
            await page.screenshot({ 
                path: 'cftscoring-results-final.png',
                fullPage: true 
            });
            console.log('\n✓ Screenshot saved as cftscoring-results-final.png');
            
            // Wait for voice announcement
            await page.waitForTimeout(3000);
            
            // Check if "결과를 확인해 주세요" was announced
            const voiceCheck = await page.evaluate(() => {
                const voiceGuide = document.querySelector('#voiceGuideText');
                return voiceGuide ? voiceGuide.textContent : '';
            });
            
            console.log(`\nVoice announcement: "${voiceCheck}"`);
            if (voiceCheck.includes('결과를 확인해 주세요')) {
                console.log('✓ "결과를 확인해 주세요" voice confirmed');
            }
            
        } else {
            console.log('✗ Results did not appear within timeout');
            await page.screenshot({ 
                path: 'cftscoring-timeout.png',
                fullPage: true 
            });
        }
        
    } catch (error) {
        console.error('Test error:', error);
        await page.screenshot({ path: 'cftscoring-error.png', fullPage: true });
    } finally {
        // Keep browser open for manual inspection
        console.log('\nTest completed. Browser will close in 10 seconds...');
        await page.waitForTimeout(10000);
        await browser.close();
    }
}

// Run the test
testAnimalFluencyV21().catch(console.error);