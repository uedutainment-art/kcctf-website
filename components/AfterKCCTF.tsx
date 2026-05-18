import { useTranslations } from 'next-intl';

export default function AfterKCCTF() {
  const t = useTranslations('afterKcctf');

  return (
    <section className="bg-night text-warm-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[820px] px-6 md:px-10 text-center">
        <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-6">
          {t('eyebrow')}
        </p>

        <p className="font-kr-sans text-[18px] md:text-[22px] leading-[1.6] text-warm-white mb-3 font-medium">
          {t('lede')}
        </p>
        <p className="font-en-display italic text-[15px] md:text-[17px] text-warm-white/55 max-w-[620px] mx-auto mb-10">
          {t('ledeEn')}
        </p>

        <a
          href={t('url')}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[13px] tracking-[0.18em] uppercase px-7 py-4 rounded-md transition-all duration-150 shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px]"
        >
          <span>{t('cta')}</span>
          <span className="opacity-60" aria-hidden>·</span>
          <span className="opacity-75 font-normal normal-case tracking-normal">{t('ctaEn')}</span>
          <span className="text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
