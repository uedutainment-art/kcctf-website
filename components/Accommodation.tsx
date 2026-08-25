import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

// 숙박 신청은 2026-08-24 23:59 KST 로 마감됨 (대표 확정) — 판매 요소(객실 사진·가격·잔여) 제거.
// 이 섹션은 투숙객·방문자를 위한 "호텔 안내"만 담당: 전경 · 주소 · 전화 · 길안내 · 순환 셔틀.

const HOTELS: {
  id: string;
  nameKo: string;
  nameEn: string;
  addressKo: string;
  addressEn: string;
  tel: string;
  mapQuery: string;
  /** 전경 사진 — 원본 비율 그대로 표시(왜곡·크롭 없음) */
  image: string;
  /** 원본 가로/세로 (CSS aspect-ratio) */
  aspect: string;
  /** sm 이상에서 사진 패널 폭 — 가로 사진은 넓게, 세로 사진은 좁게 */
  panelClass: string;
  noteKo: string;
  noteEn: string;
}[] = [
  {
    id: 'venezia',
    nameKo: '더베네치아스위트',
    nameEn: 'The Venezia Suite',
    addressKo: '강원특별자치도 춘천시 효자로 136',
    addressEn: '136 Hyoja-ro, Chuncheon',
    tel: '033-255-9600',
    mapQuery: '더베네치아스위트',
    image: '/images/hotel/exterior.jpg',
    aspect: '1685 / 881',
    panelClass: 'sm:w-[58%]',
    noteKo: '무료 순환 셔틀 정차 · 봄내체육관까지 20분',
    noteEn: 'Free loop shuttle stop · 20 min to Bomnae Complex',
  },
  {
    id: 'eston',
    nameKo: '에스턴호텔',
    nameEn: 'Eston Hotel',
    addressKo: '강원특별자치도 춘천시 중앙로 193',
    addressEn: '193 Jungang-ro, Chuncheon',
    tel: '033-244-0002',
    mapQuery: '춘천 에스턴호텔',
    image: '/images/hotel/eston/exterior.jpg',
    aspect: '933 / 1400',
    panelClass: 'sm:w-[34%]',
    noteKo: '무료 순환 셔틀 정차 · 봄내체육관까지 10분',
    noteEn: 'Free loop shuttle stop · 10 min to Bomnae Complex',
  },
];

export default function Accommodation() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  return (
    <section id="accommodation" className="bg-cream py-16">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            {isKo ? 'ACCOMMODATION · 공식 지정 호텔' : 'ACCOMMODATION · Official Hotels'}
          </p>
          <h2
            className="font-kr-serif font-black text-ink-soft leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
          >
            {isKo ? '공식 지정 호텔' : 'Official Hotels'}
          </h2>
          <p className="font-kr-sans text-[14px] text-charcoal/60">
            {isKo
              ? '숙박 신청은 마감되었습니다 — 두 호텔로 찾아가는 길을 안내합니다.'
              : 'Accommodation booking has closed — here is how to find the two hotels.'}
          </p>
        </div>

        {/* 호텔 안내 카드 2장 — 사진은 원본 비율 그대로(왜곡·크롭 없음), sm 이상 가로형 배치 */}
        <div className="flex flex-col gap-6">
          {HOTELS.map((h) => (
            <div key={h.id} className="overflow-hidden rounded-lg border border-ink-soft/12 bg-warm-white shadow-card sm:flex sm:items-stretch">
              <div className={['relative shrink-0 bg-night/90', h.panelClass].join(' ')} style={{ aspectRatio: h.aspect }}>
                <Image
                  src={h.image}
                  alt={isKo ? `${h.nameKo} 전경` : `${h.nameEn} exterior`}
                  fill
                  sizes="(max-width: 640px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 self-center p-6 sm:p-7">
                <p className="font-en-display italic text-[24px] leading-tight text-gold">{h.nameKo}</p>
                <p className="mt-0.5 font-en-body text-[11px] uppercase tracking-[0.14em] text-charcoal/50">{h.nameEn}</p>
                <p className="mt-4 font-kr-sans text-[13.5px] text-ink-soft">📍 {isKo ? h.addressKo : h.addressEn}</p>
                <p className="mt-1 font-kr-sans text-[13px] text-charcoal/60">
                  ☎ <a href={`tel:${h.tel}`} className="hover:underline">{h.tel}</a>
                </p>
                <p className="mt-2 font-kr-sans text-[12.5px] text-charcoal/70">🚐 {isKo ? h.noteKo : h.noteEn}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={`https://map.naver.com/p/search/${encodeURIComponent(h.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border-2 border-burgundy/60 bg-warm-white px-4 py-2 font-kr-sans text-[12.5px] font-bold text-burgundy transition-colors hover:border-burgundy hover:bg-cream"
                  >
                    {isKo ? '네이버 지도 길찾기' : 'Naver Map'} ↗
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(h.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border-2 border-ink-soft/25 bg-warm-white px-4 py-2 font-kr-sans text-[12.5px] font-bold text-ink-soft/75 transition-colors hover:border-ink-soft/60"
                  >
                    Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 순환 셔틀 + 문의 */}
        <div className="mt-6 flex flex-col items-center gap-2 text-center">
          <Link
            href="/shuttle/chuncheon"
            className="border-b-2 border-burgundy/50 pb-[1px] font-en-body text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy transition-colors hover:border-burgundy"
          >
            {isKo ? '무료 순환 셔틀 시간표' : 'Free loop shuttle timetable'} →
          </Link>
          <p className="font-kr-sans text-[12px] text-charcoal/50">
            {isKo ? '숙박 관련 문의: info@kcctf.org' : 'Accommodation inquiries: info@kcctf.org'}
          </p>
        </div>

      </div>
    </section>
  );
}
