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
      <div className="flex flex-col gap-4 pb-16">
        {ORCHESTRAS.map((orq, i) => {
          const item = t.raw(`items.${i}`) as {
            name: string; nameEn: string; role: string; description: string; liveBadge: string;
          };
          return (
            <article
              key={orq.id}
              className="relative overflow-hidden bg-night"
              style={{ height: i === 0 ? 'clamp(430px, 45vw, 580px)' : 'clamp(520px, 50vw, 660px)' }}
            >
              <div className="absolute inset-0 md:left-[38%]">
                <Image
                  src={orq.image}
                  alt={orq.nameEn}
                  fill
                  className="object-cover saturate-90"
                  style={{ objectPosition: i === 0 ? '60% 18%' : '58% 18%' }}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority={i === 0}
                />
              </div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(15,41,58,1) 0%, rgba(15,41,58,0.98) 36%, rgba(15,41,58,0.5) 58%, transparent 82%)',
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(14,8,20,0.6) 100%)' }}
              />

              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-10 max-w-[410px] md:max-w-[36%]">
                  <p className="font-en-condensed font-black text-gold leading-[0.88] tracking-[0.08em] mb-4" style={{ fontSize: i === 0 ? 'clamp(32px, 4.7vw, 58px)' : 'clamp(30px, 4.4vw, 54px)' }}>
                    LIVE ORCHESTRA
                  </p>
                  <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold/85 mb-4">
                    {orq.roleEn}
                  </p>
                  <h3
                    className="font-en-display font-black text-warm-white leading-[0.95] mb-4"
                    style={{ fontSize: i === 0 ? 'clamp(34px, 5vw, 64px)' : 'clamp(30px, 4.3vw, 54px)' }}
                  >
                    {locale === 'ko' ? item.nameEn : orq.nameEn}
                  </h3>
                  <p className="font-kr-sans text-[15px] text-warm-white/85 leading-[1.55] hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
