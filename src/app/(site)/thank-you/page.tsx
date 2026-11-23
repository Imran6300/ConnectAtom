import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/marketing/blocks";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you | ConnectAtom", robots: { index: false, follow: false } };
export default function ThankYou() {
  const wa = whatsappLink("Hi, I just sent a request on connectatom.com");
  return (
    <>
      <PageHero eyebrow="Received" title="Thanks. We have your request." lede="We will reply within 15 minutes in working hours, or by 9 am the next morning." />
      <Section><div className="prose-ca max-w-2xl"><h2 className="!mt-0">While you wait</h2><ul><li>See <Link href="/how-it-works">how it works</Link>.</li><li>Work out <Link href="/tools/spoilage-cost-calculator">what a missed alert costs you</Link>.</li>{wa && <li>Prefer to chat now? <a href={wa} target="_blank" rel="noopener">Message us on WhatsApp</a>.</li>}</ul><p className="text-sm">Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div></Section>
    </>
  );
}
