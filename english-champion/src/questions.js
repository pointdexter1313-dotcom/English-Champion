import { useState, useEffect, useRef } from "react";

// ============================================================
// THAI COLOR PALETTE
// ============================================================
const C = {
  gold: "#C9A84C", goldLight: "#E8C96D", goldDark: "#8B6914",
  crimson: "#8B1A1A", emerald: "#1A5C38", sapphire: "#1A2E6B",
  ivory: "#FAF3E0", ivoryDark: "#F0E6C8",
  inkDark: "#1A1208", inkMid: "#2D2010",
  glow: "rgba(201,168,76,0.35)",
};

const neu = {
  card: { background: C.ivory, borderRadius: 24, boxShadow: `6px 6px 16px rgba(0,0,0,0.18), -4px -4px 12px rgba(255,255,255,0.85)`, border: `1px solid rgba(201,168,76,0.2)` },
  button: { background: `linear-gradient(145deg, ${C.goldLight}, ${C.gold})`, borderRadius: 16, boxShadow: `4px 4px 12px rgba(0,0,0,0.25), -2px -2px 8px rgba(255,255,255,0.6)`, border: "none", cursor: "pointer", color: C.inkDark, fontWeight: "bold", transition: "all 0.2s" },
  inset: { background: `linear-gradient(145deg, ${C.ivoryDark}, ${C.ivory})`, borderRadius: 14, boxShadow: `inset 3px 3px 8px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(255,255,255,0.8)`, border: `1px solid rgba(201,168,76,0.15)` },
};

const BG = `linear-gradient(160deg, ${C.inkDark} 0%, ${C.inkMid} 60%, #3d2800 100%)`;

const LaiThai = () => (
  <svg width="0" height="0" style={{position:"absolute"}}>
    <defs>
      <pattern id="lt" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M40 5 L75 40 L40 75 L5 40 Z" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1"/>
        <circle cx="40" cy="40" r="12" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1"/>
        <circle cx="40" cy="5" r="3" fill="rgba(201,168,76,0.07)"/>
        <circle cx="75" cy="40" r="3" fill="rgba(201,168,76,0.07)"/>
        <circle cx="40" cy="75" r="3" fill="rgba(201,168,76,0.07)"/>
        <circle cx="5" cy="40" r="3" fill="rgba(201,168,76,0.07)"/>
      </pattern>
    </defs>
  </svg>
);

const partsOfSpeech = [
  { id: "noun", name: "Noun", thai: "คำนาม", color: "#C9A84C", emoji: "🧍", desc: "Names things, people, places, ideas", descTh: "ชื่อคน สัตว์ สิ่งของ สถานที่", examples: ["dog 🐕", "school 🏫", "Bangkok 🌆", "idea 💡"] },
  { id: "pronoun", name: "Pronoun", thai: "คำสรรพนาม", color: "#C97BA8", emoji: "👤", desc: "Replaces a noun", descTh: "ใช้แทนคำนาม", examples: ["I", "he", "she", "they", "mine"] },
  { id: "adjective", name: "Adjective", thai: "คำคุณศัพท์", color: "#9C6BC9", emoji: "🌟", desc: "Describes a noun", descTh: "ขยายคำนาม", examples: ["pretty 🌸", "big 🐘", "cold 🧊", "happy 😊"] },
  { id: "verb", name: "Verb", thai: "คำกริยา", color: "#4CAF50", emoji: "⚡", desc: "Shows actions", descTh: "แสดงการกระทำ", examples: ["run 🏃", "eat 🍜", "play ⚽", "swim 🏊"] },
  { id: "adverb", name: "Adverb", thai: "คำวิเศษณ์", color: "#2196F3", emoji: "💨", desc: "Describes verbs", descTh: "ขยายคำกริยา", examples: ["quickly ⚡", "softly 🌸", "well ✅", "always ♾️"] },
  { id: "preposition", name: "Preposition", thai: "คำบุพบท", color: "#FF9800", emoji: "📍", desc: "Shows relationship", descTh: "แสดงความสัมพันธ์", examples: ["in 📦", "on 🔝", "under 👇", "between ↔️"] },
  { id: "conjunction", name: "Conjunction", thai: "คำสันธาน", color: "#F44336", emoji: "🔗", desc: "Connects sentences", descTh: "เชื่อมประโยค", examples: ["and", "but", "because", "while"] },
  { id: "interjection", name: "Interjection", thai: "คำอุทาน", color: "#E91E63", emoji: "😲", desc: "Expresses emotion", descTh: "แสดงความรู้สึก", examples: ["Wow! 😮", "Oops! 😅", "Yay! 🎉", "Oh no! 😱"] },
];

