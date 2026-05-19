import { useLocale, useTranslations } from 'next-intl';
import { TICKET_TIERS } from '@/data/festival';
import RegisterButton from './RegisterButton';
import MotionReveal from './MotionReveal';

export default function Tickets() {
  const t = useTranslations('tickets');
  const locale = useLocale();
  const isKo = locale === 'ko';
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
    swift?: string;
    intlNote?: string;
  };
  const procedure = t('procedure');
  const earlybirdTier = TICKET_TIERS[0];
  const earlybirdItem = items[0];
  const onsiteItem = items.find((i) => i.id === 'fullpack-onsite');

  return (
    <section id="tickets" className="bg-mustard-soft py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <MotionReveal className="text-center mb-12">
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
        </MotionReveal>

        {/* Ticket card */}
        <MotionReveal className="mx-auto mb-10 grid max-w-[980px] grid-cols-1 overflow-hidden rounded-lg bg-burgundy text-warm-white shadow-stamp md:grid-cols-[0.95fr_1.05fr]" delay={100}>
          <div className="relative p-8 md:p-10">
            <span className="mb-6 inline-flex bg-gold text-ink font-en-body font-bold text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full">
              EARLYBIRD
            </span>
            <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase mb-3 text-gold-soft">
              {earlybirdItem.name}
            </p>
            <p
              className="font-en-display italic font-black leading-none mb-2 text-gold-soft"
              style={{ fontSize: 'clamp(42px, 7vw, 72px)' }}
            >
              {earlybirdItem.priceLabel}
            </p>
            {onsiteItem && (
              <p className="mb-5 font-kr-sans text-[12px] text-warm-white/55">
                {isKo ? '얼리버드 마감 후 정가 ' : 'After earlybird '}
                <span className="font-bold tracking-wider text-warm-white/80">
                  {onsiteItem.priceLabel}
                </span>
              </p>
            )}
            <p className="font-kr-sans text-[15px] leading-[1.65] text-warm-white/82">
              {earlybirdItem.description}
            </p>
          </div>

          <div className="flex flex-col border-t border-warm-white/15 p-8 md:border-l md:border-t-0 md:p-10">
            <ul className="mb-7 grid flex-1 gap-3">
              {earlybirdItem.includes.map((inc, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="mt-[4px] shrink-0 text-[11px] text-gold-soft" aria-hidden>
                    ★
                  </span>
                  <span className="font-kr-sans text-[15px] text-warm-white/88">
                    {inc}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mb-5 font-en-body text-[12px] text-warm-white/58">
              {earlybirdItem.note}
            </p>
            <RegisterButton
              href={registerUrl}
              className="block rounded bg-warm-white py-4 text-center font-en-body text-[14px] font-bold uppercase tracking-[0.2em] text-burgundy shadow-[0_3px_0_rgba(253,250,245,0.4)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[0_1px_0_rgba(253,250,245,0.4)]"
            >
              {earlybirdItem.cta} →
            </RegisterButton>
            <p className="mt-4 font-kr-sans text-[12px] leading-[1.6] text-warm-white/45">
              {earlybirdTier.id === 'fullpack-early'
                ? isKo
                  ? '추가 예약 옵션은 추후 별도 안내됩니다.'
                  : 'Additional registration options will be announced later.'
                : null}
            </p>
          </div>
        </MotionReveal>

        {/* Hotel packages — flag-gated */}
        {showHotelPackages ? null : (
          <div className="text-center mb-10">
            <p className="font-kr-sans text-[14px] text-charcoal/45 border border-dashed border-ink-soft/20 rounded px-5 py-3 inline-block">
              {t('hotelPackageNote')}
            </p>
          </div>
        )}

        {/* Procedure */}
        <p className="font-kr-sans text-[13px] text-charcoal/60 text-center mb-6">
          {procedure}
        </p>

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
          {paymentInfo.swift && (
            <div className="mt-4 pt-4 border-t border-ink-soft/10">
              <p className="font-en-body text-[11px] text-charcoal/45 mb-1">
                SWIFT/BIC: <span className="font-bold tracking-wider">{paymentInfo.swift}</span>
              </p>
              {paymentInfo.intlNote && (
                <p className="font-kr-sans text-[12px] text-charcoal/45">
                  {paymentInfo.intlNote}
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
