const { chromium } = require('playwright');
const path = require('path');

async function testUserInteraction404s() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const all404s = [];
    const allRequests = [];
    
    // Monitor ALL requests and responses
    page.on('request', request => {
        allRequests.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType()
        });
        console.log(`→ REQUEST: ${request.method()} ${request.url()}`);
    });

    page.on('response', response => {
        const status = response.status();
        console.log(`← RESPONSE: ${status} ${response.url()}`);
        
        if (status === 404) {
            all404s.push({
                url: response.url(),
                status: status,
                timestamp: new Date().toISOString()
            });
            console.log(`❌ 404 ERROR: ${response.url()}`);
        }
    });

    page.on('requestfailed', request => {
        console.log(`❌ REQUEST FAILED: ${request.url()} - ${request.failure().errorText}`);
    });

    try {
        const filePath = path.resolve('/Users/kwk/development/CFTADMIN/animal-fluency-test-v16.html');
        console.log('=== LOADING PAGE ===');
        
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
        
        console.log('\n=== SIMULATING USER INTERACTIONS ===');
        
        // Wait for page to be fully loaded
        await page.waitForTimeout(2000);
        
        // Check if there's a start button and click it
        try {
            const startButton = await page.locator('button:has-text("시작")').first();
            if (await startButton.isVisible()) {
                console.log('Clicking start button...');
                await startButton.click();
                await page.waitForTimeout(1000);
            }
        } catch (e) {
            console.log('No start button found or not clickable');
        }
        
        // Try clicking various buttons that might exist
        try {
            const buttons = await page.locator('button').all();
            console.log(`Found ${buttons.length} buttons on page`);
            
            for (let i = 0; i < Math.min(buttons.length, 5); i++) {
                try {
                    const button = buttons[i];
                    const buttonText = await button.textContent();
                    if (await button.isVisible() && await button.isEnabled()) {
                        console.log(`Clicking button: "${buttonText}"`);
                        await button.click();
                        await page.waitForTimeout(1000);
                    }
                } catch (e) {
                    console.log(`Couldn't click button ${i}: ${e.message}`);
                }
            }
        } catch (e) {
            console.log('Error during button interaction:', e.message);
        }
        
        // Try form interactions if any
        try {
            const inputs = await page.locator('input, textarea, select').all();
            console.log(`Found ${inputs.length} form elements`);
            
            for (let i = 0; i < Math.min(inputs.length, 3); i++) {
                try {
                    const input = inputs[i];
                    const inputType = await input.getAttribute('type');
                    if (await input.isVisible() && await input.isEnabled() && inputType !== 'hidden') {
                        console.log(`Interacting with input type: ${inputType}`);
                        await input.fill('test');
                        await page.waitForTimeout(500);
                    }
                } catch (e) {
                    console.log(`Couldn't interact with input ${i}: ${e.message}`);
                }
            }
        } catch (e) {
            console.log('Error during form interaction:', e.message);
        }
        
        // Wait for any delayed requests
        console.log('\nWaiting for any delayed requests...');
        await page.waitForTimeout(5000);
        
        // Check browser console for errors
        const consoleMessages = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleMessages.push({
                    type: msg.type(),
                    text: msg.text(),
                    timestamp: new Date().toISOString()
                });
                console.log(`CONSOLE ERROR: ${msg.text()}`);
            }
        });
        
        console.log('\n=== FINAL RESULTS ===');
        console.log(`Total requests made: ${allRequests.length}`);
        console.log(`404 errors found: ${all404s.length}`);
        console.log(`Console errors: ${consoleMessages.length}`);
        
        if (all404s.length > 0) {
            console.log('\n❌ 404 ERRORS FOUND:');
            all404s.forEach((error, index) => {
                console.log(`${index + 1}. ${error.url} at ${error.timestamp}`);
            });
        } else {
            console.log('\n✅ NO 404 ERRORS FOUND DURING INTERACTION!');
        }
        
        // Save comprehensive report
        const report = {
            testTimestamp: new Date().toISOString(),
            totalRequests: allRequests.length,
            requests404: all404s.length,
            consoleErrors: consoleMessages.length,
            allRequests: allRequests,
            errors404: all404s,
            consoleMessages: consoleMessages
        };
        
        require('fs').writeFileSync(
            '/Users/kwk/development/CFTADMIN/user-interaction-404-report.json',
            JSON.stringify(report, null, 2)
        );
        
        console.log('\nDetailed report saved to user-interaction-404-report.json');
        
    } catch (error) {
        console.error('Error during interaction test:', error);
    } finally {
        await browser.close();
    }
}

testUserInteraction404s().catch(console.error);