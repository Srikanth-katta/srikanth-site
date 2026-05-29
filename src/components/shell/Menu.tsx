"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { site, navSections } from "@/content/site";

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Experiments", href: "/#projects" },
  { label: "After Hours", href: "/#after-hours" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#signoff" },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed left-6 top-3 z-50 flex items-center gap-4 md:left-12 md:top-3">
        <Link
          href="/"
          data-cursor="link"
          aria-label="Srikanth Katta — home"
          className="group block h-8 w-12 transition-opacity hover:opacity-75"
        >
          <svg
            viewBox="0 0 48 32"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {/*
              S — correct orientation:
              top-half opens RIGHT (left wall), bottom-half opens LEFT (right wall).
              Previous path was backwards (read as "2"). Fixed.
            */}
            <path
              d="M 18 4 L 3 4 L 3 16 L 18 16 L 18 28 L 3 28"
              stroke="#7FD8FF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {/* K — vertical stem + upper/lower arms */}
            <path
              d="M 26 4 L 26 28 M 26 16 L 40 4 M 26 16 L 40 28"
              stroke="#e8eaee"
              strokeWidth="2"
              fill="none"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {/* Thin baseline — ties the mark to the header line beneath */}
            <line
              x1="3" y1="30" x2="40" y2="30"
              stroke="#e8eaee"
              strokeWidth="0.5"
              strokeOpacity="0.25"
            />
            {/* Spark dot */}
            <circle cx="43" cy="28" r="2" fill="#FF6B1A" />
          </svg>
        </Link>
      </div>

      <button
        onClick={() => setOpen(true)}
        data-cursor="link"
        data-cursor-label="Menu"
        className="fixed right-6 top-[6px] z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-bone)]/20 bg-[var(--color-ink)]/40 backdrop-blur md:right-12 md:top-[6px]"
        aria-label="Open menu"
      >
        <div className="flex flex-col gap-[5px]">
          <span className="block h-px w-5 bg-[var(--color-bone)]" />
          <span className="block h-px w-3 bg-[var(--color-bone)]" />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="ml-auto flex h-full w-full max-w-[560px] flex-col bg-[var(--color-graphite)] p-10 md:p-16"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Index</span>
                <button
                  onClick={() => setOpen(false)}
                  data-cursor="link"
                  data-cursor-label="Close"
                  className="flex h-12 w-12 items-center justify-center"
                  aria-label="Close menu"
                >
                  <div className="relative h-4 w-4">
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 rotate-45 bg-[var(--color-bone)]" />
                    <span className="absolute left-0 top-1/2 block h-px w-full -translate-y-1/2 -rotate-45 bg-[var(--color-bone)]" />
                  </div>
                </button>
              </div>

              <nav className="mt-16 flex flex-1 flex-col justify-between">
                <ul className="flex flex-col gap-1">
                  {menuLinks.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        data-cursor="link"
                        className="block py-4 font-display text-5xl leading-none text-[var(--color-bone)] transition-colors hover:text-[var(--color-spark)] md:text-6xl"
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="mt-12 flex flex-col gap-6"
                >
                  <div className="eyebrow">On this page</div>
                  <ul className="flex flex-col gap-1.5">
                    {navSections.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`/#${s.id}`}
                          onClick={() => setOpen(false)}
                          data-cursor="link"
                          className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-bone)]"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[var(--color-bone)]/10 pt-8">
                    {site.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
