// MongoDB models. Key fields are typed and INDEXED here; the full document is validated by the zod schemas in types.ts
// (pre-validate hook), so a record that would break a page can never be saved.
// Relations are slug arrays with multikey indexes, so "all products for industry X" is one indexed query and needs no populate().
import mongoose, { Schema, type Model } from "mongoose";
import type { ZodTypeAny } from "zod";
import { ProductSchema, IndustrySchema, FitSchema, ApplicationSchema, ResourceSchema, RedirectSchema } from "./types";

type Idx = [Record<string, 1 | -1 | "text">, mongoose.IndexOptions?][];

function make(name: string, collection: string, zod: ZodTypeAny, fields: Record<string, unknown>, indexes: Idx): Model<any> {
  if (mongoose.models[name]) return mongoose.models[name];
  const schema = new Schema({ ...fields }, { collection, strict: false, minimize: false, timestamps: false, versionKey: false });
  schema.pre("validate", function (next) {
    const res = zod.safeParse(this.toObject({ depopulate: true }));
    if (!res.success) return next(new Error(`${name} failed catalogue validation: ${res.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ")}`));
    next();
  });
  for (const [spec, opts] of indexes) schema.index(spec, opts);
  return mongoose.model(name, schema);
}

const status = { type: String, enum: ["draft", "review", "live", "archived"], default: "draft", required: true };
const slug = { type: String, required: true, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, lowercase: true, trim: true };
const strArr = { type: [String], default: [] };
const upd = { type: String, required: true };

export const ProductModel = make("Product", "products", ProductSchema, {
  num: { type: Number, required: true }, slug, status, sector: String, tags: strArr, tier: Number, availability: String, updatedAt: upd,
}, [[{ slug: 1 }, { unique: true }], [{ num: 1 }, { unique: true }], [{ status: 1, sector: 1 }], [{ tags: 1 }], [{ name: "text", summary: "text" }]]);

export const IndustryModel = make("Industry", "industries", IndustrySchema, {
  slug, status, sector: String, productSlugs: strArr, tags: strArr, wave: Number, updatedAt: upd,
}, [[{ slug: 1 }, { unique: true }], [{ status: 1, sector: 1 }], [{ productSlugs: 1 }], [{ tags: 1 }]]);

export const FitModel = make("ProductIndustryFit", "productIndustryFits", FitSchema, {
  productSlug: { ...slug }, industrySlug: { ...slug }, status, fitScore: Number, updatedAt: upd,
}, [[{ productSlug: 1, industrySlug: 1 }, { unique: true }], [{ industrySlug: 1, status: 1 }], [{ productSlug: 1, status: 1 }]]);

export const ApplicationModel = make("Application", "applications", ApplicationSchema, {
  slug, status, productSlugs: strArr, industrySlugs: strArr, tags: strArr, updatedAt: upd,
}, [[{ slug: 1 }, { unique: true }], [{ productSlugs: 1 }], [{ industrySlugs: 1 }], [{ status: 1 }]]);

export const ResourceModel = make("Resource", "resources", ResourceSchema, {
  slug, status, type: String, productSlugs: strArr, industrySlugs: strArr, applicationSlugs: strArr, tags: strArr, updatedAt: upd, publishedAt: String,
}, [[{ slug: 1 }, { unique: true }], [{ type: 1, status: 1 }], [{ productSlugs: 1 }], [{ industrySlugs: 1 }], [{ applicationSlugs: 1 }], [{ tags: 1 }], [{ title: "text", answer: "text" }]]);

export const RedirectModel = make("Redirect", "redirects", RedirectSchema, {
  from: { type: String, required: true }, to: { type: String, required: true }, status: { type: Number, default: 301 },
}, [[{ from: 1 }, { unique: true }]]);

export const MODELS = { products: ProductModel, industries: IndustryModel, fits: FitModel, applications: ApplicationModel, resources: ResourceModel, redirects: RedirectModel } as const;

/** One cached connection per server process (also survives dev hot reloads). */
const g = globalThis as unknown as { __caMongo?: Promise<typeof mongoose> };
export function connect(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set (CONTENT_SOURCE=mongo needs it)");
  g.__caMongo ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 8000, maxPoolSize: 5, autoIndex: process.env.MONGO_AUTO_INDEX === "true" });
  return g.__caMongo;
}
