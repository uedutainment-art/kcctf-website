'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import RegisterButton from './RegisterButton';

// ── EventLink API types ────────────────────────────────────────────────────────

type RoomType = {
  id: string;
  label: string;
  hint: string;
  capacity: number;
  total: number;
  booked: number;
  available: number;
};

type AvailabilityData = {
  ok: boolean;
  enabled: boolean;
  pricePerNightPerRoom: number;
  currency: string;
  packages: { id: string; label: string; price: number }[];
  roomTypes: RoomType[];
};

const API_URL =
  'https://kcctf-5047d.web.app/api/events/chuncheon-citf-2026/accommodation/availability';

// ── Static room info (from 더베네치아스위트 brochure) ──────────────────────────

const ROOMS = [
  {
    id: 'double',
    image: '/images/hotel/double.jpg',
    nameKo: '스탠다드 더블룸',
    nameEn: 'Standard Double',
    size: '23㎡',
    guestsKo: '기준 2인 · 최대 2인',
    guestsEn: 'Up to 2 guests',
    bedKo: '퀸베드 1개',
    bedEn: '1 Queen Bed',
  },
  {
    id: 'twin',
    image: '/images/hotel/twin.jpg',
    nameKo: '스탠다드 트윈룸',
    nameEn: 'Standard Twin',
    size: '23㎡',
    guestsKo: '기준 2인 · 최대 2인',
    guestsEn: 'Up to 2 guests',
    bedKo: '싱글베드 2개',
    bedEn: '2 Single Beds',
  },
  {
    id: 'ondol',
    image: '/images/hotel/ondol.jpg',
    nameKo: '온돌 객실',
    nameEn: 'Ondol Room',
    size: '23㎡',
    guestsKo: '기준 3인 · 최대 4인',
    guestsEn: 'Up to 4 guests',
    bedKo: '개별 침구 세트',
    bedEn: 'Floor Bedding',
  },
];

// ── Availability badge ─────────────────────────────────────────────────────────

