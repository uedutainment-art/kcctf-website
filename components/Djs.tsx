import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { DJS } from '@/data/festival';

export default function Djs() {
  const t = useTranslations('djs');
  const locale = useLocale();

  return (
    <section
      id="djs"
      className="relative overflow-hidden bg-night text-warm-white py-20"
      style={{
        background:
          'radial-gradient(circle at 18% 0%, rgba(139,26,43,0.42), transparent 34%), linear-gradient(180deg, #160611 0%, #0E0814 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/35" aria-hidden />
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-warm-white leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-en-display italic text-[30px] text-gold mb-4">
            {t('subtitleEn')}
          </p>
          <p className="font-kr-sans text-[17px] text-warm-white/72 max-w-2xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* 3×2 grid (desktop) / 2×3 (mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-5">
          {DJS.map((dj, index) => (
            <div
              key={dj.id}
              className={[
                'group bg-warm-white/[0.045] border border-gold/18 p-3 sm:p-4 text-center transition-transform duration-300 hover:-translate-y-1',
                index % 2 ? 'lg:mt-10' : '',
              ].join(' ')}
            >
              {/* Circular photo */}
              <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 lg:w-full lg:h-auto lg:aspect-[4/5] overflow-hidden border-2 border-gold/45 mb-4 bg-ink transition-transform duration-300 group-hover:scale-[1.025]">
                <Image
                  src={dj.image}
                  alt={`${dj.nameKo} (${dj.nameEn})`}
                  fill
                  className="object-cover object-[center_20%] grayscale-[12%] contrast-[1.04] transition-[filter] duration-300 group-hover:saturate-[1.18] group-hover:grayscale-0"
                  sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 190px"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/80 to-transparent" />
                <span className="absolute left-2 top-2 bg-burgundy text-warm-white font-en-body font-black text-[10px] tracking-[0.2em] px-2 py-1">
                  DJ
                </span>
              </div>

              {/* Label */}
              <p className="font-kr-sans font-bold text-[18px] text-warm-white leading-[1.2]">
                {dj.nameKo}
              </p>
              <p className="font-en-body text-[14px] text-gold mt-1">
                {dj.nameEn}
              </p>
              <p className="font-en-body text-[12px] text-warm-white/48 mt-1">
                {locale === 'ko' ? `${dj.city} · ${dj.country}` : `${dj.cityEn} · ${dj.country}`}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
