"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gallery } from "@/content/site";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % gallery.length));
      if (e.key === "ArrowLeft")
        setActive((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length));
    },
    [active]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <section id="gallery" className="relative bg-[var(--color-ink)] py-32 md:py-40">
      <div className="container-edge">
        <div className="mb-16 flex items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3 flex items-center gap-3">
              <span className="block h-px w-8 bg-[var(--color-ice)]" />
              Gallery
            </div>
            <h2 className="display max-w-2xl text-3xl text-[var(--color-bone)] md:text-5xl">
              Notes from a phone, mostly.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--color-fog)]">
              Each frame at its natural shape. Click to open full-size. Use arrow keys to move through.
            </p>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-fog)] md:block">
            {gallery.length.toString().padStart(2, "0")} frames
          </span>
        </div>

        {/* True masonry via CSS columns — each image at its natural aspect ratio, uncropped */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((img, i) => (
            <motion.button
              key={img.src + i}
              onClick={() => setActive(i)}
              data-cursor="view"
              data-cursor-label="View"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative block w-full break-inside-avoid overflow-hidden bg-[var(--color-graphite)] text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={1600}
                height={1200}
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block h-auto w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                style={{ height: "auto" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {img.caption && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-1 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-bone)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.caption}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            index={active}
            total={gallery.length}
            onClose={() => setActive(null)}
            onPrev={() =>
              setActive((i) => (i === null ? 0 : (i - 1 + gallery.length) % gallery.length))
            }
            onNext={() => setActive((i) => (i === null ? 0 : (i + 1) % gallery.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = gallery[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--color-ink)]/95 backdrop-blur"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        data-cursor="link"
        data-cursor-label="Close"
        className="absolute right-6 top-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)] md:right-10 md:top-10"
      >
        Close ×
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        data-cursor="link"
        data-cursor-label="Prev"
        className="absolute left-6 top-1/2 z-10 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)] md:left-10"
      >
        ← Prev
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        data-cursor="link"
        data-cursor-label="Next"
        className="absolute right-6 top-1/2 z-10 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-bone)] md:right-10"
      >
        Next →
      </button>
      <motion.div
        key={img.src}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex max-h-[82vh] max-w-[88vw] items-center justify-center md:max-w-[80vw]">
          <Image
            src={img.src}
            alt={img.alt}
            width={2000}
            height={1500}
            quality={92}
            sizes="80vw"
            className="block max-h-[82vh] w-auto object-contain"
            style={{ height: "auto", maxHeight: "82vh" }}
          />
        </div>
        <div className="mt-4 flex w-full items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
          <span>{img.caption}</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
