import { NextResponse, type NextRequest } from "next/server";

// Next 16 "proxy" (formerly middleware).
// 1) One URL per page: lowercase, enforced with a 308.
// 2) First-visit attribution: stores the landing page, referrer and campaign tags in a first-party cookie.
//    The lead form reads it into leads.origin, so revenue can be traced to the page that earned it.
export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone(); url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
  const res = NextResponse.next();
  const isDoc = (req.headers.get("accept") ?? "").includes("text/html") && !req.headers.get("next-router-prefetch") && !req.headers.get("purpose");
  if (isDoc && !req.cookies.get("ca_origin")) {
    const g = (k: string) => searchParams.get(k) ?? undefined;
    const origin = {
      firstPageUrl: (req.nextUrl.origin + pathname).slice(0, 300), referrer: (req.headers.get("referer") ?? "").slice(0, 300) || undefined,
      utm: { source: g("utm_source"), medium: g("utm_medium"), campaign: g("utm_campaign"), content: g("utm_content"), term: g("utm_term") },
      gclid: g("gclid"), fbclid: g("fbclid"), at: Date.now(),
    };
    res.cookies.set("ca_origin", encodeURIComponent(JSON.stringify(origin)), { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax", httpOnly: false });
  }
  return res;
}
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
