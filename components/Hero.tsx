import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="diamond-bg relative pt-[72px] pb-0 overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 opacity-25 pointer-events-none" aria-hidden />

      {/* ── DESKTOP (lg+) ─────────────────────────────────────────────── */}
      <div className="hidden lg:block relative z-10">
        <div className="max-w-[1840px] mx-auto px-[clamp(32px,4vw,76px)] pt-10 pb-0">

          {/* Eyebrow */}
          <p
            className="inline-flex items-center justify-center gap-3 font-en-body font-black text-[13px] tracking-[0.42em] uppercase text-burgundy mb-6"
            style={{ minWidth: 'min(620px, 48vw)' }}
          >
            <span>★</span>{' '}3RD EDITION · 2026{' '}<span>★</span>
          </p>

          {/* Poster-style wordmark and bandoneon */}
          <div className="grid grid-cols-[minmax(0,1fr)_440px] gap-12 items-end mb-8">
            <div className="min-w-0">
              <div className="flex items-end gap-7 mb-7">
                <h1
                  className="font-kr-poster text-burgundy leading-[0.78] tracking-[-0.1em]"
                  style={{ fontSize: 'clamp(150px, 16vw, 250px)', transform: 'scaleX(1.08)' }}
                >
                  춘천
                </h1>
                <div
                  className="font-kr-poster text-burgundy leading-[0.86] tracking-[-0.09em] pb-2"
                  style={{ fontSize: 'clamp(70px, 6.9vw, 116px)', transform: 'scaleX(1.04)' }}
                >
                  <div>국제탱고</div>
                  <div>페스티벌</div>
                </div>
              </div>
              <p
                className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em]"
                style={{ fontSize: 'clamp(42px, 4.4vw, 68px)' }}
              >
                CHUNCHEON<br />INTERNATIONAL<br />TANGO FESTIVAL
              </p>
            </div>

            <div className="flex justify-center items-end pb-5">
              <Image
                src="/images/illustration-bandoneon-dark-transparent.png"
                alt="반도네온 일러스트"
                width={400}
                height={400}
                style={{ width: 'clamp(320px, 30vw, 440px)', height: 'auto', filter: 'drop-shadow(0 14px 20px rgba(74,36,24,0.18))' }}
                priority
              />
            </div>
          </div>

          {/* USP band */}
          <div className="flex justify-center mb-5">
            <div className="inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[12px] tracking-[0.18em] uppercase px-5 py-[10px] shadow-[4px_4px_0_#4A2418]">
              <span className="text-gold-soft">★</span>
              {t('uspBand')}
              <span className="text-gold-soft">★</span>
            </div>
          </div>

          {/* Date band */}
          <DateBand
            datePrimary={t('dateBand.datePrimary')}
            dateSecondary={t('dateBand.dateSecondary')}
          />
        </div>
      </div>

      {/* ── MOBILE (< lg) ─────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-5 pt-6 pb-0">

        {/* Eyebrow */}
        <p className="font-en-body font-black text-[10px] tracking-[0.42em] uppercase text-burgundy text-center mb-5">
          <span>★</span>{' '}3RD EDITION · 2026{' '}<span>★</span>
        </p>

        {/* Poster-style mobile wordmark */}
        <div className="text-center mb-2">
          <h1
            className="font-kr-poster text-burgundy leading-[0.82] tracking-[-0.1em]"
            style={{ fontSize: 'clamp(88px, 25vw, 116px)', transform: 'scaleX(1.06)' }}
          >
            춘천
          </h1>
          <div
            className="font-kr-poster text-burgundy leading-[0.88] tracking-[-0.09em]"
            style={{ fontSize: 'clamp(44px, 12vw, 60px)' }}
          >
            <div>국제탱고</div>
            <div>페스티벌</div>
          </div>
        </div>

        {/* Bandoneon — decorative */}
        <div className="flex justify-center my-3 opacity-90" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-dark-transparent.png"
            alt=""
            width={160}
            height={160}
            style={{ width: '150px', height: 'auto', filter: 'drop-shadow(0 10px 16px rgba(74,36,24,0.14))' }}
          />
        </div>

        {/* English subtitle */}
        <p
          className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em] text-center mb-4"
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

        {/* Date band */}
        <DateBand
          datePrimary={t('dateBand.datePrimary')}
          dateSecondary={t('dateBand.dateSecondary')}
          mobile
        />
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

type DateBandProps = {
  datePrimary: string;
  dateSecondary: string;
  mobile?: boolean;
};

function DateBand({ datePrimary, dateSecondary, mobile }: DateBandProps) {
  return (
    <div
      className={[
        'bg-ink text-warm-white px-5 py-[14px] shadow-stamp',
        mobile ? 'mx-auto flex max-w-[300px] flex-col items-center text-center gap-1' : 'mx-auto flex w-fit min-w-[420px] items-center justify-center text-center',
      ].join(' ')}
      style={mobile ? undefined : {
        marginTop: '-2px',
      }}
    >
      <div>
        <p className="font-en-display italic font-black text-gold-soft leading-none" style={{ fontSize: mobile ? '22px' : '30px' }}>
          {datePrimary}
        </p>
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-gold-soft/85 mt-1">{dateSecondary}</p>
      </div>
    </div>
  );
}
