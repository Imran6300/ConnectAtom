import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// robots.txt does NOT keep pages out of the index (a blocked page cannot show its noindex tag).
// Private pages are protected by login and noindex; here we only steer crawlers away from the API, accounts and forms.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard", "/admin", "/get-quote", "/book-pilot", "/thank-you", "/login", "/register", "/forgot-password", "/reset-password"] }],
    sitemap: `${SITE.url}/sitemap-index.xml`,
  };
}
