"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type NavLink = { href: string; label: string };
export type MegaCol = { key: string; label: string; links: NavLink[] };
export type DesktopNavItem =
  | { type: "mega"; id: string; label: string; href: string; cols: MegaCol[] }
  | { type: "list"; id: string; label: string; href: string; links: NavLink[] }
  | { type: "link"; id: string; label: string; href: string };

const OPEN_DELAY = 70;   // ms: ignores accidental fly-overs
const CLOSE_DELAY = 180; // ms: lets the cursor travel diagonally into the panel

/** Keeps a panel inside the viewport: if its right/left edge would be cut off, it is nudged back in. */
function useClampToViewport(ref: React.RefObject<HTMLElement | null>, open: boolean) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.translate = "";
    if (!open) return;
    const r = el.getBoundingClientRect();
    const pad = 12;
    let dx = 0;
    if (r.right > window.innerWidth - pad) dx = window.innerWidth - pad - r.right;
    if (r.left + dx < pad) dx = pad - r.left;
    if (dx) el.style.translate = `${Math.round(dx)}px 0`;
  }, [ref, open]);
}

function Item({ item, open, onOpen, onClose, onToggle }: { item: Exclude<DesktopNavItem, { type: "link" }>; open: boolean; onOpen: () => void; onClose: () => void; onToggle: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = `nav-panel-${item.id}`;
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  useClampToViewport(panelRef, open && item.type === "list");

  const clear = () => { if (openTimer.current) clearTimeout(openTimer.current); if (closeTimer.current) clearTimeout(closeTimer.current); };
  useEffect(() => clear, []);

  // Hover opens only for a real mouse. Touch and pen users use the arrow button (or tap-and-hold on the link) instead.
  const enter = (e: React.PointerEvent) => { if (e.pointerType !== "mouse") return; clear(); openTimer.current = setTimeout(onOpen, OPEN_DELAY); };
  const leave = (e: React.PointerEvent) => { if (e.pointerType !== "mouse") return; clear(); closeTimer.current = setTimeout(onClose, CLOSE_DELAY); };
  // Close when focus moves out of the whole item (keyboard users tabbing away).
  const blur = (e: React.FocusEvent) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose(); };
  const key = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && open) { e.stopPropagation(); onClose(); btnRef.current?.focus(); }
    if (e.key === "ArrowDown" && !open) { e.preventDefault(); onOpen(); }
  };

  const linkColor = open || active ? "var(--text)" : "var(--text-body)";
  const panelLinks = (links: NavLink[], cls: string) => links.map((l) => (
    <li key={l.href}><Link href={l.href} onClick={onClose} className={cls} style={{ color: "var(--text)" }}>{l.label}</Link></li>
  ));

  return (
    // Not `relative` for mega menus: the panel is positioned against the header container so it can never overflow the screen.
    <div className={item.type === "list" ? "relative" : ""} onPointerEnter={enter} onPointerLeave={leave} onBlur={blur} onKeyDown={key}>
      <div className="flex h-16 items-center">
        <Link href={item.href} aria-current={active ? "page" : undefined} className="flex h-10 items-center rounded-md pl-3 pr-1 text-sm no-underline transition-colors hover:bg-white/5" style={{ color: linkColor }}>{item.label}</Link>
        <button ref={btnRef} type="button" aria-label={`${item.label} menu`} aria-expanded={open} aria-controls={panelId} onClick={onToggle}
          className="grid h-10 w-7 place-items-center rounded-md pr-1 transition-colors hover:bg-white/5" style={{ color: linkColor }}>
          <ChevronDown size={14} aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {item.type === "mega" ? (
        <div id={panelId} ref={panelRef} data-open={open} className="mega absolute inset-x-0 top-full z-50">
          <div className="card grid max-h-[calc(100dvh-5.5rem)] gap-x-6 gap-y-7 overflow-y-auto overscroll-contain !p-6 shadow-2xl lg:grid-cols-3 xl:grid-cols-4" style={{ background: "var(--surface-raised)" }}>
            {item.cols.map((c) => (
              <div key={c.key} data-sector={c.key} className="min-w-0">
                <p className="kicker mb-2 flex items-center gap-2"><span className="sector-dot h-2 w-2 shrink-0 rounded-full" />{c.label}</p>
                <ul className="space-y-0.5">{panelLinks(c.links, "block rounded-md px-2 py-1 text-[0.86rem] leading-snug no-underline hover:bg-white/5 focus-visible:bg-white/5")}</ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div id={panelId} ref={panelRef} data-open={open} className="mega absolute left-0 top-full z-50 w-[340px] max-w-[calc(100vw-1.5rem)]">
          <ul className="card max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain !p-2 shadow-2xl" style={{ background: "var(--surface-raised)" }}>
            {panelLinks(item.links, "block rounded-md px-3 py-2 text-sm no-underline hover:bg-white/5 focus-visible:bg-white/5")}
          </ul>
        </div>
      )}
    </div>
  );
}

export function DesktopNav({ items }: { items: DesktopNavItem[] }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpenId(null), []);

  // Close on navigation, outside click and Escape.
  useEffect(() => { setOpenId(null); }, [pathname]);
  useEffect(() => {
    if (!openId) return;
    const down = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpenId(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenId(null); };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", down); document.removeEventListener("keydown", esc); };
  }, [openId]);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden items-center lg:flex">
      {items.map((it) => it.type === "link" ? (
        <Link key={it.id} href={it.href} aria-current={pathname === it.href ? "page" : undefined} className="flex h-10 items-center rounded-md px-3 text-sm no-underline transition-colors hover:bg-white/5" style={{ color: pathname === it.href ? "var(--text)" : "var(--text-body)" }}>{it.label}</Link>
      ) : (
        <Item key={it.id} item={it} open={openId === it.id} onOpen={() => setOpenId(it.id)} onClose={() => setOpenId((c) => (c === it.id ? null : c))} onToggle={() => setOpenId((c) => (c === it.id ? null : it.id))} />
      ))}
    </nav>
  );
}
