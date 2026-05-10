import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { DJS } from '@/data/festival';

export default function Djs() {
  const t = useTranslations('djs');
  const locale = useLocale();

  return (
    <section id="djs" className="bg-cream py-16">
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
          <p className="font-en-display italic text-[24px] text-gold mb-4">
            {t('subtitleEn')}
          </p>
          <p className="font-kr-sans text-[16px] text-charcoal/80 max-w-xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* 3×2 grid (desktop) / 2×3 (mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8">
          {DJS.map((dj) => (
            <div key={dj.id} className="flex flex-col items-center text-center group bg-cream rounded-xl py-6 px-4 shadow-[0_2px_12px_rgba(26,20,16,0.07)] hover:shadow-[0_4px_20px_rgba(26,20,16,0.12)] transition-shadow duration-200">
              {/* Circular photo */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-ink-soft/15 mb-4 transition-transform duration-300 group-hover:scale-[1.04]">
                <Image
                  src={dj.image}
                  alt={`${dj.nameKo} (${dj.nameEn})`}
                  fill
                  className="object-cover object-[center_25%] transition-[filter] duration-300 group-hover:saturate-[1.15]"
                  sizes="(max-width: 640px) 128px, 160px"
                />
              </div>

              {/* Label */}
              <p className="font-kr-sans font-bold text-[17px] text-ink leading-[1.2]">
                {dj.nameKo}
              </p>
              <p className="font-en-body text-[14px] text-charcoal/70 mt-1">
                {dj.nameEn}
              </p>
              <p className="font-en-body text-[13px] text-charcoal/50 mt-1">
                {locale === 'ko' ? `${dj.city} · ${dj.country}` : `${dj.cityEn} · ${dj.country}`}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
