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

// ============================================================
// PARTS OF SPEECH DATA
// ============================================================
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

// ============================================================
// PASS 1: HOOK VIDEO SCREEN
// ============================================================
function Pass1Hook({ onComplete, char }) {
  const [watched, setWatched] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (!watched) {
      const t = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) { clearInterval(t); setWatched(true); return 0; }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [watched]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "0.3rem 1rem", color: C.goldLight, fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          🪝 Pass 1 & 2 — Hook + Kinesthetic
        </div>
        <h2 style={{ color: C.goldLight, fontSize: "1.4rem", margin: 0 }}>Parts of Speech</h2>
        <p style={{ color: C.gold, fontSize: "0.85rem" }}>ชนิดของคำ</p>
      </div>

      {/* Mock video player */}
      <div style={{ ...neu.card, overflow: "hidden", marginBottom: "1.2rem", position: "relative" }}>
        <div style={{
          background: `linear-gradient(135deg, #1a0a00, #3d1a00)`,
          height: 280, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden"
        }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
            <rect width="100%" height="100%" fill="url(#lt)"/>
          </svg>
          <img src="/characters/phra.png" alt="Phra" style={{
            width: 120, height: 120, borderRadius: "50%",
            border: `3px solid ${C.gold}`,
            boxShadow: `0 0 40px ${C.glow}`,
            marginBottom: "1rem", position: "relative"
          }}/>
          <div style={{ color: C.goldLight, fontSize: "1.1rem", fontWeight: "bold", position: "relative" }}>
            🎬 Teacher Introduction Video
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", position: "relative", marginTop: "0.3rem" }}>
            Upload your video here • อัปโหลดวิดีโอของคุณที่นี่
          </div>

          {/* Progress bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "rgba(255,255,255,0.1)" }}>
            <div style={{
              height: "100%",
              width: `${((30 - seconds) / 30) * 100}%`,
              background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
              transition: "width 1s linear"
            }}/>
          </div>
        </div>

        <div style={{ padding: "1rem 1.5rem", background: C.ivory }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.85rem", color: C.goldDark }}>
              {watched ? "✅ Video complete!" : `⏱️ Watch to unlock: ${seconds}s remaining`}
            </div>
            <div style={{
              background: watched ? C.emerald : "rgba(0,0,0,0.1)",
              borderRadius: 20, padding: "0.2rem 0.8rem",
              color: watched ? "#fff" : "rgba(0,0,0,0.3)",
              fontSize: "0.75rem", fontWeight: "bold",
              transition: "all 0.3s"
            }}>
              {watched ? "🔓 Unlocked!" : "🔒 Locked"}
            </div>
          </div>
        </div>
      </div>

      {/* Hook question */}
      <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>🤔</div>
          <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.3rem", fontSize: "0.95rem" }}>
            Hook Question: Every English word is secretly one of only 8 types. Can you name any?
          </div>
          <div style={{ color: C.goldDark, fontSize: "0.82rem", fontStyle: "italic" }}>
            คำถาม: ทุกคำในภาษาอังกฤษมีแค่ 8 ประเภท คุณรู้จักประเภทไหนบ้าง?
          </div>
        </div>
      </div>

      {/* TPR Activity — Pass 2 */}
      <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🏃</span>
            <div>
              <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.95rem" }}>Pass 2: Kinesthetic Activity (TPR)</div>
              <div style={{ color: C.goldDark, fontSize: "0.78rem" }}>กิจกรรมร่างกาย</div>
            </div>
          </div>
          {[
            { action: "Stand up! 🧍", th: "ลุกขึ้นยืน!", desc: "When you hear a NOUN — sit down" },
            { action: "Clap! 👏", th: "ตบมือ!", desc: "When you hear a VERB — clap once" },
            { action: "Point up! ☝️", th: "ชี้ขึ้น!", desc: "When you hear an ADJECTIVE — point up" },
            { action: "Spin! 🔄", th: "หมุนตัว!", desc: "When you hear an ADVERB — spin around" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "0.8rem",
              padding: "0.6rem 0.8rem", marginBottom: "0.4rem",
              background: "rgba(201,168,76,0.08)", borderRadius: 12,
              border: "1px solid rgba(201,168,76,0.15)"
            }}>
              <div style={{ fontSize: "1.2rem", width: 36, textAlign: "center" }}>{item.action.split(" ")[1]}</div>
              <div>
                <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.82rem" }}>{item.desc}</div>
                <div style={{ color: C.goldDark, fontSize: "0.72rem" }}>{item.action} • {item.th}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onComplete} disabled={!watched} style={{
        ...neu.button, width: "100%", padding: "1rem",
        fontSize: "1rem", fontFamily: "Georgia, serif",
        opacity: watched ? 1 : 0.4,
        cursor: watched ? "pointer" : "not-allowed"
      }}>
        {watched ? "Continue to Lecture → 📖" : `🔒 Watch video first (${seconds}s)`}
      </button>
    </div>
  );
}

