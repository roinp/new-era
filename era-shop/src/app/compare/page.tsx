"use client";

import Link from "next/link";
import { X, ShoppingCart, BarChart2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products, unitLabel } from "@/lib/products";
import { getBrand, tr } from "@/lib/categories";
import { StarRating } from "@/components/StarRating";

export default function ComparePage() {
  const { compare, toggleCompare, addToCart, formatPrice, t, locale, hydrated } =
    useStore();
  const items = products.filter((p) => compare.includes(p.id));

  if (!hydrated) return <div className="p-16 text-center text-muted">{t("loading")}</div>;

  if (items.length === 0) {
    return (
      <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 px-4 py-16 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-muted">
          <BarChart2 size={36} />
        </span>
        <h1 className="text-2xl font-extrabold">{t("compare.empty")}</h1>
        <p className="text-muted">{t("compare.emptyText")}</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
        >
          {t("cta.browse")}
        </Link>
      </div>
    );
  }

  const rows: { label: string; render: (id: string) => React.ReactNode }[] = [
    {
      label: t("compare.price"),
      render: (id) => {
        const p = items.find((x) => x.id === id)!;
        return (
          <span className="font-bold text-primary">
            {formatPrice(p.salePrice ?? p.price)}
          </span>
        );
      },
    },
    {
      label: t("compare.rating"),
      render: (id) => {
        const p = items.find((x) => x.id === id)!;
        return <StarRating rating={p.rating} showValue count={p.reviewCount} />;
      },
    },
    {
      label: t("compare.brand"),
      render: (id) => getBrand(items.find((x) => x.id === id)!.brandSlug)?.name,
    },
    {
      label: t("spec.sku"),
      render: (id) => items.find((x) => x.id === id)!.sku,
    },
    {
      label: t("compare.stock"),
      render: (id) => {
        const p = items.find((x) => x.id === id)!;
        return p.stock > 0
          ? `${p.stock} ${unitLabel(p.unit, locale)}`
          : t("product.outOfStock");
      },
    },
    {
      label: t("compare.unit"),
      render: (id) => unitLabel(items.find((x) => x.id === id)!.unit, locale),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("compare.title")}</h1>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[600px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-32" />
              {items.map((p) => (
                <th key={p.id} className="p-3 align-top">
                  <div className="relative rounded-2xl border bg-surface p-4 text-center">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute right-2 top-2 text-muted hover:text-red-500"
                      aria-label="Remove"
                    >
                      <X size={16} />
                    </button>
                    <Link href={`/products/${p.slug}`}>
                      <span className="text-5xl">{p.emoji}</span>
                      <p className="mt-2 line-clamp-2 text-sm font-semibold">
                        {tr(p.nameL, locale)}
                      </p>
                    </Link>
                    <button
                      onClick={() => addToCart(p)}
                      className="mt-3 inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-hover"
                    >
                      <ShoppingCart size={14} /> {t("compare.add")}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-surface-2" : ""}>
                <td className="p-3 text-sm font-semibold">{row.label}</td>
                {items.map((p) => (
                  <td key={p.id} className="p-3 text-center text-sm">
                    {row.render(p.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
