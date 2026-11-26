import Image from "next/image";
import type { CatalogueImage, DeviceKey, SceneKey } from "@/lib/catalogue/types";
import { DeviceArt, Scene } from "@/components/visuals";

/** Standard slot sizes: every slot reserves its aspect ratio, so a late image can never shift layout (CLS 0). */
export const SLOTS = {
  hero: { width: 1600, height: 1000, ratio: "16/10" },
  installed: { width: 1200, height: 900, ratio: "4/3" },
  device: { width: 1200, height: 900, ratio: "4/3" },
  dashboard: { width: 1200, height: 750, ratio: "16/10" },
} as const;
export type SlotName = keyof typeof SLOTS;

type Props = { image?: CatalogueImage; slot: SlotName; scene?: SceneKey; device?: DeviceKey; alt: string; priority?: boolean; className?: string; sizes?: string };

/** Shows the real photo when a src exists; otherwise the original illustration for the same slot. Both occupy the same box. */
export function ImageSlot({ image, slot, scene, device, alt, priority, className = "", sizes = "(min-width:1024px) 50vw, 100vw" }: Props) {
  const s = SLOTS[slot];
  return (
    <figure className={`m-0 overflow-hidden rounded-[16px] border ${className}`} style={{ aspectRatio: s.ratio, borderColor: "var(--border)", background: "var(--sector-soft, var(--surface))" }}>
      {image?.src ? (
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority={priority} sizes={sizes} className="h-full w-full object-cover" />
      ) : device ? (
        <div className="flex h-full w-full items-center justify-center p-6"><DeviceArt kind={device} className="h-full w-auto max-w-full" label={alt} /></div>
      ) : scene ? (
        <Scene name={scene} className="h-full w-full" title={alt} />
      ) : null}
    </figure>
  );
}

export function Gallery({ title, items }: { title: string; items: { key: string; node: React.ReactNode; caption: string }[] }) {
  return (
    <div>
      <h2 className="sr-only">{title}</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.key}>{it.node}<p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>{it.caption}</p></li>
        ))}
      </ul>
    </div>
  );
}
