"use client";

import Link from "next/link";
import { Heart, ShoppingCart, BarChart2 } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { StarRating } from "./StarRating";
import { getBrand, tr } from "@/lib/categories";
import { unitLabel } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const {
    addToCart,
    toggleWishlist,
    wishlist,
    toggleCompare,
    compare,
    formatPrice,
    t,
    locale,
  } = useStore();
  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  const brand = getBrand(product.brandSlug);
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
            -{discount}%
          </span>
        )}
      </div>

      {/* Quick actions */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
          className={`grid h-9 w-9 place-items-center rounded-full border bg-surface shadow-sm transition-colors hover:text-primary ${
            wished ? "text-red-500" : "text-muted"
          }`}
        >
          <Heart size={16} className={wished ? "fill-red-500" : ""} />
        </button>
        <button
          onClick={() => toggleCompare(product.id)}
          aria-label="Compare"
          className={`grid h-9 w-9 place-items-center rounded-full border bg-surface shadow-sm transition-colors hover:text-primary ${
            compared ? "text-primary" : "text-muted"
          }`}
        >
          <BarChart2 size={16} />
        </button>
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="relative grid aspect-square place-items-center bg-gradient-to-br from-surface-2 to-background text-7xl"
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {brand?.name}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary"
        >
          {tr(product.nameL, locale)}
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} showValue />

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-muted line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            )}
            <span className="text-[11px] text-muted">
              {t("product.perUnit")} {unitLabel(product.unit, locale)}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            aria-label={t("cta.addToCart")}
            className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
        <span
          className={`text-[11px] font-medium ${
            product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${t("product.inStock")} (${product.stock})`
            : t("product.outOfStock")}
        </span>
      </div>
    </div>
  );
}
