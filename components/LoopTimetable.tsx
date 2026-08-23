import { LOOP_SHUTTLE, SCHEDULE_ITEMS, addMinutes, type ScheduleDay } from '@/data/festival';

// 춘천 무료 순환 셔틀 시간표 — Travel 섹션(요약)과 /shuttle 페이지(전체)가 공용으로 사용
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

/** 한 방향 전체 시간표 — 막차 행은 회색 + '막차' 라벨 */
export function LoopTable({
  title, cols, deps, lastLabel,
}: { title: string; cols: string[]; deps: string[]; lastLabel: string }) {
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
          <tbody>
            {deps.map((dep, i) => {
              const isLast = i === deps.length - 1;
              return (
                <tr key={dep} className={['border-b border-ink-soft/8', isLast ? 'text-charcoal/50' : 'text-ink-soft'].join(' ')}>
                  {stopTimes(dep).map((t, j) => (
                    <td key={j} className="py-1.5 text-center">
                      {t}
                      {isLast && j === 0 && <span className="ml-1 font-kr-sans text-[10px]">{lastLabel}</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
