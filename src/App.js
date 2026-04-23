import { useState, useEffect } from "react";

const COLORS = {
  class:   { bg: "#f59e0b", text: "#1a1207", label: "📚 Class" },
  dev:     { bg: "#3b82f6", text: "#fff",    label: "💻 DEV Study" },
  inf:     { bg: "#10b981", text: "#fff",    label: "🗄️ INF Study" },
  tep:     { bg: "#8b5cf6", text: "#fff",    label: "⚙️ TEP Study" },
  hci:     { bg: "#ec4899", text: "#fff",    label: "🎨 HCI Study" },
  project: { bg: "#f97316", text: "#fff",    label: "🚀 Side Projects" },
  review:  { bg: "#06b6d4", text: "#fff",    label: "🔍 Review" },
  break:   { bg: "#374151", text: "#9ca3af", label: "☕ Break / Meals" },
  free:    { bg: "#1f2937", text: "#4b5563", label: "😴 Rest" },
};

const schedule = {
  Monday: [
    { time: "6:30–7:30",   type: "break",   label: "Wake up & Breakfast" },
    { time: "8:00–10:00",  type: "class",   label: "CLASS: Development Software II" },
    { time: "10:00–11:30", type: "dev",     label: "DEV Review — Notes & Code Practice" },
    { time: "11:30–12:30", type: "inf",     label: "INF Pre-study (Prep for class)" },
    { time: "12:30–1:00",  type: "break",   label: "Lunch" },
    { time: "1:00–3:00",   type: "class",   label: "CLASS: Information Systems II" },
    { time: "3:00–4:00",   type: "inf",     label: "INF Review — Consolidate notes" },
    { time: "4:00–4:30",   type: "break",   label: "Break" },
    { time: "4:30–6:30",   type: "project", label: "Side Projects (Student Mgmt / Expense Tracker)" },
    { time: "6:30–7:30",   type: "break",   label: "Dinner" },
    { time: "7:30–9:00",   type: "hci",     label: "HCI Study — Theory & UI Principles" },
    { time: "9:00–10:00",  type: "tep",     label: "TEP Practice — Coding Exercises" },
  ],
  Tuesday: [
    { time: "6:30–7:30",   type: "break",   label: "Wake up & Breakfast" },
    { time: "8:00–10:00",  type: "class",   label: "CLASS: Human Computer Interaction I" },
    { time: "10:00–11:00", type: "hci",     label: "HCI Review — Apply concepts, sketches" },
    { time: "11:00–12:30", type: "class",   label: "CLASS: Technical Programming I" },
    { time: "12:30–1:30",  type: "break",   label: "Lunch" },
    { time: "1:30–3:30",   type: "tep",     label: "TEP Deep Practice — Solve problems" },
    { time: "3:30–4:00",   type: "break",   label: "Break" },
    { time: "4:00–6:00",   type: "project", label: "Side Projects (Job Board / Freelance HTML)" },
    { time: "6:00–7:00",   type: "break",   label: "Dinner" },
    { time: "7:00–8:30",   type: "dev",     label: "DEV Self-study — Next topic preview" },
    { time: "8:30–9:30",   type: "inf",     label: "INF Study — Past questions practice" },
  ],
  Wednesday: [
    { time: "6:30–7:30",   type: "break",   label: "Wake up & Breakfast" },
    { time: "8:00–10:00",  type: "class",   label: "CLASS: Information Systems II" },
    { time: "10:00–11:00", type: "inf",     label: "INF Review — Diagrams & key concepts" },
    { time: "11:00–12:30", type: "class",   label: "CLASS: Development Software II" },
    { time: "12:30–1:00",  type: "break",   label: "Lunch" },
    { time: "1:00–3:00",   type: "class",   label: "CLASS: Human Computer Interaction I" },
    { time: "3:00–4:00",   type: "hci",     label: "HCI Review — Summaries & design notes" },
    { time: "4:00–4:30",   type: "break",   label: "Break" },
    { time: "4:30–6:30",   type: "project", label: "Side Projects (freeCodeCamp / Portfolio)" },
    { time: "6:30–7:30",   type: "break",   label: "Dinner" },
    { time: "7:30–9:00",   type: "tep",     label: "TEP Study — Algorithms & logic" },
    { time: "9:00–9:30",   type: "review",  label: "Quick daily recap (all 4 modules)" },
  ],
  Thursday: [
    { time: "6:30–7:30",   type: "break",   label: "Wake up & Breakfast" },
    { time: "8:00–10:00",  type: "class",   label: "CLASS: Technical Programming I" },
    { time: "10:00–11:30", type: "tep",     label: "TEP Review — Recode examples from scratch" },
    { time: "11:30–1:00",  type: "dev",     label: "DEV Study — Projects & assignments" },
    { time: "1:00–2:00",   type: "break",   label: "Lunch" },
    { time: "2:00–4:00",   type: "inf",     label: "INF Study — Case studies & past papers" },
    { time: "4:00–4:30",   type: "break",   label: "Break" },
    { time: "4:30–7:00",   type: "project", label: "Side Projects — Client-ready features" },
    { time: "7:00–8:00",   type: "break",   label: "Dinner" },
    { time: "8:00–9:30",   type: "hci",     label: "HCI Study — Past papers & prototyping" },
  ],
  Friday: [
    { time: "8:00–10:00",  type: "dev",     label: "DEV Deep Dive — Code projects & exercises" },
    { time: "10:00–12:00", type: "tep",     label: "TEP Practice — Full problems & debugging" },
    { time: "12:00–1:00",  type: "break",   label: "Lunch" },
    { time: "1:00–3:00",   type: "inf",     label: "INF Study — Theory, ERDs & assignments" },
    { time: "3:00–3:30",   type: "break",   label: "Break" },
    { time: "3:30–5:00",   type: "hci",     label: "HCI — UI sketches & usability concepts" },
    { time: "5:00–8:00",   type: "project", label: "🚀 BIG Side Project Session — Build & ship" },
    { time: "8:00–10:00",  type: "free",    label: "Free time — Gaming / Soccer" },
  ],
  Saturday: [
    { time: "9:00–10:00",  type: "break",   label: "Morning — Rest & Breakfast" },
    { time: "10:00–12:00", type: "review",  label: "Weekly Review — All 4 subjects" },
    { time: "12:00–1:00",  type: "dev",     label: "DEV Past Papers" },
    { time: "1:00–2:00",   type: "break",   label: "Lunch" },
    { time: "2:00–4:00",   type: "project", label: "Side Projects — Polish, deploy, document" },
    { time: "4:00–6:00",   type: "inf",     label: "INF / TEP Problem Sets" },
    { time: "6:00+",       type: "free",    label: "Evening Free — Gaming / Soccer / Relax" },
  ],
  Sunday: [
    { time: "9:00–10:00",  type: "break",   label: "Morning — Rest & Breakfast" },
    { time: "10:00–11:30", type: "review",  label: "Catch-up — Anything behind this week" },
    { time: "11:30–1:00",  type: "hci",     label: "HCI + INF Light Study" },
    { time: "1:00–2:00",   type: "break",   label: "Lunch" },
    { time: "2:00–4:00",   type: "project", label: "Side Projects (freeCodeCamp / portfolio)" },
    { time: "4:00+",       type: "free",    label: "Total Rest — Recharge for the week" },
  ],
};

