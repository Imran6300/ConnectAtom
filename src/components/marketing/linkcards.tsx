import Link from "next/link";
import type { Application, Industry, Resource } from "@/lib/catalogue/types";
import { Scene } from "@/components/visuals";
import { SECTOR_META } from "@/lib/catalogue/types";

export function IndustryCard({ i, note }: { i: Industry; note?: string }) {
  return (
    <Link href={`/industries/${i.slug}`} data-sector={i.sector} className="card hover-lift block overflow-hidden !p-0 no-underline" style={{ color: "inherit" }}>
      <div style={{ aspectRatio: "16/9", background: "var(--sector-soft)" }}><Scene name={i.scene} className="h-full w-full" /></div>
      <div className="p-4"><p className="kicker">{SECTOR_META[i.sector].label}</p><h3 className="!mb-1 mt-1 !text-[1.05rem]">{i.name}</h3><p className="text-sm">{note ?? i.tagline}</p></div>
    </Link>
  );
}
export function ResourceCard({ r }: { r: Resource }) {
  return (
    <Link href={`/resources/${r.slug}`} className="card hover-lift block no-underline" style={{ color: "inherit" }}>
      <p className="kicker">{r.type} · {r.readMinutes} min</p><h3 className="!mb-1 mt-1 !text-[1.05rem]">{r.title}</h3><p className="text-sm">{r.summary}</p>
    </Link>
  );
}
export function ApplicationCard({ a }: { a: Application }) {
  return (
    <Link href={`/applications/${a.slug}`} className="card hover-lift block no-underline" style={{ color: "inherit" }}>
      <p className="kicker">Application</p><h3 className="!mb-1 mt-1 !text-[1.05rem]">{a.name}</h3><p className="text-sm">{a.job}</p>
    </Link>
  );
}
export const Grid = ({ children, cols = 3 }: { children: React.ReactNode; cols?: 2 | 3 | 4 }) => (
  <div className={`grid gap-4 sm:grid-cols-2 ${cols === 3 ? "lg:grid-cols-3" : cols === 4 ? "lg:grid-cols-4" : ""}`}>{children}</div>
);
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="toc hidden xl:block"><p className="kicker mb-2">On this page</p>{items.map((x) => <a key={x.id} href={`#${x.id}`}>{x.label}</a>)}</nav>
  );
}
export function Checklist({ items }: { items: string[] }) {
  return <ul className="grid gap-2 md:grid-cols-2">{items.map((t) => <li key={t} className="flex gap-3 rounded-[12px] border p-3 text-[0.95rem]" style={{ borderColor: "var(--border)" }}><span aria-hidden className="sector-dot mt-1.5 h-2 w-2 shrink-0 rounded-full" />{t}</li>)}</ul>;
}
