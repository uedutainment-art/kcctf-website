# Handoff: 춘천국제탱고페스티벌 2026 — 홈페이지

> **Chuncheon International Tango Festival 2026 — Marketing Website Design Handoff**

## Overview

이 패키지는 2026년 10월 3–5일 (토–월) 춘천 봄내체육관에서 열리는 **제3회 춘천국제탱고페스티벌(KCITF)** 의 공식 마케팅 홈페이지 디자인 핸드오프 자료입니다.

페스티벌의 핵심 차별점은 **두 팀의 라이브 오케스트라**(부에노스 아이레스에서 직접 오는 Misteriosa Buenos Aires & Tango Bardo)이며, 이는 다른 아시아 탱고 페스티벌에 없는 독점 셀링포인트입니다. 디자인 전반에서 이 두 오케스트라가 가장 큰 비중으로 다뤄져야 합니다.

대상은 한국·중국·홍콩·일본 탱고 댄서 + 부에노스 아이레스 출신 디제이/오케스트라 팬. **한글 우선, 영문 서브** 표기가 원칙.

---

## About the Design Files

이 번들에 포함된 파일들은 **HTML로 만든 디자인 레퍼런스**입니다 — 의도된 룩과 동작을 보여주는 프로토타입이지, 그대로 복사해서 프로덕션에 쓸 코드가 아닙니다.

해야 할 일은 이 HTML 디자인을 **타겟 코드베이스의 기존 환경에 맞춰 재구현**하는 것입니다 (React, Next.js, Vue, Astro 등). 코드베이스가 아직 없다면 이 프로젝트에 가장 적절한 프레임워크를 선택하세요 — 추천: **Next.js 14+ (App Router) + Tailwind CSS + 다국어(next-intl) 지원**.

폰트, 컬러 토큰, 레이아웃 비율은 디자인 토큰 섹션에 정확한 값으로 정리되어 있습니다.

---

## Fidelity

**High-fidelity (hifi)** — 컬러, 타이포, 스페이싱, 인터랙션 모두 최종본 기준으로 정의되어 있습니다. 픽셀 단위 충실도로 구현해주세요. 단, 다음은 디자이너/개발자가 함께 결정:

- 모바일 반응형 브레이크포인트별 정확한 레이아웃 (지금은 데스크톱 1440px 기준 hifi)
- 호버/포커스 마이크로 인터랙션의 정확한 듀레이션 (가이드는 있음)
- 스크롤 애니메이션 (있어도 좋고 없어도 무방, 절제 권장)

---

## Brand Identity

### 핵심 비주얼 시그니처

**반도네온 일러스트** (`assets/illustration-bandoneon-*.png`)
- 페스티벌 마스코트. 반도네온이 호수+산+소나무+탱고 커플을 감싸안고, 풀무 부분이 푸른 호수 물결로 표현된 커스텀 일러스트.
- 2가지 버전: **cream**(밝은 배경용, 반도네온 본체가 크림색) / **dark**(어두운 배경용, 반도네온 본체가 검정).
- 사용 위치: 히어로 섹션 중앙, Footer, 모바일 메뉴 헤더.
- **AI로 생성된 자산이라 라이선스 자유**. 단, 너무 작게(<120px) 쓰면 디테일이 뭉개지므로 최소 200px 이상 권장.

**공식 로고** (`assets/logo-official-*.png`)
- 한글 + 영문 워드마크 lockup. dark/light 두 버전.
- Nav 좌측, Footer, 모든 다운로드 자산에 사용.

**최종 포스터** (`assets/final-poster-v1.png`)
- 인쇄소에서 다듬은 최종 포스터. 홈페이지의 컬러·타이포·구성 톤의 기준 (single source of truth).

### 보이스 & 톤

| 한글 | 영문 |
|---|---|
| 따뜻하고 환대하는 (호스트가 친구를 부르는 톤) | Warm, romantic, slightly literary — never corporate |
| "춘천에서 만나요", "호숫가의 탱고" | "Lakeside tango", "Three nights, three orchestras" |
| 격식 X, 친근 O. 하지만 가볍지 않게. | Avoid hype words ("amazing", "incredible"). Let images speak. |

---

## Design Tokens

### Colors

