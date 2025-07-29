#!/bin/bash

# 자동 커밋 및 푸시 스크립트
# 사용법: ./auto-push.sh "커밋 메시지"

if [ $# -eq 0 ]; then
    echo "사용법: ./auto-push.sh \"커밋 메시지\""
    exit 1
fi

echo "=== 자동 커밋 및 푸시 시작 ==="

# 모든 변경사항 추가
git add .

# 커밋
git commit -m "$1

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 푸시
git push origin main

echo "=== 완료: GitHub에 업로드됨 ==="

# GitHub Pages 링크 표시
echo ""
echo "📋 GitHub 링크들:"
echo "- V17: https://raw.githubusercontent.com/psykim/CFTLADMIN/main/animal-fluency-test-v17.html"
echo "- 인덱스: https://raw.githubusercontent.com/psykim/CFTLADMIN/main/index.html"