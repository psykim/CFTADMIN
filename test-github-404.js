const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testUrlFor404Errors(url, browser) {
    console.log(`\n=== Testing URL: ${url} ===`);
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Arrays to store network data
    const allRequests = [];
    const failedRequests = [];
    const errorMessages = [];
    
    // Monitor all network requests
    page.on('request', request => {
        allRequests.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType(),
            timestamp: new Date().toISOString()
        });
        console.log(`REQUEST: ${request.method()} ${request.url()}`);
    });
    
    // Monitor failed requests
    page.on('requestfailed', request => {
        const failureText = request.failure()?.errorText || 'Unknown error';
        failedRequests.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType(),
            error: failureText,
            timestamp: new Date().toISOString()
        });
        console.log(`FAILED REQUEST: ${request.method()} ${request.url()} - ${failureText}`);
    });
    
    // Monitor responses for status codes
    page.on('response', response => {
        if (response.status() >= 400) {
            failedRequests.push({
                url: response.url(),
                status: response.status(),
                statusText: response.statusText(),
                timestamp: new Date().toISOString()
            });
            console.log(`HTTP ERROR: ${response.status()} ${response.statusText()} - ${response.url()}`);
        }
    });
    
    // Monitor console errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errorMessages.push({
                type: 'console-error',
                text: msg.text(),
                timestamp: new Date().toISOString()
            });
            console.log(`CONSOLE ERROR: ${msg.text()}`);
        }
    });
    
    try {
        // Navigate to the URL
        console.log(`Navigating to: ${url}`);
        const response = await page.goto(url, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });
        
        console.log(`Main response status: ${response.status()}`);
        
        // Wait additional time to catch delayed requests
        console.log('Waiting 10 seconds for delayed requests...');
        await page.waitForTimeout(10000);
        
        // Take screenshot of the page
        const urlSafe = url.replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotPath = `/Users/kwk/development/CFTADMIN/screenshot_${urlSafe}.png`;
        await page.screenshot({ 
            path: screenshotPath, 
            fullPage: true 
        });
        console.log(`Screenshot saved: ${screenshotPath}`);
        
        // Try to open DevTools Network tab and take screenshot
        // Note: This is limited in headless mode, but we'll try
        await page.keyboard.press('F12');
        await page.waitForTimeout(2000);
        
        // Take screenshot of potential DevTools
        const devtoolsScreenshotPath = `/Users/kwk/development/CFTLADMIN/devtools_${urlSafe}.png`;
        await page.screenshot({ 
            path: devtoolsScreenshotPath, 
            fullPage: true 
        });
        console.log(`DevTools screenshot saved: ${devtoolsScreenshotPath}`);
        
    } catch (error) {
        console.error(`Error navigating to ${url}:`, error.message);
        errorMessages.push({
            type: 'navigation-error',
            text: error.message,
            timestamp: new Date().toISOString()
        });
    }
    
    await context.close();
    
    // Return results
    return {
        url,
        allRequests,
        failedRequests,
        errorMessages,
        totalRequests: allRequests.length,
        failedCount: failedRequests.length,
        has404Errors: failedRequests.some(req => req.status === 404)
    };
}

async function main() {
    const urls = [
        'https://raw.githubusercontent.com/psykim/cftladmin/main/test-404-minimal.html',
        'https://raw.githubusercontent.com/psykim/cftladmin/main/animal-fluency-test-v16.html'
    ];
    
    console.log('Starting 404 error detection test...');
    console.log('URLs to test:');
    urls.forEach((url, index) => console.log(`${index + 1}. ${url}`));
    
    const browser = await chromium.launch({ 
        headless: false, // Run with visible browser to see network tab
        devtools: true   // Open with DevTools
    });
    
    const results = [];
    
    for (const url of urls) {
        const result = await testUrlFor404Errors(url, browser);
        results.push(result);
        
        // Wait between tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    await browser.close();
    
    // Generate detailed report
    console.log('\n' + '='.repeat(80));
    console.log('DETAILED 404 ERROR REPORT');
    console.log('='.repeat(80));
    
    results.forEach((result, index) => {
        console.log(`\n${index + 1}. URL: ${result.url}`);
        console.log(`   Total Requests: ${result.totalRequests}`);
        console.log(`   Failed Requests: ${result.failedCount}`);
        console.log(`   Has 404 Errors: ${result.has404Errors ? 'YES' : 'NO'}`);
        
        if (result.failedRequests.length > 0) {
            console.log('\n   FAILED REQUESTS:');
            result.failedRequests.forEach((req, reqIndex) => {
                console.log(`   ${reqIndex + 1}. ${req.url}`);
                if (req.status) {
                    console.log(`      Status: ${req.status} ${req.statusText || ''}`);
                }
                if (req.error) {
                    console.log(`      Error: ${req.error}`);
                }
                console.log(`      Resource Type: ${req.resourceType || 'unknown'}`);
                console.log(`      Timestamp: ${req.timestamp}`);
                console.log('');
            });
        }
        
        if (result.errorMessages.length > 0) {
            console.log('\n   CONSOLE ERRORS:');
            result.errorMessages.forEach((error, errorIndex) => {
                console.log(`   ${errorIndex + 1}. [${error.type}] ${error.text}`);
                console.log(`      Timestamp: ${error.timestamp}`);
            });
        }
        
        console.log('\n   ALL REQUESTS:');
        result.allRequests.forEach((req, reqIndex) => {
            console.log(`   ${reqIndex + 1}. ${req.method} ${req.url} [${req.resourceType}]`);
        });
    });
    
    // Save results to JSON file
    const reportPath = '/Users/kwk/development/CFTLADMIN/404-test-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\nDetailed report saved to: ${reportPath}`);
    
    // Summary
    const total404s = results.reduce((sum, result) => 
        sum + result.failedRequests.filter(req => req.status === 404).length, 0);
    
    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total URLs tested: ${results.length}`);
    console.log(`Total 404 errors found: ${total404s}`);
    console.log(`URLs with 404 errors: ${results.filter(r => r.has404Errors).length}`);
    
    if (total404s > 0) {
        console.log('\n404 ERRORS DETECTED!');
        results.forEach(result => {
            const url404s = result.failedRequests.filter(req => req.status === 404);
            if (url404s.length > 0) {
                console.log(`\n${result.url}:`);
                url404s.forEach(req => {
                    console.log(`  - 404: ${req.url}`);
                });
            }
        });
    } else {
        console.log('\nNo 404 errors detected.');
    }
}

main().catch(console.error);