'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import RegisterButton from './RegisterButton';

// ── EventLink API types ────────────────────────────────────────────────────────

type LocaleStr = { ko: string; en: string };

type RoomType = {
  id: string;
  label: LocaleStr;
  hint: LocaleStr;
  capacity: { base: number; max: number };
  total: number;
  booked: number;
  available: number;
};

type Package = {
  id: string;
  nights: string[];
  nightsCount: number;
  label: LocaleStr;
  description: LocaleStr;
  default: boolean;
  priceTotal: number;
};

type AvailabilityData = {
  ok: boolean;
  enabled: boolean;
  pricePerNightPerRoom: number;
  currency: string;
  packages: Package[];
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

  const pricePerNight = avail?.enabled ? avail.pricePerNightPerRoom : null;

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
          <div className="flex items-baseline justify-center gap-3 mb-6">
            <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase text-gold">
              ROOM TYPES
            </p>
            {pricePerNight && (
              <p className="font-kr-sans text-[12px] text-charcoal/50">
                {isKo
                  ? `1박 ₩${pricePerNight.toLocaleString()} · 숙박만`
                  : `₩${pricePerNight.toLocaleString()} / night · room only`}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {ROOMS.map((room) => {
              const liveRoom = roomMap[room.id];
              const displayName = liveRoom
                ? (isKo ? liveRoom.label.ko : liveRoom.label.en)
                : (isKo ? room.nameKo : room.nameEn);
              const displayHint = liveRoom
                ? (isKo ? liveRoom.hint.ko : liveRoom.hint.en)
                : (isKo ? room.guestsKo : room.guestsEn);
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
                      {displayName}
                    </p>
                    <p className="font-en-body text-[12px] text-charcoal/55 mb-3">
                      {room.size} · {displayHint}
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
          <div className="mb-10">
            <p className="font-en-body font-bold text-[11px] tracking-[0.3em] uppercase text-gold mb-6 text-center">
              PACKAGES
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
              {avail.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-lg p-5 flex flex-col border-2 transition-colors ${
                    pkg.default
                      ? 'bg-burgundy border-burgundy text-warm-white'
                      : 'bg-warm-white border-ink-soft/10 text-ink-soft'
                  }`}
                >
                  {pkg.default && (
                    <span className="absolute -top-[11px] left-1/2 -translate-x-1/2 bg-gold text-ink font-en-body font-bold text-[9px] tracking-[0.2em] uppercase px-3 py-[3px] rounded-full whitespace-nowrap">
                      {isKo ? '추천' : 'POPULAR'}
                    </span>
                  )}
                  <p className={`font-en-body font-bold text-[10px] tracking-[0.2em] uppercase mb-1 ${pkg.default ? 'text-gold-soft' : 'text-gold'}`}>
                    {pkg.nightsCount}{isKo ? '박' : 'N'}
                  </p>
                  <p className="font-kr-sans font-bold text-[14px] leading-snug mb-1">
                    {isKo ? pkg.label.ko : pkg.label.en}
                  </p>
                  <p className={`font-kr-sans text-[12px] mb-4 flex-1 ${pkg.default ? 'text-warm-white/65' : 'text-charcoal/50'}`}>
                    {isKo ? pkg.description.ko : pkg.description.en}
                  </p>
                  <p className={`font-en-display italic font-black text-[26px] leading-none ${pkg.default ? 'text-gold-soft' : 'text-ink-soft'}`}>
                    ₩{pkg.priceTotal.toLocaleString()}
                  </p>
                  <p className={`font-kr-sans text-[10px] mt-1 ${pkg.default ? 'text-warm-white/50' : 'text-charcoal/40'}`}>
                    {isKo ? '숙박만 · 참가비 별도' : 'room only · pass separate'}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <RegisterButton
                href={registerUrl}
                className="inline-block bg-burgundy text-warm-white font-en-body font-bold text-[13px] tracking-[0.2em] uppercase px-10 py-3 rounded-md shadow-[0_3px_0_#5A0E1B] hover:shadow-[0_1px_0_#5A0E1B] hover:translate-y-[2px] transition-all duration-150"
              >
                {isKo ? '숙박 패키지 예약하기 →' : 'Book Accommodation Package →'}
              </RegisterButton>
            </div>
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

        {/* Pricing note */}
        {avail?.enabled && (
          <p className="font-kr-sans text-[12px] text-charcoal/45 text-center mt-4 mb-2">
            {isKo
              ? '※ 위 숙박 금액은 객실 비용만입니다. 참가비(풀패스 ₩190,000)는 별도이며, 신청 폼에서 합산 금액이 표시됩니다.'
              : '※ Accommodation prices are room costs only. Festival pass (₩190,000) is separate — the total is shown at checkout.'}
          </p>
        )}

        {/* Amenities note */}
        <p className="font-kr-sans text-[12px] text-charcoal/40 text-center mt-3">
          {isKo
            ? '전 객실 공통: 인덕션·전기포트·세탁기·냉장고(유료) · 샤워용품·드라이어·타월 제공'
            : 'All rooms: induction cooker, kettle, washer, fridge (fee) · toiletries, hairdryer, towels'}
        </p>

      </div>
    </section>
  );
}
