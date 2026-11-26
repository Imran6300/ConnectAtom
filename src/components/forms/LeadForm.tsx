"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { api, toApiError } from "@/lib/api";
import { readOrigin, getFlag } from "@/lib/attribution";

type Kind = "quote" | "pilot" | "callback" | "contact";
type Props = { kind?: Kind; productSlug?: string; industrySlug?: string; citySlug?: string; heading?: string; cta?: string; compact?: boolean; contextLabel?: string; products?: { slug: string; name: string }[] };
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function Inner({ kind = "quote", productSlug, industrySlug, citySlug, cta, compact, products = [] }: Props) {
  const router = useRouter();
  const path = usePathname();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string>("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const local: Record<string, string> = {};
    if (v("name").length < 2) local.name = "Enter your name";
    const phoneRaw = v("phone");
    if (phoneRaw) {
      const p = parsePhoneNumberFromString(phoneRaw, "IN");
      if (!p || !p.isValid()) local.phone = "Enter a valid phone number";
    }
    if (!phoneRaw && !v("email")) local.phone = "Phone or email is required";
    if (!f.get("notice")) local.notice = "Please accept the privacy notice";
    setFields(local);
    if (Object.keys(local).length) return;

    setBusy(true); setErr("");
    try {
      const token = SITE_KEY && executeRecaptcha ? await executeRecaptcha("lead") : undefined;
      const o = readOrigin();
      const phone = phoneRaw ? parsePhoneNumberFromString(phoneRaw, "IN")?.number : undefined;
      await api.post("/leads", {
        kind, name: v("name"), phone, email: v("email") || undefined, company: v("company") || undefined, city: v("city") || undefined, pin: v("pin") || undefined,
        sensorCount: v("sensors") || undefined, message: v("message") || undefined, bestTime: v("bestTime") || undefined,
        productSlug: v("product") || productSlug, industrySlug, website: v("website"), recaptchaToken: token,
        consent: { noticeAccepted: true, marketing: !!f.get("marketing"), whatsappFollowUp: !!f.get("whatsapp") },
        origin: {
          ...o, landingPageUrl: window.location.origin + path, pagePath: path, productSlug, industrySlug, citySlug,
          usedTool: getFlag("usedTool"), downloadedDatasheet: getFlag("downloadedDatasheet"),
        },
      });
      router.push(`/thank-you?kind=${kind}`);
    } catch (ex) {
      const a = toApiError(ex); setErr(a.message); if (a.fields) setFields(a.fields);
    } finally { setBusy(false); }
  }

  const Err = ({ k }: { k: string }) => (fields[k] ? <p className="field-error" role="alert">{fields[k]}</p> : null);
  const full = kind === "quote" || kind === "pilot";
  return (
    <form onSubmit={submit} noValidate className="grid gap-4" aria-label="Contact form">
      {full && !compact && !productSlug && (
        <div>
          <label className="label" htmlFor="product">What do you want to monitor?</label>
          <select id="product" name="product" className="input" defaultValue="">
            <option value="">Not sure yet</option>
            {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </select>
        </div>
      )}
      {full && !compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="sensors">How many points or sensors?</label><input id="sensors" name="sensors" inputMode="numeric" className="input" placeholder="e.g. 4" /></div>
          <div><label className="label" htmlFor="city">City</label><input id="city" name="city" className="input" placeholder="Hyderabad" autoComplete="address-level2" /></div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="name">Name</label><input id="name" name="name" className="input" autoComplete="name" aria-invalid={!!fields.name} /><Err k="name" /></div>
        <div><label className="label" htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" className="input" autoComplete="tel" placeholder="98765 43210" aria-invalid={!!fields.phone} /><Err k="phone" /></div>
      </div>
      {kind !== "callback" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="email">Email <span className="font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span></label><input id="email" name="email" type="email" className="input" autoComplete="email" /><Err k="email" /></div>
          <div><label className="label" htmlFor="company">Business name <span className="font-normal" style={{ color: "var(--text-muted)" }}>(optional)</span></label><input id="company" name="company" className="input" autoComplete="organization" /></div>
        </div>
      )}
      {kind === "callback" && <div><label className="label" htmlFor="bestTime">Best time to call</label><input id="bestTime" name="bestTime" className="input" placeholder="Weekdays after 4 pm" /></div>}
      {full && !compact && <div><label className="label" htmlFor="message">Anything we should know?</label><textarea id="message" name="message" className="input" /></div>}
      {/* honeypot: real people never see or fill this */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <div className="grid gap-2 text-sm">
        <label className="flex items-start gap-2"><input type="checkbox" name="notice" className="mt-1" />
          <span>I have read the <a href="/legal/privacy" target="_blank">privacy notice</a>. ConnectAtom will use my details only to reply to this request.</span></label>
        <Err k="notice" />
        <label className="flex items-start gap-2"><input type="checkbox" name="whatsapp" className="mt-1" /><span>You may follow up on WhatsApp. <span style={{ color: "var(--text-muted)" }}>(optional)</span></span></label>
        <label className="flex items-start gap-2"><input type="checkbox" name="marketing" className="mt-1" /><span>Send me occasional product news. <span style={{ color: "var(--text-muted)" }}>(optional)</span></span></label>
      </div>
      {err && <p className="field-error" role="alert">{err}</p>}
      <div><button className="btn btn-primary" disabled={busy}>{busy ? "Sending..." : cta ?? "Send request"}</button>
        <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>We reply within 15 minutes in working hours, or by 9 am the next morning.</p></div>
    </form>
  );
}

export function LeadForm(props: Props) {
  const body = <Inner {...props} />;
  return SITE_KEY ? <GoogleReCaptchaProvider reCaptchaKey={SITE_KEY} scriptProps={{ async: true, defer: true }}>{body}</GoogleReCaptchaProvider> : body;
}
