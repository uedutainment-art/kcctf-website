import { useTranslations } from 'next-intl';

export default function AfterKCCTF() {
  const t = useTranslations('afterKcctf');

  return (
    <section className="bg-night text-warm-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[760px] px-6 md:px-10">
        <div className="relative rounded-xl border border-gold/25 bg-warm-white/[0.035] px-8 py-12 text-center shadow-[6px_6px_0_#8B1A2B] md:px-14 md:py-14">
          <p className="flex items-center justify-center gap-3 font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-6">
            <span aria-hidden>★</span>
            <span>{t('eyebrow')}</span>
            <span aria-hidden>★</span>
          </p>

          <p className="font-kr-sans text-[19px] md:text-[24px] leading-[1.55] text-warm-white mb-3 font-semibold">
            {t('lede')}
          </p>
          <p className="font-en-display italic text-[15px] md:text-[17px] text-warm-white/55 max-w-[620px] mx-auto mb-9">
            {t('ledeEn')}
          </p>

          <div className="mx-auto mb-9 h-px w-16 bg-gold/40" aria-hidden />

          <a
            href={t('url')}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-burgundy text-warm-white font-en-body font-bold text-[14px] tracking-[0.18em] uppercase px-8 py-4 rounded-md transition-all duration-150 shadow-[0_4px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[3px]"
          >
            <span>{t('cta')}</span>
            <span className="opacity-50" aria-hidden>·</span>
            <span className="opacity-80 font-normal normal-case tracking-normal">{t('ctaEn')}</span>
            <span className="text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
          </a>

          <p className="mt-5 font-en-body text-[12px] tracking-[0.08em] text-warm-white/40">
            {t('url').replace(/^https?:\/\//, '')} ↗
          </p>
        </div>
      </div>
    </section>
  );
}
