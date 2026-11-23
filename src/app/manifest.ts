import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "ConnectAtom", short_name: "ConnectAtom", description: "Know before it fails.", start_url: "/", display: "standalone", background_color: "#0A1622", theme_color: "#0A1622", icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }] };
}
