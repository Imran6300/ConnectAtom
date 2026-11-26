import type { Metadata } from "next";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { itemList, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";
import { Band, SectionHead } from "@/components/ui/primitives";
import { CtaBand, PageHero, ProductCard } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Grid } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return metaFor({ title: "Wireless monitoring products for cold rooms, clinics, farms and factories", short: "Monitoring products", description: "Twenty ready-to-use monitoring products from ConnectAtom, grouped by industry, with honest availability: available, pilot-ready or in development.", path: "/products" });
}
export default async function ProductsHub() {
  const s = await getSite();
  return (
    <>
      <JsonLd data={[webPage({ name: "Products", description: "ConnectAtom monitoring products", path: "/products", modified: s.rowByUrl.get("/products")!.lastmod, type: "CollectionPage" }), itemList("ConnectAtom products", s.products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })))]} />
      <PageHero eyebrow="Products" title="Monitoring products, grouped by the job they do" lede="Each product is a sensor, a link and an alert rule built for one kind of place. Availability is stated plainly on every card.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Products", path: "/products" }]} /></div>
      </PageHero>
      {SECTORS.map((k) => s.sectorProducts(k).length > 0 && (
        <Band key={k} sector={k}>
          <SectionHead eyebrow={SECTOR_META[k].label} title={SECTOR_META[k].label} lede={SECTOR_META[k].blurb} />
          <Grid cols={4}>{s.sectorProducts(k).map((p) => <ProductCard key={p.slug} p={p} note={p.tagline} />)}</Grid>
        </Band>
      ))}
      <CtaBand />
    </>
  );
}
