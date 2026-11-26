import type { NextConfig } from "next";
import redirects from "./src/content/catalogue/redirects";

const config: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [360, 640, 828, 1080, 1280, 1600], minimumCacheTTL: 60 * 60 * 24 * 30 },
  compress: true,
  async rewrites() {
    return [
      // child sitemaps: /sitemap-products.xml, /sitemap-industries-2.xml ... (the index at /sitemap-index.xml is a real route and wins)
      { source: "/sitemap-:name.xml", destination: "/sitemaps/:name" },
      { source: "/sitemap.xml", destination: "/sitemap-index.xml" },
      {
  source: "/api/:path*",
  destination: `${process.env.API_ORIGIN ?? (process.env.NODE_ENV === "production" ? "https://api.connectatom.com" : "http://127.0.0.1:5000")}/api/:path*`,
},
    ];
  },
  // Static redirect rules. Redirects stored in MongoDB are applied at request time by the dynamic page routes (site.redirectFor).
  async redirects() {
    return redirects.map((r) => ({ source: r.from, destination: r.to, permanent: true }));
  },
  async headers() {
    return [
      { source: "/logo/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/:path*", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }] },
    ];
  },
};
export default config;
