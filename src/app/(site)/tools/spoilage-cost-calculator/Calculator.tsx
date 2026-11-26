"use client";
import { useState } from "react";
import Link from "next/link";
import { flag } from "@/lib/attribution";
import { inr } from "@/lib/format";

const num = (v: string) => { const n = Number(v.replace(/,/g, "")); return Number.isFinite(n) && n >= 0 ? n : 0; };

export function Calculator() {
  const [stock, setStock] = useState("200000"), [fails, setFails] = useState("2"), [loss, setLoss] = useState("40"), [loss2, setLoss2] = useState("5"), [devices, setDevices] = useState("2"), [plan, setPlan] = useState("499");
  const without = num(stock) * num(fails) * (num(loss) / 100);
  const withMon = num(stock) * num(fails) * (num(loss2) / 100);
  const cost = num(devices) * num(plan) * 12;
  const saved = without - withMon;
  const F = ({ id, label, v, set, hint }: { id: string; label: string; v: string; set: (s: string) => void; hint?: string }) => (
    <div><label className="label" htmlFor={id}>{label}</label><input id={id} className="input num" inputMode="decimal" value={v} onChange={(e) => { set(e.target.value); flag("usedTool"); }} />{hint && <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>{hint}</p>}</div>
  );
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="card grid gap-4">
        <F id="stock" label="Value of stock in the room (₹)" v={stock} set={setStock} />
        <F id="fails" label="Failures a year that go unnoticed for hours" v={fails} set={setFails} hint="Think of compressor trips, doors left open, power cuts." />
        <F id="loss" label="Share of stock that spoils when you find out late (%)" v={loss} set={setLoss} hint="Your own estimate." />
        <F id="loss2" label="Share that spoils if you are told within minutes (%)" v={loss2} set={setLoss2} hint="Your own estimate." />
        <div className="grid grid-cols-2 gap-4"><F id="devices" label="Devices" v={devices} set={setDevices} /><F id="plan" label="Plan ₹ per device per month" v={plan} set={setPlan} /></div>
      </div>
      <div className="card" aria-live="polite">
        <p className="eyebrow">Result</p>
        <dl className="grid gap-3">
          <div><dt className="text-sm">Expected yearly loss without monitoring</dt><dd className="num text-2xl font-medium" style={{ color: "var(--crit-text)" }}>{inr(Math.round(without))}</dd></div>
          <div><dt className="text-sm">Expected yearly loss with fast alerts</dt><dd className="num text-xl">{inr(Math.round(withMon))}</dd></div>
          <div><dt className="text-sm">Yearly cost of monitoring (plans only)</dt><dd className="num text-xl">{inr(Math.round(cost))}</dd></div>
          <div><dt className="text-sm">Estimated yearly difference</dt><dd className="num text-2xl font-medium" style={{ color: saved - cost >= 0 ? "var(--ok-text)" : "var(--warn-text)" }}>{saved - cost >= 0 ? "+" : "-"}{inr(Math.abs(Math.round(saved - cost)))}</dd></div>
        </dl>
        <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>Excludes the one-time device price and GST. Based only on the numbers you entered.</p>
        <Link href={`/get-quote?need=${encodeURIComponent("Spoilage calculator result")}`} className="btn btn-primary mt-4 no-underline">Send me this as a quote</Link>
      </div>
    </div>
  );
}
