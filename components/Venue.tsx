import { useTranslations } from 'next-intl';

export default function Venue() {
  const t = useTranslations('venue');
  const showConcertVenue = process.env.NEXT_PUBLIC_SHOW_CONCERT_VENUE === 'true';

  const features = t.raw('features') as { icon: string; text: string }[];

  return (
    <section id="venue" className="bg-warm-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink-soft leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-en-display italic text-[22px] text-gold mb-4">
            {t('subtitleEn')}
          </p>
        </div>

        {/* Main venue card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: info */}
          <div>
            <p className="font-kr-serif font-medium text-[18px] text-ink-soft leading-[1.6] mb-6 whitespace-pre-line">
              {t('tagline')}
            </p>

            <p className="font-kr-sans text-[14px] text-charcoal/60 mb-6">
              {t('address')}
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-xl w-7 shrink-0" aria-hidden>{f.icon}</span>
                  <span className="font-kr-sans text-[15px] text-charcoal/80">{f.text}</span>
                </li>
              ))}
            </ul>

            {/* Map link placeholder */}
            <a
              href="https://maps.google.com/?q=춘천봄내체육관"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-en-body font-bold text-[12px] tracking-[0.18em] uppercase text-burgundy border-b-2 border-burgundy pb-[2px] hover:text-burgundy-deep hover:border-burgundy-deep transition-colors"
            >
              {t('mapLink')} ↗
            </a>
          </div>

          {/* Right: photo placeholder — diamond mustard pattern */}
          <div
            className="diamond-bg rounded-lg overflow-hidden border-2 border-ink-soft/15 flex flex-col items-center justify-center gap-3"
            style={{ minHeight: '280px' }}
          >
            <span className="font-en-display italic font-black text-[48px] text-ink-soft/20 leading-none" aria-hidden>★</span>
            <p className="font-kr-sans text-[14px] text-ink-soft/40 text-center px-6">
              Photo Coming Soon
            </p>
          </div>
        </div>

        {/* Concert venue — flag-gated */}
        {showConcertVenue ? (
          <div className="mt-10 p-6 bg-cream rounded-lg border-2 border-ink-soft/10">
            <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-2">
              CONCERT VENUE
            </p>
            <p className="font-kr-sans text-[15px] text-charcoal/70">
              춘천문화예술회관
            </p>
          </div>
        ) : (
          <div className="mt-10 p-5 border-2 border-dashed border-ink-soft/20 rounded-lg text-center">
            <p className="font-kr-sans text-[14px] text-charcoal/40">
              {t('concertVenueNote')}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
