const { chromium } = require('playwright');
const path = require('path');

async function testAnimalFluencyV21() {
    console.log('Starting Animal Fluency Test V21 with Playwright (with data injection)...');
    
    const browser = await chromium.launch({ 
        headless: false,
        args: ['--use-fake-ui-for-media-stream'] // Auto-accept microphone permission
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Capture console messages
    const consoleLogs = [];
    page.on('console', msg => {
        const logEntry = `[${msg.type()}] ${msg.text()}`;
        consoleLogs.push(logEntry);
        console.log(logEntry);
    });
    
    // Capture page errors
    page.on('pageerror', error => {
        console.error('Page error:', error.message);
        consoleLogs.push(`[ERROR] ${error.message}`);
    });
    
    try {
        // Open the HTML file
        const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v21.html')}`;
        console.log(`Opening: ${filePath}`);
        await page.goto(filePath);
        
        // Wait for page to load
        await page.waitForTimeout(1000);
        
        // Inject test data directly to simulate animals being entered
        console.log('Injecting test data to simulate user input...');
        await page.evaluate(() => {
            // Access the global animals array
            if (!window.animals) {
                window.animals = [];
            }
            
            // Simulate animals being added at different time intervals
            const testAnimals = [
                // First 15 seconds
                { name: '개', timestamp: Date.now() },
                { name: '고양이', timestamp: Date.now() + 1000 },
                { name: '사자', timestamp: Date.now() + 2000 },
                { name: '호랑이', timestamp: Date.now() + 3000 },
                { name: '토끼', timestamp: Date.now() + 5000 },
                { name: '말', timestamp: Date.now() + 7000 },
                { name: '소', timestamp: Date.now() + 10000 },
                { name: '돼지', timestamp: Date.now() + 12000 },
                // 15-30 seconds
                { name: '닭', timestamp: Date.now() + 16000 },
                { name: '오리', timestamp: Date.now() + 18000 },
                { name: '거위', timestamp: Date.now() + 20000 },
                { name: '염소', timestamp: Date.now() + 22000 },
                { name: '양', timestamp: Date.now() + 25000 },
                { name: '원숭이', timestamp: Date.now() + 28000 },
                // 30-45 seconds
                { name: '코끼리', timestamp: Date.now() + 31000 },
                { name: '기린', timestamp: Date.now() + 35000 },
                { name: '하마', timestamp: Date.now() + 38000 },
                { name: '악어', timestamp: Date.now() + 40000 },
                { name: '뱀', timestamp: Date.now() + 42000 }
            ];
            
            // Set the animals array
            window.animals = testAnimals;
            
            // Update the response list display
            const responseList = document.getElementById('responseList');
            if (responseList) {
                responseList.innerHTML = testAnimals.map((animal, index) => 
                    `<div class="response-item">${index + 1}. ${animal.name}</div>`
                ).join('');
            }
            
            console.log('Test data injected:', testAnimals);
        });
        
        // Click start and immediately trigger end of test
        console.log('Starting test and triggering immediate completion...');
        await page.click('#manualStartBtn');
        
        // Wait a moment for test to initialize
        await page.waitForTimeout(2000);
        
        // Directly trigger the test end
        await page.evaluate(() => {
            // Find and call the stopTest function
            if (typeof window.stopTest === 'function') {
                console.log('Calling stopTest() directly');
                window.stopTest();
            } else {
                console.error('stopTest function not found');
                // Alternative: trigger the stop button
                const stopBtn = document.getElementById('stopBtn');
                if (stopBtn) {
                    console.log('Clicking stop button');
                    stopBtn.click();
                } else {
                    console.error('Stop button not found');
                }
            }
        });
        
        // Wait for analyzing overlay to appear
        console.log('Waiting for analyzing overlay...');
        await page.waitForFunction(() => {
            const overlay = document.querySelector('#analyzing-overlay');
            return overlay && overlay.style.display !== 'none';
        }, { timeout: 10000 });
        
        console.log('Analyzing overlay appeared!');
        
        // Wait for CFTSCORING results
        console.log('Waiting for CFTSCORING results...');
        await page.waitForFunction(() => {
            const resultsSection = document.querySelector('#results-section');
            return resultsSection && resultsSection.style.display !== 'none' && 
                   resultsSection.innerHTML.includes('검사 결과');
        }, { timeout: 30000 });
        
        console.log('Results appeared!');
        
        // Check for CFTSCORING specific elements
        const hasCFTSCORINGResults = await page.evaluate(() => {
            const results = document.querySelector('#results-section');
            if (!results) return false;
            
            const html = results.innerHTML;
            return html.includes('카테고리 분석') && 
                   html.includes('시간 구간별 분석') && 
                   html.includes('가중치 점수') &&
                   html.includes('동물 이름 목록');
        });
        
        console.log(`CFTSCORING detailed results present: ${hasCFTSCORINGResults}`);
        
        // Take screenshot of final results
        await page.waitForTimeout(2000);
        await page.screenshot({ 
            path: 'animal-fluency-v21-cftscoring-results.png',
            fullPage: true 
        });
        console.log('Screenshot saved as animal-fluency-v21-cftscoring-results.png');
        
        // Extract detailed results
        const detailedResults = await page.evaluate(() => {
            const results = {};
            const resultsSection = document.querySelector('#results-section');
            
            if (resultsSection) {
                // Total animals
                const totalMatch = resultsSection.textContent.match(/전체 동물 수:\s*(\d+)/);
                if (totalMatch) results.totalAnimals = totalMatch[1];
                
                // Weighted score
                const scoreMatch = resultsSection.textContent.match(/가중치 점수:\s*([\d.]+)/);
                if (scoreMatch) results.weightedScore = scoreMatch[1];
                
                // Categories
                const categoryMatch = resultsSection.textContent.match(/(\d+)개 카테고리/);
                if (categoryMatch) results.categories = categoryMatch[1];
                
                // Time intervals
                const timeIntervals = {};
                const intervalMatches = resultsSection.textContent.matchAll(/(\d+-\d+초):\s*(\d+)개/g);
                for (const match of intervalMatches) {
                    timeIntervals[match[1]] = match[2];
                }
                results.timeIntervals = timeIntervals;
                
                // Check for specific CFTSCORING elements
                results.hasCategoryAnalysis = resultsSection.innerHTML.includes('카테고리 분석');
                results.hasTimeAnalysis = resultsSection.innerHTML.includes('시간 구간별 분석');
                results.hasWeightedScore = resultsSection.innerHTML.includes('가중치 점수');
                results.hasAnimalList = resultsSection.innerHTML.includes('동물 이름 목록');
            }
            
            return results;
        });
        
        console.log('\n=== CFTSCORING Test Results ===');
        console.log(`Total Animals: ${detailedResults.totalAnimals || 'Not found'}`);
        console.log(`Weighted Score: ${detailedResults.weightedScore || 'Not found'}`);
        console.log(`Categories: ${detailedResults.categories || 'Not found'}`);
        console.log('Time Intervals:', detailedResults.timeIntervals || {});
        
        console.log('\n=== CFTSCORING Components Check ===');
        console.log(`✓ Category Analysis: ${detailedResults.hasCategoryAnalysis}`);
        console.log(`✓ Time Analysis: ${detailedResults.hasTimeAnalysis}`);
        console.log(`✓ Weighted Score: ${detailedResults.hasWeightedScore}`);
        console.log(`✓ Animal List: ${detailedResults.hasAnimalList}`);
        
        // Report console errors
        const errors = consoleLogs.filter(log => 
            log.includes('[ERROR]') || log.includes('오류') && 
            !log.includes('network') // Ignore network errors from speech recognition
        );
        
        if (errors.length > 0) {
            console.log('\n=== Console Errors (excluding network) ===');
            errors.forEach(error => console.log(error));
        } else {
            console.log('\n✓ No critical console errors detected');
        }
        
        // Final verification
        console.log('\n=== Test Verification ===');
        console.log(`✓ Test completed successfully`);
        console.log(`✓ CFTSCORING analysis displayed: ${hasCFTSCORINGResults}`);
        console.log(`✓ All CFTSCORING components present: ${
            detailedResults.hasCategoryAnalysis && 
            detailedResults.hasTimeAnalysis && 
            detailedResults.hasWeightedScore && 
            detailedResults.hasAnimalList
        }`);
        
    } catch (error) {
        console.error('Test failed:', error);
        await page.screenshot({ path: 'animal-fluency-v21-error.png', fullPage: true });
        console.log('Error screenshot saved as animal-fluency-v21-error.png');
    } finally {
        await browser.close();
        console.log('\nTest completed.');
    }
}

// Run the test
testAnimalFluencyV21().catch(console.error);