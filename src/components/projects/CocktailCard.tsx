"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";

type Item = { name: string; image: string; note?: string };

export function CocktailCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-driven 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-1, 1], [9, -9]);
  const ry = useTransform(mx, [-1, 1], [-12, 12]);
  const rxs = useSpring(rx, { stiffness: 180, damping: 22, mass: 0.6 });
  const rys = useSpring(ry, { stiffness: 180, damping: 22, mass: 0.6 });
  const lift = useTransform([mx, my] as MotionValue<number>[], ([x, y]) => {
    const d = Math.hypot(x as number, y as number);
    return -d * 14;
  });
  const lifts = useSpring(lift, { stiffness: 160, damping: 24, mass: 0.6 });

  // Specular shine that follows the cursor
  const shineX = useTransform(mx, [-1, 1], ["0%", "100%"]);
  const shineY = useTransform(my, [-1, 1], ["0%", "100%"]);
  const shine = useTransform([shineX, shineY] as MotionValue<string>[], ([sx, sy]) =>
    `radial-gradient(420px circle at ${sx} ${sy}, rgba(255,255,255,0.18), rgba(127,216,255,0.05) 35%, transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mx.set(px * 2 - 1);
    my.set(py * 2 - 1);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: rxs, rotateY: rys, z: lifts, transformPerspective: 1200 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative will-change-transform"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-graphite)] [transform-style:preserve-3d]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          quality={86}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
        {/* Cursor-tracking specular shine */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [transform:translateZ(20px)]"
          style={{ background: shine, mixBlendMode: "screen" }}
        />
        {/* Number marker */}
        <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]/70 [transform:translateZ(30px)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Bottom name strip on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/80 to-transparent px-4 pb-4 pt-12 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [transform:translateZ(40px)]">
          <h3 className="font-display text-lg text-[var(--color-bone)] md:text-xl">{item.name}</h3>
        </div>
      </div>
      <figcaption className="mt-3 [transform:translateZ(10px)]">
        <h3 className="font-display text-base text-[var(--color-bone)] md:text-lg">{item.name}</h3>
        {item.note && (
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-fog)]">{item.note}</p>
        )}
      </figcaption>
    </motion.div>
  );
}
