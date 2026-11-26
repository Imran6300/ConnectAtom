import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Band, SectionHead, TitleBody } from "@/components/ui/primitives";
import { AlertExample, CtaBand, FaqBlock, PageHero, ProductCard } from "@/components/marketing/blocks";
import { Grid, IndustryCard, ResourceCard } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export const dynamicParams = true;
type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getSite()).rows.filter((r) => r.family === "applications" && r.indexable).map((r) => ({ slug: r.entity!.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params; const a = (await getSite()).application(slug);
  if (!a) return { robots: { index: false } };
  return metaFor({ title: a.name, description: a.summary, path: `/applications/${a.slug}`, seo: a.seo, og: { family: "applications", slug: a.slug } });
}
export default async function ApplicationPage({ params }: P) {
  const { slug } = await params; const s = await getSite();
  const rd = s.redirectFor(`/applications/${slug}`); if (rd) permanentRedirect(rd.to);
  const a = s.application(slug); if (!a) notFound();
  const path = `/applications/${a.slug}`;
  const products = a.productSlugs.map((x) => s.product(x)).filter((x) => !!x);
  const inds = a.industrySlugs.map((x) => s.industry(x)).filter((x) => !!x);
  const res = s.resourcesFor({ application: a.slug, tags: a.tags }, 4);
  return (
    <>
      <JsonLd data={webPage({ name: a.name, description: a.summary, path, modified: a.updatedAt })} />
      <PageHero eyebrow="Application" title={a.name} lede={a.job}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Applications", path: "/applications" }, { name: a.name, path }]} /></div>
      </PageHero>
      <Band>
        <div className="prose-ca space-y-4">{a.overview.map((t) => <p key={t}>{t}</p>)}</div>
        <div className="mt-10"><SectionHead eyebrow="Steps" title="How it is done" /><TitleBody items={a.steps} cols={2} /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card"><p className="eyebrow">Example configuration</p><p className="mb-2 text-xs" style={{ color: "var(--text-muted)" }}>Starting values. Set yours from your own stock or process.</p><table className="table-ca"><tbody>{a.config.map((c) => <tr key={c.label}><th scope="row" className="w-44">{c.label}</th><td>{c.value}</td></tr>)}</tbody></table></div>
          <AlertExample text={a.alertExample} />
        </div>
      </Band>
      <Band className="!pt-0"><SectionHead eyebrow="Products" title="Use it with" /><Grid cols={4}>{products.map((p) => p && <ProductCard key={p.slug} p={p} />)}</Grid></Band>
      <Band className="!pt-0"><SectionHead eyebrow="Industries" title="Where it applies" /><Grid cols={4}>{inds.map((i) => i && <IndustryCard key={i.slug} i={i} />)}</Grid></Band>
      <Band className="!pt-0"><FaqBlock faqs={a.faqs} /></Band>
      {res.length > 0 && <Band className="!pt-0"><SectionHead eyebrow="Guides" title="Read next" /><Grid cols={2}>{res.map((r) => <ResourceCard key={r.slug} r={r} />)}</Grid></Band>}
      <CtaBand productSlug={a.productSlugs[0]} industrySlug={a.industrySlugs[0]} />
    </>
  );
}
