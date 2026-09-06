#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 춘천탱고 마케팅 사이트 → Firebase 배포 (사이트: chuncheon-tango)
# 실행:  cd KCCTF-website && bash firebase-deploy.sh
# 전제:  firebase CLI 로그인 상태 (EventLink 배포하던 그 계정)
# ─────────────────────────────────────────────────────────────
set -uo pipefail
cd /Users/uedutainment_dev/Dev/KCCTF/KCCTF-website || { echo "✗ 폴더 못 찾음"; exit 1; }

# ── 가드: dev 서버·다른 배포와 같은 .next를 동시에 쓰면 번들이 오염돼 라이브가 500이 남 (2026-09-06 장애 2회 원인)
if pgrep -f "next dev" >/dev/null 2>&1; then
  echo "✗ next dev 실행 중 — 개발 서버를 끄고 다시 실행하세요 (같은 .next 폴더를 써서 배포 번들이 오염됨)"; exit 1
fi
if pgrep -f "firebase deploy" >/dev/null 2>&1; then
  echo "✗ 다른 firebase deploy가 이미 실행 중 — 끝난 뒤 다시 실행하세요"; exit 1
fi

echo "▶ 0/4  firebase 로그인 확인"
firebase projects:list >/dev/null 2>&1 || { echo "  ✗ firebase 로그인 필요 →  firebase login  먼저 실행"; exit 1; }

echo "▶ 1/4  web frameworks 활성화(한 번만 필요, 이미면 무시됨)"
firebase experiments:enable webframeworks || true

echo "▶ 2/4  호스팅 사이트 생성: chuncheon-tango"
firebase hosting:sites:create chuncheon-tango \
  || echo "  (이미 존재하거나 이름이 사용 중일 수 있음 — 콘솔에서 확인. 이미 있으면 계속 진행됨)"

echo "▶ 3/4  배포 (Next.js → web frameworks, Cloud Functions)"
echo "  ※ .env.local의 티저 플래그(false)로 빌드돼서 티저 상태로 올라감"
firebase deploy --only hosting --project kcctf-5047d \
  || { echo "  ✗ 배포 실패 — 위 메시지 확인 (사이트 이름·권한·빌드)"; exit 1; }

echo ""
echo "▶ 4/4  배포 후 헬스체크 (SSR 콜드스타트 감안 최대 90초 재시도)"
ok=0
for i in $(seq 1 9); do
  sleep 10
  ko=$(curl -s -o /dev/null -w "%{http_code}" "https://kcctf.org/ko?hc=$(date +%s)")
  en=$(curl -s -o /dev/null -w "%{http_code}" "https://kcctf.org/en?hc=$(date +%s)")
  echo "  시도 $i: /ko=$ko /en=$en"
  if [ "$ko" = "200" ] && [ "$en" = "200" ]; then ok=1; break; fi
done
if [ "$ok" = "1" ]; then
  echo "✅ 배포 완료 + 라이브 200 확인 — https://kcctf.org"
else
  echo "🚨 배포는 끝났지만 라이브가 200이 아님 — 손상 번들 가능성!"
  echo "   복구:  rm -rf .next .firebase && bash firebase-deploy.sh  (next dev 반드시 끈 상태에서)"
  exit 1
fi
