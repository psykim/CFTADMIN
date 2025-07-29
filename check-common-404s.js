const { chromium } = require('playwright');
const path = require('path');

async function checkCommon404s() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const requests404 = [];
    
    // Monitor for 404s
    page.on('response', response => {
        if (response.status() === 404) {
            requests404.push({
                url: response.url(),
                status: response.status(),
                initiator: response.request().frame().url()
            });
            console.log(`❌ 404 FOUND: ${response.url()}`);
        }
    });

    try {
        const filePath = path.resolve('/Users/kwk/development/CFTADMIN/animal-fluency-test-v16.html');
        console.log('Loading page...');
        
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle' });
        
        console.log('Testing common 404-causing requests...');
        
        // Test 1: Try to fetch favicon.ico
        try {
            await page.evaluate(() => {
                return fetch('/favicon.ico').catch(e => console.log('Favicon fetch failed:', e));
            });
        } catch (e) {
            console.log('Favicon test completed');
        }
        
        // Test 2: Try to fetch robots.txt
        try {
            await page.evaluate(() => {
                return fetch('/robots.txt').catch(e => console.log('Robots.txt fetch failed:', e));
            });
        } catch (e) {
            console.log('Robots.txt test completed');
        }
        
        // Test 3: Try to fetch manifest.json
        try {
            await page.evaluate(() => {
                return fetch('/manifest.json').catch(e => console.log('Manifest fetch failed:', e));
            });
        } catch (e) {
            console.log('Manifest test completed');
        }
        
        // Test 4: Check if there are any external scripts or links being loaded
        const externalResources = await page.evaluate(() => {
            const resources = [];
            
            // Check scripts
            document.querySelectorAll('script[src]').forEach(script => {
                if (script.src && !script.src.startsWith('data:')) {
                    resources.push({ type: 'script', src: script.src });
                }
            });
            
            // Check links (stylesheets, icons, etc.)
            document.querySelectorAll('link[href]').forEach(link => {
                if (link.href && !link.href.startsWith('data:') && !link.href.startsWith('blob:')) {
                    resources.push({ type: 'link', href: link.href, rel: link.rel });
                }
            });
            
            // Check images
            document.querySelectorAll('img[src]').forEach(img => {
                if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('blob:')) {
                    resources.push({ type: 'img', src: img.src });
                }
            });
            
            return resources;
        });
        
        console.log('\n=== EXTERNAL RESOURCES CHECK ===');
        if (externalResources.length > 0) {
            console.log('Found external resources:');
            externalResources.forEach((resource, index) => {
                console.log(`${index + 1}. ${resource.type}: ${resource.src || resource.href}`);
                if (resource.rel) console.log(`   rel: ${resource.rel}`);
            });
        } else {
            console.log('✅ No external resources found - all resources are inline or data URIs');
        }
        
        // Wait a bit more for any async requests
        await page.waitForTimeout(3000);
        
        console.log('\n=== FINAL 404 ANALYSIS ===');
        if (requests404.length > 0) {
            console.log(`❌ Found ${requests404.length} 404 errors:`);
            requests404.forEach((req, index) => {
                console.log(`${index + 1}. ${req.url} (initiated from: ${req.initiator})`);
            });
        } else {
            console.log('✅ NO 404 ERRORS DETECTED!');
        }
        
        // Take a screenshot
        await page.screenshot({ 
            path: '/Users/kwk/development/CFTADMIN/final-404-check.png',
            fullPage: true 
        });
        
    } catch (error) {
        console.error('Error during 404 check:', error);
    } finally {
        await browser.close();
    }
}

checkCommon404s().catch(console.error);