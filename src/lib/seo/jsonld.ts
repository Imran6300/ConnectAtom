import { SITE, abs } from "@/lib/site";
import type { Product } from "@/content/products";

export const organization = () => ({ "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/logo/connectatom-icon-color.svg`, description: SITE.boilerplate });
export const website = () => ({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url });
export const breadcrumbList = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })),
});
// No `offers`: prices are indicative, and Offer markup is only for a real, current public price. Never invent ratings.
export const productLd = (p: Product) => ({ "@context": "https://schema.org", "@type": "Product", name: p.brandName, model: p.modelCode, description: p.summary, brand: { "@type": "Brand", name: SITE.name }, url: abs(`/products/${p.slug}`) });
