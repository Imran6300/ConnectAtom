import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MobileNav, type NavGroup } from "./MobileNav";
import { getSite } from "@/lib/catalogue/site";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";

// Mega menus are generated from the registry: a new product, industry, application or guide appears here with no edit.
export async function Header() {
  const site = await getSite();
  const prodCols = SECTORS.map((s) => ({ key: s, label: SECTOR_META[s].label, links: site.sectorProducts(s).map((p) => ({ href: `/products/${p.slug}`, label: p.name })) })).filter((c) => c.links.length);
  const indCols = SECTORS.map((s) => ({ key: s, label: SECTOR_META[s].label, links: site.sectorIndustries(s).map((i) => ({ href: `/industries/${i.slug}`, label: i.name })) })).filter((c) => c.links.length);
  const apps = site.applications.slice(0, 8).map((a) => ({ href: `/applications/${a.slug}`, label: a.name }));
  const guides = site.resources.filter((r) => r.type !== "glossary").slice(0, 8).map((r) => ({ href: `/resources/${r.slug}`, label: r.title }));
  const groups: NavGroup[] = [
    { title: "Products", href: "/products", links: prodCols.flatMap((c) => c.links) },
    { title: "Industries", href: "/industries", links: indCols.flatMap((c) => c.links) },
    ...(apps.length ? [{ title: "Applications", href: "/applications", links: apps }] : []),
    ...(guides.length ? [{ title: "Resources", href: "/resources", links: guides }] : []),
  ];
  const top = "flex items-center gap-1 px-3 py-5 text-sm no-underline";
  const Mega = ({ label, href, cols }: { label: string; href: string; cols: { key: string; label: string; links: { href: string; label: string }[] }[] }) => (
    <div className="group relative">
      <Link href={href} className={top} style={{ color: "var(--text-body)" }}>{label}<ChevronDown size={14} aria-hidden /></Link>
      <div className="mega absolute left-1/2 top-full z-50 w-[min(1040px,92vw)] -translate-x-1/2 pt-0">
        <div className="card grid gap-6 !p-6 lg:grid-cols-4" style={{ background: "var(--surface-raised)" }}>
          {cols.map((c) => (
            <div key={c.key} data-sector={c.key}>
              <p className="kicker mb-2 flex items-center gap-2"><span className="sector-dot h-2 w-2 rounded-full" />{c.label}</p>
              <ul className="space-y-0.5">{c.links.map((l) => <li key={l.href}><Link href={l.href} className="block rounded-md px-2 py-1 text-[0.86rem] no-underline hover:bg-white/5" style={{ color: "var(--text)" }}>{l.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  const Simple = ({ label, href, links }: { label: string; href: string; links: { href: string; label: string }[] }) => (
    <div className="group relative">
      <Link href={href} className={top} style={{ color: "var(--text-body)" }}>{label}<ChevronDown size={14} aria-hidden /></Link>
      <div className="mega absolute left-0 top-full z-50 w-[340px]"><ul className="card !p-2" style={{ background: "var(--surface-raised)" }}>{links.map((l) => <li key={l.href}><Link href={l.href} className="block rounded-md px-3 py-2 text-sm no-underline hover:bg-white/5" style={{ color: "var(--text)" }}>{l.label}</Link></li>)}</ul></div>
    </div>
  );
  return (
    <header data-theme="dark" className="sticky top-0 z-40 border-b backdrop-blur" style={{ background: "rgba(10,22,34,.94)", borderColor: "var(--border)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="ConnectAtom home"><Logo width={150} /></Link>
        <nav aria-label="Main" className="hidden items-center lg:flex">
          <Mega label="Products" href="/products" cols={prodCols} />
          <Mega label="Industries" href="/industries" cols={indCols} />
          {apps.length > 0 && <Simple label="Applications" href="/applications" links={apps} />}
          {guides.length > 0 && <Simple label="Resources" href="/resources" links={guides} />}
          <Link href="/pricing" className={top} style={{ color: "var(--text-body)" }}>Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/book-pilot" className="btn btn-primary hide-xs !h-10 no-underline">Get a free pilot</Link>
          <MobileNav groups={groups} />
        </div>
      </div>
    </header>
  );
}