```css
/* === Primary ============================================ */
--color-mustard:        #F2C94C;  /* 메인 배경 (포스터 옐로우) */
--color-mustard-soft:   #F8DC7A;  /* 카드/패턴 약한 톤 */
--color-cream:          #F5EBD8;  /* secondary 배경 */
--color-warm-white:     #FDFAF5;  /* 텍스트 on dark */

/* === Accent ============================================= */
--color-burgundy:       #8B1A2B;  /* primary CTA, 헤드라인 강조 */
--color-burgundy-deep:  #5A0E1B;  /* hover 상태 */
--color-gold:           #D4A017;  /* 골드 액센트, "From Buenos Aires" */
--color-gold-soft:      #E8C25E;  /* hover/highlight */

/* === Neutrals =========================================== */
--color-ink:            #1A1410;  /* primary text on light */
--color-ink-soft:       #4A2418;  /* heading on light (warm dark) */
--color-charcoal:       #2A2018;  /* body text */
--color-stone-500:      rgba(74,36,24,0.55);  /* muted text */
--color-stone-300:      rgba(74,36,24,0.18);  /* divider */

/* === Dark surface (Footer / 오케스트라 배너) ============= */
--color-night:          #0E0814;
--color-night-2:        #1F0F0A;

/* === Semantic =========================================== */
--color-live:           #D42656;  /* "LIVE" 라벨 핫핑크 */
--color-success:        #1F8A5B;
--color-warning:        #D4A017;
--color-error:          #B33A3A;
```

### Typography

```css
/* === Font Families ====================================== */
--font-kr-serif:    'Noto Serif KR', serif;       /* 한글 헤드라인 */
--font-kr-sans:     'Noto Sans KR', sans-serif;   /* 한글 본문 */
--font-en-display:  'Playfair Display', serif;    /* 영문 디스플레이 (italic 활용) */
--font-en-body:     'Inter', sans-serif;          /* 영문 본문, UI */
--font-en-condensed:'Oswald', sans-serif;         /* DJ 라벨, 영문 caps */

/* === Scale (1440 base) ================================== */
--text-hero-kr:     clamp(96px, 14vw, 240px);  /* "춘천" 한 단어 */
--text-display:     clamp(56px, 7vw, 112px);   /* H1 */
--text-h1:          clamp(40px, 5vw, 72px);
--text-h2:          clamp(28px, 3.5vw, 48px);
--text-h3:          24px;
--text-body-lg:     20px;
--text-body:        16px;
--text-small:       14px;
--text-eyebrow:     11px;   /* 0.4em letter-spacing, uppercase */

/* === Letter-spacing patterns ============================ */
/* 한글 헤드라인:  letter-spacing: -0.04em ~ -0.08em (큰 폰트일수록 더 음수) */
/* 영문 헤드라인:  letter-spacing: -0.02em */
/* 영문 eyebrow:   letter-spacing: 0.32em ~ 0.5em, uppercase */
/* 영문 body:      letter-spacing: 0 */

/* === Line-height ======================================== */
/* 헤드라인:       0.9 ~ 1.0 */
/* 부제/리드:      1.3 */
/* 본문:           1.55 ~ 1.7 */
```

### Spacing Scale (4px base)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
```

### Radii / Shadows / Borders

```css
--radius-sm:  3px;
--radius-md:  6px;
--radius-lg:  12px;
--radius-pill: 9999px;
--radius-circle: 50%;       /* DJ 원형 크롭 */

--shadow-card:  0 2px 8px rgba(26,20,16,0.08);
--shadow-lift:  0 12px 32px -8px rgba(26,20,16,0.18);
--shadow-stamp: 5px 5px 0 var(--color-burgundy);  /* 날짜 밴드용 오프셋 그림자 (인쇄물 느낌) */

