import Link from "next/link";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductSection } from "@/components/ProductSection";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { SectionHeader } from "@/components/SectionHeader";
import { PromoBanners } from "@/components/PromoBanners";
import { bestSellers, newArrivals, onSaleProducts } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-4">
        <SectionHeader
          titleKey="section.categories"
          subtitleKey="section.categoriesSub"
          viewAllHref="/categories"
        />
        <CategoryGrid limit={12} />
      </section>

      <PromoBanners />

      <section className="mx-auto w-full max-w-7xl px-4">
        <ProductSection
          titleKey="section.bestSellers"
          products={bestSellers}
          viewAllHref="/products?sort=popular"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <ProductSection
          titleKey="section.newArrivals"
          products={newArrivals}
          viewAllHref="/products?sort=new"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <ProductSection
          titleKey="section.offers"
          products={onSaleProducts}
          viewAllHref="/products?sale=1"
        />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <BrandShowcase />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <Testimonials />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4">
        <Newsletter />
      </section>
    </div>
  );
}
