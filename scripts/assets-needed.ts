// Lists every image slot with no real file yet, so you know exactly which photos to supply.
// Usage: npx tsx scripts/assets-needed.ts > docs/ASSETS_NEEDED.md
import { STATIC_CATALOGUE as C } from "../src/content/catalogue";
const rows: string[] = ["# Assets needed", "", "Slots render an original illustration until a file is supplied. Put files under /public and set `src` in the record.", "",
  "| Record | Slot | Size | What to shoot |", "|---|---|---|---|"];
for (const p of C.products) {
  if (!p.images.hero?.src) rows.push(`| product: ${p.slug} | hero / device | 1200x900 (WebP, <150 KB) | ${p.brandName} on a clean background, probe and gateway visible |`);
  rows.push(`| product: ${p.slug} | installed | 1200x900 | ${p.name} installed at a real site (${p.buyers[0]}) |`);
  rows.push(`| product: ${p.slug} | dashboard | 1200x750 | Real dashboard screenshot (replace the sample card) |`);
}
for (const i of C.industries) rows.push(`| industry: ${i.slug} | hero | 1600x1000 | Real ${i.name.toLowerCase()} site, no faces, no brand marks |`);
console.log(rows.join("\n"));
const missing = C.products.reduce((n, p) => n + p.missing.length, 0);
console.log(`\n## Product information still missing (${missing} items)\n`);
for (const p of C.products) if (p.missing.length) console.log(`### ${p.name}\n${p.missing.map((m) => `- ${m}`).join("\n")}\n`);
console.log("## Industry claims needing a citation\n");
for (const i of C.industries) if (i.sourcesNeeded.length) console.log(`### ${i.name}\n${i.sourcesNeeded.map((m) => `- ${m}`).join("\n")}\n`);
