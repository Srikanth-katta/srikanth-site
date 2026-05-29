"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pangong cinematic hero backdrop — v2.
 *
 * Source is the original portrait running clip, denoised + colour-graded at
 * build time. The footage is staged as a right-anchored panel that feathers
 * into the page's ink. The left is *not* dead black: it carries a cold
 * atmospheric glow (light spilling off the ice), a faint topographic contour
 * texture, a vertical index rail, and slow-drifting frost — so the whole frame
 * reads as a designed, living canvas.
 *
 *   - mobile  : full-bleed footage, bottom feathered into ink for the type
 *   - desktop : right-anchored panel, left edge feathered into ink
 */

// Deterministic frost field (no Math.random → no hydration mismatch).
const FROST = Array.from({ length: 34 }, (_, i) => ({
  left: (i * 29.0) % 100,
  top: (i * 53.0) % 100,
  size: 1 + (i % 3) * 0.9,
  dur: 14 + (i % 6) * 3,
  delay: -((i * 1.7) % 18),
  drift: ((i % 5) - 2) * 1.4,
  op: 0.18 + (i % 4) * 0.12,
}));

export function PangongHero({
  webm = "/videos/pangong-run.webm",
  mp4 = "/videos/pangong-run.mp4",
  poster = "/videos/pangong-run-poster.webp",
}: {
  webm?: string;
  mp4?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.readyState >= 3) setReady(true);
    const onReady = () => setReady(true);
    v.addEventListener("loadeddata", onReady);
    v.addEventListener("canplay", onReady);
    v.play().catch(() => {});
    return () => {
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("canplay", onReady);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden bg-[var(--color-ink)]">
      {/* Cold atmosphere — light spilling off the ice across the page. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 130% at 86% 38%, rgba(79,163,199,0.20) 0%, rgba(13,42,58,0.16) 28%, rgba(5,6,8,0) 58%)",
        }}
      />
      {/* A whisper of warmth low-left, echoing the low sun in the footage. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(70% 60% at 4% 96%, rgba(255,107,26,0.07) 0%, rgba(5,6,8,0) 50%)",
        }}
      />

      {/* Topographic contour texture — depth lines of the lakebed. */}
      <svg
        className="pointer-events-none absolute -left-[10%] top-[-14%] z-[1] hidden h-[128%] w-[82%] text-[var(--color-ice)] opacity-[0.11] md:block"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden
      >
        {[36, 86, 142, 205, 275, 352, 436, 528, 628].map((r, i) => (
          <ellipse
            key={r}
            cx="150"
            cy="392"
            rx={r}
            ry={r * 0.66}
            stroke="currentColor"
            strokeWidth={i % 2 === 0 ? 1.1 : 0.6}
          />
        ))}
      </svg>

      {/* The feathered footage panel. */}
      <div className="pangong-panel absolute inset-0 z-[2] overflow-hidden md:left-auto md:right-0 md:w-[50%] lg:w-[47%] xl:w-[45%]">
        <div
          className="pangong-panel__drift absolute inset-0"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 1600ms ease-out" }}
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={poster}
            className="absolute inset-0 h-full w-full object-cover object-center"
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
          {/* Self-vignette so the panel never reads as a flat rectangle. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(125% 78% at 52% 42%, transparent 40%, rgba(5,6,8,0.45) 80%, rgba(5,6,8,0.9) 100%)",
            }}
          />
        </div>
      </div>

      {/* Scrims for type legibility. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[74%] bg-[linear-gradient(to_top,var(--color-ink)_0%,rgba(5,6,8,0.82)_42%,transparent_100%)] md:h-[52%] md:bg-[linear-gradient(to_top,var(--color-ink)_0%,rgba(5,6,8,0.66)_46%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[3] hidden md:block bg-[linear-gradient(100deg,var(--color-ink)_26%,rgba(5,6,8,0.6)_46%,transparent_64%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-[22%] bg-gradient-to-b from-[var(--color-ink)]/85 to-transparent" />

      {/* Drifting frost. */}
      <div className="pangong-frost pointer-events-none absolute inset-0 z-[3]">
        {FROST.map((f, i) => (
          <span
            key={i}
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              opacity: f.op,
              ["--drift" as string]: `${f.drift}vw`,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Vertical index rail — far left edge. */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-[3] hidden -translate-y-1/2 items-center gap-4 md:left-8 lg:flex lg:flex-col">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-bone)]/40">
          01
        </span>
        <span className="block h-24 w-px bg-gradient-to-b from-transparent via-[var(--color-bone)]/25 to-transparent" />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.32em] text-[var(--color-bone)]/35"
          style={{ writingMode: "vertical-rl" }}
        >
          Pangong Tso · 33.7°N
        </span>
        <span className="block h-24 w-px bg-gradient-to-b from-transparent via-[var(--color-bone)]/25 to-transparent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-spark)]/70">
          ↓
        </span>
      </div>

      {/* Anamorphic light sweep. */}
      <div className="pangong-sweep pointer-events-none absolute inset-0 z-[3] mix-blend-screen" />
      {/* Fine film grain over the whole hero. */}
      <div className="pangong-grain pointer-events-none absolute inset-0 z-[4] mix-blend-overlay" />

      <style>{`
        .pangong-panel {
          -webkit-mask-image: linear-gradient(to top, transparent 0%, #000 26%, #000 100%);
                  mask-image: linear-gradient(to top, transparent 0%, #000 26%, #000 100%);
        }
        @media (min-width: 768px) {
          .pangong-panel {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 40%, #000 100%);
                    mask-image: linear-gradient(to right, transparent 0%, #000 40%, #000 100%);
          }
        }
        .pangong-panel__drift {
          animation: pangong-kenburns 26s ease-in-out infinite alternate;
          transform-origin: 52% 40%;
          will-change: transform;
        }
        @keyframes pangong-kenburns {
          from { transform: scale(1.05) translate3d(0, 0, 0); }
          to   { transform: scale(1.13) translate3d(0, -2.2%, 0); }
        }
        .pangong-frost span {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(232,234,238,0.9), rgba(127,216,255,0.2) 60%, transparent 70%);
          filter: blur(0.4px);
          animation-name: pangong-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes pangong-fall {
          0%   { transform: translate3d(0, -8vh, 0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translate3d(var(--drift), 92vh, 0); opacity: 0; }
        }
        .pangong-sweep {
          background: linear-gradient(
            104deg,
            transparent 40%,
            rgba(127,216,255,0.06) 47%,
            rgba(232,234,238,0.10) 50%,
            rgba(127,216,255,0.06) 53%,
            transparent 60%
          );
          background-size: 260% 100%;
          animation: pangong-sweep 14s ease-in-out infinite;
        }
        @keyframes pangong-sweep {
          0%   { background-position: 170% 0; opacity: 0; }
          26%  { opacity: 1; }
          52%  { opacity: 1; }
          80%  { opacity: 0; }
          100% { background-position: -70% 0; opacity: 0; }
        }
        .pangong-grain {
          opacity: 0.05;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>");
          background-size: 170px 170px;
          animation: pangong-grain 0.7s steps(3) infinite;
        }
        @keyframes pangong-grain {
          0%   { transform: translate(0, 0); }
          33%  { transform: translate(-3%, 1%); }
          66%  { transform: translate(2%, -2%); }
          100% { transform: translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pangong-panel__drift { animation: none; transform: scale(1.05); }
          .pangong-sweep, .pangong-grain, .pangong-frost span { animation: none; }
          .pangong-frost { display: none; }
        }
      `}</style>
    </div>
  );
}
