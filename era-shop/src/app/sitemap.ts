import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import { blogPosts } from "@/lib/blog";

const BASE = "https://erabuild.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/categories",
    "/brands",
    "/blog",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${BASE}/categories/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
