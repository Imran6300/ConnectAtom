import type { MetadataRoute } from "next";
import { indexableRows, absUrl } from "@/lib/seo/registry";

const CHUNK = 5000; // a sitemap file may hold 50,000 URLs; chunking means nothing changes at 10x size
export async function generateSitemaps() {
  const n = Math.max(1, Math.ceil(indexableRows().length / CHUNK));
  return Array.from({ length: n }, (_, id) => ({ id }));
}
// Next 16: the id arrives as a promise. lastModified is the real content-change date, never the build time.
export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  return indexableRows().slice(id * CHUNK, (id + 1) * CHUNK).map((r) => ({ url: absUrl(r.url), lastModified: r.lastmod }));
}