function AvailBadge({ room }: { room: RoomType }) {
  const pct = room.total > 0 ? room.available / room.total : 0;
  const isEmpty = room.available === 0;
  const isLow = pct <= 0.2 && !isEmpty;

  if (isEmpty)
    return (
      <span className="inline-flex items-center gap-1 bg-ink-soft/12 text-ink-soft/50 font-en-body font-bold text-[10px] tracking-[0.12em] uppercase px-2 py-[3px] rounded-sm">
        매진
      </span>
    );
  if (isLow)
    return (
      <span className="inline-flex items-center gap-1 bg-burgundy/10 text-burgundy font-en-body font-bold text-[10px] tracking-[0.12em] uppercase px-2 py-[3px] rounded-sm">
        잔여 {room.available}실
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 bg-gold/15 text-ink-soft font-en-body font-bold text-[10px] tracking-[0.12em] uppercase px-2 py-[3px] rounded-sm">
      잔여 {room.available}실
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Accommodation() {
  const locale = useLocale();
  const isKo = locale === 'ko';
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL ?? '#tickets';
  const hotelPdfUrl = process.env.NEXT_PUBLIC_HOTEL_PDF_URL ?? '';

  const [avail, setAvail] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d: AvailabilityData) => { setAvail(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const roomMap = avail?.enabled
    ? Object.fromEntries(avail.roomTypes.map((r) => [r.id, r]))
    : {};

  return (
    <section id="accommodation" className="bg-cream py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-en-body font-bold text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
            STAY
          </p>
          <h2
            className="font-kr-serif font-black text-ink-soft leading-[1.0] tracking-[-0.04em] mb-2"
            style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
          >
            {isKo ? '공식 지정 호텔' : 'Official Hotel'}
          </h2>
          <p className="font-en-display italic text-[20px] text-gold mb-1">
            더베네치아스위트
          </p>
          <p className="font-en-body text-[13px] text-charcoal/55 tracking-[0.12em] uppercase">
            The Venezia Suite · Chuncheon
          </p>
        </div>

        {/* Hotel exterior + info */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 mb-12 items-start">
          {/* Photo */}
          <div className="relative rounded-lg overflow-hidden shadow-[4px_4px_0_#8B1A2B]">
            <Image
              src="/images/hotel/exterior.jpg"
              alt="더베네치아스위트 외관"
              width={800}
              height={500}
              className="w-full object-cover"
              style={{ aspectRatio: '16/9' }}
            />
          </div>

          {/* Info card */}
          <div className="flex flex-col gap-5">
            <div className="bg-warm-white rounded-lg p-6 border border-ink-soft/8">
              <p className="font-en-body font-bold text-[10px] tracking-[0.3em] uppercase text-gold mb-4">
                HOTEL INFO
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 font-kr-sans text-[14px]">
                <dt className="text-charcoal/50 whitespace-nowrap">주소</dt>
                <dd className="text-ink-soft">강원특별자치도 춘천시 효자로 136</dd>
                <dt className="text-charcoal/50">연락처</dt>
                <dd className="text-ink-soft">033-255-9600</dd>
                <dt className="text-charcoal/50">시설</dt>
                <dd className="text-ink-soft">1F 로비 라운지 · 14F 테라스</dd>
                <dt className="text-charcoal/50">주차</dt>
                <dd className="text-ink-soft">무료 (메가시티 주차장)</dd>
              </dl>
            </div>

            <div className="flex flex-col gap-3">
              <RegisterButton
                href={registerUrl}
                className="block w-full bg-burgundy text-warm-white font-en-body font-bold text-[13px] tracking-[0.2em] uppercase text-center py-[13px] rounded-md shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px] transition-all duration-150"
              >
                {isKo ? '숙박 포함 예약하기 →' : 'Book with Accommodation →'}
              </RegisterButton>

              {hotelPdfUrl && (
                <a
                  href={hotelPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-ink-soft/20 text-ink-soft font-kr-sans text-[13px] text-center py-[11px] rounded-md hover:border-ink-soft/40 hover:text-ink transition-colors"
                >
                  호텔 안내문 PDF 다운로드 ↓
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Room types */}
        <div className="mb-10">
          <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase text-gold mb-6 text-center">
            ROOM TYPES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ROOMS.map((room) => {
              const liveRoom = roomMap[room.id];
              return (
                <div key={room.id} className="bg-warm-white rounded-lg overflow-hidden border border-ink-soft/8">
                  <div className="relative">
                    <Image
                      src={room.image}
                      alt={room.nameKo}
                      width={400}
                      height={240}
                      className="w-full object-cover"
                      style={{ aspectRatio: '5/3' }}
                    />
                    {avail?.enabled && liveRoom && (
                      <div className="absolute top-3 right-3">
                        <AvailBadge room={liveRoom} />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-kr-sans font-bold text-[15px] text-ink-soft mb-[2px]">
                      {isKo ? room.nameKo : room.nameEn}
                    </p>
                    <p className="font-en-body text-[12px] text-charcoal/55 mb-3">
                      {room.size} · {isKo ? room.guestsKo : room.guestsEn}
                    </p>
                    <p className="font-kr-sans text-[13px] text-charcoal/70">
                      {isKo ? room.bedKo : room.bedEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Packages — from API when enabled */}
        {avail?.enabled && avail.packages.length > 0 && (
          <div className="bg-burgundy rounded-lg p-6 text-warm-white text-center">
            <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase text-gold-soft mb-4">
              PACKAGES
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {avail.packages.map((pkg) => (
                <div key={pkg.id} className="bg-warm-white/10 rounded px-6 py-4 flex-1 max-w-[260px] mx-auto sm:mx-0">
                  <p className="font-kr-sans font-bold text-[14px] mb-2">{pkg.label}</p>
                  <p className="font-en-display italic font-black text-[28px] text-gold-soft">
                    ₩{pkg.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <RegisterButton
              href={registerUrl}
              className="inline-block mt-6 bg-gold text-ink font-en-body font-bold text-[13px] tracking-[0.2em] uppercase px-8 py-3 rounded-md shadow-[0_3px_0_#B8941E] hover:shadow-[0_1px_0_#B8941E] hover:translate-y-[2px] transition-all duration-150"
            >
              {isKo ? '패키지 예약하기 →' : 'Book Package →'}
            </RegisterButton>
          </div>
        )}

        {/* Coming soon notice (when API disabled) */}
        {!loading && !avail?.enabled && (
          <div className="text-center border border-dashed border-ink-soft/20 rounded-lg py-5 px-4">
            <p className="font-kr-sans text-[13px] text-charcoal/45">
              {isKo
                ? '숙박 패키지 가격은 곧 공개됩니다 — 예약 시작 시 알림을 받으세요'
                : 'Accommodation packages coming soon — register now to be notified'}
            </p>
          </div>
        )}

        {/* Amenities note */}
        <p className="font-kr-sans text-[12px] text-charcoal/40 text-center mt-6">
          {isKo
            ? '전 객실 공통: 인덕션·전기포트·세탁기·냉장고(유료) · 샤워용품·드라이어·타월 제공'
            : 'All rooms: induction cooker, kettle, washer, fridge (fee) · toiletries, hairdryer, towels'}
        </p>

      </div>
    </section>
  );
}
