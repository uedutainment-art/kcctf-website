// Footer.jsx — v2
const Footer = () => (
  <footer style={ftV2.section}>
    <div style={ftV2.inner}>
      <div style={ftV2.top}>
        <div style={ftV2.brandCol}>
          <img src="../../assets/logo-official-light.png" style={{ height: 64, width: "auto", marginBottom: 20 }} alt="춘천국제땅고페스티벌"/>
          <div style={ftV2.tagline}>호숫가에서, 사흘 밤.</div>
          <div style={ftV2.taglineEn}><em>By the lake. For three nights.</em></div>
        </div>

        <div style={ftV2.linksCol}>
          <div style={ftV2.colTitle}>축제</div>
          <a style={ftV2.link}>라인업</a>
          <a style={ftV2.link}>일정</a>
          <a style={ftV2.link}>워크샵</a>
          <a style={ftV2.link}>장소</a>
        </div>

        <div style={ftV2.linksCol}>
          <div style={ftV2.colTitle}>등록</div>
          <a style={ftV2.link}>티켓</a>
          <a style={ftV2.link}>숙소</a>
          <a style={ftV2.link}>FAQ</a>
          <a style={ftV2.link}>문의</a>
        </div>

        <div style={ftV2.linksCol}>
          <div style={ftV2.colTitle}>팔로우</div>
          <a style={ftV2.link}>인스타그램</a>
          <a style={ftV2.link}>유튜브</a>
          <a style={ftV2.link}>네이버 카페</a>
          <a style={ftV2.link}>뉴스레터</a>
        </div>
      </div>

      <div style={ftV2.bottom}>
        <div style={ftV2.copyright}>© 2026 춘천국제땅고페스티벌. All rights reserved.</div>
        <div style={ftV2.fineprint}>주최 강원땅고협회 · 후원 춘천시</div>
      </div>
    </div>
  </footer>
);

const ftV2 = {
  section: { background: "#0E1E2A", color: "#FDFAF5", padding: "80px 40px 32px" },
  inner: { maxWidth: 1440, margin: "0 auto" },
  top: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 56, borderBottom: "1px solid rgba(253,250,245,0.10)" },
  brandCol: {},
  tagline: { fontFamily: "'Noto Serif KR',serif", fontWeight: 600, fontSize: 18, color: "#FDFAF5", marginBottom: 6 },
  taglineEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 16, color: "rgba(253,250,245,0.6)" },
  linksCol: { display: "flex", flexDirection: "column", gap: 14 },
  colTitle: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.22em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 6 },
  link: { fontFamily: "'Pretendard',sans-serif", fontSize: 14, color: "rgba(253,250,245,0.75)", textDecoration: "none", cursor: "pointer" },
  bottom: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, flexWrap: "wrap", gap: 12 },
  copyright: { fontFamily: "'Pretendard',sans-serif", fontSize: 12, color: "rgba(253,250,245,0.5)" },
  fineprint: { fontFamily: "'Pretendard',sans-serif", fontSize: 12, color: "rgba(253,250,245,0.5)" },
};
