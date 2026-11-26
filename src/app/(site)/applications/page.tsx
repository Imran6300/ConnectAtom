import type { Metadata } from "next";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { itemList, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Band } from "@/components/ui/primitives";
import { CtaBand, PageHero } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ApplicationCard, Grid } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export async function generateMetadata(): Promise<Metadata> {
  return metaFor({ title: "Monitoring applications: power cuts, door alarms, leaks, tank levels", short: "Monitoring applications", description: "Step-by-step monitoring jobs with example settings and alerts: what to measure, which product, and how the alert reads.", path: "/applications" });
}
export default async function ApplicationsHub() {
  const s = await getSite();
  return (
    <>
      <JsonLd data={[webPage({ name: "Applications", description: "Monitoring applications", path: "/applications", modified: s.rowByUrl.get("/applications")!.lastmod, type: "CollectionPage" }), itemList("Applications", s.applications.map((a) => ({ name: a.name, path: `/applications/${a.slug}` })))]} />
      <PageHero eyebrow="Applications" title="Start from the job, not the device" lede="Each application is one problem solved end to end: what to measure, example settings, and the alert you will receive.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Applications", path: "/applications" }]} /></div>
      </PageHero>
      <Band><Grid>{s.applications.map((a) => <ApplicationCard key={a.slug} a={a} />)}</Grid>{s.applications.length === 0 && <p>Application guides are being written.</p>}</Band>
      <CtaBand />
    </>
  );
}
