import { Link } from '@/i18n/navigation';

// 법적 고지 페이지 공용 레이아웃 (약관·개인정보·환불 공통)
// mustard 바탕 위에 warm-white 카드로 가독성 확보. [locale] 레이아웃이 Nav/Footer 감쌈.
export type LegalSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export default function LegalPage({
  title,
  updated,
  backLabel,
  sections,
}: {
  title: string;
  updated: string;
  backLabel: string;
  sections: LegalSection[];
}) {
  return (
    <div className="px-5 pt-[104px] md:pt-[128px] pb-24">
      <article className="mx-auto max-w-3xl rounded-2xl border border-ink-soft/12 bg-warm-white px-6 py-10 shadow-[0_8px_30px_rgba(26,20,16,0.10)] md:px-12 md:py-14">
        <Link
          href="/"
          className="inline-block font-en-body text-[11px] uppercase tracking-[0.22em] text-burgundy hover:underline"
        >
          ← {backLabel}
        </Link>

        <h1 className="mt-5 font-kr-sans text-[26px] font-bold leading-tight text-ink md:text-[32px]">
          {title}
        </h1>
        <p className="mt-2 font-en-body text-[12px] tracking-[0.06em] text-ink-soft/60">{updated}</p>

        <div className="mt-8 space-y-7">
          {sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-kr-sans text-[17px] font-bold text-ink">{section.heading}</h2>
              )}
              {section.paragraphs?.map((paragraph, j) => (
                <p
                  key={j}
                  className="mt-2 font-kr-sans text-[15px] leading-[1.85] text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 list-disc space-y-1.5 pl-5 font-kr-sans text-[15px] leading-[1.8] text-ink-soft">
                  {section.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
