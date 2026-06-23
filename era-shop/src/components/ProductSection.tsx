import { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";

export function ProductSection({
  titleKey,
  title,
  subtitle,
  products,
  viewAllHref,
}: {
  titleKey?: string;
  title?: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;
  return (
    <section>
      <SectionHeader
        titleKey={titleKey}
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
