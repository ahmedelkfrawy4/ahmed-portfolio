import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ahmed Elkfrawy — UI/UX Designer",
    short_name: "Ahmed Elkfrawy",
    description:
      "Portfolio of Ahmed Elkfrawy, a UI/UX designer in Cairo crafting digital experiences across e-commerce, healthcare, education and fintech.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF7F0",
    theme_color: "#FBF7F0",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/apple-icon.jpg",
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
  };
}
