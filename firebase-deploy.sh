#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 춘천탱고 마케팅 사이트 → Firebase 배포 (사이트: chuncheon-tango)
# 실행:  cd KCCTF-website && bash firebase-deploy.sh
# 전제:  firebase CLI 로그인 상태 (EventLink 배포하던 그 계정)
# ─────────────────────────────────────────────────────────────
set -uo pipefail
cd /Users/uedutainment_dev/Dev/KCCTF/KCCTF-website || { echo "✗ 폴더 못 찾음"; exit 1; }

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
echo "✅ 4/4  배포 끝 — https://chuncheon-tango.web.app 에서 새 티저 확인"
echo "   확인되면 다음: Firebase 콘솔에서 kcctf.org를 이 사이트로 연결 (Chrome으로 같이)"
