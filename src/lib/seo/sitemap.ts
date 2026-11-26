import { SITE } from "@/lib/site";
import type { Family, PageRow } from "@/lib/catalogue/site";

export const CHUNK = 5000; // a sitemap file may hold 50,000 URLs / 50 MB; chunking at 5,000 means nothing changes at 10x size
export const FAMILIES: Family[] = ["pages", "products", "industries", "combinations", "applications", "resources"];
export const sitemapName = (f: Family, chunk: number) => `sitemap-${f}${chunk > 0 ? `-${chunk + 1}` : ""}.xml`;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const loc = (url: string) => `${SITE.url}${url === "/" ? "" : url}`;

/** Only canonical, indexable, published rows, sorted by URL so output is stable and diffable. */
export const rowsFor = (rows: PageRow[], f: Family) => rows.filter((r) => r.family === f && r.indexable).sort((a, b) => a.url.localeCompare(b.url));

export function urlset(rows: PageRow[]) {
  const body = rows.map((r) => `<url><loc>${esc(loc(r.url))}</loc><lastmod>${r.lastmod}</lastmod></url>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}
export function sitemapIndex(rows: PageRow[]) {
  const entries: string[] = [];
  for (const f of FAMILIES) {
    const list = rowsFor(rows, f);
    for (let c = 0; c * CHUNK < list.length; c++) {
      const part = list.slice(c * CHUNK, (c + 1) * CHUNK);
      const lm = part.reduce((m, r) => (r.lastmod > m ? r.lastmod : m), "0000");
      entries.push(`<sitemap><loc>${esc(`${SITE.url}/${sitemapName(f, c)}`)}</loc><lastmod>${lm}</lastmod></sitemap>`);
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}</sitemapindex>`;
}
