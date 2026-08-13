import Image from 'next/image';
import { useTranslations } from 'next-intl';

type IconKey = 'transit' | 'sound' | 'floor' | 'parking';

const SVG_BASE = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  width: 20,
  height: 20,
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
};

function VenueIcon({ iconKey }: { iconKey: IconKey }) {
  switch (iconKey) {
    case 'transit':
      return (
        <svg {...SVG_BASE}>
          {/* Train body */}
          <rect x="2" y="5" width="18" height="12" rx="2" />
          {/* Window band */}
          <line x1="2" y1="11" x2="20" y2="11" />
          {/* Cab windows */}
          <rect x="5" y="7" width="4" height="3" rx="0.5" />
          <rect x="11" y="7" width="4" height="3" rx="0.5" />
          {/* Wheels */}
          <circle cx="6.5" cy="19" r="1.5" />
          <circle cx="17.5" cy="19" r="1.5" />
          {/* Wheel struts */}
          <line x1="6.5" y1="17" x2="6.5" y2="18" />
          <line x1="17.5" y1="17" x2="17.5" y2="18" />
        </svg>
      );
    case 'sound':
      return (
        <svg {...SVG_BASE}>
          {/* Speaker cabinet */}
          <rect x="2" y="8" width="5" height="8" rx="0.75" />
          {/* Cone */}
          <path d="M7 8.5 L13 4 L13 20 L7 15.5" />
          {/* Sound arcs */}
          <path d="M16 9 a4.5 4.5 0 0 1 0 6" />
          <path d="M18.5 6.5 a8 8 0 0 1 0 11" />
        </svg>
      );
    case 'floor':
      return (
        <svg {...SVG_BASE}>
          {/* Four corner brackets — open floor/space */}
          <path d="M3 9 L3 3 L9 3" />
          <path d="M15 3 L21 3 L21 9" />
          <path d="M21 15 L21 21 L15 21" />
          <path d="M9 21 L3 21 L3 15" />
        </svg>
      );
    case 'parking':
      return (
        <svg {...SVG_BASE}>
          {/* Drawn P letterform — vertical stroke + bowl */}
          <line x1="8" y1="4" x2="8" y2="20" />
          <path d="M8 4 h5 a4.5 4.5 0 0 1 0 9 H8" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Venue() {
  const t = useTranslations('venue');
  const showConcertVenue = process.env.NEXT_PUBLIC_SHOW_CONCERT_VENUE === 'true';

  const features = t.raw('features') as { iconKey: IconKey; eyebrow: string; text: string }[];
  const cv = t.raw('concertVenue') as {
    name: string;
    nameEn: string;
    intro: string;
    address: string;
    concert: string;
    tags: string[];
    officialLink: string;
  };

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

        {/* Feature chips */}
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-3 px-6 py-10 md:grid-cols-4 md:px-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="group flex min-h-[112px] items-center gap-4 rounded-sm border-t-2 border-gold/50 bg-gold/[0.06] px-5 py-5 ring-1 ring-gold/[0.12] transition-all duration-300 hover:-translate-y-[2px] hover:border-gold hover:bg-burgundy/[0.10] hover:ring-burgundy/[0.28]"
            >
              {/* Circular gold badge with stroke SVG icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 text-gold transition-colors duration-300 group-hover:border-gold-soft group-hover:text-gold-soft">
                <VenueIcon iconKey={f.iconKey} />
              </div>
              {/* Text stack */}
              <div>
                <p className="mb-[3px] font-en-body text-[9px] font-bold uppercase tracking-[0.35em] text-gold/65 transition-colors duration-300 group-hover:text-gold-soft/80">
                  {f.eyebrow}
                </p>
                <p className="font-kr-sans text-[14px] leading-[1.45] text-warm-white/85 transition-colors duration-300 group-hover:text-warm-white">
                  {f.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Concert venue — flag-gated */}
        {showConcertVenue ? (
          <div className="mx-auto mb-16 max-w-[1320px] overflow-hidden border border-warm-white/12 md:shadow-[8px_8px_0_#8B1A2B]">
            {/* 문화예술회관 사진 */}
            <div className="relative">
              <Image
                src="/images/venue-arts-center.jpg"
                alt="춘천문화예술회관 외관 — 황혼에 빛나는 아치와 조명"
                width={1000}
                height={498}
                className="w-full object-cover"
                style={{ maxHeight: '420px', objectPosition: 'center 42%' }}
                sizes="(max-width: 1320px) 100vw, 1320px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
            </div>
            <div className="bg-warm-white/[0.05] p-7 md:p-10">
            <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
              {/* 소개 */}
              <div className="max-w-[720px]">
                <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                  CONCERT VENUE
                </p>
                <p className="font-kr-serif font-black text-warm-white text-[26px] leading-tight tracking-[-0.02em] md:text-[32px]">
                  {cv.name}
                </p>
                <p className="font-en-body text-[12px] tracking-[0.12em] uppercase text-warm-white/45 mt-1">
                  {cv.nameEn}
                </p>
                <p className="font-kr-sans text-[15px] leading-[1.75] text-warm-white/78 mt-5">
                  {cv.intro}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cv.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-gold/40 bg-gold/[0.06] px-3.5 py-1 font-kr-sans text-[12px] font-bold text-gold-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {/* 맥락 · 주소 · 지도 */}
              <div className="border-t border-warm-white/12 pt-5 md:min-w-[260px] md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
                <p className="font-kr-sans text-[14px] leading-relaxed text-warm-white/78">
                  <span className="text-gold-soft" aria-hidden>🎼</span> {cv.concert}
                </p>
                <p className="mt-3 font-kr-sans text-[13px] leading-relaxed text-warm-white/50">
                  {cv.address}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
                  <a
                    href="https://maps.google.com/?q=춘천문화예술회관"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-b-2 border-gold pb-[3px] font-en-body text-[12px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:border-warm-white hover:text-warm-white"
                  >
                    {t('mapLink')} ↗
                  </a>
                  <a
                    href="https://www.cccf.or.kr/home/reservation/space/art_center"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-b-2 border-warm-white/40 pb-[3px] font-en-body text-[12px] font-bold uppercase tracking-[0.18em] text-warm-white/70 transition-colors hover:border-warm-white hover:text-warm-white"
                  >
                    {cv.officialLink} ↗
                  </a>
                </div>
              </div>
            </div>
            </div>
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
