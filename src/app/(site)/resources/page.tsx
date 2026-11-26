import type { Metadata } from "next";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { itemList, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Band, SectionHead } from "@/components/ui/primitives";
import { CtaBand, PageHero } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Grid, ResourceCard } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return metaFor({ title: "Monitoring guides, comparisons and glossary", description: "Plain-language guides on temperature monitoring, alerts, sensors and connectivity for Indian businesses, with comparisons and a glossary.", path: "/resources" });
}
const GROUPS: [string, string[]][] = [["Guides", ["guide"]], ["Comparisons", ["comparison"]], ["Technical notes", ["technical", "research"]], ["Glossary", ["glossary"]]];
export default async function ResourcesHub() {
  const s = await getSite();
  return (
    <>
      <JsonLd data={[webPage({ name: "Resources", description: "Guides and glossary", path: "/resources", modified: s.rowByUrl.get("/resources")!.lastmod, type: "CollectionPage" }), itemList("Resources", s.resources.map((r) => ({ name: r.title, path: `/resources/${r.slug}` })))]} />
      <PageHero eyebrow="Resources" title="Guides written to be checked" lede="Each guide opens with the answer. Where a rule or standard matters, we cite it or say we have not.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Resources", path: "/resources" }]} /></div>
      </PageHero>
      {GROUPS.map(([label, types]) => { const items = s.resources.filter((r) => types.includes(r.type)); return items.length > 0 && (
        <Band key={label}><SectionHead title={label} /><Grid>{items.map((r) => <ResourceCard key={r.slug} r={r} />)}</Grid></Band>
      ); })}
      <CtaBand />
    </>
  );
}
