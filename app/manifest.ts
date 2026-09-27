import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kilow Limited",
    short_name: "Kilow",
    description: "Indie mobile game studio building polished Android games.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0d0c14",
    theme_color: "#0d0c14",
    icons: [{ src: "/img/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }],
  };
}
