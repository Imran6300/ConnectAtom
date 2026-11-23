import { indexableRows } from "@/lib/seo/registry";
import { SITE } from "@/lib/site";

// Next does not generate a sitemap index. This lists each chunk; submit this one URL in Search Console.
export function GET() {
  const n = Math.max(1, Math.ceil(indexableRows().length / 5000));
  const xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Array.from({ length: n }, (_, i) => `<sitemap><loc>${SITE.url}/sitemap/${i}.xml</loc></sitemap>`).join("")}</sitemapindex>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
