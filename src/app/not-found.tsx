import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-ink)] px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(127,216,255,0.06),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="eyebrow mb-6 flex items-center justify-center gap-3 text-[var(--color-spark)]">
          <span className="block h-px w-8 bg-current" />
          Lost the trail
          <span className="block h-px w-8 bg-current" />
        </div>

        <h1 className="display text-[clamp(4rem,15vw,12rem)] leading-none text-[var(--color-bone)]">
          404
        </h1>

        <p className="mt-8 text-base text-[var(--color-bone)]/80 md:text-lg">
          This page is off-map. No prayer flags, no cairns, no Sherpa around to point the way.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
          Altitude: unknown · Coordinates: unverified
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
          <Link
            href="/"
            data-cursor="link"
            className="inline-flex items-center gap-3 border-b border-[var(--color-ice)] pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bone)] transition-colors hover:text-[var(--color-ice)]"
          >
            <span className="block h-px w-6 bg-current" />
            Return to base camp
          </Link>
          <Link
            href="/blog"
            data-cursor="link"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-bone)]"
          >
            Read the logbook →
          </Link>
        </div>
      </div>
    </main>
  );
}
