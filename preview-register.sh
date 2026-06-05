#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 운영진 테스트용 — 등록(예약) 켠 "비공개 미리보기" 배포
# 라이브 kcctf.org 는 그대로 티저(영향 0). 끝나면 나오는 URL을 운영진에 공유.
# 실행:  cd KCCTF-website && bash preview-register.sh
# ─────────────────────────────────────────────────────────────
set -uo pipefail
cd /Users/uedutainment_dev/Dev/KCCTF/KCCTF-website || { echo "✗ 폴더 못 찾음"; exit 1; }

# 어떤 경우에도 .env.local 원복 보장
restore() { [ -f .env.local.backup ] && mv -f .env.local.backup .env.local; }
trap restore EXIT

echo "▶ 1/3  .env.local 백업 + 미리보기용 플래그 ON (등록·티켓)"
cp .env.local .env.local.backup
grep -vE '^NEXT_PUBLIC_(REGISTRATION_OPEN|SHOW_TICKETS)=' .env.local.backup > .env.local
printf 'NEXT_PUBLIC_REGISTRATION_OPEN=true\nNEXT_PUBLIC_SHOW_TICKETS=true\n' >> .env.local

echo "▶ 2/3  비공개 미리보기 채널 배포 (7일 후 자동 만료)"
firebase hosting:channel:deploy operator-test --expires 7d --project kcctf-5047d
RC=$?

echo "▶ 3/3  .env.local 원복 (라이브는 계속 티저)"
restore; trap - EXIT

echo ""
if [ "$RC" -eq 0 ]; then
  echo "✅ 배포 끝! 위 출력의 'Channel URL'을 운영진에게 보내세요."
  echo "   (형식 예:  https://chuncheon-tango--operator-test-xxxxx.web.app )"
  echo "   거기선 '예약하기' → EventLink 등록폼이 켜져 있어요."
  echo "   라이브 kcctf.org 는 그대로 티저(등록 숨김). 채널은 7일 후 자동 만료."
  echo "   다시 이 스크립트를 돌리면 같은 채널 URL로 갱신돼요."
else
  echo "✗ 채널 배포 실패 (web frameworks가 미리보기 채널을 미지원일 수 있음)."
  echo "  알려주시면 '별도 테스트 사이트(chuncheon-tango-test)' 방식으로 바꿔드릴게요 — 그건 확실히 됩니다."
fi
