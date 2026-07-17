// ─────────────────────────────────────────────────────────────────────────────
// Types  (mirrored from CLAUDE.md §데이터 모델)
// ─────────────────────────────────────────────────────────────────────────────

export type Orchestra = {
  id: string;
  nameKo: string;
  nameEn: string;
  roleKo: string;
  roleEn: string;
  origin: string;
  image: string;
};

export type DJ = {
  id: string;
  nameKo: string;
  nameEn: string;
  city: string;
  cityEn: string;
  country: string;
  image: string;
};

export type DanceTeam = {
  id: string;
  name: string;
  origin: string;
  image: string | null;
  /** CSS object-position for the card photo (default: 'center 25%') */
  objectPosition?: string;
  isTBA: boolean;
};

export type ScheduleDay = '10/3' | '10/4' | '10/5';
export type ScheduleDow = 'SAT' | 'SUN' | 'MON';
export type ScheduleType = 'concert' | 'milonga' | 'tour' | 'afterparty';

/** 라이브로 무대에 서는 오케스트라 (밤=둘 다, 일·월 낮=미스테리오사) */
export type OrchestraLive = 'misteriosa' | 'tango-bardo';
export const ORCHESTRA_SHORT: Record<OrchestraLive, string> = {
  misteriosa: 'Misteriosa',
  'tango-bardo': 'Tango Bardo',
};

export type ScheduleItem = {
  day: ScheduleDay;
  dow: ScheduleDow;
  time: string;
  type: ScheduleType;
  /** Index into content/*.json schedule.items[] for title/subtitle/mood */
  idx: number;
  djId?: string;
  /** 이 세션에 라이브로 연주하는 오케스트라 */
  live?: OrchestraLive[];
  featured?: boolean;
};

export type TicketTierId = 'fullpack-early' | 'fullpack-onsite' | 'daypass';

export type TicketTier = {
  id: TicketTierId;
  /** Price in KRW — source of truth: 운영기준.md §4 */
  price: number;
  currency: 'KRW';
  featured: boolean;
};

export type Venue = {
  id: string;
  type: 'milonga' | 'concert';
  image: string | null;
  address: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

export const ORCHESTRAS: Orchestra[] = [
  {
    id: 'tango-bardo',
    nameKo: '탱고 바르도',
    nameEn: 'Tango Bardo',
    roleKo: '오르케스타 티피카',
    roleEn: 'Orquesta Típica',
    origin: 'Buenos Aires',
    image: '/images/orq-tango-bardo.jpg',
  },
  {
    id: 'misteriosa-ba',
    nameKo: '미스테리오사 부에노스 아이레스',
    nameEn: 'Orquesta Típica Misteriosa Buenos Aires',
    roleKo: '탱고 앙상블',
    roleEn: 'Tango Ensemble',
    origin: 'Buenos Aires',
    image: '/images/orq-misteriosa.jpg',
  },
];

export const DJS: DJ[] = [
  { id: 'natalie', nameKo: '나탈리',   nameEn: 'Nathalie Cheng', city: '홍콩', cityEn: 'Hong Kong', country: 'Hong Kong', image: '/images/DJ/1.png' },
  { id: 'wangwei', nameKo: '왕웨이',   nameEn: 'Wang Wei',       city: '상하이', cityEn: 'Shanghai',  country: 'China',     image: '/images/DJ/2.png' },
  { id: 'carlos',  nameKo: '까를로스', nameEn: 'Carlos',         city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/3.png' },
  { id: 'stone',   nameKo: '스톤',     nameEn: 'Stone',          city: '부산', cityEn: 'Busan',     country: 'Korea',     image: '/images/DJ/4.png' },
  { id: 'becca',   nameKo: '베카',     nameEn: 'Becca',          city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/5.png' },
  { id: 'hagoon',  nameKo: '하군',     nameEn: 'Hagoon',         city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/6.png' },
];

// 2-1-2 배치(읽는 순서) = 상단 2 · 가운데 1(팀류) · 하단 2
export const DANCE_TEAMS: DanceTeam[] = [
  { id: 'nadia-erik',   name: 'Nadia Aguilar y Erik Deslarmes', origin: 'Argentina', image: '/images/DANCER/Nadia Aguilar y Erik Deslarmes.jpg', isTBA: false },
  { id: 'london-sol',   name: 'London Hong & Sol',       origin: 'Korea', image: '/images/DANCER/London Hong & Sol.jpg',       isTBA: false },
  { id: 'team-ryu',     name: 'Team Ryu',                origin: 'Korea', image: '/images/DANCER/Team Ryu.png', isTBA: false },
  { id: 'victor-rui',   name: 'Victor & Rui',            origin: 'Korea & Japan', image: '/images/DANCER/victor-rui.jpg', isTBA: false },
  { id: 'hyemi-wonjun', name: 'Xion & Hari', origin: 'Korea', image: '/images/DANCER/xion-hari.jpg', isTBA: false },
];

// Prices: 운영기준.md §4 — NEVER change without owner approval
export const TICKET_TIERS: TicketTier[] = [
  { id: 'fullpack-early',  price: 190000, currency: 'KRW', featured: true  },
  { id: 'fullpack-onsite', price: 240000, currency: 'KRW', featured: false },
  { id: 'daypass',         price: 100000, currency: 'KRW', featured: false },
];

// 요일별 당일권(데이패스) — 토(문화예술회관 오프닝 콘서트일) ₩120,000 / 일·월 ₩100,000
export const DAY_PASS_BY_DAY: Record<ScheduleDay, number> = {
  '10/3': 120000,
  '10/4': 100000,
  '10/5': 100000,
};

// Schedule: 운영기준.md §7 — 요일 검증: 10/3=SAT 10/4=SUN 10/5=MON
// idx matches position in content/*.json schedule.items[]
// 2026-06-11 DJ 배정 확정: M1 왕웨이·M2 까를로스·M3 나탈리·M4 베카·M5 스톤·M6 하군 (content/*.json djName과 일치, M2 21:00)
export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { day: '10/3', dow: 'SAT', time: '13:00 — 14:40', type: 'concert',    idx: 0, live: ['tango-bardo'],               featured: true  },
  { day: '10/3', dow: 'SAT', time: '15:00 — 20:00', type: 'milonga',    idx: 1, djId: 'wangwei' },
  { day: '10/3', dow: 'SAT', time: '21:00 — 04:00', type: 'milonga',    idx: 2, djId: 'carlos',  live: ['misteriosa', 'tango-bardo'] },
  { day: '10/4', dow: 'SUN', time: '14:00 — 19:00', type: 'milonga',    idx: 3, djId: 'natalie', live: ['misteriosa'] },
  { day: '10/4', dow: 'SUN', time: '21:00 — 03:00', type: 'milonga',    idx: 4, djId: 'becca',   live: ['misteriosa', 'tango-bardo'], featured: true },
  { day: '10/5', dow: 'MON', time: '11:00 — 14:00', type: 'tour',       idx: 5 },
  { day: '10/5', dow: 'MON', time: '15:00 — 20:00', type: 'milonga',    idx: 6, djId: 'stone',   live: ['misteriosa'] },
  { day: '10/5', dow: 'MON', time: '20:00 — 24:00', type: 'afterparty', idx: 7, djId: 'hagoon',  live: ['misteriosa', 'tango-bardo'], featured: true },
];

export const VENUES: Venue[] = [
  {
    id: 'bomnae',
    type: 'milonga',
    image: null,
    address: '강원특별자치도 춘천시',
  },
];

// Helper to format KRW price with ₩ symbol
export function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString('ko-KR')}`;
}
