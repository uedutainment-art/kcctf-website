// Nav.jsx — v2 호숫가의 탱고
const Nav = ({ active = "home", onNavigate, dark = true }) => {
  const items = [
    { key: "lineup", kr: "라인업" },
    { key: "schedule", kr: "일정" },
    { key: "venue", kr: "장소" },
    { key: "register", kr: "등록" },
  ];
  const linkColor = dark ? "rgba(253,250,245,0.85)" : "rgba(26,26,26,0.85)";
  const linkActive = dark ? "#FDFAF5" : "#1A1A1A";
  return (
    <nav style={{ ...navV2.bar, background: dark ? "rgba(15,41,58,0.55)" : "rgba(253,250,245,0.85)", backdropFilter: "blur(14px)" }}>
      <div style={navV2.inner}>
        <a href="#" style={navV2.brand} onClick={(e) => { e.preventDefault(); onNavigate?.("home"); }}>
          <img
            src={dark ? "../../assets/logo-official-light.png" : "../../assets/logo-official-dark.png"}
            style={{ height: 56, width: "auto" }}
            alt="춘천국제땅고페스티벌"
          />
        </a>
        <div style={navV2.links}>
          {items.map((it) => (
            <a key={it.key} href="#"
               onClick={(e) => { e.preventDefault(); onNavigate?.(it.key); }}
               style={{ ...navV2.link, color: active === it.key ? linkActive : linkColor }}>
              {it.kr}
            </a>
          ))}
          <button style={navV2.cta} onClick={() => onNavigate?.("register")}>예약하기</button>
        </div>
      </div>
    </nav>
  );
};

const navV2 = {
  bar: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: "1px solid rgba(253,250,245,0.10)" },
  inner: { maxWidth: 1440, margin: "0 auto", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 },
  brand: { display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 },
  links: { display: "flex", alignItems: "center", gap: 36, flexShrink: 0 },
  link: { textDecoration: "none", fontFamily: "'Pretendard',sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: "0.04em", whiteSpace: "nowrap", flexShrink: 0, transition: "color 200ms ease" },
  cta: { background: "#D4A017", color: "#15293A", border: "none", padding: "12px 26px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0, transition: "transform 240ms cubic-bezier(0.22,0.61,0.36,1), box-shadow 240ms" },
};
