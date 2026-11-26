import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/site";
import { getSite } from "@/lib/catalogue/site";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";

// The footer gives every live product, industry and application at least one link from every page of the site (3-click rule).
export async function Footer() {
  const site = await getSite();
  const L = ({ href, children }: { href: string; children: React.ReactNode }) => <li><Link href={href} className="block py-0.5 text-[0.86rem] no-underline hover:underline" style={{ color: "var(--text-body)" }}>{children}</Link></li>;
  const H = ({ children }: { children: React.ReactNode }) => <p className="kicker mb-3" style={{ color: "var(--accent)" }}>{children}</p>;
  return (
    <footer data-theme="dark" className="circuit-bg border-t" style={{ borderColor: "var(--border)" }}>
      <div className="container-x grid gap-10 py-14 lg:grid-cols-[1.1fr_2.4fr_1fr]">
        <div>
          <Logo width={160} />
          <p className="mt-4 text-sm" style={{ color: "var(--text-body)" }}>{SITE.tagline}<br />{SITE.supportLine}</p>
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>{SITE.city}, India<br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a>{SITE.phone && <><br />{SITE.phone}</>}</p>
          <Link href="/book-pilot" className="btn btn-primary mt-6 no-underline">Get a free pilot</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          <nav aria-label="Products"><H>Products</H><ul>{site.products.map((p) => <L key={p.slug} href={`/products/${p.slug}`}>{p.name}</L>)}</ul></nav>
          <nav aria-label="Industries" className="xl:col-span-1"><H>Industries</H>
            {SECTORS.map((s) => site.sectorIndustries(s).length > 0 && (
              <div key={s} className="mb-3"><p className="mb-1 text-xs font-semibold" style={{ color: "var(--text)" }}>{SECTOR_META[s].label}</p><ul>{site.sectorIndustries(s).map((i) => <L key={i.slug} href={`/industries/${i.slug}`}>{i.name}</L>)}</ul></div>
            ))}
          </nav>
          <div className="grid content-start gap-8">
            {site.applications.length > 0 && <nav aria-label="Applications"><H>Applications</H><ul>{site.applications.slice(0, 10).map((a) => <L key={a.slug} href={`/applications/${a.slug}`}>{a.name}</L>)}<L href="/applications">All applications</L></ul></nav>}
            {site.resources.length > 0 && <nav aria-label="Resources"><H>Resources</H><ul>{site.resources.filter((r) => r.type !== "glossary").slice(0, 6).map((r) => <L key={r.slug} href={`/resources/${r.slug}`}>{r.title}</L>)}<L href="/resources">All resources</L><L href="/tools/spoilage-cost-calculator">Spoilage cost calculator</L></ul></nav>}
          </div>
        </div>
        <div className="grid content-start gap-8">
          <nav aria-label="Company"><H>Company</H><ul><L href="/how-it-works">How it works</L><L href="/pricing">Pricing</L><L href="/security">Security</L><L href="/about">About</L><L href="/partners">Partners</L><L href="/contact">Contact</L></ul></nav>
          <nav aria-label="Legal"><H>Legal</H><ul><L href="/legal/privacy">Privacy policy</L><L href="/legal/terms">Terms of service</L><L href="/login">Sign in</L></ul></nav>
        </div>
      </div>
      <div className="container-x border-t py-5 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>© {new Date().getFullYear()} ConnectAtom. Prices are indicative and exclude 18% GST. ConnectAtom is a monitoring aid; we make no certification or compliance claims we have not verified for your exact need.</div>
    </footer>
  );
}
