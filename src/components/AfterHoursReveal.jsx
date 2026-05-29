"use client";

import { useEffect, useId, useRef } from "react";
import "./swimmerReveal.css";

/* ──────────────────────────────────────────────────────────────────────────────
   AfterHoursReveal — one reveal mechanic shared across all After Hours panels.

   - Background is now a curated `<img>` per kind (climbing / piano / skating /
     spanish / swimming) so each panel has a bespoke cinematic backdrop.
   - The veil over it is a static-color SVG rect with a black-mask that cuts
     reveal-holes. The reveal silhouette is built from:
        * cursor cluster (3 main circles + 5 smaller smoke puffs at fixed offsets)
        * trail (8 fading samples sampled every 22 px of cursor travel)
        * one rare apparition that spawns somewhere away from the cursor,
          drifts in a freely-random direction, and dissolves.
   - All circles in the mask pass through a static feTurbulence +
     feDisplacementMap so the silhouette never reads as a clean circle —
     it always looks organic / smoke-like.
   ────────────────────────────────────────────────────────────────────────────── */

const IMAGE_PATHS = {
  spanish:  "/images/after-hours/spanish.png",
  piano:    "/images/after-hours/piano.png",
  climbing: "/images/after-hours/climbing.png",
  swimming: "/images/after-hours/swimming.png",
  skating:  "/images/after-hours/skating.png",
};

function BackgroundImage({ kind }) {
  const src = IMAGE_PATHS[kind];
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  );
}

/* Fixed offsets for the 5 smoke puffs, expressed as multiples of cursorRadius.
   Each pair = [dx, dy, radiusMultiplier]. Hoisted out of the component so the
   useEffect dependency array doesn't need to track this constant. */
const PUFFS = [
  [ 0.55,  0.45, 0.25],
  [-0.62, -0.10, 0.30],
  [ 0.20, -0.55, 0.22],
  [-0.18,  0.60, 0.28],
  [ 0.65, -0.30, 0.18],
];

