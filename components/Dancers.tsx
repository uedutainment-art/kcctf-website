import { useTranslations } from 'next-intl';
import { DANCE_TEAMS } from '@/data/festival';

export default function Dancers() {
  const t = useTranslations('dancers');

  return (
    <section id="dancers" className="bg-warm-white py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

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
          <p className="font-en-display italic text-[22px] text-gold mb-4">
            {t('subtitleEn')}
          </p>
          <p className="font-kr-sans text-[16px] text-charcoal/80 max-w-xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* 4 team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DANCE_TEAMS.map((team) => (
            <div
              key={team.id}
              className={[
                'rounded-lg p-6 text-center transition-shadow duration-200',
                team.isTBA
                  ? 'border-2 border-dashed border-ink-soft/25 bg-transparent'
                  : 'bg-cream border-2 border-ink-soft/10 hover:shadow-lift',
              ].join(' ')}
            >
              {/* Photo placeholder / TBA */}
              <div
                className={[
                  'mx-auto mb-4 rounded-full flex items-center justify-center',
                  'w-20 h-20 sm:w-24 sm:h-24',
                  team.isTBA
                    ? 'border-2 border-dashed border-ink-soft/25 bg-transparent'
                    : 'bg-mustard/30',
                ].join(' ')}
              >
                {team.isTBA ? (
                  <span className="text-2xl text-ink-soft/30" aria-hidden>?</span>
                ) : (
                  <span className="text-2xl" aria-hidden>💃</span>
                )}
              </div>

              <p
                className={[
                  'font-en-body font-bold text-[15px] leading-[1.3]',
                  team.isTBA ? 'text-ink-soft/40' : 'text-ink-soft',
                ].join(' ')}
              >
                {team.name}
              </p>
              <p
                className={[
                  'font-en-body text-[12px] mt-1',
                  team.isTBA ? 'text-charcoal/30' : 'text-charcoal/60',
                ].join(' ')}
              >
                {team.origin}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
