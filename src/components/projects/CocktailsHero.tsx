"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ══════════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════════ */

const VOCAB = [
  { text: "Kahlúa",        top: "9%",  left: "4%",   size: 22, delay: 0,   dur: 26 },
  { text: "float",         top: "15%", left: "65%",  size: 10, delay: 5,   dur: 20 },
  { text: "1½ oz",         top: "22%", left: "85%",  size: 9,  delay: 10,  dur: 28 },
  { text: "Baileys",       top: "33%", left: "12%",  size: 16, delay: 7,   dur: 23 },
  { text: "strain",        top: "44%", left: "50%",  size: 10, delay: 2,   dur: 32 },
  { text: "Grand Marnier", top: "54%", left: "70%",  size: 11, delay: 12,  dur: 27 },
  { text: "2 oz",          top: "19%", left: "36%",  size: 9,  delay: 6,   dur: 35 },
  { text: "garnish",       top: "66%", left: "6%",   size: 10, delay: 8,   dur: 24 },
  { text: "bitters",       top: "26%", left: "24%",  size: 9,  delay: 16,  dur: 21 },
  { text: "proof",         top: "76%", left: "42%",  size: 9,  delay: 3,   dur: 33 },
  { text: "stir",          top: "70%", left: "18%",  size: 20, delay: 14,  dur: 22 },
  { text: "muddle",        top: "48%", left: "22%",  size: 11, delay: 19,  dur: 29 },
  { text: "citrus",        top: "7%",  left: "46%",  size: 9,  delay: 22,  dur: 26 },
  { text: "express",       top: "82%", left: "76%",  size: 10, delay: 11,  dur: 25 },
  { text: "balance",       top: "88%", left: "30%",  size: 11, delay: 17,  dur: 30 },
  { text: "botanicals",    top: "60%", left: "58%",  size: 11, delay: 13,  dur: 28 },
];

/* 18 bubbles — inside the liquid area (x: 65–235 matches bowl width at those y levels) */
const BUBBLES = [
  { cx: 105, cy: 320, r: 1.1, delay: 0.0, dur: 4.4 },
  { cx: 162, cy: 305, r: 0.7, delay: 0.8, dur: 3.9 },
  { cx: 205, cy: 330, r: 1.3, delay: 1.4, dur: 5.2 },
  { cx: 132, cy: 285, r: 0.9, delay: 0.3, dur: 4.6 },
  { cx: 178, cy: 318, r: 0.6, delay: 2.0, dur: 3.6 },
  { cx: 118, cy: 298, r: 1.2, delay: 2.3, dur: 4.9 },
  { cx: 192, cy: 278, r: 0.8, delay: 1.0, dur: 4.1 },
  { cx: 148, cy: 345, r: 1.0, delay: 1.7, dur: 5.6 },
  { cx: 168, cy: 215, r: 0.7, delay: 0.6, dur: 4.0 },
  { cx: 122, cy: 198, r: 0.9, delay: 3.0, dur: 4.4 },
  { cx: 197, cy: 238, r: 0.6, delay: 1.2, dur: 3.7 },
  { cx: 143, cy: 175, r: 1.0, delay: 0.2, dur: 4.8 },
  { cx: 177, cy: 158, r: 0.6, delay: 3.4, dur: 3.4 },
  { cx: 113, cy: 128, r: 0.8, delay: 1.9, dur: 4.2 },
  { cx: 188, cy: 108, r: 0.6, delay: 2.7, dur: 3.8 },
  { cx: 150, cy: 262, r: 0.7, delay: 0.4, dur: 4.5 },
  { cx: 135, cy: 135, r: 0.9, delay: 2.1, dur: 3.9 },
  { cx: 170, cy: 290, r: 0.5, delay: 3.8, dur: 4.0 },
];

/* ══════════════════════════════════════════════════════════════════════════════
   THE B52 GLASS
══════════════════════════════════════════════════════════════════════════════ */

/*
 * Coupe silhouette:
 *   Rim: (25,50) → (275,50)
 *   Right curve: C(278,195)(244,335)(150,352) – wide at top, narrows to stem
 *   Left  curve: C(56,335)(22,195)(25,50)
 */
