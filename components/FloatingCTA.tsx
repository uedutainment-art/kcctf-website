'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import RegisterButton from './RegisterButton';

export default function FloatingCTA() {
  const t = useTranslations('hero');
  const [visible, setVisible] = useState(false);

  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={[
        'fixed bottom-0 inset-x-0 z-50 transition-transform duration-300 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      aria-hidden={!visible}
    >
      {/* subtle top shadow */}
      <div className="h-px bg-gradient-to-r from-transparent via-warm-white/10 to-transparent" />

      <div className="bg-ink/96 backdrop-blur-md border-t border-warm-white/8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-3 flex items-center justify-between gap-4">

          {/* Left: event info */}
          <div className="hidden sm:flex items-center gap-3 min-w-0">
            <span className="font-kr-sans text-[13px] text-warm-white/50 truncate">
              춘천국제탱고페스티벌 2026 · 10.03—10.05 · 춘천 봄내체육관
            </span>
          </div>

          {/* CTA button */}
          <RegisterButton
            href={registerUrl}
            className="shrink-0 bg-burgundy text-warm-white font-en-body font-bold text-[13px] tracking-[0.2em] uppercase px-7 py-[11px] rounded-md shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px] transition-all duration-150"
          >
            {t('cta')}
          </RegisterButton>
        </div>
      </div>
    </div>
  );
}
