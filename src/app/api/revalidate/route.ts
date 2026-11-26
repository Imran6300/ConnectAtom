import { revalidatePath, revalidateTag } from "next/cache";
import { CATALOGUE_TAG } from "@/lib/catalogue/repo";

// Call after adding or editing records in MongoDB:
//   curl -X POST https://connectatom.com/api/revalidate -H "x-revalidate-secret: $REVALIDATE_SECRET" -H "content-type: application/json" -d '{}'
// Optional body: { "paths": ["/products/cold-room-monitor"] }. Default refreshes the whole catalogue (every page, the sitemaps and all links).
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) return Response.json({ error: "unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { paths?: string[] };
  revalidateTag(CATALOGUE_TAG, { expire: 0 });
  for (const p of (body.paths ?? []).filter((x) => typeof x === "string" && x.startsWith("/")).slice(0, 50)) revalidatePath(p);
  return Response.json({ revalidated: true, tag: CATALOGUE_TAG, at: new Date().toISOString() });
}
