"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { navSections } from "@/content/site";

export function SideRail() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { damping: 30, stiffness: 200 });
  const barHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  const [activeId, setActiveId] = useState<string>(navSections[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    navSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-hidden="true"
    >
      <div className="pointer-events-auto flex items-center gap-4">
        <div className="relative h-[260px] w-px bg-[var(--color-bone)]/15">
          <motion.div
            style={{ height: barHeight }}
            className="absolute left-0 top-0 w-px bg-[var(--color-spark)]"
          />
        </div>
        <ul className="flex flex-col gap-3">
          {navSections.map((s) => {
            const active = s.id === activeId;
            return (
              <li key={s.id}>
                <button
                  onClick={() => handleClick(s.id)}
                  data-cursor="link"
                  className="group flex items-center gap-2 text-right font-mono text-[10px] uppercase tracking-[0.18em] transition-colors"
                  style={{ color: active ? "var(--color-spark)" : "var(--color-fog)" }}
                >
                  <span
                    className="inline-block h-px bg-current transition-all"
                    style={{ width: active ? 18 : 8 }}
                  />
                  <span className="hidden xl:inline">{s.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
