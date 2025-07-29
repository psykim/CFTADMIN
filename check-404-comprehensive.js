const { chromium } = require('playwright');
const path = require('path');

async function check404Errors() {
    const browser = await chromium.launch({ 
        headless: false,
        devtools: true // Open dev tools to see network tab
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Track all network requests
    const networkRequests = [];
    const failedRequests = [];
    
    page.on('request', request => {
        networkRequests.push({
            url: request.url(),
            method: request.method(),
            resourceType: request.resourceType(),
            timestamp: Date.now()
        });
        console.log(`REQUEST: ${request.method()} ${request.url()} (${request.resourceType()})`);
    });

    page.on('response', response => {
        const status = response.status();
        const url = response.url();
        
        console.log(`RESPONSE: ${status} ${url}`);
        
        if (status === 404) {
            failedRequests.push({
                url: url,
                status: status,
                statusText: response.statusText(),
                headers: response.headers(),
                timestamp: Date.now()
            });
            console.log(`❌ 404 ERROR: ${url}`);
        }
    });

    page.on('requestfailed', request => {
        const failure = request.failure();
        failedRequests.push({
            url: request.url(),
            error: failure.errorText,
            timestamp: Date.now()
        });
        console.log(`❌ REQUEST FAILED: ${request.url()} - ${failure.errorText}`);
    });

    try {
        console.log('Loading animal-fluency-test-v16.html...');
        const filePath = path.resolve('/Users/kwk/development/CFTADMIN/animal-fluency-test-v16.html');
        
        // Load the page
        await page.goto(`file://${filePath}`, { 
            waitUntil: 'networkidle',
            timeout: 30000 
        });

        console.log('Page loaded, waiting for any additional requests...');
        
        // Wait a bit more to catch any delayed requests
        await page.waitForTimeout(5000);
        
        // Try to trigger common browser requests
        console.log('Checking for favicon and other standard requests...');
        
        // Force favicon request
        await page.evaluate(() => {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = 'favicon.ico';
            document.head.appendChild(link);
        });
        
        // Check for manifest.json
        await page.evaluate(() => {
            const link = document.createElement('link');
            link.rel = 'manifest';
            link.href = 'manifest.json';
            document.head.appendChild(link);
        });
        
        // Wait for these requests to complete
        await page.waitForTimeout(3000);
        
        // Take screenshot of network tab
        console.log('Taking screenshot...');
        await page.screenshot({ 
            path: '/Users/kwk/development/CFTADMIN/network-404-analysis.png',
            fullPage: true 
        });
        
        // Detailed analysis
        console.log('\n=== NETWORK ANALYSIS RESULTS ===');
        console.log(`Total requests made: ${networkRequests.length}`);
        console.log(`Failed requests (404/errors): ${failedRequests.length}`);
        
        if (failedRequests.length > 0) {
            console.log('\n❌ FAILED REQUESTS FOUND:');
            failedRequests.forEach((req, index) => {
                console.log(`\n${index + 1}. ${req.url}`);
                if (req.status) {
                    console.log(`   Status: ${req.status} ${req.statusText}`);
                    console.log(`   Headers: ${JSON.stringify(req.headers, null, 2)}`);
                }
                if (req.error) {
                    console.log(`   Error: ${req.error}`);
                }
            });
        } else {
            console.log('\n✅ NO 404 ERRORS FOUND!');
        }
        
        console.log('\n=== ALL NETWORK REQUESTS ===');
        networkRequests.forEach((req, index) => {
            console.log(`${index + 1}. [${req.method}] ${req.url} (${req.resourceType})`);
        });
        
        // Save detailed report
        const report = {
            timestamp: new Date().toISOString(),
            totalRequests: networkRequests.length,
            failedRequests: failedRequests.length,
            allRequests: networkRequests,
            failures: failedRequests
        };
        
        require('fs').writeFileSync(
            '/Users/kwk/development/CFTADMIN/404-analysis-report.json',
            JSON.stringify(report, null, 2)
        );
        
        console.log('\nReport saved to 404-analysis-report.json');
        console.log('Screenshot saved to network-404-analysis.png');
        
    } catch (error) {
        console.error('Error during analysis:', error);
    } finally {
        // Close browser after analysis
        console.log('\nAnalysis complete. Closing browser...');
        await browser.close();
    }
}

check404Errors().catch(console.error);