import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Logbook — Srikanth Katta",
  description: "Long-form notes from mountains, frozen lakes, and the spaces between.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] pb-32 pt-40 md:pt-48">
      <div className="container-edge">
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-[var(--color-ice)]" />
            The Logbook
          </div>
          <h1 className="display text-[clamp(2.6rem,7vw,6rem)] text-[var(--color-bone)]">
            Field notes.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fog)] md:text-lg">
            Long-form essays written in the weeks after the trip. The body forgets the cold first;
            the writing helps it remember.
          </p>
        </div>

        <ul className="divide-y divide-[var(--color-bone)]/10 border-y border-[var(--color-bone)]/10">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                data-cursor="view"
                data-cursor-label="Read"
                className="group grid grid-cols-12 items-center gap-6 py-8 md:py-10"
              >
                <div className="col-span-12 md:col-span-3">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="eyebrow mb-3 flex flex-wrap items-center gap-3">
                    <span>{p.date}</span>
                    <span className="text-[var(--color-fog)]">·</span>
                    <span>{p.readingTime}</span>
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[var(--color-fog)]/80"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <h2 className="display mb-2 text-3xl text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-ice)] md:text-5xl">
                    {p.title}
                  </h2>
                  {p.subtitle && (
                    <p className="mb-3 text-base text-[var(--color-bone)]/70 md:text-lg">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-fog)]">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

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
