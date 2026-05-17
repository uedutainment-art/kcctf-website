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
  isTBA: boolean;
};

export type ScheduleDay = '10/3' | '10/4' | '10/5';
export type ScheduleDow = 'SAT' | 'SUN' | 'MON';
export type ScheduleType = 'concert' | 'milonga' | 'tour' | 'afterparty';

export type ScheduleItem = {
  day: ScheduleDay;
  dow: ScheduleDow;
  time: string;
  type: ScheduleType;
  /** Index into content/*.json schedule.items[] for title/subtitle/mood */
  idx: number;
  djId?: string;
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
    nameKo: '땅고 바르도',
    nameEn: 'Tango Bardo',
    roleKo: '오르케스타 티피카',
    roleEn: 'Orquesta Típica',
    origin: 'Buenos Aires',
    image: '/images/orq-tango-bardo.jpg',
  },
  {
    id: 'misteriosa-ba',
    nameKo: '미스테리오사 부에노스 아이레스',
    nameEn: 'Orquesta Tipica Misteriosa Buenos Aires',
    roleKo: '탱고 앙상블',
    roleEn: 'Tango Ensemble',
    origin: 'Buenos Aires',
    image: '/images/orq-misteriosa.jpg',
  },
];

export const DJS: DJ[] = [
  { id: 'natalie', nameKo: '나탈리',   nameEn: 'Nathalie Cheng', city: '홍콩', cityEn: 'Hong Kong', country: 'Hong Kong', image: '/images/DJ/1.png' },
  { id: 'wangwei', nameKo: '왕웨이',   nameEn: 'Wang Wei',       city: '상해', cityEn: 'Shanghai',  country: 'China',     image: '/images/DJ/2.png' },
  { id: 'carlos',  nameKo: '까를로스', nameEn: 'Carlos',         city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/3.png' },
  { id: 'stone',   nameKo: '스톤',     nameEn: 'Stone',          city: '부산', cityEn: 'Busan',     country: 'Korea',     image: '/images/DJ/4.png' },
  { id: 'becca',   nameKo: '베카',     nameEn: 'Becca',          city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/5.png' },
  { id: 'hagoon',  nameKo: '하군',     nameEn: 'Hagoon',         city: '서울', cityEn: 'Seoul',     country: 'Korea',     image: '/images/DJ/6.png' },
];

export const DANCE_TEAMS: DanceTeam[] = [
  { id: 'london-sol',   name: 'London Hong & Sol',       origin: 'Korea', image: null, isTBA: false },
  { id: 'hyemi-wonjun', name: 'Hyemi Seo & Wonjun Seol', origin: 'Korea', image: null, isTBA: false },
  { id: 'team-ryu',     name: 'Team Ryu',                origin: 'Korea', image: null, isTBA: false },
  { id: 'tba',          name: 'Coming Soon',             origin: 'TBA',   image: null, isTBA: true  },
];

// Prices: 운영기준.md §4 — NEVER change without owner approval
export const TICKET_TIERS: TicketTier[] = [
  { id: 'fullpack-early',  price: 190000, currency: 'KRW', featured: true  },
  { id: 'fullpack-onsite', price: 240000, currency: 'KRW', featured: false },
  { id: 'daypass',         price: 100000, currency: 'KRW', featured: false },
];

// Schedule: 운영기준.md §7 — 요일 검증: 10/3=SAT 10/4=SUN 10/5=MON
// idx matches position in content/*.json schedule.items[]
export const SCHEDULE_ITEMS: ScheduleItem[] = [
  { day: '10/3', dow: 'SAT', time: '13:00 — 14:40', type: 'concert',    idx: 0, featured: true  },
  { day: '10/3', dow: 'SAT', time: '15:00 — 20:00', type: 'milonga',    idx: 1, djId: 'becca'   },
  { day: '10/3', dow: 'SAT', time: '22:00 — 04:00', type: 'milonga',    idx: 2, djId: 'carlos'  },
  { day: '10/4', dow: 'SUN', time: '14:00 — 19:00', type: 'milonga',    idx: 3, djId: 'hagoon'  },
  { day: '10/4', dow: 'SUN', time: '21:00 — 03:00', type: 'milonga',    idx: 4, djId: 'wangwei', featured: true },
  { day: '10/5', dow: 'MON', time: '11:00 — 14:00', type: 'tour',       idx: 5 },
  { day: '10/5', dow: 'MON', time: '15:00 — 20:00', type: 'milonga',    idx: 6, djId: 'stone'   },
  { day: '10/5', dow: 'MON', time: '20:00 — 24:00', type: 'afterparty', idx: 7, djId: 'natalie', featured: true },
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
