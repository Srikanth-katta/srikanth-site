"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * HeroGallery — cycles the user-supplied SVGs from /public/images/lowpoly/.
 *
 * Each SVG ships its own internal CSS keyframe animations
 * (.piece { animation: assemble … forwards }). Loading via plain <img>
 * runs the animation in its own document context — no DOM pollution and
 * the animation re-plays on every fresh mount via the keyed motion.div.
 *
 * The `scale` per item normalises perceived size — the runner SVG has a
 * portrait aspect that otherwise letterboxes much smaller than the
 * square mountain SVG.
 */

type Item = {
  id: string;
  label: string;
  src: string;
  glow: string;
  scale: number; // multiplier inside the gallery box (1 = fill)
};

const ITEMS: Item[] = [
  { id: "mountains",  label: "Mountain",   src: "/images/lowpoly/mountains.svg",  glow: "lp-glow-ice",   scale: 1.00 },
  { id: "skateboard", label: "Skateboard", src: "/images/lowpoly/skateboard.svg", glow: "lp-glow-amber", scale: 1.00 },
  { id: "piano",      label: "Piano",      src: "/images/lowpoly/piano.svg",      glow: "lp-glow-gold",  scale: 0.96 },
  { id: "bouldering", label: "Bouldering", src: "/images/lowpoly/bouldering.svg", glow: "lp-glow-warm",  scale: 0.94 },
  { id: "runner",     label: "Runner",     src: "/images/lowpoly/runner.svg",     glow: "lp-glow-lime",  scale: 0.85 },
  { id: "cocktails",  label: "Cocktails",  src: "/images/lowpoly/cocktails.svg",  glow: "lp-glow-amber", scale: 0.92 },
];

const CYCLE_MS = 4800;

export function HeroGallery() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % ITEMS.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const safeIdx = ((idx % ITEMS.length) + ITEMS.length) % ITEMS.length;
  const current = ITEMS[safeIdx] ?? ITEMS[0];

  return (
    <div
      className="relative isolate mx-auto aspect-square w-full max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Tighter glow inset so it doesn't bleed into the text column */}
      <div
        key={`glow-${current.id}`}
        className={`pointer-events-none absolute -inset-3 rounded-full blur-2xl transition-opacity duration-700 ${current.glow}`}
        style={{ opacity: 0.5 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-[2] flex items-center justify-center"
        >
          {/* The per-item scale keeps every illustration visually similar in size. */}
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ transform: `scale(${current.scale})` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.label}
              className="h-full w-full select-none object-contain"
              draggable={false}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Label + progress dots */}
      <div className="absolute inset-x-0 -bottom-6 z-10 flex items-center justify-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-spark)]">
          {current.label}
        </span>
        <span className="flex items-center gap-1.5">
          {ITEMS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setIdx(i)}
              aria-label={`Show ${it.label}`}
              data-cursor="link"
              className="block h-1 cursor-pointer transition-all duration-500"
              style={{
                width: i === safeIdx ? 22 : 6,
                background:
                  i === safeIdx ? "var(--color-spark)" : "rgba(232,234,238,0.2)",
              }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
