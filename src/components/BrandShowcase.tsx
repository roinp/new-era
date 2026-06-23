import Link from "next/link";
import { brands } from "@/lib/categories";
import { SectionHeader } from "./SectionHeader";

export function BrandShowcase() {
  return (
    <section>
      <SectionHeader titleKey="section.brands" viewAllHref="/brands" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {brands.map((b) => (
          <Link
            key={b.slug}
            href={`/products?brand=${b.slug}`}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <span className="text-3xl">{b.logo}</span>
            <span className="text-xs font-semibold">{b.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
