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
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">

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

        <div className="relative mb-12 min-h-[300px] overflow-hidden bg-ink ring-1 ring-gold/16">
          <Image
            src="/images/2025/milonga-flow.jpg"
            alt="2025 춘천국제탱고페스티벌 밀롱가 분위기"
            fill
            className="object-cover"
            style={{ objectPosition: '50% 42%' }}
            sizes="(max-width: 1024px) 100vw, 1180px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night/92 via-night/55 to-night/10" />
        </div>

        {/* 3×2 grid (desktop) / 2×3 (mobile) */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6">
          {DJS.map((dj) => (
            <div
              key={dj.id}
              className="group text-center"
            >
              <div className="relative mx-auto mb-4 aspect-[4/5] w-full max-w-[250px] overflow-hidden bg-ink ring-1 ring-gold/22 transition-transform duration-300 group-hover:-translate-y-1">
                <Image
                  src={dj.image}
                  alt={`${dj.nameKo} (${dj.nameEn})`}
                  fill
                  className="object-cover object-[center_20%] grayscale-[12%] contrast-[1.04] transition-[filter] duration-300 group-hover:saturate-[1.18] group-hover:grayscale-0"
                  sizes="(max-width: 640px) 44vw, (max-width: 1024px) 28vw, 250px"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/85 to-transparent" />
              </div>

              {/* Label */}
              <p className="font-en-body font-bold text-[18px] text-warm-white leading-[1.2]">
                {locale === 'ko' ? dj.nameKo : dj.nameEn}
              </p>
              {locale === 'ko' && (
                <p className="font-en-body text-[14px] text-gold mt-1">
                  {dj.nameEn}
                </p>
              )}
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
