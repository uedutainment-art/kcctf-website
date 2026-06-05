import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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
