import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notoSerifKR, playfairDisplay, inter, oswald } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org'
  ),
  title: '춘천국제땅고페스티벌 2026 — KCCTF',
  description: '부에노스 아이레스에서 온 두 오케스트라. Misteriosa Buenos Aires와 Tango Bardo. 2026.10.03–10.05 춘천 봄내체육관.',
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
