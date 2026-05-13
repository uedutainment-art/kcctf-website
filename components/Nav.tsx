'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

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
    const sections = ['orchestras', 'schedule', 'djs', 'dancers', 'venue', 'tickets'];
    const sectionToHref: Record<string, string> = {
      orchestras: '#orchestras',
      schedule:   '#schedule',
      djs:        '#schedule',
      dancers:    '#schedule',
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

  const navLinks = [
    { href: '#orchestras', label: t('lineup')   },
    { href: '#schedule',   label: t('schedule') },
    { href: '#venue',      label: t('venue')    },
    { href: '#tickets',    label: t('tickets')  },
  ];

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  const altLocale = locale === 'ko' ? 'en' : 'ko';

  return (
    <>
      {/* ── Sticky header ─────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-mustard border-b border-ink-soft/20 shadow-[0_2px_12px_rgba(26,20,16,0.06)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="flex h-[72px] lg:h-[72px] items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/KCCTF_logo/KCCTF.svg" alt="춘천국제탱고페스티벌" style={{ height: '42px', width: 'auto', mixBlendMode: 'multiply' }} />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={[
                    'font-kr-sans text-[14px] transition-colors duration-200 relative pb-[2px]',
                    activeHref === href
                      ? 'text-burgundy after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-burgundy after:rounded-full'
                      : 'text-ink-soft hover:text-burgundy',
                  ].join(' ')}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Desktop right: lang + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href={pathname}
                locale={altLocale}
                className="font-en-body text-[11px] tracking-[0.32em] uppercase text-ink-soft/60 hover:text-ink-soft transition-colors"
              >
                {t('languageSwitch')}
              </Link>
              <a
                href={registerUrl}
                className="bg-burgundy text-warm-white font-en-body font-bold text-[12px] tracking-[0.18em] uppercase px-6 py-3 rounded-md transition-all duration-150 shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px]"
              >
                {t('register')}
              </a>
            </div>

            {/* Mobile: lang toggle + hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <Link
                href={pathname}
                locale={altLocale}
                className="font-en-body text-[11px] tracking-[0.32em] uppercase text-ink-soft/60"
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
            <img src="/images/KCCTF_logo/KCCTF.svg" alt="춘천국제탱고페스티벌" style={{ height: '44px', width: 'auto', mixBlendMode: 'multiply' }} />
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
            src="/images/illustration-bandoneon-dark.png"
            alt=""
            width={160}
            height={160}
            style={{ width: '160px', height: 'auto', mixBlendMode: 'multiply' }}
          />
        </div>

        {/* Menu links */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-7" aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={[
                'font-kr-serif font-black text-[26px] tracking-[-0.02em] transition-colors',
                activeHref === href ? 'text-burgundy' : 'text-ink-soft hover:text-burgundy',
              ].join(' ')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="px-5 pb-10">
          <a
            href={registerUrl}
            onClick={() => setMenuOpen(false)}
            className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[16px] tracking-[0.18em] uppercase text-center py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_2px_0_#5A0E1B] hover:translate-y-[2px]"
          >
            {t('register')}
          </a>
        </div>
      </div>
    </>
  );
}
