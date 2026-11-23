import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/blocks";
import { LeadForm } from "@/components/forms/LeadForm";
import { productBySlug } from "@/content/products";

// Conversion pages are noindex and out of the sitemap.
export const metadata: Metadata = { title: "Get a quote | ConnectAtom", robots: { index: false, follow: false } };
export default async function Quote({ searchParams }: { searchParams: Promise<{ product?: string; industry?: string; need?: string }> }) {
  const sp = await searchParams;
  const p = sp.product ? productBySlug(sp.product) : undefined;
  return (
    <>
      <PageHero eyebrow="Quote" title={p ? `Get a quote for ${p.name}` : "Get a quote"} lede={sp.need ? `You asked about: ${sp.need}.` : "Five short questions. We reply within 15 minutes in working hours."} />
      <Section><div className="card max-w-2xl"><LeadForm kind="quote" productSlug={p?.slug} industrySlug={sp.industry} cta="Get my quote" /></div></Section>
    </>
  );
}
