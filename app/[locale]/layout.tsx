import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import RegisterModal from '@/components/RegisterModal';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
    title: isKo
      ? '춘천국제탱고페스티벌 2026 — KCCTF'
      : 'Chuncheon International Tango Festival 2026 — KCCTF',
    description: isKo
      ? '부에노스 아이레스에서 온 두 오케스트라. Misteriosa Buenos Aires와 Tango Bardo. 2026.10.03–10.05 춘천 봄내체육관.'
      : 'Two orchestras from Buenos Aires. Misteriosa Buenos Aires and Tango Bardo, live in Chuncheon. Oct 3–5, 2026.',
    alternates: {
      canonical: isKo ? BASE_URL : `${BASE_URL}/en`,
      languages: {
        'ko-KR': BASE_URL,
        'en-US': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      locale: isKo ? 'ko_KR' : 'en_US',
      alternateLocale: isKo ? 'en_US' : 'ko_KR',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <RegisterModal />
    </NextIntlClientProvider>
  );
}
