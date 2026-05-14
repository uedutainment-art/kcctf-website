'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const NAV_H  = 72;
const TAB_H  = 44;
const OFFSET = NAV_H + TAB_H + 4;

const TABS = [
  { href: '#orchestras', sectionId: 'orchestras', key: 'orchestras' },
  { href: '#schedule',   sectionId: 'schedule',   key: 'schedule'   },
  { href: '#dancers',    sectionId: 'dancers',     key: 'performers' },
  { href: '#djs',        sectionId: 'djs',         key: 'djs'        },
  { href: '#tickets',    sectionId: 'tickets',     key: 'info'       },
  { href: '#venue',      sectionId: 'venue',       key: 'venue'      },
] as const;

const ALL_SECTIONS = ['orchestras', 'schedule', 'dancers', 'djs', 'venue', 'tickets'];
const SECTION_TO_TAB: Record<string, string> = {
  orchestras: '#orchestras',
  schedule:   '#schedule',
  djs:        '#djs',
  dancers:    '#dancers',
  venue:      '#venue',
  tickets:    '#tickets',
};

export default function SectionTabs() {
  const t = useTranslations('quickLinks');
  const [visible, setVisible]     = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const stripRef = useRef<HTMLDivElement>(null);

  // Show/hide when hero enters/leaves viewport
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // Track active section by scroll position
  useEffect(() => {
    const onScroll = () => {
      let current = '';
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = SECTION_TO_TAB[id];
      }
      setActiveHref(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll active tab pill into view inside the strip
  useEffect(() => {
    if (!stripRef.current || !activeHref) return;
    const pill = stripRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    pill?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [activeHref]);

  // Click: smooth scroll with offset so content lands below both bars
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - OFFSET, behavior: 'smooth' });
  };

  return (
    <div
      className={[
        'fixed inset-x-0 top-[72px] z-40 transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : '-translate-y-[calc(100%+72px)]',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <div className="bg-mustard/95 backdrop-blur-sm border-b border-ink-soft/15 shadow-[0_2px_10px_rgba(26,20,16,0.09)]">
        <div
          ref={stripRef}
          className="flex items-center gap-[6px] overflow-x-auto scrollbar-none px-4 md:px-10 py-[6px] max-w-[1200px] mx-auto"
        >
          {TABS.map(({ href, sectionId, key }) => {
            const active = activeHref === href;
            return (
              <a
                key={href}
                href={href}
                data-active={active}
                onClick={(e) => handleClick(e, sectionId)}
                className={[
                  'shrink-0 font-kr-sans text-[12px] px-[14px] py-[5px] rounded-full transition-all duration-200 whitespace-nowrap',
                  active
                    ? 'bg-burgundy text-warm-white font-bold shadow-[0_2px_0_#5A0E1B]'
                    : 'text-ink-soft/65 hover:text-ink-soft hover:bg-ink-soft/10',
                ].join(' ')}
              >
                {t(key)}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
