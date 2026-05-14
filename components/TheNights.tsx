import Image from 'next/image';
import { useLocale } from 'next-intl';

const nightImages = [
  {
    src: '/images/2025년 이미지/공연 에너지1.jpg',
    labelKo: '라이브가 무대를 밀어 올리고',
    labelEn: 'Live music lifts the stage',
  },
  {
    src: '/images/2025년 이미지/단체 춤추는 사진.jpg',
    labelKo: '큰 플로어가 사람으로 차고',
    labelEn: 'The floor fills with dancers',
  },
  {
    src: '/images/2025년 이미지/분위기1.jpg',
    labelKo: '밤은 더 가까워집니다',
    labelEn: 'The night comes closer',
  },
];

export default function TheNights() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section className="bg-night text-warm-white py-20 overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
          <div className="max-w-xl">
            <p className="font-en-body font-black text-[11px] tracking-[0.4em] uppercase text-gold mb-4">
              THE NIGHTS
            </p>
            <h2
              className="font-kr-serif font-black leading-[1.02] tracking-[-0.04em] text-warm-white"
              style={{ fontSize: 'clamp(34px, 5vw, 66px)' }}
            >
              {isKo ? '라이브가 울리고, 밤이 길어지는 사흘' : 'Three nights where live music carries the floor'}
            </h2>
            <p className="mt-5 font-kr-sans text-[16px] leading-[1.75] text-warm-white/72">
              {isKo
                ? '2025년의 장면들이 말해줍니다. 무대의 에너지, 꽉 찬 플로어, 그리고 마지막 탕다까지 이어지는 밀도.'
                : 'A glimpse from 2025: stage energy, a full floor, and the density that carries through to the last tanda.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {nightImages.map((image, index) => (
              <figure
                key={image.src}
                className={[
                  'group relative min-h-[260px] overflow-hidden bg-ink ring-1 ring-gold/18',
                  index === 1 ? 'sm:min-h-[330px]' : 'sm:min-h-[290px]',
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
                <div className="absolute inset-0 bg-gradient-to-t from-night/92 via-night/15 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
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
