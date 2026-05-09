// Lineup.jsx — v2 풀블리드 사진 카드, Belgrade-inspired
const HEADLINERS = [
  { kr: "땅고 바르도", en: "Tango Bardo", role: "오르께스따 띠삐까", origin: "Buenos Aires", bg: "linear-gradient(135deg, #460913 0%, #8B1A2B 60%, #2D0810 100%)" },
  { kr: "미스테리오사 부에노스 아이레스", en: "Misteriosa BA", role: "섹스테토", origin: "Buenos Aires", bg: "linear-gradient(135deg, #15293A 0%, #1F3A4A 50%, #0E1E2A 100%)" },
];

const MAESTROS = [
  { kr: "후아니타 & 까를리또스", en: "Juanita & Carlitos", role: "마에스트로", origin: "Buenos Aires", bg: "linear-gradient(135deg, #6B0F1F 0%, #460913 100%)" },
  { kr: "사빈 & 페드로", en: "Sabine & Pedro", role: "마에스트로", origin: "Berlin", bg: "linear-gradient(135deg, #2A4D5F 0%, #15293A 100%)" },
  { kr: "강민지 & 박재훈", en: "Minji & Jaehoon", role: "마에스트로", origin: "Seoul", bg: "linear-gradient(135deg, #8B1A2B 0%, #460913 100%)" },
];

const Lineup = () => (
  <section style={lineV2.section}>
    <div style={lineV2.head}>
      <div style={lineV2.eyebrow}>오르께스따 · 마에스트로</div>
      <h2 style={lineV2.title}>아홉 명의 아티스트, <em style={lineV2.italic}>한 호숫가에서.</em></h2>
      <p style={lineV2.lede}>부에노스 아이레스, 베를린, 서울에서. 사흘 동안 매일 다른 무대.</p>
    </div>

    {/* Headliners — large fullbleed */}
    <div style={lineV2.headlinersGrid}>
      {HEADLINERS.map((a) => (
        <article key={a.kr} style={{ ...lineV2.bigCard, background: a.bg }}>
          <div style={lineV2.placeholder}>[ 오케스트라 사진 ]</div>
          <div style={lineV2.bigShadow}/>
          <div style={lineV2.bigContent}>
            <div style={lineV2.bigTier}>★ 헤드라이너</div>
            <div style={lineV2.bigKr}>{a.kr}</div>
            <div style={lineV2.bigEn}>{a.en}</div>
            <div style={lineV2.bigMeta}><span>{a.role}</span><span style={lineV2.dot}>·</span><span>{a.origin}</span></div>
          </div>
        </article>
      ))}
    </div>

    {/* Maestros — medium fullbleed */}
    <div style={lineV2.maestroGrid}>
      {MAESTROS.map((a) => (
        <article key={a.kr} style={{ ...lineV2.midCard, background: a.bg }}>
          <div style={lineV2.placeholder}>[ 마에스트로 사진 ]</div>
          <div style={lineV2.bigShadow}/>
          <div style={lineV2.midContent}>
            <div style={lineV2.midTier}>마에스트로</div>
            <div style={lineV2.midKr}>{a.kr}</div>
            <div style={lineV2.midEn}>{a.en}</div>
            <div style={lineV2.bigMeta}><span>{a.origin}</span></div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const lineV2 = {
  section: { background: "#FDFAF5", padding: "120px 40px" },
  head: { maxWidth: 1440, margin: "0 auto 56px" },
  eyebrow: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.32em", color: "#8B1A2B", textTransform: "uppercase", marginBottom: 20 },
  title: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px", color: "#1A1A1A", maxWidth: 1100 },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#8B1A2B", fontWeight: 500 },
  lede: { fontFamily: "'Pretendard',sans-serif", fontSize: 17, color: "#5A6670", margin: 0, lineHeight: 1.6 },

  headlinersGrid: { maxWidth: 1440, margin: "0 auto 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  bigCard: { position: "relative", aspectRatio: "4/5", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 40, color: "#FDFAF5" },
  bigShadow: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,41,58,0.10) 0%, rgba(15,41,58,0.85) 100%)" },
  placeholder: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(253,250,245,0.3)", fontSize: 14 },
  bigContent: { position: "relative", display: "flex", flexDirection: "column", gap: 8 },
  bigTier: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 8 },
  bigKr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 800, fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1, letterSpacing: "-0.03em" },
  bigEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(20px, 2vw, 28px)", color: "rgba(253,250,245,0.8)", lineHeight: 1.2 },
  bigMeta: { fontFamily: "'Pretendard',sans-serif", fontSize: 13, color: "rgba(253,250,245,0.65)", display: "flex", gap: 10, marginTop: 12, letterSpacing: "0.04em" },
  dot: { color: "rgba(253,250,245,0.4)" },

  maestroGrid: { maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  midCard: { position: "relative", aspectRatio: "3/4", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 28, color: "#FDFAF5" },
  midContent: { position: "relative", display: "flex", flexDirection: "column", gap: 6 },
  midTier: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 10, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 6 },
  midKr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.02em" },
  midEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 17, color: "rgba(253,250,245,0.78)" },
};