/* Borders */
--border-hairline: 1px solid rgba(74,36,24,0.18);
--border-strong:   2px solid var(--color-ink-soft);
```

### Patterns / Decorations

- **다이아몬드 격자 패턴** — 노란 배경 위 톤다운 다이아몬드 (배경 #F2C94C에 #E8B83C 0.5px stroke). Hero 배경.
- **물결 라인** (`hangang-line` SVG) — 호수 모티프. 2겹 곡선(burgundy + gold).
- **별 ★** — eyebrow 양옆 골드 별. "★ 3RD EDITION · 2026 ★" 패턴.
- **종이 그레인** (`assets/grain.svg`) — multiply blend, opacity 0.4. 인쇄물 질감.

---

## Screens

### 1. `/` — 홈 (랜딩 페이지)

**목적**: 페스티벌의 정체성 즉시 전달 + 두 오케스트라가 가장 큰 셀링포인트임을 1초 안에 인지시킴 + 등록 CTA

**섹션 순서**:

1. **Nav (sticky)** — 좌측 로고, 가운데 메뉴, 우측 "패스 예약하기" + 언어 토글(KR/EN)
2. **Hero** — 노란 배경 + 다이아몬드 패턴, 좌측 한글 "춘천" 거대 워드마크 + 우측 영문 부제 + 가운데 반도네온 일러스트, 하단 날짜밴드
3. **Two Orchestras (★ 핵심)** — 와인색 풀블리드, "From Buenos Aires" eyebrow + 두 오케스트라 가로 풀폭 사진 스택 (위 Misteriosa, 아래 Tango Bardo, contain 방식 잘림 0)
4. **Schedule** — 노란 배경 위 흰 카드, 3일 탭 (10/3 SAT / 10/4 SUN / 10/5 MON), 각 탭에 시간 + 프로그램
5. **DJs** — 크림 배경, 6명 원형 크롭(circle) 그리드 (3×2 데스크톱, 2×3 모바일), 각 카드 아래 이름 + 국가
6. **Venue** — 춘천 봄내체육관 (Chuncheon Bomnae Complex). 좌측 정보, 우측 지도/호수 사진
7. **Tickets** — 패스 3종 (Full Pass / Milonga Pass / Concert Only), 가격 + 포함 항목
8. **Footer** — 다크 배경, 반도네온 dark 일러스트, 주최 로고(춘천시 + KCCTF), 소셜, kcctf.org

#### 1.1 Nav

| | |
|---|---|
| 위치 | sticky top, height 72px (mobile 60px) |
| 배경 | `var(--color-mustard)` + 하단 1px solid `rgba(74,36,24,0.12)` |
| 좌측 | 공식 로고 (height 44px) — `assets/logo-official-dark.png` |
| 가운데 | 홈 / 라인업 / 일정 / 장소 / 등록 — 한글, gap 32px, font-size 14px, color `var(--color-ink-soft)` |
| 우측 | "패스 예약하기" CTA — burgundy 배경, white text, padding 12 24, radius 6px, font-weight 700 |
| 우측 끝 | 언어 토글 KR/EN — eyebrow 스타일, 11px, letter-spacing 0.32em |
| 메뉴 hover | color → `var(--color-burgundy)`, 0.18s ease |

#### 1.2 Hero — 노란 배경 + 한글 거대 워드마크

| | |
|---|---|
| 배경 | `var(--color-mustard)` + 다이아몬드 격자 패턴 (대각선 45° 격자, 라인 0.5px `#E8B83C`, 간격 32px) |
| 높이 | 100vh (min 720px, max 960px) |
| 그레인 | `assets/grain.svg` 오버레이 multiply 0.3 |
| 좌측 60% | 한글 워드마크 |
| └ eyebrow | "★ 3RD EDITION · 2026 ★" — Inter 800, 12px, letter-spacing 0.4em, color burgundy |
| └ 한글 주제 | "춘천 / 국제탱고 / 페스티벌" 3줄 — Noto Serif KR 900, 클램프 96~240px, 색 `--color-ink-soft`, letter-spacing -0.06em, line-height 0.88 |
| └ 영문 부제 | "CHUNCHEON / INTERNATIONAL / TANGO FESTIVAL" 3줄 — Inter 700, 32px, letter-spacing 0.04em, color burgundy, margin-top 24px |
| 우측 40% | 반도네온 일러스트 (cream 버전), max-width 480px, 살짝 좌측으로 translateX(-20px) |
| 하단 (좌측 fullwidth) | 날짜 밴드 (별도 섹션처럼 시각적 구분) |
| 날짜 밴드 | dark 배경 `var(--color-ink)`, 패딩 20 32, `box-shadow: var(--shadow-stamp)` |
| └ 좌측 | "10.03 — 10.05" Playfair 900 italic 48px gold + "SAT · SUN · MON · 2026" Inter 700 11px 0.4em |
| └ 우측 | "춘천 봄내체육관" Noto Serif KR 700 18px white + "CHUNCHEON BOMNAE COMPLEX" Inter 600 10px 0.32em rgba(white,0.6) |

