import { getSite } from "@/lib/catalogue/site";
import { sitemapIndex } from "@/lib/seo/sitemap";

export const revalidate = 3600;
// Submit this one URL in Search Console. Child sitemaps are listed automatically from the registry, so a new page family or chunk appears with no edit here.
export async function GET() {
  const site = await getSite();
  return new Response(sitemapIndex(site.rows), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