export default function AfterHoursReveal({
  children,
  kind,
  bg = "#031014",
  overlayColor,
  cursorRadius = 85,
  className = "",
}) {
  const rootRef        = useRef(null);
  const cursorInnerRef = useRef(null);
  const cursorMidRef   = useRef(null);
  const cursorOuterRef = useRef(null);
  const cursorDotRef   = useRef(null);
  const puffRefs       = useRef([]);      // 5 smoke-puff circles
  const trailRefs      = useRef([]);
  const ambientRefs    = useRef([]);      // multiple concurrent apparitions
  const generatedId    = useId().replace(/:/g, "");
  const maskId   = `after-reveal-mask-${generatedId}`;
  const filterId = `after-reveal-displace-${generatedId}`;

  const effectiveOverlay = overlayColor ?? bg;

  useEffect(() => {
    const root  = rootRef.current;
    const cInner = cursorInnerRef.current;
    const cMid   = cursorMidRef.current;
    const cOuter = cursorOuterRef.current;
    const cDot   = cursorDotRef.current;
    const puffs  = puffRefs.current.filter(Boolean);
    const trails  = trailRefs.current.filter(Boolean);
    const ambients = ambientRefs.current.filter(Boolean);

    if (!root || !cInner || !cMid || !cOuter || !cDot) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rect = () => root.getBoundingClientRect();
    const initialRect = rect();

    const target  = { x: initialRect.width * 0.62, y: initialRect.height * 0.52, r: cursorRadius * 0.58 };
    const current = { x: target.x, y: target.y, r: target.r };

    let width  = initialRect.width;
    let height = initialRect.height;
    let rafId  = 0;

    /* ── Trail (lag) ── */
    const TRAIL_LEN = trails.length;
    const TRAIL_SAMPLE_DIST = 22;
    const TRAIL_LIFETIME = 2200;
    const trailBuf = Array.from({ length: TRAIL_LEN }, () => ({ x: 0, y: 0, born: -99999, r: 0 }));
    let trailHead = -1;
    let lastSampleX = target.x;
    let lastSampleY = target.y;

    /* ── Apparition states ── one per ambient slot.
       Multiple concurrent, larger, faster than before. */
    const ambientStates = ambients.map((_, i) => ({
      active: false,
      startedAt: 0,
      x: 0, y: 0,
      driftX: 0, driftY: 0,
      duration: 0,
      baseR: 0,
      /* Stagger first spawns so they don't all fire at once */
      nextAt: performance.now() + 1500 + i * 1200 + Math.random() * 2500,
    }));
    const scheduleNextAmbient = (state, now) => {
      /* 4–9s gap → more frequent than the old 18–32s */
      state.nextAt = now + 4000 + Math.random() * 5000;
    };

    const resize = () => {
      const r = rect();
      width  = r.width;
      height = r.height;
    };

    const move = (event) => {
      const r = rect();
      const x = event.clientX - r.left;
      const y = event.clientY - r.top;
      if (x < 0 || x > r.width || y < 0 || y > r.height) return;
      target.x = x;
      target.y = y;
      target.r = cursorRadius;
      root.classList.add("is-pointer-active");
    };

    const leave = () => {
      target.r = cursorRadius * 0.55;
      root.classList.remove("is-pointer-active");
    };

    const render = () => {
      current.x = target.x;
      current.y = target.y;
      current.r += (target.r - current.r) * 0.10;

      const r = current.r;

      /* ── Cursor cluster (3 large circles) ── */
      cInner.setAttribute("cx", current.x.toFixed(2));
      cInner.setAttribute("cy", current.y.toFixed(2));
      cInner.setAttribute("r",  (r * 0.55).toFixed(2));

      cMid.setAttribute("cx", (current.x + r * 0.35).toFixed(2));
      cMid.setAttribute("cy", (current.y - r * 0.22).toFixed(2));
      cMid.setAttribute("r",  (r * 0.70).toFixed(2));

      cOuter.setAttribute("cx", (current.x - r * 0.38).toFixed(2));
      cOuter.setAttribute("cy", (current.y + r * 0.28).toFixed(2));
      cOuter.setAttribute("r",  (r * 0.92).toFixed(2));

      /* ── Smoke puffs (5 small wispy circles at fixed offsets) ── */
      for (let i = 0; i < puffs.length; i++) {
        const [dx, dy, rm] = PUFFS[i];
        puffs[i].setAttribute("cx", (current.x + r * dx).toFixed(2));
        puffs[i].setAttribute("cy", (current.y + r * dy).toFixed(2));
        puffs[i].setAttribute("r",  (r * rm).toFixed(2));
      }

      /* ── Cursor dot ── */
      cDot.setAttribute("cx", current.x.toFixed(2));
      cDot.setAttribute("cy", current.y.toFixed(2));

      const nowMs = performance.now();

      /* ── Trail ── */
      const sdx = current.x - lastSampleX;
      const sdy = current.y - lastSampleY;
      if (TRAIL_LEN > 0 && Math.hypot(sdx, sdy) > TRAIL_SAMPLE_DIST) {
        trailHead = (trailHead + 1) % TRAIL_LEN;
        trailBuf[trailHead] = {
          x: current.x,
          y: current.y,
          born: nowMs,
          r: current.r * 0.65,
        };
        lastSampleX = current.x;
        lastSampleY = current.y;
      }
      for (let i = 0; i < TRAIL_LEN; i++) {
        const ref = trails[i];
        const buf = trailBuf[i];
        const age = nowMs - buf.born;
        if (age < 0 || age > TRAIL_LIFETIME) {
          ref.setAttribute("opacity", "0");
          continue;
        }
        const k = 1 - age / TRAIL_LIFETIME;
        ref.setAttribute("cx", buf.x.toFixed(2));
        ref.setAttribute("cy", buf.y.toFixed(2));
        ref.setAttribute("r",  (buf.r * (0.45 + k * 0.55)).toFixed(2));
        ref.setAttribute("opacity", (k * 0.7).toFixed(3));
      }

      /* ── Apparitions (free-angle, constrained to inner 80% rect) ── */
      for (let ai = 0; ai < ambients.length; ai++) {
        const ambient = ambients[ai];
        const ambientState = ambientStates[ai];
        if (!ambient) continue;

        if (!ambientState.active && nowMs > ambientState.nextAt && !prefersReducedMotion) {
          ambientState.active = true;
          ambientState.startedAt = nowMs;

          const margin = 0.10;
          const minX = width  * margin;
          const maxX = width  * (1 - margin);
          const minY = height * margin;
          const maxY = height * (1 - margin);

          /* Free random angle, longer distance */
          const angle = Math.random() * Math.PI * 2;
          let requestedDist = 560 + Math.random() * 420; // 560–980px

          let driftX, driftY;
          let spawnRangeMinX, spawnRangeMaxX, spawnRangeMinY, spawnRangeMaxY;
          for (let attempt = 0; attempt < 5; attempt++) {
            driftX = Math.cos(angle) * requestedDist;
            driftY = Math.sin(angle) * requestedDist;
            spawnRangeMinX = minX - Math.min(0, driftX);
            spawnRangeMaxX = maxX - Math.max(0, driftX);
            spawnRangeMinY = minY - Math.min(0, driftY);
            spawnRangeMaxY = maxY - Math.max(0, driftY);
            if (spawnRangeMaxX > spawnRangeMinX && spawnRangeMaxY > spawnRangeMinY) break;
            requestedDist *= 0.7;
          }
          if (spawnRangeMaxX <= spawnRangeMinX) { spawnRangeMaxX = spawnRangeMinX = (minX + maxX) / 2; driftX = 0; }
          if (spawnRangeMaxY <= spawnRangeMinY) { spawnRangeMaxY = spawnRangeMinY = (minY + maxY) / 2; driftY = 0; }

          let tries = 0;
          do {
            ambientState.x = spawnRangeMinX + Math.random() * (spawnRangeMaxX - spawnRangeMinX);
            ambientState.y = spawnRangeMinY + Math.random() * (spawnRangeMaxY - spawnRangeMinY);
            tries++;
          } while (
            Math.hypot(ambientState.x - current.x, ambientState.y - current.y) < 220 &&
            tries < 6
          );

          ambientState.driftX = driftX;
          ambientState.driftY = driftY;
          ambientState.duration = 1500 + Math.random() * 1000; // 1.5–2.5s (was 2.5–4s)
          ambientState.baseR   = 110 + Math.random() * 80;     // 110–190px (was 58–100)
        }

        if (ambientState.active) {
          const age = nowMs - ambientState.startedAt;
          const t   = Math.min(1, age / ambientState.duration);
          const motionT = 1 - Math.pow(1 - t, 4);
          let op;
          if (t < 0.50)      op = (t / 0.50) * 0.62;
          else if (t < 0.70) op = 0.62;
          else               op = (1 - (t - 0.70) / 0.30) * 0.62;
          const cx = ambientState.x + ambientState.driftX * motionT;
          const cy = ambientState.y + ambientState.driftY * motionT;
          ambient.setAttribute("cx", cx.toFixed(2));
          ambient.setAttribute("cy", cy.toFixed(2));
          ambient.setAttribute("r",  ambientState.baseR.toFixed(2));
          ambient.setAttribute("opacity", op.toFixed(3));
          if (t >= 1) {
            ambientState.active = false;
            ambient.setAttribute("opacity", "0");
            scheduleNextAmbient(ambientState, nowMs);
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
    };
  }, [cursorRadius]);

  return (
    <section ref={rootRef} className={`swimmerReveal ${className}`}>
      <div className="swimmerReveal__scene" aria-hidden="true">
        <BackgroundImage kind={kind} />
      </div>

      <div className="swimmerReveal__grain" aria-hidden="true" />

      <svg className="swimmerReveal__veil" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.026"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="78" />
          </filter>

          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <g filter={`url(#${filterId})`}>
              {/* Apparitions — multiple concurrent, larger, faster */}
              {Array.from({ length: 3 }, (_, i) => (
                <circle
                  key={`ambient-${i}`}
                  ref={(el) => (ambientRefs.current[i] = el)}
                  fill="black"
                  opacity="0"
                />
              ))}

              {/* Trail */}
              {Array.from({ length: 8 }, (_, i) => (
                <circle
                  key={`trail-${i}`}
                  ref={(el) => (trailRefs.current[i] = el)}
                  fill="black"
                  opacity="0"
                />
              ))}

              {/* Smoke puffs — small wispy circles around the cursor cluster */}
              {Array.from({ length: 5 }, (_, i) => (
                <circle
                  key={`puff-${i}`}
                  ref={(el) => (puffRefs.current[i] = el)}
                  fill="black"
                  opacity="0.65"
                />
              ))}

              {/* Cursor cluster — three asymmetric core circles */}
              <circle ref={cursorOuterRef} fill="black" opacity="0.50" />
              <circle ref={cursorMidRef}   fill="black" opacity="0.85" />
              <circle ref={cursorInnerRef} fill="black" opacity="1" />
            </g>
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={effectiveOverlay} mask={`url(#${maskId})`} />

        <circle
          ref={cursorDotRef}
          r="3.5"
          fill="#eaffff"
          style={{ filter: "drop-shadow(0 0 10px rgba(180, 230, 255, 0.95))" }}
        />
      </svg>

      <div className="swimmerReveal__content">{children}</div>
    </section>
  );
}
