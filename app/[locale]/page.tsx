import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  const tHero = useTranslations('hero');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-mustard">
      <div className="text-center px-6 py-20">
        {/* Eyebrow */}
        <p className="font-en-body text-eyebrow font-bold tracking-[0.4em] text-burgundy uppercase mb-6">
          ★ {tHero('uspBand')} ★
        </p>

        {/* Korean wordmark */}
        <h1 className="font-kr-serif font-black text-ink-soft leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}>
          {t('festival')}
        </h1>

        {/* Year */}
        <p className="font-en-display italic text-gold mt-4"
           style={{ fontSize: 'clamp(24px, 4vw, 48px)' }}>
          {t('year')}
        </p>

        {/* Dates & venue */}
        <p className="mt-8 font-kr-sans text-charcoal text-body">
          {t('datesLong')}
        </p>
        <p className="font-kr-sans text-charcoal text-body">
          {t('venue')}
        </p>

        {/* CTA placeholder */}
        <a
          href="#tickets"
          className="mt-10 inline-block bg-burgundy text-warm-white font-en-body font-bold
                     px-8 py-3 rounded-md shadow-stamp hover:bg-burgundy-deep transition-colors"
        >
          {tHero('cta')}
        </a>
      </div>
    </main>
  );
}
