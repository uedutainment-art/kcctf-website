'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SCHEDULE_ITEMS, DJS, ORCHESTRA_SHORT, type ScheduleDay } from '@/data/festival';

const DAYS: { day: ScheduleDay; tabKey: string }[] = [
  { day: '10/3', tabKey: 'tabs.day1' },
  { day: '10/4', tabKey: 'tabs.day2' },
  { day: '10/5', tabKey: 'tabs.day3' },
];

const TYPE_ICON: Record<string, string> = {
  concert:    '🎼',
  milonga:    '💃',
  tour:       '🌿',
  afterparty: '🌙',
};

export default function Schedule() {
  const t = useTranslations('schedule');
  const isKo = useLocale() === 'ko';
  const [activeDay, setActiveDay] = useState<ScheduleDay>('10/3');

  const dayItems = SCHEDULE_ITEMS.filter((item) => item.day === activeDay);

  return (
    <section id="schedule" className="bg-mustard-soft py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-3">
            {t('eyebrow')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink-soft leading-[1.0] tracking-[-0.04em] mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            {t('title')}
          </h2>
          <p className="font-kr-sans text-[16px] text-charcoal/80 max-w-xl mx-auto">
            {t('lede')}
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-6" role="tablist" aria-label="일정 날짜">
          {DAYS.map(({ day, tabKey }) => (
            <button
              key={day}
              role="tab"
              aria-selected={activeDay === day}
              onClick={() => setActiveDay(day)}
              className={[
                'flex-1 py-3 px-2 text-center font-en-body font-bold text-[12px] tracking-[0.08em] rounded-[4px] transition-colors duration-200 border-2',
                activeDay === day
                  ? 'bg-burgundy text-warm-white border-burgundy'
                  : 'bg-transparent text-ink-soft border-ink-soft/30 hover:border-ink-soft/60',
              ].join(' ')}
            >
              {t(tabKey)}
            </button>
          ))}
        </div>

        {/* Schedule card */}
        <div
          role="tabpanel"
          className="bg-warm-white rounded-lg shadow-card overflow-hidden"
        >
          {dayItems.map((item, rowIdx) => {
            const rawItem = t.raw(`items.${item.idx}`) as {
              title: string;
              subtitle: string;
              mood?: string;
              djName?: string;
              venue?: string;
            };
            const dj = item.djId ? DJS.find((d) => d.id === item.djId) : null;

            return (
              <div
                key={item.idx}
                className={[
                  'flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 px-6 py-6',
                  rowIdx < dayItems.length - 1 ? 'border-b border-stone-300' : '',
                  item.featured ? 'bg-mustard/30' : '',
                ].join(' ')}
              >
                {/* Time */}
                <div className="flex-shrink-0 sm:w-36">
                  <span className="font-en-body font-bold text-[13px] text-gold tracking-[0.02em]">
                    {item.featured && <span className="mr-1 text-burgundy">★</span>}
                    {item.time}
                  </span>
                  <span className="ml-2 text-[10px] text-charcoal/50 align-middle">
                    {TYPE_ICON[item.type]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-kr-sans font-medium text-[16px] text-ink leading-[1.3]">
                    {rawItem.title}
                  </p>
                  <p className="font-en-body text-[12px] text-charcoal/60 mt-0.5">
                    {rawItem.subtitle}
                    {dj && (
                      <span className="ml-2 text-ink-soft/70">
                        · {dj.nameKo} ({dj.nameEn})
                      </span>
                    )}
                  </p>
                  {rawItem.venue && (
                    <p className="font-kr-sans text-[12px] font-bold text-burgundy mt-1">
                      📍 {rawItem.venue}
                    </p>
                  )}
                  {item.live && item.live.length > 0 && (
                    <p className="mt-1.5">
                      <span className="inline-flex items-center gap-1 rounded bg-burgundy px-2 py-[3px] font-en-body font-bold text-[10px] tracking-[0.12em] uppercase text-warm-white shadow-[0_1px_4px_rgba(139,26,43,0.3)]">
                        <span className="text-gold-soft">★</span> LIVE ·{' '}
                        {item.live.map((o) => ORCHESTRA_SHORT[o]).join(' · ')}
                      </span>
                    </p>
                  )}
                  {rawItem.mood && (
                    <p className="font-kr-sans text-[13px] text-charcoal/50 mt-1 italic">
                      {rawItem.mood}
                    </p>
                  )}
                  {item.type === 'concert' && (
                    <p className="mt-2">
                      <Link
                        href="/program-note"
                        className="border-b-2 border-burgundy/50 pb-[1px] font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy transition-colors hover:border-burgundy"
                      >
                        {isKo ? '공연 프로그램 노트' : 'Program Note'} →
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
