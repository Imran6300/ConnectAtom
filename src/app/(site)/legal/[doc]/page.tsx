import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { SITE } from "@/lib/site";

type Doc = { title: string; desc: string; body: { h: string; p: string[] }[] };
const DOCS: Record<string, Doc> = {
  privacy: {
    title: "Privacy Policy", desc: "What personal data ConnectAtom collects, why, how long we keep it, and how to see, correct or delete it.",
    body: [
      { h: "What we collect", p: ["When you send a form: your name, phone number, optional email and business name, the number of sensors and city you tell us, and any message. We also record which page you sent it from and how you arrived (for example a search or an advert), so we know which pages help people.", "When you use the dashboard: your account details, your devices and their readings, your alert rules and contacts, and a log of changes."] },
      { h: "Why we use it", p: ["To reply to your request, set up and run your monitoring, send the alerts you ask for, and improve our pages. We send marketing messages and WhatsApp follow-ups only if you tick the separate box that allows them."] },
      { h: "How long we keep it", p: ["Lead details are kept while we are in contact with you and for a limited period afterwards. Device data is kept for the period of your plan. Ask us for the exact periods."] },
      { h: "Your rights", p: [`You can ask to see, correct or delete your data, or withdraw a marketing consent, at any time by writing to ${SITE.email}. We will act on it.`] },
      { h: "Sharing", p: ["We use service providers to send email and messages and to host our systems. We do not sell personal data."] },
      { h: "Contact", p: [`${SITE.name}, ${SITE.city}, India. ${SITE.email}.`] },
    ],
  },
  terms: {
    title: "Terms of Service", desc: "The terms for using ConnectAtom devices, the dashboard and alerts, including what ConnectAtom does and does not guarantee.",
    body: [
      { h: "What ConnectAtom is", p: ["ConnectAtom is a monitoring aid. It measures conditions and sends alerts. It does not control equipment, and it does not replace your own checks, maintenance or insurance."] },
      { h: "What we do not guarantee", p: ["Alerts depend on power, networks and third-party messaging services that we do not control. We aim for reliable delivery but cannot guarantee that every alert is delivered or that every failure is detected. Readings are indicative unless a probe has a calibration record."] },
      { h: "Pilot", p: ["The 30-day pilot lets you try ConnectAtom at your site. If it does not work for you within 30 days, you get your money back, as described in your quote."] },
      { h: "Plans and payment", p: ["Plans are charged per device per month or per year, plus GST. Prices on this site are introductory and confirmed in your quote."] },
      { h: "Limit of liability", p: ["[To be completed after legal review: limit on liability for stock loss and consequential loss.]"] },
    ],
  },
};
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(DOCS).map((doc) => ({ doc }));
type Props = { params: Promise<{ doc: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { doc } = await params; const d = DOCS[doc]; if (!d) return {};
  return buildMetadata({ title: d.title, description: d.desc, path: `/legal/${doc}` });
}
export default async function Legal({ params }: Props) {
  const { doc } = await params; const d = DOCS[doc]; if (!d) notFound();
  return (
    <>
      <PageHero eyebrow="Legal" title={d.title}><div className="mt-6"><Breadcrumbs dark trail={[{ name: d.title, path: `/legal/${doc}` }]} /></div></PageHero>
      <Section>
        {!SITE.legalReviewed && <p className="mb-6 rounded-lg border p-4 text-sm" style={{ borderColor: "var(--warn-text)", background: "var(--warn-bg)", color: "var(--warn-text)" }}>Draft: this page has not been reviewed by a lawyer yet. Do not launch until it has. (Set NEXT_PUBLIC_LEGAL_REVIEWED=true to hide this notice.)</p>}
        <div className="prose-ca max-w-3xl">{d.body.map((s) => <section key={s.h}><h2>{s.h}</h2>{s.p.map((t) => <p key={t}>{t}</p>)}</section>)}<p className="text-sm" style={{ color: "var(--text-muted)" }}>Notice version {SITE.noticeVersion}.</p></div>
      </Section>
    </>
  );
}
