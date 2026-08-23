import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { SHUTTLE, LOOP_SHUTTLE, SALE_WINDOWS, isSaleOpen, isShuttleBookable, formatKRW } from '@/data/festival';
import { LOOP_DAYS, LoopTable, dayLabel } from '@/components/LoopTimetable';

// 셔틀 안내 전용 페이지 — 서울 셔틀 일정 + 춘천 무료 순환 시간표 (모든 시각 한국시간)
// 출처: 운영/스탭공지_정리_2026-08-23.md · 순환 시간표 = festival.ts LOOP_SHUTTLE

const BOOK_SHUTTLE_URL = 'https://kcctf-5047d.web.app/register/chuncheon-citf-2026?mode=shuttle';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '셔틀버스 안내 — KCCTF' : 'Shuttle Buses — KCCTF' };
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

  const loopCols = isKo
    ? { toHotels: ['봄내 출발', '에스턴', '더베네치아 도착'], toVenue: ['더베네치아 출발', '에스턴', '봄내 도착'] }
    : { toHotels: ['Dep. Bomnae', 'Eston', 'Arr. Venezia'], toVenue: ['Dep. Venezia', 'Eston', 'Arr. Bomnae'] };

  return (
    <div className="px-5 pt-[104px] md:pt-[128px] pb-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/#travel" className="inline-block font-en-body text-[11px] uppercase tracking-[0.22em] text-burgundy hover:underline">
          ← {isKo ? '홈으로' : 'Home'}
        </Link>
        <p className="mt-5 font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy">Shuttle Buses</p>
        <h1 className="mt-2 font-kr-serif font-black text-ink-soft leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          {isKo ? '셔틀버스 안내' : 'Shuttle Buses'}
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

        {/* ── B. 춘천 순환 셔틀 시간표 ──────────────────────────── */}
        <section className="mt-10 overflow-hidden rounded-lg border border-ink-soft/15 bg-warm-white shadow-card">
          <div className="bg-cream border-l-4 border-burgundy px-5 py-4">
            <p className="font-en-body text-[10px] font-bold uppercase tracking-[0.3em] text-gold">In Chuncheon · Free</p>
            <h2 className="mt-1 font-kr-serif text-[22px] font-black text-ink-soft">
              {isKo ? '춘천 순환 셔틀 시간표' : 'Chuncheon Loop Shuttle Timetable'}
            </h2>
            <p className="mt-1 font-kr-sans text-[13px] text-charcoal/70">
              {isKo
                ? `봄내체육관 → 에스턴호텔 +10분 → 더베네치아스위트 +20분 · 반대 방향 동일 · ${LOOP_SHUTTLE.capacity}인승 1대 · 무료 · 예약 없이 선착순 · 표기 시각보다 먼저 출발하지 않습니다`
                : `Bomnae → Eston +10 min → The Venezia +20 min · same in reverse · one ${LOOP_SHUTTLE.capacity}-seat bus · free · no booking · never departs before the listed time`}
            </p>
          </div>
          <div className="space-y-8 px-5 py-6">
            {LOOP_DAYS.map((d) => (
              <div key={d}>
                <p className="mb-3 font-kr-serif text-[17px] font-black text-ink-soft">{dayLabel(d, isKo)}</p>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <LoopTable title={isKo ? '행사장 → 호텔' : 'Venue → Hotels'} cols={loopCols.toHotels} deps={LOOP_SHUTTLE.toHotels[d]} lastLabel={isKo ? '막차' : 'Last'} />
                  <LoopTable title={isKo ? '호텔 → 행사장' : 'Hotels → Venue'} cols={loopCols.toVenue} deps={LOOP_SHUTTLE.toVenue[d]} lastLabel={isKo ? '막차' : 'Last'} />
                </div>
              </div>
            ))}
            <p className="border-t border-ink-soft/10 pt-4 font-kr-sans text-[12px] text-charcoal/55">
              {isKo
                ? '길이 막히면 몇 분 늦을 수 있습니다 · 탑승 전 정류장과 방향을 확인해 주세요 · 10/3(토) 콘서트 후 문화예술회관 → 봄내체육관 이동은 서울 셔틀로 함께 합니다'
                : 'Traffic may add a few minutes · check the stop and direction before boarding · on Sat Oct 3 the Seoul shuttles carry everyone from the Arts Center to Bomnae Complex after the concert'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
