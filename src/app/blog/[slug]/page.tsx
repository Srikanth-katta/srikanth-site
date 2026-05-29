import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "@/content/posts";

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Srikanth Katta`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const otherPosts = posts.filter((p) => p.slug !== post.slug);
  const next = otherPosts[0];
  const wordCount = post.body.split(/\s+/).filter(Boolean).length;

  return (
    <article className="min-h-screen bg-[var(--color-ink)] pb-32">
      {/* Hero cover */}
      <header className="relative h-[80vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-transparent to-[var(--color-ink)]" />

        <div className="container-edge absolute inset-x-0 bottom-0 pb-16 md:pb-24">
          <div className="eyebrow mb-4 flex flex-wrap items-center gap-3">
            <span className="text-[var(--color-spark)]">Logbook entry</span>
            <span className="text-[var(--color-fog)]">·</span>
            <span>{post.date}</span>
            <span className="text-[var(--color-fog)]">·</span>
            <span>{post.readingTime}</span>
            <span className="text-[var(--color-fog)]">·</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
          <h1 className="display max-w-4xl text-[clamp(2.4rem,6vw,5.6rem)] leading-[1.02] text-[var(--color-bone)]">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-6 max-w-2xl font-display text-base italic text-[var(--color-bone)]/80 md:text-xl">
              {post.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="container-edge mt-16 md:mt-24">
        <div className="mx-auto max-w-2xl">
          <Prose body={post.body} />

          {/* End mark */}
          <div className="mt-12 flex items-center justify-center gap-3 text-[var(--color-fog)]">
            <span className="block h-px w-10 bg-current" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]">End</span>
            <span className="block h-px w-10 bg-current" />
          </div>

          {/* Up next */}
          {next && (
            <div className="mt-20 border-t border-[var(--color-bone)]/15 pt-10">
              <div className="eyebrow mb-4 flex items-center gap-3">
                <span className="block h-px w-8 bg-[var(--color-spark)]" />
                Up next
              </div>
              <Link
                href={`/blog/${next.slug}`}
                data-cursor="view"
                data-cursor-label="Read"
                className="group block"
              >
                <h3 className="display text-2xl text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-spark)] md:text-3xl">
                  {next.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-fog)] md:text-base">
                  {next.excerpt}
                </p>
              </Link>
            </div>
          )}

          <div className="mt-20 flex items-center justify-between border-t border-[var(--color-bone)]/15 pt-8">
            <Link
              href="/blog"
              data-cursor="link"
              className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
            >
              <span className="block h-px w-8 bg-current" />
              All entries
            </Link>
            <Link
              href="/"
              data-cursor="link"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
            >
              Home →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------- Magazine-style prose -------------------- */

function Prose({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/).map((b) => b.trim()).filter(Boolean);

  // Find the index of the first paragraph (not heading/quote) so we know
  // where to apply the drop cap.
  const firstParaIdx = blocks.findIndex(
    (b) => !b.startsWith("## ") && !b.startsWith("> ")
  );

  return (
    <div className="font-display text-lg leading-[1.7] text-[var(--color-bone)]/90">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <SectionDivider key={i} title={block.slice(3)} />
          );
        }
        if (block.startsWith("> ")) {
          return (
            <PullQuote key={i} text={block.slice(2)} />
          );
        }
        const isFirst = i === firstParaIdx;
        return (
          <p
            key={i}
            className={
              isFirst
                ? "mb-6 first-paragraph"
                : "mb-6"
            }
          >
            {isFirst ? renderWithDropCap(block) : renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}

function renderWithDropCap(text: string) {
  if (!text) return null;
  const first = text[0];
  const rest = text.slice(1);
  return (
    <>
      <span
        aria-hidden="true"
        className="float-left mr-3 mt-2 font-display text-[5.5rem] leading-[0.85] text-[var(--color-spark)]"
        style={{ fontFeatureSettings: '"ss01"' }}
      >
        {first}
      </span>
      {renderInline(rest)}
    </>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="my-16">
      <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
        <span className="block h-px w-10 bg-[var(--color-spark)]" />
        <span>§</span>
        <span className="block h-px flex-1 bg-[var(--color-bone)]/10" />
      </div>
      <h2 className="display text-3xl text-[var(--color-bone)] md:text-4xl">{title}</h2>
    </div>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <aside className="my-12 border-y border-[var(--color-bone)]/15 py-8 text-center">
      <span aria-hidden="true" className="font-display text-5xl leading-none text-[var(--color-spark)]/60">
        “
      </span>
      <p className="-mt-3 font-display text-2xl italic text-[var(--color-bone)] md:text-3xl">
        {renderInline(text)}
      </p>
    </aside>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-[var(--color-ice)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
