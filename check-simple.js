const fs = require('fs');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('/Users/kwk/development/CFTADMIN/animal-fluency-test-v6.html', 'utf8');

// script 태그 내용 추출
const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    
    // 간단한 문법 검사용 코드 생성 (window, document 등 제거)
    let simplifiedContent = scriptContent
        .replace(/window\./g, 'globalThis.')
        .replace(/document\./g, 'mockDocument.')
        .replace(/navigator\./g, 'mockNavigator.')
        .replace(/console\./g, 'mockConsole.')
        .replace(/setTimeout/g, 'mockSetTimeout')
        .replace(/setInterval/g, 'mockSetInterval')
        .replace(/clearInterval/g, 'mockClearInterval');
    
    // Mock 객체들 추가
    const mockCode = `
    const mockDocument = { 
        getElementById: () => ({}), 
        querySelector: () => ({}), 
        querySelectorAll: () => ([]),
        createElement: () => ({}),
        addEventListener: () => {}
    };
    const mockNavigator = { 
        mediaDevices: { getUserMedia: () => Promise.resolve({}) },
        userAgent: 'test'
    };
    const mockConsole = { log: () => {}, error: () => {} };
    const mockSetTimeout = (fn, delay) => {};
    const mockSetInterval = (fn, delay) => {};
    const mockClearInterval = (id) => {};
    const globalThis = { 
        speechSynthesis: { speak: () => {} },
        SpeechSynthesisUtterance: function() {},
        SpeechRecognition: function() {},
        webkitSpeechRecognition: function() {},
        AudioContext: function() {},
        webkitAudioContext: function() {},
        addEventListener: () => {}
    };
    
    ${simplifiedContent}
    `;
    
    fs.writeFileSync('/tmp/simplified-script.js', mockCode);
    
    try {
        require('/tmp/simplified-script.js');
        console.log('✅ JavaScript 구문이 올바릅니다.');
    } catch (error) {
        console.log('❌ JavaScript 구문 오류 발견:');
        console.log('Error:', error.message);
        
        if (error.stack) {
            const match = error.stack.match(/simplified-script\.js:(\d+):(\d+)/);
            if (match) {
                const lineNum = parseInt(match[1]);
                
                console.log(`\n오류 위치: Line ${lineNum}`);
                
                // 해당 라인 주변 코드 표시
                const lines = mockCode.split('\n');
                const start = Math.max(0, lineNum - 5);
                const end = Math.min(lines.length, lineNum + 5);
                
                console.log('\n문제가 있는 코드 주변:');
                for (let i = start; i < end; i++) {
                    const marker = i === lineNum - 1 ? '>>> ' : '    ';
                    console.log(`${marker}${i + 1}: ${lines[i]}`);
                }
                
                // 원본 script에서의 대략적인 위치 찾기
                if (lineNum > 20) { // mock 코드 라인들을 제외
                    const originalLine = lineNum - 20;
                    console.log(`\n원본 script에서 대략적인 위치: Line ${originalLine}`);
                }
            }
        }
    }
} else {
    console.log('script 태그를 찾을 수 없습니다.');
}