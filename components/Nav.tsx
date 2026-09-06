'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import RegisterButton from './RegisterButton';

type NavItem = {
  label: string;
  href: string;
};

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Order must match the actual page section order so the active indicator
    // resolves to the last section whose top is at/above the offset.
    const sections = ['orchestras', 'djs', 'dancers', 'schedule', 'venue', 'travel', 'city-guide', 'accommodation', 'tickets', 'faq'];
    const sectionToHref: Record<string, string> = {
      orchestras:    '#orchestras', // 라인업
      djs:           '#orchestras', // 라인업 묶음
      dancers:       '#orchestras', // 라인업 묶음
      schedule:      '#schedule',
      venue:         '#venue',
      travel:        '#travel',
      'city-guide':  '#city-guide',
      accommodation: '#accommodation',
      tickets:       '#accommodation', // tickets/FAQ 영역에선 숙소 활성 유지
      faq:           '#accommodation',
    };
    const onScroll = () => {
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          current = sectionToHref[id];
        }
      }
      setActiveHref(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const showCityGuide = process.env.NEXT_PUBLIC_SHOW_CITY_GUIDE === 'true';
  const showAccommodation = process.env.NEXT_PUBLIC_SHOW_ACCOMMODATION === 'true';
  const showTravel = process.env.NEXT_PUBLIC_SHOW_TRAVEL === 'true';
  // 숨긴 섹션은 내비에서도 제외 (#travel, #city-guide, #accommodation)
  const navItems = (t.raw('items') as NavItem[]).filter(
    (item) =>
      (showTravel || item.href !== '#travel') &&
      (showCityGuide || item.href !== '#city-guide') &&
      (showAccommodation || item.href !== '#accommodation')
  );

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  // 등록 미오픈이면 예약하기 CTA 숨김
  const registrationOpen = process.env.NEXT_PUBLIC_REGISTRATION_OPEN === 'true';
  const altLocale = locale === 'ko' ? 'en' : 'ko';
  // 서브페이지(/shuttle 등)에서는 섹션 앵커가 같은 페이지에 없으므로 홈(/ko#section)으로 보냄
  const onHome = pathname === '/';
  const sectionHref = (hash: string) => (onHome ? hash : `/${locale}${hash}`);

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-200',
          'bg-mustard border-b border-ink-soft/18',
          scrolled ? 'shadow-[0_2px_14px_rgba(26,20,16,0.10)]' : '',
        ].join(' ')}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex h-[72px] items-center justify-between gap-4">

            {/* 왼쪽 상단 워드마크 — 항상 홈으로 (엠블럼 로고는 추후 교체) */}
            <Link
              href="/"
              aria-label={locale === 'ko' ? '홈으로' : 'Home'}
              className="group flex flex-shrink-0 items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-mustard rounded-sm"
            >
              {/* 네온 로고는 작게 줄이면 뭉개져서 상단은 타이포 워드마크 — 공식 로고는 푸터 로크업에서 노출 */}
              <span className="font-en-display text-[22px] font-black italic leading-none text-ink-soft transition-colors group-hover:text-burgundy">
                KCTF
              </span>
              <span className="hidden sm:inline font-en-body text-[10px] font-bold tracking-[0.3em] uppercase text-ink/55">
                2026
              </span>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <a
                    key={item.href}
                    href={sectionHref(item.href)}
                    className={[
                      'font-en-body font-bold text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 relative px-3 py-4',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-mustard',
                      isActive
                        ? 'text-burgundy after:absolute after:bottom-[11px] after:left-3 after:right-3 after:h-[2px] after:bg-burgundy after:rounded-full'
                        : 'text-ink hover:text-burgundy',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href={pathname}
                locale={altLocale}
                className="font-en-body text-[11px] tracking-[0.32em] uppercase text-ink/50 hover:text-ink transition-colors"
              >
                {t('languageSwitch')}
              </Link>
              {registrationOpen && (
                <RegisterButton
                  href={registerUrl}
                  className="bg-burgundy text-warm-white font-en-body font-bold text-[12px] tracking-[0.18em] uppercase px-6 py-3 rounded-md transition-all duration-150 shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px]"
                >
                  {t('register')}
                </RegisterButton>
              )}
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href={pathname}
                locale={altLocale}
                className="font-en-body text-[11px] tracking-[0.32em] uppercase text-ink/50"
              >
                {t('languageSwitch')}
              </Link>
              {registrationOpen && (
                <RegisterButton
                  href={registerUrl}
                  className="bg-burgundy text-warm-white font-en-body font-bold text-[11px] tracking-[0.08em] uppercase px-3.5 py-2 rounded-md shadow-[0_2px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_1px_0_#5A0E1B]"
                >
                  {t('register')}
                </RegisterButton>
              )}
              <button
                onClick={() => setMenuOpen(true)}
                aria-label={t('menuOpen')}
                className="p-2 text-ink-soft"
              >
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" aria-hidden>
                  <rect y="0"  width="22" height="2" rx="1" fill="currentColor" />
                  <rect y="6.5" width="22" height="2" rx="1" fill="currentColor" />
                  <rect y="13" width="22" height="2" rx="1" fill="currentColor" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile fullscreen overlay ──────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('menuOpen')}
        className={[
          'fixed inset-0 z-[60] bg-mustard flex flex-col transition-opacity duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          {/* 로고 자리 — 엠블럼 제거됨, 추후 새 로고 재추가 */}
          <div className="flex-shrink-0" aria-hidden />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={t('menuClose')}
            className="p-2 text-ink-soft"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Menu links */}
        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-sm flex-col border-t border-ink-soft/15">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={sectionHref(item.href)}
                onClick={() => setMenuOpen(false)}
                className={[
                  'flex items-center justify-between border-b border-ink-soft/15 py-5 font-kr-sans text-[20px] transition-colors',
                  activeHref === item.href ? 'text-burgundy font-bold' : 'text-ink-soft hover:text-burgundy',
                ].join(' ')}
              >
                <span>{item.label}</span>
                <span className="font-en-body text-[14px] opacity-45" aria-hidden>→</span>
              </a>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="px-5 pb-10 pt-4">
          {registrationOpen && (
            <RegisterButton
              href={registerUrl}
              className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[16px] tracking-[0.18em] uppercase text-center py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[2px]"
            >
              {t('register')}
            </RegisterButton>
          )}
        </div>
      </div>
    </>
  );
}
