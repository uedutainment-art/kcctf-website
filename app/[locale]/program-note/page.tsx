import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { PROGRAM_KO, PROGRAM_EN } from '@/data/program-note';

// Program Note — 팜플릿 QR(kcctf.org/program-note)로 들어오는 공연 프로그램 페이지.
// ⚠️ 회차·날짜·장소·티켓 정보 표기 금지 (두 회차 관객이 같은 QR을 씀 — 대표 확정 2026-08-26)

export const metadata: Metadata = { title: 'Program Note — KCCTF' };

export default function ProgramNotePage({ params: { locale } }: { params: { locale: string } }) {
  const isKo = locale === 'ko';
  const p = isKo ? PROGRAM_KO : PROGRAM_EN;

  return (
    <div className="bg-cream px-5 pt-[104px] md:pt-[128px] pb-24">
      <div className="mx-auto max-w-2xl">

        {/* 헤더 */}
        <div className="text-center">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold">
            ★&nbsp; {isKo ? 'Concert Program' : 'Concert Program'} &nbsp;★
          </p>
          <h1 className="mt-3 font-en-display italic font-black text-ink-soft leading-[1.02]" style={{ fontSize: 'clamp(34px, 6vw, 54px)' }}>
            {p.pageTitle}
          </h1>
          <p className="mt-3 font-kr-serif text-[22px] font-black text-burgundy">{p.subtitle}</p>
          <p className="mt-1 font-en-body text-[11px] uppercase tracking-[0.22em] text-charcoal/50">{p.subtitleRoman}</p>
        </div>

        {/* 파트 점프 */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {p.parts.map((part) => (
            <a
              key={part.id}
              href={`#${part.id}`}
              className="rounded-md border-2 border-burgundy/40 bg-warm-white px-4 py-3 text-center transition-colors hover:border-burgundy"
            >
              <span className="block font-en-body text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{part.label}</span>
              <span className="mt-0.5 block font-kr-sans text-[13.5px] font-bold text-ink-soft">{part.orchestra}</span>
            </a>
          ))}
        </div>

        {/* 파트 */}
        {p.parts.map((part) => (
          <section key={part.id} id={part.id} className="mt-14 scroll-mt-24">
            <div className="border-l-4 border-burgundy bg-warm-white px-5 py-4 rounded-r-lg">
              <p className="font-en-body text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{part.label}</p>
              <h2 className="mt-1 font-en-display italic text-[26px] font-black leading-tight text-ink-soft">{part.orchestra}</h2>
              <p className="mt-2 font-kr-serif text-[17px] font-black text-burgundy">{part.introTitle}</p>
            </div>
            <div className="mt-4 space-y-3">
              {part.intro.map((t, i) => (
                <p key={i} className="font-kr-sans text-[15px] leading-[1.85] text-charcoal/85">{t}</p>
              ))}
            </div>

            <ol className="mt-8 space-y-7">
              {part.pieces.map((piece, i) => (
                <li key={piece.title} className="border-b border-ink-soft/10 pb-6 last:border-b-0">
                  <div className="flex items-baseline gap-3">
                    <span className="shrink-0 font-en-display text-[18px] font-black italic text-gold" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-en-body text-[17px] font-bold text-ink-soft">{piece.title}</h3>
                      <p className="font-kr-sans text-[13.5px] font-bold text-burgundy">{piece.sub}</p>
                    </div>
                  </div>
                  <p className="mt-2.5 pl-[42px] font-kr-sans text-[14.5px] leading-[1.8] text-charcoal/80">{piece.note}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}

        {/* 맺음말 */}
        <section className="mt-14 rounded-lg border border-gold/40 bg-warm-white px-6 py-7">
          <p className="text-center font-en-body font-bold text-[10px] tracking-[0.4em] uppercase text-gold">
            ★&nbsp; {p.closingTitle} &nbsp;★
          </p>
          <div className="mt-4 space-y-3">
            {p.closing.map((t, i) => (
              <p key={i} className="font-kr-sans text-[15px] leading-[1.85] text-charcoal/85">{t}</p>
            ))}
          </div>
        </section>

        {/* 출연 */}
        <section className="mt-10">
          <p className="text-center font-en-body font-bold text-[10px] tracking-[0.4em] uppercase text-gold">
            ★&nbsp; {p.castTitle} &nbsp;★
          </p>
          <dl className="mx-auto mt-4 max-w-md space-y-2">
            {p.cast.map((c) => (
              <div key={c.role} className="flex gap-4">
                <dt className="w-[76px] shrink-0 text-right font-kr-sans text-[13px] font-bold text-gold">{c.role}</dt>
                <dd className="font-kr-sans text-[13.5px] leading-[1.6] text-ink-soft">{c.names}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-center">
            <Link
              href="/#orchestras"
              className="border-b-2 border-burgundy/50 pb-[1px] font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy transition-colors hover:border-burgundy"
            >
              {isKo ? '축제 라인업 보기' : 'Festival lineup'} →
            </Link>
          </p>
        </section>

      </div>
    </div>
  );
}
