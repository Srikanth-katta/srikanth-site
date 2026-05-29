"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/*
 * Contact form — posts to a Formspree endpoint so messages land in an inbox
 * without ever exposing an email address on the page.
 *
 * SETUP (one time):
 *   1. Create a free form at https://formspree.io and point it at your inbox.
 *   2. Copy the form's endpoint (looks like https://formspree.io/f/abcdwxyz).
 *   3. Either paste it as the fallback below, or — recommended — add it in
 *      Vercel → Project → Settings → Environment Variables as
 *      NEXT_PUBLIC_FORMSPREE_ENDPOINT, then redeploy.
 */
const ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — if a bot fills the hidden field, silently pretend success.
    if (data.get("_gotcha")) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const body = await res.json().catch(() => null);
        setError(
          body?.errors?.[0]?.message ??
            "Something went wrong. Please try again in a moment."
        );
        setStatus("error");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-12 max-w-xl border-t border-[var(--color-spark)]/40 pt-8"
      >
        <p className="font-display text-2xl text-[var(--color-bone)] md:text-3xl">
          Message sent<span className="text-[var(--color-spark)]">.</span>
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-fog)] md:text-base">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          data-cursor="link"
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)] transition-colors hover:text-[var(--color-spark)]"
        >
          Send another →
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.15 }}
      onSubmit={handleSubmit}
      noValidate
      className="mt-12 max-w-xl"
    >
      {/* Honeypot — hidden from humans, catches bots. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            data-cursor="link"
            className="contact-input"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            data-cursor="link"
            className="contact-input"
          />
        </Field>
      </div>

      <div className="mt-6">
        <Field label="Message" htmlFor="message">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Say hello, ask a question, or tell me where to go next…"
            data-cursor="link"
            className="contact-input resize-none"
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 font-mono text-[11px] tracking-[0.05em] text-[var(--color-spark)]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        data-cursor="link"
        data-cursor-label="Send"
        className="group mt-8 inline-flex items-center gap-4 rounded-full border border-[var(--color-bone)]/20 bg-[var(--color-ink)]/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-bone)] backdrop-blur transition-colors hover:border-[var(--color-spark)] hover:text-[var(--color-spark)] disabled:cursor-default disabled:opacity-50"
      >
        <span className="block h-2 w-2 rounded-full bg-[var(--color-spark)] transition-transform duration-500 group-hover:scale-150" />
        {status === "submitting" ? "Sending…" : "Send message"}
        <span className="block h-px w-8 bg-current transition-all duration-300 group-hover:w-12" />
      </button>
    </motion.form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
    </label>
  );
}
