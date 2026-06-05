#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# 운영진 테스트용 — 등록(예약) 켠 "별도 테스트 사이트" 배포
# 미리보기 채널이 web frameworks + 기본 로케일(/ko)에서 404 나는 문제를 우회.
# 별도 사이트(chuncheon-tango-test)는 자체 SSR 함수라 /ko·/en·/ 전부 정상 동작.
# 라이브 chuncheon-tango 는 그대로 티저(영향 0). 끝나면 나오는 URL을 운영진에 공유.
# 실행:  cd KCCTF-website && bash deploy-test-site.sh
# ─────────────────────────────────────────────────────────────
set -uo pipefail
cd /Users/uedutainment_dev/Dev/KCCTF/KCCTF-website || { echo "✗ 폴더 못 찾음"; exit 1; }

TEST_SITE=chuncheon-tango-test

# 어떤 경우에도 firebase.json + .env.local 원복 보장
restore() {
  [ -f firebase.json.bak ] && mv -f firebase.json.bak firebase.json
  [ -f .env.local.backup ] && mv -f .env.local.backup .env.local
}
trap restore EXIT

echo "▶ 1/4  백업 + 등록 플래그 ON + 타겟을 ${TEST_SITE} 로 전환"
cp .env.local .env.local.backup
grep -vE '^NEXT_PUBLIC_(REGISTRATION_OPEN|SHOW_TICKETS|SHOW_ACCOMMODATION)=' .env.local.backup > .env.local
printf 'NEXT_PUBLIC_REGISTRATION_OPEN=true\nNEXT_PUBLIC_SHOW_TICKETS=true\nNEXT_PUBLIC_SHOW_ACCOMMODATION=true\n' >> .env.local
cp firebase.json firebase.json.bak
sed 's/"site": "chuncheon-tango"/"site": "chuncheon-tango-test"/' firebase.json.bak > firebase.json

echo "▶ 2/4  테스트 사이트 생성 (이미 있으면 계속)"
firebase hosting:sites:create "${TEST_SITE}" --project kcctf-5047d \
  || echo "  (이미 존재하거나 사용 중 — 계속 진행)"

echo "▶ 3/4  배포 (자체 함수 생성 — Next.js web frameworks)"
firebase deploy --only hosting --project kcctf-5047d
RC=$?

echo "▶ 4/4  firebase.json + .env.local 원복 (라이브는 계속 티저)"
restore; trap - EXIT

echo ""
if [ "${RC}" -eq 0 ]; then
  echo "✅ 배포 끝 — https://${TEST_SITE}.web.app 에서 '등록 켠' 사이트 확인"
  echo "   /ko·/en·/ 전부 자체 함수로 정상 동작. 운영진에 이 URL 공유."
  echo "   라이브 kcctf.org / chuncheon-tango.web.app 는 그대로 티저."
else
  echo "✗ 배포 실패 (RC=${RC}) — 위 메시지 확인."
  echo "  429 'Quota Exceeded' 면 함수 배포 쿼터라 잠시(10~15분) 후 재실행하면 됩니다."
fi
