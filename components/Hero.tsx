import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';

  const stats = [
    { num: t('stats.orchestras.num'), label: t('stats.orchestras.label') },
    { num: t('stats.nights.num'),     label: t('stats.nights.label')     },
    { num: t('stats.milongas.num'),   label: t('stats.milongas.label')   },
    { num: t('stats.djs.num'),        label: t('stats.djs.label')        },
  ];

  return (
    <section id="hero" className="diamond-bg relative pt-[72px] pb-0 overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 opacity-25 pointer-events-none" aria-hidden />

      {/* 춘천시 logo — corner badge, sits above both layouts */}
      <div className="absolute top-[80px] right-4 md:right-8 z-20">
        <Image
          src="/images/KCCTF_logo/춘천시.svg"
          alt="춘천시"
          width={52}
          height={69}
          style={{ height: '52px', width: 'auto' }}
          unoptimized
          priority
        />
      </div>

      {/* ── DESKTOP (lg+) ─────────────────────────────────────────────── */}
      <div className="hidden lg:block relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 pb-0">

          {/* Eyebrow */}
          <p className="font-en-body font-bold text-[11px] tracking-[0.45em] uppercase text-burgundy mb-7">
            <span className="text-gold">★</span>{' '}3RD EDITION · 2026{' '}<span className="text-gold">★</span>
          </p>

          {/* Main grid: title left / KCCTF logo right */}
          <div className="grid grid-cols-[1fr_auto] gap-10 items-start mb-8">

            {/* Left: Korean wordmark + English subtitle */}
            <div>
              {/* 춘천 · 국제탱고 / 페스티벌 */}
              <div className="flex items-start gap-3 mb-5 leading-none">
                <span
                  className="font-kr-serif font-black text-burgundy leading-[0.88] tracking-[-0.04em]"
                  style={{ fontSize: 'clamp(80px, 11vw, 148px)' }}
                >
                  춘천
                </span>
                <div className="flex flex-col justify-center pt-[0.08em]">
                  <span
                    className="font-kr-serif font-black text-burgundy leading-[0.95] tracking-[-0.03em]"
                    style={{ fontSize: 'clamp(38px, 5.2vw, 72px)' }}
                  >
                    국제탱고
                  </span>
                  <span
                    className="font-kr-serif font-black text-burgundy leading-[0.95] tracking-[-0.03em]"
                    style={{ fontSize: 'clamp(38px, 5.2vw, 72px)' }}
                  >
                    페스티벌
                  </span>
                </div>
              </div>

              {/* English subtitle — block caps */}
              <p
                className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em]"
                style={{ fontSize: 'clamp(20px, 2.4vw, 32px)' }}
              >
                CHUNCHEON<br />INTERNATIONAL<br />TANGO FESTIVAL
              </p>
            </div>

            {/* Right: official KCCTF logo illustration */}
            <div className="flex-shrink-0 flex items-start justify-center">
              <Image
                src="/images/KCCTF_logo/KCCTF.svg"
                alt="KCCTF 로고"
                width={212}
                height={280}
                style={{ height: 'clamp(200px, 28vw, 340px)', width: 'auto' }}
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Stats + date band + CTA */}
          <div className="relative z-10">
            <StatsRow stats={stats} />
            <div className="flex items-stretch gap-4">
              <div className="flex-1">
                <DateBand
                  datePrimary={t('dateBand.datePrimary')}
                  dateSecondary={t('dateBand.dateSecondary')}
                  venuePrimary={t('dateBand.venuePrimary')}
                  venueSecondary={t('dateBand.venueSecondary')}
                />
              </div>
              <a
                href={registerUrl}
                className="shrink-0 self-center bg-burgundy text-warm-white font-en-body font-bold text-[16px] tracking-[0.22em] uppercase px-9 py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[2px]"
              >
                {t('cta')}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE (< lg) ─────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-5 pt-6 pb-0">

        {/* Eyebrow */}
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-burgundy text-center mb-4">
          <span className="text-gold">★</span>{' '}3RD EDITION · 2026{' '}<span className="text-gold">★</span>
        </p>

        {/* Title + logo side by side on mobile */}
        <div className="flex items-start gap-2 mb-4">
          <div className="flex-1 min-w-0">
            {/* 춘천 */}
            <div
              className="font-kr-serif font-black text-burgundy leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(64px, 17vw, 96px)' }}
            >
              춘천
            </div>
            {/* 국제탱고 / 페스티벌 */}
            <div
              className="font-kr-serif font-black text-burgundy leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(28px, 7.5vw, 48px)' }}
            >
              국제탱고
            </div>
            <div
              className="font-kr-serif font-black text-burgundy leading-[0.95] tracking-[-0.03em] mb-3"
              style={{ fontSize: 'clamp(28px, 7.5vw, 48px)' }}
            >
              페스티벌
            </div>
            {/* English subtitle */}
            <p
              className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em]"
              style={{ fontSize: 'clamp(13px, 3.2vw, 18px)' }}
            >
              CHUNCHEON<br />INTERNATIONAL<br />TANGO FESTIVAL
            </p>
          </div>

          {/* KCCTF logo — right of title */}
          <div className="flex-shrink-0">
            <Image
              src="/images/KCCTF_logo/KCCTF.svg"
              alt="KCCTF 로고"
              width={212}
              height={280}
              style={{ height: 'clamp(120px, 30vw, 180px)', width: 'auto' }}
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Stats 2×2 */}
        <div className="grid grid-cols-2 gap-[10px] mb-4">
          {stats.map(({ num, label }, i) => (
            <div
              key={label}
              className="bg-warm-white border-2 border-ink-soft px-3 py-[10px] text-center"
              style={{ transform: `rotate(${STAT_ROTATIONS[i]})` }}
            >
              <div className="font-en-display italic font-black text-[28px] text-burgundy leading-none">
                {num}
              </div>
              <div className="font-en-body font-bold text-[8px] tracking-[0.2em] uppercase text-ink-soft mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Date band */}
        <DateBand
          datePrimary={t('dateBand.datePrimary')}
          dateSecondary={t('dateBand.dateSecondary')}
          venuePrimary={t('dateBand.venuePrimary')}
          venueSecondary={t('dateBand.venueSecondary')}
          mobile
        />

        {/* CTA */}
        <div className="py-5">
          <a
            href={registerUrl}
            className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[16px] tracking-[0.22em] uppercase text-center py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[2px]"
          >
            {t('cta')}
          </a>
        </div>
      </div>

      {/* Gradient fade → Orchestras burgundy */}
      <div
        className="relative z-10 h-14 w-full pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, #8B1A2B 100%)' }}
        aria-hidden
      />
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type StatsRowProps = { stats: { num: string; label: string }[] };
const STAT_ROTATIONS = ['-2deg', '1deg', '-1deg', '2deg'];

function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-4 gap-[10px] mb-4">
      {stats.map(({ num, label }, i) => (
        <div
          key={label}
          className="bg-warm-white border-2 border-ink-soft px-3 py-[12px] text-center"
          style={{ transform: `rotate(${STAT_ROTATIONS[i]})` }}
        >
          <div className="font-en-display italic font-black text-[36px] text-burgundy leading-none">{num}</div>
          <div className="font-en-body font-bold text-[9px] tracking-[0.25em] uppercase text-ink-soft mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

type DateBandProps = {
  datePrimary: string;
  dateSecondary: string;
  venuePrimary: string;
  venueSecondary: string;
  mobile?: boolean;
};

function DateBand({ datePrimary, dateSecondary, venuePrimary, venueSecondary, mobile }: DateBandProps) {
  return (
    <div
      className={[
        'bg-ink text-warm-white px-5 py-[14px] shadow-stamp',
        mobile ? 'flex flex-col gap-2' : 'flex items-center justify-between flex-wrap gap-3',
      ].join(' ')}
    >
      <div>
        <p
          className="font-en-display italic font-black text-gold-soft leading-none"
          style={{ fontSize: mobile ? '22px' : '32px' }}
        >
          {datePrimary}
        </p>
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-gold-soft/85 mt-1">
          {dateSecondary}
        </p>
      </div>
      <div className={mobile ? '' : 'text-right'}>
        <p
          className="font-kr-serif font-bold text-warm-white leading-none"
          style={{ fontSize: mobile ? '13px' : '16px' }}
        >
          {venuePrimary}
        </p>
        <p className="font-en-body font-semibold text-[9px] tracking-[0.3em] uppercase text-warm-white/65 mt-1">
          {venueSecondary}
        </p>
      </div>
    </div>
  );
}
