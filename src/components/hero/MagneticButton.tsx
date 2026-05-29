"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  radius?: number;
  strength?: number;
  className?: string;
};

export function MagneticButton({
  children,
  href,
  onClick,
  radius = 140,
  strength = 0.35,
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const ys = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d < radius) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y, radius, strength]);

  const Comp: typeof motion.a | typeof motion.button = href ? motion.a : motion.button;
  return (
    <Comp
      ref={ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>}
      href={href}
      onClick={onClick}
      data-cursor="link"
      style={{ x: xs, y: ys }}
      className={className}
    >
      {children}
    </Comp>
  );
}
