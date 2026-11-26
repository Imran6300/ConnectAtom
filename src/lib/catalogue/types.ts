// ConnectAtom catalogue: the single data contract.
// Every public page is a view of one record here (or a valid combination of records).
// The same zod schemas validate static content (scripts/validate-content.ts) and MongoDB documents (repo/mongo.ts).
// Relations are SLUG references, not ObjectIds: slugs are fixed once published, URL-safe, and need no populate() round-trips.
import { z } from "zod";

/* ------------------------------------------------------------------ vocab */

export const SECTORS = ["cold-chain", "healthcare", "food-service", "agriculture", "industrial", "facilities", "logistics"] as const;
export type SectorKey = (typeof SECTORS)[number];

/** Illustrated scenes (SVG, original artwork, see components/visuals/scenes.tsx). */
export const SCENES = [
  "cold-room", "medical-fridge", "kitchen", "warehouse", "server-room", "greenhouse", "poultry-shed",
  "pond", "farm-field", "water-tank", "factory-floor", "truck", "building", "dairy-cooler", "hospital-ward",
] as const;
export type SceneKey = (typeof SCENES)[number];

/** Illustrated device art (see components/visuals/devices.tsx). */
export const DEVICES = [
  "gateway-probe", "climate-node", "server-node", "door-sensor", "leak-rope", "tank-level", "clamp-meter",
  "vibration-puck", "air-quality", "soil-stake", "water-probe", "gps-tracker", "counter-sensor",
] as const;
export type DeviceKey = (typeof DEVICES)[number];

/** Lifecycle of any public record. Only `live` records produce pages. `archived` keeps its URL and redirects. */
export const STATUSES = ["draft", "review", "live", "archived"] as const;
export type Status = (typeof STATUSES)[number];

/** Honest availability, shown on the page. Nothing says "available" unless ConnectAtom can pilot or sell it today. */
export const AVAILABILITY = ["available", "pilot-ready", "in-development"] as const;
export type Availability = (typeof AVAILABILITY)[number];

/** Spec honesty. `confirmed` = verified on a built unit or supplier datasheet. `design-target` = the planned starting choice from the product playbook. `to-confirm` = unknown, must be supplied. */
export const SPEC_STATUS = ["confirmed", "design-target", "to-confirm"] as const;

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: lowercase letters, digits, single hyphens");
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/, "ISO date");
const titleBody = z.object({ title: z.string().min(3), body: z.string().min(20) });
const faq = z.object({ q: z.string().min(8), a: z.string().min(20) });

/* ------------------------------------------------------------------ shared */

export const SeoFieldsSchema = z.object({
  titleOverride: z.string().max(70).optional(),
  descriptionOverride: z.string().max(170).optional(),
  canonicalOverride: z.string().startsWith("/").optional(), // path only; must be a live page
  noindex: z.boolean().optional(),
  ogImage: z.string().startsWith("/").optional(), // path under /public, 1200x630
  keywords: z.array(z.string()).optional(), // internal planning only; never rendered as meta keywords
});
export type SeoFields = z.infer<typeof SeoFieldsSchema>;

export const ImageSchema = z.object({
  src: z.string().startsWith("/").optional(), // absent = placeholder (an illustration is shown and the asset is listed in ASSETS_NEEDED)
  alt: z.string().min(8),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  kind: z.enum(["photo", "illustration", "diagram", "screenshot"]),
  caption: z.string().optional(),
  credit: z.string().optional(),
});
export type CatalogueImage = z.infer<typeof ImageSchema>;

const Meta = {
  status: z.enum(STATUSES),
  updatedAt: isoDate, // last MEANINGFUL content change (drives sitemap lastmod); never the build time
  seo: SeoFieldsSchema.optional(),
};

/* ------------------------------------------------------------------ product */

