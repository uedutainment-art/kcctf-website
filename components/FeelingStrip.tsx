import { useLocale } from 'next-intl';

const koItems = [
  ['TWO ORCHESTRAS', '두 오케스트라'],
  ['LIVE MILONGA', '라이브 밀롱가'],
  ['CONCERT SOUND', '콘서트급 음향'],
  ['STADIUM FLOOR', '압도적 플로어'],
];

const enItems = [
  ['TWO ORCHESTRAS', 'From Buenos Aires'],
  ['LIVE MILONGA', 'Live every night'],
  ['CONCERT SOUND', 'Concert-grade audio'],
  ['STADIUM FLOOR', 'A stadium-sized floor'],
];

export default function FeelingStrip() {
  const locale = useLocale();
  const items = locale === 'ko' ? koItems : enItems;

  return (
    <section className="bg-burgundy text-warm-white border-y border-gold/30">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-px px-6 py-8 md:grid-cols-4 md:px-10">
        {items.map(([label, value]) => (
          <div key={label} className="px-4 py-5 text-center">
            <p className="font-en-body text-[10px] font-black uppercase tracking-[0.28em] text-gold">
              {label}
            </p>
            <p className="mt-2 font-kr-serif text-[20px] font-black leading-[1.15] text-warm-white md:text-[24px]">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
