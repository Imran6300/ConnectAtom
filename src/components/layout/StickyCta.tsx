"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";

// Sticky mobile bar: most Indian B2B visitors arrive on a phone. The WhatsApp message names the page.
export function StickyCta({ pageTitle }: { pageTitle?: string }) {
  const path = usePathname();
  const msg = `Hi, I am looking at ${pageTitle ?? path} on connectatom.com`;
  const wa = whatsappLink(msg);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t p-2 md:hidden" data-theme="dark" style={{ background: "var(--ca-ink)", borderColor: "var(--border)" }}>
      <div className="flex gap-2">
        <Link href="/get-quote" className="btn btn-primary flex-1 no-underline">Get a quote</Link>
        {wa && <a href={wa} target="_blank" rel="noopener" className="btn btn-secondary !px-3" aria-label="Chat on WhatsApp" data-event="click_whatsapp"><FaWhatsapp size={20} /></a>}
        {SITE.phone && <a href={`tel:${SITE.phone}`} className="btn btn-secondary !px-3" aria-label="Call us"><Phone size={18} /></a>}
      </div>
    </div>
  );
}
