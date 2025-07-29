const { chromium } = require('playwright');
const path = require('path');

(async () => {
    console.log('Starting 404 error check for animal-fluency-test-v15.html...\n');
    
    const browser = await chromium.launch({ 
        headless: false,
        devtools: true 
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Arrays to store errors
    const consoleErrors = [];
    const networkErrors = [];
    
    // Listen for console messages
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push({
                text: msg.text(),
                location: msg.location(),
                args: msg.args()
            });
        }
    });
    
    // Listen for page errors
    page.on('pageerror', error => {
        consoleErrors.push({
            text: error.message,
            stack: error.stack
        });
    });
    
    // Listen for failed network requests
    page.on('requestfailed', request => {
        networkErrors.push({
            url: request.url(),
            failure: request.failure(),
            method: request.method(),
            resourceType: request.resourceType()
        });
    });
    
    // Also monitor all responses for 404s
    page.on('response', response => {
        if (response.status() === 404) {
            networkErrors.push({
                url: response.url(),
                status: 404,
                statusText: response.statusText(),
                method: response.request().method(),
                resourceType: response.request().resourceType()
            });
        }
    });
    
    try {
        // Navigate to the file
        const filePath = path.join(__dirname, 'animal-fluency-test-v15.html');
        await page.goto(`file://${filePath}`, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        // Wait a bit more to ensure all resources are loaded
        await page.waitForTimeout(3000);
        
        // Take screenshot
        await page.screenshot({ 
            path: 'v15-404-check.png',
            fullPage: true 
        });
        console.log('Screenshot saved as v15-404-check.png\n');
        
        // Report console errors
        if (consoleErrors.length > 0) {
            console.log('=== Console Errors Found ===');
            consoleErrors.forEach((error, index) => {
                console.log(`\nError ${index + 1}:`);
                console.log('Message:', error.text);
                if (error.location) {
                    console.log('Location:', error.location.url);
                    console.log('Line:', error.location.lineNumber);
                }
                if (error.stack) {
                    console.log('Stack:', error.stack);
                }
            });
        } else {
            console.log('No console errors found.');
        }
        
        // Report network errors (including 404s)
        if (networkErrors.length > 0) {
            console.log('\n=== Network Errors / 404s Found ===');
            networkErrors.forEach((error, index) => {
                console.log(`\nNetwork Error ${index + 1}:`);
                console.log('URL:', error.url);
                console.log('Status:', error.status || 'Failed');
                console.log('Resource Type:', error.resourceType);
                if (error.failure) {
                    console.log('Failure:', error.failure.errorText);
                }
                if (error.statusText) {
                    console.log('Status Text:', error.statusText);
                }
            });
        } else {
            console.log('\nNo network errors or 404s found.');
        }
        
        // Get all network requests for analysis
        console.log('\n=== All Network Requests ===');
        const requests = [];
        page.on('request', request => {
            requests.push({
                url: request.url(),
                method: request.method(),
                resourceType: request.resourceType()
            });
        });
        
        // Reload to capture all requests
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        
        if (requests.length > 0) {
            console.log(`Total requests made: ${requests.length}`);
            requests.forEach((req, index) => {
                if (req.url.includes('http')) {
                    console.log(`${index + 1}. [${req.resourceType}] ${req.method} ${req.url}`);
                }
            });
        }
        
        // Check for any specific 404 errors in the page content
        const pageContent = await page.content();
        if (pageContent.includes('404') || pageContent.includes('Not Found')) {
            console.log('\n=== Warning: "404" or "Not Found" text detected in page content ===');
        }
        
    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        // Keep browser open for manual inspection
        console.log('\n\nBrowser will remain open for manual inspection.');
        console.log('Check the Network tab in DevTools for more details.');
        console.log('Press Ctrl+C to close when done.');
        
        // Wait indefinitely
        await new Promise(() => {});
    }
})();