// The derived, in-memory view of the catalogue: lookups, the page registry (one row per public URL, the SEO spine),
// and the link graph. Everything the sitemap, breadcrumbs, metadata and internal links need comes from here,
// so adding a record (static or MongoDB) adds its pages, sitemap entry and links without touching a template.
import { cache } from "react";
import { loadCatalogue } from "./repo";
import type { Application, Catalogue, Fit, Industry, Product, Resource, SectorKey } from "./types";
import { runGate, type GateResult } from "@/lib/seo/gate";
import { abs } from "@/lib/site";

export type Family = "pages" | "products" | "industries" | "combinations" | "applications" | "resources";
export type PageRow = {
  url: string; family: Family; template: string; title: string; description?: string;
  indexable: boolean; state: "published" | "draft" | "noindex"; reasons: string[];
  lastmod: string; canonical: string; wordCount: number; entity?: { type: string; slug: string }; gate?: GateResult;
};

/** Minimum unique words before a record may be indexed. Starting values; tune from Search Console. */
export const MIN_WORDS: Record<string, number> = { product: 700, industry: 700, application: 250, guide: 600, technical: 600, comparison: 500, research: 600, glossary: 80 };

const flat = (o: unknown): string[] => typeof o === "string" ? [o] : Array.isArray(o) ? o.flatMap(flat) : o && typeof o === "object" ? Object.values(o as object).flatMap(flat) : [];
export const wordCount = (o: unknown) => flat(o).join(" ").split(/\s+/).filter(Boolean).length;
const maxDate = (xs: string[], fallback = "2026-11-26") => xs.length ? xs.reduce((a, b) => (a > b ? a : b)).slice(0, 10) : fallback;
const inter = <T,>(a: T[], b: T[]) => a.filter((x) => b.includes(x)).length;

const STATIC_PAGES: [string, string, string, string][] = [
  ["/", "home", "Home", "2026-11-26"], ["/products", "hub", "Products", ""], ["/industries", "hub", "Industries", ""], ["/applications", "hub", "Applications", ""], ["/resources", "hub", "Resources", ""],
  ["/pricing", "company", "Pricing", "2026-11-26"], ["/how-it-works", "company", "How it works", "2026-11-26"], ["/security", "company", "Security", "2026-11-22"],
  ["/about", "company", "About", "2026-11-22"], ["/contact", "company", "Contact", "2026-11-22"], ["/partners", "company", "Partners", "2026-11-22"],
  ["/tools", "hub", "Tools", "2026-11-22"], ["/tools/spoilage-cost-calculator", "tool", "Spoilage cost calculator", "2026-11-22"],
  ["/legal/privacy", "legal", "Privacy policy", "2026-11-22"], ["/legal/terms", "legal", "Terms of service", "2026-11-22"],
];

export type Site = ReturnType<typeof buildSite>;

