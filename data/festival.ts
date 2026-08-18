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
  { id: 'team-ryu',     name: 'Team Ryu',                origin: 'Korea', image: '/images/DANCER/Team Ryu-1.png', isTBA: false },
  { id: 'victor-rui',   name: 'Victor & Rui',            origin: 'Korea & Japan', image: '/images/DANCER/victor-rui.jpg', isTBA: false },
  { id: 'hyemi-wonjun', name: 'Xion & Hari', origin: 'Korea', image: '/images/DANCER/xion-hari.jpg', isTBA: false },
];

// Prices: 운영기준.md §4 — NEVER change without owner approval
export const TICKET_TIERS: TicketTier[] = [
  { id: 'fullpack-early',  price: 190000, currency: 'KRW', featured: true  },
  { id: 'fullpack-onsite', price: 240000, currency: 'KRW', featured: false },
  { id: 'daypass',         price: 100000, currency: 'KRW', featured: false },
];

// ── 판매창 (한국시간 KST 고정) ───────────────────────────────────────────────
// 뷰어 시간대와 무관하게 KST 기준으로 판정. 해외 접속자도 동일하게 열리고 닫힘.
export type SaleWindow = { openKST: string; closeKST: string | null };

/** 'YYYY-MM-DDTHH:mm' 을 KST(+09:00)로 해석해 epoch(ms) 반환 */
function kstMs(iso: string): number {
  return new Date(`${iso}:00+09:00`).getTime();
}

export const SALE_WINDOWS: Record<'shuttle' | 'dayPass', SaleWindow> = {
  /** 셔틀 왕복권 — 8/24 예약 시작 (마감은 좌석 소진 시 = 플랫폼에서 처리) */
  shuttle: { openKST: '2026-08-24T00:00', closeKST: null },
  /** 1일권·2일권 — 9/1 00:00 ~ 10/2 23:59 온라인 */
  dayPass: { openKST: '2026-09-01T00:00', closeKST: '2026-10-02T23:59' },
};

export function isSaleOpen(w: SaleWindow, now: number = Date.now()): boolean {
  if (now < kstMs(w.openKST)) return false;
  if (w.closeKST && now > kstMs(w.closeKST)) return false;
  return true;
}

/** 판매창 오픈 전(true) / 오픈 후·마감 후(false) — 티저 vs 마감 안내 분기용 */
export function isBeforeSaleOpen(w: SaleWindow, now: number = Date.now()): boolean {
  return now < kstMs(w.openKST);
}

/** 셔틀버스 — 확정값 입력란. fare 가 null 이면 요금 미정으로 표시하고 예약 버튼을 노출하지 않음 */
export const SHUTTLE: { fare: number | null; seats: number | null } = {
  fare: null,   // 예: 50000
  seats: null,  // 예: 45
};

// 1일권·2일권 — 요일 구분 없는 자유이용권(축제 기간 중 아무 날). 판매 기간은 SALE_WINDOWS.dayPass 참조
export const DAY_PASS = {
  oneDay: 100000,  // 온라인
  twoDay: 200000,  // 온라인
  onsite: 120000,  // 1일권 현장
} as const;

// Schedule: 운영기준.md §7 — 요일 검증: 10/3=SAT 10/4=SUN 10/5=MON
// ⚠️ 오프닝 콘서트는 같은 공연을 문화예술회관에서 2회: 10/2(금)19:30 일반시민용(이 사이트에 절대 노출 금지),
//    10/3(토)13:00 탱고인용(여기 표기된 것·풀패스/토 데이패스 포함). 10/2 정보를 여기에 넣지 말 것.
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
