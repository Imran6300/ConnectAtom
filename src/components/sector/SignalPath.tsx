import { Bell, Cpu, LineChart, Radio, Wifi } from "lucide-react";

/** The path every reading takes. Labels come from the product, so the diagram is specific, not generic. */
export function SignalPath({ sensor, link, alert }: { sensor: string; link: string; alert: string }) {
  const steps = [
    { I: Cpu, t: "Sense", d: sensor }, { I: Radio, t: "Send", d: link },
    { I: LineChart, t: "Store and check", d: "Every reading is stored with a time stamp and checked against your limit and delay." },
    { I: Bell, t: "Alert", d: alert },
  ];
  return (
    <ol className="grid gap-4 md:grid-cols-4" aria-label="Signal path">
      {steps.map(({ I, t, d }, i) => (
        <li key={t} className="relative card !p-5">
          <span className="sector-dot mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full" style={{ color: "#0A1622" }}><I size={18} aria-hidden /></span>
          <p className="mono text-xs" style={{ color: "var(--text-muted)" }}>Step {i + 1}</p>
          <h3 className="!text-base">{t}</h3><p className="text-sm">{d}</p>
          {i < 3 && <Wifi aria-hidden className="absolute -right-3 top-1/2 hidden h-4 w-4 -rotate-90 md:block" style={{ color: "var(--sector)" }} />}
        </li>
      ))}
    </ol>
  );
}
