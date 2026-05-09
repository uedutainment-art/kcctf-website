// Hero.jsx — v2 풀블리드 호수 + 큰 한글 헤드라인
const Hero = ({ onRegister }) => (
  <section style={heroV2.section}>
    <div style={heroV2.bg}/>
    <div style={heroV2.gradient}/>

    {/* Floating leaf marks — Chuncheon's lakeside autumn */}
    <svg style={heroV2.leaf1} viewBox="0 0 40 40">
      <path d="M20 4 C28 12, 32 22, 20 36 C8 22, 12 12, 20 4 Z" fill="#D4A017" opacity="0.7"/>
      <line x1="20" y1="4" x2="20" y2="36" stroke="#460913" strokeWidth="0.8" opacity="0.6"/>
    </svg>
    <svg style={heroV2.leaf2} viewBox="0 0 40 40">
      <path d="M20 4 C28 12, 32 22, 20 36 C8 22, 12 12, 20 4 Z" fill="#8B1A2B" opacity="0.55"/>
      <line x1="20" y1="4" x2="20" y2="36" stroke="#FDFAF5" strokeWidth="0.6" opacity="0.4"/>
    </svg>
    <svg style={heroV2.leaf3} viewBox="0 0 40 40">
      <path d="M20 4 C28 12, 32 22, 20 36 C8 22, 12 12, 20 4 Z" fill="#E8C25E" opacity="0.6"/>
    </svg>

    <div style={heroV2.content}>
      <div style={heroV2.dateLine}>2026.10.03 — 10.05 · 제3회</div>
      <h1 style={heroV2.titleKr}>춘천국제<br/>땅고페스티벌</h1>
      <div style={heroV2.subEn}><em>And so we begin —</em> by the lake.</div>
      <p style={heroV2.tagline}>호숫가에서 사흘 밤. 부에노스 아이레스가 춘천에 머무는 시간.</p>
      <div style={heroV2.actions}>
        <button style={heroV2.btnGold} onClick={onRegister}>예약하기 →</button>
        <button style={heroV2.btnGhost}>2025년 다시 보기</button>
      </div>
    </div>

    <div style={heroV2.scrollHint}>
      <div style={heroV2.scrollLine}/>
      <div style={heroV2.scrollText}>아래로</div>
    </div>
  </section>
);

const heroV2 = {
  section: { position: "relative", minHeight: "100vh", overflow: "hidden", color: "#FDFAF5", display: "flex", alignItems: "center" },
  bg: { position: "absolute", inset: 0, backgroundImage: "url(./assets/placeholder-lake.svg)", backgroundSize: "cover", backgroundPosition: "center" },
  gradient: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,41,58,0.65) 0%, rgba(15,41,58,0.35) 40%, rgba(15,41,58,0.55) 75%, rgba(15,41,58,0.85) 100%)" },
  content: { position: "relative", maxWidth: 1440, margin: "0 auto", padding: "180px 40px 140px", width: "100%" },
  dateLine: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 36 },
  titleKr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 800, fontSize: "clamp(64px, 9vw, 132px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#FDFAF5", margin: 0, maxWidth: 1100 },
  subEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(28px, 3.5vw, 44px)", lineHeight: 1.3, color: "rgba(253,250,245,0.8)", marginTop: 28, marginBottom: 28 },
  tagline: { fontFamily: "'Pretendard',sans-serif", fontSize: 17, lineHeight: 1.7, color: "rgba(253,250,245,0.75)", maxWidth: 480, textWrap: "pretty", margin: 0 },
  actions: { display: "flex", gap: 16, alignItems: "center", marginTop: 44, flexWrap: "wrap" },
  btnGold: { background: "#D4A017", color: "#15293A", border: "none", padding: "18px 36px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" },
  btnGhost: { background: "transparent", color: "#FDFAF5", border: "1.5px solid rgba(253,250,245,0.4)", padding: "18px 32px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap" },
  leaf1: { position: "absolute", top: "18%", right: "12%", width: 36, height: 36, transform: "rotate(28deg)", animation: "drift 12s ease-in-out infinite" },
  leaf2: { position: "absolute", top: "62%", right: "8%", width: 28, height: 28, transform: "rotate(-18deg)", animation: "drift 14s ease-in-out infinite reverse" },
  leaf3: { position: "absolute", top: "38%", left: "78%", width: 24, height: 24, transform: "rotate(45deg)", animation: "drift 10s ease-in-out infinite" },
  scrollHint: { position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  scrollLine: { width: 1, height: 48, background: "linear-gradient(180deg, transparent 0%, #E8C25E 100%)" },
  scrollText: { fontFamily: "'Pretendard',sans-serif", fontSize: 11, letterSpacing: "0.32em", color: "rgba(253,250,245,0.55)", textTransform: "uppercase" },
};
