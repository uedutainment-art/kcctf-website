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
