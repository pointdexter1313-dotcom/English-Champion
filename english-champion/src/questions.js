import { useState, useEffect, useRef } from "react";

// ============================================================
// THAI COLOR PALETTE
// ============================================================
const C = {
  gold: "#C9A84C",
  goldLight: "#F4E4A1"
};

const sections = [
  {
    id: "fill", title: "Fill in the Blank", titleTh: "เติมคำในช่องว่าง", icon: "✏️",
    questions: [
      { sentence: "The _____ dog ran quickly.", blank: "big", options: ["big", "run", "quickly", "and"], hint: "What describes the dog?", hintTh: "อะไรขยายหมา?" },
      { sentence: "She _____ to school every day.", blank: "walks", options: ["beautiful", "walks", "under", "wow"], hint: "What action does she do?", hintTh: "เธอทำอะไร?" },
      { sentence: "The cat sat _____ the table.", blank: "under", options: ["quickly", "big", "under", "and"], hint: "Where is the cat?", hintTh: "แมวอยู่ที่ไหน?" },
      { sentence: "Tom _____ Sara are best friends.", blank: "and", options: ["but", "and", "wow", "she"], hint: "Which word connects two names?", hintTh: "คำไหนเชื่อมสองชื่อ?" }
    ]
  },
  {
    id: "mcq", title: "Multiple Choice", titleTh: "คำถามหลายตัวเลือก", icon: "🎯",
    questions: [
      { sentence: "Choose the correct word.", blank: "", options: ["A", "B", "C", "D"], hint: "Sample", hintTh: "ตัวอย่าง" }
    ]
  }
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(null);
  const [score, setScore] = useState(0);

  return (
    <div style={{ background: C.goldLight, minHeight: "100vh", padding: "2rem", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ color: C.gold, textAlign: "center" }}>🏆 English Champion 🏆</h1>
        
        {!currentSection ? (
          <div>
            <p style={{ textAlign: "center", color: "#666" }}>Select a module to start learning / เลือกบทเรียนเพื่อเริ่มเรียนรู้</p>
            <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
              {sections.map((sec) => (
                <button 
                  key={sec.id} 
                  onClick={() => setCurrentSection(sec)}
                  style={{ background: C.gold, color: "#fff", border: "none", padding: "1rem", borderRadius: "8px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  {sec.icon} {sec.title} ({sec.titleTh})
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setCurrentSection(null)}
              style={{ background: "#eee", border: "none", padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer", marginBottom: "1rem" }}
            >
              ⬅ Back / กลับ
            </button>
            <h2>{currentSection.title}</h2>
            <p style={{ color: "#666" }}>Quiz interface loaded successfully! Keep building your questions here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