const worksheets = [
  {
    id: "match", title: "Word Sort", titleTh: "จัดประเภทคำ", icon: "🔀",
    instructions: "Drag each word to its correct category",
    instructionsTh: "ลากแต่ละคำไปยังประเภทที่ถูกต้อง",
    words: [
      { word: "beautiful", answer: "adjective" },
      { word: "quickly", answer: "adverb" },
      { word: "Bangkok", answer: "noun" },
      { word: "run", answer: "verb" },
      { word: "she", answer: "pronoun" },
      { word: "and", answer: "conjunction" },
      { word: "Wow!", answer: "interjection" },
      { word: "under", answer: "preposition" },
    ]
  },
  {
    id: "fill", title: "Fill in the Blank", titleTh: "เติมคำในช่องว่าง", icon: "✏️",
    questions: [
      { sentence: "The _____ dog ran quickly.", blank: "big", options: ["big", "run", "quickly", "and"], hint: "What describes the dog?", hintTh: "อะไรขยายหมา?" },
      { sentence: "She _____ to school every day.", blank: "walks", options: ["beautiful", "walks", "under", "wow"], hint: "What action does she do?", hintTh: "เธอทำอะไร?" },
      { sentence: "The cat sat _____ the table.", blank: "under", options: ["quickly", "big", "under", "and"], hint: "Where is the cat?", hintTh: "แมวอยู่ที่ไหน?" },
      { sentence: "Tom _____ Sara are best friends.", blank: "and", options: ["but", "and", "wow", "she"], hint: "Which word connects two names?", hintTh: "คำไหนเชื่อมสองชื่อ?" },
    ]
  },
  {
    id: "mcq", title: "Multiple Choice", titleTh: "คำถามหลายตัวเลือก", icon: "🎯",
    questions: [
      { q: "The BEAUTIFUL garden had many flowers.\n'beautiful' is a:", qTh: "'beautiful' เป็นคำชนิดใด?", options: ["Noun คำนาม", "Verb คำกริยา", "Adjective คำคุณศัพท์", "Adverb คำวิเศษณ์"], answer: 2 },
      { q: "She runs QUICKLY to school.\n'quickly' is a:", qTh: "'quickly' เป็นคำชนิดใด?", options: ["Adjective คำคุณศัพท์", "Adverb คำวิเศษณ์", "Noun คำนาม", "Verb คำกริยา"], answer: 1 },
      { q: "WOW! That was amazing!\n'Wow' is a:", qTh: "'Wow' เป็นคำชนิดใด?", options: ["Conjunction คำสันธาน", "Preposition คำบุพบท", "Interjection คำอุทาน", "Pronoun คำสรรพนาม"], answer: 2 },
      { q: "He gave the book TO her.\n'to' is a:", qTh: "'to' เป็นคำชนิดใด?", options: ["Verb คำกริยา", "Preposition คำบุพบท", "Conjunction คำสันธาน", "Adverb คำวิเศษณ์"], answer: 1 },
    ]
  }
];

