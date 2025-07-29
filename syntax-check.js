const fs = require('fs');

// HTML 파일 읽기
const htmlContent = fs.readFileSync('/Users/kwk/development/CFTADMIN/animal-fluency-test-v6.html', 'utf8');

// script 태그 내용 추출
const scriptMatches = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);

if (scriptMatches) {
    scriptMatches.forEach((script, index) => {
        console.log(`\n=== Script ${index + 1} ===`);
        
        // script 태그 제거하고 내용만 추출
        const scriptContent = script.replace(/<\/?script[^>]*>/gi, '');
        
        // await 사용 위치 찾기
        const lines = scriptContent.split('\n');
        
        lines.forEach((line, lineNum) => {
            if (line.includes('await')) {
                console.log(`Line ${lineNum + 1}: ${line.trim()}`);
                
                // 해당 라인이 async 함수 안에 있는지 확인 (간단한 검사)
                let contextStart = Math.max(0, lineNum - 10);
                let contextEnd = Math.min(lines.length, lineNum + 10);
                
                let hasAsyncFunction = false;
                for (let i = contextStart; i < lineNum; i++) {
                    if (lines[i].includes('async function') || lines[i].includes('async ()') || lines[i].includes('async (')) {
                        hasAsyncFunction = true;
                        break;
                    }
                }
                
                if (!hasAsyncFunction) {
                    console.log(`  ⚠️  POTENTIAL ERROR: await not in async context`);
                    console.log(`  Context (lines ${contextStart + 1}-${contextEnd + 1}):`);
                    for (let i = contextStart; i <= Math.min(contextEnd, lineNum + 3); i++) {
                        const marker = i === lineNum ? '>>> ' : '    ';
                        console.log(`  ${marker}${i + 1}: ${lines[i]}`);
                    }
                }
            }
        });
    });
} else {
    console.log('No script tags found');
}