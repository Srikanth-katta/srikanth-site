"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "@/content/site";

export function ProjectsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative bg-[var(--color-ink)] py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-[var(--color-spark)]/30 to-transparent lg:block" />

      <div className="container-edge">
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="mb-14 flex items-end justify-between gap-6"
        >
          <div>
            <div className="eyebrow mb-3 flex items-center gap-3 text-[var(--color-spark)]">
              <span className="block h-px w-8 bg-[var(--color-spark)]" />
              Experiments
            </div>
            <h2 className="display max-w-3xl text-3xl text-[var(--color-bone)] md:text-5xl">
              Things that took more than a weekend.
            </h2>
          </div>
          <Link
            href="/projects"
            data-cursor="link"
            className="hidden shrink-0 border-b border-[var(--color-bone)]/30 pb-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)] transition-colors hover:text-[var(--color-spark)] md:inline-block"
          >
            All experiments →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:gap-7">
          <ProjectCard project={projects[0]} index={0} className="md:col-span-4" featured />
          <ProjectCard project={projects[1]} index={1} className="md:col-span-2" />
          <ProjectCard project={projects[2]} index={2} className="md:col-span-2" />
          <ProjectCard project={projects[3]} index={3} className="md:col-span-2" />
          <ProjectCard project={projects[4]} index={4} className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  className = "",
  featured = false,
}: {
  project: Project;
  index: number;
  className?: string;
  featured?: boolean;
}) {
  const aspect = featured ? "aspect-[16/10]" : "aspect-[4/5]";
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="view"
        data-cursor-label="Open"
        className="group block"
      >
        <div className={`relative ${aspect} w-full overflow-hidden bg-[var(--color-graphite)]`}>
          {/* Cover image */}
          <Image
            src={project.cover}
            alt={project.editorialTitle}
            fill
            quality={88}
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
          />
          {/* Video — always plays when present; the cover image acts as the poster */}
          {project.coverVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={project.cover}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={project.coverVideo} type="video/mp4" />
            </video>
          )}
          {/* YouTube play indicator on hover */}
          {project.youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-bone)]/40 bg-[var(--color-ink)]/50 font-mono text-2xl text-[var(--color-bone)] backdrop-blur">
                ▶
              </span>
            </div>
          )}

          {/* Top corners */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-5 pt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]">
            <span className="text-[var(--color-bone)]/70">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--color-bone)] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              {project.metaLine}
            </span>
          </div>

          {/* Bottom gradient + editorial title + hover description */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/85 to-transparent px-5 pb-6 pt-12 md:pt-20">
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.6rem)] leading-[1.05] text-[var(--color-bone)] transition-colors duration-300 group-hover:text-[var(--color-spark)]">
              {project.editorialTitle}
            </h3>
            {/* Description fades in on hover */}
            <p className="mt-2 hidden max-w-md translate-y-1 text-sm leading-relaxed text-[var(--color-bone)]/75 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
              {project.blurb}
            </p>
          </div>
        </div>

        {/* Below-card caption row */}
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
            {project.kind.split(" · ")[0]}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]/90 transition-colors group-hover:text-[var(--color-spark)]">
            Open →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
