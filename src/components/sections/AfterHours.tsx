"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { afterHours, type AfterHoursKind } from "@/content/site";
import AfterHoursReveal from "@/components/AfterHoursReveal";

/* ──────────────────────────────────────────────────────────────────────────────
   VOCABULARY — words per hobby with their translations
   ────────────────────────────────────────────────────────────────────────────── */
const VOCAB: Record<AfterHoursKind, { w: string; t: string }[]> = {
  spanish:  [
    { w: "hola",      t: "hello"          },
    { w: "gracias",   t: "thank you"      },
    { w: "mañana",    t: "tomorrow"       },
    { w: "amigo",     t: "friend"         },
    { w: "viaje",     t: "journey"        },
    { w: "tiempo",    t: "time / weather" },
    { w: "aprender",  t: "to learn"       },
    { w: "vivir",     t: "to live"        },
  ],
  piano:    [
    { w: "octave",    t: "8-note span"     },
    { w: "chord",     t: "stacked notes"   },
    { w: "scale",     t: "stepwise climb"  },
    { w: "arpeggio",  t: "broken chord"    },
    { w: "sustain",   t: "held by pedal"   },
    { w: "tempo",     t: "the pulse"       },
    { w: "phrase",    t: "a musical line"  },
    { w: "key",       t: "tonal home"      },
  ],
  climbing: [
    { w: "crimp",     t: "tiny hold"    },
    { w: "dyno",      t: "dynamic leap" },
    { w: "beta",      t: "the solution" },
    { w: "crux",      t: "hardest move" },
    { w: "smear",     t: "press & trust"},
    { w: "send",      t: "clean ascent" },
    { w: "flash",     t: "first try"    },
    { w: "project",   t: "your nemesis" },
  ],
  swimming: [
    { w: "bilateral", t: "both sides"   },
    { w: "catch",     t: "feel the water"},
    { w: "glide",     t: "hold longer"  },
    { w: "rotate",    t: "hips lead"    },
    { w: "pull",      t: "power phase"  },
    { w: "breathe",   t: "when you can" },
    { w: "stroke",    t: "one cycle"    },
    { w: "lap",       t: "50m + back"   },
  ],
  skating:  [
    { w: "crossover", t: "crossing stride"},
    { w: "edge",      t: "lean & commit" },
    { w: "carve",     t: "trust the lean"},
    { w: "draft",     t: "find the slip" },
    { w: "push",      t: "full extension"},
    { w: "apex",      t: "peak of turn"  },
    { w: "glide",     t: "weight forward"},
    { w: "stride",    t: "push & recover"},
  ],
};

/* ──────────────────────────────────────────────────────────────────────────────
   PALETTES — each hobby gets a complete colour world
   ────────────────────────────────────────────────────────────────────────────── */
type Palette = {
  bg: string;        // page background
  ink: string;       // primary text on this bg
  accent: string;    // the colour
  muted: string;     // secondary text
  bigWord: string;   // the oversized display word
  label: string;     // short label
};

const PALETTE: Record<AfterHoursKind, Palette> = {
  spanish: {
    bg:      "#100802",
    ink:     "#f0e8dc",
    accent:  "#d97c38",
    muted:   "rgba(240,232,220,0.38)",
    bigWord: "Español",
    label:   "Language",
  },
  piano: {
    bg:      "#07060f",
    ink:     "#e8e4f4",
    accent:  "#8b7fd4",
    muted:   "rgba(232,228,244,0.36)",
    bigWord: "Piano",
    label:   "Music",
  },
  climbing: {
    bg:      "#0c0704",
    ink:     "#ede4d6",
    accent:  "#b88040",
    muted:   "rgba(237,228,214,0.36)",
    bigWord: "Boulder",
    label:   "Climbing",
  },
  swimming: {
    bg:      "#030d14",
    ink:     "#d8f0f8",
    accent:  "#2496c8",
    muted:   "rgba(216,240,248,0.36)",
    bigWord: "Swim",
    label:   "Swimming",
  },
  skating: {
    bg:      "#0a0614",
    ink:     "#f0e8f4",
    accent:  "#c8504a",
    muted:   "rgba(240,232,244,0.36)",
    bigWord: "Skate",
    label:   "Inline",
  },
};

/* ──────────────────────────────────────────────────────────────────────────────
   HOVER WORD — translates on hover
   ────────────────────────────────────────────────────────────────────────────── */
