import type { Metadata } from "next";
import { SITE, abs } from "@/lib/site";
import type { SeoFields } from "@/lib/catalogue/types";
import { getSite } from "@/lib/catalogue/site";

export type MetaInput = {
  title: string; short?: string; description: string; path: string;
  seo?: SeoFields; noindex?: boolean; absoluteTitle?: boolean;
  og?: { family: string; slug: string } | { image: string };
  type?: "website" | "article"; published?: string; modified?: string;
};

/** One helper builds the whole Metadata object, so no route writes its own tags. */
export function buildMetadata(o: MetaInput): Metadata {
  // Titles stay within ~65 characters: try the full title, then the short form, then drop the brand suffix, then trim at a word.
  const fit = (t: string) => (o.absoluteTitle ? t : `${t} | ${SITE.name}`);
  const cands = o.seo?.titleOverride ? [o.seo.titleOverride] : [o.title, o.short].filter((x): x is string => !!x);
  let base = cands.find((c) => fit(c).length <= 65) ?? cands.find((c) => c.length <= 65) ?? cands[cands.length - 1];
  if (base.length > 65 && !o.seo?.titleOverride) base = base.slice(0, 62).replace(/\s+\S*$/, "") + "…";
  const title = fit(base).length <= 70 ? fit(base) : base;
  const description = o.seo?.descriptionOverride ?? o.description;
  const path = o.seo?.canonicalOverride ?? o.path;
  const noindex = o.noindex || o.seo?.noindex;
  const image = o.seo?.ogImage ?? (o.og && "image" in o.og ? o.og.image : o.og ? `/og/${o.og.family}/${o.og.slug}` : "/og-image-1200x630.png");
  const alt = `${base}: ConnectAtom`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: abs(path) }, // always self-referencing and clean: no query string
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    openGraph: {
      type: o.type ?? "website", url: abs(path), siteName: SITE.name, title, description, locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt }],
      ...(o.type === "article" ? { publishedTime: o.published, modifiedTime: o.modified } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Same, but indexing is decided by the page registry: a thin, gated or noindex page can never be indexed by accident. */
export async function metaFor(o: MetaInput): Promise<Metadata> {
  const row = (await getSite()).rowByUrl.get(o.path);
  return buildMetadata({ ...o, noindex: o.noindex || (row ? !row.indexable : false) });
}
