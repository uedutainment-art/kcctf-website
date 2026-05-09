# CLAUDE.md — KCCTF 2026 Website Build Spec

**프로젝트**: 춘천국제탱고페스티벌 2026 공식 마케팅 홈페이지 (kcctf.org)
**작성일**: 2026-05-09
**대상**: Claude Code (Anthropic) — 이 파일을 첫 컨텍스트로 읽고 빌드 진행

---

## 🎯 이 프로젝트의 한 문장

> **Tango Bardo와 Misteriosa Buenos Aires 두 오케스트라가 봄내체육관에서 펼치는 사흘 밤. 아시아에서 다시 없을 라이브 탱고를 한국에 처음 모셔온다.**

이게 모든 디자인·카피·UX 결정의 기준점이다. 의심될 때 이 문장을 읽고 결정.

---

## 🚨 절대 금지사항 (이거 어기면 사이트 의미 없음)

1. **지원금 / 비용 구조 / 운영 사정 노출 금지** — "지원금이 있어서 가능", "예산 부족" 같은 문구 절대 X. 사이트는 늘 "이렇게 만들었다" 단정조.
2. **임의 데이터 생성 금지** — 운영기준.md에 없는 라인업·가격·일정·장소를 "그럴듯하게" 만들지 마. 모르면 placeholder + "곧 공개".
3. **가격 임의 변경 금지** — ₩190,000(얼리) / ₩240,000(현장) / ₩100,000(일일). 디자인 시안에 다른 숫자 있어도 무시.
4. **"Friday session" 같은 요일 오류 재현 금지** — 10/3은 토(SAT), 10/4는 일(SUN), 10/5는 월(MON).
5. **부모 폴더·형제 폴더 접근 금지** — 이 폴더(`kcctf-website/`) 안에서만 작업. 옆에 있는 다른 폴더(예: 플랫폼 코드)는 절대 읽거나 수정하지 말 것.
6. **운영기준.md를 임의로 수정 금지** — 진실의 출처. 코드에서 참조만 할 것.

---

## 📚 진실의 출처 (Source of Truth)

| 영역 | 파일 |
|---|---|
| 콘텐츠 (가격·일정·라인업·장소·호텔) | `_brief/운영기준.md` (특히 §3, §4, §5, §6, §7) |
| 디자인 톤 / 토큰 / 자산 | `_design/README.md` + `_design/assets/` |
| Hero 섹션 디자인 | `_brief/new_hero_v1.html` (디자이너 V1 원안 아닌 새 시안) |
| 한/영 카피 | `content/ko.json` + `content/en.json` (이미 작성됨) |
| 충돌 / 결정 사항 | `_brief/design_review.html` + `_brief/execution_plan.html` |
| 법적 페이지 | `_brief/legal/terms.md`, `privacy.md`, `refund.md` (운영팀이 채워줌) |

**충돌이 있을 때 우선순위**: 운영기준.md > content/*.json > _design/README.md > 그 외.

---

## 🛠 기술 스택 (확정)

```
Next.js 14 (App Router)
TypeScript (strict)
Tailwind CSS
next-intl (i18n: ko / en, ko가 기본)
Vercel (배포)
pnpm (패키지 매니저)
```

**선택 이유**:
- Next.js 14: 현재 사이트도 Next.js, 호환성 좋음
- App Router: 최신 안정, i18n 라우팅 기본 지원
- next-intl: 검증된 i18n 라이브러리
- Tailwind: 디자인 토큰 → tailwind.config.ts로 즉시 변환
- Vercel: 무료, GitHub 연결 시 자동 preview deploy
- pnpm: 빠르고 디스크 효율적

---

## 🎨 디자인 — V1 Mustard 톤

자세한 specs는 `_design/README.md` 참조. 핵심만:

### 컬러 토큰
```css
--mustard:        #F2C94C;  /* 메인 배경 */
--mustard-soft:   #F8DC7A;  /* 보조 */
--cream:          #F5EBD8;  /* secondary 배경 */
--warm-white:     #FDFAF5;  /* 텍스트 on dark */
--burgundy:       #8B1A2B;  /* primary CTA */
--burgundy-deep:  #5A0E1B;  /* hover */
--gold:           #D4A017;  /* 액센트 */
--gold-soft:      #E8C25E;  /* hover/highlight */
--ink:            #1A1410;  /* primary text */
--ink-soft:       #4A2418;  /* heading on light */
--charcoal:       #2A2018;  /* body text */
--night:          #0E0814;  /* footer */
```

### 폰트 패밀리
```
한글 헤드라인:  Noto Serif KR (700-900)
한글 본문:     Pretendard (400-700) ← Noto Sans KR보다 권장
영문 디스플레이: Playfair Display (italic 활용)
영문 본문/UI:   Inter
영문 caps:     Oswald
```

`next/font/google`로 로딩.

### 핵심 시각 시그니처
- **반도네온 일러스트** (`_design/assets/illustration-bandoneon-cream.png` / `dark.png`) — 페스티벌 마스코트
- **다이아몬드 격자 패턴** — Hero 배경 (CSS gradient 또는 inline SVG)
- **그레인 텍스처** (`_design/assets/grain.svg`) — multiply blend, opacity 0.3
- **별 ★** — eyebrow 양옆 골드 별
- **버건디 박스섀도** — `5px 5px 0 var(--burgundy)` (인쇄물 스탬프 느낌)

---

## 🗺 사이트 구조 (SPA + 앵커 스크롤)

단일 페이지 + 메뉴는 앵커 스크롤. BTE 패턴.

```
/ (Home, ko 기본)
├── #hero
├── #orchestras    ★ 핵심 셀링포인트
├── #schedule
├── #djs
├── #dancers       (디자인에 없던 섹션, 신규 추가)
├── #venue
├── #tickets
├── #about         (Footer 통합)
└── #contact

