import type { NextConfig } from "next";

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:5000";

// Pages that must never be indexed (blueprint: portal, admin, forms, thank-you, auth).
const NOINDEX = ["/dashboard/:path*", "/admin/:path*", "/get-quote", "/book-pilot", "/thank-you", "/login", "/register", "/forgot-password", "/reset-password"];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Same-origin API: the browser talks to /api/*, Next forwards it to the Express backend.
  // That keeps the auth cookie first-party and avoids CORS in the browser.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND}/api/:path*` }];
  },
  async headers() {
    return NOINDEX.map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }));
  },
};

export default nextConfig;
