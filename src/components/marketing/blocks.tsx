import Link from "next/link";
import type { ReactNode } from "react";
import { Bell, Cpu, LineChart, ShieldCheck, Wifi } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { PLANS } from "@/content/plans";
import { inr, type Faq, type Product } from "@/content/products";

export const Section = ({ children, dark, id, className = "" }: { children: ReactNode; dark?: boolean; id?: string; className?: string }) => (
  <section id={id} data-theme={dark ? "dark" : undefined} className={`section ${dark ? "circuit-bg" : ""} ${className}`}><div className="container-x">{children}</div></section>
);
export const Eyebrow = ({ children }: { children: ReactNode }) => <p className="eyebrow mb-3">{children}</p>;

export function PageHero({ eyebrow, title, lede, children, aside }: { eyebrow?: string; title: string; lede?: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section data-theme="dark" className="circuit-bg">
      <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="!text-[clamp(2rem,4.4vw,3rem)]">{title}</h1>
          {lede && <p className="lede mt-3" style={{ color: "var(--text-body)" }}>{lede}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}

export const CtaRow = ({ primary = { href: "/book-pilot", label: "Get a free pilot" }, secondary }: { primary?: { href: string; label: string }; secondary?: { href: string; label: string } }) => (
  <div className="mt-7 flex flex-wrap gap-3">
    <Link href={primary.href} className="btn btn-primary no-underline">{primary.label}</Link>
    {secondary && <Link href={secondary.href} className="btn btn-secondary no-underline">{secondary.label}</Link>}
  </div>
);

export function ProofStrip() {
  const items = ["30-day money-back pilot", "Installed and supported for you", "WhatsApp alerts to the right person", "One simple monthly plan"];
  return (
    <div className="border-y" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
      <ul className="container-x grid gap-3 py-5 text-sm font-medium sm:grid-cols-2 lg:grid-cols-4" style={{ color: "var(--text)" }}>
        {items.map((t) => <li key={t} className="flex items-center gap-2"><ShieldCheck size={16} style={{ color: "var(--accent-graphic)" }} aria-hidden />{t}</li>)}
      </ul>
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    { icon: Cpu, t: "1. Install", d: "We help you place the device and probe. It takes about an hour for one room." },
    { icon: Wifi, t: "2. Connect", d: "It joins your Wi-Fi, or uses 4G where Wi-Fi is weak. Readings reach your dashboard in seconds." },
    { icon: Bell, t: "3. Get alerted", d: "You set the limit and the time. If it drifts, the right person is told on WhatsApp, and the next person if nobody answers." },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {steps.map(({ icon: I, t, d }) => (
        <div key={t} className="card"><I size={22} style={{ color: "var(--accent-graphic)" }} aria-hidden /><h3 className="mt-3">{t}</h3><p>{d}</p></div>
      ))}
    </div>
  );
}

export function ProductCard({ p, note }: { p: Product; note?: string }) {
  return (
    <Link href={`/products/${p.slug}`} className="card block no-underline transition hover:-translate-y-0.5" style={{ color: "inherit" }}>
      <p className="mono text-xs" style={{ color: "var(--accent)" }}>{p.modelCode}</p>
      <h3 className="mt-1">{p.name}</h3>
      <p className="text-sm">{p.buyers.slice(0, 3).join(", ")}</p>
      <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>{note ?? `Kit from ${inr(p.hardwareFromInr)}. Plans from ₹299 per device per month.`}</p>
    </Link>
  );
}

export function SpecTable({ p }: { p: Product }) {
  const rows: [string, string][] = [["Model", p.modelCode], ["Sensors", p.hardware.sensors.join("; ")], ["Connectivity", p.hardware.connectivity.join("; ")], ["Power", p.hardware.power], ["Kit price (indicative)", `${inr(p.hardwareFromInr)} to ${inr(p.hardwareToInr)}, excluding GST`], ["Report", p.reportName]];
  return <table className="table-ca"><tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row" className="w-40">{k}</th><td>{v}</td></tr>)}</tbody></table>;
}

export function AlertExample({ text, title = "Example alert" }: { text: string; title?: string }) {
  return (
    <div className="rounded-[16px] border p-4" style={{ borderColor: "rgba(21,122,71,.35)", background: "var(--ok-bg)" }}>
      <p className="text-xs font-semibold" style={{ color: "var(--ok-text)" }}>{title} (sample, written in the ConnectAtom voice)</p>
      <p className="mt-1 text-[0.95rem]" style={{ color: "var(--text)" }}>{text}</p>
    </div>
  );
}

export function ReportPreview({ name }: { name: string }) {
  return (
    <div className="card">
      <p className="eyebrow">Sample report</p><h3>{name}</h3>
      <table className="table-ca mt-2"><thead><tr><th>Device</th><th>Min</th><th>Max</th><th>Average</th><th>Alerts</th></tr></thead>
        <tbody><tr><td>Cold Room 2</td><td className="num">3.9°C</td><td className="num">5.1°C</td><td className="num">4.3°C</td><td>0</td></tr><tr><td>Cold Room 3</td><td className="num">4.6°C</td><td className="num">9.4°C</td><td className="num">5.2°C</td><td>1</td></tr></tbody></table>
      <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>Sample numbers for illustration only.</p>
    </div>
  );
}

export function FaqBlock({ faqs, title = "Questions" }: { faqs: Faq[]; title?: string }) {
  // FAQ rich results were removed from Google Search in 2026, so this is for readers. No FAQ markup is added.
  return (
    <div><h2>{title}</h2>
      <div className="grid gap-3">{faqs.map((f) => (
        <details key={f.q} className="card !p-4"><summary className="cursor-pointer font-semibold" style={{ color: "var(--text)" }}>{f.q}</summary><p className="mt-2">{f.a}</p></details>
      ))}</div>
    </div>
  );
}

export function PlanTable({ compact }: { compact?: boolean }) {
  const keys = Object.keys(PLANS[0].rows);
  return (
    <div className="overflow-x-auto">
      <table className="table-ca min-w-[640px]">
        <thead><tr><th></th>{PLANS.map((p) => <th key={p.key}>{p.name}</th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Per device per month</th>{PLANS.map((p) => <td key={p.key} className="num text-base font-semibold">{inr(p.monthly)}</td>)}</tr>
          <tr><th scope="row">Yearly (10 months)</th>{PLANS.map((p) => <td key={p.key} className="num">{inr(p.annual)}</td>)}</tr>
          {!compact && keys.map((k) => <tr key={k}><th scope="row">{k}</th>{PLANS.map((p) => <td key={p.key}>{p.rows[k]}</td>)}</tr>)}
        </tbody>
      </table>
      <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>Introductory prices, excluding 18% GST. Pay yearly and get 2 months free.</p>
    </div>
  );
}

export function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string; note?: string }[] }) {
  if (!links.length) return null;
  return (
    <div><h2>{title}</h2><ul className="grid gap-2 sm:grid-cols-2">{links.map((l) => (
      <li key={l.href}><Link href={l.href} className="card block !p-4 no-underline" style={{ color: "var(--text)" }}><span className="font-semibold">{l.label}</span>{l.note && <span className="block text-sm" style={{ color: "var(--text-muted)" }}>{l.note}</span>}</Link></li>
    ))}</ul></div>
  );
}

export function CtaBand({ title = "Try it free for 30 days", text = "We install a kit at your site. If it does not work for you, you get your money back.", productSlug, industrySlug }: { title?: string; text?: string; productSlug?: string; industrySlug?: string }) {
  return (
    <Section dark>
      <div className="grid gap-8 lg:grid-cols-2">
        <div><Eyebrow>Free pilot</Eyebrow><h2>{title}</h2><p className="lede">{text}</p><ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--text-body)" }}><li className="flex gap-2"><LineChart size={16} aria-hidden /> Live readings on your phone</li><li className="flex gap-2"><Bell size={16} aria-hidden /> WhatsApp alerts that name the problem</li></ul></div>
        <div className="card"><LeadForm kind="pilot" productSlug={productSlug} industrySlug={industrySlug} cta="Get a free pilot" compact /></div>
      </div>
    </Section>
  );
}
