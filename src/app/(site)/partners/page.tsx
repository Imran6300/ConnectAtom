import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata = buildMetadata({ title: "Installer and Reseller Partners for Monitoring Systems", description: "Refrigeration technicians, electricians and CCTV installers: sell and install ConnectAtom monitoring and earn a share of the first-year subscription.", path: "/partners" });
export default function Partners() {
  return (
    <>
      <PageHero eyebrow="Partners" title="You see the buyers first. Earn when they sign up." lede="Refrigeration technicians, electricians and CCTV installers are the first to hear about a failing cold room or a hot server closet.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Partners", path: "/partners" }]} /></div>
      </PageHero>
      <Section><div className="grid gap-10 lg:grid-cols-2">
        <div className="prose-ca"><h2 className="!mt-0">How it works</h2><ul><li>You introduce ConnectAtom to a customer, or install it for them.</li><li>You earn a share of the first-year subscription.</li><li>You get a demo kit and help with the first few installs.</li></ul><p>Tell us what you do and where, and we will call you.</p></div>
        <div className="card"><LeadForm kind="contact" cta="Become a partner" /></div>
      </div></Section>
    </>
  );
}
