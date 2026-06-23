"use client";

import Link from "next/link";
import { categories, tr } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { CategoryIcon } from "@/components/CategoryIcon";
import { useStore } from "@/context/StoreContext";

export default function CategoriesPage() {
  const { t, locale } = useStore();
  const productsLabel =
    locale === "ka" ? "პროდუქტი" : locale === "ru" ? "товаров" : "products";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {t("section.categories")}
      </h1>
      <p className="mt-1 text-muted">{t("section.categoriesSub")}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = getProductsByCategory(c.slug).length;
          return (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="group rounded-2xl border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <CategoryIcon name={c.icon} size={26} />
                </span>
                <div>
                  <h2 className="font-bold">{tr(c.name, locale)}</h2>
                  <p className="mt-1 text-sm text-muted">{tr(c.description, locale)}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.subcategories.map((s) => (
                  <span
                    key={s.slug}
                    className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] text-muted"
                  >
                    {tr(s.name, locale)}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold text-primary">
                {count} {productsLabel} →
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
