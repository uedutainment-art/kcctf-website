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
    const sections = ['orchestras', 'schedule', 'djs', 'dancers', 'venue', 'city-guide', 'tickets', 'faq', 'accommodation'];
    const sectionToHref: Record<string, string> = {
      orchestras:    '#orchestras',
      schedule:      '#schedule',
      djs:           '#orchestras', // 라인업 묶음
      dancers:       '#orchestras', // 라인업 묶음
      venue:         '#venue',
      'city-guide':  '#city-guide',
      tickets:       '#venue',      // tickets 안 보이면 venue 활성 유지
      faq:           '#venue',
      accommodation: '#accommodation',
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

  const navItems = t.raw('items') as NavItem[];

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  const altLocale = locale === 'ko' ? 'en' : 'ko';

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

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/KCCTF_logo/KCCTF.svg"
                alt="춘천국제탱고페스티벌"
                style={{ height: '58px', width: 'auto' }}
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
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
          <Link href="/" onClick={() => setMenuOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/KCCTF_logo/KCCTF.svg" alt="춘천국제탱고페스티벌" style={{ height: '58px', width: 'auto' }} />
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
          <div className="mx-auto flex max-w-sm flex-col border-t border-ink-soft/15">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
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
