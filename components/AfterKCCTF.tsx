import { useTranslations } from 'next-intl';

export default function AfterKCCTF() {
  const t = useTranslations('afterKcctf');

  return (
    <section className="bg-night text-warm-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[820px] px-6 md:px-10 text-center">
        <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
          {t('eyebrow')}
        </p>
        <h2
          className="font-kr-serif font-black leading-[1.05] tracking-[-0.03em] text-warm-white mb-5"
          style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
        >
          {t('title')}
        </h2>
        <p className="font-kr-sans text-[15px] md:text-[16px] leading-[1.75] text-warm-white/75 max-w-[560px] mx-auto mb-2">
          {t('lede')}
        </p>
        <p className="font-en-display italic text-[14px] md:text-[15px] text-warm-white/55 max-w-[560px] mx-auto mb-10">
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

        <p className="mt-5 font-en-body text-[10px] tracking-[0.3em] uppercase text-warm-white/35">
          {t('credit')}
        </p>
      </div>
    </section>
  );
}
