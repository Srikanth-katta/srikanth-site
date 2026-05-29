"use client";

import { useEffect, useState } from "react";
import { masthead } from "@/content/site";

const MUMBAI_LAT = 19.07;
const MUMBAI_LON = 72.87;

export function Masthead() {
  const [time, setTime] = useState<string>("");
  const [temp, setTemp] = useState<string>("—");

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm} IST`);
    };
    fmt();
    const id = setInterval(fmt, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${MUMBAI_LAT}&longitude=${MUMBAI_LON}&current_weather=true`,
      { signal: ctrl.signal, cache: "force-cache" }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const t = d?.current_weather?.temperature;
        if (typeof t === "number") setTemp(`${Math.round(t)}°C`);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return (
    <div className="container-edge relative z-10 flex shrink-0 items-center justify-between gap-4 border-b border-[var(--color-bone)]/10 py-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-fog)]">
      <span className="pl-14 text-[var(--color-bone)] md:pl-14 lg:pl-5">{masthead.label}</span>
      <div className="hidden flex-wrap items-center gap-x-5 gap-y-1 md:flex">
        <span>{masthead.dateline}</span>
        <span className="text-[var(--color-spark)]">{temp}</span>
        <span>{time || "—"}</span>
        <span>↑0 m</span>
      </div>
      {/* asymmetric — left brand + centre live data; no right counterpart */}
    </div>
  );
}
