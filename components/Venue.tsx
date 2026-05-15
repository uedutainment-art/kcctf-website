import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Venue() {
  const t = useTranslations('venue');
  const showConcertVenue = process.env.NEXT_PUBLIC_SHOW_CONCERT_VENUE === 'true';

  const features = t.raw('features') as { icon: string; text: string }[];

  return (
    <section
      id="venue"
      className="bg-night text-warm-white"
      style={{
        background:
          'linear-gradient(180deg, #0E0814 0%, #160611 52%, #0E0814 100%)',
      }}
    >
      <div className="mx-auto max-w-[1600px] px-0">

        {/* Header */}
        <div className="mx-auto max-w-[920px] px-6 pt-16 pb-10 text-center md:px-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-warm-white leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-en-display italic text-[24px] text-gold mb-6">
            {t('subtitleEn')}
          </p>
          <p className="font-kr-serif text-[19px] leading-[1.6] text-warm-white/78 whitespace-pre-line md:text-[22px]">
            {t('tagline')}
          </p>
        </div>

        {/* Full-width scale photo */}
        <div className="mx-auto px-0 md:px-10">
          <div className="relative min-h-[520px] overflow-hidden border-y border-warm-white/10 bg-night md:min-h-[70vh] md:border md:border-warm-white/10 md:shadow-[10px_10px_0_#8B1A2B]">
            <Image
              src="/images/venue-bomnae-dance.jpg"
              alt="봄내체육관에서 많은 댄서들이 함께 춤추는 장면"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 54%' }}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-night/88 via-night/32 to-night/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-night/82 via-transparent to-night/20" />

            <div className="absolute left-0 right-0 top-[18%] p-6 md:top-1/2 md:max-w-[760px] md:-translate-y-1/2 md:p-12 lg:p-16">
              <p className="font-en-body font-black text-[11px] tracking-[0.42em] uppercase text-gold mb-3">
                BOMNAE COMPLEX
              </p>
              <p
                className="font-kr-serif font-black text-warm-white leading-[1.15] tracking-[-0.04em] whitespace-pre-line"
                style={{ fontSize: 'clamp(28px, 4.5vw, 60px)' }}
              >
                {t('tagline')}
              </p>
              <a
                href="https://maps.google.com/?q=춘천봄내체육관"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-block border-b-2 border-gold pb-[3px] font-en-body text-[12px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:border-warm-white hover:text-warm-white"
              >
                {t('mapLink')} ↗
              </a>
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-px px-6 py-10 md:grid-cols-4 md:px-10">
          {features.map((f, i) => (
            <div key={i} className="flex min-h-[104px] items-center gap-4 bg-warm-white/[0.055] px-5 py-5 ring-1 ring-warm-white/10">
              <span className="text-2xl" aria-hidden>{f.icon}</span>
              <p className="font-kr-sans text-[15px] leading-[1.45] text-warm-white/82">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Concert venue — flag-gated */}
        {showConcertVenue ? (
          <div className="mx-auto mb-16 max-w-[1320px] border border-warm-white/12 bg-warm-white/[0.055] p-6">
            <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-2">
              CONCERT VENUE
            </p>
            <p className="font-kr-sans text-[15px] text-warm-white/70">
              춘천문화예술회관
            </p>
          </div>
        ) : (
          <div className="mx-auto mb-16 max-w-[1320px] border border-dashed border-warm-white/18 p-5 text-center">
            <p className="font-kr-sans text-[14px] text-warm-white/35">
              {t('concertVenueNote')}
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
