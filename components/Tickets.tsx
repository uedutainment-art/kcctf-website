import { useLocale, useTranslations } from 'next-intl';
import { TICKET_TIERS, DAY_PASS, formatKRW } from '@/data/festival';
import RegisterButton from './RegisterButton';
import MotionReveal from './MotionReveal';

// 등록 플랫폼(별도 서비스) 직접 링크 — ⚠️ 비공개 초대(invite) 링크는 넣지 말 것
const REGISTER_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026';
const BOOK_HOTEL_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026?mode=hotel';

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

        {/* 2차 얼리버드 오픈 공지 — 티켓 + 숙박 요약 + CTA */}
        {ticketsComingSoon && (
          <MotionReveal className="mx-auto mb-10 max-w-[760px] overflow-hidden rounded-lg border-2 border-burgundy/25 bg-cream text-center shadow-stamp" delay={100}>
            {/* 티켓 */}
            <div className="px-6 py-8 sm:px-10">
              <p className="font-kr-sans text-[15px] font-bold text-burgundy">
                {isKo ? '🎉 2차 얼리버드 오픈' : '🎉 2nd Early Bird is Open'}
              </p>
              <p className="mt-3 font-kr-serif text-[23px] font-black leading-tight text-ink-soft sm:text-[28px]">
                {isKo ? '풀패스 (3일)' : 'Full Pass (3 days)'}
              </p>
              <p className="font-en-display text-[38px] font-black italic leading-none text-burgundy sm:text-[46px]">
                ₩190,000
              </p>
              <p className="mt-2 font-kr-sans text-[14px] text-charcoal/70">
                {isKo ? '7월 31일까지 · 조기 마감될 수 있습니다' : 'Until July 31 · may close early'}
              </p>
              {/* 일일권(데이패스) — 요일 구분 없음 · 얼리버드 9/1~15 온라인, 이후 현장 */}
              <div className="mx-auto mt-5 max-w-[440px] rounded-lg border border-ink-soft/12 bg-warm-white/60 px-5 py-4">
                <p className="font-en-body text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                  {isKo ? '일일권 · 데이패스 (토·일·월 동일가)' : 'Day Pass (same price Sat–Mon)'}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 font-kr-sans text-[15px] text-ink-soft">
                  <span>
                    {isKo ? '얼리버드' : 'Early bird'}{' '}
                    <b className="font-en-display text-[18px] italic text-burgundy">{formatKRW(DAY_PASS.early)}</b>
                  </span>
                  <span className="text-charcoal/25" aria-hidden>·</span>
                  <span>
                    {isKo ? '현장' : 'On-site'}{' '}
                    <b className="font-en-display text-[18px] italic text-burgundy">{formatKRW(DAY_PASS.onsite)}</b>
                  </span>
                </div>
                <p className="mt-2 font-kr-sans text-[12px] leading-[1.55] text-charcoal/55">
                  {isKo
                    ? '얼리버드는 9월 1일~15일에만 온라인 판매 · 이후에는 행사 당일 현장에서 · 토요일권은 문화예술회관 오프닝 콘서트 포함'
                    : 'Early-bird online sales Sept 1–15 (KST) only · afterwards on-site on event days · the Saturday pass includes the arts-center opening concert'}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-burgundy px-6 py-3.5 font-kr-sans text-[15px] font-bold text-warm-white shadow-[0_4px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[0_2px_0_#5A0E1B]"
                >
                  {isKo ? '참가 신청 — 2차 얼리버드' : 'Register — 2nd Early Bird'}
                </a>
                <a
                  href={BOOK_HOTEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border-2 border-burgundy/60 bg-warm-white/60 px-6 py-3.5 font-kr-sans text-[14px] font-bold text-burgundy transition-colors hover:border-burgundy hover:bg-warm-white"
                >
                  {isKo ? '숙박만 예약' : 'Accommodation only'}
                </a>
              </div>
            </div>
            {/* 숙박 요약 */}
            <div className="border-t border-ink-soft/12 bg-warm-white/50 px-6 py-6 sm:px-10">
              <p className="font-en-body text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
                {isKo ? '공식 숙박 · 2개 호텔' : 'Official Hotels · 2'}
              </p>
              <p className="mt-2 font-kr-sans text-[14px] leading-relaxed text-ink-soft">
                {isKo ? '더베네치아스위트 · 스탠다드 더블 ₩90,000/박' : 'The Venezia Suite · Standard Double ₩90,000/night'}
              </p>
              <p className="font-kr-sans text-[14px] leading-relaxed text-ink-soft">
                {isKo ? '에스턴호텔 · 디럭스 더블/트윈 ₩120,000 · 패밀리 트윈 ₩170,000/박' : 'Eston Hotel · Deluxe Double/Twin ₩120,000 · Family Twin ₩170,000/night'}
              </p>
              <p className="mt-2 font-kr-sans text-[12px] text-charcoal/55">
                {isKo ? '2~4박 패키지 · 신청 폼에서 객실 선택 (선착순) · 실시간 잔여는 아래 숙소 섹션' : '2–4 night packages · pick your room in the form (first-come) · live availability below'}
              </p>
            </div>
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
