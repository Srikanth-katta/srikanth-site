import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects — Srikanth Katta",
  description: "Expeditions, runs, and small pieces of research.",
};

export default function ProjectsIndex() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] pb-32 pt-40 md:pt-48">
      <div className="container-edge">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-[var(--color-ice)]" />
            Projects · Expeditions
          </div>
          <h1 className="display text-[clamp(2.6rem,7vw,6rem)] text-[var(--color-bone)]">
            Things that took more than a weekend.
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-cursor="view"
              data-cursor-label="Open"
              className="group block"
            >
              <div className="relative mb-6 aspect-[4/3] overflow-hidden">
                <Image
                  src={p.cover}
                  alt={p.title}
                  fill
                  quality={82}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
              </div>
              <div className="eyebrow mb-3 flex items-center gap-3">
                <span>{p.year}</span>
                <span className="text-[var(--color-fog)]">·</span>
                <span>{p.kind}</span>
              </div>
              <h2 className="display mb-3 text-3xl text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-ice)] md:text-4xl">
                {p.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-fog)] md:text-base">{p.blurb}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/"
            data-cursor="link"
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
          >
            <span className="block h-px w-8 bg-current" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
