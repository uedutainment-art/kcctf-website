'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import RegisterButton from './RegisterButton';

type NavItem = {
  label: string;
  href: string;
};

type NavGroup = {
  key: string;
  label: string;
  items: NavItem[];
};

export default function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Order must match the actual page section order (after reorder: djs before dancers)
    const sections = ['orchestras', 'schedule', 'djs', 'dancers', 'venue', 'tickets'];
    const sectionToHref: Record<string, string> = {
      orchestras: '#orchestras',
      schedule:   '#schedule',
      djs:        '#djs',
      dancers:    '#dancers',
      venue:      '#venue',
      tickets:    '#tickets',
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

  const rawGroups = t.raw('groups') as Record<string, Omit<NavGroup, 'key'>>;
  const navGroups = ['festival', 'info', 'travel'].map((key) => ({
    key,
    ...rawGroups[key],
  }));
  const activeGroup = navGroups.find((group) => group.key === openGroup) ?? null;

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  const altLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header
        onMouseLeave={() => setOpenGroup(null)}
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-200',
          'bg-mustard border-b border-ink-soft/18',
          scrolled ? 'shadow-[0_2px_14px_rgba(26,20,16,0.10)]' : '',
        ].join(' ')}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex h-[72px] lg:h-[72px] items-center justify-between gap-4">

            {/* Logo — wordmark */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/KCCTF_logo/KCCTF.svg"
                alt=""
                aria-hidden
                style={{ height: '44px', width: 'auto' }}
              />
              <div className="leading-none">
                <div className="font-en-condensed font-black text-[22px] tracking-[0.04em] uppercase text-burgundy leading-[1]">
                  KCCTF
                </div>
                <div className="font-kr-sans text-[9px] tracking-[0.18em] text-ink/55 mt-[2px]">
                  춘천국제땅고페스티벌
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav
              className="hidden lg:flex items-center gap-2"
              aria-label="Main navigation"
            >
              {navGroups.map((group) => {
                const isActive = group.items.some((item) => item.href === activeHref);
                const isOpen = openGroup === group.key;

                return (
                  <button
                    key={group.key}
                    type="button"
                    aria-expanded={isOpen}
                    onMouseEnter={() => setOpenGroup(group.key)}
                    onFocus={() => setOpenGroup(group.key)}
                    onClick={() => setOpenGroup(isOpen ? null : group.key)}
                    className={[
                      'font-en-body font-bold text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 relative px-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-mustard',
                      isActive || isOpen
                        ? 'text-burgundy after:absolute after:bottom-[11px] after:left-3 after:right-3 after:h-[2px] after:bg-burgundy after:rounded-full'
                        : 'text-ink hover:text-burgundy',
                    ].join(' ')}
                  >
                    {group.label}
                  </button>
                );
              })}
            </nav>

            {activeGroup && (
              <div
                className="hidden lg:block absolute left-1/2 top-[72px] w-[560px] -translate-x-1/2 pt-2"
                onMouseEnter={() => setOpenGroup(activeGroup.key)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <div className="border-t-4 border-burgundy bg-ink/95 px-5 py-4 shadow-[0_14px_34px_rgba(26,20,16,0.24)] backdrop-blur-sm">
                  <p className="font-en-body font-bold text-[11px] tracking-[0.34em] uppercase text-gold mb-2">
                    {activeGroup.label}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6">
                    {activeGroup.items.map((item) => (
                      <a
                        key={`${activeGroup.key}-${item.label}`}
                        href={item.href}
                        onClick={() => setOpenGroup(null)}
                        className={[
                          'group flex min-h-[40px] items-center justify-between border-b border-warm-white/12 font-kr-sans text-[14px] transition-colors',
                          activeHref === item.href
                            ? 'text-gold'
                            : 'text-warm-white/82 hover:text-gold',
                        ].join(' ')}
                      >
                        <span>{item.label}</span>
                        <span className="font-en-body text-[13px] opacity-40 transition-transform group-hover:translate-x-1" aria-hidden>
                          →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Desktop right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href={pathname}
                locale={altLocale}
                className="font-en-body text-[11px] tracking-[0.32em] uppercase text-ink/50 hover:text-ink transition-colors"
              >
                {t('languageSwitch')}
              </Link>
              <RegisterButton
                href={registerUrl}
                className="bg-burgundy text-warm-white font-en-body font-bold text-[12px] tracking-[0.18em] uppercase px-6 py-3 rounded-md transition-all duration-150 shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px]"
              >
                {t('register')}
              </RegisterButton>
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
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/KCCTF_logo/KCCTF.svg" alt="" aria-hidden style={{ height: '48px', width: 'auto' }} />
            <div className="leading-none">
              <div className="font-en-condensed font-black text-[24px] tracking-[0.04em] uppercase text-burgundy leading-[1]">
                KCCTF
              </div>
              <div className="font-kr-sans text-[9px] tracking-[0.18em] text-ink/55 mt-[2px]">
                춘천국제땅고페스티벌
              </div>
            </div>
          </Link>
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

        {/* Bandoneon illustration */}
        <div className="flex justify-center pt-4 pb-2 opacity-50 pointer-events-none" aria-hidden>
          <Image
            src="/images/illustration-bandoneon-dark-transparent.png"
            alt=""
            width={140}
            height={140}
            style={{ width: '140px', height: 'auto', filter: 'drop-shadow(0 10px 16px rgba(74,36,24,0.14))' }}
          />
        </div>

        {/* Menu links */}
        <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-sm flex-col gap-8">
            {navGroups.map((group) => (
              <div key={group.key}>
                <p className="font-en-body font-bold text-[11px] tracking-[0.34em] uppercase text-gold mb-3">
                  {group.label}
                </p>
                <div className="flex flex-col border-t border-ink-soft/15">
                  {group.items.map((item) => (
                    <a
                      key={`${group.key}-${item.label}`}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={[
                        'flex items-center justify-between border-b border-ink-soft/15 py-4 font-kr-sans text-[18px] transition-colors',
                        activeHref === item.href ? 'text-burgundy' : 'text-ink-soft hover:text-burgundy',
                      ].join(' ')}
                    >
                      <span>{item.label}</span>
                      <span className="font-en-body text-[14px] opacity-45" aria-hidden>
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* CTA */}
        <div className="px-5 pb-10 pt-4">
          <RegisterButton
            href={registerUrl}
            className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[16px] tracking-[0.18em] uppercase text-center py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[2px]"
          >
            {t('register')}
          </RegisterButton>
        </div>
      </div>
    </>
  );
}
