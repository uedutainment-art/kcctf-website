import Image from 'next/image';
import { useLocale } from 'next-intl';

const nightImages = [
  {
    src: '/images/2025/night-performance.jpg',
    kicker: 'LIVE SOUND',
    labelKo: '살아있는 음악',
    labelEn: 'Music alive on stage.',
  },
  {
    src: '/images/2025/night-floor.jpg',
    kicker: 'FULL FLOOR',
    labelKo: '가득 찬 플로어',
    labelEn: 'A floor full of people.',
  },
  {
    src: '/images/2025/night-close.jpg',
    kicker: 'LATE NIGHT',
    labelKo: '깊어지는 밤',
    labelEn: 'The night growing closer.',
  },
];

export default function TheNights() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section className="bg-night text-warm-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:items-center">
          <div className="max-w-xl">
            <p className="font-en-body font-black text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
              {isKo ? 'THE EXPERIENCE · 작년의 장면들' : 'THE EXPERIENCE · From 2025'}
            </p>
            <h2
              className="font-kr-serif font-black leading-[1.02] tracking-[-0.04em] text-warm-white"
              style={{ fontSize: 'clamp(34px, 5vw, 66px)' }}
            >
              {isKo ? '라이브가 만드는 밤.' : 'Live. Every night.'}
            </h2>
            <p className="mt-5 font-kr-sans text-[16px] leading-[1.75] text-warm-white/72">
              {isKo
                ? '두 오케스트라가 연주하는 밤. 콘서트급 음향, 압도적 플로어, 새벽까지 이어지는 딴따.'
                : 'Two orchestras. Concert-grade sound. A floor you\'ve never danced on.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.05fr_1.25fr_0.95fr]">
            {nightImages.map((image, index) => (
              <figure
                key={image.src}
                className={[
                  'group relative min-h-[300px] overflow-hidden bg-ink ring-1 ring-gold/18',
                  index === 1 ? 'md:min-h-[430px]' : 'md:min-h-[360px]',
                ].join(' ')}
              >
                <Image
                  src={image.src}
                  alt={isKo ? image.labelKo : image.labelEn}
                  fill
                  className="object-cover saturate-[0.95] contrast-[1.04] transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ objectPosition: index === 2 ? '50% 28%' : '50% 50%' }}
                  sizes="(max-width: 640px) 100vw, 28vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/20 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="mb-2 font-en-body text-[10px] font-black uppercase tracking-[0.32em] text-gold">
                    {image.kicker}
                  </p>
                  <p className="font-kr-sans text-[15px] font-semibold leading-[1.45] text-warm-white">
                    {isKo ? image.labelKo : image.labelEn}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
