import { useTranslations } from 'next-intl';

const LINKS = [
  {
    key: 'orchestras' as const,
    href: '#orchestras',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 3v11.5a3.5 3.5 0 1 1-2-3.17V7l8-2v8.5a3.5 3.5 0 1 1-2-3.17V3L9 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'schedule' as const,
    href: '#schedule',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'performers' as const,
    href: '#dancers',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="9" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 21v-4l-2-4 3-3h4l3 3-2 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 10h2l2 4-2 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'djs' as const,
    href: '#djs',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'info' as const,
    href: '#tickets',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 9a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a2 2 0 0 0 0 4v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a2 2 0 0 0 0-4V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    key: 'venue' as const,
    href: '#venue',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
] as const;

export default function QuickLinks() {
  const t = useTranslations('quickLinks');

  return (
    <section className="bg-burgundy py-4">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-warm-white/15">
          {LINKS.map(({ key, href, icon }) => (
            <a
              key={key}
              href={href}
              className="flex flex-col items-center gap-2 py-4 px-2 text-warm-white/75 hover:text-warm-white hover:bg-warm-white/8 transition-colors group"
            >
              <span className="text-warm-white/60 group-hover:text-gold-soft transition-colors">
                {icon}
              </span>
              <span className="font-kr-sans text-[11px] sm:text-[12px] leading-[1.3] text-center tracking-[0.02em]">
                {t(key)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
