import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero, Section, CtaBand } from "@/components/marketing/blocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

export const metadata = buildMetadata({ title: "Security and Data Handling for Monitoring Devices", description: "How ConnectAtom protects your devices and data: per-device credentials, encrypted connections, separate customer workspaces and role-based access.", path: "/security" });
export default function Security() {
  const items = [
    ["Every device has its own identity", "Each device has a unique ID and a random secret. We store only a hash of the secret, and we never ship one shared password in firmware. A lost device can be revoked."],
    ["Encrypted connections", "Devices and browsers connect over encrypted links."],
    ["Separate customer workspaces", "Every query is scoped to your workspace on the server. You cannot see another customer's data, and they cannot see yours."],
    ["Roles you control", "Owner, Admin, Technician, Operator, Viewer and Auditor. The server checks the role on every action."],
    ["An audit trail", "Changes to rules, contacts, users and devices are logged with who, what and when."],
    ["Minimal personal data", "We collect a name, phone number and email, and only what a request needs. You can ask to see, correct or delete your data."],
  ];
  return (
    <>
      <PageHero eyebrow="Security" title="Built so one customer's data stays theirs" lede="A short, plain description of what we do. We list only what is true today.">
        <div className="mt-6"><Breadcrumbs dark trail={[{ name: "Security", path: "/security" }]} /></div>
      </PageHero>
      <Section><div className="grid gap-5 md:grid-cols-2">{items.map(([t, d]) => <div key={t} className="card"><h3>{t}</h3><p>{d}</p></div>)}</div>
        <p className="mt-8 max-w-2xl text-sm">ConnectAtom is a monitoring aid. We do not claim certifications we do not hold. See our <a href="/legal/privacy">privacy policy</a> and <a href="/legal/terms">terms</a>.</p></Section>
      <CtaBand />
    </>
  );
}
