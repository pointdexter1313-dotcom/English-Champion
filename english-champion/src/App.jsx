import { useState, useEffect } from "react";

// ============================================================
// THAI COLOR PALETTE — ThaiTone + Jewel Colors
// ============================================================
const COLORS = {
  gold:        "#C9A84C",
  goldLight:   "#E8C96D",
  goldDark:    "#8B6914",
  crimson:     "#8B1A1A",
  emerald:     "#1A5C38",
  sapphire:    "#1A2E6B",
  ivory:       "#FAF3E0",
  ivoryDark:   "#F0E6C8",
  inkDark:     "#1A1208",
  inkMid:      "#2D2010",
  shadow:      "rgba(0,0,0,0.25)",
  shadowDeep:  "rgba(0,0,0,0.45)",
  glow:        "rgba(201,168,76,0.35)",
  glowStrong:  "rgba(201,168,76,0.6)",
};

// ============================================================
// LAI THAI SVG PATTERN
// ============================================================
const LaiThaiPattern = () => (
  <svg width="0" height="0" style={{position:"absolute"}}>
    <defs>
      <pattern id="laithai" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <rect width="80" height="80" fill="none"/>
        <path d="M40 5 L75 40 L40 75 L5 40 Z" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1"/>
        <circle cx="40" cy="40" r="12" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1"/>
        <path d="M40 20 L60 40 L40 60 L20 40 Z" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="0.5"/>
        <circle cx="40" cy="5"  r="3" fill="rgba(201,168,76,0.08)"/>
        <circle cx="75" cy="40" r="3" fill="rgba(201,168,76,0.08)"/>
        <circle cx="40" cy="75" r="3" fill="rgba(201,168,76,0.08)"/>
        <circle cx="5"  cy="40" r="3" fill="rgba(201,168,76,0.08)"/>
        <path d="M20 20 Q40 10 60 20 Q70 40 60 60 Q40 70 20 60 Q10 40 20 20Z" 
              fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="0.5"/>
      </pattern>
    </defs>
  </svg>
);

// ============================================================
// NEUMORPHIC STYLES
// ============================================================
const neu = {
  card: {
    background: COLORS.ivory,
    borderRadius: 24,
    boxShadow: `6px 6px 16px rgba(0,0,0,0.18), -4px -4px 12px rgba(255,255,255,0.85)`,
    border: `1px solid rgba(201,168,76,0.2)`,
  },
  cardDark: {
    background: COLORS.inkMid,
    borderRadius: 24,
    boxShadow: `6px 6px 16px rgba(0,0,0,0.5), -2px -2px 8px rgba(255,255,255,0.04)`,
    border: `1px solid rgba(201,168,76,0.25)`,
  },
  button: {
    background: `linear-gradient(145deg, ${COLORS.goldLight}, ${COLORS.gold})`,
    borderRadius: 16,
    boxShadow: `4px 4px 12px rgba(0,0,0,0.25), -2px -2px 8px rgba(255,255,255,0.6)`,
    border: "none",
    cursor: "pointer",
    color: COLORS.inkDark,
    fontWeight: "bold",
    transition: "all 0.2s",
  },
  buttonInset: {
    background: `linear-gradient(145deg, ${COLORS.ivoryDark}, ${COLORS.ivory})`,
    borderRadius: 14,
    boxShadow: `inset 3px 3px 8px rgba(0,0,0,0.15), inset -2px -2px 6px rgba(255,255,255,0.8)`,
    border: `1px solid rgba(201,168,76,0.15)`,
  },
  input: {
    background: COLORS.ivoryDark,
    borderRadius: 14,
    boxShadow: `inset 3px 3px 8px rgba(0,0,0,0.12), inset -2px -2px 6px rgba(255,255,255,0.9)`,
    border: `1px solid rgba(201,168,76,0.2)`,
    padding: "0.9rem 1.2rem",
    fontSize: "1rem",
    color: COLORS.inkDark,
    width: "100%",
    outline: "none",
    fontFamily: "'Sarabun', Georgia, serif",
  }
};

// ============================================================
// FIREBASE CONFIG (Simulated for demo — replace with real config)
// ============================================================
// To use real Firebase:
// 1. Go to console.firebase.google.com
// 2. Create project "english-champion"
// 3. Enable Authentication (Email/Password)
// 4. Enable Firestore Database
// 5. Replace this config with your real one

const FIREBASE_READY = false; // Set to true when you add real Firebase config

// ============================================================
// SIMULATED AUTH & DATABASE (Works without Firebase)
// ============================================================
const SimDB = {
  users: JSON.parse(localStorage.getItem("ec_users") || "{}"),
  progress: JSON.parse(localStorage.getItem("ec_progress") || "{}"),
  
  createUser(email, password, name, role = "student") {
    if (this.users[email]) return { error: "อีเมลนี้ถูกใช้แล้ว / Email already exists" };
    const user = { email, password, name, role, createdAt: new Date().toISOString(), id: Date.now().toString() };
    this.users[email] = user;
    localStorage.setItem("ec_users", JSON.stringify(this.users));
    return { user };
  },
  
  login(email, password) {
    const user = this.users[email];
    if (!user) return { error: "ไม่พบอีเมลนี้ / Email not found" };
    if (user.password !== password) return { error: "รหัสผ่านไม่ถูกต้อง / Wrong password" };
    return { user };
  },

  saveProgress(userId, data) {
    this.progress[userId] = { ...this.progress[userId], ...data, lastUpdated: new Date().toISOString() };
    localStorage.setItem("ec_progress", JSON.stringify(this.progress));
  },

  getProgress(userId) {
    return this.progress[userId] || { 
      baselineScore: null, 
      baselineCompleted: false,
      unitProgress: {},
      totalStars: 0,
      examAttempts: []
    };
  },

  getAllStudents() {
    return Object.values(this.users).filter(u => u.role === "student");
  }
};

