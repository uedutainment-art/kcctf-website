'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { isOnlineRegistrationOpen, isHotelOpen } from '@/data/festival';

/** FAQ 버튼 노출 조건 — 숙박 링크는 8/24까지, 참가 신청 링크는 플랫폼 재개 확인 후 */
function ctaVisible(href: string): boolean {
  if (href.includes('mode=hotel')) return isHotelOpen();
  if (href.includes('kcctf-5047d.web.app/register')) return isOnlineRegistrationOpen();
  return true;
}

type FaqItem = {
  q: string;
  a: string;
  cta?: { label: string; href: string };
};

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-warm-white py-20">
      <div className="max-w-[860px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-burgundy mb-3">
            {t('subtitleEn')}
          </p>
          <h2
            className="font-kr-serif font-black text-ink leading-[1.0] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(34px, 4.6vw, 54px)' }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Accordion */}
        <div className="border-t border-ink-soft/15">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="border-b border-ink-soft/15">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 py-5 text-left transition-colors hover:text-burgundy focus-visible:outline-none focus-visible:bg-mustard/20"
                  aria-expanded={isOpen}
                >
                  <span className="font-kr-sans font-semibold text-[16px] md:text-[17px] text-ink leading-[1.5] flex-1">
                    {item.q}
                  </span>
                  <span
                    className={[
                      'shrink-0 mt-0.5 font-en-body text-[22px] leading-none text-burgundy transition-transform duration-200',
                      isOpen ? 'rotate-45' : '',
                    ].join(' ')}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={[
                    'overflow-hidden transition-[max-height] duration-300 ease-out',
                    isOpen ? 'max-h-[600px]' : 'max-h-0',
                  ].join(' ')}
                >
                  <p className="font-kr-sans text-[15px] text-ink-soft/85 leading-[1.7] pb-4 pr-10">
                    {item.a}
                  </p>
                  {item.cta && ctaVisible(item.cta.href) && (
                    <a
                      href={item.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-5 inline-flex items-center rounded-md bg-burgundy px-5 py-2.5 font-kr-sans text-[14px] font-bold text-warm-white shadow-[0_3px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_2px_0_#5A0E1B]"
                    >
                      {item.cta.label}
                    </a>
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