export const ProductSchema = z.object({
  num: z.number().int().min(1).max(999),
  slug,
  name: z.string().min(3),
  brandName: z.string().min(3), // "ConnectAtom Cold Room"
  modelCode: z.string().regex(/^CA-[A-Z0-9]{3,4}$/, "model code like CA-CR1"),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  phase: z.enum(["launch", "expand", "later"]),
  availability: z.enum(AVAILABILITY),
  sector: z.enum(SECTORS), // drives the hero composition, accent and signature module
  scene: z.enum(SCENES),
  device: z.enum(DEVICES),
  headline: z.string().min(3), // title pattern: "{name} with {headline}"
  tagline: z.string().min(10), // hero line, brand voice, numbers over adjectives
  summary: z.string().min(100).max(170), // meta description
  overview: z.array(z.string().min(60)).min(2).max(4),
  problem: z.string().min(80),
  buyers: z.array(z.string()).min(2),
  how: z.array(titleBody).min(3).max(5), // working principle, in order
  hardware: z.object({ sensors: z.array(z.string()).min(1), connectivity: z.array(z.string()).min(1), power: z.string() }),
  specs: z.array(z.object({
    group: z.string().optional(), label: z.string(), value: z.string(),
    status: z.enum(SPEC_STATUS), note: z.string().optional(),
  })).min(6),
  features: z.array(titleBody).min(4),
  benefits: z.array(titleBody).min(3).max(6),
  applications: z.array(titleBody).min(3).max(6),
  protocols: z.array(z.object({ name: z.string(), role: z.string() })).min(2),
  integrations: z.array(z.object({ name: z.string(), note: z.string() })).min(2),
  tags: z.array(z.string()).min(3), // technology/topic tags: drive related-product scoring and related guides
  docs: z.array(z.object({
    title: z.string(), kind: z.enum(["datasheet", "install-guide", "sample-report", "calibration", "manual"]),
    status: z.enum(["available", "on-request", "planned"]), href: z.string().startsWith("/").optional(),
  })).min(1),
  pricing: z.object({ hardwareFromInr: z.number(), hardwareToInr: z.number(), monthlyInr: z.number().optional(), monthlyNote: z.string().optional(), showPublic: z.boolean() }),
  alertExample: z.string().min(20),
  reportName: z.string(),
  deviceTypeKey: z.string().optional(),
  watchOut: z.array(z.string()).min(1), // honest limits, from the playbook "Watch out" row
  faqs: z.array(faq).min(3),
  relatedProductSlugs: z.array(slug).optional(), // manual pins; the link graph adds scored suggestions around them
  images: z.object({ hero: ImageSchema.optional(), gallery: z.array(ImageSchema) }),
  missing: z.array(z.string()), // information NOT yet supplied. Shown to the founder in the audit report, never invented.
  reviewedAt: isoDate.optional(),
  ...Meta,
});
export type Product = z.infer<typeof ProductSchema>;

/* ------------------------------------------------------------------ industry */

export const SampleRowSchema = z.object({ time: z.string().optional(), label: z.string(), value: z.string().optional(), state: z.enum(["ok", "warn", "crit"]).optional() });
export const IndustrySchema = z.object({
  slug,
  name: z.string().min(3),
  sector: z.enum(SECTORS),
  wave: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  scene: z.enum(SCENES),
  productSlugs: z.array(slug).min(1), // ordered by relevance; the page lists them all
  tagline: z.string().min(10),
  summary: z.string().min(100).max(170), // meta description
  overview: z.array(z.string().min(60)).min(2).max(3),
  explainer: z.array(titleBody).min(2).max(4), // "how this industry works": detailed explanation
  challenges: z.array(titleBody).min(4).max(6),
  solutions: z.array(titleBody).min(4).max(6), // how IoT monitoring answers the challenges
  applications: z.array(titleBody).min(4).max(6),
  benefits: z.array(titleBody).min(3).max(5),
  technologies: z.array(z.object({ name: z.string(), note: z.string() })).min(3),
  checklist: z.array(z.string()).min(4),
  faqs: z.array(faq).min(4),
  sample: z.object({ title: z.string(), caption: z.string(), rows: z.array(SampleRowSchema).min(4).max(8) }), // labelled SAMPLE on the page
  tags: z.array(z.string()).min(3),
  relatedIndustrySlugs: z.array(slug).optional(),
  sourcesNeeded: z.array(z.string()), // claims that need a citation before they may be stated (standards, rules)
  ...Meta,
});
export type Industry = z.infer<typeof IndustrySchema>;

/* ------------------------------------------------------------------ fit (industry x product) */

export const FitSchema = z.object({
  productSlug: slug,
  industrySlug: slug,
  fitScore: z.number().int().min(0).max(5),
  angle: z.string(),
  problem: z.string(),
  setup: z.string(),
  thresholds: z.array(z.object({ label: z.string(), rule: z.string() })).optional(),
  reportTemplate: z.string().optional(),
  failureScenario: z.string().optional(),
  exampleAlert: z.string().optional(),
  hardwareVariant: z.string().optional(),
  installNotes: z.string().optional(),
  planRecommendation: z.string().optional(),
  proof: z.array(z.object({ kind: z.enum(["sample", "pilot", "photo", "reviewer"]), label: z.string() })).optional(),
  status: z.enum(STATUSES),
  updatedAt: isoDate,
  seo: SeoFieldsSchema.optional(),
});
export type Fit = z.infer<typeof FitSchema>;