export function buildSite(cat: Catalogue) {
  const live = <T extends { status: string }>(xs: T[]) => xs.filter((x) => x.status === "live");
  const products = live(cat.products).sort((a, b) => a.num - b.num);
  const industries = live(cat.industries);
  const applications = live(cat.applications);
  const resources = live(cat.resources);
  const pBy = new Map(products.map((p) => [p.slug, p])), iBy = new Map(industries.map((i) => [i.slug, i]));
  const aBy = new Map(applications.map((a) => [a.slug, a])), rBy = new Map(resources.map((r) => [r.slug, r]));

  // ---- fits: a pair is published only when both parents are live AND the gate passes
  const gates = new Map<Fit, GateResult>();
  const published: Fit[] = [];
  for (const f of cat.fits) {
    const g = runGate(f, cat.fits); gates.set(f, g);
    if (f.status === "live" && g.passed && pBy.has(f.productSlug) && iBy.has(f.industrySlug)) published.push(f);
  }
  const fitMap = new Map(published.map((f) => [`${f.industrySlug}/${f.productSlug}`, f]));

  // ---- relations (all derived from the records; nothing is placed by hand)
  const industriesOfProduct = (slug: string) => industries.filter((i) => i.productSlugs.includes(slug)).sort((a, b) => a.productSlugs.indexOf(slug) - b.productSlugs.indexOf(slug) || a.name.localeCompare(b.name));
  const productsOfIndustry = (i: Industry) => i.productSlugs.map((s) => pBy.get(s)).filter((x): x is Product => !!x);
  const pairFor = (industry: string, product: string) => fitMap.get(`${industry}/${product}`);
  const pairsOfProduct = (slug: string) => published.filter((f) => f.productSlug === slug).sort((a, b) => b.fitScore - a.fitScore);
  const pairsOfIndustry = (slug: string) => published.filter((f) => f.industrySlug === slug).sort((a, b) => b.fitScore - a.fitScore);
  /** Link to the pair page when it is published, else the product page. */
  const productHref = (industry: string, product: string) => (fitMap.has(`${industry}/${product}`) ? `/industries/${industry}/${product}` : `/products/${product}`);

  const relatedProducts = (p: Product, n = 4): Product[] => {
    const mine = industriesOfProduct(p.slug).map((i) => i.slug);
    const pins = (p.relatedProductSlugs ?? []).map((s) => pBy.get(s)).filter((x): x is Product => !!x && x.slug !== p.slug);
    const scored = products.filter((q) => q.slug !== p.slug && !pins.includes(q)).map((q) => ({
      q, s: 3 * inter(mine, industriesOfProduct(q.slug).map((i) => i.slug)) + 2 * inter(p.tags, q.tags) + (q.sector === p.sector ? 2 : 0) + (q.availability !== "in-development" ? 1 : 0),
    })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s || a.q.num - b.q.num).map((x) => x.q);
    return [...pins, ...scored].slice(0, n);
  };
  const relatedIndustries = (i: Industry, n = 4): Industry[] => {
    const pins = (i.relatedIndustrySlugs ?? []).map((s) => iBy.get(s)).filter((x): x is Industry => !!x && x.slug !== i.slug);
    const scored = industries.filter((j) => j.slug !== i.slug && !pins.includes(j)).map((j) => ({
      j, s: 3 * inter(i.productSlugs, j.productSlugs) + 2 * inter(i.tags, j.tags) + (j.sector === i.sector ? 2 : 0),
    })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s || a.j.name.localeCompare(b.j.name)).map((x) => x.j);
    return [...pins, ...scored].slice(0, n);
  };
  const applicationsFor = (o: { product?: string; industry?: string }, n = 6): Application[] =>
    applications.filter((a) => (o.product && a.productSlugs.includes(o.product)) || (o.industry && a.industrySlugs.includes(o.industry))).slice(0, n);
  const resourcesFor = (o: { product?: string; industry?: string; application?: string; tags?: string[]; exclude?: string; types?: Resource["type"][] }, n = 4): Resource[] => {
    const pool = resources.filter((r) => r.slug !== o.exclude && (!o.types || o.types.includes(r.type)));
    return pool.map((r) => ({
      r, s: (o.product && r.productSlugs.includes(o.product) ? 4 : 0) + (o.industry && r.industrySlugs.includes(o.industry) ? 3 : 0) + (o.application && r.applicationSlugs.includes(o.application) ? 4 : 0) + inter(o.tags ?? [], r.tags) + (r.type === "glossary" ? -1 : 0),
    })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s || a.r.title.localeCompare(b.r.title)).slice(0, n).map((x) => x.r);
  };

  // ---- redirects: explicit rules first, then archived records fall back to their parent hub (a link never returns an error)
  const redirectMap = new Map(cat.redirects.map((r) => [r.from, r]));
  const archivedHub = (path: string): string | null => {
    const m = path.match(/^\/(products|industries|applications|resources)\/([^/]+)$/);
    if (!m) return null;
    const list = ({ products: cat.products, industries: cat.industries, applications: cat.applications, resources: cat.resources } as Record<string, { slug: string; status: string }[]>)[m[1]];
    return list.some((x) => x.slug === m[2] && x.status === "archived") ? `/${m[1]}` : null;
  };
  const redirectFor = (path: string) => redirectMap.get(path) ?? (archivedHub(path) ? { from: path, to: archivedHub(path)!, status: 301 as const } : null);

  // ---- the page registry
  const rows: PageRow[] = [];
  const add = (r: Omit<PageRow, "canonical" | "state" | "reasons" | "indexable"> & { reasons?: string[]; noindex?: boolean; canonicalOverride?: string; ok?: boolean }) => {
    const reasons = [...(r.reasons ?? [])];
    if (r.noindex) reasons.push("noindex set on the record");
    if (r.canonicalOverride && r.canonicalOverride !== r.url) reasons.push(`canonical points to ${r.canonicalOverride}`);
    if (r.ok === false) reasons.push("not publishable");
    const indexable = reasons.length === 0;
    rows.push({ ...r, canonical: abs(r.canonicalOverride ?? r.url), reasons, indexable, state: indexable ? "published" : r.noindex ? "noindex" : "draft" });
  };
  const hubDate = (xs: { updatedAt: string }[]) => maxDate(xs.map((x) => x.updatedAt));
  for (const [url, template, title, lm] of STATIC_PAGES) {
    const kids = url === "/products" ? products : url === "/industries" ? industries : url === "/applications" ? applications : url === "/resources" ? resources : null;
    add({ url, family: "pages", template, title, lastmod: kids ? hubDate(kids) : lm || "2026-11-26", wordCount: 0, ok: kids ? kids.length > 0 : true });
  }
  for (const p of products) {
    const wc = wordCount(p), min = MIN_WORDS.product;
    add({ url: `/products/${p.slug}`, family: "products", template: "product", title: p.name, description: p.summary, lastmod: p.updatedAt.slice(0, 10), wordCount: wc, entity: { type: "product", slug: p.slug }, noindex: p.seo?.noindex, canonicalOverride: p.seo?.canonicalOverride, reasons: wc < min ? [`thin: ${wc} words (min ${min})`] : [] });
  }
  for (const i of industries) {
    const wc = wordCount(i), min = MIN_WORDS.industry;
    add({ url: `/industries/${i.slug}`, family: "industries", template: "industry", title: i.name, description: i.summary, lastmod: i.updatedAt.slice(0, 10), wordCount: wc, entity: { type: "industry", slug: i.slug }, noindex: i.seo?.noindex, canonicalOverride: i.seo?.canonicalOverride, reasons: wc < min ? [`thin: ${wc} words (min ${min})`] : [] });
  }
  for (const f of cat.fits) {
    const ind = iBy.get(f.industrySlug), prod = pBy.get(f.productSlug); if (!ind || !prod) continue;
    const g = gates.get(f)!; const ok = published.includes(f);
    add({ url: `/industries/${f.industrySlug}/${f.productSlug}`, family: "combinations", template: "pair", title: `${prod.name} for ${ind.name}`, description: f.angle.slice(0, 160), lastmod: f.updatedAt.slice(0, 10), wordCount: g.wordCount, entity: { type: "fit", slug: `${f.industrySlug}/${f.productSlug}` }, gate: g, noindex: f.seo?.noindex, canonicalOverride: f.seo?.canonicalOverride, ok, reasons: ok ? [] : [...g.failures, ...(f.status !== "live" ? [`status ${f.status}`] : [])] });
  }
  for (const a of applications) {
    const wc = wordCount(a), min = MIN_WORDS.application;
    add({ url: `/applications/${a.slug}`, family: "applications", template: "application", title: a.name, description: a.summary, lastmod: a.updatedAt.slice(0, 10), wordCount: wc, entity: { type: "application", slug: a.slug }, noindex: a.seo?.noindex, canonicalOverride: a.seo?.canonicalOverride, reasons: wc < min ? [`thin: ${wc} words (min ${min})`] : [] });
  }
  for (const r of resources) {
    const wc = wordCount(r.sections) + wordCount(r.answer), min = MIN_WORDS[r.type] ?? 400;
    add({ url: `/resources/${r.slug}`, family: "resources", template: r.type, title: r.title, description: r.summary, lastmod: r.updatedAt.slice(0, 10), wordCount: wc, entity: { type: "resource", slug: r.slug }, noindex: r.seo?.noindex, canonicalOverride: r.seo?.canonicalOverride, reasons: wc < min ? [`thin: ${wc} words (min ${min})`] : [] });
  }
  // one row per canonical URL: a duplicate URL can never reach a sitemap
  const seen = new Set<string>(); const dupes: string[] = [];
  const unique = rows.filter((r) => (seen.has(r.url) ? (dupes.push(r.url), false) : (seen.add(r.url), true)));
  const rowByUrl = new Map(unique.map((r) => [r.url, r]));
  const indexable = unique.filter((r) => r.indexable);

  return {
    cat, products, industries, applications, resources, published, rows: unique, rowByUrl, indexable, dupes,
    product: (s: string) => pBy.get(s), industry: (s: string) => iBy.get(s), application: (s: string) => aBy.get(s), resource: (s: string) => rBy.get(s),
    industriesOfProduct, productsOfIndustry, pairFor, pairsOfProduct, pairsOfIndustry, productHref,
    relatedProducts, relatedIndustries, applicationsFor, resourcesFor, redirectFor,
    isIndexable: (url: string) => rowByUrl.get(url)?.indexable ?? false,
    sectorIndustries: (s: SectorKey) => industries.filter((i) => i.sector === s),
    sectorProducts: (s: SectorKey) => products.filter((p) => p.sector === s),
  };
}

/** Per-request memo of the derived site; the underlying catalogue is cached by the repository. */
export const getSite = cache(async () => buildSite(await loadCatalogue()));
