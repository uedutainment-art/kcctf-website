// Lessons.jsx — v2 워크샵 섹션
const LESSONS = [
  { day: "10.03 / 금", time: "13:00 — 14:30", title: "왈츠의 호흡", level: "All Levels", maestro: "후아니타 & 까를리또스" },
  { day: "10.03 / 금", time: "15:00 — 16:30", title: "밀롱게로 살리다", level: "Intermediate +", maestro: "사빈 & 페드로" },
  { day: "10.04 / 토", time: "11:00 — 12:30", title: "음악성과 휴지(休止)", level: "All Levels", maestro: "후아니타 & 까를리또스" },
  { day: "10.04 / 토", time: "13:30 — 15:00", title: "끌로즈 아브라소의 역학", level: "Intermediate +", maestro: "강민지 & 박재훈" },
  { day: "10.05 / 일", time: "11:00 — 12:30", title: "디 사를리의 색", level: "Advanced", maestro: "사빈 & 페드로" },
  { day: "10.05 / 일", time: "13:30 — 15:00", title: "콘트라템포의 즐거움", level: "All Levels", maestro: "강민지 & 박재훈" },
];

const Lessons = () => (
  <section style={lessV2.section}>
    <div style={lessV2.bgGlow}/>
    <div style={lessV2.head}>
      <div style={lessV2.eyebrow}>워크샵</div>
      <h2 style={lessV2.title}>여섯 번의 수업, <em style={lessV2.italic}>한 호흡으로.</em></h2>
      <p style={lessV2.lede}>모든 워크샵은 사전 등록제. 레벨에 따라 자리가 빠르게 마감됩니다.</p>
    </div>
    <div style={lessV2.list}>
      {LESSONS.map((l, i) => (
        <article key={i} style={lessV2.row}>
          <div style={lessV2.col1}>
            <div style={lessV2.day}>{l.day}</div>
            <div style={lessV2.time}>{l.time}</div>
          </div>
          <div style={lessV2.col2}>
            <div style={lessV2.lessonTitle}>{l.title}</div>
            <div style={lessV2.maestro}>{l.maestro}</div>
          </div>
          <div style={lessV2.col3}>
            <div style={lessV2.levelPill}>{l.level}</div>
          </div>
          <button style={lessV2.colBtn}>예약 →</button>
        </article>
      ))}
    </div>
  </section>
);

const lessV2 = {
  section: { position: "relative", background: "#15293A", color: "#FDFAF5", padding: "120px 40px", overflow: "hidden" },
  bgGlow: { position: "absolute", top: "-20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(232,194,94,0.08) 0%, transparent 70%)", pointerEvents: "none" },
  head: { position: "relative", maxWidth: 1440, margin: "0 auto 56px" },
  eyebrow: { fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.32em", color: "#E8C25E", textTransform: "uppercase", marginBottom: 20 },
  title: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 16px" },
  italic: { fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#E8C25E", fontWeight: 500 },
  lede: { fontFamily: "'Pretendard',sans-serif", fontSize: 16, color: "rgba(253,250,245,0.6)", margin: 0, lineHeight: 1.6 },
  list: { position: "relative", maxWidth: 1440, margin: "0 auto", display: "flex", flexDirection: "column" },
  row: { display: "grid", gridTemplateColumns: "200px 1fr 160px 140px", gap: 24, alignItems: "center", padding: "28px 0", borderTop: "1px solid rgba(253,250,245,0.12)" },
  col1: { display: "flex", flexDirection: "column", gap: 4 },
  day: { fontFamily: "'Pretendard',sans-serif", fontSize: 13, color: "#E8C25E", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 },
  time: { fontFamily: "'Pretendard',sans-serif", fontSize: 14, color: "rgba(253,250,245,0.7)", fontVariantNumeric: "tabular-nums" },
  col2: { display: "flex", flexDirection: "column", gap: 6 },
  lessonTitle: { fontFamily: "'Noto Serif KR',serif", fontWeight: 700, fontSize: 24, color: "#FDFAF5", letterSpacing: "-0.02em" },
  maestro: { fontFamily: "'Pretendard',sans-serif", fontSize: 14, color: "rgba(253,250,245,0.6)" },
  col3: { display: "flex", justifyContent: "flex-start" },
  levelPill: { display: "inline-flex", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(253,250,245,0.25)", fontFamily: "'Pretendard',sans-serif", fontSize: 11, letterSpacing: "0.18em", color: "rgba(253,250,245,0.85)", textTransform: "uppercase", fontWeight: 600 },
  colBtn: { background: "transparent", color: "#FDFAF5", border: "1px solid rgba(253,250,245,0.35)", padding: "12px 20px", borderRadius: 999, fontFamily: "'Pretendard',sans-serif", fontWeight: 600, fontSize: 12, cursor: "pointer", letterSpacing: "0.22em", textTransform: "uppercase", whiteSpace: "nowrap", justifySelf: "end" },
};
