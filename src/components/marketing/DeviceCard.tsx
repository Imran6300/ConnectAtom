"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// A live-looking card for the hero. It is clearly labelled SAMPLE: no invented customer data.
export function DeviceCard() {
  const [t, setT] = useState(4.2);
  const [pts, setPts] = useState<number[]>(() => Array.from({ length: 30 }, (_, i) => 4.2 + Math.sin(i / 3) * 0.25));
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setPts((p) => { const n = Math.round((4.2 + Math.sin(Date.now() / 4000) * 0.3 + (Math.random() - 0.5) * 0.2) * 10) / 10; setT(n); return [...p.slice(1), n]; });
    }, 2500);
    return () => clearInterval(id);
  }, []);
  const min = 3.5, max = 5, d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * 300},${40 - ((v - min) / (max - min)) * 36}`).join(" ");
  return (
    <div className="grid gap-4" aria-label="Sample dashboard card">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: [0.2, 0.7, 0.2, 1] }} className="card" style={{ background: "var(--surface)" }}>
        <div className="flex items-start justify-between"><div><p className="font-semibold" style={{ color: "var(--text)" }}>Cold Room 2</p><p className="text-xs" style={{ color: "var(--text-muted)" }}>Main Store | Limit 2 to 8°C</p></div><span className="badge badge-ok"><span className="live-dot" /> Normal</span></div>
        <p className="num my-3 text-[2.6rem] font-medium leading-none" style={{ color: "var(--text)" }}>{t.toFixed(1)}°C</p>
        <svg viewBox="0 0 300 44" className="h-10 w-full" role="img" aria-label="Temperature trend, steady"><path d={d} fill="none" stroke="var(--accent-graphic)" strokeWidth="2" strokeLinejoin="round" /></svg>
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>Sample reading. Updated a few seconds ago.</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }} className="rounded-[16px] border p-4" style={{ borderColor: "rgba(43,199,122,.5)", background: "rgba(43,199,122,.12)" }}>
        <p className="text-xs font-semibold" style={{ color: "var(--ok-text)" }}>ConnectAtom alert (sample)</p>
        <p className="mt-1 text-sm" style={{ color: "var(--text)" }}>Cold Room 3: 9.4°C for 10 min (limit 8°C).<br />Door open 14 min. Check door and compressor.</p>
      </motion.div>
    </div>
  );
}
