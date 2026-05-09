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
    <section id="hero" className="diamond-bg relative pt-[72px]">
      {/* Grain overlay */}
      <div
        className="grain-overlay absolute inset-0 opacity-30 pointer-events-none"
        aria-hidden
      />

      {/* ── DESKTOP layout (lg+) ──────────────────────────────────────── */}
      <div className="hidden lg:block relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8 pb-0">

          {/* Row 1: text + bandoneon */}
          <div className="grid grid-cols-[1.4fr_1fr] gap-6 items-center mb-6">

            {/* Left: text */}
            <div className="pt-4 flex flex-col gap-5">
              <p className="font-en-body font-bold text-[10px] tracking-[0.4em] uppercase text-burgundy">
                <span className="text-gold">★</span>{' '}
                {t('eyebrow')}{' '}
                <span className="text-gold">★</span>
              </p>

              <h1
                className="font-kr-serif font-black text-ink-soft leading-[0.92] tracking-[-0.06em]"
                style={{ fontSize: 'clamp(56px, 7vw, 92px)' }}
              >
                {t('titleLine1')}<br />
                {t('titleLine2')}
              </h1>

              <p className="font-en-body font-bold text-[18px] tracking-[0.04em] text-burgundy leading-[1.2] whitespace-pre-line">
                {t('subtitleEn')}
              </p>

              <p className="font-kr-serif font-medium text-[17px] text-ink-soft leading-[1.55] max-w-[460px] whitespace-pre-line">
                {t('tagline')}
              </p>

              {/* USP band */}
              <div className="inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[11px] tracking-[0.18em] uppercase px-5 py-[10px] shadow-[4px_4px_0_#4A2418] self-start">
                <span className="text-gold-soft">★</span>
                {t('uspBand')}
                <span className="text-gold-soft">★</span>
              </div>
            </div>

            {/* Right: bandoneon */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/illustration-bandoneon-cream.png"
                alt="반도네온 일러스트"
                width={340}
                height={340}
                style={{ maxWidth: '340px', width: '100%', height: 'auto' }}
                priority
              />
            </div>
          </div>

          {/* Row 2: stats + date band + CTA */}
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

      {/* ── MOBILE layout (< lg) ─────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-6 pt-5 pb-0">

        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-burgundy text-center mb-3">
          <span className="text-gold">★</span>{' '}
          {t('eyebrow')}{' '}
          <span className="text-gold">★</span>
        </p>

        <h1
          className="font-kr-serif font-black text-ink-soft leading-[0.92] tracking-[-0.06em] text-center mb-2"
          style={{ fontSize: 'clamp(38px, 11vw, 56px)' }}
        >
          {t('titleLine1')}<br />
          {t('titleLine2')}
        </h1>

        <p className="font-en-body font-bold text-[11px] tracking-[0.04em] text-burgundy text-center leading-[1.3] mb-4 whitespace-pre-line">
          {t('subtitleEn')}
        </p>

        {/* USP band */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-burgundy text-warm-white font-en-body font-bold text-[9px] tracking-[0.16em] uppercase px-4 py-2">
            <span className="text-gold-soft">★</span>
            {t('uspBand')}
            <span className="text-gold-soft">★</span>
          </div>
        </div>

        {/* Bandoneon */}
        <div className="flex justify-center mb-3 opacity-80" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-cream.png"
            alt=""
            width={130}
            height={130}
            style={{ width: '130px', height: 'auto' }}
          />
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
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type StatsRowProps = {
  stats: { num: string; label: string }[];
};

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
          <div className="font-en-display italic font-black text-[36px] text-burgundy leading-none">
            {num}
          </div>
          <div className="font-en-body font-bold text-[9px] tracking-[0.25em] uppercase text-ink-soft mt-1">
            {label}
          </div>
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
