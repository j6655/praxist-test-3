import React, { useState, useEffect, useRef } from "react";

// ============================================================
// THEME
// ============================================================
const themes = {
  dark: {
    bg: "#0A0A0A",
    surface: "#111",
    border: "#1E1E1E",
    borderLight: "#2A2A2A",
    text: "#F5F5F0",
    textSecondary: "#999",
    textMuted: "#555",
    accent: "#F5F5F0",
    accentBg: "#F5F5F0",
    accentText: "#0A0A0A",
    card: "#141414",
    inputBg: "#111",
    shadow: "none",
  },
  light: {
    bg: "#F8F7F4",
    surface: "#FFFFFF",
    border: "#E8E6E1",
    borderLight: "#D9D7D2",
    text: "#1A1A1A",
    textSecondary: "#666",
    textMuted: "#AAA",
    accent: "#1A1A1A",
    accentBg: "#1A1A1A",
    accentText: "#F8F7F4",
    card: "#FFFFFF",
    inputBg: "#F0EFEC",
    shadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
};

// ============================================================
// ONBOARDING QUESTIONS
// ============================================================
const onboardingQuestions = [
  {
    id: 0,
    question: "What are you trying to improve?",
    subtitle: "Choose what matters most right now.",
    options: [
      { label: "Discipline" },
      { label: "Inner Peace" },
      { label: "Confidence" },
      { label: "Purpose" },
      { label: "Relationships" },
      { label: "Resilience" },
    ],
    multi: true,
  },
  {
    id: 1,
    question: "How are you feeling lately?",
    subtitle: "Be honest. No wrong answers.",
    options: [
      { label: "Overwhelmed" },
      { label: "Lost" },
      { label: "Motivated" },
      { label: "Curious" },
      { label: "Anxious" },
      { label: "Calm" },
    ],
    multi: false,
  },
  {
    id: 2,
    question: "What kind of thinking draws you in?",
    subtitle: "Pick the schools that resonate.",
    options: [
      { label: "Stoicism" },
      { label: "Existentialism" },
      { label: "Eastern" },
      { label: "Absurdism" },
      { label: "Pragmatism" },
      { label: "Surprise Me" },
    ],
    multi: true,
  },
  {
    id: 3,
    question: "When do you reflect?",
    subtitle: "We'll time your quotes around this.",
    options: [
      { label: "Morning" },
      { label: "Midday" },
      { label: "Evening" },
      { label: "Late Night" },
    ],
    multi: false,
  },
  {
    id: 4,
    question: "What's your goal?",
    subtitle: "What should this app do for you?",
    options: [
      { label: "Daily motivation" },
      { label: "Deeper thinking" },
      { label: "Emotional resilience" },
      { label: "Learn philosophy" },
      { label: "Self-discipline" },
    ],
    multi: false,
  },
  {
    id: 5,
    question: "Which thinkers interest you?",
    subtitle: "Select all that apply.",
    options: [
      { label: "Socrates", desc: "Father of Western philosophy. Championed critical thinking through relentless questioning." },
      { label: "Plato", desc: "Socrates' student. Explored reality vs. perception and founded the Academy in Athens." },
      { label: "Aristotle", desc: "Master of logic, science, and ethics. Shaped nearly every field of knowledge." },
      { label: "Marcus Aurelius", desc: "Roman emperor and Stoic. Promoted self-discipline, reason, and virtue." },
      { label: "Confucius", desc: "Chinese moral philosopher. Taught respect, family, and social harmony." },
      { label: "René Descartes", desc: "'I think, therefore I am.' Founded modern philosophy through reason and doubt." },
      { label: "Immanuel Kant", desc: "Bridged rationalism and empiricism. Defined modern ethics and moral duty." },
      { label: "Friedrich Nietzsche", desc: "Challenged morality and religion. Pushed for individual strength and self-overcoming." },
      { label: "Karl Marx", desc: "Analyzed capitalism and class struggle. Shaped modern politics and economics." },
      { label: "John Locke", desc: "Championed natural rights and liberty. Influenced modern democracy and the U.S. Constitution." },
      { label: "Jean-Paul Sartre", desc: "Existentialist. Argued for radical freedom and personal responsibility." },
      { label: "Lao Tzu", desc: "Founder of Taoism. Taught simplicity, patience, and living in harmony with nature." },
      { label: "Epictetus", desc: "Born a slave, became a Stoic master. Focused on what you can and cannot control." },
      { label: "Seneca", desc: "Stoic philosopher and advisor to Nero. Wrote on anger, time, and the shortness of life." },
      { label: "Camus", desc: "Absurdist thinker. Argued life has no inherent meaning — and that's okay." },
    ],
    multi: true,
    isScrollList: true,
  },
  {
    id: 6,
    question: "How old are you?",
    subtitle: "This powers your life map. Be exact.",
    options: [],
    multi: false,
    isAgeInput: true,
  },
];

// ============================================================
// SCREEN TIME MOCK DATA
// ============================================================
const screenTimeData = {
  Mon: { total: 4.2, apps: [{ name: "Instagram", hrs: 1.5 }, { name: "YouTube", hrs: 1.2 }, { name: "Twitter", hrs: 0.8 }, { name: "Other", hrs: 0.7 }] },
  Tue: { total: 3.1, apps: [{ name: "Instagram", hrs: 0.8 }, { name: "YouTube", hrs: 1.0 }, { name: "Twitter", hrs: 0.5 }, { name: "Other", hrs: 0.8 }] },
  Wed: { total: 5.0, apps: [{ name: "Instagram", hrs: 2.0 }, { name: "YouTube", hrs: 1.5 }, { name: "Twitter", hrs: 0.8 }, { name: "Other", hrs: 0.7 }] },
  Thu: { total: 2.8, apps: [{ name: "Instagram", hrs: 0.6 }, { name: "YouTube", hrs: 0.9 }, { name: "Twitter", hrs: 0.7 }, { name: "Other", hrs: 0.6 }] },
  Fri: { total: 3.6, apps: [{ name: "Instagram", hrs: 1.2 }, { name: "YouTube", hrs: 1.0 }, { name: "Twitter", hrs: 0.6 }, { name: "Other", hrs: 0.8 }] },
  Sat: { total: 6.1, apps: [{ name: "Instagram", hrs: 2.5 }, { name: "YouTube", hrs: 2.0 }, { name: "Twitter", hrs: 0.8 }, { name: "Other", hrs: 0.8 }] },
  Sun: { total: 4.5, apps: [{ name: "Instagram", hrs: 1.8 }, { name: "YouTube", hrs: 1.2 }, { name: "Twitter", hrs: 0.8 }, { name: "Other", hrs: 0.7 }] },
};

// ============================================================
// FONT OPTIONS
// ============================================================
const fontOptions = [
  { id: "cormorant", name: "Elegant", family: "'Cormorant Garamond', serif", preview: "Aa" },
  { id: "quicksand", name: "Clean", family: "'Quicksand', sans-serif", preview: "Aa" },
  { id: "nunito", name: "Rounded", family: "'Nunito', sans-serif", preview: "Aa" },
];

// ============================================================
// iOS-STYLE SCROLL WHEEL PICKER
// ============================================================
function AgeScrollPicker({ value, onChange, theme: t, mode }) {
  const ITEM_HEIGHT = 44;
  const VISIBLE = 5;
  const MIN_AGE = 1;
  const MAX_AGE = 99;
  const containerRef = useRef(null);
  const scrollingRef = useRef(false);
  const lastYRef = useRef(0);
  const velocityRef = useRef(0);
  const offsetRef = useRef((value - MIN_AGE) * ITEM_HEIGHT);
  const animRef = useRef(null);
  const [, forceRender] = useState(0);

  const totalItems = MAX_AGE - MIN_AGE + 1;
  const maxOffset = (totalItems - 1) * ITEM_HEIGHT;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const snap = (offset) => {
    const idx = Math.round(offset / ITEM_HEIGHT);
    return clamp(idx * ITEM_HEIGHT, 0, maxOffset);
  };

  const getSelectedAge = () => MIN_AGE + Math.round(clamp(offsetRef.current, 0, maxOffset) / ITEM_HEIGHT);

  const animate = () => {
    let vel = velocityRef.current;
    const friction = 0.92;
    const threshold = 0.5;

    const step = () => {
      vel *= friction;
      offsetRef.current = clamp(offsetRef.current + vel, 0, maxOffset);

      if (Math.abs(vel) < threshold) {
        const target = snap(offsetRef.current);
        const diff = target - offsetRef.current;
        if (Math.abs(diff) > 0.5) {
          offsetRef.current += diff * 0.25;
          forceRender((n) => n + 1);
          animRef.current = requestAnimationFrame(step);
        } else {
          offsetRef.current = target;
          forceRender((n) => n + 1);
          onChange(getSelectedAge());
        }
        return;
      }

      forceRender((n) => n + 1);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (e) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    scrollingRef.current = true;
    lastYRef.current = e.clientY;
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!scrollingRef.current) return;
    const dy = lastYRef.current - e.clientY;
    velocityRef.current = dy;
    lastYRef.current = e.clientY;
    offsetRef.current = clamp(offsetRef.current + dy, -ITEM_HEIGHT, maxOffset + ITEM_HEIGHT);
    forceRender((n) => n + 1);
  };

  const handlePointerUp = () => {
    if (!scrollingRef.current) return;
    scrollingRef.current = false;
    animate();
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (animRef.current) cancelAnimationFrame(animRef.current);
    offsetRef.current = clamp(offsetRef.current + e.deltaY * 0.8, 0, maxOffset);
    forceRender((n) => n + 1);

    clearTimeout(handleWheel._t);
    handleWheel._t = setTimeout(() => {
      velocityRef.current = 0;
      animate();
    }, 100);
  };

  useEffect(() => {
    offsetRef.current = (value - MIN_AGE) * ITEM_HEIGHT;
    forceRender((n) => n + 1);
  }, []);

  const currentOffset = offsetRef.current;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
      <div style={{ position: "relative", height: ITEM_HEIGHT * VISIBLE, width: "160px", overflow: "hidden", userSelect: "none", touchAction: "none" }}
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div style={{
          position: "absolute", top: ITEM_HEIGHT * 2, left: 0, right: 0, height: ITEM_HEIGHT,
          background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          borderTop: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: "8px",
          pointerEvents: "none", zIndex: 1,
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2,
          background: `linear-gradient(to bottom, ${t.bg}, ${t.bg}00)`,
          pointerEvents: "none", zIndex: 2,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2,
          background: `linear-gradient(to top, ${t.bg}, ${t.bg}00)`,
          pointerEvents: "none", zIndex: 2,
        }} />
        <div style={{ transform: `translateY(${ITEM_HEIGHT * 2 - currentOffset}px)` }}>
          {Array.from({ length: totalItems }, (_, i) => {
            const age = MIN_AGE + i;
            const distFromCenter = Math.abs(i - currentOffset / ITEM_HEIGHT);
            const opacity = distFromCenter < 0.5 ? 1 : Math.max(0.15, 1 - distFromCenter * 0.3);
            const scale = distFromCenter < 0.5 ? 1 : Math.max(0.85, 1 - distFromCenter * 0.05);
            return (
              <div key={age} style={{
                height: ITEM_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Nunito', sans-serif", fontSize: distFromCenter < 0.5 ? "28px" : "20px",
                fontWeight: distFromCenter < 0.5 ? 800 : 400,
                color: t.text, opacity,
                transform: `scale(${scale})`,
                transition: scrollingRef.current ? "none" : "font-size 0.15s ease, opacity 0.15s ease",
              }}>
                {age}
              </div>
            );
          })}
        </div>
      </div>
      <span style={{ fontSize: "14px", color: t.textMuted, fontWeight: 300, marginTop: "12px" }}>years old</span>
    </div>
  );
}

