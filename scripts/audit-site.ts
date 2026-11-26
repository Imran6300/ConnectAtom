// Crawls a RUNNING server and checks every indexable URL. Usage: BASE=http://localhost:3000 npx tsx scripts/audit-site.ts
// Checks: sitemap XML, 200s, unique title/description, one H1, self canonical, JSON-LD parse+validate, images have alt,
// internal links resolve, links point at indexable pages, no URL in two sitemaps, orphans, click depth <= 3.
import { validateJsonLd } from "../src/lib/seo/jsonld";
const BASE = (process.env.BASE ?? "http://localhost:3000").replace(/\/$/, "");
const errs: string[] = []; const warn: string[] = [];
const get = async (p: string) => { const r = await fetch(BASE + p, { redirect: "manual" }); return { s: r.status, t: await r.text(), h: r.headers }; };
const locs = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));

async function main() {
  const idx = await get("/sitemap-index.xml");
  if (idx.s !== 200 || !idx.t.startsWith("<?xml")) errs.push(`sitemap-index: ${idx.s}`);
  const maps = locs(idx.t).map((u) => new URL(u).pathname);
  const urls = new Map<string, string>();
  for (const m of maps) {
    const r = await get(m); if (r.s !== 200) { errs.push(`${m}: ${r.s}`); continue; }
    for (const u of locs(r.t)) { const p = new URL(u).pathname; if (urls.has(p)) errs.push(`duplicate across sitemaps: ${p} (${urls.get(p)} and ${m})`); urls.set(p, m); }
  }
  console.log(`sitemaps: ${maps.length}, urls: ${urls.size}`);
  const titles = new Map<string, string>(), descs = new Map<string, string>(); const graph = new Map<string, Set<string>>();
  for (const p of urls.keys()) {
    const r = await get(p); if (r.s !== 200) { errs.push(`${p}: status ${r.s}`); continue; }
    const h = r.t;
    const title = h.match(/<title>([^<]*)<\/title>/)?.[1]; const desc = h.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (!title) errs.push(`${p}: no title`); else if (titles.has(title)) errs.push(`${p}: duplicate title with ${titles.get(title)}`); else titles.set(title, p);
    if (!desc) errs.push(`${p}: no description`); else if (descs.has(desc)) errs.push(`${p}: duplicate description with ${descs.get(desc)}`); else descs.set(desc, p);
    if (title && title.length > 70) warn.push(`${p}: title ${title.length} chars`);
    if (desc && desc.length > 175) warn.push(`${p}: description ${desc.length} chars`);
    if (!canon || new URL(canon).pathname !== p) errs.push(`${p}: canonical ${canon}`);
    if (/noindex/.test(h.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "")) errs.push(`${p}: in sitemap but noindex`);
    const h1 = (h.match(/<h1[\s>]/g) ?? []).length; if (h1 !== 1) errs.push(`${p}: ${h1} h1`);
    for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try { const j = JSON.parse(m[1].replace(/\\u003c/g, "<")); for (const n of [].concat(j)) for (const e of validateJsonLd(n)) errs.push(`${p}: jsonld ${e}`); } catch { errs.push(`${p}: invalid JSON-LD`); }
    }
    for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/ alt="/.test(m[0])) errs.push(`${p}: img without alt`);
    const out = new Set<string>();
    for (const m of h.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) if (!m[1].startsWith("/_next") && !/\.(svg|png|webp|jpg|xml|ico|pdf)$/.test(m[1])) out.add(m[1].replace(/(.)\/$/, "$1"));
    graph.set(p, out);
  }
  // link targets
  const checked = new Map<string, number>();
  for (const [p, out] of graph) for (const t of out) {
    if (!checked.has(t)) checked.set(t, (await get(t)).s);
    const s = checked.get(t)!; if (s >= 400) errs.push(`${p}: broken link ${t} (${s})`); else if (s >= 300) warn.push(`${p}: link ${t} redirects (${s})`);
  }
  // click depth and orphans
  const depth = new Map<string, number>([["/", 0]]); const q = ["/"];
  while (q.length) { const c = q.shift()!; for (const t of graph.get(c) ?? []) if (!depth.has(t) && urls.has(t)) { depth.set(t, depth.get(c)! + 1); q.push(t); } }
  for (const p of urls.keys()) { if (!depth.has(p)) errs.push(`orphan (unreachable by links): ${p}`); else if (depth.get(p)! > 3) warn.push(`${p}: click depth ${depth.get(p)}`); }
  const robots = await get("/robots.txt"); if (!/Sitemap:\s*\S+sitemap-index\.xml/.test(robots.t)) errs.push("robots.txt has no sitemap-index line");
  const nf = await get("/products/this-does-not-exist"); if (nf.s !== 404) errs.push(`unknown product returns ${nf.s}, expected 404`);
  console.log(`warnings (${warn.length})`); warn.slice(0, 40).forEach((w) => console.log("  warn", w));
  console.log(`errors (${errs.length})`); errs.slice(0, 80).forEach((e) => console.log("  ERR ", e));
  process.exit(errs.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
