// MoodMakers.jsx — DJ 풀블리드 카드 그리드 (실제 라인업)
const DJS = [
  { kr: "DJ Hagoon",  en: "DJ Hagoon",        origin: "Korea",     img: "../../assets/dj-hagoon.jpg" },
  { kr: "DJ Stone",   en: "DJ Stone",         origin: "Korea",     img: "../../assets/dj-stone.jpg" },
  { kr: "DJ Carlos",  en: "DJ Carlos",        origin: "Korea",     img: "../../assets/dj-carlos.jpg" },
  { kr: "DJ Becca",   en: "DJ Becca",         origin: "Korea",     img: "../../assets/dj-becca.jpg" },
  { kr: "DJ Wang Wei",en: "DJ Wang Wei",      origin: "China",     img: "../../assets/dj-wangwei.jpg" },
  { kr: "DJ Natalie", en: "DJ Natalie Cheng", origin: "Hong Kong", img: "../../assets/dj-natalie.jpg" },
];

const MoodMakers = () => (
  <section style={mmStyles.section}>
    <div style={mmStyles.head}>
      <div style={mmStyles.eyebrow}>밀롱가 디제이</div>
      <h2 style={mmStyles.title}>밤을 만드는 사람들, <em style={mmStyles.italic}>여섯 명.</em></h2>
      <p style={mmStyles.lede}>밀롱가의 흐름은 디제이의 손끝에서 시작됩니다. 한국·중국·홍콩에서 초청된 큐레이터들.</p>
    </div>
    <div style={mmStyles.grid}>
      {DJS.map((d) => (
        <article key={d.kr} style={mmStyles.card}>
          <div style={{ ...mmStyles.photo, backgroundImage: `url(${d.img})` }}/>
          <div style={mmStyles.shadow}/>
          {/* Decorative vinyl mark */}
          <svg style={mmStyles.vinyl} viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" fill="none" stroke="#FDFAF5" strokeOpacity="0.18" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#FDFAF5" strokeOpacity="0.18" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="18" fill="none" stroke="#FDFAF5" strokeOpacity="0.18" strokeWidth="0.5"/>
            <circle cx="40" cy="40" r="6" fill="#E8C25E" fillOpacity="0.7"/>
          </svg>
          <div style={mmStyles.content}>
            <div style={mmStyles.kr}>{d.kr}</div>
            <div style={mmStyles.origin}>{d.origin}</div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const mmStyles = {
  section: { background: "#0E1E2A", color: "#FDFAF5", padding: "120px 40px" },
  head: { maxWidth: 1440, margin: "0 auto 48px" },
  eyebrow: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 20 },
  title: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px" },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#E8C25E", fontWeight: 500 },
  lede: { fontFamily: "'Pretendard',sans-serif", fontSize: 16, color: "rgba(253,250,245,0.65)", margin: 0, lineHeight: 1.6 },
  grid: { maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  card: { position: "relative", aspectRatio: "3/4", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 28 },
  photo: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center top", filter: "saturate(0.85) contrast(1.05)" },
  shadow: { position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,41,58,0.10) 0%, rgba(15,41,58,0.45) 55%, rgba(0,0,0,0.85) 100%)" },
  vinyl: { position: "absolute", top: 22, right: 22, width: 60, height: 60, opacity: 0.85 },
  content: { position: "relative", display: "flex", flexDirection: "column", gap: 6 },
  kr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.02em" },
  origin: { fontFamily: "'Pretendard',sans-serif", fontSize: 11, color: "#E8C25E", letterSpacing: "0.32em", textTransform: "uppercase", marginTop: 4, fontWeight: 600 },
};
