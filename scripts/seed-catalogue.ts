// Idempotent seed: upserts the static catalogue into MongoDB, keyed by slug (fits by productSlug+industrySlug).
// Usage: MONGODB_URI=... npx tsx scripts/seed-catalogue.ts [--dry]
import { STATIC_CATALOGUE } from "../src/content/catalogue";
import { MODELS, connect } from "../src/lib/catalogue/models";

const keyOf: Record<string, (d: any) => object> = {
  products: (d) => ({ slug: d.slug }), industries: (d) => ({ slug: d.slug }), applications: (d) => ({ slug: d.slug }), resources: (d) => ({ slug: d.slug }),
  fits: (d) => ({ productSlug: d.productSlug, industrySlug: d.industrySlug }), redirects: (d) => ({ from: d.from }),
};
async function main() {
  const dry = process.argv.includes("--dry");
  if (!dry) await connect();
  for (const [name, model] of Object.entries(MODELS)) {
    const docs = (STATIC_CATALOGUE as any)[name] as any[];
    console.log(`${name}: ${docs.length} documents`);
    if (dry || !docs.length) continue;
    await model.syncIndexes();
    const res = await model.bulkWrite(docs.map((d) => ({ replaceOne: { filter: keyOf[name](d), replacement: d, upsert: true } })), { ordered: false });
    console.log(`  upserted ${res.upsertedCount}, modified ${res.modifiedCount}, matched ${res.matchedCount}`);
  }
  if (!dry) { const m = await connect(); await m.disconnect(); }
}
main().catch((e) => { console.error(e); process.exit(1); });
