// Test script for animal-fluency-test-v22.html
// This script will simulate a complete test cycle and check results display

console.log('Starting Animal Fluency Test v22 verification...');

// Function to simulate a complete test
async function runCompleteTest() {
    // Check initial state
    console.log('Initial state check:');
    const startButton = document.getElementById('startButton');
    const testSection = document.getElementById('testSection');
    const resultsSection = document.getElementById('resultsSection');
    
    console.log('- Start button exists:', !!startButton);
    console.log('- Test section exists:', !!testSection);
    console.log('- Results section exists:', !!resultsSection);
    console.log('- Results section display:', resultsSection.style.display);
    
    // Start the test
    console.log('\nStarting test...');
    startButton.click();
    
    // Wait for test section to show
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('- Test section display after start:', testSection.style.display);
    
    // Add some test words
    console.log('\nAdding test words...');
    const testWords = ['개', '고양이', '토끼', '사자', '호랑이', '코끼리', '기린', '원숭이', '곰', '여우'];
    
    for (let i = 0; i < testWords.length; i++) {
        // Add word to transcript
        if (window.transcript) {
            window.transcript += (window.transcript ? ' ' : '') + testWords[i];
        }
        
        // Simulate word addition
        if (window.processTranscript) {
            window.processTranscript();
        }
        
        console.log(`Added word ${i + 1}: ${testWords[i]}`);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Check words display
    const wordsDisplay = document.getElementById('wordsDisplay');
    console.log('\nWords display content:', wordsDisplay ? wordsDisplay.textContent : 'Not found');
    
    // Wait for timer to complete (we'll speed it up for testing)
    console.log('\nWaiting for test to complete...');
    
    // Force end the test after a short delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Manually trigger test end
    if (window.endTest) {
        console.log('Manually ending test...');
        window.endTest();
    }
    
    // Wait for results to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check final state
    console.log('\nFinal state check:');
    console.log('- Test section display:', testSection.style.display);
    console.log('- Results section display:', resultsSection.style.display);
    console.log('- Results section has content:', resultsSection.innerHTML.length > 0);
    console.log('- Results section innerHTML length:', resultsSection.innerHTML.length);
    
    // Check specific result elements
    const totalWordsElement = document.querySelector('.result-item .result-value');
    const chartCanvas = document.querySelector('#resultsSection canvas');
    
    console.log('- Total words element exists:', !!totalWordsElement);
    console.log('- Total words value:', totalWordsElement ? totalWordsElement.textContent : 'Not found');
    console.log('- Chart canvas exists:', !!chartCanvas);
    
    // Log any errors
    if (window.lastError) {
        console.error('Last error:', window.lastError);
    }
    
    // Take screenshot after results should be visible
    console.log('\nTest complete. Results should be visible now.');
    
    // Additional debug info
    console.log('\nDebug info:');
    console.log('- Window.words array:', window.words);
    console.log('- Window.transcript:', window.transcript);
    console.log('- Body classes:', document.body.className);
    
    // Check if results are actually visible on screen
    const resultsRect = resultsSection.getBoundingClientRect();
    console.log('- Results section position:', {
        top: resultsRect.top,
        left: resultsRect.left,
        width: resultsRect.width,
        height: resultsRect.height,
        visible: resultsRect.width > 0 && resultsRect.height > 0
    });
}

// Run the test
runCompleteTest().then(() => {
    console.log('\nTest verification complete!');
}).catch(error => {
    console.error('Test failed:', error);
});