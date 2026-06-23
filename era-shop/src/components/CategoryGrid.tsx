"use client";

import Link from "next/link";
import { categories, tr } from "@/lib/categories";
import { CategoryIcon } from "./CategoryIcon";
import { useStore } from "@/context/StoreContext";

export function CategoryGrid({ limit }: { limit?: number }) {
  const { locale } = useStore();
  const list = limit ? categories.slice(0, limit) : categories;
  const typesLabel =
    locale === "ka" ? "ტიპი" : locale === "ru" ? "типов" : "types";
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {list.map((c) => (
        <Link
          key={c.slug}
          href={`/categories/${c.slug}`}
          className="group flex flex-col items-center gap-3 rounded-2xl border bg-surface p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
        >
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <CategoryIcon name={c.icon} size={26} />
          </span>
          <span className="text-xs font-semibold leading-tight">
            {tr(c.name, locale)}
          </span>
          <span className="text-[11px] text-muted">
            {c.subcategories.length} {typesLabel}
          </span>
        </Link>
      ))}
    </div>
  );
}