const BOWL_PATH = "M 25 50 L 275 50 C 278 195 244 335 150 352 C 56 335 22 195 25 50 Z";

/* Liquid layer boundaries (y in viewBox coords) */
const L_SURFACE = 70;   // top of liquid (headspace above = 20px)
const L_MID1    = 165;  // Grand Marnier / Baileys boundary
const L_MID2    = 258;  // Baileys / Kahlúa boundary
const L_STEM    = 352;  // stem join

function B52Glass() {
  const outlineRef = useRef<SVGPathElement>(null);

  /* Draw the glass outline on mount */
  useEffect(() => {
    const el = outlineRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray  = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    requestAnimationFrame(() => {
      el.style.transition       = "stroke-dashoffset 3.4s cubic-bezier(0.4,0,0.15,1) 0.2s";
      el.style.strokeDashoffset = "0";
    });
  }, []);

  return (
    <svg
      viewBox="0 0 300 540"
      /* Centered-right — overlaps the content area slightly for editorial depth */
      className="pointer-events-none absolute -right-[14%] top-[8%] h-[58vh] max-h-[680px] select-none opacity-70 sm:right-[2%] sm:h-[74vh] sm:opacity-100 md:right-[22%] md:top-[4%] md:h-[86vh]"
      aria-hidden="true"
    >
      <defs>
        {/* Clip liquid to bowl interior */}
        <clipPath id="b52-bowl">
          <path d={BOWL_PATH} />
        </clipPath>

        {/* Kahlúa — deep coffee brown */}
        <linearGradient id="g-kahlua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#70300c" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#3e1806" stopOpacity="0.96" />
        </linearGradient>

        {/* Baileys — cream, warm ivory */}
        <linearGradient id="g-baileys" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4a866" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#9c7238" stopOpacity="0.78" />
        </linearGradient>

        {/* Grand Marnier — orange amber */}
        <linearGradient id="g-gm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#e06a12" stopOpacity="0.60" />
          <stop offset="100%" stopColor="#b84c08" stopOpacity="0.78" />
        </linearGradient>

        {/* Inner left-wall reflection */}
        <linearGradient id="g-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="white" stopOpacity="0.11" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Glow under stem */}
        <filter id="stem-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ── Liquid layers — staggered pour animation ── */}
      <g clipPath="url(#b52-bowl)">

        {/* Kahlúa — bottom. Poured first at t=0.5s */}
        <rect
          x="0" y={L_MID2} width="300" height={L_STEM - L_MID2}
          fill="url(#g-kahlua)"
          style={{
            transformOrigin: `150px ${L_STEM}px`,
            animation: "b52-pour 0.95s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}
        />

        {/* Baileys — middle. Floated at t=1.55s */}
        <rect
          x="0" y={L_MID1} width="300" height={L_MID2 - L_MID1}
          fill="url(#g-baileys)"
          style={{
            transformOrigin: `150px ${L_MID2}px`,
            animation: "b52-pour 0.95s cubic-bezier(0.22,1,0.36,1) 1.55s both",
          }}
        />

        {/* Grand Marnier — top. Floated last at t=2.6s */}
        <rect
          x="0" y={L_SURFACE} width="300" height={L_MID1 - L_SURFACE}
          fill="url(#g-gm)"
          style={{
            transformOrigin: `150px ${L_MID1}px`,
            animation: "b52-pour 0.95s cubic-bezier(0.22,1,0.36,1) 2.6s both",
          }}
        />

        {/* Left-wall reflection across full liquid */}
        <rect x="0" y={L_SURFACE} width="55" height={L_STEM - L_SURFACE}
          fill="url(#g-wall)" />

        {/* Thin layer-separator lines — only visible after pour */}
        <line x1="0" y1={L_MID1} x2="300" y2={L_MID1}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1.4"
          style={{ opacity: 0, animation: "b52-fadein 0.4s ease 2.55s forwards" }} />
        <line x1="0" y1={L_MID2} x2="300" y2={L_MID2}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1.4"
          style={{ opacity: 0, animation: "b52-fadein 0.4s ease 1.5s forwards" }} />

        {/* Liquid surface shimmer — sweeps across every 7s */}
        <ellipse cx="150" cy={L_SURFACE + 5} rx="55" ry="5"
          fill="rgba(255,235,180,0.18)"
          style={{ animation: "b52-shimmer 7s ease-in-out 3.8s infinite" }} />

        {/* Rising microbubbles — clipped inside glass */}
        {BUBBLES.map((b, i) => (
          <circle
            key={i}
            cx={b.cx} cy={b.cy} r={b.r}
            fill="rgba(255,255,255,0.55)"
            style={{
              animation: `b52-bubble ${b.dur}s ${b.delay}s linear infinite`,
            }}
          />
        ))}
      </g>

      {/* ── Glass outline — draws itself on load ── */}
      <path
        ref={outlineRef}
        d={BOWL_PATH}
        fill="none"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Rim — slightly brighter */}
      <line x1="25" y1="50" x2="275" y2="50"
        stroke="rgba(255,255,255,0.42)" strokeWidth="1" />

      {/* Right-wall highlight — thin bright strip */}
      <path d="M 265 70 C 272 180 256 330 155 350"
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3"
        strokeLinecap="round" />

      {/* Stem */}
      <line x1="150" y1="352" x2="150" y2="476"
        stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeLinecap="round" />

      {/* Base */}
      <path d="M 86 476 Q 150 470 214 476"
        fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.4"
        strokeLinecap="round" />

      {/* Condensation droplets — outer surface */}
      {[
        { cx: 36, cy: 148, r: 1.4, delay: "0s" },
        { cx: 30, cy: 205, r: 1.0, delay: "1.2s" },
        { cx: 40, cy: 252, r: 1.6, delay: "0.4s" },
        { cx: 264, cy: 138, r: 1.1, delay: "2.1s" },
        { cx: 270, cy: 192, r: 1.5, delay: "0.8s" },
        { cx: 260, cy: 265, r: 0.9, delay: "1.6s" },
      ].map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r}
          fill="rgba(255,255,255,0.20)"
          style={{ animation: `b52-drip 3.5s ${d.delay} ease-in-out infinite` }} />
      ))}

      {/* Warm glow under the glass — candlelight through crystal */}
      <ellipse cx="150" cy="500" rx="80" ry="14"
        fill="rgba(200,80,8,0.18)"
        filter="url(#stem-glow)" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BAR ATMOSPHERE — breathing warm glow
