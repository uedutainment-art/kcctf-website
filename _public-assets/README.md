# _public-assets/ — 빌드 시 변환할 source 파일

이 폴더의 파일들은 **빌드 과정에서 `public/` 폴더로 변환·복사**됩니다. Claude Code가 처리해 줍니다.

## 파일 목록

### `favicon-source.svg`
- **출처**: `_design/assets/logo-mark.svg`를 복사
- **변환 대상**:
  - `public/favicon.ico` (16×16, 32×32 multi-size)
  - `public/favicon-32.png` (32×32)
  - `public/apple-touch-icon.png` (180×180)
  - `public/android-chrome-192.png` (192×192)
  - `public/android-chrome-512.png` (512×512)

### `og-image-source.jpeg`
- **출처**: `_design/assets/reference-poster-2026.jpeg`를 복사 (포스터 원본)
- **변환 대상**:
  - `public/og-image.jpg` (1200×630, 카톡/SNS 공유용)
  - `public/twitter-card.jpg` (1200×675, 트위터)

## 변환 명령 (Claude Code가 빌드 시)

`sharp` 라이브러리 사용 권장:

```bash
pnpm add -D sharp
```

```typescript
// scripts/process-assets.ts
import sharp from 'sharp';

// Favicon
await sharp('_public-assets/favicon-source.svg')
  .resize(180, 180)
  .toFile('public/apple-touch-icon.png');

await sharp('_public-assets/favicon-source.svg')
  .resize(32, 32)
  .toFile('public/favicon-32.png');

// OG image (포스터 → 1200×630 크롭)
await sharp('_public-assets/og-image-source.jpeg')
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 85 })
  .toFile('public/og-image.jpg');
```

또는 Claude Code에 명령:
```
_public-assets/favicon-source.svg와 og-image-source.jpeg를
sharp로 적절한 크기로 변환해서 public/에 넣어줘.
```

## OG 이미지 검증

빌드 후 다음으로 미리보기 확인:
- https://www.opengraph.xyz/url/https://kcctf.org
- 카톡으로 본인에게 URL 보내봤을 때 미리보기 정상 출력되는지

## 비고

포스터를 1200×630 크롭하면 텍스트가 잘릴 수 있어요. 만약 부적합하면:
- Hero 영역 캡처해서 OG 이미지 별도 디자인
- 또는 반도네온 일러스트 + 한글 타이틀 + 날짜만 있는 단순 디자인
