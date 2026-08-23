import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { SHUTTLE, SALE_WINDOWS, isSaleOpen, isShuttleBookable, formatKRW } from '@/data/festival';

// 서울 셔틀 안내 페이지 (모든 시각 한국시간) — 춘천 순환 시간표는 /shuttle/chuncheon
// 출처: 운영/스탭공지_정리_2026-08-23.md · 순환 시간표 = festival.ts LOOP_SHUTTLE

const BOOK_SHUTTLE_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026?mode=shuttle';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '서울 셔틀 안내 — KCCTF' : 'Seoul Shuttle — KCCTF' };
}

type Step = { time: string; text: string };

export default function ShutttlePage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';
  const shuttleOpen = isSaleOpen(SALE_WINDOWS.shuttle);
  const bookable = isShuttleBookable();

  const outbound: Step[] = isKo
    ? [
        { time: '08:00', text: '홍대입구역 2번 출구(오초 인근) 집합 · 출발 — 샌드위치 제공' },
        { time: '도착', text: '춘천문화예술회관 — 점심 도시락' },
        { time: '13:00', text: '오프닝 콘서트 (문화예술회관)' },
        { time: '콘서트 후', text: '봄내체육관 → 에스턴호텔 → 더베네치아스위트' },
      ]
    : [
        { time: '08:00', text: 'Meet & depart — Hongik Univ. Station Exit 2 (near Ocho) · sandwich provided' },
        { time: 'Arrival', text: 'Chuncheon Culture & Arts Center — lunch box' },
        { time: '13:00', text: 'Opening concert (Arts Center)' },
        { time: 'After', text: 'Bomnae Complex → Eston Hotel → The Venezia Suite' },
      ];
  const returns: { label: string; steps: Step[] }[] = isKo
    ? [
        { label: '귀가편 ① — 10/5(월) 밤', steps: [
          { time: '24:00', text: '행사 종료 (애프터파티)' },
          { time: '00:30', text: '봄내체육관 출발 → 에스턴호텔 → 더베네치아스위트' },
          { time: '→', text: '서울역 경유 → 홍대입구 도착' },
        ] },
        { label: '귀가편 ② — 10/6(화) 오전', steps: [
          { time: '11:00', text: '호텔 체크아웃 후 출발 — 에스턴호텔 → 더베네치아스위트' },
          { time: '→', text: '서울역 경유 → 홍대입구 도착' },
        ] },
      ]
    : [
        { label: 'Return ① — Mon Oct 5, night', steps: [
          { time: '24:00', text: 'Last event ends (after-party)' },
          { time: '00:30', text: 'Depart Bomnae Complex → Eston Hotel → The Venezia Suite' },
          { time: '→', text: 'via Seoul Station → arrive Hongdae' },
        ] },
        { label: 'Return ② — Tue Oct 6, morning', steps: [
          { time: '11:00', text: 'Depart after hotel check-out — Eston Hotel → The Venezia Suite' },
          { time: '→', text: 'via Seoul Station → arrive Hongdae' },
        ] },
      ];
  const notes = isKo
    ? [
        '왕복권만 판매합니다 (편도 없음) · 예약 시 귀가편 ①/② 중 하나를 선택합니다 · 귀가편별 40석 선착순',
        '요금은 1인 왕복 ₩60,000 — 샌드위치·점심 도시락 포함',
        '환불 불가 · 양도는 9월 30일까지(양도인·양수인을 info@kcctf.org 에 고지) · 신청 후 3일 내 미입금 시 좌석 자동 해제',
        '모든 시각은 한국시간(KST)이며 교통 상황에 따라 변동될 수 있습니다. 확정 시 개별 안내드립니다.',
      ]
    : [
        'Round trip only · choose Return ① or ② when booking · 40 seats per return, first come first served',
        'Fare ₩60,000 per person round trip — sandwich and lunch box included',
        'Non-refundable · transfers until Sept 30 (notify info@kcctf.org of both parties) · seats are released if unpaid 3 days after booking',
        'All times are Korea Standard Time (KST) and may shift with traffic; we will notify you individually once confirmed.',
      ];

  return (
    <div className="bg-cream px-5 pt-[104px] md:pt-[128px] pb-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/#travel" className="inline-block font-en-body text-[11px] uppercase tracking-[0.22em] text-burgundy hover:underline">
          ← {isKo ? '홈으로' : 'Home'}
        </Link>
        <p className="mt-5 font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy">Seoul ↔ Chuncheon Shuttle</p>
        <h1 className="mt-2 font-kr-serif font-black text-ink-soft leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          {isKo ? '서울 셔틀 안내' : 'Seoul Shuttle'}
        </h1>
        <p className="mt-2 font-kr-sans text-[14px] text-charcoal/70">
          {isKo ? '모든 시각은 한국시간(KST) 기준입니다.' : 'All times are Korea Standard Time (KST).'}
        </p>

        {/* ── A. 서울 셔틀 ─────────────────────────────────────── */}
        <section className="mt-10 overflow-hidden rounded-lg border border-burgundy/35 bg-warm-white shadow-[4px_4px_0_#8B1A2B]">
          <div className="bg-cream border-l-4 border-burgundy px-5 py-4">
            <p className="font-en-body text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Seoul ↔ Chuncheon</p>
            <h2 className="mt-1 font-kr-serif text-[22px] font-black text-ink-soft">
              {isKo ? '서울 셔틀 — 홍대 ↔ 춘천 왕복' : 'Seoul Shuttle — Hongdae ↔ Chuncheon round trip'}
            </h2>
            <p className="mt-1 font-kr-sans text-[14px] text-ink-soft">
              {isKo ? '왕복' : 'Round trip'}{' '}
              <b className="font-en-display text-[22px] italic text-burgundy">{SHUTTLE.fare != null ? formatKRW(SHUTTLE.fare) : '—'}</b>
              <span className="ml-2 text-[12px] text-charcoal/60">{isKo ? '1인 · 도시락 포함' : 'per person · meals included'}</span>
            </p>
          </div>

          <div className="px-5 py-5 space-y-6">
            <div>
              <p className="mb-2 font-kr-sans text-[13px] font-bold text-burgundy">{isKo ? '가는 편 — 10/3(토)' : 'Outbound — Sat Oct 3'}</p>
              <ol className="space-y-1.5">
                {outbound.map((s, i) => (
                  <li key={i} className="flex gap-3 font-kr-sans text-[13.5px] leading-[1.6] text-charcoal/85">
                    <span className="w-[64px] shrink-0 font-en-body font-bold tabular-nums text-ink-soft">{s.time}</span>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {returns.map((r) => (
                <div key={r.label} className="rounded-md border border-ink-soft/12 bg-cream/50 p-4">
                  <p className="mb-2 font-kr-sans text-[13px] font-bold text-burgundy">{r.label}</p>
                  <ol className="space-y-1.5">
                    {r.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 font-kr-sans text-[13px] leading-[1.6] text-charcoal/85">
                        <span className="w-[48px] shrink-0 font-en-body font-bold tabular-nums text-ink-soft">{s.time}</span>
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <ul className="space-y-1.5 border-t border-ink-soft/10 pt-4">
              {notes.map((n, i) => (
                <li key={i} className="flex gap-2 font-kr-sans text-[12.5px] leading-[1.6] text-charcoal/70">
                  <span className="text-gold" aria-hidden>★</span><span>{n}</span>
                </li>
              ))}
            </ul>
            <div>
              {bookable ? (
                <a
                  href={BOOK_SHUTTLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-md bg-burgundy px-5 py-3 font-kr-sans text-[14px] font-bold text-warm-white shadow-[0_3px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_2px_0_#5A0E1B] sm:w-auto"
                >
                  {isKo ? '셔틀 예약하기 →' : 'Book the shuttle →'}
                </a>
              ) : (
                <p className="font-kr-sans text-[13px] font-bold text-burgundy">
                  🎫 {shuttleOpen
                    ? (isKo ? '예약 접수 준비 중 — 곧 열립니다' : 'Booking opens shortly')
                    : (isKo ? '8월 24일(월) 오전 9시 예약 시작 (한국시간)' : 'Booking opens Aug 24 (Mon) 09:00 KST')}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── 춘천 순환 셔틀은 별도 페이지 ───────────────────────── */}
        <Link
          href="/shuttle/chuncheon"
          className="mt-8 flex items-center justify-between gap-4 rounded-lg border border-ink-soft/15 bg-warm-white px-5 py-4 shadow-card transition-transform hover:-translate-y-[2px]"
        >
          <span>
            <span className="block font-en-body text-[10px] font-bold uppercase tracking-[0.3em] text-gold">In Chuncheon · Free</span>
            <span className="mt-1 block font-kr-serif text-[18px] font-black text-ink-soft">
              {isKo ? '춘천 순환 셔틀 시간표' : 'Chuncheon Loop Shuttle Timetable'}
            </span>
            <span className="mt-0.5 block font-kr-sans text-[12.5px] text-charcoal/65">
              {isKo ? '봄내체육관 ↔ 에스턴 ↔ 더베네치아 · 무료 · 예약 없이 선착순' : 'Bomnae ↔ Eston ↔ The Venezia · free · no booking'}
            </span>
          </span>
          <span className="shrink-0 font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">{isKo ? '시간표' : 'Timetable'} →</span>
        </Link>
      </div>
    </div>
  );
}
