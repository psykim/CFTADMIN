const { chromium } = require('playwright');
const path = require('path');

async function testCompleteCFTSCORING() {
    console.log('Complete CFTSCORING Test for animal-fluency-test-v21.html\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream']
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Log important console messages
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('CFTSCORING') || text.includes('CSV') || text.includes('분석')) {
            console.log(`[LOG] ${text}`);
        }
    });
    
    try {
        // Open the HTML file
        const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v21.html')}`;
        console.log(`Opening: ${filePath}`);
        await page.goto(filePath);
        await page.waitForTimeout(2000);
        
        // Start the test properly
        console.log('\nStarting test...');
        await page.click('#manualStartBtn');
        
        // Wait for instructions (skip through them quickly)
        await page.waitForTimeout(5000);
        
        // Start the actual test
        await page.evaluate(() => {
            if (typeof window.startTest === 'function') {
                window.startTest();
            }
        });
        
        await page.waitForTimeout(2000);
        
        // Add animals during the test (simulating real user input)
        console.log('\nAdding test animals...');
        await page.evaluate(() => {
            // Get the current start time
            const currentStartTime = window.startTime || Date.now();
            
            // Add animals with proper elapsed time
            const testAnimals = [
                { name: '개', elapsedTime: 1000 },
                { name: '고양이', elapsedTime: 2000 },
                { name: '사자', elapsedTime: 3000 },
                { name: '호랑이', elapsedTime: 4000 },
                { name: '토끼', elapsedTime: 5000 },
                { name: '말', elapsedTime: 7000 },
                { name: '소', elapsedTime: 9000 },
                { name: '돼지', elapsedTime: 12000 },
                { name: '닭', elapsedTime: 16000 },
                { name: '오리', elapsedTime: 18000 },
                { name: '거위', elapsedTime: 20000 },
                { name: '염소', elapsedTime: 22000 },
                { name: '양', elapsedTime: 25000 },
                { name: '원숭이', elapsedTime: 28000 },
                { name: '코끼리', elapsedTime: 31000 },
                { name: '기린', elapsedTime: 35000 },
                { name: '하마', elapsedTime: 38000 },
                { name: '악어', elapsedTime: 42000 }
            ];
            
            // Ensure arrays exist
            if (!window.animals) {
                window.animals = [];
            }
            if (!window.uniqueAnimals) {
                window.uniqueAnimals = new Set();
            }
            
            // Add each animal with timestamp
            testAnimals.forEach(animal => {
                window.animals.push({
                    name: animal.name,
                    timestamp: currentStartTime + animal.elapsedTime,
                    elapsedTime: animal.elapsedTime
                });
                window.uniqueAnimals.add(animal.name);
            });
            
            // Update the display
            const responseList = document.getElementById('responseList');
            if (responseList) {
                responseList.innerHTML = window.animals.map((animal, index) => 
                    `<div class="response-item">${index + 1}. ${animal.name}</div>`
                ).join('');
            }
            
            console.log(`Added ${window.animals.length} animals`);
        });
        
        // Stop the test
        console.log('\nStopping test...');
        await page.evaluate(() => {
            if (typeof window.stopTest === 'function') {
                window.stopTest();
            }
        });
        
        // Wait for analyzing overlay
        console.log('\nWaiting for analysis...');
        await page.waitForFunction(() => {
            const overlay = document.querySelector('#analyzing-overlay');
            return overlay && overlay.style.display === 'flex';
        }, { timeout: 5000 });
        
        // Wait for CFTSCORING results
        console.log('Waiting for CFTSCORING results...');
        const resultsAppeared = await page.waitForFunction(() => {
            const resultsSection = document.querySelector('#results-section');
            return resultsSection && 
                   resultsSection.style.display !== 'none' && 
                   (resultsSection.innerHTML.includes('카테고리 분석') || 
                    resultsSection.innerHTML.includes('검사 결과'));
        }, { timeout: 20000 }).catch(() => false);
        
        if (resultsAppeared) {
            console.log('\n✓ Results appeared!');
            
            // Check what type of results we got
            const resultType = await page.evaluate(() => {
                const resultsSection = document.querySelector('#results-section');
                const html = resultsSection?.innerHTML || '';
                
                if (html.includes('카테고리 분석') && html.includes('시간 구간별 분석')) {
                    return 'CFTSCORING';
                } else if (html.includes('전체 동물 수')) {
                    return 'Internal';
                } else {
                    return 'Unknown';
                }
            });
            
            console.log(`Result type: ${resultType}`);
            
            if (resultType === 'CFTSCORING') {
                console.log('\n✅ SUCCESS: CFTSCORING analysis results are displayed!');
                
                // Extract details
                const details = await page.evaluate(() => {
                    const html = document.querySelector('#results-section').innerHTML;
                    return {
                        totalAnimals: (html.match(/전체 동물 수:\s*(\d+)/) || [])[1],
                        weightedScore: (html.match(/가중치 점수:\s*([\d.]+)/) || [])[1],
                        categories: (html.match(/(\d+)개 카테고리/) || [])[1]
                    };
                });
                
                console.log('\nResults Summary:');
                console.log(`- Total Animals: ${details.totalAnimals}`);
                console.log(`- Weighted Score: ${details.weightedScore}`);
                console.log(`- Categories: ${details.categories}`);
                
            } else if (resultType === 'Internal') {
                console.log('\n⚠️  Internal analysis was used instead of CFTSCORING');
            }
            
            // Check voice announcement
            const voiceText = await page.evaluate(() => {
                return document.querySelector('#voiceGuideText')?.textContent || '';
            });
            
            if (voiceText.includes('결과를 확인해 주세요')) {
                console.log('\n✓ Voice: "결과를 확인해 주세요"');
            }
            
            // Take screenshot
            await page.screenshot({ 
                path: 'cftscoring-complete-test.png',
                fullPage: true 
            });
            console.log('\n✓ Screenshot saved as cftscoring-complete-test.png');
            
        } else {
            console.log('\n✗ Results did not appear');
            await page.screenshot({ 
                path: 'cftscoring-complete-failed.png',
                fullPage: true 
            });
        }
        
    } catch (error) {
        console.error('\nTest error:', error);
        await page.screenshot({ path: 'cftscoring-complete-error.png', fullPage: true });
    } finally {
        console.log('\nTest completed. Browser will close in 10 seconds...');
        await page.waitForTimeout(10000);
        await browser.close();
    }
}

// Run the test
testCompleteCFTSCORING().catch(console.error);