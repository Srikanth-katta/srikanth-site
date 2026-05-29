"use client";

import { Fragment, useRef } from "react";
import Balancer from "react-wrap-balancer";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Masthead } from "@/components/hero/Masthead";
import { MagneticButton } from "@/components/hero/MagneticButton";
import { HeroGallery } from "@/components/hero/HeroGallery";

const NAME = ["S", "r", "i", "k", "a", "n", "t", "h", " ", "K", "a", "t", "t", "a"];
const BIO_WORDS = site.bio.split(" ");

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-[var(--color-ink)]"
    >
      {/* Soft wash + gradient */}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,26,0.07),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,216,255,0.05),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/4 bg-gradient-to-t from-[var(--color-ink)] to-transparent" />

      <Masthead />

      {/* Body — split layout: text left, morph right */}
      <motion.div
        className="container-edge relative z-10 flex flex-1 items-start pt-2 pb-2"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-6">
          {/* Left: text column */}
          <div className="lg:col-span-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="eyebrow mb-5 flex items-center gap-3"
            >
              <span className="block h-px w-12 bg-[var(--color-spark)]" />
              <span>Mumbai · 2026 · A small site</span>
            </motion.div>

            {/* Name — letter-by-letter entrance */}
            <h1
              aria-label={site.name}
              className="display flex flex-wrap items-baseline gap-0 text-[clamp(2.8rem,8.5vw,7.6rem)] leading-[0.92] text-[var(--color-bone)]"
            >
              {NAME.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.95,
                    delay: 0.35 + i * 0.045,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.0 }}
              className="mt-5 font-display text-xl italic text-[var(--color-bone)]/80 md:text-2xl"
            >
              {site.tagline}
            </motion.p>

            {/* Bio — word reveal with proper inter-word spacing */}
            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.75] text-[var(--color-bone)]/85 md:text-base md:leading-[1.8]">
              <Balancer>
                {BIO_WORDS.map((w, i) => (
                  <Fragment key={i}>
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.022, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {w}
                    </motion.span>
                    {i < BIO_WORDS.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </Balancer>
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 2.1 }}
              className="mt-7"
            >
              <MagneticButton
                href="#projects"
                className="group relative inline-flex items-center gap-4 rounded-full border border-[var(--color-bone)]/20 bg-[var(--color-ink)]/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bone)] backdrop-blur transition-colors hover:border-[var(--color-spark)] hover:text-[var(--color-spark)]"
              >
                <span className="block h-2 w-2 rounded-full bg-[var(--color-spark)] transition-transform duration-500 group-hover:scale-150" />
                Look around
                <span className="block h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: the morphing portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-[420px] lg:col-span-6 lg:max-w-none lg:-ml-24"
          >
            <HeroGallery />
          </motion.div>
        </div>
      </motion.div>

      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.4 }}
        className="container-edge relative z-10 flex shrink-0 items-end justify-between gap-4 pb-6"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
          IIT KGP &apos;17 · RBI · Mumbai
        </span>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-px overflow-hidden bg-[var(--color-bone)]/20">
            <motion.div
              className="absolute left-0 top-0 h-1/2 w-px bg-[var(--color-spark)]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
