import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { LOOP_SHUTTLE } from '@/data/festival';
import { LOOP_DAYS, LoopDayTable, dayLabel, nextDayLabel } from '@/components/LoopTimetable';

// 춘천 무료 순환 셔틀 — 정류장별 전체 시간표 (모든 시각 한국시간). 데이터: festival.ts LOOP_SHUTTLE
// 왼쪽 = 호텔 → 행사장 (오후에 먼저 타는 방향), 오른쪽 = 행사장 → 호텔 (밤·새벽)

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return { title: locale === 'ko' ? '춘천 순환 셔틀 시간표 — KCCTF' : 'Chuncheon Loop Shuttle Timetable — KCCTF' };
}

export default function ChuncheonShuttlePage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';
  const legend = isKo
    ? ['한 줄 = 한 시간대 · 왼쪽 호텔 → 행사장, 오른쪽 행사장 → 호텔 (출발 · 에스턴 · 도착 순)', '🟨 머스터드 칸 = 심야 30분 간격(한 시간대에 두 편)', '🌙 구분선 = 자정을 넘긴 새벽 · 셔틀은 표기된 시각보다 먼저 출발하지 않습니다']
    : ['One row = one hour · left Hotels → Venue, right Venue → Hotels (departure · Eston · arrival)', '🟨 Mustard cell = late-night 30-minute interval (two runs in one hour)', '🌙 Divider = after midnight · the shuttle never departs before the listed time'];

  return (
    <div className="bg-cream px-5 pt-[104px] md:pt-[128px] pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={`/${locale}#travel`} className="font-en-body text-[11px] uppercase tracking-[0.22em] text-burgundy hover:underline">
            ← {isKo ? '홈으로 (여행 안내)' : 'Home (Travel)'}
          </a>
          <Link href="/shuttle" className="font-en-body text-[11px] uppercase tracking-[0.22em] text-burgundy/70 hover:underline">
            {isKo ? '서울 셔틀 안내' : 'Seoul shuttle'} →
          </Link>
        </p>
        <p className="mt-5 font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy">In Chuncheon · Free Loop Shuttle</p>
        <h1 className="mt-2 font-kr-serif font-black text-ink-soft leading-[1.05] tracking-[-0.03em]" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          {isKo ? '춘천 순환 셔틀 시간표' : 'Chuncheon Loop Shuttle Timetable'}
        </h1>
        <p className="mt-2 font-kr-sans text-[14px] text-charcoal/70">
          {isKo
            ? `봄내체육관 ↔ 에스턴호텔 ↔ 더베네치아스위트 · ${LOOP_SHUTTLE.capacity}인승 1대 · 한 바퀴 60분 · 무료 · 예약 없이 선착순 · 모든 시각 한국시간`
            : `Bomnae Complex ↔ Eston Hotel ↔ The Venezia Suite · one ${LOOP_SHUTTLE.capacity}-seat bus · 60-minute loop · free · no booking · all times KST`}
        </p>

        {/* 노선 */}
        <div className="mt-6 rounded-lg border border-ink-soft/12 bg-warm-white px-5 py-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <p className="font-kr-sans text-[13px] text-ink-soft">
              <b className="text-burgundy">{isKo ? '호텔 → 행사장' : 'Hotels → Venue'}</b>
              <br />{isKo ? '더베네치아 출발 → 에스턴 +10분 → 봄내 도착 +20분' : 'Dep. Venezia → Eston +10 min → Arr. Bomnae +20 min'}
            </p>
            <p className="font-kr-sans text-[13px] text-ink-soft">
              <b className="text-burgundy">{isKo ? '행사장 → 호텔' : 'Venue → Hotels'}</b>
              <br />{isKo ? '봄내 출발 → 에스턴 +10분 → 더베네치아 도착 +20분' : 'Dep. Bomnae → Eston +10 min → Arr. Venezia +20 min'}
            </p>
          </div>
          <ul className="mt-3 space-y-0.5 border-t border-ink-soft/10 pt-3">
            {legend.map((l, i) => <li key={i} className="font-kr-sans text-[12px] text-charcoal/65">{l}</li>)}
          </ul>
        </div>

        {/* 날짜별 — 왼쪽 호텔→행사장, 오른쪽 행사장→호텔 */}
        <div className="mt-8 space-y-8">
          {LOOP_DAYS.map((d) => {
            const labels = {
              hourCol: isKo ? '시각' : 'Hour',
              toVenue: isKo ? '호텔 → 행사장' : 'Hotels → Venue',
              toHotels: isKo ? '행사장 → 호텔' : 'Venue → Hotels',
              toVenueStops: isKo ? '더베네치아 출발 · 에스턴 · 봄내 도착' : 'dep. Venezia · Eston · arr. Bomnae',
              toHotelsStops: isKo ? '봄내 출발 · 에스턴 · 더베네치아 도착' : 'dep. Bomnae · Eston · arr. Venezia',
              first: isKo ? '첫차' : 'first',
              last: isKo ? '막차' : 'last',
              afterMidnight: isKo ? `${nextDayLabel(d, isKo)} 새벽` : `${nextDayLabel(d, isKo)} early hours`,
              late: isKo ? '30분 간격' : 'every 30 min',
              hourSuffix: isKo ? '시' : ':00',
            };
            return (
              <section key={d} className="overflow-hidden rounded-lg border border-ink-soft/15 bg-warm-white shadow-card">
                <div className="bg-cream border-l-4 border-burgundy px-5 py-3 flex items-baseline justify-between">
                  <h2 className="font-kr-serif text-[20px] font-black text-ink-soft">{dayLabel(d, isKo)}</h2>
                  <span className="font-en-body text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/50">
                    {isKo ? `막차 ${LOOP_SHUTTLE.toHotels[d].slice(-1)[0]} 봄내 출발` : `last run ${LOOP_SHUTTLE.toHotels[d].slice(-1)[0]} from Bomnae`}
                  </span>
                </div>
                <div className="px-5 py-4">
                  <LoopDayTable toVenue={LOOP_SHUTTLE.toVenue[d]} toHotels={LOOP_SHUTTLE.toHotels[d]} labels={labels} />
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-6 font-kr-sans text-[12px] text-charcoal/55">
          {isKo
            ? '길이 막히면 몇 분 늦을 수 있습니다 · 탑승 전 정류장과 방향을 확인해 주세요 · 10/3(토) 콘서트 후 문화예술회관 → 봄내체육관 이동은 서울 셔틀로 함께 합니다'
            : 'Traffic may add a few minutes · check the stop and direction before boarding · on Sat Oct 3 the Seoul shuttles carry everyone from the Arts Center to Bomnae Complex after the concert'}
        </p>
      </div>
    </div>
  );
}
