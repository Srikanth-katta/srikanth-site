"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { ebcRoute, ebcFinaleImage } from "@/content/site";

export function Expedition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const N = ebcRoute.length; // 8
  const TOTAL = N + 1; // waypoints + finale

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { damping: 32, stiffness: 110 });
  const routeProgress = useTransform(progress, [0, N / TOTAL], [0, 1]);
  const finaleProgress = useTransform(progress, [N / TOTAL, 1], [0, 1]);
  const finaleOpacity = useTransform(
    progress,
    [N / TOTAL - 0.015, N / TOTAL + 0.02],
    [0, 1]
  );

  // Live HUD values
  const altitude = useTransform(routeProgress, (v) => {
    const idxF = Math.max(0, Math.min(N - 1, v * (N - 0.001)));
    const i0 = Math.floor(idxF);
    const i1 = Math.min(N - 1, i0 + 1);
    const t = idxF - i0;
    return Math.round(
      ebcRoute[i0].altitude + (ebcRoute[i1].altitude - ebcRoute[i0].altitude) * t
    );
  });
  const altitudeText = useTransform(altitude, (v) => v.toLocaleString());

  const distance = useTransform(routeProgress, (v) => {
    const idxF = Math.max(0, Math.min(N - 1, v * (N - 0.001)));
    const i0 = Math.floor(idxF);
    const i1 = Math.min(N - 1, i0 + 1);
    const t = idxF - i0;
    return Math.round(
      ebcRoute[i0].distanceKm + (ebcRoute[i1].distanceKm - ebcRoute[i0].distanceKm) * t
    );
  });
  const distanceText = useTransform(distance, (v) => v.toString());

  return (
    <section
      id="expedition"
      ref={sectionRef}
      className="relative bg-[var(--color-ink)]"
      style={{ height: `${TOTAL * 75}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Background layer — only the active waypoint is visible at a time */}
        {ebcRoute.map((wp, i) => (
          <BackgroundLayer
            key={wp.id}
            image={wp.image}
            index={i}
            total={TOTAL}
            progress={progress}
            alt={wp.name}
          />
        ))}

        {/* Darkening overlays — subtle global dim, strong top for heading, lighter bottom */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[var(--color-ink)]/25" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-1/3 bg-gradient-to-b from-[var(--color-ink)]/85 via-[var(--color-ink)]/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-2/5 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/50 to-transparent" />

        {/* Top: heading + horizontal route strip */}
        <div className="container-edge relative z-20 shrink-0 pt-24 md:pt-28">
          <div className="mb-5 flex items-start justify-between gap-6">
            <div>
              <div className="eyebrow mb-2 flex items-center gap-3">
                <span className="block h-px w-8 bg-[var(--color-ice)]" />
                Expedition · Lukla → Everest Base Camp
              </div>
              <h2 className="display max-w-3xl text-2xl text-[var(--color-bone)] md:text-3xl">
                Twelve days. Eight stops. Thinner air at every one.
              </h2>
            </div>
            <HUD altitudeText={altitudeText} distanceText={distanceText} />
          </div>

          {/* Horizontal route strip — replaces the old sidebar map */}
          <RouteStrip progress={routeProgress} />
        </div>

        {/* Bottom: per-waypoint content panel (single column, full width) */}
        <div className="container-edge relative z-20 mt-auto pb-16 md:pb-20">
          <div className="relative min-h-[260px] md:min-h-[300px]">
            {ebcRoute.map((wp, i) => (
              <WaypointPanel
                key={wp.id}
                waypoint={wp}
                index={i}
                total={TOTAL}
                progress={progress}
              />
            ))}
          </div>
        </div>

        {/* Finale */}
        <FinaleOverlay opacity={finaleOpacity} progress={finaleProgress} />
      </div>
    </section>
  );
}

/* ---------------- Backgrounds ---------------- */

function BackgroundLayer({
  image,
  index,
  total,
  progress,
  alt,
}: {
  image: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  alt: string;
}) {
  const center = (index + 0.5) / total;
  const span = 0.5 / total; // tighter than before — sharper transitions
  const fade = 0.18 / total; // narrow cross-fade band

  // Opacity: flat 1 in the active window, hard-falls outside the window.
  const opacity = useTransform(progress, (v) => {
    const d = Math.abs(v - center);
    if (d <= span - fade) return 1;
    if (d >= span + fade) return 0;
    // Linear ease in the narrow fade band
    return Math.max(0, 1 - (d - (span - fade)) / (2 * fade));
  });

  // Slow Ken Burns inside the active window
  const scale = useTransform(progress, (v) => {
    const d = (v - center) / span;
    return 1.06 + Math.max(-1, Math.min(1, d)) * -0.03;
  });

  return (
    <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
      <Image
        src={image}
        alt={alt}
        fill
        priority={index === 0}
        quality={86}
        sizes="100vw"
        className="object-cover object-[center_65%]"
      />
    </motion.div>
  );
}

/* ---------------- Elevation profile route strip ---------------- */

function RouteStrip({ progress }: { progress: MotionValue<number> }) {
  const N   = ebcRoute.length; // 8
  const SVG_W = 720;

  // X: evenly spaced from 30 to 690
  const xFor = (i: number) => 30 + (i / (N - 1)) * 660;

  // Y: altitude mapped — high altitude = low y (higher on screen)
  // Phakding (2610) = y 50 (lowest), EBC (5364) = y 12 (highest)
  const ALT_MIN = 2610, ALT_MAX = 5364;
  const yFor = (alt: number) => 50 - ((alt - ALT_MIN) / (ALT_MAX - ALT_MIN)) * 38;

  const pts = ebcRoute.map((wp, i) => ({ x: xFor(i), y: yFor(wp.altitude) }));
  const ghostPts = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPts  = [...pts.map((p) => `${p.x},${p.y}`), `690,54`, `30,54`].join(" ");

  // Refs for imperative animation (avoids re-renders on every scroll tick)
  const polyRef = useRef<SVGPolylineElement>(null);
  const dotRef  = useRef<SVGGElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    const f    = Math.max(0, Math.min(1, v));
    const fIdx = f * (N - 1);
    const i0   = Math.floor(fIdx);
    const i1   = Math.min(N - 1, i0 + 1);
    const t    = fIdx - i0;
    const tx   = pts[i0].x + (pts[i1].x - pts[i0].x) * t;
    const ty   = pts[i0].y + (pts[i1].y - pts[i0].y) * t;

    // Move trekker dot
    dotRef.current?.setAttribute("transform", `translate(${tx},${ty})`);

    // Grow progress polyline
    if (polyRef.current) {
      const visible = pts.slice(0, i0 + 1);
      if (i0 < N - 1) visible.push({ x: tx, y: ty });
      polyRef.current.setAttribute("points", visible.map((p) => `${p.x},${p.y}`).join(" "));
    }

    setActiveIdx(Math.round(fIdx));
  });

  return (
    <div className="relative w-full select-none">
      {/* SVG — elevation profile */}
      <svg
        viewBox={`0 0 ${SVG_W} 58`}
        className="h-[58px] w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Baseline */}
        <line x1="30" y1="54" x2="690" y2="54"
          stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

        {/* Filled area under elevation — very faint */}
        <polyline points={fillPts}
          fill="rgba(127,216,255,0.035)" stroke="none" />

        {/* Ghost elevation path */}
        <polyline points={ghostPts}
          fill="none" stroke="rgba(255,255,255,0.1)"
          strokeWidth="1" strokeLinejoin="round" />

        {/* Completed elevation path — grows with scroll */}
        <polyline ref={polyRef}
          points={`${pts[0].x},${pts[0].y}`}
          fill="none" stroke="#7FD8FF"
          strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" />

        {/* Waypoint dots on the elevation path */}
        {pts.map((pt, i) => (
          <circle key={i}
            cx={pt.x} cy={pt.y} r="2.5"
            fill="#050608"
            stroke={i <= activeIdx ? "#7FD8FF" : "rgba(255,255,255,0.18)"}
            strokeWidth="1"
            opacity={i <= activeIdx ? 1 : 0.4}
          />
        ))}

        {/* Trekker — follows the elevation path */}
        <g ref={dotRef} transform={`translate(${pts[0].x},${pts[0].y})`}>
          <circle cx="0" cy="0" r="8" fill="#7FD8FF" opacity="0.15" />
          <circle cx="0" cy="0" r="3.5" fill="#7FD8FF" filter="url(#dotGlow)" />
          <circle cx="0" cy="0" r="1.5" fill="#050608" />
        </g>
      </svg>

      {/* Labels — HTML so they use the project font properly */}
      <div className="relative h-5">
        {ebcRoute.map((wp, i) => (
          <span
            key={wp.id}
            className="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase leading-none tracking-[0.16em] transition-colors duration-300"
            style={{
              left:  `${(xFor(i) / SVG_W) * 100}%`,
              color: i === activeIdx
                ? "rgba(127,216,255,0.9)"
                : "rgba(255,255,255,0.22)",
            }}
          >
            {wp.name === "Namche Bazaar" ? "Namche" : wp.name === "Gorak Shep" ? "Gorak S." : wp.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- HUD ---------------- */

function HUD({
  altitudeText,
  distanceText,
}: {
  altitudeText: MotionValue<string>;
  distanceText: MotionValue<string>;
}) {
  return (
    <div className="hidden flex-row items-start gap-8 md:flex">
      <div className="flex flex-col items-end">
        <span className="eyebrow mb-1">Altitude</span>
        <div className="flex items-baseline gap-1.5 font-mono text-[var(--color-bone)]">
          <motion.span className="text-2xl md:text-3xl">{altitudeText}</motion.span>
          <span className="text-xs text-[var(--color-fog)]">m</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="eyebrow mb-1">Distance</span>
        <div className="flex items-baseline gap-1.5 font-mono text-[var(--color-bone)]">
          <motion.span className="text-2xl md:text-3xl">{distanceText}</motion.span>
          <span className="text-xs text-[var(--color-fog)]">km</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Waypoint panel ---------------- */

function WaypointPanel({
  waypoint,
  index,
  total,
  progress,
}: {
  waypoint: (typeof ebcRoute)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const center = (index + 0.5) / total;
  const span = 0.45 / total; // sharper than before
  const fade = 0.16 / total;

  const opacity = useTransform(progress, (v) => {
    const d = Math.abs(v - center);
    if (d <= span - fade) return 1;
    if (d >= span + fade) return 0;
    return Math.max(0, 1 - (d - (span - fade)) / (2 * fade));
  });
  const y = useTransform(progress, (v) => (v - center) * -80);

  return (
    <motion.article
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 flex flex-col justify-end"
    >
      <div className="eyebrow mb-3 flex flex-wrap items-center gap-3">
        <span className="text-[var(--color-spark)]">
          {String(index + 1).padStart(2, "0")} / {String(total - 1).padStart(2, "0")}
        </span>
        <span className="text-[var(--color-fog)]">·</span>
        <span>{waypoint.altitudeLabel}</span>
        <span className="text-[var(--color-fog)]">·</span>
        <span>{waypoint.distanceKm} km from Lukla</span>
      </div>
      <h3 className="display mb-4 text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-[var(--color-bone)]">
        {waypoint.name}
      </h3>
      <p className="mb-3 max-w-2xl text-lg font-light text-[var(--color-bone)]/95 md:text-2xl">
        {waypoint.description}
      </p>
      <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-bone)]/75 md:text-base">
        {waypoint.detail}
      </p>
    </motion.article>
  );
}

/* ---------------- Finale ---------------- */

function FinaleOverlay({
  opacity,
  progress,
}: {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [0, 1], [1.1, 1.0]);
  const titleY = useTransform(progress, [0, 0.4], [40, 0]);
  const titleOpacity = useTransform(progress, [0.05, 0.35], [0, 1]);
  const subOpacity = useTransform(progress, [0.25, 0.55], [0, 1]);
  const dropOpacity = useTransform(progress, [0.45, 0.75], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden bg-[var(--color-ink)]"
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={ebcFinaleImage}
          alt="Mount Everest at sunrise"
          fill
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_65%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/30 via-[var(--color-ink)]/10 to-[var(--color-ink)]/80" />
      </motion.div>

      <div className="container-edge relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          style={{ opacity: titleOpacity }}
          className="eyebrow mb-6 flex items-center gap-3 text-[var(--color-ice)]"
        >
          <span className="block h-px w-8 bg-[var(--color-ice)]" />
          You reached it.
          <span className="block h-px w-8 bg-[var(--color-ice)]" />
        </motion.div>

        <motion.h2
          style={{ opacity: titleOpacity, y: titleY }}
          className="display text-[clamp(3rem,11vw,11rem)] leading-[0.9] text-[var(--color-bone)]"
        >
          EVEREST
          <br />
          BASE CAMP
        </motion.h2>

        <motion.div
          style={{ opacity: subOpacity }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-3xl tracking-[0.15em] text-[var(--color-ice)] md:text-5xl">
            5,364 m
          </span>
          <span className="eyebrow text-[var(--color-bone)]/80">
            27.99° N · 86.86° E · Sagarmatha
          </span>
        </motion.div>

        <motion.p
          style={{ opacity: dropOpacity }}
          className="mt-12 max-w-xl text-sm leading-relaxed text-[var(--color-bone)]/80 md:text-base"
        >
          Tired legs. Dry lips. Water bottles half frozen. Hands shaking slightly while reaching for
          phone cameras. The Himalayas never reveal beauty immediately. They tease it out slowly —
          and then they keep it.
        </motion.p>
      </div>
    </motion.div>
  );
}