const tips = [
  { icon: "🎯", text: "Review within 24h of every class — memory retention spikes from 40% to 80%." },
  { icon: "💡", text: "For TEP & DEV: recode examples from scratch without looking." },
  { icon: "📝", text: "For INF & HCI: make 1-page summaries per topic, then test yourself." },
  { icon: "🚀", text: "Side projects = freelance income + portfolio. Keep them client-ready." },
  { icon: "😴", text: "Sleep 7–8 hrs. Sleep is where memory consolidates." },
];

const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const subjectTypes = [
  { key: "dev", label: "DEV II", color: "#3b82f6" },
  { key: "inf", label: "INF II", color: "#10b981" },
  { key: "tep", label: "TEP I",  color: "#8b5cf6" },
  { key: "hci", label: "HCI I",  color: "#ec4899" },
];

export default function Timetable() {
  const [activeDay, setActiveDay] = useState("Monday");
  const [showLegend, setShowLegend] = useState(false);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("timetable-completed");
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("timetable-completed", JSON.stringify(completed));
  }, [completed]);

  const toggleSlot = (day, index) => {
    const key = `${day}-${index}`;
    setCompleted(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setCompleted({});
    localStorage.removeItem("timetable-completed");
  };

  const getSubjectProgress = (subjectKey) => {
    let total = 0, done = 0;
    days.forEach(day => {
      schedule[day].forEach((slot, i) => {
        if (slot.type === subjectKey) {
          total++;
          if (completed[`${day}-${i}`]) done++;
        }
      });
    });
    return { total, done, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
  };

  const todaySlots = schedule[activeDay];
  const todayDone = todaySlots.filter((_, i) => completed[`${activeDay}-${i}`]).length;
  const todayPct = Math.round((todayDone / todaySlots.length) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      background: "linear-gradient(135deg, #0f0c1a 0%, #0a1628 50%, #0f1a0a 100%)",
      fontFamily: "'Georgia', serif",
      color: "#e2e8f0",
      boxSizing: "border-box",
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, rgba(245,158,11,0.15), rgba(16,185,129,0.1))",
        borderBottom: "1px solid rgba(245,158,11,0.3)",
        padding: "16px",
      }}>
        <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#f59e0b", marginBottom: "4px", fontFamily: "monospace" }}>
          WALTER SISULU UNIVERSITY · ICT IN APPLICATIONS DEVELOPMENT
        </div>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
          Semester 2 Study Timetable
        </h1>
        <div style={{ fontSize: "12px", color: "#6ee7b7", marginBottom: "12px" }}>
          Target: <strong style={{ color: "#f59e0b" }}>90% Average</strong> · DEV II · INF II · TEP I · HCI I
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => setShowLegend(!showLegend)} style={{
            background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)",
            color: "#f59e0b", padding: "8px 14px", borderRadius: "8px", cursor: "pointer",
            fontSize: "12px", fontFamily: "monospace",
          }}>
            {showLegend ? "Hide" : "Show"} Legend
          </button>
          <button onClick={resetAll} style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171", padding: "8px 14px", borderRadius: "8px", cursor: "pointer",
            fontSize: "12px", fontFamily: "monospace",
          }}>
            Reset All
          </button>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div style={{
          background: "rgba(0,0,0,0.4)", borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "12px 16px", display: "flex", flexWrap: "wrap", gap: "10px",
        }}>
          {Object.entries(COLORS).filter(([k]) => k !== "free").map(([key, val]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: val.bg, flexShrink: 0 }} />
              <span style={{ color: "#cbd5e1" }}>{val.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      <div style={{ padding: "12px 16px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px", padding: "14px", marginBottom: "10px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#64748b", fontFamily: "monospace" }}>
              TODAY — {activeDay.toUpperCase()}
            </span>
            <span style={{ fontSize: "12px", color: "#f59e0b", fontFamily: "monospace" }}>
              {todayDone}/{todaySlots.length} · {todayPct}%
            </span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "99px", height: "8px", overflow: "hidden" }}>
            <div style={{
              width: `${todayPct}%`, height: "100%",
              background: "linear-gradient(90deg, #f59e0b, #10b981)",
              borderRadius: "99px", transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {subjectTypes.map(sub => {
            const { total, done, pct } = getSubjectProgress(sub.key);
            return (
              <div key={sub.key} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "10px", padding: "10px 12px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "12px", color: sub.color, fontFamily: "monospace", fontWeight: "700" }}>{sub.label}</span>
                  <span style={{ fontSize: "11px", color: "#64748b", fontFamily: "monospace" }}>{pct}%</span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "99px", height: "5px", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: sub.color, borderRadius: "99px", transition: "width 0.4s ease" }} />
                </div>
                <div style={{ fontSize: "10px", color: "#4b5563", marginTop: "4px", fontFamily: "monospace" }}>
                  {done}/{total} sessions
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Tabs */}
      <div style={{
        display: "flex", overflowX: "auto", padding: "0 16px",
        borderBottom: "1px solid rgba(255,255,255,0.06)", gap: "2px",
        msOverflowStyle: "none", scrollbarWidth: "none",
      }}>
        {days.map(day => {
          const isWeekend = day === "Saturday" || day === "Sunday";
          const isActive = activeDay === day;
          const dayDone = schedule[day].filter((_, i) => completed[`${day}-${i}`]).length;
          return (
            <button key={day} onClick={() => setActiveDay(day)} style={{
              padding: "10px 10px", border: "none", cursor: "pointer",
              fontSize: "12px", fontWeight: isActive ? "700" : "400",
              background: isActive ? "rgba(245,158,11,0.2)" : "transparent",
              color: isActive ? "#f59e0b" : isWeekend ? "#6ee7b7" : "#94a3b8",
              borderBottom: isActive ? "2px solid #f59e0b" : "2px solid transparent",
              transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {day.slice(0, 3)}
              {dayDone > 0 && (
                <span style={{
                  marginLeft: "4px", background: "#10b981", color: "#fff",
                  borderRadius: "99px", fontSize: "9px", padding: "1px 5px",
                }}>{dayDone}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Schedule */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        {schedule[activeDay].map((slot, i) => {
          const color = COLORS[slot.type];
          const isClass = slot.type === "class";
          const isDone = !!completed[`${activeDay}-${i}`];
          return (
            <div key={i} onClick={() => toggleSlot(activeDay, i)} style={{
              display: "flex", alignItems: "center", gap: "10px", padding: "12px",
              borderRadius: "10px",
              background: isDone ? "rgba(16,185,129,0.08)" : isClass
                ? "linear-gradient(90deg, rgba(245,158,11,0.2), rgba(245,158,11,0.06))"
                : "rgba(255,255,255,0.03)",
              border: isDone ? "1px solid rgba(16,185,129,0.3)" : isClass
                ? "1px solid rgba(245,158,11,0.4)"
                : "1px solid rgba(255,255,255,0.05)",
              cursor: "pointer", opacity: isDone ? 0.6 : 1, transition: "all 0.2s",
            }}>
              <input
                type="checkbox" checked={isDone}
                onChange={() => toggleSlot(activeDay, i)}
                onClick={e => e.stopPropagation()}
                style={{ cursor: "pointer", accentColor: "#10b981", width: "18px", height: "18px", flexShrink: 0 }}
              />
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color.bg, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "10px", fontFamily: "monospace",
                  color: isClass ? "#f59e0b" : "#64748b", marginBottom: "2px",
                  textDecoration: isDone ? "line-through" : "none",
                }}>
                  {slot.time}
                </div>
                <div style={{
                  fontSize: isClass ? "14px" : "13px", fontWeight: isClass ? "700" : "400",
                  color: isDone ? "#4b5563" : isClass ? "#fde68a" : slot.type === "free" ? "#4b5563" : "#cbd5e1",
                  textDecoration: isDone ? "line-through" : "none", wordBreak: "break-word",
                }}>
                  {slot.label}
                </div>
              </div>
              {isClass && !isDone && (
                <div style={{
                  background: "rgba(245,158,11,0.2)", border: "1px solid rgba(245,158,11,0.4)",
                  borderRadius: "6px", padding: "2px 6px", fontSize: "9px",
                  color: "#f59e0b", fontFamily: "monospace", flexShrink: 0,
                }}>GRP2</div>
              )}
              {slot.type === "project" && !isDone && (
                <div style={{
                  background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "6px", padding: "2px 6px", fontSize: "9px",
                  color: "#fb923c", fontFamily: "monospace", flexShrink: 0,
                }}>R1K–R2K</div>
              )}
              {isDone && <span style={{ fontSize: "14px", flexShrink: 0 }}>✅</span>}
            </div>
          );
        })}
      </div>

      {/* Weekly Hours */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px", padding: "16px",
        }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#64748b", marginBottom: "12px", fontFamily: "monospace" }}>
            WEEKLY STUDY HOURS
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {[
              { label: "DEV Study",     hours: "8h",  color: "#3b82f6" },
              { label: "INF Study",     hours: "8h",  color: "#10b981" },
              { label: "TEP Study",     hours: "7h",  color: "#8b5cf6" },
              { label: "HCI Study",     hours: "7h",  color: "#ec4899" },
              { label: "Classes",       hours: "14h", color: "#f59e0b" },
              { label: "Side Projects", hours: "12h", color: "#f97316" },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "8px 10px",
              }}>
                <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: item.color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff" }}>{item.hours}</div>
                  <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: "0 16px 40px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#64748b", marginBottom: "10px", fontFamily: "monospace" }}>
          90% STRATEGY TIPS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {tips.map((tip, i) => (
            <div key={i} style={{
              display: "flex", gap: "10px", padding: "12px",
              background: "rgba(255,255,255,0.02)", borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.04)",
              fontSize: "12px", color: "#94a3b8", lineHeight: "1.5",
            }}>
              <span style={{ fontSize: "14px", flexShrink: 0 }}>{tip.icon}</span>
              <span>{tip.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
