import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { DANCE_TEAMS } from '@/data/festival';
import MotionReveal from './MotionReveal';

export default function Dancers() {
  const t = useTranslations('dancers');

  return (
    <section id="dancers" className="bg-warm-white py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <MotionReveal className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink-soft leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-en-display italic text-[22px] text-gold mb-4">
            {t('subtitleEn')}
          </p>
          <p className="font-kr-sans text-[16px] text-charcoal/80 max-w-xl mx-auto">
            {t('lede')}
          </p>
        </MotionReveal>

        {/* 4 team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DANCE_TEAMS.map((team, index) => (
            <MotionReveal
              key={team.id}
              className={[
                'group relative rounded-lg p-6 text-center overflow-hidden transition-transform duration-200',
                team.isTBA
                  ? 'border-2 border-dashed border-ink-soft/25 bg-transparent'
                  : 'bg-cream shadow-[4px_4px_0_#8B1A2B] hover:-translate-y-[3px]',
              ].join(' ')}
              delay={index * 70}
            >
              {/* Grain overlay on non-TBA cards */}
              {!team.isTBA && (
                <div
                  className="absolute inset-0 opacity-[0.12] pointer-events-none"
                  style={{
                    backgroundImage: "url('/images/grain.svg')",
                    backgroundSize: '160px 160px',
                    mixBlendMode: 'multiply',
                  }}
                  aria-hidden
                />
              )}

              {/* Photo / placeholder / TBA */}
              {team.isTBA ? (
                <div className="mx-auto mb-4 w-24 h-24 rounded-full border-2 border-dashed border-ink-soft/25 bg-transparent flex items-center justify-center">
                  <span className="text-2xl text-ink-soft/30" aria-hidden>?</span>
                </div>
              ) : team.image ? (
                <div className="relative mx-auto mb-5 w-full aspect-square overflow-hidden bg-ink/5 ring-1 ring-ink-soft/15">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover object-[center_25%] grayscale-[8%] contrast-[1.04] transition-[filter] duration-300 group-hover:grayscale-0 motion-slow-zoom"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 44vw, 280px"
                  />
                </div>
              ) : (
                <div className="relative mx-auto mb-5 flex flex-col items-center gap-2">
                  {/* ornament top */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/ornament-divider.svg" alt="" aria-hidden className="opacity-25 w-20" />

                  {/* Big star */}
                  <span
                    className="font-en-display italic font-black text-gold-soft leading-none"
                    style={{ fontSize: '72px' }}
                    aria-hidden
                  >
                    ★
                  </span>

                  {/* ornament bottom */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/ornament-divider.svg" alt="" aria-hidden className="opacity-25 w-20" />
                </div>
              )}

              <p
                className={[
                  'font-en-body font-bold text-[15px] leading-[1.3] relative z-10',
                  team.isTBA ? 'text-ink-soft/40' : 'text-ink-soft',
                ].join(' ')}
              >
                {team.name}
              </p>
              <p
                className={[
                  'font-en-body text-[12px] mt-1 relative z-10',
                  team.isTBA ? 'text-charcoal/30' : 'text-charcoal/60',
                ].join(' ')}
              >
                {team.origin}
              </p>
            </MotionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
