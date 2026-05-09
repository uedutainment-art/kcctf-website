// MoodCollage.jsx — Belgrade의 "BIG yet cozy" 패턴, 춘천 무드로
// 풀블리드 사진 4개 + 큰 한글 헤드라인 + 이탤릭 영문 부제
const MOODS = [
  { kr: "맑게,",  en: "and deeply",       bg: "linear-gradient(135deg, #6B9BB8 0%, #1F3A4A 100%)", note: "[ 새벽 호수 사진 ]" },
  { kr: "고요히,", en: "and burning",      bg: "linear-gradient(135deg, #460913 0%, #8B1A2B 100%)", note: "[ 밀롱가 플로어 ]" },
  { kr: "가까이,", en: "and infinite",     bg: "linear-gradient(135deg, #15293A 0%, #2A4D5F 100%)", note: "[ 아브라소 클로즈업 ]" },
  { kr: "춘천에서,", en: "for three nights", bg: "linear-gradient(135deg, #D4A017 0%, #8B1A2B 100%)", note: "[ 가을 단풍 ]" },
];

const MoodCollage = () => (
  <section style={moodStyles.section}>
    <div style={moodStyles.head}>
      <h2 style={moodStyles.headTitle}>2026, <em style={moodStyles.italic}>처음이자 가장 깊게.</em></h2>
      <div style={moodStyles.headSub}>호숫가에서 만나는 사흘 밤의 풍경.</div>
    </div>
    <div style={moodStyles.grid}>
      {MOODS.map((m, i) => (
        <div key={i} style={{ ...moodStyles.tile, background: m.bg, gridColumn: i === 0 ? "span 2" : "span 1", aspectRatio: i === 0 ? "16/9" : "4/5" }}>
          <div style={moodStyles.tileNote}>{m.note}</div>
          <div style={moodStyles.tileShadow}/>
          <div style={moodStyles.tileText}>
            <div style={{ ...moodStyles.tileKr, fontSize: i === 0 ? "clamp(56px, 6vw, 96px)" : "clamp(36px, 3.5vw, 56px)" }}>{m.kr}</div>
            <div style={{ ...moodStyles.tileEn, fontSize: i === 0 ? "clamp(28px, 2.6vw, 42px)" : "clamp(18px, 1.6vw, 24px)" }}>{m.en}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const moodStyles = {
  section: { background: "#0F293A", color: "#FDFAF5", padding: "120px 40px" },
  head: { maxWidth: 1440, margin: "0 auto 56px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, alignItems: "end" },
  headTitle: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.1, letterSpacing: "-0.03em", margin: 0, color: "#FDFAF5" },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#E8C25E", fontWeight: 500 },
  headSub: { fontFamily: "'Pretendard',sans-serif", fontSize: 16, color: "rgba(253,250,245,0.6)", letterSpacing: "0.02em", paddingBottom: 12 },
  grid: { maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  tile: { position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: 36, minHeight: 320 },
  tileNote: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "rgba(253,250,245,0.35)", fontSize: 13 },
  tileShadow: { position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(15,41,58,0.6) 100%)" },
  tileText: { position: "relative", display: "flex", flexDirection: "column", gap: 4 },
  tileKr: { fontFamily: "'Noto Serif KR',serif", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", color: "#FDFAF5" },
  tileEn: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 400, color: "rgba(253,250,245,0.85)", lineHeight: 1.1 },
};
