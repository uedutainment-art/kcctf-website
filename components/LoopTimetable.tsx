import { LOOP_SHUTTLE, SCHEDULE_ITEMS, addMinutes, type ScheduleDay } from '@/data/festival';

// 춘천 무료 순환 셔틀 시간표 — Travel 섹션(요약)과 /shuttle/chuncheon 페이지(전체)가 공용으로 사용
export const LOOP_DAYS: ScheduleDay[] = ['10/3', '10/4', '10/5'];

/** 정류장 3곳 시각 행 (출발 + 10분 + 20분) */
export function stopTimes(dep: string): string[] {
  return LOOP_SHUTTLE.offsets.map((o) => addMinutes(dep, o));
}

/** 10/3(토) / Sat Oct 3 */
export function dayLabel(d: ScheduleDay, isKo: boolean): string {
  const dow = SCHEDULE_ITEMS.find((s) => s.day === d)?.dow ?? 'SAT';
  const ko = { SAT: '토', SUN: '일', MON: '월' }[dow];
  const en = { SAT: 'Sat', SUN: 'Sun', MON: 'Mon' }[dow];
  return isKo ? `${d}(${ko})` : `${en} Oct ${d.split('/')[1]}`;
}

/** 자정을 넘긴 뒤의 날짜 라벨 — 10/4(일) / Sun Oct 4 */
export function nextDayLabel(d: ScheduleDay, isKo: boolean): string {
  const map = { '10/3': ['10/4(일)', 'Sun Oct 4'], '10/4': ['10/5(월)', 'Mon Oct 5'], '10/5': ['10/6(화)', 'Tue Oct 6'] } as const;
  return map[d][isKo ? 0 : 1];
}

const mins = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export type LoopTableLabels = {
  first: string;       // 첫차
  last: string;        // 막차
  afterMidnight: string; // "10/4(일) 새벽" — 자정 넘긴 구간 구분선
  late: string;        // "심야 30분 간격"
};

/**
 * 한 방향 전체 시간표.
 *  - 자정을 넘기는 지점에 날짜 구분선
 *  - 30분 간격 구간(심야)은 머스터드 배경 + 버건디 글자로 강조
 *  - 첫차·막차 라벨
 */
