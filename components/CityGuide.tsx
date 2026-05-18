import { useTranslations } from 'next-intl';

type Card = {
  emoji: string;
  category: string;
  title: string;
  caption: string;
};

export default function CityGuide() {
  const t = useTranslations('cityGuide');
  const cards = t.raw('cards') as Card[];

  return (
    <section id="city-guide" className="bg-cream py-20">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink leading-[1.0] tracking-[-0.04em] mb-4"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-kr-sans text-[16px] text-ink-soft/75 max-w-2xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group relative bg-mustard ring-1 ring-ink-soft/15 transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Photo placeholder area */}
              <div className="aspect-[4/3] flex items-center justify-center bg-mustard-soft/60 relative">
                <span className="text-[64px] md:text-[80px] grayscale-0 transition-transform duration-300 group-hover:scale-110" aria-hidden>
                  {card.emoji}
                </span>
                <span className="absolute top-3 left-3 font-en-body font-bold text-[9px] tracking-[0.3em] uppercase text-burgundy bg-warm-white/85 px-2 py-1">
                  {card.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-4 md:p-5">
                <p className="font-kr-sans font-bold text-[15px] md:text-[17px] text-ink leading-tight">
                  {card.title}
                </p>
                <p className="font-kr-sans text-[12px] md:text-[13px] text-ink-soft/65 mt-1">
                  {card.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon note */}
        <p className="text-center mt-10 font-en-body text-[11px] tracking-[0.32em] uppercase text-ink-soft/55">
          — {t('comingSoon')} —
        </p>

      </div>
    </section>
  );
}
