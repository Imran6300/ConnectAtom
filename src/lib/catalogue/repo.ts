// Repository: ONE place that decides where catalogue records come from.
//   CONTENT_SOURCE=static (default)  src/content/catalogue (builds and runs with no database)
//   CONTENT_SOURCE=mongo             MongoDB: one indexed query per collection, validated through zod, cached with tag "catalogue"
// Pages never talk to a source directly; they call getSite() (site.ts). Add records in MongoDB, call /api/revalidate, and new pages appear.
import { unstable_cache } from "next/cache";
import type { ZodTypeAny } from "zod";
import { ProductSchema, IndustrySchema, FitSchema, ApplicationSchema, ResourceSchema, RedirectSchema, type Catalogue } from "./types";
import { STATIC_CATALOGUE } from "@/content/catalogue";

export const CATALOGUE_TAG = "catalogue";
export const contentSource = () => (process.env.CONTENT_SOURCE === "mongo" ? "mongo" : "static") as "mongo" | "static";

function clean<T>(rows: unknown[], schema: ZodTypeAny, label: string, report: string[]): T[] {
  const out: T[] = [];
  for (const r of rows) {
    const res = schema.safeParse(r);
    if (res.success) out.push(res.data as T);
    else report.push(`${label} ${(r as { slug?: string })?.slug ?? ""}: ${res.error.issues.slice(0, 3).map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`);
  }
  return out;
}

async function loadFromMongo(): Promise<Catalogue> {
  const { connect, MODELS } = await import("./models");
  await connect();
  // Full documents are needed to render pages; at ~thousands of records this is a few MB. If bodies grow past that, project heavy fields out here and fetch them per page.
  const [products, industries, fits, applications, resources, redirects] = await Promise.all(
    (["products", "industries", "fits", "applications", "resources", "redirects"] as const).map((k) => MODELS[k].find({}, { _id: 0 }).lean().exec()),
  );
  const bad: string[] = [];
  const cat: Catalogue = {
    products: clean(products, ProductSchema, "product", bad), industries: clean(industries, IndustrySchema, "industry", bad), fits: clean(fits, FitSchema, "fit", bad),
    applications: clean(applications, ApplicationSchema, "application", bad), resources: clean(resources, ResourceSchema, "resource", bad), redirects: clean(redirects, RedirectSchema, "redirect", bad),
  };
  // Invalid documents are excluded from the build instead of breaking it, and reported loudly.
  if (bad.length) console.error(`[catalogue] ${bad.length} invalid document(s) skipped:\n - ${bad.join("\n - ")}`);
  return cat;
}

const cachedMongo = unstable_cache(loadFromMongo, ["catalogue-v2"], { tags: [CATALOGUE_TAG], revalidate: 600 });

export async function loadCatalogue(): Promise<Catalogue> {
  return contentSource() === "mongo" ? cachedMongo() : STATIC_CATALOGUE;
}
