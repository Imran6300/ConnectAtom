import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata = buildMetadata({ title: "Contact ConnectAtom: Talk to Us About Monitoring", description: "Ask about monitoring for your cold room, clinic, kitchen or warehouse. We reply within 15 minutes in working hours, or by 9 am the next morning.", path: "/contact" });
export default function Contact() {
  const wa = whatsappLink("Hi, I would like to talk about monitoring.");
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to someone who has installed it" lede="We reply within 15 minutes in working hours, or by 9 am the next morning.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Contact", path: "/contact" }]} /></div>
      </PageHero>
      <Section><div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="prose-ca"><h2 className="!mt-0">Reach us</h2><ul><li>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>{SITE.phone && <li>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phone}</a></li>}{wa && <li><a href={wa} target="_blank" rel="noopener">Chat on WhatsApp</a></li>}<li>{SITE.city}, India</li></ul></div>
        <div className="card"><LeadForm kind="contact" cta="Send message" /></div>
      </div></Section>
    </>
  );
}