export function LoopTable({
  title, cols, deps, labels,
}: { title: string; cols: string[]; deps: string[]; labels: LoopTableLabels }) {
  const rows: JSX.Element[] = [];
  let lateBadgeShown = false;
  deps.forEach((dep, i) => {
    const prev = i > 0 ? deps[i - 1] : null;
    const crossedMidnight = prev != null && mins(dep) < mins(prev);
    const isLate = prev != null && ((mins(dep) - mins(prev) + 1440) % 1440) === 30;
    const isFirst = i === 0;
    const isLast = i === deps.length - 1;
    if (crossedMidnight) {
      rows.push(
        <tr key={`mid-${dep}`}>
          <td colSpan={cols.length} className="py-1.5">
            <div className="flex items-center gap-2">
              <span className="h-px flex-1 bg-burgundy/25" />
              <span className="font-kr-sans text-[10.5px] font-bold tracking-[0.12em] text-burgundy/80">🌙 {labels.afterMidnight}</span>
              <span className="h-px flex-1 bg-burgundy/25" />
            </div>
          </td>
        </tr>,
      );
    }
    const showLateBadge = isLate && !lateBadgeShown;
    if (showLateBadge) lateBadgeShown = true;
    rows.push(
      <tr
        key={dep}
        className={[
          'border-b border-ink-soft/8',
          isLate ? 'bg-mustard/30 font-bold text-burgundy' : 'text-ink-soft',
          isLast ? 'text-charcoal/60' : '',
        ].join(' ')}
      >
        {stopTimes(dep).map((t, j) => (
          <td key={j} className="relative py-1.5 text-center">
            {t}
            {j === 0 && isFirst && <span className="ml-1 font-kr-sans text-[10px] font-normal text-charcoal/50">{labels.first}</span>}
            {j === 0 && isLast && <span className="ml-1 font-kr-sans text-[10px] font-normal text-charcoal/50">{labels.last}</span>}
            {j === cols.length - 1 && showLateBadge && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-burgundy px-1.5 py-[1px] font-kr-sans text-[9px] font-bold text-warm-white">
                {labels.late}
              </span>
            )}
          </td>
        ))}
      </tr>,
    );
  });
  return (
    <div className="min-w-0">
      <p className="mb-2 font-kr-sans text-[13px] font-bold text-burgundy">{title}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-en-body text-[13px] tabular-nums">
          <thead>
            <tr className="border-b border-ink-soft/20">
              {cols.map((c) => (
                <th key={c} className="py-1.5 text-center font-kr-sans text-[11px] font-bold text-charcoal/55">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 시각 기준 정렬 표 — 한 줄 = 한 시간대. 왼쪽 호텔→행사장, 오른쪽 행사장→호텔이 같은 선상에 놓임.
// 자정 이후는 구분선 + 날짜 라벨, 심야 30분 간격 시간대는 셀 안에 두 편이 들어가고 머스터드 강조.
// ─────────────────────────────────────────────────────────────────────────────

/** 운행일 낮(12:00)부터 다음날 새벽까지를 한 축에 올리기 위한 정렬 키 (분). 00:00~11:59 는 다음날로 취급 */
function seqMinutes(t: string): number {
  const m = mins(t);
  return m < 12 * 60 ? m + 24 * 60 : m;
}

export type LoopDayLabels = {
  hourCol: string;      // 시각
  toVenue: string;      // 호텔 → 행사장
  toHotels: string;     // 행사장 → 호텔
  toVenueStops: string; // 더베네치아 · 에스턴 · 봄내
  toHotelsStops: string;// 봄내 · 에스턴 · 더베네치아
  first: string; last: string; afterMidnight: string; late: string;
  hourSuffix: string;   // 시 / :00
};

export function LoopDayTable({
  toVenue, toHotels, labels,
}: { toVenue: string[]; toHotels: string[]; labels: LoopDayLabels }) {
  // 시간대(정렬 키의 시) → 양방향 출발 시각 목록
  const slots = new Map<number, { v: string[]; h: string[] }>();
  const put = (dir: 'v' | 'h', dep: string) => {
    const key = Math.floor(seqMinutes(dep) / 60);
    const cur = slots.get(key) ?? { v: [], h: [] };
    cur[dir].push(dep);
    slots.set(key, cur);
  };
  toVenue.forEach((d) => put('v', d));
  toHotels.forEach((d) => put('h', d));
  const keys = Array.from(slots.keys()).sort((a, b) => a - b);

  const firstV = toVenue[0], lastV = toVenue[toVenue.length - 1];
  const firstH = toHotels[0], lastH = toHotels[toHotels.length - 1];

  const Cell = ({ deps, first, last }: { deps: string[]; first: string; last: string }) => {
    if (deps.length === 0) return <td className="py-2 text-center text-charcoal/25">—</td>;
    const late = deps.length > 1; // 같은 시간대에 두 편 = 30분 간격
    return (
      <td className={['py-1.5 text-center', late ? 'bg-mustard/30 font-bold text-burgundy' : ''].join(' ')}>
        {deps.map((dep) => {
          const st = stopTimes(dep);
          const isFirst = dep === first, isLast = dep === last;
          return (
            <div key={dep} className={['flex items-center justify-center gap-2 py-0.5', isLast ? 'text-charcoal/55' : ''].join(' ')}>
              <span>{st[0]}</span>
              <span className="text-charcoal/35">·</span>
              <span className="text-charcoal/70">{st[1]}</span>
              <span className="text-charcoal/35">·</span>
              <span>{st[2]}</span>
              {isFirst && <span className="font-kr-sans text-[10px] font-normal text-charcoal/50">{labels.first}</span>}
              {isLast && <span className="font-kr-sans text-[10px] font-normal text-charcoal/50">{labels.last}</span>}
            </div>
          );
        })}
      </td>
    );
  };

  let dividerShown = false;
  let lateBadgeShown = false;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-en-body text-[13px] tabular-nums">
        <thead>
          <tr className="border-b border-ink-soft/20">
            <th className="w-[56px] py-1.5 text-left font-kr-sans text-[11px] font-bold text-charcoal/55">{labels.hourCol}</th>
            <th className="py-1.5 text-center">
              <span className="block font-kr-sans text-[12px] font-bold text-burgundy">{labels.toVenue}</span>
              <span className="block font-kr-sans text-[10.5px] font-normal text-charcoal/50">{labels.toVenueStops}</span>
            </th>
            <th className="py-1.5 text-center">
              <span className="block font-kr-sans text-[12px] font-bold text-burgundy">{labels.toHotels}</span>
              <span className="block font-kr-sans text-[10.5px] font-normal text-charcoal/50">{labels.toHotelsStops}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => {
            const { v, h } = slots.get(k)!;
            const hour = k % 24;
            const rows: JSX.Element[] = [];
            if (k >= 24 && !dividerShown) {
              dividerShown = true;
              rows.push(
                <tr key={`mid-${k}`}>
                  <td colSpan={3} className="py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="h-px flex-1 bg-burgundy/25" />
                      <span className="font-kr-sans text-[10.5px] font-bold tracking-[0.12em] text-burgundy/80">🌙 {labels.afterMidnight}</span>
                      <span className="h-px flex-1 bg-burgundy/25" />
                    </div>
                  </td>
                </tr>,
              );
            }
            const isLateRow = h.length > 1 || v.length > 1;
            const showBadge = isLateRow && !lateBadgeShown;
            if (showBadge) lateBadgeShown = true;
            rows.push(
              <tr key={k} className="border-b border-ink-soft/8 text-ink-soft">
                <td className="py-2 whitespace-nowrap font-kr-sans text-[12px] font-bold text-charcoal/70">
                  {String(hour).padStart(2, '0')}{labels.hourSuffix}
                  {showBadge && (
                    <span className="ml-1.5 rounded-full bg-burgundy px-1.5 py-[1px] font-kr-sans text-[9px] font-bold text-warm-white">{labels.late}</span>
                  )}
                </td>
                <Cell deps={v} first={firstV} last={lastV} />
                <Cell deps={h} first={firstH} last={lastH} />
              </tr>,
            );
            return rows;
          })}
        </tbody>
      </table>
    </div>
  );
}
