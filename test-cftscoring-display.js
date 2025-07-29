const { chromium } = require('playwright');
const path = require('path');

async function testCFTSCORINGDisplay() {
    console.log('Testing CFTSCORING Display in animal-fluency-test-v21.html...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream']
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Minimal console logging
    page.on('console', msg => {
        if (msg.text().includes('CFTSCORING') || msg.text().includes('분석')) {
            console.log(`[${msg.type()}] ${msg.text()}`);
        }
    });
    
    try {
        // Open the HTML file
        const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v21.html')}`;
        console.log(`Opening: ${filePath}`);
        await page.goto(filePath);
        await page.waitForTimeout(2000);
        
        // Directly inject complete test data and trigger analysis
        console.log('\nInjecting test data and triggering CFTSCORING analysis...');
        
        await page.evaluate(() => {
            // Set up complete test data
            const testStartTime = Date.now() - 45000; // Simulate test started 45 seconds ago
            
            window.startTime = testStartTime;
            window.animals = [
                // 0-15초 구간 (8개)
                { name: '개', timestamp: testStartTime + 1000, elapsedTime: 1000 },
                { name: '고양이', timestamp: testStartTime + 2000, elapsedTime: 2000 },
                { name: '사자', timestamp: testStartTime + 3000, elapsedTime: 3000 },
                { name: '호랑이', timestamp: testStartTime + 4000, elapsedTime: 4000 },
                { name: '토끼', timestamp: testStartTime + 5000, elapsedTime: 5000 },
                { name: '말', timestamp: testStartTime + 7000, elapsedTime: 7000 },
                { name: '소', timestamp: testStartTime + 9000, elapsedTime: 9000 },
                { name: '돼지', timestamp: testStartTime + 12000, elapsedTime: 12000 },
                // 15-30초 구간 (6개)
                { name: '닭', timestamp: testStartTime + 16000, elapsedTime: 16000 },
                { name: '오리', timestamp: testStartTime + 18000, elapsedTime: 18000 },
                { name: '거위', timestamp: testStartTime + 20000, elapsedTime: 20000 },
                { name: '염소', timestamp: testStartTime + 22000, elapsedTime: 22000 },
                { name: '양', timestamp: testStartTime + 25000, elapsedTime: 25000 },
                { name: '원숭이', timestamp: testStartTime + 28000, elapsedTime: 28000 },
                // 30-45초 구간 (4개)
                { name: '코끼리', timestamp: testStartTime + 31000, elapsedTime: 31000 },
                { name: '기린', timestamp: testStartTime + 35000, elapsedTime: 35000 },
                { name: '하마', timestamp: testStartTime + 38000, elapsedTime: 38000 },
                { name: '악어', timestamp: testStartTime + 42000, elapsedTime: 42000 }
            ];
            
            // Update response list
            const responseList = document.getElementById('responseList');
            if (responseList) {
                responseList.innerHTML = window.animals.map((animal, index) => 
                    `<div class="response-item">${index + 1}. ${animal.name}</div>`
                ).join('');
            }
            
            // Show analyzing overlay
            const overlay = document.getElementById('analyzing-overlay');
            if (overlay) {
                overlay.style.display = 'flex';
            }
            
            // Directly call the CFTSCORING analysis function
            if (typeof window.analyzeWithCFTSCORING === 'function') {
                console.log('Calling analyzeWithCFTSCORING directly...');
                window.analyzeWithCFTSCORING();
            } else {
                console.error('analyzeWithCFTSCORING function not found');
            }
        });
        
        // Wait for results to appear
        console.log('\nWaiting for CFTSCORING results to appear...');
        
        const resultsAppeared = await page.waitForFunction(() => {
            const resultsSection = document.querySelector('#results-section');
            return resultsSection && 
                   resultsSection.style.display !== 'none' && 
                   resultsSection.innerHTML.includes('카테고리 분석');
        }, { timeout: 15000 }).catch(() => false);
        
        if (resultsAppeared) {
            console.log('✓ CFTSCORING results appeared!\n');
            
            // Extract and display results
            const results = await page.evaluate(() => {
                const resultsSection = document.querySelector('#results-section');
                if (!resultsSection) return null;
                
                const html = resultsSection.innerHTML;
                return {
                    hasCategories: html.includes('카테고리 분석'),
                    hasTimeAnalysis: html.includes('시간 구간별 분석'),
                    hasWeightedScore: html.includes('가중치 점수'),
                    hasAnimalList: html.includes('동물 이름 목록'),
                    hasHeatmap: html.includes('category-heatmap'),
                    totalAnimals: (html.match(/전체 동물 수:\s*(\d+)/) || [])[1],
                    weightedScore: (html.match(/가중치 점수:\s*([\d.]+)/) || [])[1],
                    categories: (html.match(/(\d+)개 카테고리/) || [])[1]
                };
            });
            
            console.log('=== CFTSCORING Components Check ===');
            console.log(`Category Analysis: ${results.hasCategories ? '✓' : '✗'}`);
            console.log(`Time Interval Analysis: ${results.hasTimeAnalysis ? '✓' : '✗'}`);
            console.log(`Weighted Score: ${results.hasWeightedScore ? '✓' : '✗'}`);
            console.log(`Animal List: ${results.hasAnimalList ? '✓' : '✗'}`);
            console.log(`Category Heatmap: ${results.hasHeatmap ? '✓' : '✗'}`);
            
            console.log('\n=== Results Summary ===');
            console.log(`Total Animals: ${results.totalAnimals}`);
            console.log(`Weighted Score: ${results.weightedScore}`);
            console.log(`Categories Used: ${results.categories}`);
            
            // Check for voice announcement
            await page.waitForTimeout(2000);
            const voiceText = await page.evaluate(() => {
                const voiceGuide = document.querySelector('#voiceGuideText');
                return voiceGuide ? voiceGuide.textContent : '';
            });
            
            if (voiceText.includes('결과를 확인해 주세요')) {
                console.log('\n✓ Voice announcement: "결과를 확인해 주세요"');
            }
            
            // Take screenshot
            await page.screenshot({ 
                path: 'cftscoring-results-success.png',
                fullPage: true 
            });
            console.log('\n✓ Screenshot saved as cftscoring-results-success.png');
            
            console.log('\n✅ TEST PASSED: CFTSCORING analysis results are properly displayed!');
            
        } else {
            console.log('✗ CFTSCORING results did not appear');
            
            // Check what went wrong
            const errorInfo = await page.evaluate(() => {
                return {
                    overlayVisible: document.getElementById('analyzing-overlay')?.style.display,
                    resultsVisible: document.getElementById('results-section')?.style.display,
                    resultsContent: document.getElementById('results-section')?.innerHTML?.substring(0, 200),
                    animalsCount: window.animals?.length,
                    consoleErrors: window.lastError
                };
            });
            
            console.log('\nError diagnostics:', errorInfo);
            
            await page.screenshot({ 
                path: 'cftscoring-results-failed.png',
                fullPage: true 
            });
            
            console.log('\n❌ TEST FAILED: CFTSCORING results not displayed properly');
        }
        
    } catch (error) {
        console.error('\nTest error:', error);
        await page.screenshot({ path: 'cftscoring-error.png', fullPage: true });
    } finally {
        console.log('\nKeeping browser open for 5 seconds...');
        await page.waitForTimeout(5000);
        await browser.close();
    }
}

// Run the test
testCFTSCORINGDisplay().catch(console.error);