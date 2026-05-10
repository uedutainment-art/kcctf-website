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

      {/* 춘천시 badge — top-right corner */}
      <div className="absolute top-[80px] right-4 md:right-8 z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/KCCTF_logo/춘천시.svg" alt="춘천시" style={{ height: '52px', width: 'auto' }} />
      </div>

      {/* ── DESKTOP (lg+) ─────────────────────────────────────────────── */}
      <div className="hidden lg:block relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-10 pb-0">

          {/* Eyebrow */}
          <p className="font-en-body font-bold text-[11px] tracking-[0.45em] uppercase text-burgundy mb-8">
            <span className="text-gold">★</span>{' '}3RD EDITION · 2026{' '}<span className="text-gold">★</span>
          </p>

          {/* Main: wordmark left / bandoneon right */}
          <div className="grid grid-cols-[1.15fr_1fr] gap-8 items-center mb-8">

            {/* Left — 3-line Korean wordmark + English */}
            <div>
              <div
                className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em]"
                style={{ fontSize: 'clamp(56px, 8vw, 92px)' }}
              >
                춘천
              </div>
              <div
                className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em]"
                style={{ fontSize: 'clamp(56px, 8vw, 92px)' }}
              >
                국제땅고
              </div>
              <div
                className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em] mb-6"
                style={{ fontSize: 'clamp(56px, 8vw, 92px)' }}
              >
                페스티벌
              </div>

              {/* English block caps */}
              <p
                className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em]"
                style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
              >
                CHUNCHEON<br />INTERNATIONAL<br />TANGO FESTIVAL
              </p>
            </div>

            {/* Right — bandoneon illustration */}
            <div className="flex justify-center items-center">
              <Image
                src="/images/illustration-bandoneon-cream.png"
                alt="반도네온 일러스트"
                width={400}
                height={400}
                style={{ width: 'clamp(260px, 36vw, 400px)', height: 'auto', mixBlendMode: 'multiply' }}
                priority
              />
            </div>
          </div>

          {/* USP band */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[12px] tracking-[0.18em] uppercase px-5 py-[10px] shadow-[4px_4px_0_#4A2418]">
              <span className="text-gold-soft">★</span>
              {t('uspBand')}
              <span className="text-gold-soft">★</span>
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
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-burgundy text-center mb-5">
          <span className="text-gold">★</span>{' '}3RD EDITION · 2026{' '}<span className="text-gold">★</span>
        </p>

        {/* 3-line wordmark — centered */}
        <div className="text-center mb-1">
          <div
            className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(52px, 14vw, 80px)' }}
          >
            춘천
          </div>
          <div
            className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(52px, 14vw, 80px)' }}
          >
            국제땅고
          </div>
          <div
            className="font-kr-serif font-black text-burgundy leading-[0.92] tracking-[-0.06em]"
            style={{ fontSize: 'clamp(52px, 14vw, 80px)' }}
          >
            페스티벌
          </div>
        </div>

        {/* Bandoneon — centered, between wordmark and English subtitle */}
        <div className="flex justify-center my-4 opacity-90" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-cream.png"
            alt=""
            width={200}
            height={200}
            style={{ width: '180px', height: 'auto', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* English subtitle — centered */}
        <p
          className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em] text-center mb-5"
          style={{ fontSize: 'clamp(14px, 3.8vw, 20px)' }}
        >
          CHUNCHEON INTERNATIONAL TANGO FESTIVAL
        </p>

        {/* USP band */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 bg-burgundy text-warm-white font-en-body font-bold text-[10px] tracking-[0.16em] uppercase px-4 py-2 shadow-[3px_3px_0_#4A2418]">
            <span className="text-gold-soft">★</span>
            {t('uspBand')}
            <span className="text-gold-soft">★</span>
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
              <div className="font-en-display italic font-black text-[28px] text-burgundy leading-none">{num}</div>
              <div className="font-en-body font-bold text-[8px] tracking-[0.2em] uppercase text-ink-soft mt-1">{label}</div>
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
  datePrimary: string; dateSecondary: string;
  venuePrimary: string; venueSecondary: string;
  mobile?: boolean;
};

function DateBand({ datePrimary, dateSecondary, venuePrimary, venueSecondary, mobile }: DateBandProps) {
  return (
    <div className={['bg-ink text-warm-white px-5 py-[14px] shadow-stamp', mobile ? 'flex flex-col gap-2' : 'flex items-center justify-between flex-wrap gap-3'].join(' ')}>
      <div>
        <p className="font-en-display italic font-black text-gold-soft leading-none" style={{ fontSize: mobile ? '22px' : '32px' }}>
          {datePrimary}
        </p>
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-gold-soft/85 mt-1">{dateSecondary}</p>
      </div>
      <div className={mobile ? '' : 'text-right'}>
        <p className="font-kr-serif font-bold text-warm-white leading-none" style={{ fontSize: mobile ? '13px' : '16px' }}>{venuePrimary}</p>
        <p className="font-en-body font-semibold text-[9px] tracking-[0.3em] uppercase text-warm-white/65 mt-1">{venueSecondary}</p>
      </div>
    </div>
  );
}