══════════════════════════════════════════════════════════════════════════════ */

function BarAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {/* Main amber glow — bottom centre, breathes */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 60% 105%, rgba(190,76,8,0.28) 0%, transparent 58%)",
          animation: "b52-glow-pulse 8s ease-in-out infinite",
        }}
      />
      {/* Cool upper-left ambient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 40% 40% at 8% 4%, rgba(80,32,4,0.10) 0%, transparent 65%)",
      }} />
      {/* Edge vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 75% 75% at 58% 52%, transparent 28%, rgba(4,2,1,0.52) 80%)",
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO — full section
══════════════════════════════════════════════════════════════════════════════ */

export function CocktailsHero({
  metaLine,
  editorialTitle,
  galleryCount,
}: {
  metaLine: string;
  editorialTitle: string;
  galleryCount: number;
}) {
  /* Split title into lines for stagger */
  const lines = editorialTitle.split(" in ");
  const titleLines = lines.length === 2
    ? [lines[0], "in " + lines[1]]
    : [editorialTitle];

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-[#060402]">

      {/* Background atmosphere */}
      <BarAtmosphere />

      {/* The glass */}
      <B52Glass />

      {/* Floating vocabulary — over the glass, behind text */}
      <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden>
        {VOCAB.map((w, i) => (
          <span
            key={i}
            className="absolute select-none font-mono uppercase leading-none tracking-[0.2em]"
            style={{
              top: w.top, left: w.left,
              fontSize: w.size,
              color: "#fff",
              opacity: 0,
              "--word-op": 0.08,
              animation: `b52-vocab ${w.dur}s ${w.delay}s ease-in-out infinite`,
            } as React.CSSProperties}
          >
            {w.text}
          </span>
        ))}
      </div>

      {/* Top + bottom gradient — text legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[30%] bg-gradient-to-b from-[#060402]/90 via-[#060402]/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[42%] bg-gradient-to-t from-[#060402] via-[#060402]/72 to-transparent" />

      {/* ── Eyebrow ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="container-edge absolute inset-x-0 top-28 z-10 md:top-32"
      >
        <div className="eyebrow flex items-center gap-3 text-[var(--color-spark)]">
          <span className="block h-px w-8 bg-[var(--color-spark)]" />
          {metaLine}
        </div>
      </motion.div>

      {/* ── Title + stats block — left 55% of screen ── */}
      <div className="container-edge absolute inset-x-0 bottom-20 z-10 md:bottom-24">
        <div className="max-w-[88%] sm:max-w-[60%] md:max-w-[48%]">

          {/* Title — lines stagger up */}
          <h1 className="display text-[clamp(2.4rem,7vw,7.5rem)] leading-[0.93] text-[var(--color-bone)]">
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className="block overflow-hidden"
                initial={{ opacity: 0, y: 42 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
                {i === titleLines.length - 1 && (
                  <span className="text-[var(--color-spark)]">.</span>
                )}
              </motion.span>
            ))}
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 font-display text-base italic text-[var(--color-bone)]/75 md:text-lg"
          >
            Measured, repeatable, quietly serious about the details.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.88 }}
            className="mt-8 grid grid-cols-3 gap-x-8 border-t border-[var(--color-bone)]/12 pt-6 font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            <div>
              <span className="block text-[var(--color-fog)]">Made</span>
              <span className="mt-1 block text-xl font-light text-[var(--color-bone)]">
                {String(galleryCount).padStart(2, "0")}
              </span>
            </div>
            <div>
              <span className="block text-[var(--color-fog)]">Tools</span>
              <span className="mt-1 block text-[var(--color-bone)]">Shaker · jigger</span>
            </div>
            <div>
              <span className="block text-[var(--color-fog)]">Where</span>
              <span className="mt-1 block text-[var(--color-bone)]">Mumbai</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
          Scroll for the list ↓
        </span>
      </motion.div>

      {/* All keyframes */}
      <style>{`
        /* Layer pour: scale up from bottom */
        @keyframes b52-pour {
          0%   { transform: scaleY(0); }
          100% { transform: scaleY(1); }
        }
        @keyframes b52-fadein {
          to { opacity: 1; }
        }

        /* Bubble rising with horizontal sway */
        @keyframes b52-bubble {
          0%   { transform: translate(0px, 0px);   opacity: 0; }
          8%   { opacity: 0.55; }
          30%  { transform: translate(3px, -55px);  opacity: 0.55; }
          55%  { transform: translate(-2px, -110px); opacity: 0.4; }
          80%  { transform: translate(4px, -165px);  opacity: 0.18; }
          100% { transform: translate(0px, -220px);  opacity: 0; }
        }

        /* Surface shimmer sweep */
        @keyframes b52-shimmer {
          0%   { transform: translateX(-140px); opacity: 0; }
          18%  { opacity: 0.9; }
          82%  { opacity: 0.9; }
          100% { transform: translateX(140px);  opacity: 0; }
        }

        /* Condensation drip */
        @keyframes b52-drip {
          0%   { transform: translateY(0px);   opacity: 0.22; }
          40%  { transform: translateY(4px);   opacity: 0.28; }
          70%  { transform: translateY(7px);   opacity: 0.14; }
          100% { transform: translateY(10px);  opacity: 0; }
        }

        /* Atmosphere glow breathe */
        @keyframes b52-glow-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.68; }
        }

        /* Vocabulary rise */
        @keyframes b52-vocab {
          0%   { opacity: 0;                    transform: translateY(0); }
          12%  { opacity: var(--word-op, 0.08); }
          78%  { opacity: var(--word-op, 0.08); transform: translateY(-20px); }
          100% { opacity: 0;                    transform: translateY(-28px); }
        }
      `}</style>
    </section>
  );
}