// ============================================================
// ENTRY EXAM QUESTIONS
// ============================================================
const examQuestions = [
  // Grammar & Structure
  { id: 1, unit: 3, category: "Grammar", 
    q: "The team _____ playing very well today.", 
    qTh: "เลือกกริยาที่ถูกต้อง",
    options: ["are", "is", "were", "be"], answer: 1 },
  { id: 2, unit: 2, category: "Grammar",
    q: "She _____ English every day since she was 5 years old.",
    qTh: "เลือกกาลที่ถูกต้อง",
    options: ["studies", "has been studying", "studied", "is studying"], answer: 1 },
  { id: 3, unit: 4, category: "Grammar",
    q: "The letter _____ by Tom yesterday.",
    qTh: "เลือกรูป Passive ที่ถูกต้อง",
    options: ["writes", "is written", "was written", "were written"], answer: 2 },
  { id: 4, unit: 11, category: "Grammar",
    q: "If I _____ a million baht, I would travel the world.",
    qTh: "เลือกรูป If-Clause ที่ถูกต้อง",
    options: ["have", "had", "has", "would have"], answer: 1 },
  { id: 5, unit: 10, category: "Grammar",
    q: "This is _____ temple in Chiang Mai.",
    qTh: "เลือกรูปเปรียบเทียบที่ถูกต้อง",
    options: ["the more beautiful", "the most beautiful", "more beautiful than", "beautifulest"], answer: 1 },
  // Vocabulary
  { id: 6, unit: 7, category: "Vocabulary",
    q: "He learned all the Thai words _____ — no book, no notes.",
    qTh: "เลือกสำนวนที่ถูกต้อง",
    options: ["by accident", "by heart", "by mistake", "by chance"], answer: 1 },
  { id: 7, unit: 8, category: "Vocabulary",
    q: "She _____ an old photo of her grandmother in the attic.",
    qTh: "เลือก Phrasal Verb ที่ถูกต้อง",
    options: ["came across", "broke out", "filled out", "gave up"], answer: 0 },
  { id: 8, unit: 9, category: "Vocabulary",
    q: "They suggested _____ by train to save money.",
    qTh: "เลือกรูป Gerund/Infinitive ที่ถูกต้อง",
    options: ["to go", "go", "going", "went"], answer: 2 },
  { id: 9, unit: 1, category: "Vocabulary",
    q: "The BEAUTIFUL temple was full of tourists. What part of speech is 'beautiful'?",
    qTh: "'beautiful' เป็นคำชนิดใด?",
    options: ["Noun คำนาม", "Verb คำกริยา", "Adjective คำคุณศัพท์", "Adverb คำวิเศษณ์"], answer: 2 },
  { id: 10, unit: 7, category: "Vocabulary",
    q: "_____, I wanted to ask you about tomorrow's homework.",
    qTh: "เลือกสำนวนที่ถูกต้อง",
    options: ["By accident", "By the way", "For good", "By no means"], answer: 1 },
  // Conversation
  { id: 11, unit: 5, category: "Conversation",
    q: "A: 'Could I possibly trouble you for directions?' B: 'Of course!' — What is their relationship?",
    qTh: "ความสัมพันธ์ของผู้พูดคืออะไร?",
    options: ["Close friends เพื่อนสนิท", "Strangers คนแปลกหน้า", "Teacher-student ครู-นักเรียน", "Family ครอบครัว"], answer: 1 },
  { id: 12, unit: 5, category: "Conversation",
    q: "Which phrase is the most FORMAL?",
    qTh: "ประโยคไหนเป็นทางการที่สุด?",
    options: ["Hey! What's up?", "Could you please assist me?", "Gimme a sec!", "No worries mate!"], answer: 1 },
  // Reading
  { id: 13, unit: 6, category: "Reading",
    q: "You need to find what YEAR a famous temple was built. Which reading strategy do you use?",
    qTh: "ควรใช้กลยุทธ์การอ่านแบบใด?",
    options: ["Skimming อ่านกวาดตา", "Scanning สแกนหาข้อมูล", "Speed Reading อ่านเร็ว", "All three ทั้งหมด"], answer: 1 },
  { id: 14, unit: 6, category: "Reading",
    q: "The 'Main Idea' of a passage is best described as:",
    qTh: "Main Idea คืออะไร?",
    options: ["A small detail รายละเอียด", "What the whole passage is about สิ่งที่บทความพูดถึงทั้งหมด", "The title only แค่หัวข้อ", "A supporting example ตัวอย่างประกอบ"], answer: 1 },
  { id: 15, unit: 2, category: "Grammar",
    q: "By next year, she _____ at this school for 10 years.",
    qTh: "เลือกกาลที่ถูกต้อง (Future Perfect)",
    options: ["will teach", "teaches", "will have been teaching", "has taught"], answer: 2 },
];

// ============================================================
// KHON CHARACTERS
// ============================================================
const characters = {
  phra:    { name: "พระ",    nameEn: "Phra",    img: "/characters/phra.png",    color: "#C9A84C" },
  nang:    { name: "นาง",    nameEn: "Nang",    img: "/characters/nang.png",    color: "#C97BA8" },
  yak:     { name: "ยักษ์",  nameEn: "Yak",     img: "/characters/yak.png",     color: "#4CAF50" },
  hanuman: { name: "หนุมาน", nameEn: "Hanuman", img: "/characters/hanuman.png", color: "#9C6BC9" },
};

const unitCharacters = {
  1:"phra",2:"phra",3:"yak",4:"yak",5:"nang",6:"nang",
  7:"hanuman",8:"hanuman",9:"hanuman",10:"phra",11:"yak"
};