#### 1.3 Two Orchestras — 핵심 셀링포인트

| | |
|---|---|
| 배경 | `var(--color-burgundy)` 풀블리드 |
| eyebrow | "★ TWO LIVE ORCHESTRAS ★" 가운데 정렬, gold, Inter 800 14px 0.4em |
| 부제 | "From Buenos Aires" Playfair italic 28px, gold, 가운데 정렬, margin-top 8px |
| 헤드라인 | "한 무대, 두 오케스트라" Noto Serif KR 900 64px, white, 가운데 정렬 |
| 본문 | "부에노스 아이레스에서 직접 오는 두 팀의 살아있는 탱고 — 다른 어디에도 없는 단 한 번의 무대" 18px, rgba(white,0.85), max-width 640px |
| 사진 그리드 | 2 rows, 각 height 480px, gap 16px |
| 각 row | dark 배경 + 사진 `object-fit: contain` (인원 한 명도 안 잘림 — 좌측 30% 어두운 그라디언트로 텍스트 가독성) |
| └ 좌측 텍스트 | 이름(Playfair 900 italic 56px white) + 역할(Inter 700 12px 0.32em gold) |
| └ 우측 LIVE 배지 | 흰 종이 라벨 회전 -8°, "LIVE" Oswald 800 18px black |
| Row 1 | Misteriosa Buenos Aires — `assets/orq-misteriosa.jpg` |
| Row 2 | Tango Bardo — `assets/orq-tango-bardo.jpg` |

#### 1.4 Schedule

| | |
|---|---|
| 배경 | `var(--color-mustard-soft)` |
| 탭 | 3개 (10/3 SAT, 10/4 SUN, 10/5 MON) — 활성 탭은 burgundy 배경 + white text, 비활성은 transparent + ink-soft text |
| 카드 | `var(--color-warm-white)` 배경, radius 12px, padding 32 |
| 행 | 시간(Inter 700 14px gold) ‖ 프로그램(Noto Sans KR 500 16px ink) ‖ 위치 |
| 강조 행 | mustard 배경 + ★ prefix (Two Orchestras Concert, Grand Milonga, M6 After Party & Milonga) |

**일정 데이터**:

```js
const schedule = [
  { day: '10/3', dow: 'SAT', items: [
    { time: '13:00–14:40', label: '★ 두 오케스트라 합동 콘서트 · 2 Tango Orchestras Concert', feat: true },
    { time: '15:00–20:00', label: 'M1 · Welcome Milonga' },
    { time: '22:00–04:00', label: 'M2 · Late Night Milonga' },
  ]},
  { day: '10/4', dow: 'SUN', items: [
    { time: '14:00–19:00', label: 'M3 · Afternoon Milonga' },
    { time: '21:00–03:00', label: '★ M4 · Grand Milonga 그랜드 밀롱가', feat: true },
  ]},
  { day: '10/5', dow: 'MON', items: [
    { time: '11:00–14:00', label: 'City Tour · 춘천 시티 투어' },
    { time: '15:00–20:00', label: 'M5 · Farewell Milonga' },
    { time: '20:00–24:00', label: '★ M6 · After Party & Milonga', feat: true },
  ]},
];
```

#### 1.5 DJs

| | |
|---|---|
| 배경 | `var(--color-cream)` |
| 헤드 | "여섯 명의 DJ" Noto Serif KR 900 48px ink-soft / "Six DJs" Playfair italic 28px gold |
| 그리드 | 6 카드, 데스크톱 3×2, 태블릿 2×3, 모바일 2×3 (작게) |
| 카드 | 원형 크롭 (radius 50%, aspect-ratio 1) + 라벨 카드 외부 |
| 사진 | `object-fit: cover; object-position: center 25%` (얼굴 위치 보존) |
| 라벨 | 이름 (Inter 700 16px ink) + 국가 (Inter 500 12px stone-500) — 가운데 정렬 |
| Hover | 사진 살짝 saturate(1.15) + scale(1.03), 0.3s ease |

**DJ 데이터**:

