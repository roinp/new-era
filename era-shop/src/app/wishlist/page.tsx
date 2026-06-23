"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist, t, hydrated } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (!hydrated) return <div className="p-16 text-center text-muted">{t("loading")}</div>;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("wishlist.title")}</h1>

      {items.length === 0 ? (
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-4 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-muted">
            <Heart size={36} />
          </span>
          <p className="text-muted">{t("wishlist.empty")}</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
          >
            {t("cta.shopNow")} <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