function HoverWord({
  w, t, accent, ink, rm,
}: { w: string; t: string; accent: string; ink: string; rm: boolean }) {
  const [on, setOn] = useState(false);
  return (
    <span
      className="relative inline-block"
      style={{ cursor: "none" }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <motion.span
        className="block select-none font-mono text-[11px] uppercase tracking-[0.22em]"
        animate={{
          opacity: on ? 0 : 0.55,
          y: on ? -4 : 0,
        }}
        transition={{ duration: rm ? 0 : 0.2 }}
        style={{ color: ink }}
      >
        {w}
      </motion.span>

      <AnimatePresence>
        {on && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 3 }}
            transition={{ duration: rm ? 0 : 0.18 }}
            className="pointer-events-none absolute bottom-full left-0 mb-1.5 whitespace-nowrap rounded font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{
              color: accent,
              background: `${accent}18`,
              border: `1px solid ${accent}35`,
              padding: "3px 10px 4px",
            }}
          >
            {t}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   PANEL — one full-screen hobby panel
   ────────────────────────────────────────────────────────────────────────────── */
function Panel({
  card,
  rm,
}: {
  card: (typeof afterHours)[0];
  rm: boolean;
}) {
  const p    = PALETTE[card.kind];
  const words = VOCAB[card.kind];

  /* ── Editorial content ── */
  const content = (
    <div
      className="relative z-10 flex h-full flex-col md:flex-row"
      style={{ paddingBottom: 56 }}
    >
        {/* LEFT — giant display word, vertically centred */}
        <div className="relative hidden shrink-0 items-center justify-center overflow-hidden md:flex md:w-[44%]">
          <div
            className="pointer-events-none select-none leading-[0.85] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(90px, 14vw, 220px)",
              color: p.accent,
              opacity: 0.15,
            }}
            aria-hidden
          >
            {p.bigWord}
          </div>
        </div>

        {/* RIGHT — editorial content */}
        <div className="flex flex-1 flex-col justify-center gap-6 px-10 pt-24 pb-6 md:px-14 md:pt-0 md:pb-0 md:pr-16">

          {/* Eyebrow + title */}
          <div>
            <p
              className="mb-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em]"
              style={{ color: p.accent }}
            >
              <span className="block h-px w-5" style={{ background: p.accent }} />
              {p.label}
            </p>
            <h3
              className="leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(26px, 3.2vw, 50px)",
                color: p.ink,
                letterSpacing: "-0.02em",
              }}
            >
              {card.title}
            </h3>
          </div>

          {/* Body */}
          <p
            className="max-w-md leading-relaxed"
            style={{ fontSize: "clamp(13px, 1.05vw, 15px)", color: p.muted }}
          >
            {card.body}
          </p>

          {/* Vocabulary — hover to translate */}
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {words.slice(0, 6).map((entry) => (
              <HoverWord
                key={entry.w}
                w={entry.w}
                t={entry.t}
                accent={p.accent}
                ink={p.ink}
                rm={rm}
              />
            ))}
          </div>

          {/* Meta chips */}
          {(card.frequency || card.currentFocus) && (
            <div className="flex flex-wrap gap-2">
              {card.frequency && (
                <span
                  className="rounded-full font-mono text-[9px] uppercase tracking-[0.16em]"
                  style={{
                    padding: "4px 14px 5px",
                    background: `${p.accent}14`,
                    color: `${p.accent}a0`,
                    border: `1px solid ${p.accent}28`,
                  }}
                >
                  {card.frequency}
                </span>
              )}
              {card.currentFocus && (
                <span
                  className="rounded-full font-mono text-[9px] uppercase tracking-[0.16em]"
                  style={{
                    padding: "4px 14px 5px",
                    color: `${p.ink}40`,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {card.currentFocus}
                </span>
              )}
            </div>
          )}

          {/* Transfer line */}
          <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <p
              className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.28em]"
              style={{ color: `${p.ink}30` }}
            >
              carries into work
            </p>
            <p
              className="max-w-sm leading-relaxed"
              style={{ fontSize: "clamp(11px, 0.9vw, 14px)", color: `${p.ink}45` }}
            >
              {card.transfer}
            </p>
          </div>
        </div>
      </div>
  );

  /* ── Same reveal mechanic across every panel; only the 3D scene swaps. ── */
  return (
    <motion.div
      className="absolute inset-0"
      style={{ background: p.bg }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: rm ? 0 : 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <AfterHoursReveal kind={card.kind} bg={p.bg} overlayColor={p.bg} cursorRadius={85}>
        {content}
      </AfterHoursReveal>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   MOBILE PANEL — natural stacked layout (no scroll-hijack, no cursor, no clipping)
   ────────────────────────────────────────────────────────────────────────────── */
function MobilePanel({ card }: { card: (typeof afterHours)[number] }) {
  const p = PALETTE[card.kind];
  const words = VOCAB[card.kind];
  return (
    <section className="relative overflow-hidden" style={{ background: p.bg }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/after-hours/${card.kind}.png`}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(to bottom, ${p.bg}d9, ${p.bg}f2)` }}
      />
      <div className="relative z-10 flex flex-col gap-5 px-6 py-16">
        <p
          className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em]"
          style={{ color: p.accent }}
        >
          <span className="block h-px w-5" style={{ background: p.accent }} />
          {p.label}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(28px, 8vw, 40px)",
            color: p.ink,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {card.title}
        </h3>
        <p className="leading-relaxed" style={{ fontSize: 14, color: p.muted }}>
          {card.body}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          {words.slice(0, 6).map((entry) => (
            <span key={entry.w} style={{ color: p.ink }}>
              {entry.w}
              <span style={{ color: p.accent }}> · {entry.t}</span>
            </span>
          ))}
        </div>
        {(card.frequency || card.currentFocus) && (
          <div className="flex flex-wrap gap-2">
            {card.frequency && (
              <span
                className="rounded-full font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{
                  padding: "4px 14px 5px",
                  background: `${p.accent}14`,
                  color: `${p.accent}a0`,
                  border: `1px solid ${p.accent}28`,
                }}
              >
                {card.frequency}
              </span>
            )}
            {card.currentFocus && (
              <span
                className="rounded-full font-mono text-[9px] uppercase tracking-[0.16em]"
                style={{
                  padding: "4px 14px 5px",
                  color: `${p.ink}40`,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {card.currentFocus}
              </span>
            )}
          </div>
        )}
        <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p
            className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.28em]"
            style={{ color: `${p.ink}30` }}
          >
            carries into work
          </p>
          <p className="leading-relaxed" style={{ fontSize: 13, color: `${p.ink}55` }}>
            {card.transfer}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────────────────────────────────────── */
export function AfterHours() {
  const total      = afterHours.length;
  const rm         = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top      = el.getBoundingClientRect().top + window.scrollY;
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.min(1, Math.max(0, (window.scrollY - top) / scrollable));
      const next = Math.min(total - 1, Math.max(0, Math.round(p * (total - 1))));
      if (next !== active) setActive(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [active, total]);

  const scrollToPanel = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top        = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + (i / Math.max(1, total - 1)) * scrollable,
      behavior: rm ? "auto" : "smooth",
    });
  };

  const activeCard = afterHours[active];
  const p          = PALETTE[activeCard.kind];

  return (
    <section id="after-hours" className="relative">
      {/* Mobile: simple stacked panels — scroll naturally, nothing clipped */}
      <div className="md:hidden">
        {afterHours.map((card) => (
          <MobilePanel key={card.slug} card={card} />
        ))}
      </div>

      {/* Desktop: sticky scroll-driven crossfade with cursor reveal */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${total * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── Full-screen panels — crossfade ── */}
        <AnimatePresence mode="wait">
          <Panel
            key={activeCard.slug}
            card={activeCard}
            rm={!!rm}
          />
        </AnimatePresence>

        {/* ── Bottom strip ── */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)", height: 56 }}
        >
          <div className="flex h-full items-center gap-5 px-10 md:px-16">

            {/* Index — fixed width so it never shifts siblings */}
            <div className="flex w-14 shrink-0 items-baseline gap-1">
              <span
                className="font-mono text-xl font-light leading-none tracking-tight"
                style={{ color: p.accent, transition: "color 0.7s ease" }}
              >
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.18)" }}>
                /{String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Dot nav — shrink-0 so it can't be squeezed */}
            <div className="flex shrink-0 items-center gap-2" role="tablist" aria-label="After Hours">
              {afterHours.map((card, i) => (
                <button
                  key={card.slug}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => scrollToPanel(i)}
                  aria-label={card.title}
                  className="block rounded-full border-0 p-0"
                  style={{
                    width:      active === i ? 20 : 5,
                    height:     5,
                    background: active === i ? p.accent : "rgba(255,255,255,0.15)",
                    transition: "width 0.35s cubic-bezier(.4,0,.2,1), background 0.7s ease",
                  }}
                />
              ))}
            </div>

            {/* Progress line — takes remaining space */}
            <div className="relative h-px flex-1 rounded-full bg-white/[0.07]">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                animate={{ width: `${((active + 1) / total) * 100}%`, background: p.accent }}
                transition={{ duration: rm ? 0 : 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Category label — right-most, hidden on mobile */}
            <span
              className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.24em] md:block"
              style={{ color: "rgba(255,255,255,0.22)", transition: "color 0.7s ease" }}
            >
              {PALETTE[activeCard.kind].label}
            </span>

          </div>
        </div>

        </div>
      </div>
    </section>
  );
}
