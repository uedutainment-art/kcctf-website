import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isKo = locale === 'ko';
  return {
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
    </NextIntlClientProvider>
  );
}
