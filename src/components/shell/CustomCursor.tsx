"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
  const dotX = useSpring(x, { damping: 30, stiffness: 800, mass: 0.2 });
  const dotY = useSpring(y, { damping: 30, stiffness: 800, mass: 0.2 });
  const ringX = useSpring(x, springConfig);
  const ringY = useSpring(y, springConfig);

  const [variant, setVariant] = useState<"default" | "link" | "view" | "drag">("default");
  const [label, setLabel] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const lastMoveRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      lastMoveRef.current = performance.now();
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor]");
      if (!interactive) {
        setVariant("default");
        setLabel("");
        return;
      }
      const v = (interactive as HTMLElement).dataset.cursor;
      const l = (interactive as HTMLElement).dataset.cursorLabel ?? "";
      if (v === "view") setVariant("view");
      else if (v === "drag") setVariant("drag");
      else setVariant("link");
      setLabel(l);
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, visible]);

  const ringScale =
    variant === "view" ? 2.6 : variant === "link" ? 1.6 : variant === "drag" ? 2.2 : 1;
  const dotScale = variant === "view" || variant === "drag" ? 0 : 1;

  return (
    <div
      className="cursor-shell pointer-events-none fixed inset-0 z-[200]"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      <motion.div
        className="absolute -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-[var(--color-ice)]"
        style={{ x: dotX, y: dotY, scale: dotScale }}
      />
      <motion.div
        className="absolute -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-ice)]/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, scale: ringScale }}
      >
        {label && variant !== "default" ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-bone)]">
            {label}
          </span>
        ) : null}
      </motion.div>
    </div>
  );
}
