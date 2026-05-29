import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/site";
import { getPost } from "@/content/posts";
import { Expedition } from "@/components/sections/Expedition";
import { CocktailCard } from "@/components/projects/CocktailCard";
import { CocktailsHero } from "@/components/projects/CocktailsHero";
import { PangongHero } from "@/components/projects/PangongHero";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return {
    title: `${project.title} — Srikanth Katta`,
    description: project.blurb,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  if (project.slug === "everest-base-camp-trek") return <EBCTrekPage />;
  if (project.slug === "pangong-frozen-marathon") return <PangongPage project={project} />;
  if (project.slug === "tata-mumbai-marathon") return <TataPage project={project} />;
  if (project.slug === "cocktails") return <CocktailsPage project={project} />;
  if ((project.details?.length ?? 0) > 0) return <PatentPage project={project} />;

  return <DefaultProjectPage project={project} slug={slug} />;
}

/* -------------------- Tata Mumbai Marathon: YouTube map + brief -------------------- */

function TataPage({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="min-h-screen bg-[var(--color-ink)] pb-32 pt-32 md:pt-36">
      <div className="container-edge">
        <div className="mx-auto max-w-6xl">
          {/* Eyebrow */}
          <div className="eyebrow mb-5 flex items-center gap-3 text-[var(--color-spark)]">
            <span className="block h-px w-8 bg-[var(--color-spark)]" />
            {project.metaLine}
          </div>

          {/* Title */}
          <h1 className="display text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.02] text-[var(--color-bone)]">
            {project.editorialTitle}
            <span className="text-[var(--color-spark)]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl font-display text-lg italic text-[var(--color-bone)]/80 md:text-xl">
            My first full marathon.
          </p>

          {/* YouTube embed — the course map flythrough */}
          {project.youtubeId && (
            <div className="mt-14 overflow-hidden border border-[var(--color-bone)]/15 bg-[var(--color-graphite)]">
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?rel=0&modestbranding=1`}
                  title="Tata Mumbai Marathon course"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[var(--color-bone)]/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                <span>Course flythrough · 42.195 km</span>
                <span className="text-[var(--color-spark)]">▶ Press play</span>
              </div>
            </div>
          )}

          {/* Brief write-up + stats */}
          <section className="mt-16 grid grid-cols-1 gap-10 border-t border-[var(--color-bone)]/15 pt-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <div className="eyebrow mb-3">The note</div>
              <p className="font-display text-base leading-relaxed text-[var(--color-bone)]/85 md:text-lg">
                Start at CST. Through Marine Drive in the dark. Out to Bandra and back over the
                sea link as the sun came up. One full lap of the city before most of it was
                awake.
              </p>
            </div>

            <div className="md:col-span-8">
              <p className="font-display text-xl leading-[1.55] text-[var(--color-bone)] md:text-2xl">
                {project.blurb}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-y-5 border-t border-[var(--color-bone)]/10 pt-8 md:grid-cols-4">
                <Stat label="Distance" value="42.195 km" highlight />
                <Stat label="When" value="January 2026" />
                <Stat label="Where" value="Mumbai · India" />
                <Stat label="Result" value="Finished" highlight />
              </div>
            </div>
          </section>

          <BackLinks />
        </div>
      </div>
    </article>
  );
}

/* -------------------- Pangong: 3D running scene at the top -------------------- */

function PangongPage({ project }: { project: (typeof projects)[number] }) {
  const post = getPost("pangong-frozen-marathon");

  return (
    <article className="min-h-screen bg-[var(--color-ink)]">
      {/* Cinematic run footage — full viewport (used as backdrop) */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <PangongHero />

        {/* Top kicker */}
        <div className="container-edge absolute inset-x-0 top-28 z-10 md:top-32">
          <div className="eyebrow flex items-center gap-3 text-[var(--color-spark)]">
            <span className="block h-px w-8 bg-[var(--color-spark)]" />
            {project.metaLine}
          </div>
        </div>

        {/* Title + tagline + stats — anchored lower-left, clear of the runner */}
        <div className="container-edge absolute inset-x-0 bottom-20 z-10 md:bottom-24">
          <div className="max-w-[12ch] md:max-w-[60%] lg:max-w-[58%]">
            <div className="eyebrow mb-5 hidden text-[var(--color-bone)]/55 sm:block">
              The Last Run · highest frozen-lake marathon
            </div>
            <h1 className="display text-[clamp(2.2rem,6.8vw,6.6rem)] leading-[0.94] text-[var(--color-bone)]">
              {project.editorialTitle}
              <span className="text-[var(--color-spark)]">.</span>
            </h1>
            <p className="mt-6 hidden max-w-[34ch] font-display text-base italic leading-relaxed text-[var(--color-bone)]/70 md:block md:text-lg">
              42 kilometres across ice that may not stay frozen for many more winters.
            </p>
          </div>

          <div className="mt-9 grid max-w-[640px] grid-cols-2 gap-x-8 gap-y-5 border-t border-[var(--color-bone)]/15 pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)] sm:max-w-none sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-10 sm:gap-y-3 md:max-w-[62%]">
            <Stat label="Distance" value="42 km" highlight />
            <Stat label="Altitude" value="4,350 m" />
            <Stat label="Lowest temp" value="−22 °C" highlight />
            <Stat label="Wind" value="40 km/h gust" />
            <Stat label="Where" value="Pangong Tso · Ladakh" />
            <Stat label="Status" value="Finished" highlight />
          </div>
        </div>

        {/* Scroll prompt — left-aligned so it never sits over the runner */}
        <div className="container-edge absolute inset-x-0 bottom-8 z-10 flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
            Scroll for the story ↓
          </span>
        </div>
      </section>

      {/* Below the scene — blurb + essay link */}
      <section className="container-edge py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow mb-3">About the race</div>
            <p className="font-display text-base leading-relaxed text-[var(--color-bone)]/80 md:text-lg">
              Known as <em>The Last Run</em>. Recognised by Guinness as the world&apos;s
              highest frozen-lake marathon. Each footstep on its icy surface feels
              temporary — almost borrowed.
            </p>
          </div>

          <div className="md:col-span-8">
            <p className="font-display text-xl leading-[1.55] text-[var(--color-bone)] md:text-2xl">
              {project.blurb}
            </p>

            {post && (
              <div className="mt-12 border-t border-[var(--color-bone)]/15 pt-8">
                <div className="eyebrow mb-3 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[var(--color-spark)]" />
                  The long read
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  data-cursor="view"
                  data-cursor-label="Read"
                  className="group block"
                >
                  <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-spark)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--color-fog)] md:text-lg">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]">
                    Read the full essay · {post.readingTime}
                    <span className="block h-px w-8 bg-[var(--color-bone)] transition-all group-hover:w-12 group-hover:bg-[var(--color-spark)]" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <BackLinks />
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[var(--color-fog)]">{label}</span>
      <span
        className={
          "font-display text-base normal-case tracking-normal " +
          (highlight ? "text-[var(--color-spark)]" : "text-[var(--color-bone)]")
        }
      >
        {value}
      </span>
    </div>
  );
}

/* -------------------- Default project layout -------------------- */

function DefaultProjectPage({
  project,
  slug,
}: {
  project: (typeof projects)[number];
  slug: string;
}) {
  const linkedPost = getPost(slug) ?? getPost(slug.replace(/-trek$/, ""));
  return (
    <article className="min-h-screen bg-[var(--color-ink)] pb-32">
      <header className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/40 via-transparent to-[var(--color-ink)]" />
        <div className="container-edge absolute inset-x-0 bottom-0 pb-16 md:pb-24">
          <div className="eyebrow mb-4 flex items-center gap-3">
            <span>{project.year}</span>
            <span className="text-[var(--color-fog)]">·</span>
            <span>{project.kind}</span>
          </div>
          <h1 className="display max-w-5xl text-[clamp(2.2rem,5.5vw,5rem)] text-[var(--color-bone)]">
            {project.title}
          </h1>
        </div>
      </header>

      <div className="container-edge mt-16 md:mt-24">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xl leading-[1.6] text-[var(--color-bone)]/90 md:text-2xl">
            {project.blurb}
          </p>

          {linkedPost && (
            <div className="mt-16 border-t border-[var(--color-bone)]/15 pt-10">
              <div className="eyebrow mb-3">Read the essay</div>
              <Link
                href={`/blog/${linkedPost.slug}`}
                data-cursor="view"
                data-cursor-label="Read"
                className="group block"
              >
                <h2 className="display text-3xl text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-spark)] md:text-4xl">
                  {linkedPost.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--color-fog)] md:text-base">
                  {linkedPost.excerpt}
                </p>
              </Link>
            </div>
          )}

          <BackLinks />
        </div>
      </div>
    </article>
  );
}

/* -------------------- EBC Trek: Expedition route + essay link -------------------- */

function EBCTrekPage() {
  const post = getPost("everest-base-camp");
  const ebc = projects.find((p) => p.slug === "everest-base-camp-trek");
  return (
    <article className="min-h-screen bg-[var(--color-ink)]">
      {/* Small kicker bar so the route doesn't start cold */}
      <div className="container-edge pt-32 pb-10 md:pt-36">
        <div className="eyebrow mb-3 flex items-center gap-3 text-[var(--color-spark)]">
          <span className="block h-px w-8 bg-[var(--color-spark)]" />
          {ebc?.metaLine ?? "Khumbu · Nepal · Trek · 2025"}
        </div>
        <h1 className="display text-[clamp(2.4rem,6vw,5.4rem)] leading-[1.02] text-[var(--color-bone)]">
          {ebc?.editorialTitle ?? "The Long Walk to Base Camp"}
          <span className="text-[var(--color-spark)]">.</span>
        </h1>
        <p className="mt-4 max-w-xl font-display text-base italic text-[var(--color-bone)]/80 md:text-lg">
          Eleven days walking from Lukla to 5,364 m, with Chaitanya, in April–May 2025.
        </p>
      </div>

      {/* The route — the centerpiece */}
      <Expedition />

      {/* Below the route: link to the essay */}
      {post && (
        <div className="container-edge py-24 md:py-32">
          <div className="mx-auto max-w-3xl border-t border-[var(--color-bone)]/15 pt-12">
            <div className="eyebrow mb-3 flex items-center gap-3">
              <span className="block h-px w-8 bg-[var(--color-spark)]" />
              The long read
            </div>
            <Link
              href={`/blog/${post.slug}`}
              data-cursor="view"
              data-cursor-label="Read"
              className="group block"
            >
              <h2 className="display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-[var(--color-bone)] transition-colors group-hover:text-[var(--color-spark)]">
                {post.title}
              </h2>
              <p className="mt-4 font-display text-lg leading-relaxed text-[var(--color-bone)]/85 md:text-xl">
                {post.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)]">
                Read the full essay · {post.readingTime}
                <span className="block h-px w-8 bg-[var(--color-bone)] transition-all group-hover:w-12 group-hover:bg-[var(--color-spark)]" />
              </span>
            </Link>
          </div>
          <div className="mx-auto max-w-3xl">
            <BackLinks />
          </div>
        </div>
      )}
    </article>
  );
}

/* -------------------- Cocktails: B52 video hero + tilt grid + marquee -------------------- */

function CocktailsPage({ project }: { project: (typeof projects)[number] }) {
  const gallery = project.gallery ?? [];
  return (
    <article className="min-h-screen bg-[var(--color-ink)]">
      <CocktailsHero
        metaLine={project.metaLine}
        editorialTitle={project.editorialTitle}
        galleryCount={gallery.length}
      />

      {/* Marquee — scrolling list of cocktail names */}
      <CocktailMarquee items={gallery} />

      {/* Intro paragraph */}
      <section className="container-edge py-20 md:py-28">
        <div className="mx-auto max-w-5xl grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="eyebrow mb-3 flex items-center gap-3">
              <span className="block h-px w-8 bg-[var(--color-ice)]" />
              The premise
            </div>
            <p className="text-sm leading-relaxed text-[var(--color-fog)] md:text-base">
              A bartender&apos;s hobby in an engineer&apos;s apartment. The list grows when the bottles do.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-xl leading-[1.55] text-[var(--color-bone)] md:text-2xl">
              {project.blurb}
            </p>
          </div>
        </div>
      </section>

      {/* The list — 3D tilt cards */}
      <section className="container-edge pb-24 md:pb-32">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-2 flex items-center gap-3">
              <span className="block h-px w-8 bg-[var(--color-spark)]" />
              The list
            </div>
            <h2 className="display text-3xl text-[var(--color-bone)] md:text-5xl">
              Made on the kitchen counter.
            </h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)] md:inline">
            Hover · tilt
          </span>
        </div>

        <div
          className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-4"
          style={{ perspective: 1400 }}
        >
          {gallery.map((g, i) => (
            <CocktailCard key={g.image} item={g} index={i} />
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <BackLinks />
        </div>
      </section>

      {/* Bottom marquee, second pass */}
      <CocktailMarquee items={gallery} reverse />
    </article>
  );
}

function CocktailMarquee({
  items,
  reverse,
}: {
  items: { name: string }[];
  reverse?: boolean;
}) {
  // Duplicate the list for a seamless loop
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[var(--color-bone)]/10 bg-[var(--color-graphite)] py-5">
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 38s linear infinite`,
        }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-2xl text-[var(--color-bone)]/80 md:text-3xl"
          >
            {item.name}
            <span className="ml-12 text-[var(--color-spark)]">◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* -------------------- Patent: small cert left, technical text right -------------------- */

function PatentPage({ project }: { project: (typeof projects)[number] }) {
  const patentNo = project.details?.find((d) => d.label === "Patent No.")?.value ?? "";
  const granted = project.details?.find((d) => d.label === "Granted")?.value ?? "";
  const filed = project.details?.find((d) => d.label === "Filed")?.value ?? "";

  return (
    <article className="min-h-screen bg-[var(--color-ink)] pb-32 pt-36 md:pt-44">
      <div className="container-edge">
        <div className="mx-auto max-w-6xl">
          {/* Eyebrow */}
          <div className="eyebrow mb-5 flex items-center gap-3 text-[var(--color-spark)]">
            <span className="block h-px w-8 bg-[var(--color-spark)]" />
            Patent · Government of India · {project.year}
          </div>

          {/* Title row */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <h1 className="display text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] text-[var(--color-bone)]">
                A System for Micro Electro Discharge Drilling
                <span className="block text-[var(--color-fog)]">
                  including Tool Wear Compensation, and a Method Thereof.
                </span>
              </h1>
            </div>
            <aside className="md:col-span-4">
              <div className="border-l-2 border-[var(--color-spark)] pl-5">
                <div className="eyebrow mb-1">Indian Patent</div>
                <div className="font-mono text-[clamp(2.4rem,3.2vw,3.2rem)] tracking-tight text-[var(--color-spark)]">
                  {patentNo}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4 border-t border-[var(--color-bone)]/10 pt-5">
                <div>
                  <div className="eyebrow mb-1">Filed</div>
                  <div className="font-mono text-sm text-[var(--color-bone)]">{filed}</div>
                </div>
                <div>
                  <div className="eyebrow mb-1">Granted</div>
                  <div className="font-mono text-sm text-[var(--color-bone)]">{granted}</div>
                </div>
              </div>
            </aside>
          </div>

          {/* Cert (small, left) + What it describes (right) */}
          <section className="mt-20 grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
            <figure className="md:col-span-5">
              <div className="relative w-full overflow-hidden border border-[var(--color-bone)]/15 bg-[var(--color-graphite)]">
                <Image
                  src="/images/patent/certificate.jpg"
                  alt="Indian Patent Certificate No. 497751"
                  width={1200}
                  height={1600}
                  quality={92}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="block h-auto w-full object-contain"
                  style={{ height: "auto" }}
                />
              </div>
              <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
                Certificate of grant · IP India · 11 January 2024
              </figcaption>
            </figure>

            <div className="md:col-span-7">
              <div className="eyebrow mb-5 flex items-center gap-3">
                <span className="block h-px w-8 bg-[var(--color-ice)]" />
                What it describes
              </div>
              <div className="space-y-5">
                {project.longText?.map((p, i) => (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-[var(--color-bone)]/85 md:text-lg"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* Inventors */}
          {project.inventors && project.inventors.length > 0 && (
            <section className="mt-20 grid grid-cols-1 gap-12 border-t border-[var(--color-bone)]/15 pt-12 md:grid-cols-12">
              <div className="md:col-span-3">
                <div className="eyebrow sticky top-32">Inventors</div>
              </div>
              <ul className="md:col-span-9">
                {project.inventors.map((inv, i) => (
                  <li
                    key={inv.name}
                    className="flex flex-col gap-1 border-b border-[var(--color-bone)]/10 py-5 last:border-0 md:flex-row md:items-baseline md:gap-6"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)] md:w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl text-[var(--color-bone)] md:w-72 md:text-2xl">
                      {inv.name}
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--color-fog)]">
                      {inv.role}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Full record (collapsed) */}
          {project.details && (
            <details className="mt-16 border-t border-[var(--color-bone)]/15 pt-8">
              <summary
                data-cursor="link"
                className="eyebrow flex cursor-pointer items-center gap-3 text-[var(--color-bone)]/80 transition-colors hover:text-[var(--color-spark)]"
              >
                <span>Full patent record</span>
                <span className="block h-px flex-1 bg-[var(--color-bone)]/10" />
                <span>open</span>
              </summary>
              <dl className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
                {project.details.map((d) => (
                  <div key={d.label} className="border-b border-[var(--color-bone)]/8 pb-3">
                    <dt className="eyebrow mb-1">{d.label}</dt>
                    <dd className="font-mono text-sm text-[var(--color-bone)]">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </details>
          )}

          <BackLinks />
        </div>
      </div>
    </article>
  );
}

/* -------------------- Back links -------------------- */

function BackLinks() {
  return (
    <div className="mt-20 flex items-center justify-between border-t border-[var(--color-bone)]/15 pt-8">
      <Link
        href="/projects"
        data-cursor="link"
        className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
      >
        <span className="block h-px w-8 bg-current" />
        All projects
      </Link>
      <Link
        href="/"
        data-cursor="link"
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-ice)]"
      >
        Home →
      </Link>
    </div>
  );
}
