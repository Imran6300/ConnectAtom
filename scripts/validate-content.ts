// Validate authored content files against the catalogue schemas.
// Usage: npx tsx scripts/validate-content.ts <file.ts> [<file.ts> ...]     (a file's default export: one record or an array)
//        npx tsx scripts/validate-content.ts --all                          (the whole static catalogue + relation integrity)
import path from "node:path";
import { ProductSchema, IndustrySchema, ApplicationSchema, ResourceSchema, FitSchema, TAG_VOCAB } from "../src/lib/catalogue/types";

const BANNED = ["cutting-edge", "revolutionary", "next-gen", "seamless", "synergy", "game-changing", "world-class", "state-of-the-art", "empower", "unlock", "holistic", "robust solution", "best-in-class", "leverage", "paradigm", "turnkey", "ecosystem"];
const FORBIDDEN_PATTERNS: [RegExp, string][] = [
  [/\b(ISO|IEC|IS)\s?\d{3,6}\b/i, "names a standard number (needs a source: add to sourcesNeeded instead)"],
  [/\b(WHO|FSSAI|CDSCO|GDP|HACCP|NABL|NABH|FDA)\b/, "names a regulator or scheme (needs a source: add to sourcesNeeded instead)"],
  [/\b\d{2,3}%\s+(of|reduction|savings?|less|more|faster)\b/i, "contains a statistic (no invented numbers)"],
  [/\b(guarantee[sd]?|certified|compliant with)\b/i, "promise or certification language (brand rule: say what we do and do not)"],
];
const wc = (s: string) => s.split(/\s+/).filter(Boolean).length;
const flat = (o: unknown): string[] => typeof o === "string" ? [o] : Array.isArray(o) ? o.flatMap(flat) : o && typeof o === "object" ? Object.values(o).flatMap(flat) : [];

async function main() {
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  let bad = 0;
  for (const f of files) {
    const mod = await import(path.resolve(f));
    const recs: any[] = [].concat(mod.default ?? []);
    for (const r of recs) {
      const kind = f.includes("/products/") ? "product" : f.includes("/industries/") ? "industry" : f.includes("applications") ? "application" : f.includes("/resources/") ? "resource" : "fit";
      const schema = { product: ProductSchema, industry: IndustrySchema, application: ApplicationSchema, resource: ResourceSchema, fit: FitSchema }[kind];
      const res = schema.safeParse(r);
      const text = flat(r).join(" ");
      const label = `${kind}:${r.slug ?? r.productSlug}`;
      const issues: string[] = [];
      if (!res.success) for (const i of res.error.issues.slice(0, 12)) issues.push(`schema ${i.path.join(".")}: ${i.message}`);
      for (const w of BANNED) if (new RegExp(`\\b${w}\\b`, "i").test(text)) issues.push(`banned word: ${w}`);
      const sentences = text.split(/(?<=[.?!])\s+/);
      for (const [re, why] of FORBIDDEN_PATTERNS) {
        const hit = sentences.find((x) => re.test(x) && !(why.startsWith("promise") && /\b(not|never|no|n't|cannot|without)\b/i.test(x) || x.trim().endsWith("?")));
        if (hit) issues.push(`"${hit.match(re)![0]}" ${why}`);
      }
      for (const t of (r.tags ?? []) as string[]) if (!(TAG_VOCAB as readonly string[]).includes(t)) issues.push(`tag not in vocabulary: ${t}`);
      if (/!!|\bALERT!/.test(text)) issues.push("alarmist punctuation");
      console.log(`${issues.length ? "FAIL" : "ok  "} ${label}  (${wc(text)} words)`);
      for (const i of issues) console.log(`     - ${i}`);
      if (issues.length) bad++;
    }
  }
  if (bad) { console.error(`\n${bad} record(s) with issues`); process.exit(1); }
}
main();