/en  ← 영어 라우트 (next-intl)
```

**메뉴**: 로고 / 라인업 / 일정 / 장소 / 등록 / KR-EN / [예약하기 CTA]

**예약하기 CTA**:
- 임시: `#tickets` 앵커로 스크롤
- 향후: `https://apply.kcctf.org/events/chuncheon-2026/register` (운영 플랫폼)
- 환경 변수 `NEXT_PUBLIC_REGISTER_URL`로 관리

---

## 🎬 Hero 섹션 — 새 시안 기준 (중요!)

**디자이너 V1 원안 그대로 쓰지 말 것.** `_brief/new_hero_v1.html` 기준.

원안 문제: 모바일 첫 화면에 오케스트라가 안 보임 (한글 워드마크가 화면 절반).

새 시안 5층 구조:
1. 한글 워드마크 (clamp 56-92px, 원안 96-240px보다 작게 — 다른 요소 공간 확보)
2. **USP 띠** (`★ 2 ORCHESTRAS · 3 NIGHTS ★`, burgundy 배경, white text)
3. **두 오케스트라 듀오 카드** (Tango Bardo + Misteriosa 사진, aspect-ratio 16/7, burgundy 박스섀도)
4. **임팩트 숫자 4개** (2 / 3 / 6 / 6 — Orchestras / Nights / Milongas / DJs)
5. 날짜 밴드 (`10.03 — 10.05` Playfair italic + 봄내체육관)

데스크톱: 좌측 60%(워드마크 + USP 띠) + 우측 40%(반도네온 + 듀오 카드), 하단 풀폭 날짜 밴드.
모바일: 세로 스택. 모든 5층이 viewport 안에 보이도록.

---

## 📦 컴포넌트 구조 (제안)

```
app/
├── [locale]/
│   ├── layout.tsx                  # 헤더 + 푸터 + 폰트 + 메타
│   ├── page.tsx                    # 단일 홈 페이지 (모든 섹션)
│   ├── terms/page.tsx              # 이용약관
│   ├── privacy/page.tsx            # 개인정보
│   └── refund/page.tsx             # 환불 규정
├── sitemap.ts                      # 자동 생성
├── robots.ts                       # 자동 생성
└── globals.css

components/
├── Nav.tsx                         # sticky, 한/영, 햄버거
├── Hero.tsx                        # ★ 새 시안 기준
├── Orchestras.tsx                  # 풀블리드, Tango Bardo + Misteriosa
├── Schedule.tsx                    # 3일 탭 (10/3·10/4·10/5)
├── Djs.tsx                         # 6명 그리드
├── Dancers.tsx                     # 4팀 (운영기준 §6, +1 TBA)
├── Venue.tsx                       # 봄내체육관 + 문화예술회관
├── Tickets.tsx                     # 풀팩/+2박/+3박 + 일일권
├── Footer.tsx                      # 후원 + 사이트맵 + 법인정보
└── ui/                             # 공용 (Button, Card 등)

content/
├── ko.json                         # 한국어 (이미 작성됨)
└── en.json                         # 영어 (이미 작성됨)

public/
├── images/                         # _design/assets/에서 복사
├── favicon.ico                     # _public-assets/favicon-source.svg에서 변환
├── og-image.jpg                    # _public-assets/og-image-source.jpeg에서 1200×630
└── ...
```

