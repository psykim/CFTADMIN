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
    
    // Enable detailed console logging
    page.on('console', msg => {
        console.log(`[${msg.type()}] ${msg.text()}`);
    });
    
    // Navigate to the file
    const filePath = 'file://' + path.resolve('/Users/kwk/development/CFTADMIN/animal-fluency-test-v20.html');
    await page.goto(filePath);
    
    console.log('=== TEST STARTING ===');
    
    // Start test
    await page.click('#manualStartBtn');
    await page.waitForTimeout(5000); // Wait for instructions
    
    // Inject test animals and trigger stopTest directly
    const testResult = await page.evaluate(() => {
        // Add test animals
        window.animals = [
            { name: '개', timestamp: Date.now() - 50000 },
            { name: '고양이', timestamp: Date.now() - 45000 },
            { name: '소', timestamp: Date.now() - 40000 },
            { name: '말', timestamp: Date.now() - 35000 },
            { name: '돼지', timestamp: Date.now() - 30000 },
            { name: '토끼', timestamp: Date.now() - 25000 },
            { name: '사자', timestamp: Date.now() - 20000 },
            { name: '호랑이', timestamp: Date.now() - 15000 },
            { name: '코끼리', timestamp: Date.now() - 10000 },
            { name: '기린', timestamp: Date.now() - 5000 }
        ];
        
        window.recordedAnimals = window.animals;
        window.uniqueAnimals = new Set(window.animals.map(a => a.name));
        
        console.log('Test animals added:', window.animals.length);
        
        // Check initial state
        const initialState = {
            resultsDisplay: window.getComputedStyle(document.getElementById('resultsSection')).display,
            testScreenActive: document.getElementById('testScreen').classList.contains('active')
        };
        
        console.log('Initial state:', initialState);
        
        // Call stopTest directly
        console.log('Calling stopTest()...');
        if (typeof window.stopTest === 'function') {
            window.stopTest();
            return { success: true, message: 'stopTest called' };
        } else {
            return { success: false, message: 'stopTest not found' };
        }
    });
    
    console.log('stopTest result:', testResult);
    
    // Wait for voice messages and transitions
    await page.waitForTimeout(5000);
    
    // Check state after stopTest
    const afterStopState = await page.evaluate(() => {
        const resultsSection = document.getElementById('resultsSection');
        const testScreen = document.getElementById('testScreen');
        
        return {
            results: {
                display: window.getComputedStyle(resultsSection).display,
                visibility: window.getComputedStyle(resultsSection).visibility,
                hasContent: resultsSection.innerHTML.length > 100,
                contentLength: resultsSection.innerHTML.length
            },
            testScreen: {
                active: testScreen.classList.contains('active'),
                display: window.getComputedStyle(testScreen).display
            }
        };
    });
    
    console.log('State after stopTest:', JSON.stringify(afterStopState, null, 2));
    
    // Take screenshot
    await page.screenshot({ path: 'test-after-stoptest.png', fullPage: true });
    
    // Wait for CFTSCORING analysis
    console.log('Waiting for CFTSCORING analysis...');
    await page.waitForTimeout(5000);
    
    // Check final state
    const finalState = await page.evaluate(() => {
        const resultsSection = document.getElementById('resultsSection');
        
        // Check if CFTSCORING opened
        const cftWindows = Array.from(document.querySelectorAll('iframe')).filter(
            iframe => iframe.src && iframe.src.includes('CFTSCORING')
        );
        
        // Check for any popup windows
        const hasPopup = window.cftScoringWindow && !window.cftScoringWindow.closed;
        
        return {
            results: {
                display: window.getComputedStyle(resultsSection).display,
                visibility: window.getComputedStyle(resultsSection).visibility,
                position: resultsSection.getBoundingClientRect()
            },
            cftScoring: {
                iframesFound: cftWindows.length,
                popupOpen: hasPopup
            }
        };
    });
    
    console.log('Final state:', JSON.stringify(finalState, null, 2));
    
    // Take final screenshot
    await page.screenshot({ path: 'test-final-with-cft.png', fullPage: true });
    
    // Try to scroll to results
    await page.evaluate(() => {
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results-scrolled.png' });
    
    console.log('\n=== TEST COMPLETE ===');
    console.log('Check screenshots:');
    console.log('- test-after-stoptest.png');
    console.log('- test-final-with-cft.png');
    console.log('- test-results-scrolled.png');
    
    // Keep browser open
    await new Promise(() => {});
})();