/* ------------------------------------------------------------------ application */

export const ApplicationSchema = z.object({
  slug,
  name: z.string().min(5), // "Power-cut alerts for cold rooms and server rooms"
  job: z.string().min(20), // the job to be done, one line
  summary: z.string().min(100).max(170),
  overview: z.array(z.string().min(60)).min(2).max(3),
  steps: z.array(titleBody).min(3).max(6), // how ConnectAtom does it, step by step
  config: z.array(z.object({ label: z.string(), value: z.string() })).min(3), // example configuration (starting values)
  alertExample: z.string().min(20),
  productSlugs: z.array(slug).min(1),
  industrySlugs: z.array(slug).min(1),
  tags: z.array(z.string()).min(2),
  faqs: z.array(faq).min(3),
  ...Meta,
});
export type Application = z.infer<typeof ApplicationSchema>;

/* ------------------------------------------------------------------ resource (guide, comparison, technical, glossary) */

export const ResourceSectionSchema = z.object({
  heading: z.string().min(4),
  body: z.array(z.string().min(30)).min(1),
  list: z.array(z.string()).optional(),
  table: z.object({ head: z.array(z.string()).min(2), rows: z.array(z.array(z.string())).min(1) }).optional(),
});
export const ResourceSchema = z.object({
  slug,
  type: z.enum(["guide", "comparison", "technical", "research", "glossary"]),
  title: z.string().min(10), // the question or task plus the answer in a few words
  answer: z.string().min(60), // two-sentence answer first
  summary: z.string().min(100).max(170),
  sections: z.array(ResourceSectionSchema).min(1),
  sources: z.array(z.object({ title: z.string(), url: z.string().url().optional() })), // empty = no external sources cited (flagged)
  productSlugs: z.array(slug),
  industrySlugs: z.array(slug),
  applicationSlugs: z.array(slug),
  relatedResourceSlugs: z.array(slug).optional(),
  tags: z.array(z.string()).min(2),
  author: z.object({ name: z.string(), role: z.string() }),
  reviewer: z.object({ name: z.string(), role: z.string() }).optional(), // absent = not yet technically reviewed (shown as such)
  readMinutes: z.number().int().min(1).max(30),
  publishedAt: isoDate,
  ...Meta,
});
export type Resource = z.infer<typeof ResourceSchema>;

/* ------------------------------------------------------------------ redirects */

export const RedirectSchema = z.object({
  from: z.string().startsWith("/"), to: z.string().startsWith("/"),
  status: z.union([z.literal(301), z.literal(308)]).default(301), reason: z.string().optional(),
});
export type Redirect = z.infer<typeof RedirectSchema>;

/* ------------------------------------------------------------------ whole catalogue */

export type Catalogue = {
  products: Product[]; industries: Industry[]; fits: Fit[]; applications: Application[]; resources: Resource[]; redirects: Redirect[];
};

export const SECTOR_META: Record<SectorKey, { label: string; blurb: string }> = {
  "cold-chain": { label: "Cold chain", blurb: "Cold rooms, chillers and frozen stock" },
  healthcare: { label: "Healthcare and pharma", blurb: "Vaccines, medicines, blood and samples" },
  "food-service": { label: "Food service and retail", blurb: "Kitchens, bakeries, hotels and stores" },
  agriculture: { label: "Agriculture and allied", blurb: "Greenhouses, poultry, ponds and fields" },
  industrial: { label: "Industry and utilities", blurb: "Machines, pumps and production lines" },
  facilities: { label: "Buildings and facilities", blurb: "Server rooms, schools, apartments and gyms" },
  logistics: { label: "Logistics and transport", blurb: "Godowns, warehouses and reefer trucks" },
};

/** Controlled tag vocabulary. Tags drive related-product scoring and guide/application matching, so use these exact words. */
export const TAG_VOCAB = [
  "temperature", "humidity", "door", "power-cut", "leak", "air-quality", "co2", "ammonia", "level", "pump", "fuel", "vibration",
  "energy", "pressure", "gps", "soil", "water-quality", "counting", "wifi", "4g", "lora", "cold-chain", "compliance-log",
  "escalation", "whatsapp", "buzzer", "multi-node", "battery-backup", "mains-sensing", "outdoor", "calibration", "reports",
  "downtime", "generator", "irrigation", "dissolved-oxygen", "mapping", "offline-buffering",
] as const;
