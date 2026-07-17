'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

// ── EventLink 공개 API (잔여/가격) ─────────────────────────────────────────────

type LocaleStr = { ko: string; en: string };

type RoomType = {
  id: string;
  hotelId?: string;
  label: LocaleStr;
  hint?: LocaleStr;
  capacity?: { base: number; max: number };
  total?: number;
  booked?: number;
  available?: number;
  pricePerNight?: number;
  closed?: boolean;
};

type AvailabilityData = {
  ok: boolean;
  enabled: boolean;
  currency: string;
  roomTypes: RoomType[];
};

const API_URL =
  'https://kcctf-5047d.web.app/api/events/chuncheon-citf-2026/accommodation/availability';

// 숙박만 예약 링크 (등록 플랫폼) — ⚠️ 비공개 초대(invite) 링크는 넣지 말 것
const BOOK_HOTEL_URL =
  'https://kcctf-5047d.web.app/register/chuncheon-citf-2026?mode=hotel';

// ── 정적 메타 (사진·침대·발코니) — 플랫폼 room id 기준. 사진 없으면 placeholder ──

const ROOM_META: Record<
  string,
  { image: string | null; bedKo: string; bedEn: string; balcony: boolean }
> = {
  double:         { image: '/images/hotel/double.jpg', bedKo: '퀸베드 1개',            bedEn: '1 Queen bed',            balcony: false },
  ondol:          { image: '/images/hotel/ondol.jpg',  bedKo: '온돌 · 바닥 이부자리',     bedEn: 'Ondol · floor bedding',  balcony: false },
  'eston-double': { image: '/images/hotel/eston/deluxe-double.jpg', bedKo: '더블베드 1개',          bedEn: '1 Double bed',           balcony: true  },
  'eston-twin':   { image: '/images/hotel/eston/deluxe-twin.jpg',   bedKo: '더블베드 1개 · 싱글베드 1개', bedEn: '1 Double + 1 Single bed', balcony: true  },
  'eston-family': { image: '/images/hotel/eston/family-twin.jpg',   bedKo: '더블베드 2개',          bedEn: '2 Double beds',          balcony: true  },
};

// ── 공식 지정 호텔 (객실은 API 기준으로 표시) ──────────────────────────────────

const HOTELS: {
  id: string;
  nameKo: string;
  nameEn: string;
  taglineKo: string;
  taglineEn: string;
}[] = [
  {
    id: 'venezia',
    nameKo: '더베네치아스위트',
    nameEn: 'The Venezia Suite',
    taglineKo: '페스티벌 공식 호텔 · 봄내체육관까지 셔틀 운행',
    taglineEn: 'Official festival hotel · shuttle to Bomnae Complex',
  },
  {
    id: 'eston',
    nameKo: '에스턴호텔',
    nameEn: 'Eston Hotel',
    taglineKo: '춘천 중앙로 · 전 객실 발코니/테라스',
    taglineEn: 'Chuncheon Jungang-ro · balcony/terrace in every room',
  },
];

// ── 잔여 배지 ───────────────────────────────────────────────────────────────────

function AvailBadge({ room }: { room: RoomType }) {
  const total = room.total ?? 0;
  const available = room.available ?? 0;
  const pct = total > 0 ? available / total : 0;
  const isEmpty = available === 0;
  const isLow = pct <= 0.2 && !isEmpty;
  const base =
    'inline-flex items-center gap-1 font-en-body font-bold text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 rounded shadow-[0_1px_5px_rgba(26,20,16,0.25)]';
  if (isEmpty) return <span className={`${base} bg-ink-soft text-warm-white`}>매진</span>;
  if (isLow) return <span className={`${base} bg-burgundy text-warm-white`}>잔여 {available}실</span>;
  return <span className={`${base} bg-warm-white text-burgundy`}>잔여 {available}실</span>;
}

// ── 객실 카드 ───────────────────────────────────────────────────────────────────