---

## 🔄 외부 결정 미정 처리 — 환경 변수 / 플래그

운영팀 결정 안 떨어진 항목들은 **빌드 멈추지 않게 환경 변수로 on/off**.

`.env.example`:
```bash
# 사이트 기본
NEXT_PUBLIC_SITE_URL=https://kcctf.org
NEXT_PUBLIC_REGISTER_URL=https://apply.kcctf.org/events/chuncheon-2026/register
NEXT_PUBLIC_CONTACT_EMAIL=info@kcctf.org

# 외부 결정 미정 — false면 섹션·요소 비활성
NEXT_PUBLIC_SHOW_LESSONS=false           # 워크샵 (조앤 결정)
NEXT_PUBLIC_SHOW_EDITION_NUMBER=false    # 회차 표기 (제3회?)
NEXT_PUBLIC_SHOW_CONCERT_VENUE=false     # 문화예술회관 (흰곰 결정)
NEXT_PUBLIC_SHOW_HOTEL_PACKAGES=false    # 풀팩+2박/3박 가격 (흰곰 결정)
NEXT_PUBLIC_EARLYBIRD_DEADLINE=          # YYYY-MM-DD, 빈 값이면 카운트다운 X

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=          # GA4 측정 ID (사용자가 알려줄 예정)
NEXT_PUBLIC_VERCEL_ANALYTICS=true        # Vercel Analytics 자동
```

**규칙**: 모든 미정 데이터는 환경 변수 또는 플래그로 처리. 결정 떨어지면 환경 변수만 변경 → 자동 반영.

---

## 📝 카피 — `content/*.json` 사용

**이미 작성되어 있음**. Claude Code가 추측해서 새로 만들지 말 것.

구조:
```json
{
  "common": {...},
  "nav": {...},
  "hero": {...},
  "orchestras": {...},
  "schedule": {...},
  "djs": {...},
  "dancers": {...},
  "venue": {...},
  "tickets": {...},
  "about": {...},
  "footer": {...},
  "faq": [...]
}
```

next-intl로 로드. 키 누락 시 빌드 시 에러 (둘 다 같은 키 구조 가져야 함).

**카피 톤**:
- 한국어: 호스트가 친구를 부르는, 따뜻하고 환대하는, 격식 X 친근 O
- 영어: Warm, romantic, slightly literary, never corporate. 시적이지만 가볍지 않게
- 단정조 ("이렇게 한다") 사용. "amazing", "incredible" 같은 과장 X
- 이미지가 말하게 하기 — 카피는 보조

---

## 📊 데이터 모델 (TypeScript types)

```typescript
// types/festival.ts
export type Orchestra = {
  id: string;          // 'tango-bardo' | 'misteriosa-ba'
  name: { ko: string; en: string };
  role: { ko: string; en: string };
  origin: string;      // 'Buenos Aires'
  image: string;       // /images/orq-tango-bardo.jpg
};

export type DJ = {
  id: string;
  nameKo: string;      // '하군'
  nameEn: string;      // 'Hagoon'
  city: string;        // '서울' / 'Seoul'
  country: string;     // 'Korea'
  image: string;
};

export type DanceTeam = {
  id: string;
  name: { ko: string; en: string };
  origin: string;
  image: string | null;  // null이면 placeholder
  isTBA: boolean;
};

export type ScheduleItem = {
  day: '10/3' | '10/4' | '10/5';
  dow: 'SAT' | 'SUN' | 'MON';
  startTime: string;   // '13:00'
  endTime: string;     // '14:40'
  type: 'concert' | 'milonga' | 'tour' | 'afterparty';
  title: { ko: string; en: string };
  djId?: string;
  mood?: { ko: string; en: string };  // BTE식 한 줄 분위기
  featured?: boolean;
};

export type TicketTier = {
  id: 'fullpack-early' | 'fullpack-onsite' | 'daypass';
  name: { ko: string; en: string };
  price: number;       // 190000
  currency: 'KRW';
  description: { ko: string; en: string };
  includes: { ko: string[]; en: string[] };
  available: boolean;
};

export type Venue = {
  id: string;
  name: { ko: string; en: string };
  type: 'milonga' | 'concert';
  address: string;
  description: { ko: string; en: string };
  image: string | null;
};
```

데이터 자체는 `data/*.ts` 또는 `content/*.json` 안에. types는 컴파일 타임 검증용.

---

## 🌐 SEO + 메타

