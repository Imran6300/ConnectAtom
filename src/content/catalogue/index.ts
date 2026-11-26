// Static catalogue source: the seed of record and the default content source (CONTENT_SOURCE=static).
// MongoDB mirrors this shape; scripts/seed-catalogue.ts copies it into the database.
import type { Catalogue, Fit, Industry, Product } from "@/lib/catalogue/types";
import coldRoom from "./products/cold-room-monitor";
import medicalFridge from "./products/medical-fridge-monitor";
import kitchen from "./products/kitchen-freezer-monitor";
import warehouse from "./products/warehouse-climate-monitor";
import serverRoom from "./products/server-room-monitor";
import door from "./products/door-open-sensor";
import leak from "./products/water-leak-detector";
import dairy from "./products/dairy-chilling-monitor";
import greenhouse from "./products/greenhouse-climate-monitor";
import poultry from "./products/poultry-shed-monitor";
import tank from "./products/water-tank-level-monitor";
import generator from "./products/generator-monitor";
import airQuality from "./products/air-quality-monitor";
import soil from "./products/soil-moisture-monitor";
import machine from "./products/machine-downtime-tracker";
import vibration from "./products/vibration-monitor";
import energy from "./products/energy-monitor";
import compressor from "./products/compressor-monitor";
import reefer from "./products/reefer-truck-tracker";
import aqua from "./products/aquaculture-water-monitor";
import coldChain from "./industries/cold-chain";
import healthcare from "./industries/healthcare";
import foodService from "./industries/food-service";
import agriculture from "./industries/agriculture";
import industrial from "./industries/industrial";
import facilities from "./industries/facilities";
import logistics from "./industries/logistics";
import written from "./fits";
import applications from "./applications";
import guides from "./resources/guides";
import glossary from "./resources/glossary";
import comparisons from "./resources/comparisons";
import redirects from "./redirects";

const products: Product[] = [coldRoom, medicalFridge, kitchen, warehouse, serverRoom, door, leak, dairy, greenhouse, poultry, tank, generator, airQuality, soil, machine, vibration, energy, compressor, reefer, aqua].sort((a, b) => a.num - b.num);
const industries: Industry[] = [...coldChain, ...healthcare, ...foodService, ...agriculture, ...industrial, ...facilities, ...logistics];

/** Every launch-wave pair without written copy exists as a draft. It fails the gate and is NOT published (visible in the audit report only). */
function draftFits(): Fit[] {
  const out: Fit[] = [];
  for (const ind of industries.filter((i) => i.wave === 1)) for (const slug of ind.productSlugs) {
    if (written.some((w) => w.productSlug === slug && w.industrySlug === ind.slug)) continue;
    out.push({ productSlug: slug, industrySlug: ind.slug, fitScore: 4, angle: "", problem: "", setup: "", status: "draft", updatedAt: "2026-11-24" });
  }
  return out;
}

export const STATIC_CATALOGUE: Catalogue = {
  products, industries, fits: [...written, ...draftFits()], applications,
  resources: [...guides, ...comparisons, ...glossary], redirects,
};
