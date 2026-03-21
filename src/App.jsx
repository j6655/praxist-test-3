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
];


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
  const [readingIndex, setReadingIndex] = useState(() => {
    try { const s = localStorage.getItem("praxis_reading_index"); return s ? parseInt(s) : 0; } catch { return 0; }
  });
  const [readDone, setReadDone] = useState(() => {
    try { const s = localStorage.getItem("praxis_read_done"); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); }
  });

  useEffect(() => {
    try { localStorage.setItem("praxis_reading_index", String(readingIndex)); } catch {}
  }, [readingIndex]);

  useEffect(() => {
    try { localStorage.setItem("praxis_read_done", JSON.stringify([...readDone])); } catch {}
  }, [readDone]);
  const [readingAnim, setReadingAnim] = useState(false);
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);
  const dotScrollRef = useRef(null);

  const goToReading = (idx) => {
    if (idx < 0 || idx >= passages.length) return;
    setReadingAnim(true);
    setTimeout(() => setReadingAnim(false), 350);
    setReadingIndex(idx);
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
      if (saved) return JSON.parse(saved);
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
    const prevTask = weekTasks[day].find((tk) => tk.id === taskId);
    const newTasks = weekTasks[day].map((tk) => (tk.id === taskId ? { ...tk, done: !tk.done } : tk));
    setWeekTasks({ ...weekTasks, [day]: newTasks });
    const withText = newTasks.filter((tk) => tk.text.trim());
    // Only celebrate when checking (not unchecking), all have text, and ALL are now done
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
        <div style={{ display: "flex", flexDirection: "column", padding: "calc(env(safe-area-inset-top, 44px) + 16px) 24px 24px", minHeight: "100vh", position: "relative", background: t.bg }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>PRAXIS</span>
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
    const progress = (onboardingStep / onboardingQuestions.length) * 100;

    return (
      <div style={{ height: "100vh", background: t.bg, color: t.text, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", padding: "calc(env(safe-area-inset-top, 44px) + 16px) 24px 24px", maxWidth: "520px", margin: "0 auto", overflow: "hidden", position: "relative" }}>
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
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>PRAXIS</span>
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

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "calc(env(safe-area-inset-top, 44px) + 16px) 24px 12px" }}>
        <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "22px", letterSpacing: "2px", fontWeight: 800 }}>PRAXIS</span>
        <button onClick={() => setMode(mode === "dark" ? "light" : "dark")} style={{
          background: "transparent", border: `1px solid ${t.borderLight}`, color: t.text,
          width: "36px", height: "36px", borderRadius: "50%", fontSize: "16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{mode === "dark" ? "☀" : "☾"}</button>
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: "0 24px calc(env(safe-area-inset-bottom, 16px) + 160px)" }}>

        {/* DAILY READING TAB */}
        {activeTab === "read" && (() => {
          const p = passages[readingIndex];
          const dragHandlers = {
            onPointerDown: (e) => { dragStartX.current = e.clientX; dragDeltaX.current = 0; e.currentTarget.setPointerCapture(e.pointerId); },
            onPointerMove: (e) => { if (dragStartX.current === null) return; dragDeltaX.current = e.clientX - dragStartX.current; },
            onPointerUp: () => {
              if (dragDeltaX.current < -50 && readingIndex < passages.length - 1) goToReading(readingIndex + 1);
              else if (dragDeltaX.current > 50 && readingIndex > 0) goToReading(readingIndex - 1);
              dragStartX.current = null; dragDeltaX.current = 0;
            },
          };
          return (
          <div>
            <div style={{ margin: "16px 0 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: "26px", fontWeight: 800, margin: "0 0 4px" }}>📖 Daily Reading</h2>
                <p style={{ fontSize: "13px", color: t.textMuted, margin: 0, fontWeight: 300 }}>{todayLabel} — {readDone.size} of {passages.length} read</p>
              </div>
              <button onClick={() => setShowFontPicker(!showFontPicker)} style={{
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: t.textMuted, width: "32px", height: "32px", borderRadius: "8px",
                fontSize: "11px", cursor: "pointer", fontFamily: rf, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: "4px",
              }}>Aa</button>
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

            {/* Passage card — swipeable */}
            <div
              {...dragHandlers}
              style={{
                padding: "24px", border: `1px solid ${t.border}`, borderRadius: "12px",
                marginBottom: "12px", background: t.card, boxShadow: t.shadow,
                cursor: "grab", userSelect: "none", touchAction: "pan-y",
                animation: readingAnim ? "fadeUp 0.3s ease forwards" : "none",
              }}
            >
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
                fontSize: fontChoice === "cormorant" ? "20px" : "15px",
                lineHeight: fontChoice === "cormorant" ? 2 : 1.85,
                color: t.textSecondary, margin: 0,
                fontStyle: fontChoice === "cormorant" ? "italic" : "normal",
              }}>
                <span style={{ fontFamily: rf, fontSize: fontChoice === "cormorant" ? "34px" : "26px", color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginRight: "2px" }}>"</span>
                {p.text}
                <span style={{ fontFamily: rf, fontSize: fontChoice === "cormorant" ? "34px" : "26px", color: t.textMuted, lineHeight: 0, position: "relative", top: "6px", marginLeft: "2px" }}>"</span>
              </p>
            </div>

            {/* Reflect prompt */}
            <div style={{ padding: "16px 20px", background: t.surface, borderRadius: "10px", border: `1px solid ${t.border}`, marginBottom: "16px" }}>
              <p style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "3px", margin: "0 0 8px", fontWeight: 500 }}>REFLECT</p>
              <p style={{ fontSize: "14px", color: t.textSecondary, lineHeight: 1.7, margin: 0, fontWeight: 300, fontFamily: rf }}>{p.reflect}</p>
            </div>


          </div>
          );
        })()}

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
                          padding: "8px 0", transition: "color 0.2s ease",
                          WebkitAppearance: "none", position: "relative", zIndex: 1,
                          minHeight: "36px",
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

      {/* Fixed reading nav — only shown on read tab */}
      {activeTab === "read" && (
        <div style={{
          position: "fixed", bottom: "calc(env(safe-area-inset-bottom, 16px) + 90px)", left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: "520px",
          padding: "10px 16px 10px",
          background: t.bg,
          borderTop: `1px solid ${t.border}`,
          zIndex: 10,
        }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => goToReading(readingIndex - 1)}
              disabled={readingIndex === 0}
              style={{
                width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: readingIndex === 0 ? t.textMuted : t.text,
                fontSize: "18px", cursor: readingIndex === 0 ? "default" : "pointer",
                opacity: readingIndex === 0 ? 0.25 : 1,
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
                  : `0 5px 0px ${mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.2)"}, 0 8px 20px ${mode === "dark" ? "rgba(245,245,240,0.08)" : "rgba(0,0,0,0.1)"}`,
                transition: "transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.1s ease, background 0.2s ease",
              }}
            >{readDone.has(readingIndex) ? "Mark as Unread" : "Mark as Read"}</button>
            <button
              onClick={() => goToReading(readingIndex + 1)}
              disabled={readingIndex === passages.length - 1}
              style={{
                width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                background: "transparent", border: `1px solid ${t.borderLight}`,
                color: readingIndex === passages.length - 1 ? t.textMuted : t.text,
                fontSize: "18px", cursor: readingIndex === passages.length - 1 ? "default" : "pointer",
                opacity: readingIndex === passages.length - 1 ? 0.25 : 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >→</button>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: "520px", display: "flex", justifyContent: "space-around",
        padding: "14px 16px calc(env(safe-area-inset-bottom, 16px) + 16px)", background: t.bg, borderTop: `1px solid ${t.border}`, zIndex: 20,
      }}>
        {[
          { key: "read", label: "Read", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transition: "all 0.3s ease" }}><circle cx="11" cy="11" r="9" stroke={color} strokeWidth="1.8" fill={active ? color : "none"} style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }} /></svg> },
          { key: "todo", label: "Tasks", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transition: "all 0.3s ease" }}><rect x="3" y="3" width="16" height="16" rx="3" stroke={color} strokeWidth="1.8" fill={active ? color : "none"} style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }} /></svg> },
          { key: "time", label: "Screen", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transition: "all 0.3s ease" }}><polygon points="11,2 21,19 1,19" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={active ? color : "none"} style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }} /></svg> },
          { key: "life", label: "Life", shape: (active, color) => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transition: "all 0.3s ease" }}><polygon points="11,1 21,11 11,21 1,11" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill={active ? color : "none"} style={{ transition: "fill 0.3s ease, stroke 0.3s ease" }} /></svg> },
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
              <span style={{
                fontSize: "12px", fontFamily: "'Nunito', sans-serif",
                fontWeight: isActive ? 700 : 400, letterSpacing: "0.5px", color,
                transition: "color 0.3s ease, font-weight 0.3s ease",
              }}>{tab.label}</span>
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
  html, body { margin: 0; padding: 0; height: 100%; }
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
