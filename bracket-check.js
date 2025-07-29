const fs = require('fs');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('/Users/kwk/development/CFTADMIN/animal-fluency-test-v6.html', 'utf8');

// script 태그 내용 추출
const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/);

if (scriptMatch) {
    const scriptContent = scriptMatch[1];
    const lines = scriptContent.split('\n');
    
    let braceStack = [];
    let parenStack = [];
    let bracketStack = [];
    
    console.log('중괄호, 괄호, 대괄호 매칭 검사...\n');
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum];
        
        for (let charPos = 0; charPos < line.length; charPos++) {
            const char = line[charPos];
            const position = `Line ${lineNum + 1}:${charPos + 1}`;
            
            switch (char) {
                case '{':
                    braceStack.push({ line: lineNum + 1, char: charPos + 1, context: line.trim() });
                    break;
                case '}':
                    if (braceStack.length === 0) {
                        console.log(`❌ 매칭되지 않는 '}' 발견: ${position}`);
                        console.log(`   Context: ${line.trim()}`);
                        
                        // 주변 라인들 표시
                        console.log('\n주변 코드:');
                        for (let i = Math.max(0, lineNum - 3); i <= Math.min(lines.length - 1, lineNum + 3); i++) {
                            const marker = i === lineNum ? '>>> ' : '    ';
                            console.log(`${marker}${i + 1}: ${lines[i]}`);
                        }
                        process.exit(1);
                    } else {
                        braceStack.pop();
                    }
                    break;
                case '(':
                    parenStack.push({ line: lineNum + 1, char: charPos + 1 });
                    break;
                case ')':
                    if (parenStack.length === 0) {
                        console.log(`❌ 매칭되지 않는 ')' 발견: ${position}`);
                        console.log(`   Context: ${line.trim()}`);
                    } else {
                        parenStack.pop();
                    }
                    break;
                case '[':
                    bracketStack.push({ line: lineNum + 1, char: charPos + 1 });
                    break;
                case ']':
                    if (bracketStack.length === 0) {
                        console.log(`❌ 매칭되지 않는 ']' 발견: ${position}`);
                        console.log(`   Context: ${line.trim()}`);
                    } else {
                        bracketStack.pop();
                    }
                    break;
            }
        }
        
        // 라인 1100 근처에서 상세 정보 출력
        if (lineNum >= 1100 && lineNum <= 1110) {
            console.log(`Line ${lineNum + 1}: ${line} (braces: ${braceStack.length})`);
        }
    }
    
    console.log('\n=== 최종 검사 결과 ===');
    
    if (braceStack.length > 0) {
        console.log('❌ 닫히지 않은 중괄호 {');
        braceStack.forEach((brace, index) => {
            console.log(`   ${index + 1}. Line ${brace.line}:${brace.char} - ${brace.context}`);
        });
    }
    
    if (parenStack.length > 0) {
        console.log('❌ 닫히지 않은 괄호 (');
        parenStack.forEach((paren, index) => {
            console.log(`   ${index + 1}. Line ${paren.line}:${paren.char}`);
        });
    }
    
    if (bracketStack.length > 0) {
        console.log('❌ 닫히지 않은 대괄호 [');
        bracketStack.forEach((bracket, index) => {
            console.log(`   ${index + 1}. Line ${bracket.line}:${bracket.char}`);
        });
    }
    
    if (braceStack.length === 0 && parenStack.length === 0 && bracketStack.length === 0) {
        console.log('✅ 모든 괄호가 올바르게 매칭됨');
    }
    
} else {
    console.log('script 태그를 찾을 수 없습니다.');
}