`app/[locale]/layout.tsx`에서 Metadata API:

```typescript
export const metadata: Metadata = {
  title: '춘천국제땅고페스티벌 2026 — Chuncheon International Tango Festival',
  description: '두 오케스트라, 사흘 밤. 봄내체육관에서. 2026.10.03–10.05.',
  openGraph: {
    images: ['/og-image.jpg'],
    locale: 'ko_KR',
    alternateLocale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    languages: {
      'ko-KR': 'https://kcctf.org',
      'en-US': 'https://kcctf.org/en',
    },
  },
};
```

**필수 추가**:
- `app/sitemap.ts` — Next.js 자동 sitemap
- `app/robots.ts` — User-agent: *, Allow: /
- 카카오톡 미리보기 — `<meta property="og:image" content="..." />` (이미 OG로 처리됨)
- Favicon — `public/favicon.ico` + apple-touch-icon

---

## 📊 Analytics

두 개 동시 사용:
1. **Vercel Analytics** (자동, 무료) — `import { Analytics } from '@vercel/analytics/react';`
2. **Google Analytics 4** — `NEXT_PUBLIC_GA4_MEASUREMENT_ID` 환경 변수가 있을 때만 활성화

GA4 ID는 사용자가 따로 알려줄 예정. 일단 코드는 준비, 환경 변수 비어있으면 비활성.

---

## 🚀 배포 (Vercel)

순서:
1. `git init` + `.gitignore` (node_modules, .next, .env*, *.log, .DS_Store)
2. 첫 commit: `"Initial scaffold from CLAUDE.md spec"`
3. GitHub 새 repo 생성 (private 권장): `kcctf-website`
4. `git remote add origin git@github.com:[user]/kcctf-website.git`
5. `git push -u origin main`
6. Vercel 가서 GitHub 연결 → import → preview URL 자동
7. 환경 변수 설정 (Vercel 대시보드에서 `.env.example` 기준)
8. preview URL: `kcctf-website.vercel.app` 또는 `kcctf-2026.vercel.app`

**도메인 변경은 나중에** — 운영팀 OK 떨어진 후 이종화 이사장 협조로 DNS 변경.

---

## ✅ QA 체크리스트 (Phase 7)

- [ ] 모바일 320 / 375 / 414 / 768 / 1100+ 깨짐 없음
- [ ] 한/영 두 라우트 모두 모든 텍스트 채워짐 (placeholder X)
- [ ] 운영기준 §3, §4, §5, §6, §7과 사이트 데이터 일치
- [ ] "Friday session" 같은 요일 오류 0건
- [ ] 모든 사진에 의미 있는 alt 텍스트
- [ ] 색상 대비 WCAG AA 이상 (Lighthouse)
- [ ] Lighthouse Performance / Accessibility / Best Practices / SEO 모두 90+
- [ ] sitemap.xml 정상 생성, robots.txt 응답
- [ ] og-image.jpg 카톡으로 보내봤을 때 미리보기 정상
- [ ] info@kcctf.org 메일 링크 작동
- [ ] 모든 외부 링크 새 탭 열림 (target="_blank" rel="noopener")
- [ ] 환경 변수 `NEXT_PUBLIC_SHOW_*` 토글 정상 작동

---

## 🎬 첫 명령 (Claude Code 시작 직후)

사용자가 `claude` 실행 후 첫 메시지로 칠 명령:

```
이 폴더(kcctf-website)에서만 작업해. 부모/형제 폴더는 절대 안 봐.

CLAUDE.md를 다 읽고 컨텍스트 잡아줘.
그 다음 _brief/운영기준.md, _brief/new_hero_v1.html, _design/README.md, content/ko.json도 훑어봐.

준비됐으면 Phase 4 시작:
1. pnpm으로 Next.js 14 App Router 프로젝트 스캐폴딩 (TypeScript, Tailwind, ESLint, App Router)
2. next-intl 설치 + ko/en 라우팅 셋업 (ko 기본)
3. Tailwind config에 V1 디자인 토큰 (컬러·폰트 패밀리·라디우스·섀도) 변환
4. Google Fonts (Noto Serif KR, Pretendard, Playfair Display, Inter, Oswald) 로딩
5. _design/assets/ → public/images/로 복사
6. _public-assets/favicon-source.svg → public/favicon.ico, apple-touch-icon-180.png 변환 (sharp 사용)
7. _public-assets/og-image-source.jpeg → public/og-image.jpg (1200×630 크롭) 변환
8. .env.example 생성, .gitignore 표준
9. 빈 layout.tsx + page.tsx (메인 헤딩만 보이게)
10. 로컬 빌드 확인 (pnpm dev로 localhost:3000 뜨는지)
11. git init + 첫 commit ("Initial scaffold from CLAUDE.md spec")

GitHub push와 Vercel 연결은 사용자에게 확인받고 진행.
중간에 모르는 부분 있으면 추측하지 말고 사용자에게 물어볼 것.
```

