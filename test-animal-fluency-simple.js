// Simple test for animal fluency test
console.log('Testing Animal Fluency v22...');

// Start the test
document.getElementById('startButton').click();

// Wait and add test words
setTimeout(() => {
    // Add test words
    window.transcript = '개 고양이 토끼 사자 호랑이 코끼리 기린 원숭이 곰 여우';
    window.processTranscript();
    
    // End test after 2 seconds
    setTimeout(() => {
        window.endTest();
        
        // Check results after 1 second
        setTimeout(() => {
            const resultsSection = document.getElementById('resultsSection');
            console.log('Results display:', resultsSection.style.display);
            console.log('Results content length:', resultsSection.innerHTML.length);
            console.log('Results visible:', resultsSection.style.display !== 'none');
            
            // Take screenshot
            console.log('Test complete - check if results are visible');
        }, 1000);
    }, 2000);
}, 1000);