// ============================================================
// CONFETTI
// ============================================================
function Confetti({ active, theme: t }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const colors = ["#F5F5F0", "#A78BFA", "#F9A8D4", "#EF4444", "#34D399", "#FBBF24", "#60A5FA"];
    const p = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.5 + Math.random() * 1.5,
      size: 4 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      drift: (Math.random() - 0.5) * 60,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }));
    setParticles(p);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {particles.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`,
          top: "-10px",
          width: p.shape === "circle" ? `${p.size}px` : `${p.size * 0.6}px`,
          height: `${p.size}px`,
          background: p.color,
          borderRadius: p.shape === "circle" ? "50%" : "1px",
          opacity: 0,
          animation: `confettiFall ${p.duration}s ${p.delay}s ease-out forwards`,
          transform: `rotate(${p.rotation}deg)`,
          "--drift": `${p.drift}px`,
        }} />
      ))}
    </div>
  );
}

function CelebrationBanner({ active, theme: t }) {
  if (!active) return null;
  return (
    <div style={{
      padding: "16px 20px", marginBottom: "16px",
      background: "transparent",
      borderRadius: "12px",
      border: `1px solid ${t.borderLight}`,
      textAlign: "center",
      animation: "fadeUp 0.4s ease forwards",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "6px" }}>✨</div>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 800, color: t.text, marginBottom: "4px" }}>All done for today!</div>
      <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 300 }}>You showed up. That's what matters.</div>
    </div>
  );
}

// ============================================================
// SCROLLABLE PHILOSOPHER LIST
// ============================================================
function ScrollPhilosopherList({ options, selected, onSelect, theme: t, mode }) {
  const scrollRef = useRef(null);
  const [itemVisibility, setItemVisibility] = useState({});
  const [scrollPos, setScrollPos] = useState({ atTop: true, atBottom: false });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const calculate = () => {
      const rect = container.getBoundingClientRect();
      const atTop = container.scrollTop < 10;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10;
      setScrollPos({ atTop, atBottom });

      const items = container.querySelectorAll("[data-philosopher]");
      const vis = {};
      items.forEach((el) => {
        const r = el.getBoundingClientRect();
        const itemCenter = r.top + r.height / 2;
        const containerTop = rect.top;
        const containerBottom = rect.bottom;
        const fadeZone = 80;

        let opacity = 1;
        let translateY = 0;
        let scale = 1;

        if (!atTop && itemCenter < containerTop + fadeZone) {
          const pct = Math.max(0, (itemCenter - containerTop) / fadeZone);
          opacity = pct * pct;
          translateY = (1 - pct) * -8;
          scale = 0.96 + pct * 0.04;
        }
        if (!atBottom && itemCenter > containerBottom - fadeZone) {
          const pct = Math.max(0, (containerBottom - itemCenter) / fadeZone);
          opacity = pct * pct;
          translateY = (1 - pct) * 8;
          scale = 0.96 + pct * 0.04;
        }

        vis[el.dataset.philosopher] = { opacity, translateY, scale };
      });
      setItemVisibility(vis);
    };

    calculate();
    container.addEventListener("scroll", calculate, { passive: true });
    return () => container.removeEventListener("scroll", calculate);
  }, []);

  return (
    <div style={{ position: "relative", flex: 1, marginBottom: "8px", minHeight: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "60px",
        background: `linear-gradient(to bottom, ${t.bg}, ${t.bg}00)`,
        pointerEvents: "none", zIndex: 2,
        opacity: scrollPos.atTop ? 0 : 1,
        transition: "opacity 0.25s ease",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
        background: `linear-gradient(to top, ${t.bg}, ${t.bg}00)`,
        pointerEvents: "none", zIndex: 2,
        opacity: scrollPos.atBottom ? 0 : 1,
        transition: "opacity 0.25s ease",
      }} />
      <div ref={scrollRef} style={{
        height: "100%", overflowY: "scroll", paddingTop: "8px", paddingBottom: "8px",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none", msOverflowStyle: "none",
      }}>
        {options.map((opt) => {
          const isSel = selected.includes(opt.label);
          const vis = itemVisibility[opt.label] || { opacity: 1, translateY: 0, scale: 1 };
          return (
            <div key={opt.label} data-philosopher={opt.label} style={{
              opacity: vis.opacity,
              transform: `translateY(${vis.translateY}px) scale(${vis.scale})`,
              transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
            }}>
              <button onClick={() => onSelect(opt.label)} style={{
                display: "flex", alignItems: "flex-start", gap: "14px", width: "100%",
                background: isSel ? (mode === "dark" ? "rgba(245,245,240,0.06)" : "rgba(0,0,0,0.03)") : "transparent",
                border: `1px solid ${isSel ? t.accent : t.borderLight}`,
                borderRadius: "12px", padding: "14px 16px", cursor: "pointer",
                textAlign: "left", transition: "background 0.2s ease, border 0.2s ease",
                marginBottom: "8px",
              }}>
                <div style={{
                  width: "22px", height: "22px", minWidth: "22px", borderRadius: "7px", marginTop: "1px",
                  border: `1.5px solid ${isSel ? t.accent : t.borderLight}`,
                  background: isSel ? t.accentBg : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isSel ? t.accentText : "transparent", fontSize: "11px",
                  transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transform: isSel ? "scale(1)" : "scale(0.9)",
                }}>{isSel && "✓"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: t.text, marginBottom: "3px" }}>{opt.label}</div>
                  <div style={{ fontSize: "12px", color: t.textMuted, fontWeight: 300, lineHeight: 1.5 }}>{opt.desc}</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function PhiloApp() {
  const [mode, setMode] = useState("dark");
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  const [introExiting, setIntroExiting] = useState(false);
  const [screen, setScreen] = useState("onboarding");
  const [activeTab, setActiveTab] = useState("read");
  const [fontChoice, setFontChoice] = useState("nunito");
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingAnswers, setOnboardingAnswers] = useState({});
  const [userAge, setUserAge] = useState(22);
  const [ageInput, setAgeInput] = useState("22");
  const [btnPressed, setBtnPressed] = useState(false);
  const [btnBounce, setBtnBounce] = useState(false);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDaysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const initWeekTasks = () => {
    const obj = {};
    weekDays.forEach((d) => {
      obj[d] = [
        { id: `${d}-1`, text: "", done: false },
        { id: `${d}-2`, text: "", done: false },
        { id: `${d}-3`, text: "", done: false },
      ];
    });
    return obj;
  };
  const [weekTasks, setWeekTasks] = useState(initWeekTasks);
  const [selectedTaskDay, setSelectedTaskDay] = useState(weekDays[new Date().getDay()]);
  const [selectedDay, setSelectedDay] = useState("Wed");

  const t = themes[mode];
  const rf = fontOptions.find((f) => f.id === fontChoice)?.family || "'Nunito', sans-serif";

  const dayColors = {
    dark: {
      Sun: { bg: "#1C1917", border: "#3D2E1E", dot: "#D4A574" },
      Mon: { bg: "#17191C", border: "#1E2E3D", dot: "#74A5D4" },
      Tue: { bg: "#1C1719", border: "#3D1E2E", dot: "#D474A5" },
      Wed: { bg: "#171C17", border: "#1E3D1E", dot: "#74D474" },
      Thu: { bg: "#1C1C17", border: "#3D3D1E", dot: "#D4D474" },
      Fri: { bg: "#191719", border: "#2E1E3D", dot: "#A574D4" },
      Sat: { bg: "#171B1C", border: "#1E353D", dot: "#74C8D4" },
    },
    light: {
      Sun: { bg: "#FEF6EE", border: "#F0D9BE", dot: "#D4A574" },
      Mon: { bg: "#EEF4FE", border: "#BED3F0", dot: "#5B93D1" },
      Tue: { bg: "#FEEEF6", border: "#F0BED3", dot: "#D174A0" },
      Wed: { bg: "#EEFEED", border: "#BEF0BE", dot: "#5BBF5B" },
      Thu: { bg: "#FEFEED", border: "#F0F0BE", dot: "#C8C83C" },
      Fri: { bg: "#F4EEFE", border: "#D3BEF0", dot: "#9B6DD1" },
      Sat: { bg: "#EEFBFE", border: "#BEE8F0", dot: "#5BC0D1" },
    },
  };

  const handleOnboardingSelect = (label) => {
    const q = onboardingQuestions[onboardingStep];
    const current = onboardingAnswers[q.id] || [];
    if (q.multi) {
      if (current.includes(label)) {
        setOnboardingAnswers({ ...onboardingAnswers, [q.id]: current.filter((l) => l !== label) });
      } else {
        setOnboardingAnswers({ ...onboardingAnswers, [q.id]: [...current, label] });
      }
    } else {
      setOnboardingAnswers({ ...onboardingAnswers, [q.id]: [label] });
    }
  };

  const onboardingNext = () => {
    const q = onboardingQuestions[onboardingStep];
    if (q.isAgeInput) {
      const age = parseInt(ageInput);
      if (!age || age < 1 || age > 100) return;
      setUserAge(age);
      setOnboardingDone(true);
      setScreen("home");
      return;
    }
    const sel = onboardingAnswers[q.id] || [];
    if (sel.length === 0) return;
    if (onboardingStep < onboardingQuestions.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  const updateTaskText = (day, taskId, text) => {
    setWeekTasks({
      ...weekTasks,
      [day]: weekTasks[day].map((tk) => (tk.id === taskId ? { ...tk, text } : tk)),
    });
  };

  const [celebrating, setCelebrating] = useState(false);

  const toggleTask = (day, taskId) => {
    const newTasks = weekTasks[day].map((tk) => (tk.id === taskId ? { ...tk, done: !tk.done } : tk));
    setWeekTasks({ ...weekTasks, [day]: newTasks });
    const withText = newTasks.filter((tk) => tk.text.trim());
    if (withText.length > 0 && withText.every((tk) => tk.done)) {
      setCelebrating(true);
      setTimeout(() => setCelebrating(false), 2500);
    }
  };

  const addTask = (day) => {
    setWeekTasks({
      ...weekTasks,
      [day]: [...weekTasks[day], { id: `${day}-${Date.now()}`, text: "", done: false }],
    });
  };

  const deleteTask = (day, taskId) => {
    const tasks = weekTasks[day].filter((tk) => tk.id !== taskId);
    setWeekTasks({ ...weekTasks, [day]: tasks });
  };

  const todayKey = weekDays[new Date().getDay()];
  const totalTasks = Object.values(weekTasks).flat().filter((tk) => tk.text.trim()).length;
  const totalDone = Object.values(weekTasks).flat().filter((tk) => tk.text.trim() && tk.done).length;

  // INTRO SLIDES
  if (screen === "onboarding" && !onboardingDone && showIntro) {
    const slides = [
      { icon: "📖", title: "📖 Daily Readings", desc: "One passage a day from the greatest thinkers. Short enough to read in a minute." },
      { icon: "✅", title: "✅ Daily Tasks", desc: "Set goals for each day of the week. Check them off. Build momentum." },
      { icon: "📱", title: "📱 Screen Time", desc: "See where your hours actually go. Less scrolling, more living." },
      { icon: "⏳", title: "⏳ Your Life in Years", desc: "A dot for every year. See how much is left. Make it count." },
    ];
    const slide = slides[introStep];
    const isLast = introStep === slides.length - 1;

    return (
      <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden", maxWidth: "520px", margin: "0 auto" }}>
        <style>{globalCSS}</style>
        <div style={{ display: "flex", flexDirection: "column", padding: "24px", minHeight: "100vh", position: "relative", background: t.bg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>ΦΙΛΟ</span>
            <button onClick={() => { setOnboardingDone(true); setScreen("home"); }} style={{
              background: "transparent", border: `1px solid ${t.borderLight}`, color: t.textMuted,
              padding: "6px 14px", borderRadius: "16px", fontSize: "12px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "0.5px",
            }}>Skip</button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 16px" }}>
            <div key={introStep} style={{ animation: "fadeUp 0.35s ease forwards" }}>
              <span style={{ fontSize: "64px", display: "block", marginBottom: "28px", opacity: 0.6 }}>{slide.icon}</span>
              <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2 }}>{slide.title}</h1>
              <p style={{ fontSize: "15px", color: t.textSecondary, margin: 0, fontWeight: 300, lineHeight: 1.6, maxWidth: "300px" }}>{slide.desc}</p>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
            {slides.map((_, i) => (
              <div key={i} style={{
                width: i === introStep ? "24px" : "8px", height: "8px", borderRadius: "4px",
                background: i === introStep ? t.accent : t.borderLight,
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: "12px", paddingBottom: "16px" }}>
            {introStep > 0 && (
              <button onClick={() => setIntroStep(introStep - 1)} style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: t.text, fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>←</button>
            )}
            <button
              className="btn-continue"
              onPointerDown={() => setBtnPressed("intro")}
              onPointerUp={() => { setBtnPressed(false); setBtnBounce(true); setTimeout(() => setBtnBounce(false), 250); }}
              onPointerLeave={() => setBtnPressed(false)}
              onClick={() => {
                if (isLast) { setIntroExiting(true); setShowIntro(false); setTimeout(() => setIntroExiting(false), 500); }
                else { setIntroStep(introStep + 1); }
              }}
              style={{
                flex: 1, padding: "16px", background: t.accentBg, border: "none", borderRadius: "32px",
                color: t.accentText, fontSize: "15px", fontWeight: 700, cursor: "pointer",
                fontFamily: "'Nunito', sans-serif", letterSpacing: "0.5px",
                transform: btnPressed === "intro" ? "translateY(4px) scale(0.97)" : "translateY(0) scale(1)",
                boxShadow: btnPressed === "intro"
                  ? `0 1px 0px ${mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`
                  : `0 5px 0px ${mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.2)"}, 0 8px 20px ${mode === "dark" ? "rgba(245,245,240,0.08)" : "rgba(0,0,0,0.1)"}`,
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease",
              }}
            >{isLast ? "Get Started" : "Next"}</button>
          </div>
        </div>
      </div>
    );
  }

  // ONBOARDING SCREEN
  if (screen === "onboarding" && !onboardingDone) {
    const q = onboardingQuestions[onboardingStep];
    const selected = onboardingAnswers[q.id] || [];
    const hasAnswer = q.isAgeInput ? (ageInput && parseInt(ageInput) >= 1) : selected.length > 0;
    const progress = ((onboardingStep + (hasAnswer ? 1 : 0)) / onboardingQuestions.length) * 100;

    return (
      <div style={{ height: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", padding: "24px", maxWidth: "520px", margin: "0 auto", overflow: "hidden", position: "relative" }}>
        <style>{globalCSS}</style>
        {introExiting && (
          <div style={{
            position: "fixed", top: 0, left: "50%",
            width: "100%", maxWidth: "520px", height: "100vh",
            background: t.bg, zIndex: 50,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "24px", textAlign: "center",
            animation: "slideFallDown 0.5s cubic-bezier(0.4, 0, 1, 1) forwards",
          }}>
            <span style={{ fontSize: "64px", display: "block", marginBottom: "28px", opacity: 0.6 }}>⏳</span>
            <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "30px", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.2, color: t.text }}>⏳ Your Life in Years</h1>
            <p style={{ fontSize: "15px", color: t.textSecondary, margin: 0, fontWeight: 300, lineHeight: 1.6, maxWidth: "300px" }}>A dot for every year. See how much is left. Make it count.</p>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>ΦΙΛΟ</span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "13px", color: t.textMuted, letterSpacing: "2px", fontWeight: 300 }}>{onboardingStep + 1} / {onboardingQuestions.length}</span>
            <button onClick={() => { setOnboardingDone(true); setScreen("home"); }} style={{
              background: "transparent", border: `1px solid ${t.borderLight}`, color: t.textMuted,
              padding: "6px 14px", borderRadius: "16px", fontSize: "12px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "0.5px",
              transition: "all 0.2s ease",
            }}>Skip</button>
          </div>
        </div>
        <div style={{ width: "100%", height: "1px", background: t.border, marginBottom: q.isScrollList ? "12px" : "48px", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ height: "100%", background: t.accent, width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: q.isScrollList ? "24px" : "32px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 4px", flexShrink: 0 }}>{q.question}</h1>
        <p style={{ fontSize: "14px", color: t.textSecondary, margin: "0 0 4px", fontWeight: 300, flexShrink: 0 }}>{q.subtitle}</p>
        {q.multi && <p style={{ fontSize: "11px", color: t.textMuted, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "2px", flexShrink: 0 }}>Select all that apply</p>}
        {!q.multi && !q.isAgeInput && <div style={{ height: "20px", flexShrink: 0 }} />}

        {q.isAgeInput ? (
          <div style={{ marginTop: "16px" }}>
            <AgeScrollPicker value={parseInt(ageInput) || 22} onChange={(v) => setAgeInput(String(v))} theme={t} mode={mode} />
          </div>
        ) : q.isScrollList ? (
          <ScrollPhilosopherList options={q.options} selected={selected} onSelect={handleOnboardingSelect} theme={t} mode={mode} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: q.options.length <= 5 ? "1fr" : "1fr 1fr", gap: "10px" }}>
            {q.options.map((opt) => {
              const isSel = selected.includes(opt.label);
              return (
                <button key={opt.label} onClick={() => handleOnboardingSelect(opt.label)} style={{
                  background: isSel ? t.accentBg : "transparent",
                  border: `1px solid ${isSel ? t.accent : t.borderLight}`,
                  borderRadius: "6px", padding: "16px", cursor: "pointer",
                  color: isSel ? t.accentText : t.textSecondary,
                  fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: isSel ? 500 : 400,
                  textAlign: "left", transition: "all 0.2s ease", letterSpacing: "0.3px",
                }}>{opt.label}</button>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: q.isScrollList ? "12px" : "auto", paddingTop: q.isScrollList ? "0" : "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <button
            onPointerDown={() => setBtnPressed("back")}
            onPointerUp={() => setBtnPressed(false)}
            onPointerLeave={() => setBtnPressed(false)}
            onClick={() => { if (onboardingStep > 0) setOnboardingStep(onboardingStep - 1); else { setIntroStep(3); setShowIntro(true); } }}
            className="btn-back"
            style={{
              background: "transparent", border: `1px solid ${t.borderLight}`, color: t.text,
              width: "48px", height: "48px", borderRadius: "50%", fontSize: "18px", cursor: "pointer",
              opacity: 1, display: "flex", alignItems: "center", justifyContent: "center",
              transform: btnPressed === "back" ? "translateY(3px) scale(0.95)" : "translateY(0) scale(1)",
              boxShadow: btnPressed === "back"
                ? `0 1px 0px ${mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
                : `0 4px 0px ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}, 0 6px 12px ${mode === "dark" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)"}`,
              transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease",
            }}
          >←</button>
          {(() => {
            const canProceed = q.isAgeInput ? (ageInput && parseInt(ageInput) >= 1 && parseInt(ageInput) <= 100) : selected.length > 0;
            return (
              <button
                onPointerDown={() => { if (canProceed) setBtnPressed("next"); }}
                onPointerUp={() => { setBtnPressed(false); if (canProceed) { setBtnBounce(true); setTimeout(() => setBtnBounce(false), 250); } }}
                onPointerLeave={() => setBtnPressed(false)}
                onClick={onboardingNext}
                className={`btn-continue ${btnBounce ? "btn-bounce" : ""}`}
                style={{
                  background: t.accentBg, border: "none", color: t.accentText,
                  padding: "14px 40px", borderRadius: "32px", fontSize: "14px", fontWeight: 600,
                  cursor: !canProceed ? "default" : "pointer",
                  opacity: !canProceed ? 0.3 : 1,
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
                  transform: btnPressed === "next" ? "translateY(4px) scale(0.97)" : "translateY(0) scale(1)",
                  boxShadow: !canProceed ? "none" : btnPressed === "next"
                    ? `0 1px 0px ${mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`
                    : `0 5px 0px ${mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.2)"}, 0 8px 20px ${mode === "dark" ? "rgba(245,245,240,0.08)" : "rgba(0,0,0,0.1)"}`,
                  transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease",
                }}
              >{onboardingStep === onboardingQuestions.length - 1 ? "Get Started" : "Continue"}</button>
            );
          })()}
        </div>
      </div>
    );
  }

  // HOME SCREEN
  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", maxWidth: "520px", margin: "0 auto" }}>
      <style>{globalCSS}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px 12px" }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>ΦΙΛΟ</span>
        <button onClick={() => setMode(mode === "dark" ? "light" : "dark")} style={{
          background: "transparent", border: `1px solid ${t.borderLight}`, color: t.text,
          width: "36px", height: "36px", borderRadius: "50%", fontSize: "16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{mode === "dark" ? "☀" : "☾"}</button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 24px 100px" }}>

        {/* DAILY READING TAB */}
        {activeTab === "read" && (
          <div>
            <div style={{ margin: "16px 0 24px" }}>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>📖 Today's Reading</h2>
              <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>March 19 — Day 7 streak ◆</p>
            </div>
            <div style={{ position: "relative", padding: "24px", border: `1px solid ${t.border}`, borderRadius: "8px", marginBottom: "8px", background: t.card, boxShadow: t.shadow }}>
              <button onClick={() => setShowFontPicker(!showFontPicker)} style={{
                position: "absolute", top: "10px", right: "10px",
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: t.textMuted, width: "28px", height: "28px", borderRadius: "6px",
                fontSize: "10px", cursor: "pointer", fontFamily: rf, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: 0.5, transition: "opacity 0.2s ease",
              }}>Aa</button>
              <p style={{
                fontFamily: rf,
                fontSize: fontChoice === "cormorant" ? "20px" : "16px",
                lineHeight: fontChoice === "cormorant" ? 2 : 1.8,
                color: t.textSecondary, margin: 0,
                fontStyle: fontChoice === "cormorant" ? "italic" : "normal",
              }}>
                <span style={{ fontFamily: rf, fontSize: fontChoice === "cormorant" ? "36px" : "28px", color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginRight: "2px" }}>"</span>
                The example of my grandfather Verus gave me a good disposition, not prone to anger. By the recollection of my father's character, I learned to be both modest and manly.
                <span style={{ fontFamily: rf, fontSize: fontChoice === "cormorant" ? "36px" : "28px", color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginLeft: "2px" }}>"</span>
              </p>
              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: t.textMuted, letterSpacing: "1px" }}>MARCUS AURELIUS</span>
                <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: 300 }}>Meditations, Book I §1-2</span>
              </div>
            </div>
            {showFontPicker && (
              <div style={{ padding: "10px", marginBottom: "8px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "10px", display: "flex", gap: "6px" }}>
                {fontOptions.map((f) => {
                  const isActive = fontChoice === f.id;
                  return (
                    <button key={f.id} onClick={() => { setFontChoice(f.id); setShowFontPicker(false); }} style={{
                      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                      padding: "8px 2px", borderRadius: "8px", cursor: "pointer",
                      background: isActive ? (mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)") : "transparent",
                      border: isActive ? `1.5px solid ${t.accent}` : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                    }}>
                      <span style={{ fontFamily: f.family, fontSize: "16px", fontWeight: 600, color: t.text }}>{f.preview}</span>
                      <span style={{ fontSize: "8px", color: isActive ? t.text : t.textMuted, letterSpacing: "0.3px", fontWeight: isActive ? 500 : 300 }}>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
            <div style={{ padding: "16px 20px", background: t.surface, borderRadius: "8px", border: `1px solid ${t.border}`, marginBottom: "16px" }}>
              <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 8px", fontWeight: 500 }}>REFLECT</p>
              <p style={{ fontSize: "14px", color: t.textSecondary, lineHeight: 1.7, margin: 0, fontWeight: 300, fontFamily: rf }}>Marcus begins not with grand philosophy, but with gratitude. What qualities have the people around you shaped in you?</p>
            </div>
            <button
              className="btn-continue"
              onPointerDown={() => setBtnPressed("read")}
              onPointerUp={() => { setBtnPressed(false); setBtnBounce(true); setTimeout(() => setBtnBounce(false), 250); }}
              onPointerLeave={() => setBtnPressed(false)}
              style={{
                width: "100%", padding: "16px", background: t.accentBg, border: "none", borderRadius: "32px",
                color: t.accentText, fontSize: "14px", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
                transform: btnPressed === "read" ? "translateY(4px) scale(0.97)" : "translateY(0) scale(1)",
                boxShadow: btnPressed === "read"
                  ? `0 1px 0px ${mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`
                  : `0 5px 0px ${mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.2)"}, 0 8px 20px ${mode === "dark" ? "rgba(245,245,240,0.08)" : "rgba(0,0,0,0.1)"}`,
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease",
              }}
            >Mark as Read</button>
          </div>
        )}

        {/* DAILY TASKS TAB */}
        {activeTab === "todo" && (
          <div>
            <Confetti active={celebrating} theme={t} />
            <div style={{ margin: "16px 0 20px" }}>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>✅ Daily Tasks</h2>
              <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>{totalDone} of {totalTasks} tasks done this week</p>
            </div>
            <CelebrationBanner active={celebrating} theme={t} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", gap: "6px" }}>
              {weekDays.map((d) => {
                const isSelected = d === selectedTaskDay;
                const isToday = d === todayKey;
                const dc = dayColors[mode][d];
                const dayTasks = weekTasks[d];
                const dayDone = dayTasks.filter((tk) => tk.text.trim() && tk.done).length;
                const dayTotal = dayTasks.filter((tk) => tk.text.trim()).length;
                const allDone = dayTotal > 0 && dayDone === dayTotal;
                return (
                  <button key={d} onClick={() => setSelectedTaskDay(d)} style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    padding: "10px 0 8px", borderRadius: "14px", cursor: "pointer",
                    background: isSelected ? dc.bg : "transparent",
                    border: isSelected ? `1.5px solid ${dc.border}` : `1.5px solid transparent`,
                    transition: "all 0.25s ease",
                  }}>
                    <span style={{ fontSize: "11px", fontWeight: 300, letterSpacing: "0.5px", color: isSelected ? t.text : t.textMuted }}>{d}</span>
                    <div style={{
                      width: "8px", height: "8px", borderRadius: "50%",
                      background: allDone ? dc.dot : isToday && !isSelected ? t.textMuted : "transparent",
                      border: isToday && !allDone ? `1.5px solid ${t.textMuted}` : "none",
                      transition: "all 0.2s ease",
                    }} />
                  </button>
                );
              })}
            </div>
            {(() => {
              const dc = dayColors[mode][selectedTaskDay];
              const tasks = weekTasks[selectedTaskDay];
              const dayDone = tasks.filter((tk) => tk.text.trim() && tk.done).length;
              const dayTotal = tasks.filter((tk) => tk.text.trim()).length;
              return (
                <div style={{ background: dc.bg, border: `1px solid ${dc.border}`, borderRadius: "16px", padding: "20px", marginBottom: "16px", transition: "all 0.3s ease" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                    <div>
                      <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 700 }}>{weekDaysFull[weekDays.indexOf(selectedTaskDay)]}</span>
                      {selectedTaskDay === todayKey && <span style={{ fontSize: "11px", color: dc.dot, marginLeft: "10px", fontWeight: 500, letterSpacing: "1px" }}>TODAY</span>}
                    </div>
                    {dayTotal > 0 && <span style={{ fontSize: "12px", color: t.textSecondary, fontWeight: 300 }}>{dayDone}/{dayTotal}</span>}
                  </div>
                  {tasks.map((task, idx) => (
                    <div key={task.id} style={{
                      display: "flex", alignItems: "center", gap: "12px", padding: "10px 0",
                      borderTop: idx > 0 ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}` : "none",
                    }}>
                      <button onClick={() => task.text.trim() && toggleTask(selectedTaskDay, task.id)} style={{
                        width: "22px", height: "22px", minWidth: "22px", borderRadius: "7px",
                        border: `1.5px solid ${task.done ? dc.dot : t.borderLight}`,
                        background: task.done ? dc.dot : "transparent",
                        cursor: task.text.trim() ? "pointer" : "default",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: mode === "dark" ? "#0A0A0A" : "#FFF", fontSize: "11px",
                        transition: "all 0.2s ease",
                      }}>{task.done && "✓"}</button>
                      <input
                        value={task.text}
                        onChange={(e) => updateTaskText(selectedTaskDay, task.id, e.target.value)}
                        placeholder={`Task ${idx + 1}`}
                        style={{
                          flex: 1, background: "transparent", border: "none", outline: "none",
                          fontSize: "14px", fontWeight: 300, fontFamily: "'DM Sans', sans-serif",
                          color: task.done ? t.textMuted : t.text,
                          textDecoration: task.done ? "line-through" : "none",
                          padding: "4px 0", transition: "color 0.2s ease",
                        }}
                      />
                      <button onClick={() => deleteTask(selectedTaskDay, task.id)} style={{
                        background: "transparent", border: "none", color: t.textMuted,
                        fontSize: "14px", cursor: "pointer", padding: "4px 6px", opacity: 0.25,
                        transition: "opacity 0.2s ease",
                      }}>×</button>
                    </div>
                  ))}
                  <button onClick={() => addTask(selectedTaskDay)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "12px", marginTop: "8px",
                    background: "transparent", border: `1px dashed ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`,
                    borderRadius: "10px", cursor: "pointer",
                    color: t.textMuted, fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    transition: "all 0.2s ease",
                  }}>
                    <span style={{ fontSize: "16px" }}>+</span> Add task
                  </button>
                </div>
              );
            })()}
          </div>
        )}

        {/* SCREEN TIME TAB */}
        {activeTab === "time" && (
          <div>
            <div style={{ margin: "16px 0 24px" }}>
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>📱 Screen Time</h2>
              <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>Weekly overview — tap a day for details</p>
            </div>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "48px", fontWeight: 900 }}>
                {(Object.values(screenTimeData).reduce((a, d) => a + d.total, 0) / 7).toFixed(1)}
              </span>
              <span style={{ fontSize: "14px", color: t.textMuted, fontWeight: 300, marginLeft: "6px" }}>hrs / day avg</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "140px", marginBottom: "8px", padding: "0 4px" }}>
              {Object.entries(screenTimeData).map(([day, data]) => {
                const maxH = 6.5;
                const height = (data.total / maxH) * 120;
                const isSelected = day === selectedDay;
                return (
                  <button key={day} onClick={() => setSelectedDay(day)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
                    <span style={{ fontSize: "11px", color: isSelected ? t.text : t.textMuted, fontWeight: isSelected ? 500 : 300 }}>{data.total}h</span>
                    <div style={{ width: isSelected ? "36px" : "28px", height: `${height}px`, background: isSelected ? t.accentBg : t.border, borderRadius: "4px", transition: "all 0.3s ease" }} />
                    <span style={{ fontSize: "12px", color: isSelected ? t.text : t.textMuted, fontWeight: isSelected ? 500 : 300, letterSpacing: "0.5px" }}>{day}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: "24px", padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px" }}>
              <p style={{ fontSize: "12px", color: t.textMuted, letterSpacing: "2px", margin: "0 0 16px", textTransform: "uppercase", fontWeight: 500 }}>{selectedDay} BREAKDOWN</p>
              {screenTimeData[selectedDay].apps.map((app, i) => {
                const pct = (app.hrs / screenTimeData[selectedDay].total) * 100;
                return (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", color: t.text, fontWeight: 400 }}>{app.name}</span>
                      <span style={{ fontSize: "13px", color: t.textSecondary, fontWeight: 300 }}>{app.hrs}h</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", background: t.border, borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: t.accent, borderRadius: "2px", transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: "13px", color: t.textSecondary, fontWeight: 400 }}>Total</span>
                <span style={{ fontSize: "13px", color: t.text, fontWeight: 500 }}>{screenTimeData[selectedDay].total}h</span>
              </div>
            </div>
          </div>
        )}

        {/* LIFE MAP TAB */}
        {activeTab === "life" && (() => {
          const totalYears = 100;
          const avgDeath = 80;
          const yearsLived = userAge;
          const yearsLeft = Math.max(avgDeath - userAge, 0);
          const pctLived = Math.round((yearsLived / avgDeath) * 100);
          const pctLeft = 100 - Math.min(pctLived, 100);

          const milestones = [
            { age: 18, label: "Adulthood", color: mode === "dark" ? "#555" : "#AAA" },
            { age: 22, label: "Graduate college", color: mode === "dark" ? "#555" : "#AAA" },
            { age: 30, label: "Avg. first child / marriage", color: mode === "dark" ? "#A78BFA" : "#7C3AED" },
            { age: 80, label: "Avg. age of death", color: mode === "dark" ? "#EF4444" : "#DC2626" },
          ];

          const cols = 10;

          const getDotStyle = (year) => {
            if (year < yearsLived) return { bg: t.accent, opacity: 0.85 };
            if (year === yearsLived) return { bg: t.accent, opacity: 1, ring: true };
            const ms = milestones.find((m) => m.age === year);
            if (ms) return { bg: ms.color, opacity: 1, milestone: true };
            return { bg: t.border, opacity: 1 };
          };

          return (
            <div>
              <div style={{ margin: "16px 0 24px" }}>
                <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: "0 0 4px" }}>⏳ Your Life in Years</h2>
                <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>{avgDeath} avg. years. {yearsLived} spent. {yearsLeft} left.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>{yearsLived}</div>
                  <div style={{ fontSize: "11px", color: t.textMuted, letterSpacing: "2px", marginTop: "6px", textTransform: "uppercase", fontWeight: 400 }}>Years Lived</div>
                  <div style={{ fontSize: "12px", color: t.textSecondary, marginTop: "2px", fontWeight: 300 }}>Age {userAge}</div>
                </div>
                <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>{yearsLeft}</div>
                  <div style={{ fontSize: "11px", color: t.textMuted, letterSpacing: "2px", marginTop: "6px", textTransform: "uppercase", fontWeight: 400 }}>Years Left</div>
                  <div style={{ fontSize: "12px", color: t.textSecondary, marginTop: "2px", fontWeight: 300 }}>{pctLeft}% of life</div>
                </div>
              </div>
              <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 16px", textTransform: "uppercase", fontWeight: 600 }}>EACH DOT = ONE YEAR</p>
                {Array.from({ length: Math.ceil(totalYears / cols) }, (_, row) => (
                  <div key={row} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ width: "28px", fontSize: "9px", color: t.textMuted, fontWeight: 300, textAlign: "right", marginRight: "10px", fontFamily: "'DM Sans', sans-serif" }}>{row * cols}</span>
                    <div style={{ display: "flex", gap: "6px", flex: 1 }}>
                      {Array.from({ length: cols }, (_, col) => {
                        const year = row * cols + col;
                        if (year >= totalYears) return <div key={col} style={{ width: "18px", height: "18px" }} />;
                        const ds = getDotStyle(year);
                        return (
                          <div key={col} style={{
                            width: "18px", height: "18px", borderRadius: "4px",
                            background: ds.bg, opacity: ds.opacity,
                            transition: "all 0.3s ease",
                            border: ds.ring ? `2px solid ${t.text}` : "none",
                            boxShadow: ds.ring ? `0 0 0 3px ${mode === "dark" ? "rgba(245,245,240,0.2)" : "rgba(0,0,0,0.1)"}` : "none",
                          }} />
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.border}`, flexWrap: "wrap" }}>
                  {[
                    { color: t.accent, opacity: 0.85, label: "Lived" },
                    { color: t.accent, border: `1.5px solid ${t.text}`, label: "Now" },
                    { color: mode === "dark" ? "#A78BFA" : "#7C3AED", label: "Child / Marriage" },
                    { color: mode === "dark" ? "#EF4444" : "#DC2626", label: "Avg. death" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: item.color, opacity: item.opacity || 1, border: item.border }} />
                      <span style={{ fontSize: "11px", color: t.textSecondary, fontWeight: 300 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 14px", textTransform: "uppercase", fontWeight: 600 }}>MILESTONES</p>
                {milestones.map((m, i) => {
                  const isPast = m.age <= userAge;
                  const yearsUntil = m.age - userAge;
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i > 0 ? `1px solid ${t.border}` : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: isPast ? t.accent : m.color, opacity: isPast ? 0.85 : 1 }} />
                        <span style={{ fontSize: "13px", color: isPast ? t.textMuted : t.text, fontWeight: isPast ? 300 : 400, textDecoration: isPast ? "line-through" : "none" }}>{m.label}</span>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "13px", color: t.textSecondary, fontWeight: 300 }}>age {m.age}</span>
                        {!isPast && <span style={{ fontSize: "11px", color: t.textMuted, marginLeft: "8px", fontWeight: 300 }}>{yearsUntil}y away</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px" }}>
                <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 10px", textTransform: "uppercase", fontWeight: 600 }}>PERSPECTIVE</p>
                <p style={{ fontSize: "14px", color: t.textSecondary, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                  You've used {pctLived}% of your time. That's {yearsLived * 365} days gone, {yearsLeft * 365} days ahead. {yearsLeft * 52} Sundays left. Make them count.
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "520px", display: "flex", justifyContent: "space-around",
        padding: "14px 16px 28px", background: t.bg, borderTop: `1px solid ${t.border}`,
      }}>
        {[
          { key: "read", label: "Read", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.8" fill={active ? color : "none"} /></svg> },
          { key: "todo", label: "Tasks", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="16" height="16" rx="3" stroke={color} strokeWidth="1.8" fill={active ? color : "none"} /></svg> },
          { key: "time", label: "Screen", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><polygon points="11,2 21,19 1,19" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={active ? color : "none"} /></svg> },
          { key: "life", label: "Life", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><polygon points="11,1 21,11 11,21 1,11" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={active ? color : "none"} /></svg> },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          const color = isActive ? t.text : t.textMuted;
          return (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              background: "transparent", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              transition: "all 0.2s ease", padding: "6px 16px", flex: 1,
            }}>
              {tab.shape(isActive, color)}
              <span style={{ fontSize: "12px", fontFamily: "'Nunito', sans-serif", fontWeight: isActive ? 700 : 400, letterSpacing: "0.5px", color }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
  * { box-sizing: border-box; }
  input:focus, textarea:focus { outline: none; }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
  input[type=number] { -moz-appearance: textfield; }
  ::-webkit-scrollbar { display: none; }

  @keyframes btnBounce {
    0% { transform: translateY(0) scale(1); }
    40% { transform: translateY(-5px) scale(1.02); }
    100% { transform: translateY(0) scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideFallDown {
    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
    100% { transform: translateX(-50%) translateY(100vh); opacity: 1; }
  }
  @keyframes confettiFall {
    0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
    20% { opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg) translateX(var(--drift)); opacity: 0; }
  }
  .btn-bounce {
    animation: btnBounce 0.25s cubic-bezier(0.22, 0.68, 0.35, 1) !important;
  }
  .btn-continue {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }
  .btn-continue:hover { filter: brightness(1.05); }
  .btn-back {
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }
`;
