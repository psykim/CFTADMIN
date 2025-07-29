const { chromium } = require('playwright');
const path = require('path');

async function testAnimalFluency() {
    const browser = await chromium.launch({
        headless: false,
        devtools: true
    });
    
    const context = await browser.newContext({
        permissions: ['microphone']
    });
    
    const page = await context.newPage();
    
    // Enable console logging
    page.on('console', msg => {
        console.log(`[CONSOLE ${msg.type()}]:`, msg.text());
    });
    
    page.on('pageerror', error => {
        console.error('[PAGE ERROR]:', error);
    });
    
    // Navigate to the file
    const filePath = `file://${path.resolve(__dirname, 'animal-fluency-test-v22.html')}`;
    console.log('Navigating to:', filePath);
    await page.goto(filePath);
    
    // Wait for page to load
    await page.waitForTimeout(1000);
    
    // Click 시작하기 button
    console.log('Clicking 시작하기...');
    await page.click('button:has-text("시작하기")');
    
    // Wait for practice phase
    await page.waitForTimeout(2000);
    
    // Check if practice started
    const practiceVisible = await page.isVisible('text=/연습.*남은 시간/');
    console.log('Practice visible:', practiceVisible);
    
    // Wait for practice to complete (10 seconds)
    console.log('Waiting for practice phase to complete...');
    await page.waitForTimeout(11000);
    
    // Check if main test started
    const mainTestVisible = await page.isVisible('text=/본 검사.*남은 시간/');
    console.log('Main test visible:', mainTestVisible);
    
    // Type some animals during the test
    console.log('Typing animals...');
    await page.keyboard.type('개');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    await page.keyboard.type('고양이');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    await page.keyboard.type('호랑이');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    await page.keyboard.type('사자');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    await page.keyboard.type('코끼리');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    
    // Wait for test to complete
    console.log('Waiting for test to complete (60 seconds)...');
    
    // Check every 5 seconds for completion
    for (let i = 0; i < 12; i++) {
        await page.waitForTimeout(5000);
        
        // Check if results section is visible
        const resultsVisible = await page.isVisible('#resultsSection');
        console.log(`[${i * 5 + 5}s] Results section visible:`, resultsVisible);
        
        if (resultsVisible) {
            console.log('Results section became visible!');
            break;
        }
        
        // Check for "결과를 확인해 주세요" in console
        const pageContent = await page.content();
        if (pageContent.includes('결과를 확인해 주세요')) {
            console.log('Found "결과를 확인해 주세요" in page content');
        }
    }
    
    // After test completion, check various elements
    console.log('\n=== CHECKING PAGE STATE ===');
    
    // Check resultsSection
    const resultsSection = await page.evaluate(() => {
        const elem = document.getElementById('resultsSection');
        return {
            exists: !!elem,
            display: elem ? window.getComputedStyle(elem).display : null,
            visibility: elem ? window.getComputedStyle(elem).visibility : null,
            innerHTML: elem ? elem.innerHTML.substring(0, 200) : null,
            offsetHeight: elem ? elem.offsetHeight : null
        };
    });
    console.log('resultsSection:', resultsSection);
    
    // Check testPage
    const testPage = await page.evaluate(() => {
        const elem = document.getElementById('testPage');
        return {
            exists: !!elem,
            display: elem ? window.getComputedStyle(elem).display : null,
            classList: elem ? Array.from(elem.classList) : null
        };
    });
    console.log('testPage:', testPage);
    
    // Check for cftscoring-results
    const cftscoringResults = await page.evaluate(() => {
        const elem = document.querySelector('#cftscoring-results');
        return {
            exists: !!elem,
            display: elem ? window.getComputedStyle(elem).display : null
        };
    });
    console.log('cftscoring-results:', cftscoringResults);
    
    // Check animals array
    const animalsData = await page.evaluate(() => {
        return {
            animals: window.animals || [],
            animalsLength: window.animals ? window.animals.length : 0
        };
    });
    console.log('Animals data:', animalsData);
    
    // Try to manually show results
    console.log('\n=== TRYING TO MANUALLY SHOW RESULTS ===');
    await page.evaluate(() => {
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            resultsSection.style.visibility = 'visible';
            resultsSection.style.opacity = '1';
            console.log('Manually set resultsSection to visible');
        }
    });
    
    // Take screenshots
    console.log('\n=== TAKING SCREENSHOTS ===');
    await page.screenshot({ path: 'test-state-1.png', fullPage: true });
    console.log('Screenshot saved: test-state-1.png');
    
    // Open console and take screenshot
    await page.keyboard.press('F12');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-state-console.png', fullPage: true });
    console.log('Screenshot saved: test-state-console.png');
    
    // Check for any error overlays or modals
    const overlays = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        const visibleOverlays = [];
        allElements.forEach(elem => {
            const style = window.getComputedStyle(elem);
            if (style.position === 'fixed' || style.position === 'absolute') {
                if (style.display !== 'none' && style.visibility !== 'hidden') {
                    visibleOverlays.push({
                        tagName: elem.tagName,
                        id: elem.id,
                        className: elem.className,
                        innerText: elem.innerText ? elem.innerText.substring(0, 100) : ''
                    });
                }
            }
        });
        return visibleOverlays;
    });
    console.log('\nVisible overlays/modals:', overlays);
    
    // Wait a bit more
    await page.waitForTimeout(5000);
    
    console.log('\nTest completed. Browser will remain open for manual inspection.');
    
    // Keep browser open for manual inspection
    await page.waitForTimeout(300000); // 5 minutes
    
    await browser.close();
}

// Run the test
testAnimalFluency().catch(console.error);