function RoomCard({ room, isKo }: { room: RoomType; isKo: boolean }) {
  const meta = ROOM_META[room.id];
  const name = isKo ? room.label.ko : room.label.en;
  const maxGuests = room.capacity?.max;
  const bed = meta ? (isKo ? meta.bedKo : meta.bedEn) : room.hint ? (isKo ? room.hint.ko : room.hint.en) : '';
  const balcony = meta?.balcony;

  return (
    <div className="bg-warm-white rounded-lg overflow-hidden border border-ink-soft/8 flex flex-col">
      <div className="relative">
        {meta?.image ? (
          <Image
            src={meta.image}
            alt={name}
            width={400}
            height={240}
            className="w-full object-cover"
            style={{ aspectRatio: '5/3' }}
          />
        ) : (
          <div className="w-full bg-cream flex items-center justify-center" style={{ aspectRatio: '5/3' }}>
            <span className="font-en-body font-bold text-[10px] tracking-[0.3em] uppercase text-ink-soft/30">
              {isKo ? '사진 준비중' : 'Photo coming'}
            </span>
          </div>
        )}
        {room.available != null && !room.closed && (
          <div className="absolute top-3 right-3">
            <AvailBadge room={room} />
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="font-kr-sans font-bold text-[15px] text-ink-soft mb-[2px]">{name}</p>
        {maxGuests != null && (
          <p className="font-en-body text-[12px] text-charcoal/55 mb-3">
            {isKo ? `최대 ${maxGuests}인` : `Up to ${maxGuests} guests`}
            {balcony ? (isKo ? ' · 발코니/테라스' : ' · Balcony/Terrace') : ''}
          </p>
        )}
        {bed && <p className="font-kr-sans text-[13px] text-charcoal/70">{bed}</p>}
        {room.pricePerNight != null && (
          <p className="font-kr-sans font-bold text-[12px] text-gold mt-2">
            {isKo ? `1박 ₩${room.pricePerNight.toLocaleString()}` : `₩${room.pricePerNight.toLocaleString()} / night`}
          </p>
        )}
      </div>
    </div>
  );
}

// ── 메인 ────────────────────────────────────────────────────────────────────────

export default function Accommodation() {
  const locale = useLocale();
  const isKo = locale === 'ko';

  const [avail, setAvail] = useState<AvailabilityData | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d: AvailabilityData) => setAvail(d))
      .catch(() => {});
  }, []);

  const rooms = avail?.enabled ? avail.roomTypes.filter((r) => !r.closed) : [];
  const roomsByHotel = (hotelId: string) => rooms.filter((r) => (r.hotelId ?? 'venezia') === hotelId);

  return (
    <section id="accommodation" className="bg-cream py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-12">
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
            {isKo ? '두 곳의 공식 호텔에서 편하게 머무세요.' : 'Stay at one of two official hotels.'}
          </p>
        </div>

        {/* Hotels */}
        <div className="flex flex-col gap-12">
          {HOTELS.map((hotel) => {
            const hotelRooms = roomsByHotel(hotel.id);
            return (
              <div key={hotel.id} className="rounded-lg border border-ink-soft/8 bg-warm-white/40 p-6 md:p-8">
                {/* Hotel header */}
                <div className="mb-6 text-center">
                  <p className="font-en-display italic text-[24px] text-gold leading-tight">{hotel.nameKo}</p>
                  <p className="font-en-body text-[12px] text-charcoal/55 tracking-[0.12em] uppercase mt-0.5">{hotel.nameEn}</p>
                  <p className="font-kr-sans text-[13px] text-charcoal/60 mt-2">{isKo ? hotel.taglineKo : hotel.taglineEn}</p>
                </div>

                {/* Rooms */}
                {hotelRooms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hotelRooms.map((room) => (
                      <RoomCard key={room.id} room={room} isKo={isKo} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-kr-sans text-[13px] text-charcoal/45">
                    {isKo ? '객실 정보를 불러오는 중입니다.' : 'Loading room information…'}
                  </p>
                )}

              </div>
            );
          })}
        </div>

        {/* Note + CTA */}
        <p className="font-kr-sans text-[12px] text-charcoal/45 text-center mt-10">
          {isKo
            ? '※ 위 금액은 객실 비용(1박)이며 참가비(풀패스 ₩190,000)는 별도입니다. 숙박은 신청 폼에서 함께 예약됩니다.'
            : '※ Prices are per room per night; the festival pass (₩190,000) is separate. Accommodation is booked with your pass.'}
        </p>
        <div className="text-center mt-5">
          <a
            href={BOOK_HOTEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-burgundy px-6 py-3 font-kr-sans text-[14px] font-bold text-warm-white shadow-[0_3px_0_#5A0E1B] transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_2px_0_#5A0E1B]"
          >
            {isKo ? '숙박만 예약하기 →' : 'Book accommodation only →'}
          </a>
        </div>

      </div>
    </section>
  );
}
