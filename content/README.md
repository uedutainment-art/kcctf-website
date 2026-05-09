# content/ — 한/영 카피

이 폴더의 `ko.json`과 `en.json`은 사이트의 모든 텍스트를 담고 있습니다.

## 구조

두 파일은 **반드시 같은 키 구조**여야 합니다. 한쪽에만 키가 있으면 빌드 실패 또는 런타임 에러.

```
{
  "common": {...},        ← 공통 (페스티벌명, 날짜 등)
  "nav": {...},           ← 네비게이션
  "hero": {...},          ← Hero 섹션
  "orchestras": {...},    ← 두 오케스트라
  "schedule": {...},      ← 일정 (3일)
  "djs": {...},           ← DJ 6명
  "dancers": {...},       ← 댄서팀 4팀
  "venue": {...},         ← 장소
  "tickets": {...},       ← 티켓·가격
  "accommodation": {...}, ← 호텔
  "about": {...},         ← 소개
  "contact": {...},       ← 연락
  "faq": {...},           ← 자주 묻는 질문
  "footer": {...},        ← 푸터
  "meta": {...}           ← SEO 메타
}
```

## 사용 방식 (next-intl)

```typescript
// 컴포넌트에서
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  return <h1>{t('titleLine1')}<br/>{t('titleLine2')}</h1>;
}
```

## 진실의 출처

데이터(가격·일정·라인업)는 `_brief/운영기준.md`에서 가져왔습니다.
충돌 시 운영기준이 정답. content/*.json은 거기서 매핑된 것.

## 변경 절차

`HOW_TO_UPDATE.md` 참조.

## 검증

빌드 시 ko.json과 en.json의 키 구조가 일치하는지 자동 검증됩니다.
누락된 키 있으면 에러.

## 카피 톤

- **한국어**: 호스트가 친구를 부르는, 따뜻하고 환대하는, 격식 X
- **영어**: Warm, romantic, slightly literary, never corporate
- 단정조 ("이렇게 한다") · 과장 X
- 이미지가 말하게 하기 — 카피는 보조

## 절대 금지

- 지원금 / 비용 / 운영 사정 노출
- 임의 데이터 추가 (운영기준에 없는 것)
- "Friday session" 같은 요일 오류 (10/3=토, 10/4=일, 10/5=월)
