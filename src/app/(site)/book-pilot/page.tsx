import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/blocks";
import { LeadForm } from "@/components/forms/LeadForm";
import { productBySlug } from "@/content/products";

export const metadata: Metadata = { title: "Get a free pilot | ConnectAtom", robots: { index: false, follow: false } };
export default async function Pilot({ searchParams }: { searchParams: Promise<{ product?: string; industry?: string }> }) {
  const sp = await searchParams;
  const p = sp.product ? productBySlug(sp.product) : undefined;
  return (
    <>
      <PageHero eyebrow="30-day pilot" title="Try it at your site, free for 30 days" lede="We install a kit with you. If it does not work for you, you get your money back." />
      <Section><div className="card max-w-2xl"><LeadForm kind="pilot" productSlug={p?.slug} industrySlug={sp.industry} cta="Get a free pilot" /></div></Section>
    </>
  );
}
