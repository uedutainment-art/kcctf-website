'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type FaqItem = {
  q: string;
  a: string;
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
                  <p className="font-kr-sans text-[15px] text-ink-soft/85 leading-[1.7] pb-5 pr-10">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
