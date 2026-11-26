// Typed JSON-LD builders. Rules: markup must describe what is VISIBLE on the page; no Offer without a real public price;
// no ratings or reviews; no FAQPage (Google removed FAQ rich results in 2026, FAQ stays on the page for readers).
import { SITE, abs } from "@/lib/site";
import type { Product, Resource } from "@/lib/catalogue/types";

const CTX = "https://schema.org";
export const organization = () => ({
  "@context": CTX, "@type": "Organization", "@id": `${SITE.url}/#organization`, name: SITE.name, url: SITE.url,
  logo: `${SITE.url}/logo/connectatom-icon-color.svg`, description: SITE.boilerplate,
  address: { "@type": "PostalAddress", addressLocality: SITE.city, addressCountry: "IN" },
  ...(SITE.email ? { contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: SITE.email, areaServed: "IN", availableLanguage: ["en"] }] } : {}),
});
export const website = () => ({ "@context": CTX, "@type": "WebSite", "@id": `${SITE.url}/#website`, name: SITE.name, url: SITE.url, publisher: { "@id": `${SITE.url}/#organization` }, inLanguage: "en-IN" });
export const breadcrumbList = (trail: { name: string; path: string }[]) => ({
  "@context": CTX, "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
});
/** Only for products ConnectAtom can pilot or sell today. In-development products get a WebPage, not a Product. No `offers`: prices are indicative. */
export const productLd = (p: Product, image?: string) => ({
  "@context": CTX, "@type": "Product", name: p.brandName, model: p.modelCode, description: p.summary, url: abs(`/products/${p.slug}`),
  brand: { "@type": "Brand", name: SITE.name }, category: p.sector, ...(image ? { image: abs(image) } : {}),
});
export const webPage = (o: { name: string; description: string; path: string; modified: string; about?: string; type?: "WebPage" | "CollectionPage" }) => ({
  "@context": CTX, "@type": o.type ?? "WebPage", name: o.name, description: o.description, url: abs(o.path), dateModified: o.modified,
  inLanguage: "en-IN", isPartOf: { "@id": `${SITE.url}/#website` }, publisher: { "@id": `${SITE.url}/#organization` }, ...(o.about ? { about: o.about } : {}),
});
export const itemList = (name: string, items: { name: string; path: string }[]) => ({
  "@context": CTX, "@type": "ItemList", name, numberOfItems: items.length,
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
});
export const articleLd = (r: Resource) => {
  const common = {
    "@context": CTX, headline: r.title.slice(0, 110), description: r.summary, url: abs(`/resources/${r.slug}`), mainEntityOfPage: abs(`/resources/${r.slug}`),
    datePublished: r.publishedAt, dateModified: r.updatedAt, inLanguage: "en-IN", image: [abs(`/og/resources/${r.slug}`)],
    author: { "@type": "Organization", name: SITE.name, url: SITE.url }, publisher: { "@id": `${SITE.url}/#organization` },
  };
  if (r.type === "glossary") return {
    "@context": CTX, "@type": "DefinedTerm", name: r.title.replace(/^What (is|are) (an? )?/i, "").replace(/\?$/, ""), description: r.answer, url: abs(`/resources/${r.slug}`),
    inDefinedTermSet: { "@type": "DefinedTermSet", name: `${SITE.name} glossary`, url: abs("/resources") },
  };
  return { ...common, "@type": r.type === "technical" ? "TechArticle" : "Article" };
};

/** Lightweight structural validation used by scripts/audit-site.ts (no network; Google's Rich Results Test is the final check). */
export function validateJsonLd(node: Record<string, any>): string[] {
  const errs: string[] = []; const t = node["@type"];
  if (node["@context"] !== CTX && !node["@graph"]) errs.push("missing @context");
  const need: Record<string, string[]> = {
    Organization: ["name", "url", "logo"], WebSite: ["name", "url"], BreadcrumbList: ["itemListElement"], Product: ["name", "description"],
    WebPage: ["name", "url"], CollectionPage: ["name", "url"], ItemList: ["itemListElement"], Article: ["headline", "datePublished", "dateModified", "author"],
    TechArticle: ["headline", "datePublished", "dateModified", "author"], DefinedTerm: ["name", "description"],
  };
  if (!need[t]) errs.push(`unexpected @type ${t}`); else for (const k of need[t]) if (node[k] == null) errs.push(`${t}: missing ${k}`);
  if (t === "Product" && node.offers) errs.push("Product: offers present but prices are indicative");
  if (t === "Product" && (node.aggregateRating || node.review)) errs.push("Product: ratings/reviews must never be invented");
  if (t === "FAQPage") errs.push("FAQPage is not used on this site");
  if (t === "BreadcrumbList") (node.itemListElement ?? []).forEach((e: any, i: number) => { if (e.position !== i + 1 || !e.name || !String(e.item).startsWith("http")) errs.push(`Breadcrumb item ${i + 1} invalid`); });
  return errs;
}
