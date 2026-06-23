"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  BarChart2,
  Truck,
  ShieldCheck,
  RotateCcw,
  FileDown,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { StarRating } from "./StarRating";
import { getBrand, getCategory, tr } from "@/lib/categories";
import { unitLabel } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const trustBadges = [
  { icon: Truck, label: "trust.delivery" },
  { icon: ShieldCheck, label: "trust.warranty" },
  { icon: RotateCcw, label: "trust.returns" },
  { icon: FileDown, label: "trust.spec" },
];

export function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
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
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");
  const [added, setAdded] = useState(false);

  const brand = getBrand(product.brandSlug);
  const category = getCategory(product.categorySlug);
  const wished = wishlist.includes(product.id);
  const compared = compare.includes(product.id);
  const price = product.salePrice ?? product.price;
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link href="/" className="hover:text-primary">{t("nav.home")}</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-primary">{t("nav.products")}</Link>
        <span>/</span>
        <Link href={`/categories/${category?.slug}`} className="hover:text-primary">
          {category && tr(category.name, locale)}
        </Link>
        <span>/</span>
        <span className="text-foreground">{tr(product.nameL, locale)}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="grid aspect-square place-items-center rounded-3xl border bg-gradient-to-br from-surface-2 to-background text-[10rem]">
            {product.images[activeImg]}
          </div>
          <div className="mt-4 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`grid h-20 w-20 place-items-center rounded-xl border text-4xl transition-colors ${
                  activeImg === i ? "border-primary ring-2 ring-ring/40" : "hover:border-primary"
                }`}
              >
                {img}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/products?brand=${brand?.slug}`}
              className="text-sm font-semibold text-primary"
            >
              {brand?.logo} {brand?.name}
            </Link>
            {product.isNew && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                New
              </span>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {tr(product.nameL, locale)}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} showValue count={product.reviewCount} />
            <span className="text-sm text-muted">
              {t("product.sku")}: {product.sku}
            </span>
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-4xl font-extrabold text-primary">
              {formatPrice(price)}
            </span>
            {product.salePrice && (
              <>
                <span className="text-xl text-muted line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                  {t("product.save")} {discount}%
                </span>
              </>
            )}
            <span className="text-sm text-muted">/ {unitLabel(product.unit, locale)}</span>
          </div>

          <p className="mt-5 text-muted">{tr(product.shortL, locale)}</p>

          <div className="mt-5 flex items-center gap-2 text-sm">
            <span
              className={`font-semibold ${
                product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `✓ ${t("product.inStock")} — ${product.stock} ${unitLabel(product.unit, locale)} ${t("product.available")}`
                : t("product.outOfStock")}
            </span>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center hover:bg-surface-2"
                aria-label="Decrease"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-12 place-items-center hover:bg-surface-2"
                aria-label="Increase"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover disabled:opacity-40"
            >
              {added ? (
                <>
                  <Check size={18} /> {t("product.added")}
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> {t("cta.addToCart")}
                </>
              )}
            </button>
          </div>

          <div className="mt-3 flex gap-3">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-surface-2 ${
                wished ? "text-red-500" : ""
              }`}
            >
              <Heart size={16} className={wished ? "fill-red-500" : ""} />
              {wished ? t("product.saved") : t("product.wishlist")}
            </button>
            <button
              onClick={() => toggleCompare(product.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-surface-2 ${
                compared ? "text-primary" : ""
              }`}
            >
              <BarChart2 size={16} /> {t("product.compare")}
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold hover:bg-surface-2"
            >
              {t("cta.requestQuote")}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t pt-6 sm:grid-cols-4">
            {trustBadges.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <Icon size={20} className="text-primary" />
                <span className="text-xs text-muted">{t(label)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b">
          {(["description", "specs", "reviews"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`border-b-2 px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                tab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {key === "specs"
                ? t("product.tab.specs")
                : key === "reviews"
                  ? `${t("product.tab.reviews")} (${product.reviewCount})`
                  : t("product.tab.description")}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-muted">
              <p>{tr(product.descriptionL, locale)}</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-2"
              >
                <FileDown size={16} /> {t("product.downloadPdf")}
              </a>
            </div>
          )}

          {tab === "specs" && (
            <div className="max-w-2xl overflow-hidden rounded-2xl border">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr key={s.key} className={i % 2 ? "bg-surface-2" : ""}>
                      <td className="w-1/3 px-4 py-3 font-semibold">
                        {t(`spec.${s.key}`)}
                      </td>
                      <td className="px-4 py-3 text-muted">{tr(s.value, locale)}</td>
                    </tr>
                  ))}
                  <tr className={product.specs.length % 2 ? "bg-surface-2" : ""}>
                    <td className="px-4 py-3 font-semibold">{t("spec.sku")}</td>
                    <td className="px-4 py-3 text-muted">{product.sku}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {tab === "reviews" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border bg-surface p-5">
                <div className="text-center">
                  <p className="text-4xl font-extrabold">{product.rating.toFixed(1)}</p>
                  <StarRating rating={product.rating} />
                  <p className="mt-1 text-xs text-muted">
                    {product.reviewCount} {t("product.reviewsCount")}
                  </p>
                </div>
                <div className="flex-1 text-sm text-muted">
                  {t("product.reviewsSummary")}
                </div>
              </div>
              {product.reviews.map((r, i) => (
                <div key={i} className="rounded-2xl border bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{r.author}</p>
                    <span className="text-xs text-muted">{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="mt-2 text-sm text-muted">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">
            {t("section.related")}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
