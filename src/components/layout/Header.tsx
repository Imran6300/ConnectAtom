import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { MobileNav, type NavGroup } from "./MobileNav";
import { DesktopNav, type DesktopNavItem } from "./DesktopNav";
import { getSite } from "@/lib/catalogue/site";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";

// Menus are generated from the registry: a new product, industry, application or guide appears here with no edit.
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
  const items: DesktopNavItem[] = [
    { type: "mega", id: "products", label: "Products", href: "/products", cols: prodCols },
    { type: "mega", id: "industries", label: "Industries", href: "/industries", cols: indCols },
    ...(apps.length ? [{ type: "list" as const, id: "applications", label: "Applications", href: "/applications", links: apps }] : []),
    ...(guides.length ? [{ type: "list" as const, id: "resources", label: "Resources", href: "/resources", links: guides }] : []),
    { type: "link", id: "pricing", label: "Pricing", href: "/pricing" },
  ];

  return (
    <header data-theme="dark" className="sticky top-0 z-40 border-b backdrop-blur" style={{ background: "rgba(10,22,34,.94)", borderColor: "var(--border)" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      {/* `relative` here is what the mega menu panels are measured against */}
      <div className="container-x relative flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="ConnectAtom home" className="shrink-0"><Logo width={150} /></Link>
        <DesktopNav items={items} />
        <div className="flex items-center gap-2">
          <Link href="/book-pilot" className="btn btn-primary hide-xs !h-10 whitespace-nowrap no-underline">Get a free pilot</Link>
          <MobileNav groups={groups} />
        </div>
      </div>
    </header>
  );
}
