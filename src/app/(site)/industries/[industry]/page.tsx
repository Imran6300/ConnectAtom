import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getSite } from "@/lib/catalogue/site";
import { metaFor } from "@/lib/seo/metadata";
import { itemList, webPage } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { SECTOR_META } from "@/lib/catalogue/types";
import { SectorHero } from "@/components/sector/SectorHero";
import { SampleModule } from "@/components/sector/SampleModule";
import { ImageSlot } from "@/components/sector/ImageSlot";
import { Band, ButtonLink, SectionHead, TitleBody } from "@/components/ui/primitives";
import { CtaBand, FaqBlock, ProductCard } from "@/components/marketing/blocks";
import { ApplicationCard, Checklist, Grid, IndustryCard, ResourceCard, Toc } from "@/components/marketing/linkcards";

export const revalidate = 3600;
export const dynamicParams = true;
type P = { params: Promise<{ industry: string }> };

export async function generateStaticParams() {
  const s = await getSite();
  return s.rows.filter((r) => r.family === "industries" && r.indexable).map((r) => ({ industry: r.entity!.slug }));
}
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { industry } = await params; const i = (await getSite()).industry(industry);
  if (!i) return { robots: { index: false } };
  return metaFor({ title: `${i.name}: wireless monitoring and WhatsApp alerts`, short: `${i.name} monitoring`, description: i.summary, path: `/industries/${i.slug}`, seo: i.seo, og: { family: "industries", slug: i.slug } });
}