// ============================================================
// DECORATIVE BORDER COMPONENT
// ============================================================
function ThaiBorder({ color = COLORS.gold, opacity = 0.6 }) {
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", pointerEvents: "none", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <rect x="8" y="8" width="calc(100%-16)" height="calc(100%-16)" 
              rx="18" ry="18" fill="none" 
              stroke={color} strokeWidth="1" strokeOpacity={opacity}
              strokeDasharray="8 4"/>
        <circle cx="24" cy="24" r="5" fill={color} fillOpacity={opacity * 0.5}/>
        <circle cx="calc(100%-24)" cy="24" r="5" fill={color} fillOpacity={opacity * 0.5}/>
        <circle cx="24" cy="calc(100%-24)" r="5" fill={color} fillOpacity={opacity * 0.5}/>
        <circle cx="calc(100%-24)" cy="calc(100%-24)" r="5" fill={color} fillOpacity={opacity * 0.5}/>
      </svg>
    </div>
  );
}

// ============================================================
// PROGRESS RING COMPONENT
// ============================================================
function ProgressRing({ percent, size = 80, color = COLORS.gold, label, sublabel }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" 
                  stroke="rgba(0,0,0,0.08)" strokeWidth={8}/>
          <circle cx={size/2} cy={size/2} r={r} fill="none"
                  stroke={color} strokeWidth={8}
                  strokeDasharray={`${dash} ${circ - dash}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size/2} ${size/2})`}/>
        </svg>
        <div style={{
          position: "absolute", inset: 0, display: "flex", 
          alignItems: "center", justifyContent: "center",
          fontSize: size * 0.22, fontWeight: "bold", color: COLORS.inkDark
        }}>{percent}%</div>
      </div>
      {label && <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: COLORS.inkDark, textAlign: "center" }}>{label}</div>}
      {sublabel && <div style={{ fontSize: "0.65rem", color: COLORS.goldDark, textAlign: "center" }}>{sublabel}</div>}
    </div>
  );
}

