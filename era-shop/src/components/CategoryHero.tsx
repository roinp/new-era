"use client";

import Link from "next/link";
import { Category } from "@/lib/types";
import { tr } from "@/lib/categories";
import { CategoryIcon } from "./CategoryIcon";
import { useStore } from "@/context/StoreContext";

export function CategoryHero({ category }: { category: Category }) {
  const { t, locale } = useStore();
  return (
    <div className="border-b bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <nav className="mb-4 flex items-center gap-1 text-sm text-slate-300">
          <Link href="/" className="hover:text-white">{t("nav.home")}</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-white">{t("nav.categories")}</Link>
          <span>/</span>
          <span className="text-white">{tr(category.name, locale)}</span>
        </nav>
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-white">
            <CategoryIcon name={category.icon} size={32} />
          </span>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {tr(category.name, locale)}
            </h1>
            <p className="mt-1 max-w-xl text-slate-300">
              {tr(category.description, locale)}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {category.subcategories.map((s) => (
            <span
              key={s.slug}
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm"
            >
              {tr(s.name, locale)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
