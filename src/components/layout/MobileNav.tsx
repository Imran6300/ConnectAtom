"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export type NavGroup = { title: string; href: string; links: { href: string; label: string }[] };
export function MobileNav({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  // Close on route change, on Escape, and when the viewport grows into the desktop layout.
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const mq = window.matchMedia("(min-width: 1024px)");
    const grow = () => { if (mq.matches) setOpen(false); };
    document.addEventListener("keydown", esc);
    mq.addEventListener("change", grow);
    // Lock page scroll behind the menu.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); mq.removeEventListener("change", grow); document.body.style.overflow = prev; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="btn btn-secondary !h-11 !w-11 !px-0">{open ? <X size={20} /> : <Menu size={20} />}</button>
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t p-4 pb-8" style={{ background: "var(--ca-ink)", borderColor: "var(--border)" }}>
          {groups.map((g) => (
            <details key={g.title} className="group border-b py-1" style={{ borderColor: "var(--border)" }}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden" style={{ color: "var(--text)" }}>
                {g.title}
                <ChevronDown size={18} aria-hidden className="transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <ul className="pb-2 pl-1">
                <li><Link onClick={close} href={g.href} className="block py-2.5 text-sm font-semibold no-underline">All {g.title.toLowerCase()}</Link></li>
                {g.links.map((l) => <li key={l.href}><Link onClick={close} href={l.href} className="block py-2.5 text-sm no-underline" style={{ color: "var(--text-body)" }}>{l.label}</Link></li>)}
              </ul>
            </details>
          ))}
          <Link onClick={close} href="/pricing" className="block py-3.5 font-semibold no-underline" style={{ color: "var(--text)" }}>Pricing</Link>
          <Link onClick={close} href="/book-pilot" className="btn btn-primary mt-2 w-full no-underline">Get a free pilot</Link>
        </div>
      )}
    </div>
  );
}
