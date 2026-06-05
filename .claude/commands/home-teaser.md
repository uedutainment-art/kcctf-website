---
description: 홈페이지를 '준비된 섹션만' 티저 상태로 — 미완 섹션·예약 CTA를 환경변수 플래그로 숨김 (삭제 아님)
---

# 홈 티저 적용

홈을 **지금 보여줘도 되는 섹션만** 노출하는 *티저(soft-launch)* 상태로 만든다.
미완성 섹션은 **환경변수 플래그로 숨기고**, 정보가 들어오면 **플래그만 켜면** 공개되게 한다.
기존 패턴 `process.env.NEXT_PUBLIC_SHOW_X === 'true'` (이미 `components/Venue.tsx`·`components/Tickets.tsx`에 있음)을 그대로 따른다.

## 제약 (반드시)
- 컴포넌트·콘텐츠·이미지를 **삭제하지 말 것.** 플래그로만 on/off.
- 데이터/문구를 **새로 지어내지 말 것.** 변경마다 **한국어 주석**.
- `NEXT_PUBLIC_*` 는 빌드타임 인라인이므로 클라이언트 컴포넌트에서도 사용 가능.

---

## 1) 환경변수 — `.env.local` 과 `.env.example` 둘 다에 추가 (한국어 주석)

```bash
# 홈 티저 — 미완성 섹션 숨김 (정보 들어오면 true)
NEXT_PUBLIC_SHOW_CITY_GUIDE=false      # 춘천 즐기기
NEXT_PUBLIC_SHOW_LOGISTICS=false       # 운영 안내(셔틀·시티투어)
NEXT_PUBLIC_SHOW_TICKETS=false         # 참가비/티켓 섹션
NEXT_PUBLIC_REGISTRATION_OPEN=false    # 예약하기 CTA 전체(Nav·Floating·Tickets)
```

## 2) `app/[locale]/page.tsx` — 섹션 게이팅

상단에서 플래그를 읽어 CityGuide·Logistics·Tickets 를 `=== 'true'` 일 때만 렌더:

```tsx
export default function HomePage() {
  // 홈 티저 — 미완성 섹션은 플래그로 숨김
  const showCityGuide = process.env.NEXT_PUBLIC_SHOW_CITY_GUIDE === 'true';
  const showLogistics = process.env.NEXT_PUBLIC_SHOW_LOGISTICS === 'true';
  const showTickets   = process.env.NEXT_PUBLIC_SHOW_TICKETS === 'true';
  return (
    <>
      <Hero />
      <FeelingStrip />
      <Orchestras />
      <Djs />
      <Dancers />
      <TheNights />
      <Schedule />
      <Venue />
      {showCityGuide && <CityGuide />}
      <Accommodation />
      {showLogistics && <Logistics />}
      {showTickets && <Tickets />}
      <FAQ />
      <AfterKCCTF />
    </>
  );
}
```

## 3) 예약 CTA 게이팅 — `NEXT_PUBLIC_REGISTRATION_OPEN === 'true'` 일 때만

**`components/Nav.tsx`**
- 추가: `const registrationOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === 'true';`
- 추가: `const showCityGuide = process.env.NEXT_PUBLIC_SHOW_CITY_GUIDE === 'true';`
- `navItems` 에서 숨긴 섹션 링크 제외:
  ```tsx
  const navItems = (t.raw('items') as NavItem[])
    .filter((item) => showCityGuide || item.href !== '#city-guide');
  ```
- 데스크탑(현재 ~124행)·모바일(현재 ~218행) `RegisterButton` 두 곳을 `{registrationOpen && ( ... )}` 로 감쌈.

**`components/FloatingCTA.tsx`**
- 추가: `const registrationOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === 'true';`
- 모든 hook 뒤, `return (` 직전에: `if (!registrationOpen) return null;`

**`components/Tickets.tsx`**
- 추가: `const registrationOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === 'true';`
- 카드 안 `RegisterButton`(현재 ~105행)을 조건부로:
  ```tsx
  {registrationOpen ? (
    <RegisterButton href={registerUrl} className="...기존 className 유지...">
      {earlybirdItem.cta} →
    </RegisterButton>
  ) : (
    <div className="block rounded bg-warm-white/90 py-4 text-center font-en-body text-[14px] font-bold uppercase tracking-[0.2em] text-burgundy/70">
      {isKo ? '등록 오픈 예정' : 'Registration opening soon'}
    </div>
  )}
  ```
  (티켓 섹션 자체는 `SHOW_TICKETS`로 숨겨지지만, 나중에 '가격만 노출' 조합을 위해 내부 버튼도 게이팅)

## 4) 내비/탭 앵커 정리

**`components/SectionTabs.tsx`** — `#tickets` 탭을 `SHOW_TICKETS` false면 제외:
```tsx
const showTickets = process.env.NEXT_PUBLIC_SHOW_TICKETS === 'true';
// 렌더 시: TABS.filter((tab) => showTickets || tab.href !== '#tickets')
```
(스크롤스파이는 누락 요소를 기존 `if (el && ...)` 로 안전 처리 — 추가 작업 불필요)

`components/QuickLinks.tsx` 가 숨긴 섹션(#city-guide, #tickets) 앵커를 쓰면 같은 방식으로 제외.

## 5) 검증
- `npm run build` 통과 (타입·빌드 에러 없음)
- `npm run dev` 로 `/` 와 `/en` 육안 확인:
  - **표시**: Hero · 오케스트라 · DJ · 댄서 · 작년장면 · 프로그램 · 장소 · 숙소 · FAQ · 그후
  - **숨김**: 춘천즐기기 · 운영안내 · 티켓/참가비 · 예약하기 버튼(헤더·플로팅·티켓)
  - 내비/탭에 죽은 앵커 없음, 콘솔 에러 없음
- 결과를 요약.

## 6) 마무리
- 빌드 통과 후 커밋: `feat: 홈 티저 — 미완 섹션 숨김(춘천즐기기·운영안내·티켓·예약)`
- 참고: 워킹트리에 이미 **DJ 배정 정정(`data/festival.ts`) + 등록 모달 수정(`components/RegisterModal.tsx`, `.env.example`)** 이 있을 수 있음 → 별도 커밋 `fix: DJ 배정 정정 + 등록 모달 임베드 규약·URL 설정화` 로 먼저 정리.
- push 시 `.git/index.lock` 에러가 나면 그 파일을 지우고 재시도.

## 나중에 켜는 법
정보가 확보되면 코드 수정 없이 플래그만 `true` (로컬 `.env.local` + **Vercel 환경변수** 둘 다 → redeploy):
`SHOW_CITY_GUIDE`(추천 장소) · `SHOW_LOGISTICS`(셔틀·투어) · `SHOW_TICKETS`+`REGISTRATION_OPEN`(등록 오픈).
