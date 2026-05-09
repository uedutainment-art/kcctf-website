// Tickets.jsx — v2 라운드 티켓 카드
const TIERS = [
  { name: "Full Pass", kr: "전체 패스", price: "₩320,000", desc: "사흘 모든 밀롱가, 모든 워크샵, 환영회까지", note: "10/3 — 10/5", featured: true },
  { name: "Milonga Pass", kr: "밀롱가 패스", price: "₩180,000", desc: "사흘 밤 모든 밀롱가", note: "워크샵 미포함" },
  { name: "Day Pass", kr: "1일 패스", price: "₩90,000", desc: "원하는 하루의 밀롱가 + 환영 음료", note: "현장 구매 가능" },
];

const Tickets = ({ onBook }) => (
  <section style={ticV2.section}>
    <div style={ticV2.head}>
      <div style={ticV2.eyebrow}>티켓</div>
      <h2 style={ticV2.title}>당신의 사흘을 <em style={ticV2.italic}>고르세요.</em></h2>
      <p style={ticV2.lede}>얼리버드 마감: <strong>2026년 8월 31일</strong>. 이후 가격이 인상됩니다.</p>
    </div>
    <div style={ticV2.grid}>
      {TIERS.map((t) => (
        <article key={t.name} style={{ ...ticV2.card, ...(t.featured ? ticV2.cardFeatured : {}) }}>
          {t.featured && <div style={ticV2.ribbon}>★ 추천</div>}
          <div style={ticV2.cardHead}>
            <div style={ticV2.cardEn}>{t.name}</div>
            <div style={ticV2.cardKr}>{t.kr}</div>
          </div>
          <div style={ticV2.price}>{t.price}</div>
          <div style={ticV2.desc}>{t.desc}</div>
          <div style={ticV2.note}>{t.note}</div>
          <button
            style={t.featured ? ticV2.btnSolid : ticV2.btnOutline}
            onClick={onBook}
          >
            예약하기 →
          </button>
        </article>
      ))}
    </div>
  </section>
);

const ticV2 = {
  section: { background: "#FDFAF5", padding: "120px 40px" },
  head: { maxWidth: 1440, margin: "0 auto 56px", textAlign: "center" },
  eyebrow: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.32em", color: "#8B1A2B", textTransform: "uppercase", marginBottom: 20 },
  title: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px", color: "#1A1A1A" },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8B1A2B", fontWeight: 500 },
  lede: { fontFamily: "'Pretendard',sans-serif", fontSize: 16, color: "#5A6670", margin: 0, lineHeight: 1.6 },
  grid: { maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  card: { position: "relative", background: "#FFFFFF", padding: "44px 32px 32px", borderRadius: 16, border: "1px solid rgba(26,26,26,0.10)", display: "flex", flexDirection: "column", gap: 16 },
  cardFeatured: { background: "#15293A", color: "#FDFAF5", border: "1px solid #D4A017", boxShadow: "0 12px 32px rgba(15,41,58,0.18)" },
  ribbon: { position: "absolute", top: -12, left: 24, background: "#D4A017", color: "#15293A", padding: "6px 14px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" },
  cardHead: { display: "flex", flexDirection: "column", gap: 4 },
  cardEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 18, color: "currentColor", opacity: 0.7 },
  cardKr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: 28, letterSpacing: "-0.02em" },
  price: { fontFamily: "'Noto Serif KR',serif", fontWeight: 800, fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 8 },
  desc: { fontFamily: "'Pretendard',sans-serif", fontSize: 14, opacity: 0.78, lineHeight: 1.6 },
  note: { fontFamily: "'Pretendard',sans-serif", fontSize: 12, opacity: 0.55, letterSpacing: "0.04em", marginTop: "auto" },
  btnSolid: { background: "#D4A017", color: "#15293A", border: "none", padding: "16px 0", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 12 },
  btnOutline: { background: "transparent", color: "#15293A", border: "1.5px solid #15293A", padding: "16px 0", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: 12 },
};
