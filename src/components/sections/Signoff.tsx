"use client";

import { motion } from "framer-motion";
import { site, colophon } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Signoff() {
  return (
    <section
      id="signoff"
      className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden bg-[var(--color-ink)] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,rgba(127,216,255,0.06),transparent_60%)]" />

      <div className="container-edge relative z-10">
        <div className="eyebrow mb-6 flex items-center gap-3 text-[var(--color-spark)]">
          <span className="block h-px w-8 bg-[var(--color-spark)]" />
          Contact
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="display max-w-5xl text-[clamp(2.6rem,7vw,6.8rem)] text-[var(--color-bone)]"
        >
          Say hello<span className="text-[var(--color-spark)]">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fog)] md:text-lg"
        >
          Drop a note below — about the mountains, the runs, an idea, or nothing in particular.
          It comes straight to my inbox.
        </motion.p>

        <ContactForm />
      </div>

      <div className="container-edge relative z-10 mt-20 flex flex-col gap-8">
        {/* Four-column footer details */}
        <div className="grid grid-cols-2 gap-6 border-t border-[var(--color-bone)]/10 pt-8 md:grid-cols-4">
          <FooterCol label="Based in" value={site.location} />
          <FooterCol label="Currently" value="Reserve Bank of India · Mumbai" />
          <FooterCol label="Coordinates" value="18.93° N · 72.84° E" />
          <FooterCol label="Last logged" value="Pangong · Feb 2026" />
        </div>

        {/* Socials + built with + copyright */}
        <div className="flex flex-col gap-6 border-t border-[var(--color-bone)]/10 pt-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-6">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-spark)]"
              >
                <span className="block h-px w-6 bg-[var(--color-fog)] transition-all group-hover:w-10 group-hover:bg-[var(--color-spark)]" />
                {s.label}
              </a>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
            © {new Date().getFullYear()} · {site.name} · Mumbai
          </span>
        </div>

        {/* Built with — single line */}
        <div className="border-t border-[var(--color-bone)]/10 pt-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
              Built with
            </span>
            <span className="text-sm leading-relaxed text-[var(--color-bone)]/70">
              {colophon.builtWith}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCol({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
        {label}
      </span>
      <span className="font-mono text-sm text-[var(--color-bone)]">{value}</span>
    </div>
  );
}
