import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import { categories, getCategory, tr } from "@/lib/categories";
import { CategoryHero } from "@/components/CategoryHero";
import { ProductBrowser } from "@/components/ProductBrowser";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: tr(category.name, "ka"),
    description: tr(category.description, "ka"),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  return (
    <div>
      <CategoryHero category={category} />
      <Suspense fallback={<div className="p-12 text-center text-muted" />}>
        <ProductBrowser initialCategory={category.slug} />
      </Suspense>
    </div>
  );
}
