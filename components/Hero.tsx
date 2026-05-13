import Image from 'next/image';
import { useTranslations } from 'next-intl';

function calcDaysLeft(deadline: string): number | null {
  const d = new Date(deadline + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86_400_000);
  return diff >= 0 ? diff : null;
}

export default function Hero() {
  const t = useTranslations('hero');
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';

  const earlybirdDeadline = process.env.NEXT_PUBLIC_EARLYBIRD_DEADLINE ?? '';
  const daysLeft = earlybirdDeadline ? calcDaysLeft(earlybirdDeadline) : null;
  const showEarlybird = daysLeft !== null;

  return (
    <section id="hero" className="diamond-bg relative pt-[72px] pb-0 overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 opacity-25 pointer-events-none" aria-hidden />

      {/* 춘천시 badge */}
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

          {/* Wordmark left / bandoneon right */}
          <div className="grid grid-cols-[1.15fr_1fr] gap-8 items-center mb-8">
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
              <p
                className="font-en-condensed font-black text-burgundy uppercase leading-[1.1] tracking-[0.02em]"
                style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
              >
                CHUNCHEON<br />INTERNATIONAL<br />TANGO FESTIVAL
              </p>
            </div>

            <div className="flex justify-center items-center">
              <Image
                src="/images/illustration-bandoneon-cream.png"
                alt="반도네온 일러스트"
                width={400}
                height={400}
                style={{ width: 'clamp(240px, 32vw, 380px)', height: 'auto', mixBlendMode: 'multiply' }}
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
            venuePrimary={t('dateBand.venuePrimary')}
            venueSecondary={t('dateBand.venueSecondary')}
          />

          {/* Big centered CTA */}
          <div className="flex flex-col items-center gap-3 py-6">
            <a
              href={registerUrl}
              className="bg-burgundy text-warm-white font-en-body font-bold text-[20px] tracking-[0.22em] uppercase px-20 py-5 rounded-md transition-all duration-150 shadow-[0_6px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[4px]"
            >
              {t('cta')}
            </a>

            {showEarlybird && (
              <a
                href={registerUrl}
                className="inline-flex items-center gap-3 bg-gold/10 border border-gold/50 text-ink-soft font-kr-sans text-[13px] px-6 py-[10px] rounded-full hover:bg-gold/20 transition-colors"
              >
                <span className="bg-gold text-ink font-en-body font-bold text-[10px] tracking-[0.15em] uppercase px-2 py-[3px] rounded-sm">
                  D-{daysLeft}
                </span>
                얼리버드 마감 · {t('earlybird.deadline')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE (< lg) ─────────────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-5 pt-6 pb-0">

        {/* Eyebrow */}
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-burgundy text-center mb-5">
          <span className="text-gold">★</span>{' '}3RD EDITION · 2026{' '}<span className="text-gold">★</span>
        </p>

        {/* 3-line wordmark */}
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

        {/* Bandoneon — decorative */}
        <div className="flex justify-center my-3 opacity-90" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-cream.png"
            alt=""
            width={160}
            height={160}
            style={{ width: '150px', height: 'auto', mixBlendMode: 'multiply' }}
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
          venuePrimary={t('dateBand.venuePrimary')}
          venueSecondary={t('dateBand.venueSecondary')}
          mobile
        />

        {/* Big CTA */}
        <div className="flex flex-col items-center gap-3 py-5">
          <a
            href={registerUrl}
            className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[18px] tracking-[0.22em] uppercase text-center py-5 rounded-md transition-all duration-150 shadow-[0_5px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[3px]"
          >
            {t('cta')}
          </a>

          {showEarlybird && (
            <a
              href={registerUrl}
              className="inline-flex items-center gap-2 bg-gold/10 border border-gold/50 text-ink-soft font-kr-sans text-[12px] px-5 py-[9px] rounded-full"
            >
              <span className="bg-gold text-ink font-en-body font-bold text-[9px] tracking-[0.15em] uppercase px-2 py-[2px] rounded-sm">
                D-{daysLeft}
              </span>
              얼리버드 마감 · {t('earlybird.deadline')}
            </a>
          )}
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
