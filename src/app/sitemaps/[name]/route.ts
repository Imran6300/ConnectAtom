import { getSite } from "@/lib/catalogue/site";
import { CHUNK, FAMILIES, rowsFor, urlset } from "@/lib/seo/sitemap";
import type { Family } from "@/lib/catalogue/site";

// Always generate on request. The vinext/R2 response cache was serving a cached EMPTY body (Content-Length: 0) for this URL, which Search Console reports as "Couldn't fetch".
export const dynamic = "force-dynamic";
// next.config rewrites /sitemap-products.xml and /sitemap-products-2.xml to /sitemaps/products and /sitemaps/products-2.
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const m = (await params).name.match(/^([a-z]+)(?:-(\d+))?$/);
  const family = m?.[1] as Family | undefined; const chunk = m?.[2] ? Number(m[2]) - 1 : 0;
  if (!family || !FAMILIES.includes(family) || chunk < 0) return new Response("Not found", { status: 404 });
  const list = rowsFor((await getSite()).rows, family).slice(chunk * CHUNK, (chunk + 1) * CHUNK);
  if (!list.length) return new Response("Not found", { status: 404 });
  return new Response(urlset(list), { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, s-maxage=300" } });
}
