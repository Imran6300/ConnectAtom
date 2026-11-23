import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { LIVE_PRODUCTS } from "@/content/products";
import { LIVE_INDUSTRIES } from "@/content/industries";
import { SITE } from "@/lib/site";

// Footer gives every live product page at least one link from every page of the site (blueprint).
export function Footer() {
  const col = (title: string, items: { href: string; label: string }[]) => (
    <div>
      <p className="mono mb-3 text-xs uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>{title}</p>
      <ul className="space-y-2 text-sm">{items.map((i) => <li key={i.href}><Link href={i.href} className="no-underline hover:underline" style={{ color: "var(--text-body)" }}>{i.label}</Link></li>)}</ul>
    </div>
  );
  return (
    <footer data-theme="dark" className="circuit-bg mt-0 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container-x grid gap-10 py-14 md:grid-cols-5">
        <div className="md:col-span-1">
          <Logo width={150} />
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>{SITE.tagline}<br />{SITE.supportLine}</p>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>{SITE.city}, India<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a>{SITE.phone && <><br />{SITE.phone}</>}</p>
        </div>
        {col("Products", LIVE_PRODUCTS.map((p) => ({ href: `/products/${p.slug}`, label: p.name })))}
        {col("Industries", LIVE_INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.name })))}
        {col("Company", [{ href: "/how-it-works", label: "How it works" }, { href: "/pricing", label: "Pricing" }, { href: "/security", label: "Security" }, { href: "/about", label: "About" }, { href: "/partners", label: "Partners" }, { href: "/contact", label: "Contact" }, { href: "/tools/spoilage-cost-calculator", label: "Spoilage cost calculator" }])}
        {col("Legal", [{ href: "/legal/privacy", label: "Privacy policy" }, { href: "/legal/terms", label: "Terms of service" }, { href: "/login", label: "Sign in" }])}
      </div>
      <div className="container-x border-t py-5 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>© {new Date().getFullYear()} ConnectAtom. Prices are indicative and exclude GST. ConnectAtom is a monitoring aid.</div>
    </footer>
  );
}
