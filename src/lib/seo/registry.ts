import { SITE } from "@/lib/site";
import { LIVE_PRODUCTS } from "@/content/products";
import { LIVE_INDUSTRIES, INDUSTRIES } from "@/content/industries";
import { FITS } from "@/content/fits";
import { runGate, isPublishable, type GateResult } from "./gate";

// The "pages" registry: one row per public URL, generated from the catalogue, never edited by hand.
// generateStaticParams, the sitemap, internal links and the admin SEO view all read from here.
export type PageRow = {
  url: string; template: string; title: string; indexable: boolean; lastmod: string; family: string;
  gate?: GateResult; state: "published" | "draft";
};

const STATIC: [string, string, string][] = [
  ["/", "home", "Home"], ["/products", "hub", "Products"], ["/industries", "hub", "Industries"], ["/pricing", "company", "Pricing"],
  ["/how-it-works", "company", "How it works"], ["/security", "company", "Security"], ["/about", "company", "About"],
  ["/contact", "company", "Contact"], ["/partners", "company", "Partners"], ["/tools", "hub", "Tools"],
  ["/tools/spoilage-cost-calculator", "tool", "Spoilage cost calculator"], ["/legal/privacy", "legal", "Privacy policy"], ["/legal/terms", "legal", "Terms of service"],
];
const SITE_UPDATED = "2026-11-22";

export function buildRegistry(): PageRow[] {
  const rows: PageRow[] = STATIC.map(([url, template, title]) => ({ url, template, title, indexable: true, lastmod: SITE_UPDATED, family: template, state: "published" }));
  for (const p of LIVE_PRODUCTS) rows.push({ url: `/products/${p.slug}`, template: "product", title: p.name, indexable: true, lastmod: p.updatedAt, family: "products", state: "published" });
  for (const i of LIVE_INDUSTRIES) rows.push({ url: `/industries/${i.slug}`, template: "industry", title: i.name, indexable: true, lastmod: SITE_UPDATED, family: "industries", state: "published" });
  for (const f of FITS) {
    const ind = INDUSTRIES.find((i) => i.slug === f.industrySlug);
    const prod = LIVE_PRODUCTS.find((p) => p.slug === f.productSlug);
    if (!ind || !prod || ind.status !== "live") continue;
    const gate = runGate(f); const ok = isPublishable(f);
    rows.push({ url: `/industries/${f.industrySlug}/${f.productSlug}`, template: "pair", title: `${prod.name} for ${ind.name}`, indexable: ok, lastmod: f.updatedAt, family: "pairs", gate, state: ok ? "published" : "draft" });
  }
  return rows;
}
export const indexableRows = () => buildRegistry().filter((r) => r.indexable);
export const absUrl = (path: string) => `${SITE.url}${path === "/" ? "" : path}`;
