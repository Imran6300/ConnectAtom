# ConnectAtom V2: how it fits together

**Data contract:** `src/lib/catalogue/types.ts` (zod). Same schemas validate static content and MongoDB documents (`models.ts` pre-validate hook).
**Switch source:** `CONTENT_SOURCE=static` (default, files in `src/content/catalogue`) or `mongo` (`MONGODB_URI`). Seed once: `npm run seed:catalogue`.
**Adding 500+ pages:** insert records (industries, applications, resources, fits) in MongoDB with `status: "live"`, then `POST /api/revalidate` with header `x-revalidate-secret`. Pages render on first request (`dynamicParams`), appear in the right sitemap, breadcrumbs, related links and menus. No template edits.
**Quality gate:** `src/lib/catalogue/site.ts` builds the page registry. A page is indexable only if it has enough unique words (`MIN_WORDS`), is not noindex, has a self canonical, and (industry x product pairs) passes `src/lib/seo/gate.ts`. Others return noindex and stay out of sitemaps. See `/admin/pages`.
**Sitemaps:** `/sitemap-index.xml` -> `/sitemap-{pages,products,industries,combinations,applications,resources}.xml`, chunked at 5000 URLs.
**Checks:** `npm run validate:content` (content), `npx tsc --noEmit`, `next build`, then `BASE=http://localhost:3000 npm run audit:site` against a running server. `npx tsx scripts/assets-needed.ts > docs/ASSETS_NEEDED.md` lists photos and missing facts to supply.
