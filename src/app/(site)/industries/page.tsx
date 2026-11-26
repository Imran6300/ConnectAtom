import type { Metadata } from "next";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { itemList, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SECTORS, SECTOR_META } from "@/lib/catalogue/types";
import { Band, SectionHead } from "@/components/ui/primitives";
import { CtaBand, PageHero } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Grid, IndustryCard } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return metaFor({ title: "Industries we monitor: cold chain, healthcare, food, farms, factories", short: "Industries we monitor", description: "Monitoring guides for the industries ConnectAtom serves in India, with the products, alerts and checklists that fit each one.", path: "/industries" });
}
export default async function IndustriesHub() {
  const s = await getSite();
  return (
    <>
      <JsonLd data={[webPage({ name: "Industries", description: "Industries ConnectAtom serves", path: "/industries", modified: s.rowByUrl.get("/industries")!.lastmod, type: "CollectionPage" }), itemList("Industries", s.industries.map((i) => ({ name: i.name, path: `/industries/${i.slug}` })))]} />
      <PageHero eyebrow="Industries" title="Find your industry" lede="Each page explains what goes wrong in that line of work, how monitoring helps, and which product to start with.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Industries", path: "/industries" }]} /></div>
      </PageHero>
      {SECTORS.map((k) => s.sectorIndustries(k).length > 0 && (
        <Band key={k} sector={k}>
          <SectionHead eyebrow={`${s.sectorIndustries(k).length} industries`} title={SECTOR_META[k].label} lede={SECTOR_META[k].blurb} />
          <Grid cols={4}>{s.sectorIndustries(k).map((i) => <IndustryCard key={i.slug} i={i} />)}</Grid>
        </Band>
      ))}
      <CtaBand />
    </>
  );
}
