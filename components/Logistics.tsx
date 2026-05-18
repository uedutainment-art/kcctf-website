import { useLocale, useTranslations } from 'next-intl';

type Card = {
  emoji: string;
  category: string;
  categoryEn: string;
  title: string;
  note: string;
};

export default function Logistics() {
  const t = useTranslations('logistics');
  const locale = useLocale();
  const isKo = locale === 'ko';
  const cards = t.raw('cards') as Card[];

  return (
    <section id="logistics" className="bg-warm-white py-16">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink leading-[1.0] tracking-[-0.04em] mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-kr-sans text-[15px] text-ink-soft/70 max-w-xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* 2 placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative bg-cream border border-ink-soft/12 rounded-lg p-6 md:p-7 flex items-center gap-5 transition-transform duration-200 hover:-translate-y-[2px]"
            >
              <span className="text-[48px] md:text-[56px] shrink-0" aria-hidden>
                {card.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-en-body font-bold text-[10px] tracking-[0.32em] uppercase text-gold mb-1">
                  {isKo ? card.category : card.categoryEn}
                </p>
                <p className="font-kr-sans font-bold text-[15px] md:text-[16px] text-ink leading-tight mb-2">
                  {card.title}
                </p>
                <p className="font-en-body text-[11px] tracking-[0.18em] uppercase text-ink-soft/55">
                  — {card.note} —
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
