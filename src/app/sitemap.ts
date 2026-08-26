import type { MetadataRoute } from "next";

const baseUrl = "https://www.ecosaehan.com";

const routes = [
  "",
  "/about",
  "/products",
  "/products/palm-mat",
  "/products/cargo-tension-bar",
  "/products/tree-band",
  "/products/tree-tie",
  "/products/house-band",
  "/certifications",
  "/contact",
  "/support/materials",
  "/support/faq"
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/products") ? 0.8 : 0.6
  }));
}
