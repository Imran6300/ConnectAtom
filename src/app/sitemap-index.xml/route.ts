import { getSite } from "@/lib/catalogue/site";
import { sitemapIndex } from "@/lib/seo/sitemap";

// Always generate on request. The vinext/R2 response cache was serving a cached EMPTY body (Content-Length: 0) for this URL, which Search Console reports as "Couldn't fetch".
export const dynamic = "force-dynamic";
// Submit this one URL in Search Console. Child sitemaps are listed automatically from the registry, so a new page family or chunk appears with no edit here.
export async function GET() {
  const site = await getSite();
  return new Response(sitemapIndex(site.rows), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=300" } });
}