// ============================================================
// PASS 2: LECTURE / EXPLAIN
// ============================================================
function Pass2Lecture({ onComplete }) {
  const [activeCard, setActiveCard] = useState(null);
  const [revealed, setRevealed] = useState(new Set());

  const revealCard = (id) => {
    setActiveCard(id);
    setRevealed(prev => new Set([...prev, id]));
  };

  const allRevealed = revealed.size >= partsOfSpeech.length;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "0.3rem 1rem", color: C.goldLight, fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          🧠 Lecture — Concept Breakdown
        </div>
        <h2 style={{ color: C.goldLight, fontSize: "1.4rem", margin: 0 }}>8 Parts of Speech</h2>
        <p style={{ color: C.gold, fontSize: "0.85rem" }}>8 ชนิดของคำ — tap each card to explore!</p>
      </div>

      {/* Grid of part of speech cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.8rem", marginBottom: "1.5rem" }}>
        {partsOfSpeech.map(pos => (
          <div key={pos.id} onClick={() => revealCard(pos.id)} style={{
            background: activeCard === pos.id
              ? `linear-gradient(135deg, ${pos.color}33, ${pos.color}11)`
              : C.ivory,
            borderRadius: 18,
            border: `2px solid ${activeCard === pos.id ? pos.color : "rgba(201,168,76,0.15)"}`,
            padding: "1rem",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: activeCard === pos.id
              ? `0 0 20px ${pos.color}44, 4px 4px 12px rgba(0,0,0,0.15)`
              : `4px 4px 10px rgba(0,0,0,0.12), -2px -2px 8px rgba(255,255,255,0.8)`,
            transform: activeCard === pos.id ? "translateY(-4px)" : "none",
            position: "relative"
          }}>
            {revealed.has(pos.id) && (
              <div style={{ position: "absolute", top: 8, right: 8, fontSize: "0.7rem" }}>✅</div>
            )}
            <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{pos.emoji}</div>
            <div style={{ fontWeight: "bold", color: pos.color, fontSize: "0.9rem" }}>{pos.name}</div>
            <div style={{ color: C.goldDark, fontSize: "0.72rem" }}>{pos.thai}</div>
          </div>
        ))}
      </div>

      {/* Active card detail */}
      {activeCard && (() => {
        const pos = partsOfSpeech.find(p => p.id === activeCard);
        return (
          <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
            </svg>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "2.5rem" }}>{pos.emoji}</div>
                <div>
                  <div style={{ fontWeight: "bold", color: pos.color, fontSize: "1.2rem" }}>{pos.name}</div>
                  <div style={{ color: C.goldDark, fontSize: "0.9rem" }}>{pos.thai}</div>
                </div>
              </div>
              <div style={{ marginBottom: "0.8rem" }}>
                <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{pos.desc}</div>
                <div style={{ color: C.goldDark, fontSize: "0.82rem", fontStyle: "italic" }}>{pos.descTh}</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {pos.examples.map((ex, i) => (
                  <div key={i} style={{
                    background: `${pos.color}22`, border: `1px solid ${pos.color}55`,
                    borderRadius: 20, padding: "0.3rem 0.8rem",
                    color: C.inkDark, fontSize: "0.82rem", fontWeight: "bold"
                  }}>{ex}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      <div style={{ textAlign: "center", marginBottom: "1rem", color: C.goldLight, fontSize: "0.82rem" }}>
        {revealed.size}/{partsOfSpeech.length} explored • {allRevealed ? "All done! ✅" : "Tap all cards to continue"}
      </div>

      <button onClick={onComplete} disabled={!allRevealed} style={{
        ...neu.button, width: "100%", padding: "1rem",
        fontSize: "1rem", fontFamily: "Georgia, serif",
        opacity: allRevealed ? 1 : 0.4,
        cursor: allRevealed ? "pointer" : "not-allowed"
      }}>
        {allRevealed ? "Continue to Worksheets → 📝" : `Explore all ${partsOfSpeech.length} parts first 🔒`}
      </button>
    </div>
  );
}

// ============================================================
// PASS 3: WORKSHEETS
// ============================================================
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
  },
  {
    id: "sprint", title: "⏱️ Exam Sprint", titleTh: "สอบจับเวลา", icon: "🏁",
    timePerQ: 15,
    questions: [
      { q: "DOGS are loyal animals. Part of speech?", options: ["Verb", "Noun", "Adjective", "Adverb"], answer: 1 },
      { q: "She RUNS every morning. Part of speech?", options: ["Noun", "Adjective", "Verb", "Pronoun"], answer: 2 },
      { q: "The SKY is BLUE today. 'blue' is:", options: ["Noun", "Verb", "Adverb", "Adjective"], answer: 3 },
      { q: "He speaks SOFTLY. Part of speech?", options: ["Adjective", "Adverb", "Noun", "Verb"], answer: 1 },
      { q: "Put the book ON the table. 'on' is:", options: ["Verb", "Adverb", "Preposition", "Conjunction"], answer: 2 },
    ]
  }
];

function Pass3Worksheets({ onComplete, addXP }) {
  const [activeSheet, setActiveSheet] = useState(0);
  const [sheetsDone, setSheetsDone] = useState(new Set());
  const [wordAnswers, setWordAnswers] = useState({});
  const [fillAnswers, setFillAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState({});
  const [sprintAnswers, setSprintAnswers] = useState({});
  const [sprintSubmitted, setSprintSubmitted] = useState({});
  const [timeLeft, setTimeLeft] = useState(15);
  const [sprintQ, setSprintQ] = useState(0);
  const [sprintActive, setSprintActive] = useState(false);
  const [sprintDone, setSprintDone] = useState(false);
  const timerRef = useRef(null);

  const sheet = worksheets[activeSheet];

  // Sprint timer
  useEffect(() => {
    if (sprintActive && !sprintDone) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            moveToNextSprintQ();
            return 15;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [sprintActive, sprintQ, sprintDone]);

  const moveToNextSprintQ = () => {
    const sprint = worksheets[3];
    if (sprintQ < sprint.questions.length - 1) {
      setSprintQ(q => q + 1);
      setTimeLeft(15);
    } else {
      setSprintActive(false);
      setSprintDone(true);
      completeSheet(3);
    }
  };

  const completeSheet = (idx) => {
    setSheetsDone(prev => new Set([...prev, idx]));
    addXP(50);
  };

  const allDone = sheetsDone.size >= worksheets.length;

  // Word sort
  const handleWordDrop = (word, category) => {
    setWordAnswers(prev => ({ ...prev, [word]: category }));
    const correct = worksheets[0].words.find(w => w.word === word)?.answer;
    if (category === correct && !wordAnswers[word]) {
      addXP(10);
    }
  };

  const wordSortComplete = worksheets[0].words.every(w => wordAnswers[w.word] === w.answer);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.2rem" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "0.3rem 1rem", color: C.goldLight, fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          📝 Pass 3 — Worksheets
        </div>
      </div>

      {/* Sheet tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
        {worksheets.map((ws, i) => (
          <button key={i} onClick={() => setActiveSheet(i)} style={{
            flex: 1, minWidth: 120, padding: "0.6rem",
            background: activeSheet === i
              ? `linear-gradient(145deg, ${C.goldLight}, ${C.gold})`
              : C.ivory,
            border: `2px solid ${activeSheet === i ? C.gold : "rgba(201,168,76,0.2)"}`,
            borderRadius: 12, cursor: "pointer",
            fontFamily: "Georgia, serif", fontSize: "0.78rem",
            color: activeSheet === i ? C.inkDark : C.goldDark,
            fontWeight: activeSheet === i ? "bold" : "normal",
            boxShadow: activeSheet === i
              ? `2px 2px 8px rgba(0,0,0,0.2)`
              : `3px 3px 8px rgba(0,0,0,0.1), -2px -2px 6px rgba(255,255,255,0.8)`,
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
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.2rem" }}>{sheet.instructions}</div>
              <div style={{ color: C.goldDark, fontSize: "0.8rem", fontStyle: "italic" }}>{sheet.instructionsTh}</div>
            </div>

            {/* Word bank */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem", padding: "0.8rem", background: "rgba(201,168,76,0.06)", borderRadius: 12 }}>
              {worksheets[0].words.filter(w => !wordAnswers[w.word]).map(w => (
                <div key={w.word} style={{
                  padding: "0.4rem 0.9rem", background: C.ivory,
                  borderRadius: 20, border: `1px solid ${C.gold}`,
                  fontSize: "0.85rem", fontWeight: "bold", color: C.inkDark,
                  cursor: "pointer", boxShadow: `2px 2px 6px rgba(0,0,0,0.12)`
                }}>{w.word}</div>
              ))}
              {worksheets[0].words.filter(w => !wordAnswers[w.word]).length === 0 && (
                <div style={{ color: C.goldDark, fontSize: "0.8rem", fontStyle: "italic" }}>All words placed!</div>
              )}
            </div>

            {/* Category boxes */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.6rem" }}>
              {["noun", "verb", "adjective", "adverb"].map(cat => {
                const pos = partsOfSpeech.find(p => p.id === cat);
                const placed = worksheets[0].words.filter(w => wordAnswers[w.word] === cat);
                return (
                  <div key={cat} style={{
                    minHeight: 80, padding: "0.6rem",
                    background: `${pos.color}11`,
                    border: `2px dashed ${pos.color}55`,
                    borderRadius: 12
                  }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: "bold", color: pos.color, marginBottom: "0.4rem" }}>
                      {pos.emoji} {pos.name} • {pos.thai}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {placed.map(w => {
                        const correct = worksheets[0].words.find(wd => wd.word === w.word)?.answer === cat;
                        return (
                          <div key={w.word} style={{
                            padding: "0.2rem 0.6rem",
                            background: correct ? `${C.emerald}22` : "#fee",
                            border: `1px solid ${correct ? C.emerald : "#f44"}`,
                            borderRadius: 12, fontSize: "0.75rem",
                            color: correct ? C.emerald : C.crimson,
                            fontWeight: "bold"
                          }}>{w.word} {correct ? "✅" : "❌"}</div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick place buttons for demo */}
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: C.goldDark, marginBottom: "0.5rem" }}>
                Tap a word above, then tap its category:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                {worksheets[0].words.filter(w => !wordAnswers[w.word]).slice(0, 3).map(w => (
                  <button key={w.word} onClick={() => handleWordDrop(w.word, w.answer)} style={{
                    ...neu.button, padding: "0.4rem 0.9rem", fontSize: "0.75rem",
                    fontFamily: "Georgia, serif"
                  }}>Place "{w.word}"</button>
                ))}
              </div>
            </div>

            {wordSortComplete && !sheetsDone.has(0) && (
              <button onClick={() => completeSheet(0)} style={{
                ...neu.button, width: "100%", padding: "0.8rem",
                marginTop: "1rem", fontFamily: "Georgia, serif"
              }}>✅ Complete Word Sort +50 XP</button>
            )}
          </div>
        </div>
      )}

      {/* WORKSHEET 2: Fill in the blank */}
      {activeSheet === 1 && (
        <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            {worksheets[1].questions.map((q, qi) => {
              const selected = fillAnswers[qi];
              const correct = selected === q.blank;
              return (
                <div key={qi} style={{
                  marginBottom: "1.2rem", padding: "1rem",
                  background: selected ? (correct ? "rgba(26,92,56,0.08)" : "rgba(139,26,26,0.08)") : "rgba(201,168,76,0.05)",
                  borderRadius: 14, border: `1px solid ${selected ? (correct ? C.emerald : C.crimson) : "rgba(201,168,76,0.2)"}`
                }}>
                  <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.3rem", fontSize: "0.9rem" }}>
                    {q.sentence.replace("_____", `[ ${selected || "___"} ]`)}
                  </div>
                  <div style={{ color: C.goldDark, fontSize: "0.75rem", marginBottom: "0.7rem", fontStyle: "italic" }}>
                    💡 {q.hint} • {q.hintTh}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {q.options.map((opt, oi) => (
                      <button key={oi} onClick={() => {
                        if (!fillAnswers[qi]) {
                          setFillAnswers(prev => ({ ...prev, [qi]: opt }));
                          if (opt === q.blank) addXP(15);
                        }
                      }} style={{
                        padding: "0.4rem 0.9rem",
                        background: fillAnswers[qi] === opt
                          ? (opt === q.blank ? `${C.emerald}33` : "#fee")
                          : C.ivoryDark,
                        border: `1px solid ${fillAnswers[qi] === opt ? (opt === q.blank ? C.emerald : C.crimson) : "rgba(201,168,76,0.2)"}`,
                        borderRadius: 12, cursor: fillAnswers[qi] ? "default" : "pointer",
                        fontSize: "0.82rem", fontWeight: "bold",
                        color: fillAnswers[qi] === opt ? (opt === q.blank ? C.emerald : C.crimson) : C.inkDark,
                        fontFamily: "Georgia, serif"
                      }}>{opt}</button>
                    ))}
                  </div>
                </div>
              );
            })}

            {Object.keys(fillAnswers).length === worksheets[1].questions.length && !sheetsDone.has(1) && (
              <button onClick={() => completeSheet(1)} style={{
                ...neu.button, width: "100%", padding: "0.8rem",
                fontFamily: "Georgia, serif"
              }}>✅ Complete Fill in Blank +50 XP</button>
            )}
          </div>
        </div>
      )}

      {/* WORKSHEET 3: MCQ */}
      {activeSheet === 2 && (
        <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            {worksheets[2].questions.map((q, qi) => {
              const selected = mcqAnswers[qi];
              const submitted = mcqSubmitted[qi];
              return (
                <div key={qi} style={{
                  marginBottom: "1.2rem", padding: "1rem",
                  background: "rgba(201,168,76,0.04)", borderRadius: 14,
                  border: "1px solid rgba(201,168,76,0.15)"
                }}>
                  <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.9rem", marginBottom: "0.3rem", whiteSpace: "pre-line" }}>
                    Q{qi + 1}. {q.q}
                  </div>
                  <div style={{ color: C.goldDark, fontSize: "0.75rem", marginBottom: "0.7rem", fontStyle: "italic" }}>{q.qTh}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.7rem" }}>
                    {q.options.map((opt, oi) => {
                      let bg = C.ivoryDark, border = "rgba(201,168,76,0.15)", color = C.inkDark;
                      if (selected === oi && !submitted) { bg = `${C.gold}33`; border = C.gold; }
                      if (submitted && oi === q.answer) { bg = `${C.emerald}22`; border = C.emerald; color = C.emerald; }
                      if (submitted && selected === oi && oi !== q.answer) { bg = "#fee"; border = C.crimson; color = C.crimson; }
                      return (
                        <button key={oi} onClick={() => !submitted && setMcqAnswers(prev => ({ ...prev, [qi]: oi }))} style={{
                          padding: "0.6rem 0.8rem", background: bg,
                          border: `1px solid ${border}`, borderRadius: 10,
                          cursor: submitted ? "default" : "pointer",
                          fontSize: "0.78rem", color, textAlign: "left",
                          fontFamily: "Georgia, serif"
                        }}>
                          <span style={{ opacity: 0.5, marginRight: "0.3rem" }}>{["A","B","C","D"][oi]}.</span>{opt}
                        </button>
                      );
                    })}
                  </div>
                  {selected !== undefined && !submitted && (
                    <button onClick={() => {
                      setMcqSubmitted(prev => ({ ...prev, [qi]: true }));
                      if (selected === q.answer) addXP(20);
                    }} style={{
                      ...neu.button, padding: "0.4rem 1.2rem", fontSize: "0.78rem", fontFamily: "Georgia, serif"
                    }}>Check ✓</button>
                  )}
                  {submitted && (
                    <div style={{ fontSize: "0.82rem", fontWeight: "bold", color: selected === q.answer ? C.emerald : C.crimson }}>
                      {selected === q.answer ? "✅ Correct! +20 XP" : `❌ Correct answer: ${q.options[q.answer]}`}
                    </div>
                  )}
                </div>
              );
            })}

            {Object.keys(mcqSubmitted).length === worksheets[2].questions.length && !sheetsDone.has(2) && (
              <button onClick={() => completeSheet(2)} style={{
                ...neu.button, width: "100%", padding: "0.8rem", fontFamily: "Georgia, serif"
              }}>✅ Complete MCQ +50 XP</button>
            )}
          </div>
        </div>
      )}

      {/* WORKSHEET 4: Sprint */}
      {activeSheet === 3 && (
        <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            {!sprintActive && !sprintDone && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏁</div>
                <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  Exam Sprint Mode!
                </div>
                <div style={{ color: C.goldDark, fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                  15 seconds per question • Must score 70% to pass!<br/>
                  <span style={{ fontStyle: "italic" }}>15 วินาทีต่อข้อ • ต้องได้ 70% ถึงจะผ่าน!</span>
                </div>
                <div style={{ ...neu.inset, padding: "1rem", marginBottom: "1.5rem", display: "inline-block" }}>
                  <div style={{ fontWeight: "bold", color: C.goldDark }}>⚠️ Logic Gate</div>
                  <div style={{ fontSize: "0.8rem", color: C.inkMid }}>Score below 70% = review and retry!</div>
                </div>
                <button onClick={() => { setSprintActive(true); setTimeLeft(15); setSprintQ(0); }} style={{
                  ...neu.button, padding: "1rem 2.5rem", fontSize: "1rem", fontFamily: "Georgia, serif", display: "block", margin: "0 auto"
                }}>🚀 Start Sprint!</button>
              </div>
            )}

            {sprintActive && !sprintDone && (() => {
              const q = worksheets[3].questions[sprintQ];
              const timerColor = timeLeft <= 5 ? C.crimson : timeLeft <= 10 ? C.gold : C.emerald;
              return (
                <div>
                  {/* Timer */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", alignItems: "center" }}>
                    <div style={{ fontSize: "0.8rem", color: C.goldDark }}>Q{sprintQ + 1}/{worksheets[3].questions.length}</div>
                    <div style={{
                      background: `${timerColor}22`, border: `2px solid ${timerColor}`,
                      borderRadius: 20, padding: "0.3rem 1rem",
                      color: timerColor, fontWeight: "bold", fontSize: "1.1rem",
                      animation: timeLeft <= 5 ? "pulse 0.5s infinite alternate" : "none"
                    }}>⏱️ {timeLeft}s</div>
                  </div>
                  {/* Timer bar */}
                  <div style={{ height: 6, background: "rgba(0,0,0,0.08)", borderRadius: 3, marginBottom: "1.2rem", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${(timeLeft / 15) * 100}%`,
                      background: `linear-gradient(90deg, ${timerColor}, ${C.goldLight})`,
                      transition: "width 1s linear, background 0.3s"
                    }}/>
                  </div>
                  <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.95rem", marginBottom: "1rem" }}>{q.q}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {q.options.map((opt, oi) => {
                      const sel = sprintAnswers[sprintQ];
                      const sub = sprintSubmitted[sprintQ];
                      let bg = C.ivoryDark, border = "rgba(201,168,76,0.15)", color = C.inkDark;
                      if (sel === oi && !sub) { bg = `${C.gold}33`; border = C.gold; }
                      if (sub && oi === q.answer) { bg = `${C.emerald}22`; border = C.emerald; color = C.emerald; }
                      if (sub && sel === oi && oi !== q.answer) { bg = "#fee"; border = C.crimson; color = C.crimson; }
                      return (
                        <button key={oi} onClick={() => {
                          if (!sprintSubmitted[sprintQ]) {
                            setSprintAnswers(prev => ({ ...prev, [sprintQ]: oi }));
                            setSprintSubmitted(prev => ({ ...prev, [sprintQ]: true }));
                            if (oi === q.answer) addXP(25);
                            clearInterval(timerRef.current);
                            setTimeout(() => moveToNextSprintQ(), 800);
                          }
                        }} style={{
                          padding: "0.7rem", background: bg,
                          border: `2px solid ${border}`, borderRadius: 12,
                          cursor: "pointer", fontSize: "0.85rem", color,
                          fontFamily: "Georgia, serif", fontWeight: "bold",
                          transition: "all 0.15s"
                        }}>{opt}</button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {sprintDone && (() => {
              const correct = worksheets[3].questions.filter((q, i) => sprintAnswers[i] === q.answer).length;
              const pct = Math.round((correct / worksheets[3].questions.length) * 100);
              const passed = pct >= 70;
              return (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{passed ? "🏆" : "📚"}</div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", color: passed ? C.emerald : C.crimson }}>
                    {pct}%
                  </div>
                  <div style={{ color: C.inkDark, fontWeight: "bold", marginBottom: "0.5rem" }}>
                    {correct}/{worksheets[3].questions.length} correct
                  </div>
                  <div style={{ color: passed ? C.emerald : C.crimson, marginBottom: "1.5rem", fontStyle: "italic" }}>
                    {passed ? "✅ ผ่าน! Passed! +50 XP" : "❌ ไม่ผ่าน! Score below 70% — review and retry!"}
                  </div>
                  {passed ? (
                    !sheetsDone.has(3) && (
                      <button onClick={() => completeSheet(3)} style={{
                        ...neu.button, padding: "0.8rem 2rem", fontFamily: "Georgia, serif"
                      }}>Claim Reward! 🎁</button>
                    )
                  ) : (
                    <button onClick={() => {
                      setSprintDone(false); setSprintActive(false);
                      setSprintAnswers({}); setSprintSubmitted({});
                      setSprintQ(0); setTimeLeft(15);
                    }} style={{
                      ...neu.button, padding: "0.8rem 2rem", fontFamily: "Georgia, serif"
                    }}>🔄 Try Again</button>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <div style={{ marginTop: "1.2rem", textAlign: "center", color: C.goldLight, fontSize: "0.8rem" }}>
        {sheetsDone.size}/{worksheets.length} worksheets complete
      </div>

      {allDone && (
        <button onClick={onComplete} style={{
          ...neu.button, width: "100%", padding: "1rem",
          marginTop: "0.8rem", fontSize: "1rem", fontFamily: "Georgia, serif"
        }}>Continue to Speaking Mission → 🗣️</button>
      )}
      <style>{`@keyframes pulse { from { opacity:1; } to { opacity:0.5; } }`}</style>
    </div>
  );
}

// ============================================================
// PASS 4: SPEAKING / AI CONVERSATION
// ============================================================
function Pass4Speaking({ onComplete, addXP }) {
  const [stage, setStage] = useState("intro"); // intro, shadowing, mission, complete
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [missionInput, setMissionInput] = useState("");
  const [missionScore, setMissionScore] = useState(null);

  const shadowingPhrases = [
    { en: "The beautiful dog runs quickly.", th: "หมาสวยวิ่งเร็ว", highlight: ["beautiful=Adj", "dog=Noun", "runs=Verb", "quickly=Adv"] },
    { en: "She puts the book under the table.", th: "เธอวางหนังสือใต้โต๊ะ", highlight: ["She=Pronoun", "book=Noun", "under=Prep"] },
  ];

  const missionPrompt = "Use a NOUN, VERB, and ADJECTIVE in ONE sentence about your school. Example: 'The big school has many students.'";
  const missionPromptTh = "ใช้คำนาม กริยา และคำคุณศัพท์ในประโยคเดียวเกี่ยวกับโรงเรียนของคุณ";

  const checkMission = () => {
    const words = missionInput.toLowerCase().split(/\s+/);
    const hasWords = words.length >= 4;
    const score = hasWords ? 85 + Math.floor(Math.random() * 15) : 40;
    setMissionScore(score);
    if (score >= 70) addXP(100);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: `1px solid ${C.gold}`, borderRadius: 20, padding: "0.3rem 1rem", color: C.goldLight, fontSize: "0.8rem", marginBottom: "0.8rem" }}>
          🗣️ Pass 4 — Speaking Production
        </div>
        <h2 style={{ color: C.goldLight, fontSize: "1.4rem", margin: 0 }}>Phonetic Shadowing + AI Mission</h2>
        <p style={{ color: C.gold, fontSize: "0.85rem" }}>การพูดและภารกิจ AI</p>
      </div>

      {stage === "intro" && (
        <div style={{ ...neu.card, padding: "2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            <img src="/characters/hanuman.png" alt="Hanuman" style={{ width: 100, height: 100, borderRadius: "50%", border: `3px solid ${C.gold}`, marginBottom: "1rem" }}/>
            <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "1rem", marginBottom: "0.5rem" }}>
              Ready to SPEAK English? 🎤
            </div>
            <div style={{ color: C.goldDark, fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              พร้อมพูดภาษาอังกฤษแล้วหรือยัง?<br/>
              First we shadow a native speaker, then complete a mission!
            </div>
            <button onClick={() => setStage("shadowing")} style={{
              ...neu.button, padding: "1rem 2rem", fontFamily: "Georgia, serif", fontSize: "1rem"
            }}>Let's Go! 🚀</button>
          </div>
        </div>
      )}

      {stage === "shadowing" && (
        <div>
          <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
            <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
            </svg>
            <div style={{ position: "relative" }}>
              <div style={{ fontWeight: "bold", color: C.inkDark, marginBottom: "0.3rem" }}>🎵 Phonetic Shadowing</div>
              <div style={{ color: C.goldDark, fontSize: "0.8rem", marginBottom: "1rem" }}>
                Listen and repeat — match the rhythm and stress!<br/>
                <span style={{ fontStyle: "italic" }}>ฟังแล้วพูดตาม — จับจังหวะให้ได้!</span>
              </div>

              {shadowingPhrases.map((phrase, i) => (
                <div key={i} style={{
                  padding: "1rem", marginBottom: "0.8rem",
                  background: "rgba(201,168,76,0.06)", borderRadius: 14,
                  border: "1px solid rgba(201,168,76,0.2)"
                }}>
                  <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "1rem", marginBottom: "0.3rem" }}>
                    🔊 "{phrase.en}"
                  </div>
                  <div style={{ color: C.goldDark, fontSize: "0.8rem", marginBottom: "0.6rem", fontStyle: "italic" }}>
                    {phrase.th}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {phrase.highlight.map((h, hi) => {
                      const [word, pos] = h.split("=");
                      const posData = partsOfSpeech.find(p => p.name.toLowerCase().startsWith(pos.toLowerCase().substring(0, 3)));
                      return (
                        <div key={hi} style={{
                          padding: "0.2rem 0.6rem",
                          background: posData ? `${posData.color}22` : "rgba(201,168,76,0.15)",
                          border: `1px solid ${posData ? posData.color + "55" : C.gold}`,
                          borderRadius: 12, fontSize: "0.72rem",
                          color: posData ? posData.color : C.goldDark, fontWeight: "bold"
                        }}>{word} = {pos}</div>
                      );
                    })}
                  </div>

                  {/* Waveform visualization */}
                  <div style={{ marginTop: "0.8rem", height: 40, background: "rgba(0,0,0,0.04)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 2, overflow: "hidden" }}>
                    {Array.from({length: 40}).map((_, wi) => (
                      <div key={wi} style={{
                        width: 3, borderRadius: 2,
                        height: `${20 + Math.sin(wi * 0.8) * 15 + Math.random() * 10}px`,
                        background: recording ? C.gold : "rgba(201,168,76,0.3)",
                        transition: "height 0.1s"
                      }}/>
                    ))}
                  </div>

                  <button onClick={() => { setRecording(!recording); if (recording) setRecorded(true); }} style={{
                    ...neu.button, padding: "0.4rem 1rem", fontSize: "0.78rem",
                    marginTop: "0.6rem", fontFamily: "Georgia, serif",
                    background: recording ? `linear-gradient(145deg, #ff6b6b, #ee5a5a)` : `linear-gradient(145deg, ${C.goldLight}, ${C.gold})`
                  }}>
                    {recording ? "⏹️ Stop" : "🎤 Record & Shadow"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => setStage("mission")} style={{
            ...neu.button, width: "100%", padding: "1rem", fontFamily: "Georgia, serif"
          }}>Continue to AI Mission → 🤖</button>
        </div>
      )}

      {stage === "mission" && (
        <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.2rem" }}>
              <img src="/characters/hanuman.png" alt="Hanuman" style={{ width: 60, height: 60, borderRadius: "50%", border: `2px solid ${C.gold}`, flexShrink: 0 }}/>
              <div style={{
                background: "rgba(201,168,76,0.08)", borderRadius: "0 14px 14px 14px",
                padding: "0.8rem 1rem", border: "1px solid rgba(201,168,76,0.2)", flex: 1
              }}>
                <div style={{ fontWeight: "bold", color: C.gold, fontSize: "0.72rem", marginBottom: "0.3rem" }}>🤖 AI Language Mission</div>
                <div style={{ color: C.inkDark, fontSize: "0.88rem", lineHeight: 1.5 }}>{missionPrompt}</div>
                <div style={{ color: C.goldDark, fontSize: "0.78rem", marginTop: "0.3rem", fontStyle: "italic" }}>{missionPromptTh}</div>
              </div>
            </div>

            <textarea
              value={missionInput}
              onChange={e => setMissionInput(e.target.value)}
              placeholder="Type your sentence here... / พิมพ์ประโยคของคุณที่นี่..."
              style={{
                width: "100%", minHeight: 80,
                background: C.ivoryDark, borderRadius: 14,
                boxShadow: `inset 3px 3px 8px rgba(0,0,0,0.12)`,
                border: `1px solid rgba(201,168,76,0.2)`,
                padding: "0.8rem 1rem", fontSize: "0.9rem",
                color: C.inkDark, fontFamily: "Georgia, serif",
                resize: "vertical", outline: "none"
              }}
            />

            {missionScore === null ? (
              <button onClick={checkMission} disabled={missionInput.length < 5} style={{
                ...neu.button, width: "100%", padding: "0.9rem",
                marginTop: "0.8rem", fontFamily: "Georgia, serif",
                opacity: missionInput.length < 5 ? 0.4 : 1,
                cursor: missionInput.length < 5 ? "not-allowed" : "pointer"
              }}>Submit to AI for Review 🤖</button>
            ) : (
              <div>
                <div style={{
                  padding: "1rem", marginTop: "0.8rem",
                  background: missionScore >= 70 ? "rgba(26,92,56,0.1)" : "rgba(139,26,26,0.1)",
                  borderRadius: 14, border: `1px solid ${missionScore >= 70 ? C.emerald : C.crimson}`,
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>
                    {missionScore >= 90 ? "🏆" : missionScore >= 70 ? "✅" : "📚"}
                  </div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: missionScore >= 70 ? C.emerald : C.crimson }}>
                    {missionScore}%
                  </div>
                  <div style={{ color: C.inkDark, fontSize: "0.85rem", marginTop: "0.3rem" }}>
                    {missionScore >= 70 ? "Mission Complete! Great use of Parts of Speech! 🎉" : "Try again — make sure to use a noun, verb, AND adjective!"}
                  </div>
                  {missionScore >= 70 && (
                    <button onClick={() => { addXP(100); setStage("complete"); }} style={{
                      ...neu.button, padding: "0.8rem 2rem", marginTop: "1rem", fontFamily: "Georgia, serif"
                    }}>Claim +100 XP 🎁</button>
                  )}
                  {missionScore < 70 && (
                    <button onClick={() => { setMissionScore(null); setMissionInput(""); }} style={{
                      ...neu.button, padding: "0.8rem 2rem", marginTop: "1rem", fontFamily: "Georgia, serif"
                    }}>Try Again 🔄</button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {stage === "complete" && (
        <div style={{ ...neu.card, padding: "2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏆</div>
            <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: C.goldDark, marginBottom: "0.5rem" }}>
              Unit 1 Complete!
            </div>
            <div style={{ color: C.goldDark, fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              ยอดเยี่ยม! You've mastered Parts of Speech!<br/>
              All 4 passes completed! 🎉
            </div>
            <button onClick={onComplete} style={{
              ...neu.button, padding: "1rem 2.5rem", fontSize: "1rem", fontFamily: "Georgia, serif"
            }}>🏆 Collect Stars & Continue!</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// LEADERBOARD
// ============================================================
function Leaderboard({ playerXP, playerName }) {
  const mockLeaders = [
    { name: "Nong Fah 🌟", xp: 980, stars: 12, avatar: "🧑" },
    { name: "Krob Khao 💪", xp: 850, stars: 10, avatar: "👦" },
    { name: playerName || "You 🎯", xp: playerXP, stars: Math.floor(playerXP / 80), avatar: "⭐", isYou: true },
    { name: "Lek Lek 📚", xp: 620, stars: 7, avatar: "👧" },
    { name: "Moo Wan 🎮", xp: 540, stars: 6, avatar: "🧒" },
  ].sort((a, b) => b.xp - a.xp).map((p, i) => ({ ...p, rank: i + 1 }));

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ color: C.goldLight, fontSize: "1.4rem", fontWeight: "bold" }}>🏆 Leaderboard</div>
        <div style={{ color: C.gold, fontSize: "0.85rem" }}>อันดับผู้เรียน</div>
      </div>

      {mockLeaders.map((p, i) => (
        <div key={i} style={{
          ...neu.card,
          padding: "1rem 1.5rem",
          marginBottom: "0.7rem",
          background: p.isYou ? `linear-gradient(145deg, #fffbf0, ${C.ivory})` : C.ivory,
          border: p.isYou ? `2px solid ${C.gold}` : `1px solid rgba(201,168,76,0.2)`,
          boxShadow: p.isYou ? `0 0 20px ${C.glow}, 4px 4px 12px rgba(0,0,0,0.15)` : neu.card.boxShadow,
          position: "relative", overflow: "hidden"
        }}>
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
            <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
          </svg>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: p.rank === 1 ? "linear-gradient(135deg, #FFD700, #FFA500)"
                : p.rank === 2 ? "linear-gradient(135deg, #C0C0C0, #A0A0A0)"
                : p.rank === 3 ? "linear-gradient(135deg, #CD7F32, #A0522D)"
                : `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: "bold", fontSize: "0.9rem", flexShrink: 0
            }}>{p.rank}</div>
            <div style={{ fontSize: "1.5rem" }}>{p.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", color: p.isYou ? C.goldDark : C.inkDark, fontSize: "0.9rem" }}>
                {p.name} {p.isYou && "← You!"}
              </div>
              <div style={{ fontSize: "0.72rem", color: C.goldDark }}>
                {"⭐".repeat(Math.min(p.stars, 5))} {p.stars} stars
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold", color: C.goldDark, fontSize: "1rem" }}>{p.xp}</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(0,0,0,0.4)" }}>XP</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// PARENT DASHBOARD
// ============================================================
function ParentDashboard({ playerXP, playerName }) {
  const unitsData = [
    { unit: 1, name: "Parts of Speech", score: 85, completed: true, timeSpent: "23 min" },
    { unit: 2, name: "Tenses", score: null, completed: false, timeSpent: "-" },
    { unit: 3, name: "Subject & Verb", score: null, completed: false, timeSpent: "-" },
  ];

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <div style={{ color: C.goldLight, fontSize: "1.4rem", fontWeight: "bold" }}>👨‍👩‍👧 Parent Dashboard</div>
        <div style={{ color: C.gold, fontSize: "0.85rem" }}>แดชบอร์ดผู้ปกครอง</div>
      </div>

      {/* Child summary */}
      <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: "1.5rem", flexShrink: 0
            }}>👤</div>
            <div>
              <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "1rem" }}>{playerName || "Your Child"}</div>
              <div style={{ color: C.goldDark, fontSize: "0.8rem" }}>Student • English Champion</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontWeight: "bold", color: C.goldDark, fontSize: "1.3rem" }}>{playerXP} XP</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(0,0,0,0.4)" }}>Total Points</div>
            </div>
          </div>

          {/* Progress bars */}
          {[
            { label: "Overall Progress", th: "ความก้าวหน้าโดยรวม", value: 9, max: 100, color: C.gold },
            { label: "Baseline Score", th: "คะแนนเริ่มต้น", value: 67, max: 100, color: C.emerald },
            { label: "Speaking Fluency", th: "ความคล่องในการพูด", value: 35, max: 100, color: C.sapphire },
          ].map((bar, i) => (
            <div key={i} style={{ marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: "bold", color: C.inkDark }}>{bar.label}</div>
                <div style={{ fontSize: "0.72rem", color: C.goldDark }}>{bar.value}%</div>
              </div>
              <div style={{ height: 8, background: "rgba(0,0,0,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${bar.value}%`, borderRadius: 4,
                  background: `linear-gradient(90deg, ${bar.color}, ${bar.color}88)`,
                  transition: "width 1s ease"
                }}/>
              </div>
              <div style={{ fontSize: "0.65rem", color: C.goldDark, marginTop: "0.1rem" }}>{bar.th}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Unit progress table */}
      <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ fontWeight: "bold", color: C.goldDark, marginBottom: "1rem", fontSize: "0.9rem" }}>
            📊 Unit Performance • ผลการเรียนรายหน่วย
          </div>
          {unitsData.map((u, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "0.8rem",
              padding: "0.7rem 0.8rem", marginBottom: "0.5rem",
              background: u.completed ? "rgba(26,92,56,0.06)" : "rgba(201,168,76,0.04)",
              borderRadius: 12, border: `1px solid ${u.completed ? C.emerald + "44" : "rgba(201,168,76,0.15)"}`
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: u.completed ? C.emerald : "rgba(0,0,0,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: u.completed ? "#fff" : "rgba(0,0,0,0.3)", fontSize: "0.8rem", fontWeight: "bold",
                flexShrink: 0
              }}>{u.unit}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.82rem" }}>{u.name}</div>
                <div style={{ fontSize: "0.68rem", color: C.goldDark }}>Time: {u.timeSpent}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                {u.score !== null ? (
                  <>
                    <div style={{ fontWeight: "bold", color: u.score >= 70 ? C.emerald : C.crimson, fontSize: "0.9rem" }}>{u.score}%</div>
                    <div style={{ fontSize: "0.65rem", color: C.goldDark }}>Score</div>
                  </>
                ) : (
                  <div style={{ color: "rgba(0,0,0,0.3)", fontSize: "0.75rem" }}>🔒 Locked</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly activity */}
      <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ fontWeight: "bold", color: C.goldDark, marginBottom: "1rem", fontSize: "0.9rem" }}>
            📅 Weekly Activity • กิจกรรมรายสัปดาห์
          </div>
          <div style={{ display: "flex", gap: "0.4rem", justifyContent: "space-between" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const activity = [80, 60, 90, 40, 70, 20, 0][i];
              return (
                <div key={i} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{
                    height: 60, background: "rgba(0,0,0,0.06)", borderRadius: 6,
                    display: "flex", alignItems: "flex-end", overflow: "hidden"
                  }}>
                    <div style={{
                      width: "100%", height: `${activity}%`,
                      background: activity > 60
                        ? `linear-gradient(0deg, ${C.emerald}, ${C.emerald}88)`
                        : activity > 0
                          ? `linear-gradient(0deg, ${C.gold}, ${C.goldLight})`
                          : "transparent",
                      borderRadius: "4px 4px 0 0", transition: "height 1s ease"
                    }}/>
                  </div>
                  <div style={{ fontSize: "0.6rem", color: C.goldDark, marginTop: "0.3rem" }}>{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// XP BAR COMPONENT
// ============================================================
function XPBar({ xp, level }) {
  const xpForNext = level * 200;
  const xpInLevel = xp % 200;
  const pct = Math.round((xpInLevel / xpForNext) * 100);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
      <div style={{
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
        borderRadius: "50%", width: 36, height: 36,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: "bold", fontSize: "0.85rem",
        boxShadow: `0 0 12px ${C.glow}`, flexShrink: 0
      }}>Lv{level}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.2rem" }}>
          <span style={{ color: C.goldLight, fontSize: "0.72rem" }}>⭐ {xp} XP</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>{xpInLevel}/{xpForNext} to Lv{level + 1}</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
            borderRadius: 3, transition: "width 0.5s ease",
            boxShadow: `0 0 8px ${C.glow}`
          }}/>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function EnglishChampionUnit1() {
  const [screen, setScreen] = useState("home"); // home, unit1, leaderboard, parent
  const [pass, setPass] = useState(1); // 1,2,3,4
  const [passComplete, setPassComplete] = useState(new Set());
  const [xp, setXp] = useState(0);
  const [showXPGain, setShowXPGain] = useState(null);
  const [unitComplete, setUnitComplete] = useState(false);

  const addXP = (amount) => {
    setXp(prev => prev + amount);
    setShowXPGain(amount);
    setTimeout(() => setShowXPGain(null), 2000);
  };

  const level = Math.floor(xp / 200) + 1;

  const completePass = (passNum) => {
    setPassComplete(prev => new Set([...prev, passNum]));
    addXP(passNum === 4 ? 200 : 100);
    if (passNum < 4) setPass(passNum + 1);
    else setUnitComplete(true);
  };

  const passes = [
    { num: 1, label: "Hook", icon: "🪝", color: C.gold },
    { num: 2, label: "Lecture", icon: "📖", color: "#9C6BC9" },
    { num: 3, label: "Worksheets", icon: "📝", color: C.emerald },
    { num: 4, label: "Speaking", icon: "🗣️", color: C.sapphire },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      fontFamily: "'Sarabun', Georgia, serif",
      padding: "1rem", position: "relative"
    }}>
      <LaiThai/>
      <svg width="100%" height="100%" style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        <rect width="100%" height="100%" fill="url(#lt)"/>
      </svg>
      <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;700&display=swap" rel="stylesheet"/>

      {/* XP Gain notification */}
      {showXPGain && (
        <div style={{
          position: "fixed", top: 80, right: 20, zIndex: 1000,
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
          borderRadius: 20, padding: "0.5rem 1.2rem",
          color: "#fff", fontWeight: "bold", fontSize: "1rem",
          boxShadow: `0 4px 20px ${C.glow}`,
          animation: "slideIn 0.3s ease"
        }}>+{showXPGain} XP ⭐</div>
      )}

      <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Top navigation */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.8rem"
        }}>
          <div style={{ color: C.goldLight, fontSize: "1.1rem", fontWeight: "bold" }}>
            🏆 English Champion
          </div>
          <XPBar xp={xp} level={level}/>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {[
              { id: "home", icon: "🏠", label: "Home" },
              { id: "leaderboard", icon: "🏆", label: "Board" },
              { id: "parent", icon: "👨‍👩‍👧", label: "Parent" },
            ].map(nav => (
              <button key={nav.id} onClick={() => setScreen(nav.id)} style={{
                background: screen === nav.id ? `linear-gradient(145deg, ${C.goldLight}, ${C.gold})` : "rgba(255,255,255,0.08)",
                border: `1px solid ${screen === nav.id ? C.gold : "rgba(255,255,255,0.15)"}`,
                borderRadius: 10, color: screen === nav.id ? C.inkDark : "#fff",
                padding: "0.4rem 0.7rem", cursor: "pointer",
                fontFamily: "Georgia, serif", fontSize: "0.75rem",
                fontWeight: screen === nav.id ? "bold" : "normal"
              }}>{nav.icon} {nav.label}</button>
            ))}
          </div>
        </div>

        {/* HOME */}
        {screen === "home" && (
          <div>
            {/* Unit 1 card */}
            <div style={{ ...neu.card, padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
              <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
                <rect width="100%" height="100%" fill="url(#lt)" rx="24"/>
              </svg>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
                  <img src="/characters/phra.png" alt="Phra" style={{ width: 64, height: 64, borderRadius: "50%", border: `3px solid ${C.gold}`, boxShadow: `0 0 16px ${C.glow}` }}/>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: C.goldDark }}>Unit 1 • พระ (Phra)</div>
                    <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "1.1rem" }}>Parts of Speech</div>
                    <div style={{ color: C.goldDark, fontSize: "0.82rem" }}>ชนิดของคำ</div>
                  </div>
                  {unitComplete && <div style={{ marginLeft: "auto", fontSize: "2rem" }}>🏆</div>}
                </div>

                {/* Pass progress */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem" }}>
                  {passes.map(p => (
                    <div key={p.num} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        height: 6, borderRadius: 3, marginBottom: "0.4rem",
                        background: passComplete.has(p.num) ? p.color : "rgba(0,0,0,0.1)",
                        transition: "background 0.5s"
                      }}/>
                      <div style={{ fontSize: "0.7rem", color: passComplete.has(p.num) ? p.color : "rgba(0,0,0,0.3)" }}>
                        {passComplete.has(p.num) ? "✅" : p.icon} {p.label}
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setScreen("unit1")} style={{
                  ...neu.button, width: "100%", padding: "1rem",
                  fontSize: "1rem", fontFamily: "Georgia, serif"
                }}>
                  {unitComplete ? "🔄 Review Unit 1" : passComplete.size > 0 ? `▶️ Continue — Pass ${pass}` : "🚀 Start Unit 1"}
                </button>
              </div>
            </div>

            {/* Locked units preview */}
            <div style={{ color: C.goldLight, fontSize: "0.85rem", fontWeight: "bold", marginBottom: "0.6rem" }}>
              🔒 Coming Next...
            </div>
            {[2, 3, 4].map(n => (
              <div key={n} style={{
                ...neu.card, padding: "1rem 1.5rem", marginBottom: "0.6rem",
                opacity: 0.5, position: "relative", overflow: "hidden"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <div style={{ fontSize: "1.5rem" }}>🔒</div>
                  <div>
                    <div style={{ fontWeight: "bold", color: C.inkDark, fontSize: "0.85rem" }}>
                      Unit {n} — {["Tenses", "Subject & Verb Agreement", "Passive Voice"][n - 2]}
                    </div>
                    <div style={{ color: C.goldDark, fontSize: "0.72rem" }}>Complete Unit {n - 1} to unlock</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* UNIT 1 CONTENT */}
        {screen === "unit1" && (
          <div>
            {/* Pass selector */}
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.2rem", overflowX: "auto", paddingBottom: "0.3rem" }}>
              <button onClick={() => setScreen("home")} style={{
                ...neu.inset, padding: "0.5rem 0.8rem", cursor: "pointer",
                color: C.goldDark, fontFamily: "Georgia, serif", fontSize: "0.78rem", flexShrink: 0
              }}>← Home</button>
              {passes.map(p => (
                <button key={p.num} onClick={() => passComplete.has(p.num - 1) || p.num === 1 ? setPass(p.num) : null} style={{
                  flex: 1, minWidth: 90, padding: "0.5rem",
                  background: pass === p.num ? `linear-gradient(145deg, ${p.color}99, ${p.color}66)` : C.ivory,
                  border: `2px solid ${pass === p.num ? p.color : "rgba(201,168,76,0.15)"}`,
                  borderRadius: 12, cursor: passComplete.has(p.num - 1) || p.num === 1 ? "pointer" : "not-allowed",
                  opacity: !passComplete.has(p.num - 1) && p.num > 1 ? 0.4 : 1,
                  fontFamily: "Georgia, serif", fontSize: "0.72rem",
                  color: pass === p.num ? "#fff" : C.goldDark,
                  fontWeight: pass === p.num ? "bold" : "normal",
                  position: "relative"
                }}>
                  {passComplete.has(p.num) && <span style={{ position: "absolute", top: -4, right: -4, fontSize: "0.65rem" }}>✅</span>}
                  {p.icon} {p.label}
                </button>
              ))}
            </div>

            {pass === 1 && <Pass1Hook onComplete={() => completePass(1)} char="phra"/>}
            {pass === 2 && <Pass2Lecture onComplete={() => completePass(2)}/>}
            {pass === 3 && <Pass3Worksheets onComplete={() => completePass(3)} addXP={addXP}/>}
            {pass === 4 && <Pass4Speaking onComplete={() => { completePass(4); setScreen("home"); }} addXP={addXP}/>}
          </div>
        )}

        {/* LEADERBOARD */}
        {screen === "leaderboard" && <Leaderboard playerXP={xp} playerName="You"/>}

        {/* PARENT DASHBOARD */}
        {screen === "parent" && <ParentDashboard playerXP={xp} playerName="Your Child"/>}
      </div>

      <style>{`
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </div>
  );
}
