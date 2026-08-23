import { Fragment } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SALE_WINDOWS, SHUTTLE, LOOP_SHUTTLE, isSaleOpen, isShuttleBookable, formatKRW } from '@/data/festival';
import MotionReveal from './MotionReveal';
import { LOOP_DAYS, dayLabel } from './LoopTimetable';

// 셔틀 전용 접수 창구 (숙박 ?mode=hotel 과 같은 패턴)
const BOOK_SHUTTLE_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026?mode=shuttle';

type Hotel = {
  name: string;
  nameEn: string;
  address: string;
  tel: string;
  tag: string;
  mapQuery: string;
};

type Way = {
  badge: string;
  title: string;
  rows: { emoji: string; text: string }[];
};

type Tip = {
  emoji: string;
  name: string;
  desc: string;
};

type ShuttleCopy = {
  eyebrow: string;
  title: string;
  lede: string;
  seoul: {
    badge: string; title: string; statusOpen: string; statusBefore: string; statusPending: string;
    fareNote: string; rows: { k: string; v: string }[]; cta: string; detail: string;
  };
  loop: {
    badge: string; free: string; title: string; route: string;
    rows: { k: string; v: string }[]; toVenueLabel: string; toHotelsLabel: string; firstLabel: string; lastLabel: string; cta: string;
  };
  timeNote: string;
};

/** 하우스 스타일 소제목 — 골드 eyebrow + 세리프 타이틀 */
function SubHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mt-16 first:mt-0 mb-6 text-center">
      <p className="font-en-body font-bold text-[10px] tracking-[0.4em] uppercase text-gold mb-2">
        <span aria-hidden>★</span>&nbsp; {eyebrow} &nbsp;<span aria-hidden>★</span>
      </p>
      <h3
        className="font-kr-serif font-black text-ink-soft leading-[1.05] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(22px, 2.6vw, 30px)' }}
      >
        {title}
      </h3>
    </div>
  );
}

