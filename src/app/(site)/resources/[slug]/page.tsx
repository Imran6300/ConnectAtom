import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { articleLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Band } from "@/components/ui/primitives";
import { CtaBand, PageHero, ProductCard } from "@/components/marketing/blocks";
import { ApplicationCard, Grid, IndustryCard, ResourceCard } from "@/components/marketing/linkcards";
import { dateIN } from "@/lib/format";

export const revalidate = 3600;
export const dynamicParams = true;
type P = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getSite()).rows.filter((r) => r.family === "resources" && r.indexable).map((r) => ({ slug: r.entity!.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params; const r = (await getSite()).resource(slug);
  if (!r) return { robots: { index: false } };
  return metaFor({ title: r.title, description: r.summary, path: `/resources/${r.slug}`, seo: r.seo, og: { family: "resources", slug: r.slug }, type: "article", published: r.publishedAt, modified: r.updatedAt });
}
export default async function ResourcePage({ params }: P) {
  const { slug } = await params; const s = await getSite();
  const rd = s.redirectFor(`/resources/${slug}`); if (rd) permanentRedirect(rd.to);
  const r = s.resource(slug); if (!r) notFound();
  const path = `/resources/${r.slug}`;
  const products = r.productSlugs.map((x) => s.product(x)).filter((x) => !!x);
  const inds = r.industrySlugs.map((x) => s.industry(x)).filter((x) => !!x);
  const apps = r.applicationSlugs.map((x) => s.application(x)).filter((x) => !!x);
  const more = [...(r.relatedResourceSlugs ?? []).map((x) => s.resource(x)).filter((x) => !!x), ...s.resourcesFor({ tags: r.tags, exclude: r.slug }, 4)].filter((x, i, a) => x && a.findIndex((y) => y?.slug === x.slug) === i).slice(0, 4);
  return (
    <>
      <JsonLd data={articleLd(r)} />
      <PageHero eyebrow={r.type === "glossary" ? "Glossary" : r.type} title={r.title}>
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Resources", path: "/resources" }, { name: r.title, path }]} /></div>
        <p className="mono mt-4 text-xs" style={{ color: "var(--text-muted)" }}>By {r.author.name}, {r.author.role} · Updated {dateIN(r.updatedAt)} · {r.readMinutes} min read{r.reviewer ? ` · Technically reviewed by ${r.reviewer.name}, ${r.reviewer.role}` : " · Not yet technically reviewed"}</p>
      </PageHero>
      <Band>
        <article className="prose-ca">
          <p className="lede !text-[1.15rem]" style={{ color: "var(--text)" }}>{r.answer}</p>
          {r.sections.map((sec) => (
            <section key={sec.heading}><h2 className="!mt-10">{sec.heading}</h2>
              {sec.body.map((t) => <p key={t}>{t}</p>)}
              {sec.list && <ul className="list-disc pl-5">{sec.list.map((x) => <li key={x}>{x}</li>)}</ul>}
              {sec.table && <div className="overflow-x-auto"><table className="table-ca"><thead><tr>{sec.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{sec.table.rows.map((row, i) => <tr key={i}>{row.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody></table></div>}
            </section>
          ))}
          <h2 className="!mt-10">Sources</h2>
          {r.sources.length ? <ul className="list-disc pl-5">{r.sources.map((x) => <li key={x.title}>{x.url ? <a href={x.url} rel="noopener">{x.title}</a> : x.title}</li>)}</ul> : <p className="text-sm">This guide cites no external sources. It describes how ConnectAtom products work. Where a rule or standard applies to you, confirm it with your regulator or auditor.</p>}
        </article>
      </Band>
      {products.length > 0 && <Band className="!pt-0"><h2>Products mentioned</h2><Grid cols={4}>{products.map((p) => p && <ProductCard key={p.slug} p={p} />)}</Grid></Band>}
      {(inds.length > 0 || apps.length > 0) && <Band className="!pt-0"><h2>Related industries and applications</h2><Grid cols={4}>{inds.map((i) => i && <IndustryCard key={i.slug} i={i} />)}{apps.map((a) => a && <ApplicationCard key={a.slug} a={a} />)}</Grid></Band>}
      {more.length > 0 && <Band className="!pt-0"><h2>Keep reading</h2><Grid cols={2}>{more.map((x) => x && <ResourceCard key={x.slug} r={x} />)}</Grid></Band>}
      <CtaBand productSlug={r.productSlugs[0]} industrySlug={r.industrySlugs[0]} />
    </>
  );
}