```js
const djs = [
  { name: 'Hagoon',         country: 'Korea',     img: 'dj-hagoon.jpg' },
  { name: 'Stone',          country: 'Korea',     img: 'dj-stone.jpg' },
  { name: 'Carlos',         country: 'Korea',     img: 'dj-carlos.jpg' },
  { name: 'Becca',          country: 'Korea',     img: 'dj-becca.jpg' },
  { name: 'Wang Wei',       country: 'China',     img: 'dj-wangwei.jpg' },
  { name: 'Nathalie Cheng', country: 'Hong Kong', img: 'dj-natalie.jpg' },
];
```

#### 1.6 Venue

| | |
|---|---|
| 배경 | `var(--color-warm-white)` |
| 좌측 50% | 정보 |
| └ 한글명 | "춘천 봄내체육관" Noto Serif KR 900 56px ink-soft |
| └ 영문명 | "CHUNCHEON BOMNAE COMPLEX" Inter 700 14px 0.32em burgundy |
| └ 주소 | "강원특별자치도 춘천시 …" Noto Sans KR 500 16px |
| └ 부가 | 서울에서 ITX 60분, 주차 200대, 워크샵홀 9개 — 아이콘 + 텍스트 리스트 |
| 우측 50% | 호수 사진 풀블리드 (placeholder OK) |
| Hover | (지도 카드 추가 가능 시) |

#### 1.7 Tickets

| | |
|---|---|
| 배경 | `var(--color-mustard)` |
| 그리드 | 3 카드, gap 24px |
| 카드 | warm-white 배경, radius 12px, padding 40, border 2px solid (default stone-300, hover burgundy) |
| 카드 헤드 | 패스 이름 Noto Serif KR 900 32px ink-soft + 가격 Playfair 900 48px burgundy |
| 본문 | 포함 항목 체크리스트 (Noto Sans KR 500 15px) |
| CTA | "선택" 풀폭 burgundy 버튼 |

**패스 데이터**:

```js
const passes = [
  { name: 'Full Pass',     price: '₩380,000', includes: ['모든 밀롱가', '두 오케스트라 콘서트', '시티투어', '환영 만찬'] },
  { name: 'Milonga Pass',  price: '₩250,000', includes: ['모든 밀롱가 6회', '두 오케스트라 콘서트'] },
  { name: 'Concert Only',  price: '₩60,000',  includes: ['두 오케스트라 합동 콘서트 (10/3 13:00)'] },
];
```

#### 1.8 Footer

