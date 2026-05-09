import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { notoSerifKR, playfairDisplay, inter, oswald } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org'
  ),
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
