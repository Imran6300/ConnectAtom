import Link from "next/link";
import type { ReactNode } from "react";
import type { Availability, SectorKey } from "@/lib/catalogue/types";

export const AVAIL: Record<Availability, { label: string; cls: string; note: string }> = {
  available: { label: "Available", cls: "badge-ok", note: "ConnectAtom can supply and install this today." },
  "pilot-ready": { label: "Pilot-ready", cls: "badge-ok", note: "We can run a 30-day pilot. The production unit is being finalised." },
  "in-development": { label: "In development", cls: "badge-warn", note: "Not sold yet. We are collecting early-access interest to decide what to build next." },
};
export const AvailabilityBadge = ({ a }: { a: Availability }) => <span className={`badge ${AVAIL[a].cls}`} title={AVAIL[a].note}>{AVAIL[a].label}</span>;

export const Kicker = ({ children }: { children: ReactNode }) => <p className="eyebrow mb-3">{children}</p>;
export function SectionHead({ eyebrow, title, lede, id }: { eyebrow?: string; title: string; lede?: string; id?: string }) {
  return (
    <header className="mb-8 max-w-3xl">
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <h2 id={id} className="section-title">{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </header>
  );
}
export function Band({ children, dark, sector, id, className = "", tight }: { children: ReactNode; dark?: boolean; sector?: SectorKey; id?: string; className?: string; tight?: boolean }) {
  return (
    <section id={id} data-theme={dark ? "dark" : undefined} data-sector={sector} className={`${tight ? "py-10 sm:py-14" : "section"} ${dark ? "circuit-bg" : ""} ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}
export const ButtonLink = ({ href, children, kind = "primary" }: { href: string; children: ReactNode; kind?: "primary" | "secondary" }) => (
  <Link href={href} className={`btn btn-${kind} no-underline`}>{children}</Link>
);
export const TitleBody = ({ items, cols = 2 }: { items: { title: string; body: string }[]; cols?: 1 | 2 | 3 }) => (
  <ul className={`grid gap-4 ${cols === 3 ? "md:grid-cols-3" : cols === 2 ? "md:grid-cols-2" : ""}`}>
    {items.map((x, i) => (
      <li key={x.title} className="card hover-lift">
        <p className="mono mb-2 text-xs" style={{ color: "var(--accent-graphic)" }}>{String(i + 1).padStart(2, "0")}</p>
        <h3 className="!text-[1.05rem]">{x.title}</h3>
        <p className="text-[0.95rem]">{x.body}</p>
      </li>
    ))}
  </ul>
);
export const SampleTag = ({ children = "Illustrative sample, not a measurement" }: { children?: ReactNode }) => (
  <span className="kicker inline-flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--warn-text)" }} />{children}</span>
);
