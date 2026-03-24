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
    bg: "#F5F0E8",
    surface: "#EDE8DF",
    border: "#D9D2C5",
    borderLight: "#CCC5B5",
    text: "#2C2416",
    textSecondary: "#6B5E4A",
    textMuted: "#A8987E",
    accent: "#2C2416",
    accentBg: "#2C2416",
    accentText: "#F5F0E8",
    card: "#EDE8DF",
    inputBg: "#E6E0D5",
    shadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
};

// ============================================================
// ONBOARDING QUESTIONS
// ============================================================
const onboardingQuestions = [
  {
    id: 0,
    question: "What's the one area of your life that feels most out of alignment right now?",
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
    question: "Be honest — what's actually holding you back?",
    subtitle: "No wrong answers.",
    options: [
      { label: "My own discipline" },
      { label: "Lack of clarity" },
      { label: "Fear" },
      { label: "Distraction" },
      { label: "Social media / screen time" },
      { label: "Outside circumstances" },
      { label: "I'm not sure" },
    ],
    multi: true,
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
    question: "How do you see yourself in 5 years?",
    subtitle: "Be specific. This shapes your experience.",
    options: [
      { label: "Building something" },
      { label: "Leading others" },
      { label: "At peace" },
      { label: "Financially free" },
      { label: "Still figuring it out" },
      { label: "Making an impact" },
    ],
    multi: true,
  },
  {
    id: 4,
    question: "What does your ideal version of yourself look like?",
    subtitle: "This is who we're building toward.",
    options: [
      { label: "Disciplined & focused" },
      { label: "Calm & grounded" },
      { label: "Fearless" },
      { label: "Purposeful" },
      { label: "Wealthy & free" },
      { label: "Deeply connected" },
    ],
    multi: true,
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
      { label: "Jean-Jacques Rousseau", desc: "Philosopher of freedom and equality. His Social Contract shaped modern democracy and the French Revolution." },
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
  Sun: { total: 8.7, apps: [{ name: "Instagram", hrs: 1.8 }, { name: "YouTube", hrs: 1.2 }, { name: "Twitter", hrs: 0.8 }, { name: "TikTok", hrs: 4.2 }, { name: "Other", hrs: 0.7 }] },
};

// ============================================================
// FONT OPTIONS
// ============================================================
const fontOptions = [
  { id: "cormorant", name: "Elegant", family: "'Cormorant Garamond', serif", preview: "Aa" },
  { id: "crimson", name: "Literary", family: "'Crimson Pro', serif", preview: "Aa" },
  { id: "quicksand", name: "Clean", family: "'Quicksand', sans-serif", preview: "Aa" },
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
  const isDragging = useRef(false);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const offsetRef = useRef((value - MIN_AGE) * ITEM_HEIGHT);
  const animRef = useRef(null);
  const [, forceRender] = useState(0);

  const totalItems = MAX_AGE - MIN_AGE + 1;
  const maxOffset = (totalItems - 1) * ITEM_HEIGHT;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const snapTarget = (off) => clamp(Math.round(off / ITEM_HEIGHT) * ITEM_HEIGHT, 0, maxOffset);
  const getAge = () => MIN_AGE + Math.round(clamp(offsetRef.current, 0, maxOffset) / ITEM_HEIGHT);

  const stopAnim = () => { if (animRef.current) { cancelAnimationFrame(animRef.current); animRef.current = null; } };

  const springTo = (target) => {
    stopAnim();
    const step = () => {
      const diff = target - offsetRef.current;
      if (Math.abs(diff) < 0.3) {
        offsetRef.current = target;
        forceRender(n => n + 1);
        onChange(getAge());
        return;
      }
      offsetRef.current += diff * 0.18;
      forceRender(n => n + 1);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  const momentum = () => {
    stopAnim();
    const DECEL = 0.94; // higher = glides longer
    const step = () => {
      velocityRef.current *= DECEL;
      offsetRef.current = clamp(offsetRef.current + velocityRef.current, 0, maxOffset);
      forceRender(n => n + 1);
      if (Math.abs(velocityRef.current) < 0.4) {
        springTo(snapTarget(offsetRef.current));
        return;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (e) => {
    stopAnim();
    isDragging.current = true;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dy = lastYRef.current - e.clientY;
    // Time-based velocity so fast and slow phones feel the same
    velocityRef.current = dy / dt * 16;
    lastYRef.current = e.clientY;
    lastTimeRef.current = now;
    offsetRef.current = clamp(offsetRef.current + dy, -ITEM_HEIGHT * 2, maxOffset + ITEM_HEIGHT * 2);
    forceRender(n => n + 1);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (Math.abs(velocityRef.current) > 1) {
      momentum();
    } else {
      springTo(snapTarget(offsetRef.current));
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    stopAnim();
    offsetRef.current = clamp(offsetRef.current + e.deltaY * 0.6, 0, maxOffset);
    forceRender(n => n + 1);
    clearTimeout(handleWheel._t);
    handleWheel._t = setTimeout(() => springTo(snapTarget(offsetRef.current)), 80);
  };

  useEffect(() => {
    offsetRef.current = (value - MIN_AGE) * ITEM_HEIGHT;
    forceRender(n => n + 1);
  }, []);

  const currentOffset = offsetRef.current;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
      <div
        ref={containerRef}
        style={{ position: "relative", height: ITEM_HEIGHT * VISIBLE, width: "160px", overflow: "hidden", userSelect: "none", touchAction: "none", cursor: "grab" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        {/* Selection highlight */}
        <div style={{
          position: "absolute", top: ITEM_HEIGHT * 2, left: 0, right: 0, height: ITEM_HEIGHT,
          background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
          borderTop: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderBottom: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: "8px", pointerEvents: "none", zIndex: 1,
        }} />
        {/* Top fade */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2,
          background: `linear-gradient(to bottom, ${t.bg} 20%, ${t.bg}00)`,
          pointerEvents: "none", zIndex: 2,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: ITEM_HEIGHT * 2,
          background: `linear-gradient(to top, ${t.bg} 20%, ${t.bg}00)`,
          pointerEvents: "none", zIndex: 2,
        }} />
        {/* Items */}
        <div style={{ transform: `translateY(${ITEM_HEIGHT * 2 - currentOffset}px)`, willChange: "transform" }}>
          {Array.from({ length: totalItems }, (_, i) => {
            const age = MIN_AGE + i;
            const dist = Math.abs(i - currentOffset / ITEM_HEIGHT);
            const isCenter = dist < 0.6;
            const opacity = isCenter ? 1 : Math.max(0.12, 1 - dist * 0.28);
            const scale = isCenter ? 1 : Math.max(0.82, 1 - dist * 0.06);
            return (
              <div key={age} style={{
                height: ITEM_HEIGHT,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Nunito', sans-serif",
                fontSize: isCenter ? "30px" : "19px",
                fontWeight: isCenter ? 800 : 300,
                color: t.text,
                opacity,
                transform: `scale(${scale})`,
                transition: isDragging.current ? "none" : "opacity 0.12s ease, transform 0.12s ease",
                willChange: "transform, opacity",
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
// 50 PASSAGES FROM MEDITATIONS — MARCUS AURELIUS
// ============================================================
const passages = [
  {
    ref: "Book I · §1",
    text: "Of my grandfather Verus I have learned to be gentle and meek, and to refrain from all anger and passion.",
    reflect: "Marcus opens not with philosophy but with gratitude for his teachers. Who has quietly shaped your character without you fully realizing it?",
  },
  {
    ref: "Book I · §15",
    text: "Betimes in the morning say to thyself: This day I shall have to do with an idle curious man, with an unthankful man, a railer, a crafty, false, or an envious man. All these ill qualities have happened unto them through ignorance of that which is truly good and truly bad.",
    reflect: "Marcus prepared for difficult people before facing them. How would your day change if you expected friction, rather than being surprised by it?",
  },
  {
    ref: "Book II · §1",
    text: "Remember how long thou hast already put off these things, and how often a certain day and hour as it were, having been set unto thee by the gods, thou hast neglected it. It is high time for thee to understand the true nature both of the world, whereof thou art a part.",
    reflect: "We delay the things that matter most. What are you putting off that deserves your attention today?",
  },
  {
    ref: "Book II · §4",
    text: "Why should any of these things that happen externally, so much distract thee? Give thyself leisure to learn some good thing, and cease roving and wandering to and fro.",
    reflect: "External noise competes for your focus constantly. What good thing would you learn if you stopped letting distractions win?",
  },
  {
    ref: "Book II · §8",
    text: "Whatsoever thou dost affect, whatsoever thou dost project, so do, and so project all, as one who, for aught thou knowest, may at this very present depart out of this life.",
    reflect: "Acting as if this moment were your last is not morbid — it is clarifying. What would you do differently right now?",
  },
  {
    ref: "Book II · §12",
    text: "If thou shouldst live three thousand, or as many as ten thousands of years, yet remember this, that man can part with no life properly, save with that little part of life, which he now lives: and that which he lives, is no other, than that which at every instant he parts with.",
    reflect: "No matter how long you live, you only ever live in the present moment. Are you actually living in yours?",
  },
  {
    ref: "Book II · §15",
    text: "The time of a man's life is as a point; the substance of it ever flowing, the sense obscure; and the whole composition of the body tending to corruption. Our life is a warfare, and a mere pilgrimage. What is it then that will adhere and follow? Only one thing, philosophy.",
    reflect: "Strip away everything temporary. What is the one thing you are building that will outlast the noise of daily life?",
  },
  {
    ref: "Book III · §1",
    text: "A man must not only consider how daily his life wasteth and decreaseth, but this also, that if he live long, he cannot be certain, whether his understanding shall continue so able and sufficient. Thou must hasten therefore.",
    reflect: "Mental clarity and sharpness are not guaranteed. What are you postponing that requires your sharpest mind — and why are you waiting?",
  },
  {
    ref: "Book III · §4",
    text: "Spend not the remnant of thy days in thoughts and fancies concerning other men, when it is not in relation to some common good, when by it thou art hindered from some other better work.",
    reflect: "How much of your mental energy goes toward judging, analyzing, or worrying about other people? What better work could fill that space?",
  },
  {
    ref: "Book III · §5",
    text: "Do nothing against thy will, nor contrary to the community, nor without due examination, nor with reluctancy. Be neither a great talker, nor a great undertaker.",
    reflect: "Reluctance is a signal. When you act against your own values or drag your feet, what is that resistance telling you?",
  },
  {
    ref: "Book III · §7",
    text: "If thou shalt find anything in this mortal life better than righteousness, than truth, temperance, fortitude, and in general better than a mind contented both with those things which according to right and reason she doth — if I say, thou canst find out anything better than this, apply thyself unto it with thy whole heart.",
    reflect: "Marcus challenges you to find something better than virtue. Can you? If not, what does that mean for how you spend your time?",
  },
  {
    ref: "Book III · §8",
    text: "Never esteem of anything as profitable, which shall ever constrain thee either to break thy faith, or to lose thy modesty; to hate any man, to suspect, to curse, to dissemble, to lust after anything, that requireth the secret of walls or veils.",
    reflect: "Any gain that costs you your integrity is no gain at all. Have you made any such trades recently — knowingly or not?",
  },
  {
    ref: "Book IV · §3",
    text: "Men seek retreats for themselves — in the country, by the sea, in the hills — and thou thyself art wont to long for such retreats. But this is altogether a mark of the most ordinary sort of men, for it is in thy power, whenever thou wilt, to retire into thyself.",
    reflect: "The peace you search for on vacations already lives inside you. How often do you actually go there?",
  },
  {
    ref: "Book IV · §7",
    text: "Do not look around thee to discover men's ruling principles, but look straight to this, to what nature leads thee, both the universal nature through the things that happen to thee, and thy own nature through the acts which must be done by thee.",
    reflect: "We spend enormous energy reading others. What does your own nature — your own deepest values — actually call you to do?",
  },
  {
    ref: "Book IV · §17",
    text: "Think not of the things that are absent as if they were already here, but reckon up the chief of those that thou hast, and then call to mind how eagerly they would have been sought if they were not with thee.",
    reflect: "Gratitude is not a feeling — it is a practice of attention. What do you have right now that a past version of you desperately wanted?",
  },
  {
    ref: "Book IV · §24",
    text: "Keep thyself simple, good, pure, serious, free from affectation, a friend of justice, a worshipper of the gods, kind, affectionate, strenuous in all proper acts. Strive to continue to be such as philosophy wished to make thee.",
    reflect: "Philosophy is not something you study — it is something you become. Who is the person philosophy is trying to make you into?",
  },
  {
    ref: "Book IV · §39",
    text: "Nothing happens to any man that he is not formed by nature to bear.",
    reflect: "You were built for exactly this. Not for an easier version of this — for this. What does that change about how you are facing your current difficulty?",
  },
  {
    ref: "Book IV · §43",
    text: "Time is a river made up of events which happen, and a violent stream; for as soon as a thing has been seen, it is carried away, and another comes in its place, and this will be carried away too.",
    reflect: "Everything passes — the good and the painful alike. What current difficulty would look different if you truly believed it was already flowing past you?",
  },
  {
    ref: "Book V · §8",
    text: "As thou thyself art a component part of a social system, so let every act of thine be a component part of social life. Whatever act of thine then has no reference either immediately or remotely to a social end, this tears asunder thy life, and does not allow it to be one.",
    reflect: "Marcus believed every act should serve something larger than yourself. What acts in your day connect to a larger purpose — and which ones don't?",
  },
  {
    ref: "Book V · §16",
    text: "Such as are thy habitual thoughts, such also will be the character of thy mind; for the soul is dyed by the thoughts. Dye it then with a continuous series of such thoughts as these: that where a man can live, there he can also live well.",
    reflect: "Your mind is being dyed right now — by what you watch, read, and think about. What color is it turning?",
  },
  {
    ref: "Book V · §20",
    text: "That which is really beautiful has no need of anything; not more than law, not more than truth, not more than benevolence or modesty.",
    reflect: "What in your life is genuinely beautiful — not because of how it looks, but because of what it is?",
  },
  {
    ref: "Book V · §23",
    text: "Accustom thyself to attend carefully to what is said by another, and as much as it is possible, be in the speaker's mind.",
    reflect: "Real listening is an act of respect. The last time someone spoke to you — were you truly in their mind, or were you composing your reply?",
  },
  {
    ref: "Book VI · §2",
    text: "Be it all one unto thee, whether half frozen or well warm; whether only slumbering or after a full sleep; whether discommended or commended thou do thy duty: or whether dying or doing somewhat else; for that also 'to die' must among the rest be reckoned as one of the duties and actions of our lives.",
    reflect: "Marcus treated criticism and praise with equal indifference. What would you do differently today if no one was watching or judging?",
  },
  {
    ref: "Book VI · §5",
    text: "The best kind of revenge is, not to become like unto them.",
    reflect: "When someone wrongs you, the deepest victory is not retaliation — it is refusing to be changed by them. Who are you in danger of becoming because of how someone has treated you?",
  },
  {
    ref: "Book VI · §6",
    text: "Let this be thy only joy, and thy only comfort, from one sociable kind action without intermission to pass unto another, God being ever in thy mind.",
    reflect: "Marcus found joy not in results, but in the unbroken chain of good actions. What is one kind act you could do today — simply for the act itself?",
  },
  {
    ref: "Book VI · §13",
    text: "He that honours a reasonable soul in general, as it is reasonable and naturally sociable, doth little regard anything else: and above all things is careful to preserve his own in the continual habit and exercise both of reason and sociableness.",
    reflect: "Reason and care for others — Marcus treated these as the core of what it means to be human. Are you exercising both?",
  },
  {
    ref: "Book VI · §17",
    text: "Who can choose but wonder at them? They will not speak well of them that are at the same time with them, and live with them; yet they themselves are very ambitious that they that shall follow, whom they have never seen, should speak well of them.",
    reflect: "We ignore the people around us while chasing the approval of strangers and posterity. Who in your life right now deserves more of your attention?",
  },
  {
    ref: "Book VI · §30",
    text: "Let not future things disturb thee, for thou wilt come to them, if it shall be necessary, having with thee the same reason which now thou usest for present things.",
    reflect: "Anxiety borrows trouble from a future that hasn't arrived yet. What present resource — your reason, your character — will still be with you when that future comes?",
  },
  {
    ref: "Book VII · §9",
    text: "All things are from nature, and in nature, and to nature. The philosopher's thought runs: of what nature is this thing? what is its cause and its end?",
    reflect: "Asking what something truly is — its nature, its cause, its end — cuts through a lot of confusion. Apply this question to something you are currently struggling with.",
  },
  {
    ref: "Book VII · §14",
    text: "Though thou shouldst live three thousand years, or thirty thousand, remember that no man loses any other life than that he now lives, nor lives any other than that he now loses.",
    reflect: "You cannot lose a future that hasn't arrived. The only life at stake is the one happening right now. How are you treating it?",
  },
  {
    ref: "Book VII · §29",
    text: "Erase the imagination. Stop the pulling of the strings. Confine thyself to the present.",
    reflect: "Three instructions. Which one do you need most right now — and what would it mean to actually follow it today?",
  },
  {
    ref: "Book VII · §54",
    text: "Everywhere and at all times it is in thy power to accept religiously thy present condition, to behave justly to those about thee, and to exert thy skill upon thy present thoughts, that nothing shall steal into them without being well examined.",
    reflect: "Three powers always available to you: acceptance, justice toward others, and examined thought. Which are you neglecting?",
  },
  {
    ref: "Book VII · §68",
    text: "True greatness of soul consists in the contempt of small things, in performing what is right and in continuing to be of that mind which thou art now for ever.",
    reflect: "Small irritations reveal character. What small thing has been pulling you away from the person you want to be?",
  },
  {
    ref: "Book VIII · §7",
    text: "Let not the future trouble thee. Thou wilt come to it, if thou must, with the same reason thou now hast. For the present, direct that reason to its proper work.",
    reflect: "Your future self will have the same rational capacity you have now. The question is whether you are sharpening it today. What is your reason's proper work right now?",
  },
  {
    ref: "Book VIII · §17",
    text: "Remember that to change thy opinion and to follow him who corrects thy error is as consistent with freedom as it is to persist in thy error.",
    reflect: "Changing your mind when shown you're wrong is strength, not weakness. When did you last genuinely update a belief?",
  },
  {
    ref: "Book VIII · §47",
    text: "If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgment about it. And it is in thy power to wipe out that judgment now.",
    reflect: "The pain is real. But the story you tell about the pain — that is yours to rewrite. What story are you telling about your current difficulty?",
  },
  {
    ref: "Book VIII · §48",
    text: "Remember that the ruling faculty is invincible, when self-collected it is satisfied with itself, if it does nothing which it does not choose to do, even if it resist from mere obstinacy. What then will it be when it forms a judgement about anything aided by reason?",
    reflect: "Your mind, when grounded in reason and self-mastery, is genuinely invincible. When did you last feel that kind of inner steadiness?",
  },
  {
    ref: "Book IX · §3",
    text: "Do not indulge hopes which will certainly fail thee, or flee from evils which will inevitably come.",
    reflect: "Hope and fear both pull you out of reality. What are you chasing that probably won't save you — and what are you avoiding that will come regardless?",
  },
  {
    ref: "Book IX · §6",
    text: "Receive without pride, relinquish without struggle.",
    reflect: "Four words that contain an entire philosophy. Which half is harder for you — receiving without pride, or letting go without struggle?",
  },
  {
    ref: "Book IX · §29",
    text: "Do not look round thee to discover other men's ruling principles, but look straight to this, to what nature leads thee both the universal nature through the things that happen to thee, and thy own nature through the acts which must be done by thee.",
    reflect: "You already know what you are supposed to do. What is stopping you from simply doing it?",
  },
  {
    ref: "Book IX · §40",
    text: "Either the gods have power or they have not. If they have not, why dost thou pray? But if they have, why dost thou not ask them to give thee the faculty of not fearing any of the things which thou fearest?",
    reflect: "Marcus challenges the gap between belief and practice. Where in your life are you praying for outcomes but not for character?",
  },
  {
    ref: "Book X · §6",
    text: "Whether the universe is a concourse of atoms, or nature is a system, let this first be established: that I am a part of the whole which is governed by nature; next, that I stand in some intimate connection with other kindred parts.",
    reflect: "We are not isolated — we are part of something. What would change in how you treat the people around you if you truly felt that kinship?",
  },
  {
    ref: "Book X · §8",
    text: "Thou hast power over thy mind, not outside events. Realise this, and thou wilt find strength.",
    reflect: "This is perhaps Marcus's most direct statement. Where are you exhausting yourself trying to control something outside your mind?",
  },
  {
    ref: "Book X · §16",
    text: "Confine thyself to the present. Understand well both what happens to thee and what thou doest; for in this the divine will is revealed.",
    reflect: "The present moment is not an obstacle between you and your real life. It is your real life. Are you in it?",
  },
  {
    ref: "Book X · §30",
    text: "On the occasion of every act ask thyself: How is this with respect to me? Shall I repent of it? A little time and I am dead, and all is gone.",
    reflect: "Marcus used his own mortality as a filter for decision-making. Run your current decision through this filter. Does it survive?",
  },
  {
    ref: "Book XI · §4",
    text: "He who fears death either fears the loss of sensation or a different kind of sensation. But if thou shalt have no sensation, neither wilt thou feel any harm; and if thou shalt acquire another kind of sensation, thou wilt be a different kind of living being.",
    reflect: "Marcus strips death of its terror through clear thinking. What fear in your life might dissolve if you examined it with the same directness?",
  },
  {
    ref: "Book XI · §18",
    text: "First, consider what kind of man the wrongdoer is. But also see that thou art not compelled to be angry — thou thyself art not compelled to share in that which he shares. Consider also that he acts from ignorance.",
    reflect: "People who wrong us are almost always acting from some form of ignorance. Can you hold both truths at once — that you were wronged, and that the person didn't truly know what they were doing?",
  },
  {
    ref: "Book XII · §1",
    text: "All those things at which thou wishest to arrive by a circuitous road, thou canst have now, if thou dost not refuse them to thyself. And this means, if thou wilt take no notice of all the past, and trust the future to providence, and direct the present only conformably to piety and justice.",
    reflect: "The life you are working toward — how much of it is already available to you right now, if you simply stopped refusing it?",
  },
  {
    ref: "Book XII · §6",
    text: "The best way of avenging thyself is not to become like the wrongdoer.",
    reflect: "Every time you refuse to become what hurt you, you win. What is one way you are in danger of becoming what you despise?",
  },
  {
    ref: "Book XII · §23",
    text: "Everything harmonizes with me, which is harmonious to thee, O Universe. Nothing for me is too early nor too late, which is in due time for thee. Everything is fruit to me which thy seasons bring, O Nature: from thee are all things, in thee are all things, to thee all things return.",
    reflect: "This is Marcus at his most surrendered — not defeated, but aligned. What would it feel like to stop fighting the timing of your own life?",
  },
  {
    ref: "Book XII · §26",
    text: "When thou art troubled about anything, thou hast forgotten this: that all things happen according to the universal nature, and that a man's wrongful act is nothing to thee, and further that everything which happens always happened so and will happen so, and now happens so everywhere.",
    reflect: "Marcus returns constantly to this: things are as they are. Not as punishment, not as injustice directed at you. Just as they are. Can you find any peace in that?",
  },

  // ── JEAN-JACQUES ROUSSEAU — The Social Contract ──────────────────────────
  {
    ref: "The Social Contract · Book I, Ch. 1",
    text: "Man was born free, and everywhere he is in chains. Many a one believes himself the master of others, and yet he is a greater slave than they. How has this change come about? I do not know. What can make it legitimate? I believe I can settle this question.",
    reflect: "Rousseau opens with one of philosophy's most powerful lines. In what ways do you carry chains you have accepted as normal — social, mental, or otherwise?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 1",
    text: "The social order is a sacred right that serves as a foundation for all others. This right, however, does not come from nature. It is therefore based on conventions.",
    reflect: "The rules we live by are not natural facts — they are agreements. Which conventions in your life have you accepted without questioning whether they still serve you?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 2",
    text: "The earliest of all societies, and the only natural one, is the family; yet children remain attached to their father only so long as they need him for their own survival. As soon as this need ceases, the natural bond is dissolved.",
    reflect: "Rousseau argues that even the family is ultimately held together by choice, not nature. Which of your relationships are held together by genuine choice — and which by habit or obligation?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 2",
    text: "This common liberty is a consequence of man's nature. His first law is to attend to his own survival, his first concerns are those he owes to himself; and as soon as he reaches the age of rationality, being sole judge of how to survive, he becomes his own master.",
    reflect: "Rousseau places self-determination at the core of human nature. At what point in your life did you truly become your own master — or are you still working toward that?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 3",
    text: "The strongest man is never strong enough to be always master, unless he transforms his power into right, and obedience into duty.",
    reflect: "Raw power alone cannot sustain authority — it must be made legitimate. Where in your own life do you exercise influence, and is it grounded in genuine right or merely in force of habit?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 3",
    text: "Let us agree, then, that might does not make right, and that we are bound to obey none but lawful authorities.",
    reflect: "This is a deceptively simple statement with enormous consequences. Which authorities in your life have you accepted as lawful — and have you ever examined why?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 4",
    text: "Since no man has any natural authority over his fellow men, and since might is not the source of right, conventions remain as the basis of all lawful authority among men.",
    reflect: "If authority is purely conventional, then it can be renegotiated. What conventions govern your work, relationships, or community — and which ones deserve to be rethought?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 6",
    text: "To find a form of association that may defend and protect with the whole force of the community the person and property of every associate, and by means of which each, joining together with all, may nevertheless obey only himself, and remain as free as before — such is the fundamental problem of which the social contract provides the solution.",
    reflect: "Rousseau's central question: how can we live together without surrendering ourselves? Do you feel that the communities you belong to protect your freedom, or diminish it?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 6",
    text: "Each giving himself to all, gives himself to no one; and since there is no associate over whom we do not acquire the same rights which we concede to him over ourselves, we gain the equivalent of all that we lose, and more power to preserve what we have.",
    reflect: "True community is an equal exchange, not a sacrifice. Think of a group you belong to — is the exchange genuinely equal, or does one side give more than it receives?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 7",
    text: "Whoever refuses to obey the general will shall be constrained to do so by the whole body; which means nothing else than that he shall be forced to be free.",
    reflect: "One of Rousseau's most debated lines — freedom through constraint. Is there a discipline or structure in your life that initially felt like a restriction but ultimately made you more free?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 8",
    text: "The transition from the state of nature to the civil state produces a very remarkable change in man, by substituting in his behavior justice for instinct, and by imbuing his actions with a moral quality they previously lacked.",
    reflect: "Rousseau sees civilization as a moral upgrade, not just a practical one. In what ways has living among others made you more just, more careful, more human than you would have been alone?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 8",
    text: "Only when the voice of duty prevails over physical impulse, and law prevails over appetite, does man, who until then was preoccupied only with himself, understand that he must act according to other principles, and must consult his reason before listening to his inclinations.",
    reflect: "The gap between impulse and reason is where character is built. Where in your life do you still let appetite win over judgment — and what would change if duty won instead?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 8",
    text: "What man loses because of the social contract is his natural liberty and an unlimited right to anything that tempts him; what he gains is civil liberty and property in all that he possesses.",
    reflect: "Every commitment trades unlimited possibility for something more real and stable. What have you given up to gain something more meaningful — and was the trade worth it?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 8",
    text: "The impulse of mere appetite is slavery, while obedience to a self-prescribed law is freedom.",
    reflect: "Being ruled by your cravings is a form of captivity. What self-prescribed law — a discipline, a value, a commitment — gives you the most genuine sense of freedom?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 9",
    text: "Instead of destroying natural equality, the fundamental pact, on the contrary, substitutes a moral and lawful equality for the physical inequality that nature imposed upon men, so that, although unequal in strength or intellect, they all become equal by convention and legal right.",
    reflect: "Law can create a kind of equality that nature never provides. Where do you benefit from this constructed equality — and where do you notice it breaking down around you?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 1",
    text: "Sovereignty, being nothing but the exercise of the general will, can never be alienated, and the sovereign power, which is in fact a collective being, can be represented only by itself; power indeed can be transmitted, but not will.",
    reflect: "You cannot hand your authentic will over to someone else to exercise on your behalf. In what areas of your life have you delegated your will — your choices, your voice — when you should have kept them?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 1",
    text: "If the people simply promises to obey, it dissolves itself by that act and loses its character as a people; the moment there is a master, there is no longer a sovereign.",
    reflect: "Blind obedience is self-erasure. Think of an institution, relationship, or ideology you follow — are you a participant with a voice, or have you quietly handed yourself over?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 3",
    text: "The general will is always right and always tends to the public good; but it does not follow that the deliberations of the people always have the same rectitude. Men always desire their own good, but do not always discern it.",
    reflect: "Wanting good outcomes and knowing how to achieve them are two different things. Where in your life are you confident of your desires but uncertain of your judgment?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 3",
    text: "The people are never corrupted, though often deceived, and it is only then that they seem to will what is evil.",
    reflect: "Rousseau is surprisingly generous about human nature — he blames deception, not depravity. Think of a time you made a decision you later regretted. Were you deceived, or were you deceiving yourself?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 3",
    text: "There is often a great deal of difference between the will of all and the general will; the latter regards only the common interest, while the former has regard to private interests, and is merely a sum of particular wills.",
    reflect: "What everyone wants individually is not the same as what is good for everyone collectively. Where do you see this tension playing out in your own community or country right now?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 4",
    text: "The sovereign power, wholly absolute, wholly sacred, and wholly inviolable, does not and cannot transcend the limits of general agreements; and every man can fully control what is left to him of his property and liberty by these agreements.",
    reflect: "Even the highest authority has limits defined by the agreements that created it. Where do you feel the institutions in your life have exceeded the mandate you gave them?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 4",
    text: "Why is the general will always right, and why do all invariably desire the prosperity of each, unless it is because there is no one who appropriates to himself this word each without also thinking of himself when voting on behalf of all?",
    reflect: "Rousseau argues self-interest and common interest align when we think clearly. When you vote, choose, or decide on behalf of a group — are you thinking of everyone, or quietly privileging yourself?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 5",
    text: "The social contract has as its end the preservation of the contracting parties. He who desires the end also desires the means, and some risks, even some losses, are inseparable from these means.",
    reflect: "Every worthy goal carries unavoidable costs. What risk or loss are you currently reluctant to accept, even though it is genuinely necessary for something you say you want?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 5",
    text: "Again, the frequency of capital punishments is always a sign of weakness or indolence in the government. There is no man so worthless that he cannot be made good for something.",
    reflect: "Rousseau believed in the redeemability of people rather than their disposal. Who in your life have you written off — and is that judgment truly final, or is it a failure of imagination?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 6",
    text: "What is right and conformable to order is such by the nature of things, and independently of human conventions. All justice comes from God, He alone is the source of it; but if we understood how to receive it direct from so lofty a source, we would need neither government nor laws.",
    reflect: "Rousseau acknowledges a justice beyond law — and our failure to access it directly. Where do you sense that something is wrong even though it is technically legal?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 6",
    text: "Conventions and laws are necessary to couple rights with duties and apply justice to its object. In the state of nature, where everything exists in common, I owe nothing to those to whom I have promised nothing.",
    reflect: "Obligation is created by promise and convention, not by nature. What promises have you made — explicit or implicit — that you are not fully honoring?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 7",
    text: "In order to discover the rules of society that are best suited to nations, there would be needed a superior intelligence that beheld all the passions of men without feeling any of them; who had no affinity with our nature, yet knew it thoroughly.",
    reflect: "Rousseau describes an ideal lawgiver who is beyond human weakness. Which of your passions most distorts your judgment when you try to make rules or decisions for others?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 7",
    text: "He who dares to undertake the founding of a people's institutions must feel himself capable of changing human nature, of transforming each individual, who by himself is a complete and separate whole, into part of a greater whole.",
    reflect: "Real change — in a community, a company, a family — requires transforming how people see themselves. Have you ever been part of something that genuinely changed who you were?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 11",
    text: "Every political system has an object, or should have one. This object, which distinguishes it from others, is the common good. And what is this common good? It is composed of two elements, liberty and equality.",
    reflect: "Liberty and equality are both necessary but can pull against each other. In your own life, where do you find yourself trading one for the other — and is the balance right?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 12",
    text: "Laws are always useful to those who possess and injurious to those who have nothing; whence it follows that the social state is advantageous to men only so far as they all have something, and none of them has too much.",
    reflect: "Rules tend to protect what already exists. Who benefits from the rules in your workplace, your community, your country — and who is quietly disadvantaged by them?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 1",
    text: "Every free action has two causes that concur to produce it: one moral, namely the will that determines the act; the other physical, namely the power that executes it. When I walk toward an object, the will to do so and my legs to carry me there are both necessary. A paralytic who wills to run, and a nimble man who does not will to, both stay where they are.",
    reflect: "Will without power is impotent. Power without will is directionless. Where in your life do you have the will but lack the capacity — and where do you have the capacity but lack the will to use it?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 2",
    text: "It is not good for one who makes the laws to execute them, nor for the body of the people to turn its attention from general considerations to particular objects.",
    reflect: "There is wisdom in separating the role of creator from executor. In your own work or life, where do you need to step back from executing and return to thinking about the bigger picture?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 4",
    text: "A government so perfect is not suited to men. If there were a people of gods, it would govern itself democratically. A government so perfect is not suited to men.",
    reflect: "Rousseau is honest about the gap between ideal systems and flawed humans. What ideal are you holding yourself or others to that is genuinely too perfect for real human life?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 6",
    text: "In general, a democratic government is suited to small States, an aristocratic one to States of medium size, and a monarchical one to large States. But there are a thousand exceptions to this rule.",
    reflect: "Context determines what system works. What structure — for your team, family, or project — fits the size and nature of what you are actually working with, not some ideal?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 9",
    text: "The moment a people gives itself representatives, it is no longer free; it no longer exists.",
    reflect: "Rousseau believed freedom requires direct participation, not delegation. In what areas of your life have you outsourced your agency to someone else to manage — and what would it mean to take it back?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 10",
    text: "The government usurps the sovereignty when the prince, instead of executing the laws, makes them; when it governs the people instead of serving them; when it turns its power against the people.",
    reflect: "This inversion — servant becoming master — happens in institutions, relationships, and within ourselves. Where has something that was meant to serve you ended up controlling you?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 11",
    text: "The body politic, as well as the human body, begins to die as soon as it is born, and carries within itself the causes of its destruction.",
    reflect: "Every institution carries the seeds of its own decline. What in your life — a company, a relationship, a habit — is showing the early signs of decay, and what would it take to renew it?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 12",
    text: "The sovereign has no other force than the legislative power; it acts only by the laws; and as the laws are only the authentic acts of the general will, the sovereign could not act but when the people is assembled.",
    reflect: "Real authority requires genuine participation, not just formal structures. Where do you have a nominal voice but not a real one — and what would genuine participation look like?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 13",
    text: "There is but one law which, from its nature, needs unanimous consent: the social compact; for civil association is the most voluntary of all acts; every man being born free and master of himself, no one is able, on any pretext whatsoever, to make any man subject without his consent.",
    reflect: "Consent is the foundation of legitimate authority. Look at the largest commitments in your life — did you give genuine, informed consent, or did you simply drift into them?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 15",
    text: "The deputies of the people are not and cannot be its representatives; they are its commissioners only, and can do nothing definitively. Every law the people has not ratified in person is void; it is not a law.",
    reflect: "Rousseau insists that no one can truly speak for you. Where do you let others speak for you — in your name, on your behalf — without actually checking whether they represent what you truly believe?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 15",
    text: "The English people thinks itself free; it is gravely mistaken; it is free only during the election of members of parliament; as soon as they are elected, it is a slave, it is nothing.",
    reflect: "Participation once every few years is not genuine freedom. In what areas of your life do you confuse the ritual of choice with the reality of ongoing self-determination?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 1",
    text: "As long as a number of men in combination are considered as a single body, they have but one will, which relates to the common preservation and to the general welfare. In this case all the resources of the State are vigorous and simple, its maxims clear and luminous; there are no embroiled or conflicting interests.",
    reflect: "Unity of purpose produces clarity and power. Think of the last time a group you were part of had genuine shared purpose. What made it work — and what caused it to fracture?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 1",
    text: "A State thus governed needs very few laws; and as it becomes necessary to issue new ones, the necessity is universally seen. The first man to propose them merely says what all have already felt.",
    reflect: "The best rules articulate what the community already knows to be right. What rule or principle in your life have you been living by without ever naming it explicitly?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 2",
    text: "There is but one general will. When a contrary opinion is carried, this proves nothing except that I was deceived, and that what I thought to be the general will was not so.",
    reflect: "Rousseau reframes losing a vote: you were not overruled, you were corrected. How do you usually respond to being outvoted or overridden — as an injustice, or as new information?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 7",
    text: "The institution of the dictatorship is in no wise dangerous where employed in those grave and critical junctures when the country is in peril; the danger lies in the abuse of this institution by allowing it to extend beyond necessity.",
    reflect: "Emergency powers exist for emergencies — not as permanent tools. Where in your life have you granted someone emergency authority that has quietly become ordinary authority?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 8",
    text: "No State has ever been founded without a religious basis. Christianity, as a religion, is wholly favourable to tyranny. It makes men too little attached to things of this world; it creates a holy, inviolable, unquestioned authority which is always exploited by tyrants.",
    reflect: "Rousseau raises the uncomfortable question of how belief systems can be used to pacify rather than liberate. What beliefs — religious, political, or cultural — have you accepted in ways that diminish rather than expand your agency?",
  },
  {
    ref: "The Social Contract · Book IV, Ch. 8",
    text: "There is a purely civil profession of faith, the articles of which it belongs to the sovereign to fix, not exactly as religious dogmas, but as social sentiments, without which it is impossible to be either a good citizen or a faithful subject.",
    reflect: "Rousseau believed shared civic values are as important as laws. What are the core values your community actually shares — not what they say they share, but what they demonstrate through action?",
  },
  {
    ref: "The Social Contract · Preface",
    text: "I want to inquire whether, taking men as they are and laws as they can be made to be, it is possible to establish some just and reliable rule of administration in civil affairs. I shall always strive to reconcile what right permits with what interest prescribes, so that justice and utility may not be at variance.",
    reflect: "Rousseau begins with a practical question, not an ideal one — working with humans as they are, not as we wish they were. Where in your life are you designing for the ideal human instead of the actual one?",
  },
  {
    ref: "The Social Contract · Preface",
    text: "Born a citizen of a free State, and a member of that sovereign body, however feeble an influence my voice may have in public affairs, the right to vote on them is sufficient to impose on me the duty of informing myself about them.",
    reflect: "Having the right to speak comes with the duty to be informed before speaking. Where are you exercising influence or casting judgment without having done the work of truly understanding the issue?",
  },
  {
    ref: "The Social Contract · Book I, Ch. 4",
    text: "To renounce liberty is to renounce being a man, to surrender the rights of humanity and even its duties. For him who renounces everything there is no possible compensation. Such a renunciation is incompatible with man's nature; to remove all liberty from his will is to remove all morality from his acts.",
    reflect: "Rousseau says giving up freedom is giving up humanity itself. In what quiet ways — through comfort, fear, or conformity — have you been slowly renouncing your liberty?",
  },
  {
    ref: "The Social Contract · Book II, Ch. 7",
    text: "Gods would be needed to give men laws. The same reasoning that Plato used when seeking his civil or royal man in his Republic is used by Rousseau in terms of legislation.",
    reflect: "The gap between what is needed and what is humanly possible is where most institutions fail. What in your life demands more wisdom than you or anyone around you actually has — and how do you act wisely anyway?",
  },
  {
    ref: "The Social Contract · Book III, Ch. 15",
    text: "Sovereignty cannot be represented, for the same reason that it cannot be alienated; it consists essentially in the general will, and the will cannot be represented.",
    reflect: "Your deepest will — what you truly want for your life — cannot be handed to someone else to carry. Who or what are you allowing to represent your will, when only you can truly exercise it?",
  },
];



export default function PhiloApp() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem("praxis_mode") || "dark"; } catch { return "dark"; }
  });
  const [onboardingDone, setOnboardingDone] = useState(() => {
    try { return localStorage.getItem("praxis_onboarding_done") === "true"; } catch { return false; }
  });
  const [showIntro, setShowIntro] = useState(() => {
    try { return localStorage.getItem("praxis_intro_seen") !== "true"; } catch { return true; }
  });
  const [introStep, setIntroStep] = useState(0);
  const [introExiting, setIntroExiting] = useState(false);
  const [screen, setScreen] = useState(() => {
    try { return localStorage.getItem("praxis_onboarding_done") === "true" ? "home" : "onboarding"; } catch { return "onboarding"; }
  });
  const [activeTab, setActiveTab] = useState("read");
  const [fontChoice, setFontChoice] = useState(() => {
    try { return localStorage.getItem("praxis_font") || "crimson"; } catch { return "crimson"; }
  });
  const [showFontPicker, setShowFontPicker] = useState(false);
  const [fontSize, setFontSize] = useState(15);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboardingAnswers, setOnboardingAnswers] = useState(() => {
    try { const s = localStorage.getItem("praxis_onboarding_answers"); return s ? JSON.parse(s) : {}; } catch { return {}; }
  });
  const [profileName, setProfileName] = useState(() => {
    try { return localStorage.getItem("praxis_name") || ""; } catch { return ""; }
  });
  const [profilePhoto, setProfilePhoto] = useState(() => {
    try { return localStorage.getItem("praxis_photo") || ""; } catch { return ""; }
  });
  const photoInputRef = useRef(null);

  // Generate unique gradient from name
  const getAvatarGradient = (name) => {
    const gradients = [
      ["#c9a96e", "#8B5E3C"], // amber
      ["#6db86d", "#2E7D32"], // green
      ["#7b7bd4", "#3F3F9F"], // purple
      ["#d46b6b", "#9F2F2F"], // red
      ["#5b93d1", "#1A5C9F"], // blue
      ["#b06dd4", "#6A1F9F"], // violet
      ["#c8b44a", "#8F7A1A"], // gold
      ["#6dd4b0", "#1F9F6A"], // teal
    ];
    if (!name) return gradients[0];
    const idx = name.charCodeAt(0) % gradients.length;
    return gradients[idx];
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validate file type by MIME — not just extension
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) return;
    // Cap file size at 10MB
    if (file.size > 10 * 1024 * 1024) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const outputSize = 300;
        canvas.width = outputSize;
        canvas.height = outputSize;
        const ctx = canvas.getContext("2d");
        // Center crop — take the smaller dimension as the square
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, outputSize, outputSize);
        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        setProfilePhoto(compressed);
        try { localStorage.setItem("praxis_photo", compressed); } catch {}
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };
  const [userAge, setUserAge] = useState(22);
  const [ageInput, setAgeInput] = useState("22");
  const [btnPressed, setBtnPressed] = useState(false);
  const [btnBounce, setBtnBounce] = useState(false);
  const [readingIndex, setReadingIndex] = useState(() => {
    try { const s = localStorage.getItem("praxis_reading_index"); return s ? parseInt(s) : 0; } catch { return 0; }
  });
  const [readDone, setReadDone] = useState(() => {
    try { const s = localStorage.getItem("praxis_read_done"); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
  });
  const [streak, setStreak] = useState(() => {
    try { const s = localStorage.getItem("praxis_streak"); return s ? parseInt(s) : 0; } catch { return 0; }
  });
  const [lastReadDate, setLastReadDate] = useState(() => {
    try { return localStorage.getItem("praxis_last_read_date") || ""; } catch { return ""; }
  });

  useEffect(() => {
    try { localStorage.setItem("praxis_reading_index", String(readingIndex)); } catch {}
  }, [readingIndex]);

  // Lock to portrait orientation
  useEffect(() => {
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("portrait").catch(() => {});
      } else if (window.screen.lockOrientation) {
        window.screen.lockOrientation("portrait");
      } else if (window.screen.mozLockOrientation) {
        window.screen.mozLockOrientation("portrait");
      }
    } catch {}
  }, []);

  useEffect(() => {
    document.body.style.background = mode === "dark" ? "#0A0A0A" : "#F5F0E8";
    document.body.style.transition = "background 0.15s ease";
    document.body.classList.add("theme-transition");
    const t = setTimeout(() => document.body.classList.remove("theme-transition"), 400);
    return () => clearTimeout(t);
  }, [mode]);

  useEffect(() => {
    try { localStorage.setItem("praxis_read_done", JSON.stringify([...readDone])); } catch {}
  }, [readDone]);


  useEffect(() => {
    try { localStorage.setItem("praxis_streak", String(streak)); } catch {}
  }, [streak]);

  useEffect(() => {
    try { localStorage.setItem("praxis_last_read_date", lastReadDate); } catch {}
  }, [lastReadDate]);

  useEffect(() => {
    try { localStorage.setItem("praxis_onboarding_answers", JSON.stringify(onboardingAnswers)); } catch {}
  }, [onboardingAnswers]);

  // Call this whenever a passage is marked as read
  const updateStreak = () => {
    const today = new Date().toDateString();
    if (lastReadDate === today) return; // already read today, no change
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastReadDate === yesterday) {
      setStreak(s => s + 1); // consecutive day
    } else {
      setStreak(1); // streak broken or first time
    }
    setLastReadDate(today);
  };
  const [readingAnim, setReadingAnim] = useState(false);
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);
  const rafRef = useRef(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeExiting, setSwipeExiting] = useState(null);
  const [swipeEntering, setSwipeEntering] = useState(null);

  const dotScrollRef = useRef(null);

  const goToReading = (idx, direction = null) => {
    if (idx < 0 || idx >= passages.length) return;
    if (direction) {
      // Step 1: slide current card out
      setSwipeExiting(direction);
      setSwipeOffset(0);
      setTimeout(() => {
        // Step 2: swap content while invisible, set entering direction
        setSwipeExiting(null);
        setReadingIndex(idx);
        setSwipeEntering(direction);
        // Step 3: clear entering after animation completes
        setTimeout(() => setSwipeEntering(null), 400);
      }, 160);
    } else {
      setReadingAnim(true);
      setTimeout(() => setReadingAnim(false), 350);
      setReadingIndex(idx);
    }
  };

  useEffect(() => {
    if (!dotScrollRef.current) return;
    const container = dotScrollRef.current;
    const dotWidth = 8 + 6; // dot width + gap
    const containerWidth = container.clientWidth;
    const targetScroll = idx => dotWidth * idx - containerWidth / 2 + dotWidth / 2;
    container.scrollTo({ left: targetScroll(readingIndex), behavior: "smooth" });
  }, [readingIndex]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDaysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const now = new Date();
  const localDayIndex = now.getDay();
  const todayLabel = `${monthNames[now.getMonth()]} ${now.getDate()}`;
  const initWeekTasks = () => {
    try {
      const saved = localStorage.getItem("praxis_tasks");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate it's an object with the right shape
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {}
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

  useEffect(() => {
    try { localStorage.setItem("praxis_tasks", JSON.stringify(weekTasks)); } catch {}
  }, [weekTasks]);

  // Recurring tasks: { id, text, days: ["Mon","Tue",...] or "daily", lastReset: "datestring" }
  const [recurringTasks, setRecurringTasks] = useState(() => {
    try { const s = localStorage.getItem("praxis_recurring"); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem("praxis_recurring", JSON.stringify(recurringTasks)); } catch {}
  }, [recurringTasks]);

  // State for the repeat picker popup
  const [repeatPicker, setRepeatPicker] = useState(null);
  const [repeatPickerRecurId, setRepeatPickerRecurId] = useState(null);
  const [pickerText, setPickerText] = useState("");
  const [pickerDays, setPickerDays] = useState("daily");

  // Auto-reset recurring task checkboxes daily
  useEffect(() => {
    const today = new Date().toDateString();
    const todayDay = weekDays[new Date().getDay()];
    setRecurringTasks(prev => prev.map(rt => {
      if (rt.lastReset === today) return rt;
      return { ...rt, done: false, lastReset: today };
    }));
  }, []);

  const addRecurringTask = (text, days) => {
    const rt = { id: `recur-${Date.now()}`, text, days, done: false, lastReset: new Date().toDateString() };
    setRecurringTasks(prev => [...prev, rt]);
  };
  const updateRecurringTask = (id, changes) => setRecurringTasks(prev => prev.map(rt => rt.id === id ? { ...rt, ...changes } : rt));
  const deleteRecurringTask = (id) => setRecurringTasks(prev => prev.filter(rt => rt.id !== id));
  const toggleRecurringTask = (id) => setRecurringTasks(prev => prev.map(rt => rt.id === id ? { ...rt, done: !rt.done } : rt));

  const getRecurringForDay = (day) => recurringTasks.filter(rt => rt.days === "daily" || (Array.isArray(rt.days) && rt.days.includes(day)));

  const [selectedTaskDay, setSelectedTaskDay] = useState(weekDays[localDayIndex]);
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
      try { localStorage.setItem("praxis_onboarding_done", "true"); } catch {}
      return;
    }
    const sel = onboardingAnswers[q.id] || [];
    if (sel.length === 0) return;
    if (onboardingStep < onboardingQuestions.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    }
  };

  // Sanitize user input — strips HTML tags and script-like patterns
  const sanitize = (str) => {
    if (typeof str !== "string") return "";
    return str
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .slice(0, 500);
  };

  const updateTaskText = (day, taskId, text) => {
    setWeekTasks({
      ...weekTasks,
      [day]: weekTasks[day].map((tk) => (tk.id === taskId ? { ...tk, text: sanitize(text) } : tk)),
    });
  };

  const [celebrating, setCelebrating] = useState(false);

  // Onboarding tour
  const [tourStep, setTourStep] = useState(() => {
    try { return localStorage.getItem("praxis_tour_done") === "true" ? -1 : 0; } catch { return 0; }
  });
  const dismissTour = () => {
    setTourStep(-1);
    try { localStorage.setItem("praxis_tour_done", "true"); } catch {}
  };

  // Daily check-in popup
  const [showCheckin, setShowCheckin] = useState(() => {
    try {
      const last = localStorage.getItem("praxis_checkin_date");
      return last !== new Date().toDateString();
    } catch { return true; }
  });
  const [checkinInput, setCheckinInput] = useState("");

  const dismissCheckin = () => {
    try { localStorage.setItem("praxis_checkin_date", new Date().toDateString()); } catch {}
    if (checkinInput.trim()) {
      const intention = sanitize(checkinInput.trim());
      // Add intention as first task of today
      const todayDay = weekDays[new Date().getDay()];
      setWeekTasks(prev => {
        const todayTasks = [...(prev[todayDay] || [])];
        // Replace first empty task or prepend
        const firstEmptyIdx = todayTasks.findIndex(tk => !tk.text.trim());
        if (firstEmptyIdx !== -1) {
          todayTasks[firstEmptyIdx] = { ...todayTasks[firstEmptyIdx], text: intention };
        } else {
          todayTasks.unshift({ id: todayDay + "-intention-" + Date.now(), text: intention, done: false });
        }
        return { ...prev, [todayDay]: todayTasks };
      });
      setSelectedTaskDay(todayDay);
      setActiveTab("todo");
    }
    setShowCheckin(false);
    setCheckinInput("");
  };

  // Journal — per day, Option A resets at midnight, Option B keeps all entries
  const [journalMode, setJournalMode] = useState(() => {
    try { return localStorage.getItem("praxis_journal_mode") || "A"; } catch { return "A"; }
  });

  const getJournalKey = (day) => `praxis_journal_${day}`;

  const loadJournalForDay = (day) => {
    try {
      const saved = localStorage.getItem(getJournalKey(day));
      if (!saved) return "";
      const { text, date } = JSON.parse(saved);
      const today = new Date();
      if (journalMode === "A" && date !== today.toDateString()) return "";
      if (journalMode === "C") {
        // Reset every Sunday — clear if saved date was before this week's Sunday
        const savedDate = new Date(date);
        const dayOfWeek = today.getDay();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - dayOfWeek);
        lastSunday.setHours(0, 0, 0, 0);
        if (savedDate < lastSunday) return "";
      }
      // Mode B and D — never auto-reset
      return text;
    } catch { return ""; }
  };

  const [journalEntries, setJournalEntries] = useState(() => {
    const entries = {};
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d => {
      entries[d] = loadJournalForDay(d);
    });
    return entries;
  });

  const saveJournal = (day, text) => {
    const clean = text === "" ? "" : sanitize(text.slice(0, 5000));
    setJournalEntries(prev => ({ ...prev, [day]: clean }));
    try {
      localStorage.setItem(getJournalKey(day), JSON.stringify({
        text: clean,
        date: new Date().toDateString(),
      }));
    } catch {}
  };

  const currentJournal = journalEntries[selectedTaskDay] || "";
  const journalWordCount = currentJournal.trim() ? currentJournal.trim().split(/\s+/).length : 0;

  const toggleTask = (day, taskId) => {
    const prevTask = weekTasks[day].find((tk) => tk.id === taskId);
    const newTasks = weekTasks[day].map((tk) => (tk.id === taskId ? { ...tk, done: !tk.done } : tk));
    setWeekTasks({ ...weekTasks, [day]: newTasks });
    const withText = newTasks.filter((tk) => tk.text.trim());
    if (prevTask && !prevTask.done && withText.length > 1 && withText.every((tk) => tk.done)) {
      setCelebrating(true);
    } else {
      setCelebrating(false);
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

  const todayKey = weekDays[localDayIndex];
  const totalTasks = Object.values(weekTasks).flat().filter((tk) => tk.text.trim()).length;
  const totalDone = Object.values(weekTasks).flat().filter((tk) => tk.text.trim() && tk.done).length;

  // INTRO SLIDES
  if (screen === "onboarding" && !onboardingDone && showIntro) {
    const philoSlides = [
      {
        label: "DAILY READING",
        quote: "The impediments to action advance action. What stands in the way becomes the way.",
        author: "Marcus Aurelius",
        bg: "radial-gradient(ellipse at 30% 60%, #1a1208 0%, #0A0A0A 70%)",
        accent: "#c9a96e",
      },
      {
        label: "DAILY TASKS",
        quote: "First say to yourself what you would be, and then do what you have to do.",
        author: "Epictetus",
        bg: "radial-gradient(ellipse at 70% 40%, #0d1a0d 0%, #0A0A0A 70%)",
        accent: "#6db86d",
      },
      {
        label: "SCREEN TIME",
        quote: "It is not that we have a short time to live, but that we waste much of it.",
        author: "Seneca",
        bg: "radial-gradient(ellipse at 50% 70%, #0d0d1a 0%, #0A0A0A 70%)",
        accent: "#7b7bd4",
      },
      {
        label: "YOUR LIFE IN YEARS",
        quote: "Man was born free, and everywhere he is in chains.",
        author: "Jean-Jacques Rousseau",
        bg: "radial-gradient(ellipse at 60% 30%, #1a0d0d 0%, #0A0A0A 70%)",
        accent: "#d46b6b",
      },
    ];

    const featureSlides = [
      {
        label: "READ WHAT EMPERORS READ",
        quote: "One passage a day from the greatest thinkers in history. Short enough to read in a minute. Deep enough to change how you think.",
        author: "Daily Readings",
        bg: "radial-gradient(ellipse at 20% 50%, #0f1520 0%, #0A0A0A 70%)",
        accent: "#5b93d1",
      },
      {
        label: "DISCIPLINE OVER MOTIVATION",
        quote: "Set your intentions for each day of the week. Check them off. Build the kind of momentum that compounds.",
        author: "Daily Tasks",
        bg: "radial-gradient(ellipse at 80% 30%, #0f1a0f 0%, #0A0A0A 70%)",
        accent: "#5bbf5b",
      },
      {
        label: "YOUR TIME IS RUNNING OUT",
        quote: "See exactly where your hours go each day. The numbers don't lie. Less scrolling, more living.",
        author: "Screen Time",
        bg: "radial-gradient(ellipse at 60% 70%, #1a0f1a 0%, #0A0A0A 70%)",
        accent: "#b06dd4",
      },
      {
        label: "HOW MUCH TIME IS LEFT?",
        quote: "A dot for every year of your life. The ones behind you are filled. Count what remains. Make them count.",
        author: "Your Life in Years",
        bg: "radial-gradient(ellipse at 40% 20%, #1a1508 0%, #0A0A0A 70%)",
        accent: "#c8b44a",
      },
    ];

    const totalSlides = philoSlides.length + featureSlides.length;
    const isPhiloSlide = introStep < philoSlides.length;
    const featureIndex = introStep - philoSlides.length;
    const isLast = introStep === totalSlides - 1;
    const isTransition = introStep === philoSlides.length;
    const slide = isPhiloSlide ? philoSlides[introStep] : featureSlides[featureIndex];
    const currentBg = slide.bg;
    const currentAccent = slide.accent;

    return (
      <div style={{
        height: "100vh", maxHeight: "100vh", maxWidth: "520px", margin: "0 auto",
        background: currentBg, color: t.text,
        fontFamily: "'DM Sans', sans-serif",
        position: "relative", overflow: "hidden",
        transition: "background 0.6s ease",
      }}>
        <style>{globalCSS}</style>

        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "calc(env(safe-area-inset-top, 44px) + 16px) 28px 0",
          position: "relative", zIndex: 2,
        }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "20px", letterSpacing: "3px", fontWeight: 800, opacity: 0.9, color: "#F5F5F0" }}>
            PRAXIS<span style={{ fontSize: "10px", letterSpacing: "1px", fontWeight: 400, marginLeft: "6px", opacity: 0.5 }}>by J</span>
          </span>
          <button onClick={() => { setOnboardingDone(true); setScreen("home"); setShowIntro(false); try { localStorage.setItem("praxis_intro_seen", "true"); localStorage.setItem("praxis_onboarding_done", "true"); } catch {} }} style={{
            background: "transparent",
            border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
            color: t.textMuted, padding: "6px 14px", borderRadius: "16px",
            fontSize: "12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}>Skip</button>
        </div>

        {isPhiloSlide ? (
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            height: "calc(100vh - 80px)", marginTop: "80px", padding: "0 32px 160px", position: "relative", zIndex: 2,
          }}>
            <div key={introStep} style={{ animation: "cinematicFadeIn 0.7s ease forwards" }}>
              <div style={{
                display: "inline-block", marginBottom: "32px",
                padding: "6px 14px", borderRadius: "20px",
                border: `1px solid ${slide.accent}44`,
                background: `${slide.accent}18`,
              }}>
                <span style={{ fontSize: "10px", letterSpacing: "4px", fontWeight: 600, color: slide.accent }}>{slide.label}</span>
              </div>
              <p style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "28px", lineHeight: 1.5, fontStyle: "italic",
                color: "#F5F5F0", margin: "0 0 24px", fontWeight: 500,
              }}>
                <span style={{ fontSize: "48px", color: slide.accent, lineHeight: 0, position: "relative", top: "10px", marginRight: "4px", opacity: 0.7 }}>"</span>
                {slide.quote}
                <span style={{ fontSize: "48px", color: slide.accent, lineHeight: 0, position: "relative", top: "10px", marginLeft: "4px", opacity: 0.7 }}>"</span>
              </p>
              <p style={{ fontSize: "13px", letterSpacing: "3px", fontWeight: 400, color: slide.accent, margin: 0, opacity: 0.85 }}>
                — {slide.author.toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            height: "calc(100vh - 80px)", marginTop: "80px", padding: "0 32px 160px", position: "relative", zIndex: 2,
          }}>
            <div key={introStep} style={{ animation: isTransition ? "slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" : "cinematicFadeIn 0.6s ease forwards" }}>
              <div style={{
                display: "inline-block", marginBottom: "32px",
                padding: "6px 14px", borderRadius: "20px",
                border: `1px solid ${slide.accent}44`,
                background: `${slide.accent}18`,
              }}>
                <span style={{ fontSize: "10px", letterSpacing: "4px", fontWeight: 600, color: slide.accent }}>{slide.label}</span>
              </div>
              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "24px", lineHeight: 1.5, fontStyle: "normal",
                color: "#F5F5F0", margin: "0 0 24px", fontWeight: 700,
              }}>
                {slide.quote}
              </p>
              <p style={{ fontSize: "13px", letterSpacing: "3px", fontWeight: 600, color: slide.accent, margin: 0, opacity: 0.85 }}>
                {slide.author.toUpperCase()}
              </p>
            </div>
          </div>
        )}

        <div style={{
          position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: "520px",
          padding: "20px 28px calc(env(safe-area-inset-bottom, 16px) + 20px)",
          zIndex: 2,
        }}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "20px", alignItems: "center" }}>
            {Array.from({ length: totalSlides }, (_, i) => (
              <div key={i} style={{
                height: "3px", borderRadius: "2px",
                width: i === introStep ? "28px" : "12px",
                background: i === introStep
                  ? slide.accent
                  : (mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)"),
                transition: "all 0.4s ease",
                marginRight: "0",
              }} />
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {introStep > 0 && (
              <button onClick={() => setIntroStep(introStep - 1)} style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "transparent",
                border: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)"}`,
                color: t.text, fontSize: "18px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>←</button>
            )}
            <button
              className="btn-continue"
              onPointerDown={() => setBtnPressed("intro")}
              onPointerUp={() => setBtnPressed(false)}
              onPointerLeave={() => setBtnPressed(false)}
              onClick={() => {
                if (isLast) { setIntroExiting(true); setShowIntro(false); try { localStorage.setItem("praxis_intro_seen", "true"); } catch {} setTimeout(() => setIntroExiting(false), 500); }
                else { setIntroStep(introStep + 1); }
              }}
              style={{
                flex: 1, padding: "16px",
                background: slide.accent,
                border: "none", borderRadius: "32px",
                color: "#fff",
                fontSize: "15px", fontWeight: 700, cursor: "pointer",
                fontFamily: "'Nunito', sans-serif", letterSpacing: "0.5px",
                transform: btnPressed === "intro" ? "translateY(3px) scale(0.97)" : "translateY(0) scale(1)",
                boxShadow: btnPressed === "intro" ? "none"
                  : `0 4px 0px ${slide.accent}88, 0 8px 24px ${slide.accent}33`,
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease, background 0.4s ease",
              }}
            >{isLast ? "Begin" : "Next"}</button>
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
    const progress = (onboardingStep / onboardingQuestions.length) * 100;

    const stepColors = [
      { bg: "radial-gradient(ellipse at 20% 60%, #1a1208 0%, #0A0A0A 75%)", accent: "#c9a96e" }, // warm amber
      { bg: "radial-gradient(ellipse at 80% 30%, #0d1a0d 0%, #0A0A0A 75%)", accent: "#6db86d" }, // green
      { bg: "radial-gradient(ellipse at 50% 70%, #0d0d1a 0%, #0A0A0A 75%)", accent: "#7b7bd4" }, // purple
      { bg: "radial-gradient(ellipse at 30% 40%, #1a0d0d 0%, #0A0A0A 75%)", accent: "#d46b6b" }, // red
      { bg: "radial-gradient(ellipse at 70% 60%, #0f1520 0%, #0A0A0A 75%)", accent: "#5b93d1" }, // blue
      { bg: "radial-gradient(ellipse at 40% 20%, #1a0f1a 0%, #0A0A0A 75%)", accent: "#b06dd4" }, // violet
      { bg: "radial-gradient(ellipse at 60% 50%, #1a1508 0%, #0A0A0A 75%)", accent: "#c8b44a" }, // gold
    ];
    const sc = stepColors[onboardingStep] || stepColors[0];

    return (
      <div style={{ height: "100vh", background: sc.bg, color: "#F5F5F0", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", padding: "calc(env(safe-area-inset-top, 44px) + 16px) 24px 24px", maxWidth: "520px", margin: "0 auto", overflow: "hidden", position: "relative", transition: "background 0.5s ease" }}>
        <style>{globalCSS}</style>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          pointerEvents: "none", zIndex: 0,
        }} />
        {introExiting && (
          <div style={{
            position: "fixed", top: 0, left: "50%",
            width: "100%", maxWidth: "520px", height: "100vh",
            background: "radial-gradient(ellipse at 40% 20%, #1a1508 0%, #0A0A0A 70%)",
            zIndex: 50,
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "32px",
            animation: "slideFallDown 0.65s cubic-bezier(0.65, 0, 0.35, 1) forwards",
          }}>
            <div style={{
              width: "fit-content", marginBottom: "32px",
              padding: "6px 14px", borderRadius: "20px",
              border: "1px solid #c8b44a44", background: "#c8b44a18",
            }}>
              <span style={{ fontSize: "10px", letterSpacing: "4px", fontWeight: 600, color: "#c8b44a" }}>HOW MUCH TIME IS LEFT?</span>
            </div>
            <p style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "24px", lineHeight: 1.5, fontStyle: "normal",
              color: "#F5F5F0", margin: "0 0 24px", fontWeight: 700,
            }}>A dot for every year of your life. The ones behind you are filled. Count what remains. Make them count.</p>
            <p style={{ fontSize: "13px", letterSpacing: "3px", fontWeight: 600, color: "#c8b44a", margin: 0, opacity: 0.85 }}>
              YOUR LIFE IN YEARS
            </p>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexShrink: 0 }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>PRAXIS<span style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: 400, marginLeft: "6px", opacity: 0.5 }}>by J</span></span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <button onClick={() => { setOnboardingDone(true); setScreen("home"); try { localStorage.setItem("praxis_onboarding_done", "true"); } catch {} }} style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)",
              padding: "6px 14px", borderRadius: "16px", fontSize: "12px", cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "0.5px",
              transition: "all 0.2s ease",
            }}>Skip</button>
          </div>
        </div>
        <div style={{ width: "100%", height: "1px", background: t.border, marginBottom: q.isScrollList ? "12px" : "48px", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ height: "100%", background: sc.accent, width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }} />
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: q.isScrollList ? "24px" : "32px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 4px", flexShrink: 0 }}>{q.question}</h1>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", margin: "0 0 4px", fontWeight: 300, flexShrink: 0 }}>{q.subtitle}</p>
        {q.multi && <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "2px", flexShrink: 0 }}>Select all that apply</p>}
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
                  background: isSel ? sc.accent + "33" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isSel ? sc.accent : "rgba(255,255,255,0.15)"}`,
                  borderRadius: "6px", padding: "16px", cursor: "pointer",
                  color: isSel ? "#fff" : "rgba(255,255,255,0.6)",
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
            onClick={() => { if (onboardingStep > 0) setOnboardingStep(onboardingStep - 1); else { setIntroStep(7); setShowIntro(true); } }}
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
                  background: sc.accent, border: "none", color: "#fff",
                  padding: "14px 40px", borderRadius: "32px", fontSize: "14px", fontWeight: 600,
                  cursor: !canProceed ? "default" : "pointer",
                  opacity: !canProceed ? 0.3 : 1,
                  fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
                  transform: btnPressed === "next" ? "translateY(4px) scale(0.97)" : "translateY(0) scale(1)",
                  boxShadow: !canProceed ? "none" : btnPressed === "next"
                    ? `0 1px 0px ${sc.accent}88`
                    : `0 5px 0px ${sc.accent}88, 0 8px 20px ${sc.accent}33`,
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
    <div className="theme-transition" style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", maxWidth: "520px", margin: "0 auto", transition: "background 0.15s ease, color 0.15s ease" }}>
      <style>{globalCSS}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "calc(env(safe-area-inset-top, 44px) + 16px) 24px 12px" }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>PRAXIS<span style={{ fontSize: "11px", letterSpacing: "1px", fontWeight: 400, marginLeft: "6px", opacity: 0.5 }}>by J</span></span>
      </div>

      <div style={{ flex: 1, overflow: activeTab === "profile" ? "hidden" : "auto", padding: `0 24px calc(env(safe-area-inset-bottom, 0px) + ${activeTab === "read" ? "140px" : "90px"})` }}>

        {/* DAILY READING TAB */}
        {activeTab === "read" && (() => {
          const p = passages[readingIndex];
          return (
          <div>
            <div style={{ margin: "16px 0 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: "#c9a96e", flexShrink: 0 }} />
                  <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: 800, margin: 0 }}>Daily Reading</h2>
                </div>
                <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>
                  {todayLabel} — {readDone.size} of {passages.length} read
                  {streak > 0 && <span style={{ marginLeft: "8px", color: "#f97316", fontWeight: 600 }}>🔥 {streak} day{streak !== 1 ? "s" : ""}</span>}
                </p>
              </div>
              <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "4px" }}>

                <button onClick={() => setFontSize(s => Math.max(12, s - 1))} style={{
                  background: "transparent", border: `1px solid ${t.borderLight}`,
                  color: t.textMuted, width: "32px", height: "32px", borderRadius: "8px",
                  fontSize: "13px", cursor: "pointer", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>A−</button>
                <button onClick={() => setFontSize(s => Math.min(22, s + 1))} style={{
                  background: "transparent", border: `1px solid ${t.borderLight}`,
                  color: t.textMuted, width: "32px", height: "32px", borderRadius: "8px",
                  fontSize: "13px", cursor: "pointer", fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>A+</button>
                <button onClick={() => goToReading(Math.floor(Math.random() * passages.length))} style={{
                  background: tourStep === 1 ? (mode === "dark" ? "#FFFFFF" : "#0A0A0A") : "transparent",
                  border: tourStep === 1 ? "none" : `1px solid ${t.borderLight}`,
                  color: tourStep === 1 ? (mode === "dark" ? "#0A0A0A" : "#FFFFFF") : t.textMuted,
                  width: "32px", height: "32px", borderRadius: "8px",
                  fontSize: "14px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s ease",
                }}>
                  <svg width="17" height="13" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5 C8 5 10 5 16 13 C22 21 24 21 30 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                    <path d="M2 21 C8 21 10 21 16 13 C22 5 24 5 30 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
                    <polyline points="26,17 30,21 26,25" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <polyline points="26,1 30,5 26,9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </button>
                <button onClick={() => setShowFontPicker(prev => !prev)} style={{
                  background: "transparent", border: `1px solid ${t.borderLight}`,
                  color: t.textMuted, width: "32px", height: "32px", borderRadius: "8px",
                  fontSize: "11px", cursor: "pointer", fontFamily: rf, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>Aa</button>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ width: "100%", height: "2px", background: t.border, borderRadius: "1px", marginBottom: "20px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: t.accent, width: `${((readingIndex + 1) / passages.length) * 100}%`, transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)", borderRadius: "1px" }} />
            </div>

            {/* Font picker */}
            {showFontPicker && (
              <div style={{ padding: "10px", marginBottom: "12px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "10px", display: "flex", gap: "6px" }}>
                {fontOptions.map((f) => {
                  const isActive = fontChoice === f.id;
                  return (
                    <button key={f.id} onClick={() => { setFontChoice(f.id); try { localStorage.setItem('praxis_font', f.id); } catch {} }} style={{
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

            {/* Shared swipeable wrapper — card + reflect */}
            <div
              onPointerDown={(e) => { dragStartX.current = e.clientX; dragDeltaX.current = 0; e.currentTarget.setPointerCapture(e.pointerId); }}
              onPointerMove={(e) => {
                if (dragStartX.current === null) return;
                const delta = e.clientX - dragStartX.current;
                dragDeltaX.current = delta;
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(() => setSwipeOffset(delta));
              }}
              onPointerUp={() => {
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
                const delta = dragDeltaX.current;
                if (delta < -40) goToReading(readingIndex === passages.length - 1 ? 0 : readingIndex + 1, "left");
                else if (delta > 40) goToReading(readingIndex === 0 ? passages.length - 1 : readingIndex - 1, "right");
                else setSwipeOffset(0);
                dragStartX.current = null; dragDeltaX.current = 0;
              }}
              style={{ cursor: "grab", userSelect: "none", touchAction: "pan-y" }}
            >
            {/* Passage card */}
            <div style={{
                padding: "24px", border: `1px solid ${t.border}`, borderRadius: "12px",
                marginBottom: "12px", background: t.card, boxShadow: t.shadow,
                willChange: "transform, opacity",
                transform: swipeExiting === "left" ? "translateX(-115%) rotate(-2deg)"
                  : swipeExiting === "right" ? "translateX(115%) rotate(2deg)"
                  : swipeEntering === "left" ? "translateX(60px)"
                  : swipeEntering === "right" ? "translateX(-60px)"
                  : `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.015}deg)`,
                opacity: (swipeExiting || swipeEntering) ? 0 : Math.max(0.5, 1 - Math.abs(swipeOffset) / 350),
                transition: swipeExiting ? "transform 0.16s cubic-bezier(0.4,0,1,1), opacity 0.16s ease"
                  : swipeEntering ? "none"
                  : swipeOffset === 0 ? "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.3s ease"
                  : "none",
                animation: swipeEntering === "left" ? "slideInFromRight 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards"
                  : swipeEntering === "right" ? "slideInFromLeft 0.35s cubic-bezier(0.25,0.46,0.45,0.94) forwards"
                  : readingAnim ? "fadeUp 0.3s ease forwards" : "none",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", fontWeight: 500 }}>
                  {p.ref.toUpperCase()}
                </span>
                <span style={{ fontSize: "11px", color: readDone.has(readingIndex) ? "#4ade80" : t.textMuted, fontWeight: readDone.has(readingIndex) ? 600 : 300 }}>
                  {readDone.has(readingIndex) ? "✓ READ" : `${readingIndex + 1} / ${passages.length}`}
                </span>
              </div>
              <p style={{
                fontFamily: rf,
                fontSize: fontChoice === "cormorant" ? `${fontSize + 5}px` : fontChoice === "crimson" ? `${fontSize + 3}px` : `${fontSize}px`,
                lineHeight: fontChoice === "cormorant" ? 2 : fontChoice === "crimson" ? 1.9 : 1.85,
                color: t.textSecondary, margin: "0 0 16px",
                fontStyle: fontChoice === "cormorant" ? "italic" : "normal",
              }}>
                <span style={{ fontFamily: rf, fontSize: `${fontSize + 11}px`, color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginRight: "2px" }}>"</span>
                {p.text}
                <span style={{ fontFamily: rf, fontSize: `${fontSize + 11}px`, color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginLeft: "2px" }}>"</span>
              </p>
              <p style={{ textAlign: "right", margin: 0, fontSize: "11px", color: t.textMuted, fontWeight: 400, letterSpacing: "1px", fontFamily: "'DM Sans', sans-serif" }}>
                — {p.ref.includes("Social Contract") ? "Jean-Jacques Rousseau" : "Marcus Aurelius"}
              </p>
            </div>

            {/* Reflect prompt */}
            <div style={{
              padding: "16px 20px", background: t.surface, borderRadius: "10px", border: `1px solid ${t.border}`, marginBottom: "16px",
              willChange: "transform, opacity",
              transform: swipeExiting === "left" ? "translateX(-115%)"
                : swipeExiting === "right" ? "translateX(115%)"
                : swipeEntering === "left" ? "translateX(40px)"
                : swipeEntering === "right" ? "translateX(-40px)"
                : `translateX(${swipeOffset * 0.6}px)`,
              opacity: (swipeExiting || swipeEntering) ? 0 : Math.max(0.4, 1 - Math.abs(swipeOffset) / 400),
              transition: swipeExiting ? "transform 0.18s cubic-bezier(0.4,0,1,1) 0.02s, opacity 0.18s ease 0.02s"
                : swipeEntering ? "none"
                : swipeOffset === 0 ? "transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.32s ease"
                : "none",
              animation: swipeEntering === "left" ? "slideInFromRight 0.38s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s both"
                : swipeEntering === "right" ? "slideInFromLeft 0.38s cubic-bezier(0.25,0.46,0.45,0.94) 0.05s both"
                : "none",
            }}>
              <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 8px", fontWeight: 500 }}>REFLECT</p>
              <p style={{ fontSize: `${fontSize - 1}px`, color: t.textSecondary, lineHeight: 1.7, margin: 0, fontWeight: 300, fontFamily: rf }}>{p.reflect}</p>
            </div>
            </div>

          </div>
          );
        })()}

        {/* DAILY TASKS TAB */}
        {activeTab === "todo" && (
          <div>
            <Confetti active={celebrating} theme={t} />
            <div style={{ margin: "16px 0 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: "#6db86d", flexShrink: 0 }} />
                <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: 0 }}>Daily Tasks</h2>
              </div>
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
                  <button key={d} onClick={() => { setSelectedTaskDay(d); setCelebrating(false); }} style={{
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

                  {/* Recurring tasks for this day */}
                  {(() => {
                    const recurForDay = getRecurringForDay(selectedTaskDay);
                    if (recurForDay.length === 0 && !true) return null;
                    return (
                      <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: `1px solid ${mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                          <span style={{ fontSize: "10px", letterSpacing: "2px", color: t.textMuted, fontWeight: 500 }}>RECURRING</span>
                          <button onClick={() => {
                            setRepeatPickerRecurId("new");
                            setPickerText("");
                            setPickerDays("daily");
                            setRepeatPicker(null);
                          }} style={{
                            background: "transparent", border: `1px solid ${t.borderLight}`,
                            borderRadius: "8px", padding: "3px 10px",
                            color: t.textMuted, fontSize: "11px", cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                          }}>+ Add</button>
                        </div>
                        {recurForDay.map((rt, idx) => (
                          <div key={rt.id} style={{
                            display: "flex", alignItems: "center", gap: "12px", padding: "10px 0",
                            borderTop: idx > 0 ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}` : "none",
                          }}>
                            <button onClick={() => toggleRecurringTask(rt.id)} style={{
                              width: "22px", height: "22px", minWidth: "22px", borderRadius: "7px",
                              border: `1.5px solid ${rt.done ? dc.dot : t.borderLight}`,
                              background: rt.done ? dc.dot : "transparent",
                              cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: mode === "dark" ? "#0A0A0A" : "#FFF", fontSize: "11px",
                              transition: "all 0.2s ease",
                            }}>{rt.done && "✓"}</button>
                            <span style={{
                              flex: 1, fontSize: "14px", fontWeight: 300,
                              color: rt.done ? t.textMuted : t.text,
                              textDecoration: rt.done ? "line-through" : "none",
                              fontFamily: "'DM Sans', sans-serif",
                            }}>{rt.text || "Untitled"}</span>
                            {/* repeat badge */}
                            <button onClick={() => { setRepeatPickerRecurId(rt.id); setPickerText(rt.text); setPickerDays(rt.days); }} style={{
                              background: mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                              border: `1px solid ${t.borderLight}`, borderRadius: "6px",
                              padding: "2px 7px", cursor: "pointer",
                              fontSize: "9px", letterSpacing: "0.5px", color: t.textMuted,
                              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}>
                              {rt.days === "daily" ? "DAILY" : Array.isArray(rt.days) ? rt.days.join(" ") : ""}
                            </button>
                            <button onClick={() => deleteRecurringTask(rt.id)} style={{
                              background: "transparent", border: "none", color: t.textMuted,
                              fontSize: "14px", cursor: "pointer", padding: "4px 6px", opacity: 0.25,
                            }}>×</button>
                          </div>
                        ))}
                        {recurForDay.length === 0 && (
                          <p style={{ fontSize: "12px", color: t.textMuted, fontWeight: 300, margin: "4px 0 0", fontStyle: "italic" }}>No recurring tasks for this day yet.</p>
                        )}
                      </div>
                    );
                  })()}
                </div>
              );
            })()}

            {/* Daily Journal */}
            <div style={{ marginTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <div>
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "16px", fontWeight: 700 }}>📝 Journal</span>
                  <span style={{ fontSize: "11px", color: t.textMuted, marginLeft: "8px", fontWeight: 300 }}>
                    {weekDaysFull[weekDays.indexOf(selectedTaskDay)]}
                  </span>
                </div>
                <div style={{ display: "flex", borderRadius: "8px", border: `1px solid ${t.borderLight}`, overflow: "hidden" }}>
                  {["A", "B", "C", "D"].map(m => (
                    <button key={m} onClick={() => {
                      setJournalMode(m);
                      try { localStorage.setItem("praxis_journal_mode", m); } catch {}
                    }} style={{
                      padding: "4px 10px", fontSize: "10px", fontWeight: 600,
                      letterSpacing: "1px", cursor: "pointer", border: "none",
                      background: journalMode === m ? t.accentBg : "transparent",
                      color: journalMode === m ? t.accentText : t.textMuted,
                      transition: "all 0.2s ease",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{m}</button>
                  ))}
                </div>
              </div>

              {/* Mode hint */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0 10px" }}>
                <p style={{ fontSize: "11px", color: t.textMuted, margin: 0, fontWeight: 300 }}>
                  {{ A: "Resets at midnight", B: "Saved permanently", C: "Resets every Sunday", D: "Clears manually only" }[journalMode]}
                </p>
                <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: 300 }}>{journalWordCount} {journalWordCount === 1 ? "word" : "words"}</span>
              </div>

              <textarea
                value={currentJournal}
                onChange={(e) => saveJournal(selectedTaskDay, e.target.value)}
                placeholder={`What's on your mind this ${weekDaysFull[weekDays.indexOf(selectedTaskDay)]}?`}
                style={{
                  width: "100%", minHeight: "140px",
                  background: t.surface, border: `1px solid ${t.border}`,
                  borderRadius: "12px", padding: "16px",
                  fontSize: "14px", fontWeight: 300, fontFamily: "'DM Sans', sans-serif",
                  color: t.text, lineHeight: 1.7, resize: "vertical",
                  outline: "none", boxSizing: "border-box",
                  transition: "border 0.2s ease",
                  WebkitAppearance: "none",
                }}
                onFocus={(e) => e.target.style.borderColor = t.borderLight}
                onBlur={(e) => e.target.style.borderColor = t.border}
              />
              {currentJournal.trim().length > 0 && (
                <button
                  onClick={() => saveJournal(selectedTaskDay, "")}
                  style={{
                    marginTop: "8px", background: "transparent", border: "none",
                    color: t.textMuted, fontSize: "12px", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", padding: 0, fontWeight: 300,
                  }}
                >Clear entry</button>
              )}
            </div>
          </div>
        )}

        {/* SCREEN TIME TAB */}
        {activeTab === "time" && (
          <div>
            <div style={{ margin: "16px 0 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: "#7b7bd4", flexShrink: 0 }} />
              <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: 0 }}>Screen Time</h2>
            </div>
              <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>Weekly overview — tap a day for details</p>
            </div>
            {(() => {
              const getColor = (hrs) => hrs >= 4 ? "#ef4444" : hrs >= 2 ? "#f59e0b" : "#22c55e";
              const avgTotal = Object.values(screenTimeData).reduce((a, d) => a + d.total, 0) / 7;
              return (
              <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "48px", fontWeight: 900 }}>
                {avgTotal.toFixed(1)}
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
              {[...screenTimeData[selectedDay].apps].sort((a, b) => b.hrs - a.hrs).map((app, i) => {
                const pct = (app.hrs / screenTimeData[selectedDay].total) * 100;
                const appColor = getColor(app.hrs);
                return (
                  <div key={i} style={{ marginBottom: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: appColor, flexShrink: 0, transition: "background 0.3s ease" }} />
                        <span style={{ fontSize: "13px", color: t.text, fontWeight: 400 }}>{app.name}</span>
                      </div>
                      <span style={{ fontSize: "13px", color: appColor, fontWeight: 500, transition: "color 0.3s ease" }}>{app.hrs}h</span>
                    </div>
                    <div style={{ width: "100%", height: "4px", background: t.border, borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: appColor, borderRadius: "2px", transition: "width 0.4s ease, background 0.3s ease" }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: t.textSecondary, fontWeight: 400 }}>Total</span>
                <span style={{ fontSize: "13px", color: getColor(screenTimeData[selectedDay].total), fontWeight: 600 }}>{screenTimeData[selectedDay].total}h</span>
              </div>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: "16px", marginTop: "14px", justifyContent: "center" }}>
              {[["#22c55e", "0–2h healthy"], ["#f59e0b", "2–4h moderate"], ["#ef4444", "4h+ excessive"]].map(([color, label]) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: color }} />
                  <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: 300 }}>{label}</span>
                </div>
              ))}
            </div>
            </>
              );
            })()}
          </div>
        )}

        {/* LIFE MAP TAB */}
        {activeTab === "life" && (() => {
          const totalYears = 100;
          const avgDeath = 80;

          // Exact age using birthdate approximation from userAge
          const now2 = new Date();
          const dayOfYear = Math.floor((now2 - new Date(now2.getFullYear(), 0, 0)) / 86400000);
          const exactAge = userAge + (dayOfYear / 365);
          const yearsLived = userAge;
          const yearsLeft = Math.max(avgDeath - exactAge, 0);
          const weeksLeft = Math.floor(yearsLeft * 52);
          const daysLeft = Math.floor(yearsLeft * 365);
          const pctLived = Math.min((exactAge / avgDeath) * 100, 100);
          const pctLeft = Math.max(100 - pctLived, 0);

          const milestones = [
            { age: 18, label: "Adulthood", color: mode === "dark" ? "#555" : "#AAA" },
            { age: 22, label: "Graduate college", color: mode === "dark" ? "#555" : "#AAA" },
            { age: 30, label: "Avg. first child / marriage", color: mode === "dark" ? "#A78BFA" : "#7C3AED" },
            { age: 80, label: "Avg. age of death", color: mode === "dark" ? "#EF4444" : "#DC2626" },
          ];

          const cols = 10;

          const getDotStyle = (year) => {
            if (year < yearsLived) return { bg: t.accent, opacity: 0.85 };
            if (year === yearsLived) return { bg: "#3B82F6", opacity: 1, ring: true, pulse: true };
            const ms = milestones.find((m) => m.age === year);
            if (ms) return { bg: ms.color, opacity: 1, milestone: true };
            return { bg: t.border, opacity: 1 };
          };

          return (
            <div>
              <div style={{ margin: "16px 0 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "3px", height: "28px", borderRadius: "2px", background: "#d46b6b", flexShrink: 0 }} />
                  <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "28px", fontWeight: 800, margin: 0 }}>Your Life in Years</h2>
                </div>
                <p style={{ fontSize: "13px", color: t.textMuted, margin: "4px 0 0", fontWeight: 300 }}>
                  Age {exactAge.toFixed(1)} — {weeksLeft.toLocaleString()} weeks remaining
                </p>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: 400 }}>{pctLived.toFixed(1)}% used</span>
                  <span style={{ fontSize: "11px", color: t.textMuted, fontWeight: 400 }}>{pctLeft.toFixed(1)}% remaining</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: t.border, borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: "3px",
                    width: `${pctLived}%`,
                    background: `linear-gradient(to right, ${t.accent}, #d46b6b)`,
                    transition: "width 0.6s ease",
                  }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>{yearsLived}</div>
                  <div style={{ fontSize: "11px", color: t.textMuted, letterSpacing: "2px", marginTop: "6px", textTransform: "uppercase", fontWeight: 400 }}>Years Lived</div>
                  <div style={{ fontSize: "12px", color: t.textSecondary, marginTop: "2px", fontWeight: 300 }}>Age {exactAge.toFixed(1)}</div>
                </div>
                <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "36px", fontWeight: 900, lineHeight: 1 }}>{Math.floor(yearsLeft)}</div>
                  <div style={{ fontSize: "11px", color: t.textMuted, letterSpacing: "2px", marginTop: "6px", textTransform: "uppercase", fontWeight: 400 }}>Years Left</div>
                  <div style={{ fontSize: "12px", color: t.textSecondary, marginTop: "2px", fontWeight: 300 }}>{weeksLeft.toLocaleString()} weeks</div>
                </div>
              </div>

              <div style={{ padding: "20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "16px" }}>
                <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 16px", textTransform: "uppercase", fontWeight: 600 }}>EACH DOT = ONE YEAR</p>
                <style>{`@keyframes lifePulse { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,0.5)} 50%{box-shadow:0 0 0 6px rgba(59,130,246,0)} }`}</style>
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
                            border: ds.ring ? `2px solid #3B82F6` : "none",
                            animation: ds.pulse ? "lifePulse 2s ease-in-out infinite" : "none",
                          }} />
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "16px", marginTop: "16px", paddingTop: "12px", borderTop: `1px solid ${t.border}`, flexWrap: "wrap" }}>
                  {[
                    { color: t.accent, opacity: 0.85, label: "Lived" },
                    { color: "#3B82F6", border: "1.5px solid #3B82F6", label: "You are here" },
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
                {(() => {
                  const perspectives = [
                    `You've lived ${pctLived.toFixed(1)}% of your estimated life. ${weeksLeft.toLocaleString()} weeks remain — ${Math.floor((30 - exactAge) * 52).toLocaleString()} of them until the average age of marriage or first child. The clock is quiet but it never stops.`,
                    `${weeksLeft.toLocaleString()} Sundays. That's what's left. ${Math.floor((30 - exactAge) * 52).toLocaleString()} of them until most people have started a family. You have time — but not as much as it feels like.`,
                    `${Math.floor(exactAge)} years in. ${Math.floor(avgDeath - exactAge)} to go. ${Math.floor((30 - exactAge) * 52).toLocaleString()} weeks until the world expects you to have it figured out. You don't have to follow the timeline — but you should know it exists.`,
                    `You've spent ${pctLived.toFixed(1)}% of your estimated life. ${daysLeft.toLocaleString()} mornings remain. ${Math.floor((30 - exactAge) * 52).toLocaleString()} weeks until the average first child or marriage. Each morning is a choice.`,
                    `${weeksLeft.toLocaleString()} weeks remaining. ${Math.floor((30 - exactAge) * 52).toLocaleString()} until the average milestone of family or marriage. The question isn't whether time is passing — it's what you're building while it does.`,
                  ];
                  const idx = Math.floor((Date.now() / 86400000)) % perspectives.length;
                  return <p style={{ fontSize: "14px", color: t.textSecondary, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{perspectives[idx]}</p>;
                })()}
              </div>
            </div>
          );
        })()}
        {/* PROFILE TAB */}
        {activeTab === "profile" && (() => {
          const philosopherSelections = onboardingAnswers[5] || [];
          const goals = onboardingAnswers[4] || [];
          const feelings = onboardingAnswers[1] || [];
          const improveAreas = onboardingAnswers[0] || [];
          const reflectTimes = onboardingAnswers[3] || [];
          const totalRead = readDone.size;
          const totalTasks = Object.values(weekTasks).flat().filter(tk => tk.text.trim()).length;
          const totalDoneAll = Object.values(weekTasks).flat().filter(tk => tk.text.trim() && tk.done).length;

          return (
            <div>
              {/* Profile header */}
              <div style={{ margin: "16px 0 24px", display: "flex", alignItems: "center", gap: "16px" }}>
                <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  {/* Avatar */}
                  <button
                    onClick={() => photoInputRef.current?.click()}
                    style={{
                      width: "68px", height: "68px", borderRadius: "50%",
                      background: profilePhoto
                        ? "transparent"
                        : `linear-gradient(135deg, ${getAvatarGradient(profileName)[0]}, ${getAvatarGradient(profileName)[1]})`,
                      border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "26px", fontWeight: 800, flexShrink: 0, cursor: "pointer",
                      overflow: "hidden", padding: 0, position: "relative",
                      color: "#fff", fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                    ) : (
                      <span>{profileName ? profileName[0].toUpperCase() : "?"}</span>
                    )}
                  </button>

                  {/* Revert to initials */}
                  {profilePhoto && (
                    <button onClick={() => {
                      setProfilePhoto("");
                      try { localStorage.removeItem("praxis_photo"); } catch {}
                    }} style={{
                      background: "transparent", border: "none", cursor: "pointer",
                      fontSize: "10px", color: t.textMuted, fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300, padding: 0, letterSpacing: "0.3px",
                    }}>Remove</button>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    value={profileName}
                    onChange={(e) => {
                      const clean = sanitize(e.target.value).slice(0, 50);
                      setProfileName(clean);
                      try { localStorage.setItem("praxis_name", clean); } catch {}
                    }}
                    placeholder="Your name"
                    spellCheck={false}
                    autoCorrect="off"
                    autoCapitalize="off"
                    style={{
                      background: "transparent", border: "none", outline: "none",
                      fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 800,
                      color: t.text, width: "100%", padding: 0,
                    }}
                  />
                  <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>Age {userAge}</p>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                {[
                  { label: "Streak", value: streak > 0 ? `${streak}🔥` : "0", sub: "days" },
                  { label: "Read", value: totalRead, sub: `of ${passages.length}` },
                  { label: "Tasks", value: totalDoneAll, sub: `of ${totalTasks}` },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "14px 10px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "1.5px", marginTop: "4px", textTransform: "uppercase" }}>{s.label}</div>
                    <div style={{ fontSize: "10px", color: t.textMuted, fontWeight: 300 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Philosophy DNA */}
              {philosopherSelections.length > 0 && (
                <div style={{ padding: "16px 20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "12px" }}>
                  <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 12px", textTransform: "uppercase", fontWeight: 600 }}>YOUR PHILOSOPHERS</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {philosopherSelections.map((p, i) => (
                      <span key={i} style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: t.textSecondary, fontWeight: 400 }}>{p}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Goals & focus */}
              {goals.length > 0 && (
                <div style={{ padding: "16px 20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "12px" }}>
                  <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 12px", textTransform: "uppercase", fontWeight: 600 }}>YOUR GOALS</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {goals.map((g, i) => (
                      <span key={i} style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: t.textSecondary }}>{g}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* What you're improving */}
              {improveAreas.length > 0 && (
                <div style={{ padding: "16px 20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "12px" }}>
                  <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 12px", textTransform: "uppercase", fontWeight: 600 }}>WORKING ON</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {improveAreas.map((a, i) => (
                      <span key={i} style={{ fontSize: "12px", padding: "4px 10px", borderRadius: "20px", background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", color: t.textSecondary }}>{a}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings */}
              <div style={{ padding: "16px 20px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "12px", marginBottom: "12px" }}>
                <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 16px", textTransform: "uppercase", fontWeight: 600 }}>SETTINGS</p>

                {/* Dark/light toggle */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: `1px solid ${t.border}`, marginBottom: "14px" }}>
                  <span style={{ fontSize: "14px", color: t.text, fontWeight: 400 }}>Appearance</span>
                  <div style={{ display: "flex", borderRadius: "10px", border: `1px solid ${t.borderLight}`, overflow: "hidden" }}>
                    {[["light", "Light"], ["dark", "Dark"]].map(([val, label]) => (
                      <button key={val} onClick={() => { setMode(val); try { localStorage.setItem("praxis_mode", val); } catch {}; }} style={{
                        padding: "6px 16px", fontSize: "12px", fontWeight: 600, cursor: "pointer", border: "none",
                        background: mode === val ? t.accentBg : "transparent",
                        color: mode === val ? t.accentText : t.textMuted,
                        fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.3px",
                      }}>{label}</button>
                    ))}
                  </div>
                </div>

                {/* Font preference */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "14px", borderBottom: `1px solid ${t.border}`, marginBottom: "14px" }}>
                  <span style={{ fontSize: "14px", color: t.text, fontWeight: 400 }}>Reading Font</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {fontOptions.map(f => (
                      <button key={f.id} onClick={() => { setFontChoice(f.id); try { localStorage.setItem('praxis_font', f.id); } catch {} }} style={{
                        padding: "4px 10px", borderRadius: "8px", cursor: "pointer",
                        background: fontChoice === f.id ? t.accentBg : "transparent",
                        border: `1px solid ${fontChoice === f.id ? t.accent : t.borderLight}`,
                        color: fontChoice === f.id ? t.accentText : t.textMuted,
                        fontSize: "11px", fontFamily: f.family, fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}>{f.name}</button>
                    ))}
                  </div>
                </div>

                {/* Journal mode */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "14px", color: t.text, fontWeight: 400 }}>Journal Mode</span>
                    <div style={{ display: "flex", borderRadius: "8px", border: `1px solid ${t.borderLight}`, overflow: "hidden" }}>
                      {["A","B","C","D"].map(m => (
                        <button key={m} onClick={() => { setJournalMode(m); try { localStorage.setItem("praxis_journal_mode", m); } catch {}; }} style={{
                          padding: "5px 10px", fontSize: "11px", fontWeight: 600, cursor: "pointer", border: "none",
                          background: journalMode === m ? t.accentBg : "transparent",
                          color: journalMode === m ? t.accentText : t.textMuted,
                          transition: "all 0.2s ease", fontFamily: "'DM Sans', sans-serif",
                        }}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: t.textMuted, margin: 0, fontWeight: 300 }}>
                    {{ A: "Resets at midnight each day", B: "Saved permanently per day", C: "Resets every Sunday", D: "Never resets, clear manually" }[journalMode]}
                  </p>
                </div>
              </div>

              {/* Reset onboarding */}
              <button onClick={() => { setOnboardingDone(false); setScreen("onboarding"); setShowIntro(true); setIntroStep(0); setOnboardingStep(0); try { localStorage.removeItem("praxis_intro_seen"); localStorage.removeItem("praxis_onboarding_done"); } catch {} }} style={{
                width: "100%", padding: "14px", background: "transparent",
                border: `1px solid ${t.borderLight}`, borderRadius: "12px", cursor: "pointer",
                color: t.textMuted, fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300, marginBottom: "8px",
              }}>Redo onboarding</button>
              <button onClick={() => { setTourStep(0); setActiveTab("read"); try { localStorage.removeItem("praxis_tour_done"); } catch {} }} style={{
                width: "100%", padding: "14px", background: "transparent",
                border: `1px solid ${t.borderLight}`, borderRadius: "12px", cursor: "pointer",
                color: t.textMuted, fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300, marginBottom: "8px",
              }}>Replay Tutorial</button>
            </div>
          );
        })()}
      </div>
      {activeTab === "read" && (
        <div style={{
          position: "fixed",
          bottom: "calc(env(safe-area-inset-bottom, 16px) + 90px)",
          left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: "520px",
          padding: "10px 16px",
          background: t.bg,
          zIndex: 9,
        }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => goToReading(readingIndex === 0 ? passages.length - 1 : readingIndex - 1, "right")}
              style={{
                width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: t.text,
                fontSize: "18px", cursor: "pointer",
                opacity: tourStep === 2 ? 0 : 1,
                pointerEvents: tourStep === 2 ? "none" : "auto",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >←</button>
            <button
              className="btn-continue"
              onPointerDown={() => setBtnPressed("read")}
              onPointerUp={() => { setBtnPressed(false); setBtnBounce(true); setTimeout(() => setBtnBounce(false), 250); }}
              onPointerLeave={() => setBtnPressed(false)}
              onClick={() => {
                if (readDone.has(readingIndex)) {
                  setReadDone(prev => { const n = new Set(prev); n.delete(readingIndex); return n; });
                } else {
                  setReadDone(prev => new Set([...prev, readingIndex]));
                  updateStreak();
                }
              }}
              style={{
                flex: 1, padding: "14px",
                background: readDone.has(readingIndex) ? "transparent" : t.accentBg,
                border: readDone.has(readingIndex) ? `1px solid ${t.borderLight}` : "none",
                borderRadius: "32px",
                color: readDone.has(readingIndex) ? t.textMuted : t.accentText,
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.5px",
                transform: btnPressed === "read" ? "translateY(3px) scale(0.97)" : "translateY(0) scale(1)",
                boxShadow: readDone.has(readingIndex) ? "none" : btnPressed === "read"
                  ? `0 1px 0px ${mode === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`
                  : `0 3px 0px ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"}, 0 4px 8px ${mode === "dark" ? "rgba(245,245,240,0.04)" : "rgba(0,0,0,0.06)"}`,
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease, background 0.2s ease",
              }}
            >{readDone.has(readingIndex) ? "Mark as Unread" : "Mark as Read"}</button>
            <button
              onClick={() => goToReading(readingIndex === passages.length - 1 ? 0 : readingIndex + 1, "left")}
              style={{
                width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: t.text,
                fontSize: "18px", cursor: "pointer",
                opacity: tourStep === 2 ? 0 : 1,
                pointerEvents: tourStep === 2 ? "none" : "auto",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >→</button>
          </div>
        </div>
      )}

      {/* Onboarding Tour */}
      {tourStep >= 0 && onboardingDone && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, pointerEvents: "none" }}>
          <style dangerouslySetInnerHTML={{ __html: "@keyframes tourFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } } .tour-card { animation: tourFadeIn 0.3s ease forwards; }" }} />

          {/* Constrained app-width container */}
          <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "520px", height: "100%" }}>

          {(() => {
            const W = Math.min(window.innerWidth, 520);
            const H = window.innerHeight;
            const pct = (x) => (x / W * 100) + "%";

            // Safe area bottom — 34px on iPhone home screen PWA, 0 in browser
            const safeBottom = typeof window !== "undefined" && window.navigator && /iPhone|iPad/.test(window.navigator.userAgent) ? 34 : 0;
            const tabBarH = 85 + safeBottom;
            const tabBarPadX = 16;
            const tabW = (W - tabBarPadX * 2) / 5;
            const tabCenters = [0, 1, 2, 3, 4].map(n => tabBarPadX + (n + 0.5) * tabW);
            const pad = 6;
            const cardH = 170;

            // Safe area top — ~54px on iPhone PWA (status bar), ~20px in browser
            const safeTop = typeof window !== "undefined" && window.navigator && /iPhone|iPad/.test(window.navigator.userAgent) ? 54 : 20;
            // Shuffle button: safeTop + PRAXIS title bar (~60px) + subtitle row (~30px) + button area
            const shuffleY = safeTop + 100;

            const spots = [
              { x: tabBarPadX,              y: H - tabBarH, w: tabW,            h: tabBarH, r: 12 },
              { x: W - 94,                  y: shuffleY,    w: 32,              h: 32,      r: 10 },
              { x: 64,                      y: H - tabBarH - 66, w: W - 128,    h: 48,      r: 28 },
              { x: tabBarPadX + tabW,       y: H - tabBarH, w: tabW,            h: tabBarH, r: 12 },
              { x: tabBarPadX + tabW * 2,   y: H - tabBarH, w: tabW,            h: tabBarH, r: 12 },
              { x: tabBarPadX + tabW * 3,   y: H - tabBarH, w: tabW,            h: tabBarH, r: 12 },
            ];

            const spot = spots[tourStep];
            const isTabSpot = [0, 3, 4, 5].includes(tourStep);
            const isMarkAsRead = tourStep === 2;
            const rx = spot.x - pad;
            const ry = isTabSpot ? spot.y : spot.y - pad;
            const rw = spot.w + pad * 2;
            const rh = isTabSpot ? spot.h : spot.h + pad * 2;

            // Percentage-based card tops — reliable across all screen heights
            const tabCardTop = Math.round(H * 0.58);
            const shuffleCardTop = shuffleY + 32 + pad + 16;
            const markCardTop = spots[2].y - cardH - 90;

            const steps = [
              { tab: "read",
                title: "Daily Reading", text: "Your daily passage from history's greatest minds.",
                cardTop: tabCardTop, cardLeft: "16px",
                arrowDir: "down", arrowCenterX: tabCenters[0] },
              { tab: "read",
                title: "Shuffle", text: "Jump to a random passage whenever you need it.",
                cardTop: shuffleCardTop,
                cardLeft: Math.min(spots[1].x + spots[1].w / 2 - 130, W - 280) + "px",
                arrowDir: "up", arrowCenterX: spots[1].x + spots[1].w / 2 },
              { tab: "read",
                title: "Mark as Read", text: "Track your streak. Show up every day.",
                cardTop: markCardTop, cardLeft: "16px", cardWidth: "calc(100% - 32px)",
                arrowDir: "down", arrowCenterX: spots[2].x + spots[2].w / 2 },
              { tab: "todo",
                title: "Daily Tasks", text: "Set intentions for each day. Discipline compounds.",
                cardTop: tabCardTop, cardLeft: "16px",
                arrowDir: "down", arrowCenterX: tabCenters[1] },
              { tab: "time",
                title: "Screen Time", text: "See where your hours go. Less scrolling, more living.",
                cardTop: tabCardTop, cardLeft: "16px",
                arrowDir: "down", arrowCenterX: tabCenters[2] },
              { tab: "life",
                title: "Your Life in Years", text: "Every dot is one year. Count what remains.",
                cardTop: tabCardTop, cardLeft: "16px",
                arrowDir: "down", arrowCenterX: tabCenters[3] },
            ];

            const s = steps[tourStep];

            const advanceTour = () => {
              if (tourStep < steps.length - 1) {
                setActiveTab(steps[tourStep + 1].tab);
                setTourStep(tourStep + 1);
              } else dismissTour();
            };

            const goBack = () => {
              if (tourStep > 0) {
                setActiveTab(steps[tourStep - 1].tab);
                setTourStep(tourStep - 1);
              }
            };

            const arrowFromY = s.arrowDir === "down"
              ? s.cardTop + cardH + 8
              : spot.y + spot.h + pad + 8;
            const arrowToY = s.arrowDir === "down"
              ? spot.y - pad - 8
              : s.cardTop - 8;
            const arrowH = Math.max(20, arrowToY - arrowFromY);

            return (
              <>
                {/* Dimmed overlay with cutout */}
                <svg
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  viewBox={"0 0 " + W + " " + H}
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <mask id="tour-mask">
                      <rect width={W} height={H} fill="white" />
                      <rect x={rx} y={ry} width={rw} height={rh} rx={spot.r + pad} ry={spot.r + pad} fill="black" />
                    </mask>
                  </defs>
                  <rect width={W} height={H} fill="rgba(0,0,0,0.72)" mask="url(#tour-mask)" />
                </svg>

                {/* Tooltip card — frosted glass body, white solid buttons */}
                <div className="tour-card" key={tourStep} style={{
                  position: "absolute",
                  top: s.cardTop,
                  left: s.cardLeft,
                  transform: s.cardTransform ? "translateX(" + s.cardTransform + ")" : "none",
                  width: s.cardWidth || "260px",
                  pointerEvents: "all",
                  zIndex: 10,
                  background: "rgba(20,20,20,0.72)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  borderRadius: "18px",
                  padding: "18px 18px 14px",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "20px", fontWeight: 800, color: "#FFFFFF", margin: "0 0 6px", lineHeight: 1.2 }}>{s.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6 }}>{s.text}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: "8px 0 0", textAlign: "right" }}>{tourStep + 1} / {steps.length}</p>
                  <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                    <button onClick={dismissTour} style={{ flex: 1, padding: "9px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Skip</button>
                    {tourStep > 0 && (
                      <button onClick={goBack} style={{ flex: 1, padding: "9px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>← Back</button>
                    )}
                    <button onClick={advanceTour} style={{ flex: 2, padding: "9px", background: "#FFFFFF", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, color: "#0A0A0A" }}>{tourStep < steps.length - 1 ? "Next →" : "Got it!"}</button>
                  </div>
                </div>
              </>
            );
          })()}
          </div>
          </div>
        </div>
      )}

      {/* Daily Check-in Popup — suppressed while tour is active */}
      {showCheckin && onboardingDone && tourStep < 0 && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.7)",
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          animation: "fadeUp 0.3s ease forwards",
        }}>
          <div style={{
            width: "100%", maxWidth: "520px",
            background: t.surface, borderRadius: "24px 24px 0 0",
            padding: "28px 24px calc(env(safe-area-inset-bottom, 16px) + 28px)",
            border: `1px solid ${t.border}`,
          }}>
            {/* Date + greeting */}
            <p style={{ fontSize: "11px", color: t.textMuted, letterSpacing: "3px", fontWeight: 500, margin: "0 0 8px" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }).toUpperCase()}
            </p>
            <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "24px", fontWeight: 800, margin: "0 0 6px", color: t.text }}>
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}.
            </h2>
            <p style={{ fontSize: "14px", color: t.textSecondary, fontWeight: 300, margin: "0 0 24px", lineHeight: 1.6 }}>
              {(() => {
                const area = (onboardingAnswers[0] || [])[0];
                return area
                  ? `You said you're working on ${area.toLowerCase()}. What's your one intention for today?`
                  : "What's your one intention for today?";
              })()}
            </p>
            {/* Intention input */}
            <input
              value={checkinInput}
              onChange={e => setCheckinInput(sanitize(e.target.value).slice(0, 120))}
              placeholder="e.g. Stay off my phone until noon..."
              style={{
                width: "100%", background: t.inputBg, border: `1px solid ${t.border}`,
                borderRadius: "12px", padding: "14px 16px", fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif", color: t.text, outline: "none",
                boxSizing: "border-box", marginBottom: "16px", lineHeight: 1.5,
              }}
              onFocus={e => e.target.style.borderColor = t.borderLight}
              onBlur={e => e.target.style.borderColor = t.border}
              autoFocus
            />
            {/* Begin button */}
            <button
              onClick={dismissCheckin}
              style={{
                width: "100%", padding: "15px",
                background: t.accentBg, border: "none", borderRadius: "32px",
                color: t.accentText, fontSize: "15px", fontWeight: 700,
                fontFamily: "'Nunito', sans-serif", cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: `0 3px 0px ${mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.15)"}`,
              }}
            >Begin my day</button>
            {/* Skip */}
            <button onClick={dismissCheckin} style={{
              width: "100%", padding: "12px", marginTop: "8px",
              background: "transparent", border: "none", cursor: "pointer",
              color: t.textMuted, fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
            }}>Skip for today</button>
          </div>
        </div>
      )}

      {/* Repeat Picker Modal */}
      {(repeatPickerRecurId !== null) && (() => {
        const isNew = repeatPickerRecurId === "new";
        const allDaysList = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        const toggleDay = (d) => {
          if (pickerDays === "daily") { setPickerDays([d]); return; }
          const arr = Array.isArray(pickerDays) ? pickerDays : [];
          setPickerDays(arr.includes(d) ? arr.filter(x => x !== d) : [...arr, d]);
        };
        return (
          <div onClick={() => setRepeatPickerRecurId(null)} style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              width: "100%", maxWidth: "520px",
              background: t.surface, borderRadius: "20px 20px 0 0",
              padding: "24px 24px calc(env(safe-area-inset-bottom,16px) + 24px)",
              border: `1px solid ${t.border}`,
              maxHeight: "85vh", overflowY: "auto",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "18px", fontWeight: 700 }}>
                  {isNew ? "New Recurring Task" : "Edit Recurring Task"}
                </span>
                <button onClick={() => setRepeatPickerRecurId(null)} style={{
                  background: "transparent", border: "none", color: t.textMuted,
                  fontSize: "20px", cursor: "pointer", lineHeight: 1,
                }}>×</button>
              </div>

              {/* Task name input */}
              <input
                value={pickerText}
                onChange={e => setPickerText(sanitize(e.target.value))}
                placeholder="Task name (e.g. Take NAC 600mg)"
                style={{
                  width: "100%", background: t.inputBg, border: `1px solid ${t.border}`,
                  borderRadius: "10px", padding: "12px 14px", fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif", color: t.text, outline: "none",
                  boxSizing: "border-box", marginBottom: "20px",
                }}
              />

              {/* Repeat options */}
              <p style={{ fontSize: "11px", letterSpacing: "2px", color: t.textMuted, margin: "0 0 12px", fontWeight: 500 }}>REPEAT</p>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                <button onClick={() => setPickerDays("daily")} style={{
                  padding: "7px 16px", borderRadius: "20px", cursor: "pointer",
                  background: pickerDays === "daily" ? t.accentBg : "transparent",
                  border: `1.5px solid ${pickerDays === "daily" ? t.accent : t.borderLight}`,
                  color: pickerDays === "daily" ? t.accentText : t.text,
                  fontSize: "12px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s ease",
                }}>Every day</button>
                <button onClick={() => { if (pickerDays === "daily") setPickerDays([]); }} style={{
                  padding: "7px 16px", borderRadius: "20px", cursor: "pointer",
                  background: Array.isArray(pickerDays) ? t.accentBg : "transparent",
                  border: `1.5px solid ${Array.isArray(pickerDays) ? t.accent : t.borderLight}`,
                  color: Array.isArray(pickerDays) ? t.accentText : t.text,
                  fontSize: "12px", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.15s ease",
                }}>Specific days</button>
              </div>

              {Array.isArray(pickerDays) && (
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  {allDaysList.map(d => {
                    const on = pickerDays.includes(d);
                    return (
                      <button key={d} onClick={() => toggleDay(d)} style={{
                        flex: 1, padding: "8px 0", borderRadius: "10px", cursor: "pointer",
                        background: on ? t.accentBg : "transparent",
                        border: `1.5px solid ${on ? t.accent : t.borderLight}`,
                        color: on ? t.accentText : t.textMuted,
                        fontSize: "11px", fontWeight: on ? 700 : 400,
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s ease",
                      }}>{d}</button>
                    );
                  })}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                {!isNew && (
                  <button onClick={() => { deleteRecurringTask(repeatPickerRecurId); setRepeatPickerRecurId(null); }} style={{
                    padding: "13px 18px", borderRadius: "12px", cursor: "pointer",
                    background: "transparent", border: `1px solid ${t.borderLight}`,
                    color: "#e05555", fontSize: "13px", fontFamily: "'DM Sans', sans-serif",
                  }}>Delete</button>
                )}
                <button
                  onClick={() => {
                    if (!pickerText.trim()) return;
                    const days = pickerDays === "daily" ? "daily" : (Array.isArray(pickerDays) && pickerDays.length > 0 ? pickerDays : "daily");
                    if (isNew) {
                      addRecurringTask(pickerText.trim(), days);
                    } else {
                      updateRecurringTask(repeatPickerRecurId, { text: pickerText.trim(), days });
                    }
                    setRepeatPickerRecurId(null);
                  }}
                  style={{
                    flex: 1, padding: "13px", borderRadius: "12px", cursor: "pointer",
                    background: t.accentBg, border: "none",
                    color: t.accentText, fontSize: "14px", fontWeight: 600,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >{isNew ? "Add Task" : "Save"}</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "520px", display: "flex", justifyContent: "space-around",
        padding: "14px 16px calc(env(safe-area-inset-bottom, 16px) + 16px)", background: t.bg, borderTop: `1px solid ${t.border}`,
      }}>
        {[
          // Read → Lucide book
          { key: "read", label: "Read", shape: (active, color) => <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg> },
          // Tasks → checkbox with check (keep)
          { key: "todo", label: "Tasks", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="4" y="4" width="14" height="14" rx="2.5" stroke={color} strokeWidth="1.6" fill={active ? color : "none"} fillOpacity={active ? 0.15 : 0}/><polyline points="7.5,11 10.5,14 14.5,8" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          // Screen → clock
          { key: "time", label: "Screen", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke={color} strokeWidth="1.6" fill={active ? color : "none"} fillOpacity={active ? 0.12 : 0}/><polyline points="11,6 11,11 14.5,13.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          // Life → dot grid (keep)
          { key: "life", label: "Life", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="5" cy="5" r="1.8" fill={color}/><circle cx="11" cy="5" r="1.8" fill={color}/><circle cx="17" cy="5" r="1.8" fill={color}/><circle cx="5" cy="11" r="1.8" fill={color}/><circle cx="11" cy="11" r="1.8" fill={color}/><circle cx="17" cy="11" r="1.8" fill={color}/><circle cx="5" cy="17" r="1.8" fill={color}/><circle cx="11" cy="17" r="1.8" fill={color}/><circle cx="17" cy="17" r="1.8" fill={color}/></svg> },
          // Profile → person
          { key: "profile", label: "Profile", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7" r="3.5" stroke={color} strokeWidth="1.6" fill={active ? color : "none"} fillOpacity={active ? 0.15 : 0}/><path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.6" strokeLinecap="round"/></svg> },
        ].map((tab) => {
          const isActive = activeTab === tab.key;
          const color = isActive ? t.text : t.textMuted;
          return (
            <button key={tab.key} onClick={() => { setActiveTab(tab.key); setCelebrating(false); }} style={{
              background: "transparent", border: "none", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
              padding: "6px 16px", flex: 1,
            }}>
              {tab.shape(isActive, color)}
              <span style={{ fontSize: "12px", fontFamily: "'Nunito', sans-serif", fontWeight: isActive ? 700 : 400, letterSpacing: "0.5px", color, transition: "color 0.3s ease" }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Serif+Display:ital@0;1&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
  * { box-sizing: border-box; }
  .theme-transition *:not(svg):not(path):not(circle):not(rect):not(polygon) {
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease !important;
  }
  html, body { margin: 0; padding: 0; height: 100%; background: #0A0A0A; }

  /* Force portrait on mobile landscape only — not desktop */
  @media screen and (orientation: landscape) and (max-height: 500px) {
    html {
      transform: rotate(-90deg);
      transform-origin: left top;
      width: 100vh;
      height: 100vw;
      overflow-x: hidden;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
  input, textarea, button, select {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  input, textarea {
    -webkit-user-select: text;
    user-select: text;
    font-size: 16px;
  }
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
  @keyframes cinematicFadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInFromRight {
    from { opacity: 0; transform: translateX(60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInFromLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideFallDown {
    0% { transform: translateX(-50%) translateY(0); opacity: 1; }
    30% { opacity: 1; }
    100% { transform: translateX(-50%) translateY(105vh); opacity: 0; }
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