// ============================================================
// UNIT PROGRESS CARD
// ============================================================
function UnitCard({ unitNum, progress, onClick }) {
  const charKey = unitCharacters[unitNum];
  const char = characters[charKey];
  const stars = progress?.stars || 0;
  const completed = progress?.completed || false;
  const locked = progress?.locked !== false && unitNum > 1 && !progress?.unlocked;

  const unitNames = {
    1:"Parts of Speech",2:"Tenses",3:"Subject & Verb",4:"Passive Voice",
    5:"Conversation",6:"Reading",7:"Idioms",8:"Phrasal Verbs",
    9:"Gerund & Infinitives",10:"Adjective Comparison",11:"If-Clauses"
  };
  const unitNamesTh = {
    1:"ชนิดของคำ",2:"กาลเวลา",3:"ประธาน-กริยา",4:"กรรมวาจก",
    5:"การสนทนา",6:"การอ่าน",7:"สำนวน",8:"กริยาวลี",
    9:"Gerund & Infinitive",10:"การเปรียบเทียบ",11:"ประโยคเงื่อนไข"
  };

  return (
    <div onClick={!locked ? onClick : undefined} style={{
      ...neu.card,
      padding: "1rem",
      cursor: locked ? "not-allowed" : "pointer",
      opacity: locked ? 0.5 : 1,
      position: "relative",
      overflow: "hidden",
      transition: "all 0.2s",
      background: completed 
        ? `linear-gradient(145deg, #f0fdf4, ${COLORS.ivory})` 
        : COLORS.ivory,
    }}
    onMouseEnter={e => { if (!locked) e.currentTarget.style.transform = "translateY(-3px)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
      </svg>
      <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", position: "relative" }}>
        <img src={char.img} alt={char.nameEn} style={{
          width: 44, height: 44, borderRadius: "50%",
          border: `2px solid ${char.color}`,
          boxShadow: `0 0 8px ${char.color}55`,
          objectFit: "cover", flexShrink: 0
        }}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.65rem", color: COLORS.goldDark, marginBottom: 1 }}>
            Unit {unitNum} • {char.name}
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: COLORS.inkDark, lineHeight: 1.2 }}>
            {unitNames[unitNum]}
          </div>
          <div style={{ fontSize: "0.72rem", color: COLORS.goldDark }}>
            {unitNamesTh[unitNum]}
          </div>
        </div>
        <div style={{ flexShrink: 0, textAlign: "right" }}>
          {locked ? (
            <div style={{ fontSize: "1.2rem" }}>🔒</div>
          ) : completed ? (
            <div style={{ fontSize: "1rem" }}>✅</div>
          ) : (
            <div style={{ fontSize: "1rem" }}>▶️</div>
          )}
          <div style={{ fontSize: "0.65rem", marginTop: 2 }}>
            {"⭐".repeat(stars)}{"☆".repeat(4-stars)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SKILL DEFICIENCY MAP
// ============================================================
function SkillMap({ examAttempts }) {
  if (!examAttempts || examAttempts.length === 0) return null;
  const latest = examAttempts[examAttempts.length - 1];
  const byUnit = {};
  examQuestions.forEach(q => {
    if (!byUnit[q.unit]) byUnit[q.unit] = { correct: 0, total: 0 };
    byUnit[q.unit].total++;
    if (latest.answers?.[q.id] === q.answer) byUnit[q.unit].correct++;
  });

  return (
    <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
      </svg>
      <div style={{ position: "relative" }}>
        <div style={{ fontWeight: "bold", color: COLORS.goldDark, marginBottom: "1rem", fontSize: "0.9rem" }}>
          🗺️ Skill Map • แผนทักษะของคุณ
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "0.6rem" }}>
          {Object.entries(byUnit).map(([unit, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            const color = pct >= 80 ? COLORS.emerald : pct >= 50 ? COLORS.gold : COLORS.crimson;
            return (
              <div key={unit} style={{
                background: `${color}15`,
                border: `1px solid ${color}44`,
                borderRadius: 12, padding: "0.5rem 0.7rem", textAlign: "center"
              }}>
                <div style={{ fontSize: "0.65rem", color: COLORS.goldDark }}>Unit {unit}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: "bold", color }}>
                  {pct}%
                </div>
                <div style={{ 
                  height: 4, background: "#ddd", borderRadius: 2, marginTop: 4,
                  overflow: "hidden"
                }}>
                  <div style={{ 
                    width: `${pct}%`, height: "100%", background: color,
                    borderRadius: 2, transition: "width 1s ease"
                  }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function EnglishChampion() {
  const [screen, setScreen] = useState("splash"); // splash, login, register, studentDash, teacherDash, exam, examResults
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [authError, setAuthError] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", confirm: "", role: "student" });
  const [examState, setExamState] = useState({ current: 0, answers: {}, started: false, finished: false });
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    setTimeout(() => setScreen("login"), 2500);
  }, []);

  const handleLogin = () => {
    setAuthError("");
    const result = SimDB.login(loginForm.email, loginForm.password);
    if (result.error) { setAuthError(result.error); return; }
    const prog = SimDB.getProgress(result.user.id);
    setUser(result.user);
    setProgress(prog);
    if (result.user.role === "teacher") {
      setAllStudents(SimDB.getAllStudents());
      setScreen("teacherDash");
    } else {
      setScreen(prog.baselineCompleted ? "studentDash" : "examIntro");
    }
  };

  const handleRegister = () => {
    setAuthError("");
    if (regForm.password !== regForm.confirm) { setAuthError("รหัสผ่านไม่ตรงกัน / Passwords don't match"); return; }
    if (regForm.password.length < 6) { setAuthError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร / Password must be 6+ characters"); return; }
    const result = SimDB.createUser(regForm.email, regForm.password, regForm.name, regForm.role);
    if (result.error) { setAuthError(result.error); return; }
    const prog = SimDB.getProgress(result.user.id);
    setUser(result.user);
    setProgress(prog);
    setScreen("examIntro");
  };

  const handleExamAnswer = (qId, optIdx) => {
    setExamState(prev => ({ ...prev, answers: { ...prev.answers, [qId]: optIdx } }));
  };

  const handleExamSubmit = () => {
    let correct = 0;
    examQuestions.forEach(q => {
      if (examState.answers[q.id] === q.answer) correct++;
    });
    const score = Math.round((correct / examQuestions.length) * 100);
    const newProg = {
      ...progress,
      baselineScore: score,
      baselineCompleted: true,
      baselineDate: new Date().toISOString(),
      examAttempts: [...(progress?.examAttempts || []), { 
        score, correct, total: examQuestions.length,
        answers: examState.answers, date: new Date().toISOString() 
      }]
    };
    SimDB.saveProgress(user.id, newProg);
    setProgress(newProg);
    setExamState(prev => ({ ...prev, finished: true, score, correct }));
    setScreen("examResults");
  };

  const logout = () => {
    setUser(null); setProgress(null); setScreen("login");
    setLoginForm({ email: "", password: "" });
  };

  // ---- SPLASH ----
  if (screen === "splash") return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sarabun', Georgia, serif",
      position: "relative", overflow: "hidden"
    }}>
      <LaiThaiPattern/>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)"/>
      </svg>
      <div style={{ position: "relative", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          {Object.values(characters).map((c, i) => (
            <img key={i} src={c.img} alt={c.nameEn} style={{
              width: 64, height: 64, borderRadius: "50%",
              border: `2px solid ${c.color}`,
              boxShadow: `0 0 16px ${c.color}88`,
              objectFit: "cover",
              animation: `float ${1.5 + i * 0.3}s ease-in-out infinite alternate`,
            }}/>
          ))}
        </div>
        <div style={{ 
          fontSize: "3rem", fontWeight: "bold", color: COLORS.goldLight,
          textShadow: `0 0 30px ${COLORS.glow}`, letterSpacing: "0.05em",
          fontFamily: "Georgia, serif"
        }}>🏆 English Champion</div>
        <div style={{ color: COLORS.gold, fontSize: "1.1rem", marginTop: "0.5rem", letterSpacing: "0.15em" }}>
          แชมป์ภาษาอังกฤษ
        </div>
        <div style={{ 
          marginTop: "2rem", color: "rgba(255,255,255,0.4)", 
          fontSize: "0.85rem", letterSpacing: "0.1em"
        }}>กำลังโหลด... Loading...</div>
      </div>
      <style>{`
        @keyframes float { from { transform: translateY(0px); } to { transform: translateY(-10px); } }
      `}</style>
    </div>
  );

  // ---- LOGIN ----
  if (screen === "login") return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sarabun', Georgia, serif", padding: "1.5rem", position: "relative"
    }}>
      <LaiThaiPattern/>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)"/>
      </svg>

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
          {Object.values(characters).map((c, i) => (
            <img key={i} src={c.img} alt={c.nameEn} style={{
              width: 48, height: 48, borderRadius: "50%",
              border: `2px solid ${c.color}`, objectFit: "cover"
            }}/>
          ))}
        </div>
        <div style={{ color: COLORS.goldLight, fontSize: "1.8rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>
          🏆 English Champion
        </div>
        <div style={{ color: COLORS.gold, fontSize: "0.9rem" }}>แชมป์ภาษาอังกฤษ</div>
      </div>

      {/* Card */}
      <div style={{ ...neu.card, padding: "2rem", width: "100%", maxWidth: 420, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: COLORS.inkDark }}>
              เข้าสู่ระบบ / Login
            </div>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: "0.8rem", color: COLORS.goldDark, fontWeight: "bold", display: "block", marginBottom: "0.4rem" }}>
              อีเมล / Email
            </label>
            <input style={neu.input} type="email" placeholder="your@email.com"
              value={loginForm.email}
              onChange={e => setLoginForm(p => ({...p, email: e.target.value}))}/>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.8rem", color: COLORS.goldDark, fontWeight: "bold", display: "block", marginBottom: "0.4rem" }}>
              รหัสผ่าน / Password
            </label>
            <input style={neu.input} type="password" placeholder="••••••••"
              value={loginForm.password}
              onChange={e => setLoginForm(p => ({...p, password: e.target.value}))}
              onKeyDown={e => e.key === "Enter" && handleLogin()}/>
          </div>

          {authError && (
            <div style={{ 
              background: "#fee", border: "1px solid #fcc", borderRadius: 10,
              padding: "0.6rem 1rem", color: COLORS.crimson, fontSize: "0.85rem",
              marginBottom: "1rem", textAlign: "center"
            }}>{authError}</div>
          )}

          <button onClick={handleLogin} style={{
            ...neu.button, width: "100%", padding: "1rem",
            fontSize: "1rem", fontFamily: "'Sarabun', Georgia, serif",
            letterSpacing: "0.05em"
          }}>
            🏆 เข้าสู่ระบบ / Login
          </button>

          <div style={{ textAlign: "center", marginTop: "1.2rem" }}>
            <span style={{ fontSize: "0.85rem", color: COLORS.goldDark }}>
              ยังไม่มีบัญชี? / No account?{" "}
            </span>
            <button onClick={() => { setAuthError(""); setScreen("register"); }} style={{
              background: "none", border: "none", color: COLORS.sapphire,
              fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem",
              fontFamily: "'Sarabun', Georgia, serif", textDecoration: "underline"
            }}>สมัครสมาชิก / Register</button>
          </div>

          {/* Demo accounts */}
          <div style={{ 
            marginTop: "1.5rem", padding: "0.8rem", 
            background: "rgba(201,168,76,0.08)", borderRadius: 12,
            border: "1px dashed rgba(201,168,76,0.3)"
          }}>
            <div style={{ fontSize: "0.72rem", color: COLORS.goldDark, fontWeight: "bold", marginBottom: "0.4rem" }}>
              🎯 Demo Accounts:
            </div>
            <div style={{ fontSize: "0.7rem", color: COLORS.inkMid, lineHeight: 1.8 }}>
              Student: student@demo.com / demo123<br/>
              Teacher: teacher@demo.com / demo123
            </div>
            <button onClick={() => {
              SimDB.createUser("student@demo.com","demo123","Demo Student","student");
              SimDB.createUser("teacher@demo.com","demo123","Teacher Marv","teacher");
              setLoginForm({email:"student@demo.com",password:"demo123"});
            }} style={{
              ...neu.buttonInset, padding: "0.3rem 0.8rem", fontSize: "0.7rem",
              cursor: "pointer", marginTop: "0.4rem", color: COLORS.goldDark,
              fontFamily: "Georgia, serif"
            }}>Load Demo Accounts</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ---- REGISTER ----
  if (screen === "register") return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sarabun', Georgia, serif", padding: "1.5rem", position: "relative"
    }}>
      <LaiThaiPattern/>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)"/>
      </svg>

      <div style={{ ...neu.card, padding: "2rem", width: "100%", maxWidth: 420, position: "relative", overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <button onClick={() => { setAuthError(""); setScreen("login"); }} style={{
            background:"none", border:"none", color: COLORS.goldDark,
            cursor:"pointer", fontSize:"0.85rem", marginBottom:"1rem",
            fontFamily:"Georgia,serif"
          }}>← กลับ / Back</button>

          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: COLORS.inkDark }}>
              สมัครสมาชิก / Register
            </div>
          </div>

          {[
            { label: "ชื่อ / Name", key: "name", type: "text", ph: "Your name / ชื่อของคุณ" },
            { label: "อีเมล / Email", key: "email", type: "email", ph: "your@email.com" },
            { label: "รหัสผ่าน / Password", key: "password", type: "password", ph: "อย่างน้อย 6 ตัว / min 6 chars" },
            { label: "ยืนยันรหัสผ่าน / Confirm Password", key: "confirm", type: "password", ph: "••••••••" },
          ].map(field => (
            <div key={field.key} style={{ marginBottom: "0.9rem" }}>
              <label style={{ fontSize: "0.78rem", color: COLORS.goldDark, fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
                {field.label}
              </label>
              <input style={neu.input} type={field.type} placeholder={field.ph}
                value={regForm[field.key]}
                onChange={e => setRegForm(p => ({...p, [field.key]: e.target.value}))}/>
            </div>
          ))}

          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ fontSize: "0.78rem", color: COLORS.goldDark, fontWeight: "bold", display: "block", marginBottom: "0.3rem" }}>
              บทบาท / Role
            </label>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {["student", "teacher"].map(role => (
                <button key={role} onClick={() => setRegForm(p => ({...p, role}))} style={{
                  flex: 1, padding: "0.7rem",
                  ...(regForm.role === role ? neu.button : neu.buttonInset),
                  color: regForm.role === role ? COLORS.inkDark : COLORS.goldDark,
                  fontFamily: "Georgia, serif", fontSize: "0.85rem",
                  cursor: "pointer"
                }}>
                  {role === "student" ? "👨‍🎓 Student\nนักเรียน" : "👨‍🏫 Teacher\nครู"}
                </button>
              ))}
            </div>
          </div>

          {authError && (
            <div style={{ 
              background: "#fee", border: "1px solid #fcc", borderRadius: 10,
              padding: "0.6rem 1rem", color: COLORS.crimson, fontSize: "0.85rem",
              marginBottom: "1rem", textAlign: "center"
            }}>{authError}</div>
          )}

          <button onClick={handleRegister} style={{
            ...neu.button, width: "100%", padding: "1rem",
            fontSize: "1rem", fontFamily: "'Sarabun', Georgia, serif"
          }}>
            🏆 สมัครสมาชิก / Create Account
          </button>
        </div>
      </div>
    </div>
  );

  // ---- EXAM INTRO ----
  if (screen === "examIntro") return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'Sarabun', Georgia, serif", padding: "1.5rem", position: "relative"
    }}>
      <LaiThaiPattern/>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
        <rect width="100%" height="100%" fill="url(#laithai)"/>
      </svg>
      <div style={{ ...neu.card, padding: "2rem", maxWidth: 480, width: "100%", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
        </svg>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📝</div>
          <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: COLORS.inkDark, marginBottom: "0.5rem" }}>
            Baseline Entry Exam
          </div>
          <div style={{ fontSize: "1rem", color: COLORS.goldDark, marginBottom: "1.5rem" }}>
            ข้อสอบวัดระดับเริ่มต้น
          </div>
          <div style={{ ...neu.buttonInset, padding: "1.2rem", marginBottom: "1.5rem", textAlign: "left" }}>
            {[
              ["📊", "15 questions • 4 categories", "15 ข้อ • 4 หมวด"],
              ["⏱️", "No time limit for this exam", "ไม่จำกัดเวลา"],
              ["🗺️", "Creates your personal Skill Map", "สร้างแผนทักษะส่วนตัวของคุณ"],
              ["🔓", "Unlocks your learning path", "ปลดล็อคเส้นทางการเรียน"],
            ].map(([icon, en, th], i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.7rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "0.85rem", color: COLORS.inkDark, fontWeight: "bold" }}>{en}</div>
                  <div style={{ fontSize: "0.75rem", color: COLORS.goldDark }}>{th}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.85rem", color: COLORS.goldDark, marginBottom: "1.5rem", fontStyle: "italic" }}>
            สวัสดี {user?.name}! พร้อมแล้วหรือยัง? Ready? 🙏
          </div>
          <button onClick={() => {
            setExamState({ current: 0, answers: {}, started: true, finished: false });
            setScreen("exam");
          }} style={{
            ...neu.button, width: "100%", padding: "1rem",
            fontSize: "1.05rem", fontFamily: "'Sarabun', Georgia, serif"
          }}>
            🚀 เริ่มสอบ / Start Exam
          </button>
        </div>
      </div>
    </div>
  );

  // ---- EXAM ----
  if (screen === "exam") {
    const q = examQuestions[examState.current];
    const progress_pct = Math.round((examState.current / examQuestions.length) * 100);
    const selected = examState.answers[q.id];
    const catColors = { Grammar: COLORS.sapphire, Vocabulary: COLORS.emerald, Conversation: COLORS.crimson, Reading: COLORS.goldDark };

    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
        fontFamily: "'Sarabun', Georgia, serif", padding: "1.2rem", position: "relative"
      }}>
        <LaiThaiPattern/>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)"/>
        </svg>
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
          {/* Progress bar */}
          <div style={{ marginBottom: "1.2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ color: COLORS.goldLight, fontSize: "0.8rem" }}>
                Question {examState.current + 1} of {examQuestions.length}
              </span>
              <span style={{ color: COLORS.gold, fontSize: "0.8rem" }}>{progress_pct}%</span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ 
                width: `${progress_pct}%`, height: "100%",
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
                borderRadius: 4, transition: "width 0.4s ease"
              }}/>
            </div>
          </div>

          {/* Question card */}
          <div style={{ ...neu.card, padding: "1.8rem", position: "relative", overflow: "hidden", marginBottom: "1rem" }}>
            <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
            </svg>
            <div style={{ position: "relative" }}>
              <div style={{ 
                display: "inline-block", padding: "0.2rem 0.8rem", borderRadius: 20,
                background: `${catColors[q.category]}22`,
                border: `1px solid ${catColors[q.category]}55`,
                color: catColors[q.category], fontSize: "0.72rem", fontWeight: "bold",
                marginBottom: "1rem"
              }}>{q.category}</div>

              <div style={{ fontSize: "1rem", fontWeight: "bold", color: COLORS.inkDark, lineHeight: 1.6, marginBottom: "0.5rem" }}>
                {q.q}
              </div>
              <div style={{ fontSize: "0.82rem", color: COLORS.goldDark, marginBottom: "1.2rem", fontStyle: "italic" }}>
                {q.qTh}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
                {q.options.map((opt, i) => (
                  <button key={i} onClick={() => handleExamAnswer(q.id, i)} style={{
                    padding: "0.8rem",
                    background: selected === i 
                      ? `linear-gradient(145deg, ${COLORS.gold}, ${COLORS.goldDark})`
                      : COLORS.ivoryDark,
                    borderRadius: 14,
                    boxShadow: selected === i
                      ? `inset 2px 2px 6px rgba(0,0,0,0.2), 0 0 12px ${COLORS.glow}`
                      : `3px 3px 8px rgba(0,0,0,0.12), -2px -2px 6px rgba(255,255,255,0.8)`,
                    border: selected === i ? `2px solid ${COLORS.gold}` : `1px solid rgba(201,168,76,0.15)`,
                    color: selected === i ? "#fff" : COLORS.inkDark,
                    cursor: "pointer",
                    fontFamily: "'Sarabun', Georgia, serif",
                    fontSize: "0.85rem", textAlign: "left",
                    transition: "all 0.15s", lineHeight: 1.4
                  }}>
                    <span style={{ opacity: 0.6, marginRight: "0.4rem", fontSize: "0.75rem" }}>
                      {["A","B","C","D"][i]}.
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: "0.8rem" }}>
            {examState.current > 0 && (
              <button onClick={() => setExamState(p => ({...p, current: p.current - 1}))} style={{
                ...neu.buttonInset, padding: "0.8rem 1.5rem", cursor: "pointer",
                color: COLORS.goldDark, fontFamily: "Georgia, serif", fontSize: "0.9rem"
              }}>← ก่อนหน้า</button>
            )}
            <button
              onClick={() => {
                if (examState.current < examQuestions.length - 1) {
                  setExamState(p => ({...p, current: p.current + 1}));
                } else {
                  handleExamSubmit();
                }
              }}
              disabled={selected === undefined}
              style={{
                ...neu.button, flex: 1, padding: "0.9rem",
                opacity: selected === undefined ? 0.4 : 1,
                cursor: selected === undefined ? "not-allowed" : "pointer",
                fontFamily: "Georgia, serif", fontSize: "0.95rem"
              }}>
              {examState.current < examQuestions.length - 1 
                ? "ถัดไป / Next →" 
                : "🏁 ส่งคำตอบ / Submit"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- EXAM RESULTS ----
  if (screen === "examResults") {
    const s = examState.score;
    const medal = s >= 90 ? "🥇" : s >= 70 ? "🥈" : s >= 50 ? "🥉" : "📚";
    const msgEn = s >= 90 ? "Outstanding! You're already a Champion!" 
      : s >= 70 ? "Great foundation! Let's strengthen the gaps."
      : s >= 50 ? "Good start! Lots of growth ahead."
      : "Every champion starts somewhere. Let's go!";
    const msgTh = s >= 90 ? "ยอดเยี่ยมมาก! คุณเป็นแชมป์แล้ว!"
      : s >= 70 ? "พื้นฐานดีมาก! มาเสริมจุดอ่อนกัน"
      : s >= 50 ? "เริ่มต้นดี! มีการพัฒนาอีกเยอะเลย"
      : "แชมป์ทุกคนเริ่มจากจุดเดียวกัน ไปกันเลย!";

    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
        fontFamily: "'Sarabun', Georgia, serif", padding: "1.5rem", position: "relative"
      }}>
        <LaiThaiPattern/>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)"/>
        </svg>
        <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
          {/* Score hero */}
          <div style={{ ...neu.card, padding: "2rem", textAlign: "center", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
            </svg>
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "4rem", marginBottom: "0.5rem" }}>{medal}</div>
              <div style={{ fontSize: "3rem", fontWeight: "bold", color: COLORS.goldDark }}>{s}%</div>
              <div style={{ fontSize: "1rem", color: COLORS.inkMid, marginBottom: "0.3rem" }}>
                {examState.correct} / {examQuestions.length} correct • ถูก
              </div>
              <div style={{ fontSize: "1rem", fontWeight: "bold", color: COLORS.inkDark, marginBottom: "0.3rem" }}>{msgEn}</div>
              <div style={{ fontSize: "0.9rem", color: COLORS.goldDark, fontStyle: "italic" }}>{msgTh}</div>
            </div>
          </div>

          {/* Skill map */}
          <SkillMap examAttempts={progress?.examAttempts}/>

          <div style={{ marginTop: "1.2rem" }}>
            <button onClick={() => setScreen("studentDash")} style={{
              ...neu.button, width: "100%", padding: "1rem",
              fontSize: "1rem", fontFamily: "'Sarabun', Georgia, serif"
            }}>
              🚀 เริ่มเรียน / Start Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- STUDENT DASHBOARD ----
  if (screen === "studentDash") {
    const prog = progress || {};
    const unitProg = prog.unitProgress || {};
    const completedUnits = Object.values(unitProg).filter(u => u.completed).length;
    const totalStars = Object.values(unitProg).reduce((a, u) => a + (u.stars || 0), 0);
    const overallPct = Math.round((completedUnits / 11) * 100);

    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
        fontFamily: "'Sarabun', Georgia, serif", padding: "1rem", position: "relative"
      }}>
        <LaiThaiPattern/>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)"/>
        </svg>
        <div style={{ maxWidth: 600, margin: "0 auto", position: "relative" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
            <div>
              <div style={{ color: COLORS.goldLight, fontSize: "1.1rem", fontWeight: "bold" }}>
                🏆 English Champion
              </div>
              <div style={{ color: COLORS.gold, fontSize: "0.75rem" }}>
                สวัสดี {user?.name}! 🙏
              </div>
            </div>
            <button onClick={logout} style={{
              ...neu.buttonInset, padding: "0.4rem 0.9rem",
              cursor: "pointer", color: COLORS.goldDark,
              fontFamily: "Georgia, serif", fontSize: "0.78rem"
            }}>ออก / Logout</button>
          </div>

          {/* Stats row */}
          <div style={{ ...neu.card, padding: "1.2rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
            </svg>
            <div style={{ position: "relative", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem" }}>
              <ProgressRing percent={overallPct} size={80} color={COLORS.gold} label="Overall" sublabel="ภาพรวม"/>
              <ProgressRing percent={prog.baselineScore || 0} size={80} color={COLORS.emerald} label="Baseline" sublabel="คะแนนเริ่มต้น"/>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: COLORS.goldDark }}>{totalStars}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: COLORS.inkDark }}>Stars ⭐</div>
                <div style={{ fontSize: "0.65rem", color: COLORS.goldDark }}>ดาว / max {11*4}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: COLORS.sapphire }}>{completedUnits}</div>
                <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: COLORS.inkDark }}>Units ✅</div>
                <div style={{ fontSize: "0.65rem", color: COLORS.goldDark }}>หน่วย / 11</div>
              </div>
            </div>
          </div>

          {/* Skill map */}
          {prog.examAttempts?.length > 0 && (
            <div style={{ marginBottom: "1.2rem" }}>
              <SkillMap examAttempts={prog.examAttempts}/>
            </div>
          )}

          {/* Units grid */}
          <div style={{ marginBottom: "0.8rem" }}>
            <div style={{ color: COLORS.goldLight, fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.6rem" }}>
              📚 Your Units • หน่วยเรียนของคุณ
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.8rem" }}>
              {Array.from({length: 11}, (_, i) => i + 1).map(n => (
                <UnitCard key={n} unitNum={n} progress={unitProg[n]}
                  onClick={() => alert(`Unit ${n} — Full content coming in next update! 🏆`)}/>
              ))}
            </div>
          </div>

          {/* Retake exam */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <button onClick={() => {
              setExamState({ current: 0, answers: {}, started: true, finished: false });
              setScreen("exam");
            }} style={{
              ...neu.buttonInset, padding: "0.7rem 1.5rem",
              cursor: "pointer", color: COLORS.goldDark,
              fontFamily: "Georgia, serif", fontSize: "0.85rem"
            }}>📝 Retake Baseline Exam • สอบใหม่</button>
          </div>
        </div>
      </div>
    );
  }

  // ---- TEACHER DASHBOARD ----
  if (screen === "teacherDash") {
    const students = SimDB.getAllStudents();
    return (
      <div style={{
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${COLORS.inkDark} 0%, ${COLORS.inkMid} 60%, #3d2800 100%)`,
        fontFamily: "'Sarabun', Georgia, serif", padding: "1rem", position: "relative"
      }}>
        <LaiThaiPattern/>
        <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
          <rect width="100%" height="100%" fill="url(#laithai)"/>
        </svg>
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <div style={{ color: COLORS.goldLight, fontSize: "1.2rem", fontWeight: "bold" }}>
                👨‍🏫 Teacher Dashboard
              </div>
              <div style={{ color: COLORS.gold, fontSize: "0.8rem" }}>
                สวัสดี {user?.name}! แดชบอร์ดครู
              </div>
            </div>
            <button onClick={logout} style={{
              ...neu.buttonInset, padding: "0.4rem 0.9rem",
              cursor: "pointer", color: COLORS.goldDark,
              fontFamily: "Georgia, serif", fontSize: "0.78rem"
            }}>ออก / Logout</button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.8rem", marginBottom: "1.5rem" }}>
            {[
              { icon: "👨‍🎓", num: students.length, label: "Students", th: "นักเรียน" },
              { icon: "📝", num: students.filter(s => SimDB.getProgress(s.id).baselineCompleted).length, label: "Exams Done", th: "สอบแล้ว" },
              { icon: "⭐", num: students.reduce((a, s) => {
                const p = SimDB.getProgress(s.id);
                return a + Object.values(p.unitProgress || {}).reduce((b, u) => b + (u.stars||0), 0);
              }, 0), label: "Total Stars", th: "ดาวรวม" },
            ].map((stat, i) => (
              <div key={i} style={{ ...neu.card, padding: "1rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
                  <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
                </svg>
                <div style={{ position: "relative" }}>
                  <div style={{ fontSize: "1.8rem" }}>{stat.icon}</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: COLORS.goldDark }}>{stat.num}</div>
                  <div style={{ fontSize: "0.75rem", color: COLORS.inkDark, fontWeight: "bold" }}>{stat.label}</div>
                  <div style={{ fontSize: "0.65rem", color: COLORS.goldDark }}>{stat.th}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Student list */}
          <div style={{ ...neu.card, padding: "1.5rem", position: "relative", overflow: "hidden" }}>
            <svg width="100%" height="100%" style={{position:"absolute",inset:0,pointerEvents:"none"}}>
              <rect width="100%" height="100%" fill="url(#laithai)" rx="24"/>
            </svg>
            <div style={{ position: "relative" }}>
              <div style={{ fontWeight: "bold", color: COLORS.goldDark, marginBottom: "1rem" }}>
                📊 Student Progress • ความก้าวหน้านักเรียน
              </div>
              {students.length === 0 ? (
                <div style={{ textAlign: "center", color: COLORS.goldDark, padding: "2rem", fontStyle: "italic" }}>
                  No students yet. Share the app link! 🔗<br/>
                  ยังไม่มีนักเรียน แชร์ลิงก์แอปได้เลย!
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {students.map(s => {
                    const sp = SimDB.getProgress(s.id);
                    const stars = Object.values(sp.unitProgress || {}).reduce((a, u) => a + (u.stars||0), 0);
                    const completed = Object.values(sp.unitProgress || {}).filter(u => u.completed).length;
                    return (
                      <div key={s.id} style={{
                        ...neu.buttonInset, padding: "0.9rem 1.2rem",
                        display: "flex", alignItems: "center", gap: "1rem"
                      }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%",
                          background: `linear-gradient(135deg, ${COLORS.gold}, ${COLORS.goldDark})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: "bold", fontSize: "1rem", flexShrink: 0
                        }}>{s.name?.charAt(0).toUpperCase()}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: "bold", color: COLORS.inkDark, fontSize: "0.9rem" }}>{s.name}</div>
                          <div style={{ fontSize: "0.72rem", color: COLORS.goldDark }}>{s.email}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: "0.8rem", color: COLORS.emerald, fontWeight: "bold" }}>
                            {sp.baselineScore !== null ? `${sp.baselineScore}% baseline` : "Not started"}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: COLORS.goldDark }}>
                            {completed}/11 units • {stars}⭐
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