| | |
|---|---|
| 배경 | `var(--color-night)` (#0E0814) |
| 상단 | 반도네온 dark 일러스트 가운데 (height 200px) |
| 가운데 | "춘천에서 만나요 · See you in Chuncheon" 한 줄 — Playfair italic 32px gold |
| 좌측 컬럼 | 주최 — 춘천시 로고 SVG + KCCTF 로고 + "주최 · 춘천시 / 강원땅고협회" |
| 가운데 컬럼 | 사이트맵 — 라인업, 일정, 등록, 장소, 문의 |
| 우측 컬럼 | 연락처 — 이메일, 인스타그램(@kcctf_official), kcctf.org |
| 하단 | © 2026 Chuncheon International Tango Festival. All rights reserved. |

---

## Interactions & Behavior

### Animations
- 섹션 진입 시 fade + translateY 16px → 0, 600ms `cubic-bezier(0.22, 1, 0.36, 1)`. IntersectionObserver 기반.
- 사진 hover: scale(1.03) + saturate(1.15), 300ms ease
- CTA hover: 배경색 burgundy → burgundy-deep, 180ms
- Nav 링크 hover: 색상 + underline 폭 0 → 100%, 200ms
- 스크롤 시 Nav 섀도 추가 (`box-shadow: 0 4px 16px rgba(0,0,0,0.04)`)

### Routing & Navigation
- SPA 또는 SSR 한 페이지 + 앵커 스크롤 (#lineup, #schedule 등)
- "패스 예약하기" → 외부 결제 페이지 (URL TBD, 우선 `#tickets`로 스크롤)
- 언어 토글: KR ↔ EN. URL 패턴 `/` (KR 기본) ↔ `/en`. 모든 카피 i18n key로

### State
- `activeScheduleDay`: '10/3' | '10/4' | '10/5'
- `language`: 'ko' | 'en'

### Responsive
- 1440+ : 디자인 기준 (full hifi)
- 1024–1439: 약간 축소, 그리드 유지
- 768–1023: 2열 → 1열 전환 시작 (Hero 한글/일러스트 세로 스택, DJ 2×3 → 2×3)
- 480–767: 모바일. Nav 햄버거. Hero 한글 사이즈 클램프로 자연 축소
- ~479: 최소. DJ 2×3 유지, 사진/카드 1열

---

## Assets Inventory

| 카테고리 | 파일 | 비고 |
|---|---|---|
| Logo | `logo-official-dark.png`, `logo-official-light.png` | 공식 |
| Logo | `logo-mark.svg`, `logo-stacked-kr.svg`, `logo-horizontal-en.svg` | 보조 |
| Illustration | `illustration-bandoneon-cream.png` | Hero용 (밝은 배경) |
| Illustration | `illustration-bandoneon-dark.png` | Footer용 (어두운 배경) |
| Pattern | `grain.svg`, `pattern-stars.svg`, `ornament-divider.svg` | 텍스처/장식 |
| Photo · Orchestra | `orq-misteriosa.jpg`, `orq-tango-bardo.jpg` | 오케스트라 메인 |
| Photo · DJ | `dj-hagoon.jpg`, `dj-stone.jpg`, `dj-carlos.jpg`, `dj-becca.jpg`, `dj-wangwei.jpg`, `dj-natalie.jpg` | 6명 |
| Reference | `final-poster-v1.png` | 컬러·타이포 기준 |
| Reference | `reference-brochure-front.jpeg`, `reference-brochure-back.jpeg`, `final-brochure-v1.pdf` | 인쇄 브로셔 |

> 일부 추가 자산(작년 공연 사진 등)은 한글 파일명 처리 이슈로 이번 패키지에 미포함. 필요 시 직접 업로드 받아 추가하세요.

---

## Files in This Bundle

```
design_handoff_homepage/
├── README.md                              ← 이 문서
├── tokens/
│   ├── colors.css                         ← CSS 변수
│   └── tailwind.config.snippet.js         ← Tailwind 설정 스니펫
├── prototypes/
│   ├── marketing-site/                    ← v1 (에디토리얼 톤, 한글 우선)
│   │   ├── index.html
│   │   └── *.jsx
│   └── marketing-site-v2/                 ← v2 (호숫가 다크 무드, 풀블리드)
│       ├── index.html
│       └── *.jsx
├── brochure-final/
│   ├── final-poster-v1.png                ← 최종 포스터 (디자인 기준)
│   └── Brochure Square v2.html            ← 정사각 v2 시안
└── assets/                                ← 모든 이미지/SVG
    ├── illustration-bandoneon-cream.png
    ├── illustration-bandoneon-dark.png
    ├── logo-official-*.png
    ├── orq-*.jpg
    ├── dj-*.jpg
    └── ...
```

---

## Implementation Notes for Claude Code

1. **i18n 우선 설계** — 모든 카피를 `ko`/`en` 객체로 분리. 한글 텍스트는 한국어 폰트, 영문은 영문 폰트로 자동 매핑되도록 `lang="ko"` / `lang="en"` 활용.
2. **반도네온 일러스트는 PNG** — 향후 SVG로 받을 수도 있으니 컴포넌트화 (`<BandoneonIllustration variant="cream|dark" />`).
3. **사진 최적화** — Next.js라면 `<Image>` 사용. 오케스트라 사진은 `object-fit: contain` 필수 (인원 잘리면 안 됨). DJ 사진은 cover + center 25%.
4. **다이아몬드 패턴** — CSS `background-image: linear-gradient(45deg, ...)` 또는 인라인 SVG. 별도 PNG 만들지 말 것 (해상도 손실).
5. **폰트 로딩** — Google Fonts (`Noto Serif KR`, `Noto Sans KR`, `Playfair Display`, `Inter`, `Oswald`). Next.js `next/font/google` 권장.
6. **애니메이션** — Framer Motion 권장. 섹션 진입만, 과하지 않게.
7. **접근성** — 모든 사진에 의미 있는 alt 텍스트 (이름·역할). 색상 대비 WCAG AA 이상.
8. **퍼포먼스** — Hero 일러스트는 priority 로드, 나머지 lazy. 사진 webp/avif 변환.