export default function Pass3Worksheets({ onComplete, addXP }) {
  const [activeSheet, setActiveSheet] = useState(0);
  const [sheetsDone, setSheetsDone] = useState(new Set());
  const [wordAnswers, setWordAnswers] = useState({});
  const [fillAnswers, setFillAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState({});

  const sheet = worksheets[activeSheet];

  const completeSheet = (idx) => {
    setSheetsDone(prev => new Set([...prev, idx]));
    addXP(50);
  };

  const handleWordDrop = (word, category) => {
    setWordAnswers(prev => ({ ...prev, [word]: category }));
    const correct = worksheets[0].words.find(w => w.word === word)?.answer;
    if (category === correct && !wordAnswers[word]) {
      addXP(10);
    }
  };

  const wordSortComplete = worksheets[0].words.every(w => wordAnswers[w.word] === w.answer);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", background: BG, minHeight: "100vh", padding: "2rem 1rem", color: "#fff" }}>
      <LaiThai />
      <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "0.3rem 1rem", color: C.goldLight, fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          Extra Practice Worksheets
        </div>
      </div>

      {/* Sheet Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
        {worksheets.map((ws, i) => (
          <button key={i} onClick={() => setActiveSheet(i)} style={{
            flex: 1, minWidth: 120, padding: "0.6rem",
            background: activeSheet === i ? `linear-gradient(145deg, ${C.goldLight}, ${C.gold})` : C.ivory,
            border: `2px solid ${activeSheet === i ? C.gold : "rgba(201,168,76,0.2)"}`,
            borderRadius: 12, cursor: "pointer",
            fontFamily: "Georgia, serif", fontSize: "0.78rem",
            color: activeSheet === i ? C.inkDark : C.goldDark,
            fontWeight: activeSheet === i ? "bold" : "normal",
            boxShadow: activeSheet === i ? `2px 2px 8px rgba(0,0,0,0.2)` : `3px 3px 8px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,0.8)`,
            position: "relative"
          }}>
            {sheetsDone.has(i) && <span style={{ position: "absolute", top: -4, right: -4, fontSize: "0.7rem" }}>✅</span>}
            {ws.icon} {ws.title}
          </button>
        ))}
      </div>

      {/* WORKSHEET 1: Word Sort */}
      {activeSheet === 0 && (
        <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative" }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.2rem" }}>{sheet.instructions}</div>
              <div style={{ color: C.goldDark, fontSize: "0.8rem", fontStyle: "italic" }}>{sheet.instructionsTh}</div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem", padding: "0.8rem", background: "rgba(201,168,76,0.06)", borderRadius: 12 }}>
              {worksheets[0].words.filter(w => !wordAnswers[w.word]).map(w => (
                <div key={w.word} style={{ padding: "0.4rem 0.9rem", background: C.ivory, borderRadius: 20, border: `1px solid ${C.gold}`, fontSize: "0.85rem", fontWeight: "bold", color: C.inkDark, cursor: "pointer" }}>{w.word}</div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.6rem" }}>
              {["noun", "verb", "adjective", "adverb"].map(cat => {
                const pos = partsOfSpeech.find(p => p.id === cat);
                const placed = worksheets[0].words.filter(w => wordAnswers[w.word] === cat);
                return (
                  <div key={cat} style={{ minHeight: 80, padding: "0.6rem", background: `${pos.color}11`, border: `2px dashed ${pos.color}55`, borderRadius: 12 }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: "bold", color: pos.color, marginBottom: "0.4rem" }}>{pos.emoji} {pos.name}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {placed.map(w => (
                        <div key={w.word} style={{ padding: "0.2rem 0.6rem", background: `${C.emerald}22`, borderRadius: 12, fontSize: "0.75rem", color: C.emerald, fontWeight: "bold" }}>{w.word} ✅</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                {worksheets[0].words.filter(w => !wordAnswers[w.word]).slice(0, 3).map(w => (
                  <button key={w.word} onClick={() => handleWordDrop(w.word, w.answer)} style={{ ...neu.button, padding: "0.4rem 0.9rem", fontSize: "0.75rem" }}>Place "{w.word}"</button>
                ))}
              </div>
            </div>

            {wordSortComplete && !sheetsDone.has(0) && (
              <button onClick={() => completeSheet(0)} style={{ ...neu.button, width: "100%", padding: "0.8rem", marginTop: "1rem" }}>✅ Complete Word Sort +50 XP</button>
            )}
          </div>
        </div>
      )}

      {/* WORKSHEET 2: Fill in the Blank */}
      {activeSheet === 1 && (
        <div style={{ ...neu.card, padding: "1.5rem" }}>
          {worksheets[1].questions.map((q, qi) => {
            const selected = fillAnswers[qi];
            const correct = selected === q.blank;
            return (
              <div key={qi} style={{ marginBottom: "1.2rem", padding: "1rem", background: "rgba(201,168,76,0.05)", borderRadius: 14 }}>
                <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.3rem" }}>{q.sentence.replace("_____", `[ ${selected || "___"} ]`)}</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                  {q.options.map((opt, oi) => (
                    <button key={oi} onClick={() => {
                      if (!fillAnswers[qi]) {
                        setFillAnswers(prev => ({ ...prev, [qi]: opt }));
                        if (opt === q.blank) addXP(15);
                      }
                    }} style={{ padding: "0.4rem 0.9rem", background: C.ivoryDark, borderRadius: 12, cursor: "pointer", fontWeight: "bold", color: C.inkDark }}>{opt}</button>
                  ))}
                </div>
              </div>
            );
          })}
          {Object.keys(fillAnswers).length === worksheets[1].questions.length && !sheetsDone.has(1) && (
            <button onClick={() => completeSheet(1)} style={{ ...neu.button, width: "100%", padding: "0.8rem" }}>✅ Complete Fill in Blank +50 XP</button>
          )}
        </div>
      )}

      {/* WORKSHEET 3: MCQ */}
      {activeSheet === 2 && (
        <div style={{ ...neu.card, padding: "1.5rem" }}>
          {worksheets[2].questions.map((q, qi) => {
            const selected = mcqAnswers[qi];
            const submitted = mcqSubmitted[qi];
            return (
              <div key={qi} style={{ marginBottom: "1.2rem", padding: "1rem", background: "rgba(201,168,76,0.04)", borderRadius: 14 }}>
                <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.9rem" }}>Q{qi + 1}. {q.q}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.7rem" }}>
                  {q.options.map((opt, oi) => {
                    let bg = C.ivoryDark;
                    if (selected === oi) bg = `${C.gold}55`;
                    if (submitted && oi === q.answer) bg = `${C.emerald}44`;
                    return (
                      <button key={oi} onClick={() => setMcqAnswers(prev => ({ ...prev, [qi]: oi }))} style={{ padding: "0.5rem", background: bg, borderRadius: 10, cursor: "pointer", color: C.inkDark }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!submitted && selected !== undefined && (
                  <button onClick={() => {
                    setMcqSubmitted(prev => ({ ...prev, [qi]: true }));
                    if (selected === q.answer) addXP(20);
                  }} style={{ ...neu.button, marginTop: "0.5rem", padding: "0.3rem 1rem", fontSize: "0.8rem" }}>Submit Answer</button>
                )}
              </div>
            );
          })}
          {Object.keys(mcqSubmitted).length === worksheets[2].questions.length && !sheetsDone.has(2) && (
            <button onClick={() => completeSheet(2)} style={{ ...neu.button, width: "100%", padding: "0.8rem" }}>✅ Complete MCQ +50 XP</button>
          )}
        </div>
      )}

      {sheetsDone.size === worksheets.length && (
        <button onClick={onComplete} style={{ ...neu.button, width: "100%", padding: "1rem", marginTop: "1.5rem", fontSize: "1.1rem" }}>
          Finish Module 🎉
        </button>
      )}
    </div>
  );
}