export default async function IndustryPage({ params }: P) {
  const { industry } = await params; const s = await getSite();
  const r = s.redirectFor(`/industries/${industry}`); if (r) permanentRedirect(r.to);
  const i = s.industry(industry); if (!i) notFound();
  const path = `/industries/${i.slug}`;
  const products = s.productsOfIndustry(i);
  const lead = products.find((p) => p.availability !== "in-development") ?? products[0];
  const related = s.relatedIndustries(i, 4);
  const resources = s.resourcesFor({ industry: i.slug, tags: i.tags }, 4);
  const apps = s.applicationsFor({ industry: i.slug }, 4);
  const pairs = s.pairsOfIndustry(i.slug);
  const sm = SECTOR_META[i.sector];
  const toc = [
    { id: "overview", label: "Overview" }, { id: "how-it-works", label: "How the industry works" }, { id: "challenges", label: "Challenges" }, { id: "solutions", label: "How monitoring helps" },
    { id: "applications", label: "Use cases" }, { id: "benefits", label: "Benefits" }, { id: "technologies", label: "Technology" }, { id: "products", label: "Products" },
    { id: "checklist", label: "Checklist" }, { id: "faq", label: "FAQ" }, { id: "related", label: "Related" },
  ];
  return (
    <div data-sector={i.sector}>
      <JsonLd data={[webPage({ name: i.name, description: i.summary, path, modified: i.updatedAt, about: i.name, type: "CollectionPage" }), itemList(`Products for ${i.name}`, products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })))]} />
      <SectorHero
        sector={i.sector} scene={i.scene} sceneTitle={`${i.name} illustration`} eyebrow={`${sm.label} · industry`}
        title={`${i.name}: monitoring that tells you first`} lede={i.tagline}
        trail={[{ name: "Industries", path: "/industries" }, { name: i.name, path }]}
        meta={<>{products.slice(0, 3).map((p) => <Link key={p.slug} href={`/products/${p.slug}`} className="chip chip-solid no-underline">{p.name}</Link>)}</>}
        actions={<><ButtonLink href={`/book-pilot?industry=${i.slug}${lead ? `&product=${lead.slug}` : ""}`}>Get a free pilot</ButtonLink><ButtonLink href="#products" kind="secondary">See the products</ButtonLink></>}
        log={i.sample.rows.slice(0, 5).map((x) => `${x.time ?? ""} ${x.label}${x.value ? ` ${x.value}` : ""}`.trim())}
      />
      <div className="container-x grid gap-10 xl:grid-cols-[1fr_200px]">
        <div className="min-w-0">
          <Band id="overview" className="!px-0">
            <SectionHead eyebrow="Overview" title={`Monitoring for ${i.name.toLowerCase()}`} />
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]"><div className="prose-ca space-y-4">{i.overview.map((t) => <p key={t}>{t}</p>)}</div><SampleModule sector={i.sector} sample={i.sample} /></div>
          </Band>
          <Band id="how-it-works" className="!px-0"><SectionHead eyebrow="How the industry works" title={`What matters in ${i.name.toLowerCase()}`} /><TitleBody items={i.explainer} cols={2} /></Band>
          <Band id="challenges" className="!px-0"><SectionHead eyebrow="Challenges" title="Where things go wrong" /><TitleBody items={i.challenges} cols={2} /></Band>
          <Band id="solutions" className="!px-0"><SectionHead eyebrow="The IoT answer" title="How wireless monitoring helps" /><TitleBody items={i.solutions} cols={2} /></Band>
          <Band id="applications" className="!px-0">
            <SectionHead eyebrow="Use cases" title={`Where ${i.name.toLowerCase()} teams use it`} /><TitleBody items={i.applications} cols={3} />
            {apps.length > 0 && <div className="mt-6"><p className="kicker mb-3">Step-by-step application guides</p><Grid cols={4}>{apps.map((a) => <ApplicationCard key={a.slug} a={a} />)}</Grid></div>}
          </Band>
          <Band id="benefits" className="!px-0"><SectionHead eyebrow="Benefits" title="What you get" /><TitleBody items={i.benefits} cols={3} /></Band>
          <Band id="technologies" className="!px-0">
            <SectionHead eyebrow="Technology and integrations" title="What sits behind it" />
            <dl className="grid gap-3 md:grid-cols-3">{i.technologies.map((t) => <div key={t.name} className="card"><dt className="font-semibold" style={{ color: "var(--text)" }}>{t.name}</dt><dd className="m-0 mt-1 text-sm">{t.note}</dd></div>)}</dl>
          </Band>
          <Band id="products" className="!px-0">
            <SectionHead eyebrow="Products" title={`ConnectAtom products for ${i.name.toLowerCase()}`} lede="Start with the first one. Add the others when the first has proven itself." />
            <ul className="mb-6 flex flex-wrap gap-2">{products.map((p) => <li key={p.slug}><a className="chip no-underline" href={`#p-${p.slug}`}>{p.name}</a></li>)}</ul>
            <Grid cols={3}>{products.map((p) => <div id={`p-${p.slug}`} key={p.slug}><ProductCard p={p} note={s.pairFor(i.slug, p.slug) ? undefined : undefined} />{s.pairFor(i.slug, p.slug) && <Link className="mt-2 block text-sm" href={s.productHref(i.slug, p.slug)}>{p.name} setup for {i.name} →</Link>}</div>)}</Grid>
            {pairs.length === 0 && <div className="mt-6"><ImageSlot slot="installed" scene={i.scene} alt={`${i.name} site`} className="max-w-xl" /></div>}
          </Band>
          <Band id="checklist" className="!px-0">
            <SectionHead eyebrow="Checklist" title="Before you install" /><Checklist items={i.checklist} />
            {i.sourcesNeeded.length > 0 && <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>Rules and standards differ by state and by licence. We do not state them here without a citation. Check the current rules for your site with your regulator or auditor.</p>}
          </Band>
          <Band id="faq" className="!px-0"><FaqBlock faqs={i.faqs} title={`${i.name}: frequently asked questions`} /></Band>
          <Band id="related" className="!px-0">
            {related.length > 0 && <><SectionHead eyebrow="Related industries" title="Similar problems, similar setups" /><Grid cols={4}>{related.map((j) => <IndustryCard key={j.slug} i={j} />)}</Grid></>}
            {resources.length > 0 && <div className="mt-10"><SectionHead eyebrow="Guides and resources" title="Read next" /><Grid cols={2}>{resources.map((x) => <ResourceCard key={x.slug} r={x} />)}</Grid></div>}
          </Band>
        </div>
        <aside className="hidden xl:block"><div className="sticky top-24 pt-12"><Toc items={toc} /></div></aside>
      </div>
      <CtaBand industrySlug={i.slug} productSlug={lead?.slug} title={`Try it at your ${i.name.toLowerCase()} site, free for 30 days`} />
    </div>
  );
}