이 명령 한 마디면 Phase 4 (스캐폴딩)이 시작된다.

---

## 📋 Phase 5 이후 명령 패턴

### Phase 5 (컴포넌트 구현)
```
Phase 5 시작 — 컴포넌트 구현. 우선순위:
1) Nav.tsx (sticky, 한/영, 햄버거)
2) Hero.tsx (반드시 _brief/new_hero_v1.html 기준 — 디자이너 V1 원안 아님!)
3) Orchestras.tsx (Tango Bardo + Misteriosa, 풀블리드)
4) Schedule.tsx (3일 탭, 운영기준 §7 그대로 — 요일 오류 없게)
5) Djs.tsx (6명 그리드, 한글이름 포함)
6) Dancers.tsx (4팀, +1 TBA)
7) Venue.tsx
8) Tickets.tsx
9) Footer.tsx

content/*.json에서 i18n 키 사용. 데이터는 data/*.ts에 정리.
모바일 first.
```

### Phase 6 (콘텐츠 + 통합)
```
Phase 6 — 모든 placeholder 텍스트를 content/*.json 카피로 교체.
이미지 경로 /images/* 정확히 매핑.
환경 변수 NEXT_PUBLIC_SHOW_* 토글이 실제 작동하는지 확인.
```

### Phase 7 (QA)
```
Phase 7 — QA. CLAUDE.md의 체크리스트 모두 통과 확인.
Lighthouse 점수 + 모바일 깨짐 + 운영기준 일치 + 한/영 누락 검사.
발견 사항 표로 정리.
```

### 수정 명령 패턴
```
Hero의 임팩트 숫자 4번째를 "DJs" → "Live Concerts"로 바꿔줘.
```
```
운영기준이 바뀌었어 — 흰곰이 얼리버드 마감일을 7월 31일로 확정.
.env에 EARLYBIRD_DEADLINE=2026-07-31 추가하고 카운트다운 활성화.
```

---

## ⚠️ 흔한 함정 (빠지지 말 것)

1. **디자이너의 마에스트로 3팀(후아니타·사빈·강민지)을 그대로 쓰는 함정** — 이건 임의 작성된 데이터. 운영기준 §6의 댄서팀 4팀이 진실.
2. **"제3회"를 그대로 표기하는 함정** — 회차 미확인 상태. `NEXT_PUBLIC_SHOW_EDITION_NUMBER=false`이면 표기 X.
3. **디자이너 V1 원안 Hero 그대로 쓰는 함정** — 모바일에서 오케스트라 안 보임. 새 시안(`_brief/new_hero_v1.html`) 사용.
4. **가격을 ₩320,000 / ₩380,000으로 쓰는 함정** — 디자인 시안에 다른 숫자 있어도 무시. 운영기준 ₩190K/₩240K/₩100K가 정답.
5. **DJ 한글 이름 누락 함정** — "Hagoon"만 쓰지 말고 "하군 (Hagoon)" 또는 ko/en 분리.
6. **카피 추측 함정** — `content/*.json`에 이미 다 있음. 추측 X.

---

## 🔗 참고 / 더 읽을 것

- `_brief/architecture_split.html` — 플랫폼/홈페이지 분리 결정
- `_brief/staging_handoff_plan.html` — 배포 전략
- `_brief/folder_split_guide.html` — 폴더 분리 가이드
- `_design/README.md` — 디자인 시스템 풀 specs
- `_design/prototypes/marketing-site-v2/` — 디자이너 JSX (참고만 — V1 톤으로 재구성)

---

## 📞 질문 / 막힐 때

추측하지 말고 사용자에게 묻기. 좋은 질문 패턴:

- "운영기준에 X가 명시되지 않음. A 또는 B 중 어느 쪽으로 할까?"
- "디자인 시안과 운영기준 데이터가 충돌함 (예: 가격). 어떻게 처리할까?"
- "외부 결정 미정 (예: 회차). 환경 변수 SHOW_X로 처리하면 됨? 아니면 다른 방법?"

---

**버전**: v1.0
**다음 업데이트**: 운영팀 결정 떨어지는 대로 (회차·장소·워크샵·등록 방식)
