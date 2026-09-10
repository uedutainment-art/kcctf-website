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
// 한 줄 = 버스 한 대의 한 바퀴. 왼쪽 호텔→행사장(더베네치아·에스턴·봄내) 다음에 같은 버스의
// 오른쪽 행사장→호텔(봄내·에스턴·더베네치아)이 이어지도록, 왼쪽 출발은 반 바퀴(30분) 뒤 줄에 붙인다.
// 자정을 넘겨 시작하는 줄 앞에 날짜 구분선, 심야 30분 간격(한 칸에 두 편)은 머스터드 강조.
// ─────────────────────────────────────────────────────────────────────────────

/** 운행일 낮(12:00)부터 다음날 새벽까지를 한 축에 올리기 위한 정렬 키 (분). 00:00~11:59 는 다음날로 취급 */
function seqMinutes(t: string): number {
  const m = mins(t);
  return m < 12 * 60 ? m + 24 * 60 : m;
}

export type LoopDayLabels = {
  toVenueStops: string;  // 칸 제목 = 정류장 순서: 더베네치아 → 에스턴 → 봄내체육관
  toHotelsStops: string; // 봄내체육관 → 에스턴 → 더베네치아
  afterMidnight: string; // 자정 넘긴 구간 구분선
  late: string;          // 머스터드 칸 범례 (심야 30분 간격)
};

export function LoopDayTable({
  toVenue, toHotels, labels,
}: { toVenue: string[]; toHotels: string[]; labels: LoopDayLabels }) {
  const halfLoop = LOOP_SHUTTLE.loopMinutes / 2;
  const rows = new Map<number, { v: string[]; h: string[] }>();
  const put = (dir: 'v' | 'h', dep: string, shift: number) => {
    const key = Math.floor((seqMinutes(dep) + shift) / 60);
    const cur = rows.get(key) ?? { v: [], h: [] };
    cur[dir].push(dep);
    rows.set(key, cur);
  };
  toVenue.forEach((d) => put('v', d, halfLoop));
  toHotels.forEach((d) => put('h', d, 0));
  const keys = Array.from(rows.keys()).sort((a, b) => a - b);
  const rowStart = (k: number) => {
    const { v, h } = rows.get(k)!;
    return seqMinutes(v[0] ?? h[0]);
  };
  const hasLate = keys.some((k) => rows.get(k)!.v.length > 1 || rows.get(k)!.h.length > 1);

  const Cell = ({ deps }: { deps: string[] }) => {
    if (deps.length === 0) return <td className="py-2 text-center text-charcoal/25">—</td>;
    const late = deps.length > 1;
    return (
      <td className={['py-1.5 text-center', late ? 'bg-mustard/30 font-bold text-burgundy' : ''].join(' ')}>
        {deps.map((dep) => {
          const st = stopTimes(dep);
          return (
            <div key={dep} className="flex items-center justify-center gap-1 whitespace-nowrap py-0.5 sm:gap-2">
              <span>{st[0]}</span>
              <span className="text-charcoal/35">·</span>
              <span className="text-charcoal/70">{st[1]}</span>
              <span className="text-charcoal/35">·</span>
              <span>{st[2]}</span>
            </div>
          );
        })}
      </td>
    );
  };

  let dividerShown = false;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-en-body text-[12px] tabular-nums sm:text-[13px]">
        <thead>
          <tr className="border-b border-ink-soft/20">
            <th className="w-1/2 px-1 py-2.5 text-center font-kr-sans text-[12.5px] font-bold leading-snug text-burgundy sm:text-[14px]">{labels.toVenueStops}</th>
            <th className="w-1/2 px-1 py-2.5 text-center font-kr-sans text-[12.5px] font-bold leading-snug text-burgundy sm:text-[14px]">{labels.toHotelsStops}</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((k) => {
            const { v, h } = rows.get(k)!;
            const out: JSX.Element[] = [];
            if (!dividerShown && rowStart(k) >= 24 * 60) {
              dividerShown = true;
              out.push(
                <tr key={`mid-${k}`}>
                  <td colSpan={2} className="py-1.5">
                    <div className="flex items-center gap-2">
                      <span className="h-px flex-1 bg-burgundy/25" />
                      <span className="font-kr-sans text-[10.5px] font-bold tracking-[0.12em] text-burgundy/80">🌙 {labels.afterMidnight}</span>
                      <span className="h-px flex-1 bg-burgundy/25" />
                    </div>
                  </td>
                </tr>,
              );
            }
            out.push(
              <tr key={k} className="border-b border-ink-soft/10 text-ink-soft">
                <Cell deps={v} />
                <Cell deps={h} />
              </tr>,
            );
            return out;
          })}
        </tbody>
        {/* 범례를 표 안(tfoot)에 둬야 표가 화면보다 넓어져 가로 스크롤될 때도(앱 내 브라우저 글자 확대 등) 표 가운데에 붙어 다닌다 */}
        {hasLate && (
          <tfoot>
            <tr>
              <td colSpan={2} className="pt-3 text-center">
                <span className="inline-flex items-center gap-2 font-kr-sans text-[14px] font-bold text-burgundy">
                  <span aria-hidden className="inline-block h-3.5 w-3.5 rounded-sm bg-mustard/60 ring-1 ring-burgundy/25" />
                  {labels.late}
                </span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
