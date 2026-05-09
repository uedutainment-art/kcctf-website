# KCCTF 2026 Website Build Package

> **춘천국제탱고페스티벌 2026** 공식 마케팅 홈페이지 빌드 패키지.
> 노트북 Claude Code에 인계하기 위한 모든 자료가 정리되어 있습니다.

---

## 📦 이 폴더 안에 뭐가 있나요?

```
kcctf-website/
├── CLAUDE.md           ← Claude Code가 첫 컨텍스트로 읽는 마스터 명세서
├── README.md           ← 이 파일 (사람이 읽는 빠른 안내)
├── HOW_TO_USE.md       ← 터미널 / git / Vercel 30초 가이드
├── HOW_TO_UPDATE.md    ← 사이트 만든 후 가격·라인업 변경 시 매뉴얼
├── content/
│   ├── ko.json         ← 한국어 카피 (이미 작성됨)
│   ├── en.json         ← 영어 카피 (이미 작성됨)
│   └── README.md
├── _brief/             ← 컨텍스트 문서 (참고용)
│   ├── 운영기준.md
│   ├── (전략·디자인 보고서 9개)
│   ├── legal/          ← ⚠️ 포올님이 채워주실 법적 텍스트
│   └── messages/       ← 운영팀 카톡 초안 4개
├── _design/            ← 받은 디자인 시스템 (이미지·로고·specs)
└── _public-assets/     ← favicon + OG 이미지 source
```

---

## 🚀 빠른 시작 (3단계)

### 1. 터미널 열고 폴더로 이동

```bash
cd ~/projects/kcctf-website   # 이 폴더가 있는 위치
```

### 2. Claude Code 시작

```bash
claude
```

### 3. 첫 명령 입력

```
이 폴더(kcctf-website)에서만 작업해. 부모/형제 폴더는 절대 안 봐.

CLAUDE.md를 다 읽고 컨텍스트 잡아줘.
그 다음 _brief/운영기준.md, _brief/new_hero_v1.html, _design/README.md, content/ko.json도 훑어봐.

준비됐으면 Phase 4 (Next.js 14 스캐폴딩) 시작해줘.
```

이러면 Claude Code가 자동으로 빌드 시작합니다.

---

## ⚠️ 빌드 전 꼭 채워주실 것

### 1. 법적 페이지 텍스트 (Critical)

`_brief/legal/` 폴더의 3개 파일에 현재 사이트 텍스트를 복사해 주세요:

- `terms.md` ← https://kcctf.org/terms 텍스트
- `privacy.md` ← https://kcctf.org/privacy 텍스트
- `refund.md` ← https://kcctf.org/refund 텍스트

각 파일에 안내문 들어있으니 참고.

### 2. 환경 변수 결정 (Important)

`.env.example`이 빌드 후 만들어집니다. 운영팀 결정 떨어지는 대로 다음을 채우세요:

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (Google Analytics ID)
- `NEXT_PUBLIC_REGISTER_URL` (등록 페이지 URL — 플랫폼 분리 후)
- `NEXT_PUBLIC_EARLYBIRD_DEADLINE` (얼리버드 마감일, 흰곰 결정)
- `NEXT_PUBLIC_SHOW_LESSONS` (워크샵 운영 여부, 조앤 결정)

---

## 📨 운영팀에 카톡 보낼 항목

빌드와 병렬로 운영팀에 던질 카톡 초안이 `_brief/messages/`에 있습니다:

- `이종화_도메인.md` — 도메인·Firebase·이전 회차 자료
- `흰곰_장소_등록.md` — 콘서트 장소·등록 방식·얼리버드 마감일
- `조앤_워크샵_라인업.md` — 회차·워크샵 운영·M2 시간
- `존_댄서팀_사진.md` — 댄서팀 사진·4번째 댄서 확정

답이 늦어도 빌드는 placeholder로 진행됩니다.

---

## 🌐 빌드 후 배포

Phase 4(스캐폴딩) → Phase 5(컴포넌트) → Phase 6(콘텐츠) → Phase 7(QA) → 배포.

배포는 Vercel 자동:
1. GitHub에 push → Vercel이 감지 → 자동 빌드 → preview URL
2. 운영팀에 URL 공유 → 검수
3. OK 떨어지면 이종화 이사장이 kcctf.org DNS 변경 (5분)

자세한 배포 가이드는 `HOW_TO_USE.md` 참조.

---

## 📚 더 읽을 자료

- `_brief/architecture_split.html` — 플랫폼/홈페이지 분리 결정
- `_brief/staging_handoff_plan.html` — 스테이징·교체 전략
- `_brief/new_hero_v1.html` — 새 Hero 디자인 (디자이너 V1 원안 아님!)
- `_brief/design_review.html` — 디자인 충돌 7가지 분석
- `_brief/execution_plan.html` — 8 Phase 실행 계획

---

## 🆘 막힐 때

Claude Code가 추측하지 않고 물어볼 거예요. 모르는 게 나오면:

- 운영기준.md 다시 확인
- 해당 정보 담당자(흰곰·조앤·존·이종화)에게 카톡
- 답 받을 때까지 placeholder + 환경 변수로 우회

---

**버전**: v1.0 · 2026-05-09
**다음 업데이트**: 운영팀 결정 들어오는 대로