export default function Travel() {
  const t = useTranslations('travel');
  const locale = useLocale();
  const isKo = locale === 'ko';

  const hotels = t.raw('hotels') as Hotel[];
  const ways = t.raw('ways') as Way[];
  const tips = t.raw('tips') as Tip[];
  const sh = t.raw('shuttles') as ShuttleCopy;
  // 서울 셔틀 예약 — 한국시간(KST) 8/24 00:00부터. 요금+좌석 수가 확정돼야 예약 버튼 노출 (플랫폼 fail-closed와 동일 조건)
  const shuttleOpen = isSaleOpen(SALE_WINDOWS.shuttle);
  const shuttleBookable = isShuttleBookable();
  const day = (d: (typeof LOOP_DAYS)[number]) => dayLabel(d, isKo);

  return (
    <section id="travel" className="bg-warm-white py-16">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* ── Header (섹션 공통 문법) ─────────────────────────── */}
        <MotionReveal className="text-center mb-14">
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

        {/* ── Hotel — 스탬프 섀도 카드 ─────────────────────────── */}
        <SubHead eyebrow="Hotel" title={t('hotelsTitle')} />
        <p className="font-kr-sans text-[14px] text-charcoal/65 text-center -mt-3 mb-6">{t('hotelsLede')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[840px] mx-auto">
          {hotels.map((h) => (
            <MotionReveal
              key={h.name}
              className="relative overflow-hidden rounded-lg bg-cream p-6 shadow-[4px_4px_0_#8B1A2B] transition-transform duration-200 hover:-translate-y-[3px]"
            >
              <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{ backgroundImage: "url('/images/grain.svg')", backgroundSize: '160px 160px', mixBlendMode: 'multiply' }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-en-display italic text-[22px] text-gold leading-tight">{h.name}</p>
                <p className="font-en-body text-[11px] uppercase tracking-[0.14em] text-charcoal/50 mt-0.5">
                  {h.nameEn}
                </p>
                <p className="mt-4 font-kr-sans text-[13.5px] text-ink-soft">📍 {h.address}</p>
                <p className="mt-1 font-kr-sans text-[13px] text-charcoal/60">☎ {h.tel}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="rounded-full border border-gold/50 bg-gold/[0.08] px-3 py-[3px] font-kr-sans text-[11.5px] font-bold text-gold">
                    {h.tag}
                  </span>
                  <span className="flex items-center gap-3">
                    <a
                      href={`https://map.naver.com/p/search/${encodeURIComponent(h.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b-2 border-burgundy/50 pb-[1px] font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy transition-colors hover:border-burgundy"
                    >
                      Naver ↗
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(h.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b-2 border-ink-soft/30 pb-[1px] font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft/70 transition-colors hover:border-ink-soft"
                    >
                      Google ↗
                    </a>
                  </span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
        <p className="mt-5 text-center">
          <a
            href="#accommodation"
            className="inline-flex items-center justify-center rounded-md border-2 border-burgundy/60 bg-warm-white px-5 py-2.5 font-kr-sans text-[13px] font-bold text-burgundy transition-colors hover:border-burgundy hover:bg-cream"
          >
            {t('hotelsCta')}
          </a>
        </p>

        {/* ── 오시는 길 — STEP 1 · STEP 2 · 한 번에 (3카드) ────── */}
        <SubHead eyebrow="Getting Here" title={t('waysTitle')} />
        <p className="font-kr-sans text-[14px] text-charcoal/65 text-center -mt-3 mb-6">{t('waysLede')}</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ways.map((w) => (
            <MotionReveal key={w.badge} className="overflow-hidden rounded-lg border border-ink-soft/10 bg-warm-white shadow-card">
              {/* 헤더 — 스케줄 데이헤더 문법 (cream + 버건디 좌측 보더) */}
              <div className="bg-cream border-l-4 border-burgundy px-5 py-3 flex items-baseline gap-3">
                <span className="rounded bg-burgundy px-2 py-[2px] font-en-body text-[10px] font-bold tracking-[0.14em] uppercase text-warm-white">
                  {w.badge}
                </span>
                <span className="font-kr-sans text-[15px] font-bold text-ink-soft">{w.title}</span>
              </div>
              <ul className="px-5 py-4 space-y-3.5">
                {w.rows.map((r, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[20px] leading-[1.3] shrink-0" aria-hidden>{r.emoji}</span>
                    <span className="font-kr-sans text-[13px] leading-[1.6] text-charcoal/85">{r.text}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
        <p className="mt-5 mx-auto max-w-[720px] rounded-lg bg-mustard/25 border border-gold/30 px-5 py-3.5 text-center font-kr-sans text-[13px] leading-relaxed text-ink-soft">
          {t('arrivalNote')}
        </p>

        {/* ── Shuttle Buses — 서울 셔틀(예약) · 춘천 순환(무료) 나란히 ───── */}
        <SubHead eyebrow={sh.eyebrow} title={sh.title} />
        <p className="font-kr-sans text-[14px] text-charcoal/65 text-center -mt-3 mb-6">{sh.lede}</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* 서울 셔틀 — 예약제 (스탬프 섀도) */}
          <MotionReveal className="flex flex-col overflow-hidden rounded-lg border border-burgundy/35 bg-warm-white shadow-[4px_4px_0_#8B1A2B]">
            <div className="flex items-center justify-between gap-3 border-l-4 border-burgundy bg-cream px-5 py-3">
              <span className="rounded bg-burgundy px-2 py-[2px] font-en-body text-[10px] font-bold tracking-[0.14em] uppercase text-warm-white">
                {sh.seoul.badge}
              </span>
              {shuttleBookable ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-burgundy px-3 py-1 font-kr-sans text-[12px] font-bold text-warm-white">
                  <span className="h-2 w-2 rounded-full bg-gold-soft" aria-hidden />
                  {sh.seoul.statusOpen}
                </span>
              ) : (
                <span className="rounded-full border border-burgundy/40 bg-warm-white px-3 py-1 font-kr-sans text-[12px] font-bold text-burgundy">
                  {shuttleOpen ? sh.seoul.statusPending : sh.seoul.statusBefore}
                </span>
              )}
            </div>
            <div className="flex-1 px-5 pt-4">
              <h4 className="font-kr-serif text-[19px] font-black text-ink-soft">{sh.seoul.title}</h4>
              {SHUTTLE.fare != null && (
                <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-en-display text-[30px] font-black italic leading-none text-burgundy">{formatKRW(SHUTTLE.fare)}</span>
                  <span className="font-kr-sans text-[12px] text-charcoal/60">{sh.seoul.fareNote}</span>
                </p>
              )}
              <dl className="mt-4 space-y-2">
                {sh.seoul.rows.map((r) => (
                  <div key={r.k} className="flex gap-3">
                    <dt className="w-[76px] shrink-0 font-kr-sans text-[12px] font-bold text-gold">{r.k}</dt>
                    <dd className="font-kr-sans text-[13px] leading-[1.55] text-charcoal/85">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink-soft/10 px-5 py-4">
              {shuttleBookable && (
                <a
                  href={BOOK_SHUTTLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-md bg-burgundy px-5 py-3 font-kr-sans text-[14px] font-bold text-warm-white shadow-[0_3px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_2px_0_#5A0E1B]"
                >
                  {sh.seoul.cta} →
                </a>
              )}
              <Link
                href="/shuttle"
                className={[
                  'inline-flex items-center justify-center rounded-md border-2 px-5 py-3 font-kr-sans text-[13px] font-bold transition-colors',
                  shuttleBookable
                    ? 'border-burgundy/40 text-burgundy hover:border-burgundy'
                    : 'flex-1 border-burgundy/60 bg-warm-white text-burgundy hover:border-burgundy hover:bg-cream',
                ].join(' ')}
              >
                {sh.seoul.detail} →
              </Link>
            </div>
          </MotionReveal>

          {/* 춘천 순환 셔틀 — 무료 */}
          <MotionReveal className="flex flex-col overflow-hidden rounded-lg border border-gold/50 bg-cream shadow-card">
            <div className="flex items-center justify-between gap-3 border-l-4 border-gold bg-warm-white px-5 py-3">
              <span className="rounded bg-gold px-2 py-[2px] font-en-body text-[10px] font-bold tracking-[0.14em] uppercase text-ink">
                {sh.loop.badge}
              </span>
              <span className="rounded-full bg-gold px-3.5 py-1 font-en-display text-[15px] font-black italic leading-none text-ink">
                FREE · {sh.loop.free}
              </span>
            </div>
            <div className="flex-1 px-5 pt-4">
              <h4 className="font-kr-serif text-[19px] font-black text-ink-soft">{sh.loop.title}</h4>
              <p className="mt-1 font-kr-sans text-[13px] font-bold text-ink-soft/80">{sh.loop.route}</p>
              <dl className="mt-4 space-y-2">
                {sh.loop.rows.map((r) => (
                  <div key={r.k} className="flex gap-3">
                    <dt className="w-[76px] shrink-0 font-kr-sans text-[12px] font-bold text-gold">{r.k}</dt>
                    <dd className="font-kr-sans text-[13px] leading-[1.55] text-charcoal/85">{r.v}</dd>
                  </div>
                ))}
                {/* 방향별 첫차·막차 — 호텔→행사장(오후 첫차) 먼저, 행사장→호텔(새벽 막차) 다음 */}
                <div className="flex gap-3">
                  <dt className="w-[76px] shrink-0 font-kr-sans text-[12px] font-bold text-gold">{sh.loop.toVenueLabel}</dt>
                  <dd className="font-kr-sans text-[13px] leading-[1.55] text-charcoal/85">
                    <span className="text-charcoal/55">{sh.loop.firstLabel}</span>{' '}
                    {LOOP_DAYS.map((d) => `${day(d)} ${LOOP_SHUTTLE.toVenue[d][0]}`).join(' · ')}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-[76px] shrink-0 font-kr-sans text-[12px] font-bold text-gold">{sh.loop.toHotelsLabel}</dt>
                  <dd className="font-kr-sans text-[13px] leading-[1.55] text-charcoal/85">
                    <span className="text-charcoal/55">{sh.loop.lastLabel}</span>{' '}
                    {LOOP_DAYS.map((d) => `${day(d)} ${LOOP_SHUTTLE.toHotels[d][LOOP_SHUTTLE.toHotels[d].length - 1]}`).join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-4 border-t border-ink-soft/10 px-5 py-4">
              <Link
                href="/shuttle/chuncheon"
                className="inline-flex w-full items-center justify-center rounded-md border-2 border-gold/70 bg-warm-white px-5 py-3 font-kr-sans text-[13px] font-bold text-ink-soft transition-colors hover:border-gold hover:bg-mustard/30"
              >
                {sh.loop.cta} →
              </Link>
            </div>
          </MotionReveal>
        </div>
        <p className="mt-3 text-center font-kr-sans text-[11.5px] text-charcoal/50">{sh.timeNote}</p>

        {/* ── Good to Know — 해외 참가자 팁 (4) ─────────────────── */}
        <SubHead eyebrow="For International Guests" title={t('tipsTitle')} />
        <p className="font-kr-sans text-[14px] text-charcoal/65 text-center -mt-3 mb-6">{t('tipsLede')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((o) => (
            <div key={o.name} className="relative bg-cream border border-ink-soft/12 rounded-lg p-5 flex items-start gap-4 transition-transform duration-200 hover:-translate-y-[2px]">
              <span className="text-[34px] leading-none shrink-0" aria-hidden>{o.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="font-kr-sans font-bold text-[15px] text-ink leading-tight mb-1.5">{o.name}</p>
                <p className="font-kr-sans text-[12.5px] leading-[1.6] text-charcoal/70">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Eat Out — TBA 점선 + 골드 ★ ───────────────────────── */}
        <SubHead eyebrow="Chuncheon Local Food" title={t('eatTitle')} />
        <div className="mx-auto max-w-[720px] rounded-lg border-2 border-dashed border-ink-soft/25 px-6 py-10 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ornament-divider.svg" alt="" aria-hidden className="opacity-25 w-20 mx-auto" />
          <span
            className="block font-en-display italic font-black text-gold-soft leading-none my-3"
            style={{ fontSize: '56px' }}
            aria-hidden
          >
            ★
          </span>
          <p className="font-kr-sans text-[15px] text-charcoal/80 max-w-lg mx-auto">{t('eatLede')}</p>
          <p className="mt-5 inline-block rounded-full bg-mustard/60 px-4 py-1.5 font-kr-sans text-[13px] font-bold text-ink-soft">
            {t('eatComingSoon')}
          </p>
          <p className="mt-3 font-en-body text-[11px] tracking-[0.18em] uppercase text-ink-soft/50">
            {t('eatNote')}
          </p>
        </div>

      </div>
    </section>
  );
}
