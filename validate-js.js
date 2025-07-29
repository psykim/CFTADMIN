const fs = require('fs');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('/Users/kwk/development/CFTADMIN/animal-fluency-test-v6.html', 'utf8');

// script 태그 내용 추출
const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    
    // JavaScript 파일로 임시 저장
    fs.writeFileSync('/tmp/temp-script.js', scriptContent);
    
    console.log('JavaScript 내용을 /tmp/temp-script.js에 저장했습니다.');
    console.log('Node.js로 구문 검사를 실행합니다...');
    
    try {
        // Node.js에서 구문 검사 시도
        require('/tmp/temp-script.js');
        console.log('✅ JavaScript 구문이 올바릅니다.');
    } catch (error) {
        console.log('❌ JavaScript 구문 오류 발견:');
        console.log('Error:', error.message);
        
        if (error.stack) {
            // 스택 트레이스에서 라인 번호 추출
            const match = error.stack.match(/temp-script\.js:(\d+):(\d+)/);
            if (match) {
                const lineNum = parseInt(match[1]);
                const colNum = parseInt(match[2]);
                
                console.log(`\n오류 위치: Line ${lineNum}, Column ${colNum}`);
                
                // 해당 라인 주변 코드 표시
                const lines = scriptContent.split('\n');
                const start = Math.max(0, lineNum - 5);
                const end = Math.min(lines.length, lineNum + 5);
                
                console.log('\n문제가 있는 코드 주변:');
                for (let i = start; i < end; i++) {
                    const marker = i === lineNum - 1 ? '>>> ' : '    ';
                    console.log(`${marker}${i + 1}: ${lines[i]}`);
                }
            }
        }
    }
} else {
    console.log('script 태그를 찾을 수 없습니다.');
}