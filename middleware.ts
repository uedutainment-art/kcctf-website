import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// ── 도메인 전환: kcctf.org → kctf.kr ────────────────────────────────────────
// ⚠️ CANONICAL_REDIRECT 는 아래 3가지가 모두 끝난 뒤에만 true 로 켠다.
//    ① 가비아에서 kctf.kr 네임서버·A레코드 설정  ② Firebase 커스텀 도메인 추가
//    ③ https://kctf.kr 이 실제로 200 응답 (SSL 발급 완료)
//    먼저 켜면 전 세계 방문자가 아직 죽어 있는 도메인으로 튕긴다.
//
// ⚠️ kcctf.org 는 행사가 끝날 때까지 절대 해지·DNS 삭제 금지.
//    - 팜플릿 QR(kcctf.org/program-note)과 이미 발송된 문자·메일 링크가 살아 있어야 함
//    - info@kcctf.org 가 Google Workspace 메일이라 MX 레코드가 org 에 있음
const CANONICAL_REDIRECT = false;
const CANONICAL_HOST = 'kctf.kr';
const LEGACY_HOSTS = new Set(['kcctf.org', 'www.kcctf.org', 'www.kctf.kr']);
// 302(임시)로 시작한다. 301 은 브라우저가 영구 캐시해서, 잘못 켰을 때 되돌려도
// 이미 접속한 사람은 계속 튕긴다. 며칠 안정적으로 돌아가는 걸 확인한 뒤 301 로 올릴 것.
const REDIRECT_STATUS = 302;

export default function middleware(request: NextRequest) {
  // 구 도메인 접속을 새 도메인으로 — 경로·쿼리를 그대로 보존해야 QR·기존 링크가 안 깨진다
  if (CANONICAL_REDIRECT) {
    const host = request.headers.get('host')?.split(':')[0].toLowerCase();
    if (host && LEGACY_HOSTS.has(host)) {
      const url = new URL(request.url);
      url.protocol = 'https:';
      url.host = CANONICAL_HOST;
      url.port = '';
      return NextResponse.redirect(url, REDIRECT_STATUS);
    }
  }

  const response = intlMiddleware(request);

  // Firebase Hosting(web frameworks) SSR가 컨테이너 포트(:8080)를 redirect Location에
  // 박아 내보내는 문제 보정 — 절대 URL 호스트 뒤 포트를 제거 (localhost는 dev 위해 보존)
  const location = response.headers.get('location');
  if (location) {
    const fixed = location.replace(/^(https?:\/\/(?!localhost)[^/:?#]+):\d+/i, '$1');
    if (fixed !== location) {
      response.headers.set('location', fixed);
    }
  }

  return response;
}

export const config = {
  // Match all pathnames except Next.js internals and static files
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
