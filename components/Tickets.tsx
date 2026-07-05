import { useLocale, useTranslations } from 'next-intl';
import { TICKET_TIERS } from '@/data/festival';
import RegisterButton from './RegisterButton';
import MotionReveal from './MotionReveal';

// 등록 플랫폼(별도 서비스) 직접 링크 — ⚠️ 비공개 초대(invite) 링크는 넣지 말 것
const REGISTER_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026';

export default function Tickets() {
  const t = useTranslations('tickets');
  const locale = useLocale();
  const isKo = locale === 'ko';
  const showHotelPackages = process.env.NEXT_PUBLIC_SHOW_HOTEL_PACKAGES === 'true';
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  // 등록 미오픈이면 예약 버튼 대신 '등록 오픈 예정' 안내
  const registrationOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === 'true';
  // 티켓 간단 안내 모드 — true면 전체 가격표/입금/절차 대신 '2차 얼리버드 신청 진행 중' 안내 카드만 (시민 배너 유지)
  const ticketsComingSoon = process.env.NEXT_PUBLIC_TICKETS_COMING_SOON === 'true';

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
  const onsiteTier = TICKET_TIERS.find((tier) => tier.id === 'fullpack-onsite');
  const earlybirdItem = items[0];
  const onsiteItem = items.find((i) => i.id === 'fullpack-onsite');
  // 얼리버드 할인액 = 현장가 − 얼리버드가 (숫자 출처: TICKET_TIERS, 하드코딩 금지)
  const earlybirdDiscount = onsiteTier ? onsiteTier.price - earlybirdTier.price : 0;

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
            {ticketsComingSoon ? (isKo ? '티켓' : 'Tickets') : t('title')}
          </h2>
          {!ticketsComingSoon && (
            <p className="font-en-display italic text-[22px] text-gold mb-4">
              {t('subtitleEn')}
            </p>
          )}
          {!ticketsComingSoon && (
            <p className="font-kr-sans text-[15px] text-charcoal/70">
              {t('lede')}
            </p>
          )}
        </MotionReveal>

        {/* 2차 얼리버드 진행 중 — 가격 상세 대신 '신청 진행 중' 안내 + 신청 링크 */}
        {ticketsComingSoon && (
          <MotionReveal className="mx-auto mb-10 max-w-[680px] rounded-lg border-2 border-burgundy/25 bg-cream px-8 py-12 text-center shadow-stamp" delay={100}>
            <p className="font-en-body text-[11px] font-bold uppercase tracking-[0.32em] text-burgundy/70">Now Open</p>
            <p className="mt-3 font-kr-serif text-[26px] font-black leading-tight text-ink-soft sm:text-[34px]">
              {isKo ? '2차 얼리버드 신청 진행 중' : '2nd Early Bird — Now Open'}
            </p>
            <p className="mx-auto mt-3 max-w-[480px] font-kr-sans text-[15px] leading-relaxed text-charcoal/75">
              {isKo ? '3일 풀패스 ₩190,000 · 7월 31일 마감' : '3-day Full Pass ₩190,000 · closes July 31'}
            </p>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-burgundy px-7 py-3.5 font-kr-sans text-[15px] font-bold text-warm-white shadow-[0_4px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[0_2px_0_#5A0E1B]"
            >
              {isKo ? '참가 신청하기 →' : 'Register now →'}
            </a>
          </MotionReveal>
        )}

        {/* Ticket card */}
        {!ticketsComingSoon && (
        <MotionReveal className="mx-auto mb-10 grid max-w-[980px] grid-cols-1 overflow-hidden rounded-lg bg-burgundy text-warm-white shadow-stamp md:grid-cols-[0.95fr_1.05fr]" delay={100}>
          <div className="relative p-8 md:p-10">
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-ink/55 px-3.5 py-1 font-kr-sans text-[11px] font-bold tracking-[0.04em] text-warm-white ring-1 ring-warm-white/25">
              {isKo ? '⏰ 얼리버드 마감' : '⏰ Early Bird Closed'}
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
                <span className="font-bold tracking-wider text-warm-white/80 line-through decoration-warm-white/40">
                  {onsiteItem.priceLabel}
                </span>
                {earlybirdDiscount > 0 && (
                  <span className="ml-2 font-bold text-gold-soft/90">
                    {isKo
                      ? `₩${earlybirdDiscount.toLocaleString('ko-KR')} 할인`
                      : `save ₩${earlybirdDiscount.toLocaleString('en-US')}`}
                  </span>
                )}
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
            {registrationOpen ? (
              <RegisterButton
                href={registerUrl}
                className="block rounded bg-warm-white py-4 text-center font-en-body text-[14px] font-bold uppercase tracking-[0.2em] text-burgundy shadow-[0_3px_0_rgba(253,250,245,0.4)] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[0_1px_0_rgba(253,250,245,0.4)]"
              >
                {earlybirdItem.cta} →
              </RegisterButton>
            ) : (
              <div className="block rounded bg-warm-white/90 py-4 text-center font-en-body text-[14px] font-bold uppercase tracking-[0.2em] text-burgundy/70">
                {isKo ? '등록 오픈 예정' : 'Registration opening soon'}
              </div>
            )}
            <p className="mt-4 font-kr-sans text-[12px] leading-[1.6] text-warm-white/45">
              {earlybirdTier.id === 'fullpack-early'
                ? isKo
                  ? '추가 예약 옵션은 추후 별도 안내됩니다.'
                  : 'Additional registration options will be announced later.'
                : null}
            </p>
          </div>
        </MotionReveal>
        )}

        {/* 춘천시민 특별 혜택 — 강조 배너 (정보성, 티켓 정가/가격 로직 변경 아님) */}
        <div className="-mt-1 mb-10 flex justify-center">
          <div className="w-full max-w-[600px] overflow-hidden rounded-xl border-2 border-burgundy bg-cream text-center shadow-[5px_5px_0_#8B1A2B]">
            {/* 헤더 바 */}
            <div className="border-b-[3px] border-gold bg-burgundy px-5 py-3">
              <p className="font-kr-sans text-[16px] font-bold leading-tight text-warm-white sm:text-[18px]">
                {t('residentDiscount.title')}
              </p>
            </div>
            {/* 본문 */}
            <div className="px-5 py-5 sm:px-7">
              {/* 가격: 정가 취소선 → 시민 특가 */}
              <p className="mb-3 leading-tight">
                <span className="font-kr-sans text-[15px] text-ink-soft/55 line-through decoration-burgundy/50">
                  {t('residentDiscount.priceFrom')}
                </span>
                <span className="mx-2 align-middle text-burgundy/55" aria-hidden>→</span>
                <span className="align-middle font-en-display text-[28px] font-black text-burgundy sm:text-[34px]">
                  {t('residentDiscount.priceTo')}
                </span>
                <span className="ml-2 font-kr-sans text-[14px] font-bold text-burgundy">
                  {t('residentDiscount.priceNote')}
                </span>
              </p>
              {/* 안내 본문 */}
              <p className="mx-auto max-w-[480px] font-kr-sans text-[13.5px] leading-[1.65] text-ink-soft/80">
                {t('residentDiscount.body')}
              </p>
              {/* 담당 */}
              <p className="mt-4 inline-block rounded-full bg-mustard/60 px-4 py-1.5 font-kr-sans text-[13px] font-bold text-ink-soft">
                {t('residentDiscount.contact')}
              </p>
            </div>
          </div>
        </div>

        {/* Hotel packages — flag-gated */}
        {showHotelPackages ? null : (
          <div className="text-center mb-10">
            <p className="font-kr-sans text-[14px] text-charcoal/45 border border-dashed border-ink-soft/20 rounded px-5 py-3 inline-block">
              {t('hotelPackageNote')}
            </p>
          </div>
        )}

        {!ticketsComingSoon && (
        <>
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
        </>
        )}

      </div>
    </section>
  );
}
