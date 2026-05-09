import { useTranslations } from 'next-intl';
import { TICKET_TIERS } from '@/data/festival';

export default function Tickets() {
  const t = useTranslations('tickets');
  const showHotelPackages = process.env.NEXT_PUBLIC_SHOW_HOTEL_PACKAGES === 'true';
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';

  const items = t.raw('items') as {
    id: string;
    name: string;
    priceLabel: string;
    description: string;
    includes: string[];
    note: string;
    featured: boolean;
    cta: string;
  }[];

  const paymentInfo = t.raw('paymentInfo') as {
    title: string;
    bank: string;
    account: string;
    holder: string;
    note: string;
  };

  return (
    <section id="tickets" className="bg-mustard-soft py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-3">
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
          <p className="font-kr-sans text-[15px] text-charcoal/70">
            {t('lede')}
          </p>
        </div>

        {/* Ticket cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {TICKET_TIERS.map((tier, i) => {
            const item = items[i];
            return (
              <div
                key={tier.id}
                className={[
                  'relative rounded-lg p-6 flex flex-col',
                  tier.featured
                    ? 'bg-burgundy text-warm-white shadow-stamp'
                    : 'bg-warm-white border-2 border-ink-soft/10',
                ].join(' ')}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink font-en-body font-bold text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
                    EARLYBIRD
                  </span>
                )}

                <p
                  className={[
                    'font-en-body font-bold text-[11px] tracking-[0.3em] uppercase mb-2',
                    tier.featured ? 'text-gold-soft' : 'text-burgundy',
                  ].join(' ')}
                >
                  {item.name}
                </p>

                <p
                  className={[
                    'font-en-display italic font-black leading-none mb-3',
                    tier.featured ? 'text-gold-soft' : 'text-ink-soft',
                  ].join(' ')}
                  style={{ fontSize: 'clamp(28px, 4vw, 36px)' }}
                >
                  {item.priceLabel}
                </p>

                <p
                  className={[
                    'font-kr-sans text-[13px] leading-[1.5] mb-4',
                    tier.featured ? 'text-warm-white/80' : 'text-charcoal/70',
                  ].join(' ')}
                >
                  {item.description}
                </p>

                <ul className="flex flex-col gap-2 mb-5 flex-1">
                  {item.includes.map((inc, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span
                        className={[
                          'mt-[3px] shrink-0 text-[10px]',
                          tier.featured ? 'text-gold-soft' : 'text-burgundy',
                        ].join(' ')}
                        aria-hidden
                      >
                        ★
                      </span>
                      <span
                        className={[
                          'font-kr-sans text-[13px]',
                          tier.featured ? 'text-warm-white/85' : 'text-charcoal/80',
                        ].join(' ')}
                      >
                        {inc}
                      </span>
                    </li>
                  ))}
                </ul>

                <p
                  className={[
                    'font-en-body text-[11px] mb-4',
                    tier.featured ? 'text-warm-white/55' : 'text-charcoal/45',
                  ].join(' ')}
                >
                  {item.note}
                </p>

                <a
                  href={registerUrl}
                  className={[
                    'block text-center font-en-body font-bold text-[11px] tracking-[0.2em] uppercase py-3 rounded transition-colors duration-200',
                    tier.featured
                      ? 'bg-warm-white text-burgundy hover:bg-cream'
                      : 'bg-burgundy text-warm-white hover:bg-burgundy-deep',
                  ].join(' ')}
                >
                  {item.cta} →
                </a>
              </div>
            );
          })}
        </div>

        {/* Hotel packages — flag-gated */}
        {showHotelPackages ? null : (
          <div className="text-center mb-10">
            <p className="font-kr-sans text-[14px] text-charcoal/45 border border-dashed border-ink-soft/20 rounded px-5 py-3 inline-block">
              {t('hotelPackageNote')}
            </p>
          </div>
        )}

        {/* Payment info */}
        <div className="bg-warm-white rounded-lg border-2 border-ink-soft/10 p-6 max-w-md mx-auto">
          <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase text-burgundy mb-4">
            {paymentInfo.title}
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 font-kr-sans text-[14px]">
            <dt className="text-charcoal/50">{paymentInfo.bank}</dt>
            <dd className="text-ink-soft font-bold tracking-wider">{paymentInfo.account}</dd>
            <dt className="text-charcoal/50 col-span-2">{paymentInfo.holder}</dt>
          </dl>
          <p className="font-kr-sans text-[12px] text-charcoal/45 mt-3">
            {paymentInfo.note}
          </p>
        </div>

      </div>
    </section>
  );
}
