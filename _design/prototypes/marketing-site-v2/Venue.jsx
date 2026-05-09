// Venue.jsx — v2 호숫가 베뉴
const Venue = () => (
  <section style={venV2.section}>
    <div style={venV2.bg}/>
    <div style={venV2.gradient}/>
    <div style={venV2.content}>
      <div style={venV2.left}>
        <div style={venV2.eyebrow}>장소</div>
        <h2 style={venV2.title}>호숫가에서, <em style={venV2.italic}>물빛이 바뀌는 동안.</em></h2>
        <p style={venV2.body}>춘천 의암호반 — 부에노스 아이레스의 라 비루타가 항구를 안고 있다면, 우리는 호수를 안고 있습니다.</p>
        <div style={venV2.address}>
          <div style={venV2.addressLine}>춘천봄내체육관</div>
          <div style={venV2.addressLine2}>강원특별자치도 춘천시 호반대로 12</div>
        </div>
        <div style={venV2.actions}>
          <button style={venV2.btnGold}>지도 열기 →</button>
          <button style={venV2.btnGhost}>오시는 길</button>
        </div>
      </div>
      <div style={venV2.right}>
        <div style={venV2.mapBox}>
          <svg viewBox="0 0 400 400" style={venV2.mapSvg}>
            <rect width="400" height="400" fill="#1F3A4A"/>
            <path d="M0,180 Q100,140 200,180 T400,180 L400,400 L0,400 Z" fill="#2A4D5F" opacity="0.6"/>
            <path d="M0,220 Q120,200 240,225 T400,220 L400,400 L0,400 Z" fill="#15293A" opacity="0.5"/>
            <circle cx="220" cy="160" r="4" fill="#E8C25E"/>
            <circle cx="220" cy="160" r="14" fill="none" stroke="#E8C25E" strokeWidth="1" opacity="0.5"/>
            <circle cx="220" cy="160" r="28" fill="none" stroke="#E8C25E" strokeWidth="0.5" opacity="0.3"/>
            <text x="232" y="158" fontFamily="Pretendard, sans-serif" fontSize="11" fill="#FDFAF5" letterSpacing="0.1em">춘천봄내체육관</text>
            <text x="232" y="172" fontFamily="Pretendard, sans-serif" fontSize="9" fill="#FDFAF5" opacity="0.6">의암호반</text>
          </svg>
        </div>
      </div>
    </div>
  </section>
);

const venV2 = {
  section: { position: "relative", overflow: "hidden", color: "#FDFAF5", padding: "120px 40px" },
  bg: { position: "absolute", inset: 0, background: "#0E1E2A" },
  gradient: { position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 20%, rgba(212,160,23,0.10) 0%, transparent 50%)" },
  content: { position: "relative", maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" },
  left: {},
  eyebrow: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 20 },
  title: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 4.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 24px" },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#E8C25E", fontWeight: 500 },
  body: { fontFamily: "'Pretendard',sans-serif", fontSize: 17, color: "rgba(253,250,245,0.75)", margin: "0 0 36px", lineHeight: 1.7, maxWidth: 480 },
  address: { paddingLeft: 20, borderLeft: "2px solid #E8C25E", marginBottom: 36 },
  addressLine: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: 22, color: "#FDFAF5" },
  addressLine2: { fontFamily: "'Pretendard',sans-serif", fontSize: 14, color: "rgba(253,250,245,0.65)", marginTop: 4 },
  actions: { display: "flex", gap: 12 },
  btnGold: { background: "#D4A017", color: "#15293A", border: "none", padding: "16px 30px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase" },
  btnGhost: { background: "transparent", color: "#FDFAF5", border: "1.5px solid rgba(253,250,245,0.4)", padding: "16px 26px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase" },
  right: { display: "flex", justifyContent: "center" },
  mapBox: { width: "100%", aspectRatio: "1/1", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(253,250,245,0.12)" },
  mapSvg: { width: "100%", height: "100%", display: "block" },
};
