import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plate · Healthy Meal Picker",
    short_name: "Plate",
    description: "One healthy, tasty meal at a time, with step-by-step cooking.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f2ea",
    theme_color: "#f6f2ea",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
