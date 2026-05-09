import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ORCHESTRAS } from '@/data/festival';

export default function Orchestras() {
  const t = useTranslations('orchestras');
  const locale = useLocale();

  return (
    <section id="orchestras" className="bg-burgundy text-warm-white overflow-hidden">

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-16 pb-10 text-center">
        <p className="font-en-body font-bold text-[12px] tracking-[0.4em] uppercase text-gold mb-3">
          {t('eyebrow')}
        </p>
        <p className="font-en-display italic text-[28px] text-gold mb-4">
          {t('subtitleEn')}
        </p>
        <h2
          className="font-kr-serif font-black text-warm-white leading-[1.0] tracking-[-0.04em] mb-5"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
        >
          {t('title')}
        </h2>
        <p className="font-kr-sans text-[18px] text-warm-white/85 leading-[1.6] max-w-2xl mx-auto">
          {t('lede')}
        </p>
      </div>

      {/* ── Orchestra cards ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 pb-16 max-w-[1200px] mx-auto px-6 md:px-10">
        {ORCHESTRAS.map((orq, i) => {
          const item = t.raw(`items.${i}`) as {
            name: string; nameEn: string; role: string; description: string; liveBadge: string;
          };
          return (
            <article
              key={orq.id}
              className="relative overflow-hidden bg-night rounded-sm"
              style={{ height: 'clamp(280px, 40vw, 480px)' }}
            >
              {/* Photo */}
              <Image
                src={orq.image}
                alt={orq.nameEn}
                fill
                className="object-cover object-center saturate-90"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority={i === 0}
              />

              {/* Left gradient for text legibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(14,8,20,0.88) 0%, rgba(14,8,20,0.55) 30%, transparent 65%)',
                }}
              />

              {/* Bottom gradient (mobile) */}
              <div
                className="absolute inset-0 pointer-events-none sm:hidden"
                style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(14,8,20,0.75) 100%)' }}
              />

              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-10 max-w-sm">
                  <p className="font-en-body font-bold text-[11px] tracking-[0.32em] uppercase text-gold mb-2">
                    {orq.roleEn}
                  </p>
                  <h3
                    className="font-en-display italic font-black text-warm-white leading-[1.0] mb-2"
                    style={{ fontSize: 'clamp(28px, 4vw, 56px)' }}
                  >
                    {locale === 'ko' ? item.nameEn : orq.nameEn}
                  </h3>
                  <p className="font-kr-sans text-[14px] text-warm-white/80 leading-[1.55] hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* LIVE badge — rotated paper label */}
              <div
                className="absolute top-5 right-5 bg-warm-white px-3 py-1 shadow-md"
                style={{ transform: 'rotate(-8deg)' }}
              >
                <span className="font-en-condensed font-black text-[18px] text-ink tracking-wide">
                  {item.liveBadge}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
