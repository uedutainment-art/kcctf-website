import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ORCHESTRAS } from '@/data/festival';

export default function Hero() {
  const t = useTranslations('hero');

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  const [orqBardo, orqMisteriosa] = ORCHESTRAS;

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
          {/* Top row: text + bandoneon */}
          <div className="grid grid-cols-[1.4fr_1fr] gap-6 items-center mb-6">

            {/* Left: text column */}
            <div className="pt-4 flex flex-col gap-5">
              {/* Eyebrow */}
              <p className="font-en-body font-bold text-[10px] tracking-[0.4em] uppercase text-burgundy">
                <span className="text-gold">★</span>{' '}
                {t('eyebrow')}{' '}
                <span className="text-gold">★</span>
              </p>

              {/* Korean wordmark */}
              <h1
                className="font-kr-serif font-black text-ink-soft leading-[0.92] tracking-[-0.06em]"
                style={{ fontSize: 'clamp(56px, 7vw, 92px)' }}
              >
                {t('titleLine1')}<br />
                {t('titleLine2')}
              </h1>

              {/* English subtitle */}
              <p className="font-en-body font-bold text-[18px] tracking-[0.04em] text-burgundy leading-[1.2] whitespace-pre-line">
                {t('subtitleEn')}
              </p>

              {/* Tagline */}
              <p className="font-kr-serif font-medium text-[17px] text-ink-soft leading-[1.55] max-w-[460px] whitespace-pre-line">
                {t('tagline')}
              </p>

              {/* USP band */}
              <div className="inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[11px] tracking-[0.18em] uppercase px-5 py-[10px] shadow-[4px_4px_0_#4A2418] self-start">
                <span className="text-gold-soft">★</span>
                {t('uspBand')}
                <span className="text-gold-soft">★</span>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <a
                  href={registerUrl}
                  className="inline-block bg-burgundy hover:bg-burgundy-deep text-warm-white font-en-body font-bold text-[12px] tracking-[0.22em] uppercase px-8 py-[14px] rounded-md transition-colors duration-200"
                >
                  {t('cta')}
                </a>
              </div>
            </div>

            {/* Right: bandoneon only */}
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

          {/* Full-width orchestra duo card */}
          <OrchestraDuoCard
            bardo={orqBardo}
            misteriosa={orqMisteriosa}
            captionText="FROM BUENOS AIRES · LIVE"
          />

          {/* Bottom: stats + date band */}
          <div className="mt-6 relative z-10">
            <StatsRow stats={stats} />
            <DateBand
              datePrimary={t('dateBand.datePrimary')}
              dateSecondary={t('dateBand.dateSecondary')}
              venuePrimary={t('dateBand.venuePrimary')}
              venueSecondary={t('dateBand.venueSecondary')}
            />
          </div>
        </div>
      </div>

      {/* ── MOBILE layout (< lg) ─────────────────────────────────────── */}
      <div className="lg:hidden relative z-10 px-6 pt-5 pb-0">

        {/* Eyebrow */}
        <p className="font-en-body font-bold text-[9px] tracking-[0.4em] uppercase text-burgundy text-center mb-3">
          <span className="text-gold">★</span>{' '}
          {t('eyebrow')}{' '}
          <span className="text-gold">★</span>
        </p>

        {/* Korean wordmark */}
        <h1
          className="font-kr-serif font-black text-ink-soft leading-[0.92] tracking-[-0.06em] text-center mb-2"
          style={{ fontSize: 'clamp(38px, 11vw, 56px)' }}
        >
          {t('titleLine1')}<br />
          {t('titleLine2')}
        </h1>

        {/* English subtitle */}
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

        {/* Bandoneon (small, decorative) */}
        <div className="flex justify-center mb-3 opacity-80" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-cream.png"
            alt=""
            width={130}
            height={130}
            style={{ width: '130px', height: 'auto' }}
          />
        </div>

        {/* Orchestra duo card */}
        <div className="mb-4">
          <OrchestraDuoCard
            bardo={orqBardo}
            misteriosa={orqMisteriosa}
            captionText="FROM BUENOS AIRES · LIVE"
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
            className="block w-full bg-burgundy hover:bg-burgundy-deep text-warm-white font-en-body font-bold text-[12px] tracking-[0.22em] uppercase text-center py-4 rounded-md transition-colors"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

type OrchestraDuoCardProps = {
  bardo: (typeof ORCHESTRAS)[0];
  misteriosa: (typeof ORCHESTRAS)[0];
  captionText: string;
};

function OrchestraDuoCard({ bardo, misteriosa, captionText }: OrchestraDuoCardProps) {
  return (
    <div className="w-full bg-warm-white border-2 border-ink-soft p-[10px] shadow-stamp">
      {/* Duo photos — aspect-ratio 16/7 */}
      <div className="grid grid-cols-2 gap-1 overflow-hidden" style={{ aspectRatio: '16/7' }}>
        {[
          { src: orqPhoto(bardo),      alt: bardo.nameEn,      tag: bardo.nameEn      },
          { src: orqPhoto(misteriosa), alt: misteriosa.nameEn, tag: misteriosa.nameEn },
        ].map(({ src, alt, tag }) => (
          <div key={alt} className="relative overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-[center_25%] saturate-90 contrast-[1.05]"
              sizes="(max-width: 768px) 50vw, 600px"
            />
            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/65 pointer-events-none" />
            {/* Name tag */}
            <p className="absolute bottom-[10px] left-[12px] z-10 font-en-display italic font-bold text-warm-white drop-shadow leading-none"
               style={{ fontSize: 'clamp(14px, 1.8vw, 22px)' }}>
              {tag}
            </p>
          </div>
        ))}
      </div>
      {/* Caption */}
      <p className="font-en-condensed font-semibold text-[11px] tracking-[0.14em] uppercase text-ink-soft text-center pt-[10px]">
        {captionText}
      </p>
    </div>
  );
}

function orqPhoto(o: (typeof ORCHESTRAS)[0]) {
  return o.image;
}

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
