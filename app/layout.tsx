import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notoSerifKR, playfairDisplay, inter, oswald } from '@/lib/fonts';
import './globals.css';

// og:image 등 절대경로 기준 도메인. env 없으면 라이브 도메인으로 고정.
// (이전 기본값이 vercel/5047d라 카톡 og 이미지가 kcctf-5047d.web.app/og-image.jpg → 404로 깨졌음. 2026-06-07 정정)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '춘천국제탱고페스티벌 2026 — KCTF',
  description: '부에노스 아이레스에서 온 두 오케스트라. Misteriosa Buenos Aires와 Tango Bardo. 2026.10.03–10.05 춘천 봄내체육관.',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: 'KCTF',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '춘천국제탱고페스티벌 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={[
        notoSerifKR.variable,
        playfairDisplay.variable,
        inter.variable,
        oswald.variable,
      ].join(' ')}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
