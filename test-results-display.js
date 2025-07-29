const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch({
        headless: false,
        args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Enable console logging
    page.on('console', msg => {
        const text = msg.text();
        if (text.includes('stopTest') || text.includes('showResults') || text.includes('analyzeWithCFTSCORING') || text.includes('결과')) {
            console.log(`Browser console [${msg.type()}]: ${text}`);
        }
    });
    
    // Navigate to the file
    const filePath = 'file://' + path.resolve('/Users/kwk/development/CFTADMIN/animal-fluency-test-v20.html');
    await page.goto(filePath);
    
    console.log('1. Starting test and injecting test data...');
    
    // Start test and inject test data directly
    await page.evaluate(() => {
        // Click start button
        document.getElementById('manualStartBtn').click();
        
        // Wait for test to initialize
        setTimeout(() => {
            // Inject test data directly
            window.animals = [
                { name: '개', timestamp: Date.now() },
                { name: '고양이', timestamp: Date.now() + 5000 },
                { name: '소', timestamp: Date.now() + 10000 },
                { name: '말', timestamp: Date.now() + 15000 },
                { name: '돼지', timestamp: Date.now() + 20000 },
                { name: '토끼', timestamp: Date.now() + 25000 },
                { name: '사자', timestamp: Date.now() + 30000 },
                { name: '호랑이', timestamp: Date.now() + 35000 },
                { name: '코끼리', timestamp: Date.now() + 40000 },
                { name: '기린', timestamp: Date.now() + 45000 }
            ];
            
            window.recordedAnimals = window.animals;
            window.uniqueAnimals = new Set(window.animals.map(a => a.name));
            
            // Set timer to 5 seconds for quick test
            window.timeRemaining = 5;
            document.getElementById('timer').textContent = '5';
            
            console.log('Test data injected, timer set to 5 seconds');
        }, 3000);
    });
    
    await page.waitForTimeout(4000);
    
    console.log('2. Monitoring for test completion...');
    
    // Monitor test completion
    const checkCompletion = setInterval(async () => {
        const status = await page.evaluate(() => {
            return {
                timeRemaining: window.timeRemaining,
                testScreenActive: document.getElementById('testScreen').classList.contains('active'),
                resultsDisplay: window.getComputedStyle(document.getElementById('resultsSection')).display,
                resultsContent: document.getElementById('resultsSection').innerHTML.substring(0, 100)
            };
        });
        console.log('Status:', status);
    }, 1000);
    
    // Wait for test to complete
    await page.waitForTimeout(10000);
    clearInterval(checkCompletion);
    
    console.log('3. Test should be complete. Checking results section...');
    
    // Check results section in detail
    const resultsCheck = await page.evaluate(() => {
        const resultsSection = document.getElementById('resultsSection');
        const testScreen = document.getElementById('testScreen');
        
        // Log function existence
        console.log('showResults exists:', typeof window.showResults);
        console.log('analyzeWithCFTSCORING exists:', typeof window.analyzeWithCFTSCORING);
        
        // Try to find where stopTest calls showResults
        const stopTestCode = window.stopTest ? window.stopTest.toString() : 'stopTest not found';
        console.log('stopTest function code:', stopTestCode);
        
        return {
            resultsSection: {
                exists: !!resultsSection,
                display: window.getComputedStyle(resultsSection).display,
                style: resultsSection.getAttribute('style'),
                hasContent: resultsSection.innerHTML.length > 0,
                contentPreview: resultsSection.innerHTML.substring(0, 200)
            },
            testScreen: {
                active: testScreen.classList.contains('active'),
                display: window.getComputedStyle(testScreen).display
            },
            functions: {
                showResults: typeof window.showResults === 'function',
                analyzeWithCFTSCORING: typeof window.analyzeWithCFTSCORING === 'function',
                stopTest: typeof window.stopTest === 'function'
            }
        };
    });
    
    console.log('Results check:', JSON.stringify(resultsCheck, null, 2));
    
    console.log('4. Manually calling showResults...');
    
    // Try to manually call showResults
    const manualShowResults = await page.evaluate(() => {
        try {
            if (typeof window.showResults === 'function') {
                window.showResults();
                console.log('showResults called manually');
                
                // Check result after calling
                const resultsSection = document.getElementById('resultsSection');
                return {
                    success: true,
                    display: window.getComputedStyle(resultsSection).display,
                    hasContent: resultsSection.innerHTML.length > 0
                };
            }
            return { success: false, error: 'showResults not found' };
        } catch (error) {
            return { success: false, error: error.toString() };
        }
    });
    
    console.log('Manual showResults result:', manualShowResults);
    
    console.log('5. Taking screenshots...');
    
    // Take screenshots
    await page.screenshot({ path: 'test-full-page.png', fullPage: true });
    
    // Scroll to results section
    await page.evaluate(() => {
        document.getElementById('resultsSection').scrollIntoView();
    });
    await page.screenshot({ path: 'test-results-section.png' });
    
    console.log('6. Checking for CFTSCORING interference...');
    
    // Check if CFTSCORING is hiding results
    const cftCheck = await page.evaluate(() => {
        // Listen for any changes to results section
        const resultsSection = document.getElementById('resultsSection');
        let changeDetected = false;
        
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    console.log('Results section style changed:', resultsSection.style.display);
                    changeDetected = true;
                }
            });
        });
        
        observer.observe(resultsSection, { attributes: true });
        
        // Try calling analyzeWithCFTSCORING
        if (typeof window.analyzeWithCFTSCORING === 'function') {
            console.log('Calling analyzeWithCFTSCORING...');
            window.analyzeWithCFTSCORING();
        }
        
        return new Promise((resolve) => {
            setTimeout(() => {
                observer.disconnect();
                resolve({
                    changeDetected,
                    finalDisplay: window.getComputedStyle(resultsSection).display
                });
            }, 2000);
        });
    });
    
    console.log('CFTSCORING check:', cftCheck);
    
    // Final screenshot
    await page.screenshot({ path: 'test-final-state.png', fullPage: true });
    
    console.log('\nTest complete. Check the screenshots for visual results.');
    console.log('Browser will remain open for manual inspection.');
    
    // Keep browser open
    await new Promise(() => {});
})();