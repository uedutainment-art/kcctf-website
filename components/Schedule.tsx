'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SCHEDULE_ITEMS, DJS, type ScheduleDay } from '@/data/festival';

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
  const [activeDay, setActiveDay] = useState<ScheduleDay>('10/3');

  const dayItems = SCHEDULE_ITEMS.filter((item) => item.day === activeDay);

  return (
    <section id="schedule" className="bg-mustard-soft py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

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
            };
            const dj = item.djId ? DJS.find((d) => d.id === item.djId) : null;

            return (
              <div
                key={item.idx}
                className={[
                  'flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 px-6 py-5',
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
                  {rawItem.mood && (
                    <p className="font-kr-sans text-[13px] text-charcoal/50 mt-1 italic">
                      {rawItem.mood}
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
