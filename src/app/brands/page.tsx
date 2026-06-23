"use client";

import Link from "next/link";
import { brands } from "@/lib/categories";
import { products } from "@/lib/products";
import { useStore } from "@/context/StoreContext";

export default function BrandsPage() {
  const { t, locale } = useStore();
  const productsLabel =
    locale === "ka" ? "პროდუქტი" : locale === "ru" ? "товаров" : "products";
  const subtitle =
    locale === "ka"
      ? "ვთანამშრომლობთ წამყვან მწარმოებლებთან სერტიფიცირებული ხარისხისთვის."
      : locale === "ru"
        ? "Сотрудничаем с ведущими производителями ради сертифицированного качества."
        : "We partner with leading manufacturers to bring you certified quality.";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("section.brands")}</h1>
      <p className="mt-1 text-muted">{subtitle}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((b) => {
          const count = products.filter((p) => p.brandSlug === b.slug).length;
          return (
            <Link
              key={b.slug}
              href={`/products?brand=${b.slug}`}
              className="flex flex-col items-center gap-3 rounded-2xl border bg-surface p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="text-5xl">{b.logo}</span>
              <span className="text-lg font-bold">{b.name}</span>
              <span className="text-xs text-muted">
                {count} {productsLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
