"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export type NavGroup = { title: string; href: string; links: { href: string; label: string }[] };
export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="btn btn-secondary !h-11 !w-11 !px-0">{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t p-4" style={{ background: "var(--ca-ink)", borderColor: "var(--border)" }}>
          {groups.map((g) => (
            <details key={g.title} className="border-b py-2" style={{ borderColor: "var(--border)" }}>
              <summary className="flex min-h-11 cursor-pointer items-center font-semibold" style={{ color: "var(--text)" }}>{g.title}</summary>
              <ul className="pb-2 pl-1">
                <li><Link onClick={() => setOpen(false)} href={g.href} className="block py-2 text-sm font-semibold no-underline">All {g.title.toLowerCase()}</Link></li>
                {g.links.map((l) => <li key={l.href}><Link onClick={() => setOpen(false)} href={l.href} className="block py-2 text-sm no-underline" style={{ color: "var(--text-body)" }}>{l.label}</Link></li>)}
              </ul>
            </details>
          ))}
          <Link onClick={() => setOpen(false)} href="/pricing" className="block py-3 font-semibold no-underline" style={{ color: "var(--text)" }}>Pricing</Link>
          <Link onClick={() => setOpen(false)} href="/book-pilot" className="btn btn-primary mt-2 w-full no-underline">Get a free pilot</Link>
        </div>
      )}
    </div>
  );
}
