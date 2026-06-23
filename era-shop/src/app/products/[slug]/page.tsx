import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, products, getProductsByCategory } from "@/lib/products";
import { getBrand, getCategory, tr } from "@/lib/categories";
import { ProductDetail } from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: tr(product.nameL, "ka"),
    description: tr(product.shortL, "ka"),
    openGraph: {
      title: tr(product.nameL, "ka"),
      description: tr(product.shortL, "ka"),
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);

  // Product schema.org structured data for SEO.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tr(product.nameL, "ka"),
    sku: product.sku,
    description: tr(product.shortL, "ka"),
    brand: { "@type": "Brand", name: brand?.name },
    category: category ? tr(category.name, "ka") : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
    offers: {
      "@type": "Offer",
      price: product.salePrice ?? product.price,
      priceCurrency: "USD",
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
