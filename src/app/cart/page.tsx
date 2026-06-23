"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { tr } from "@/lib/categories";
import { unitLabel } from "@/lib/products";

export default function CartPage() {
  const {
    cart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    formatPrice,
    t,
    locale,
    hydrated,
  } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "BUILD10") setApplied(0.1);
    else setApplied(0);
  };

  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 25;
  const discount = cartTotal * applied;
  const total = cartTotal - discount + shipping;

  if (!hydrated) {
    return <div className="p-16 text-center text-muted">Loading…</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-surface-2 text-muted">
          <ShoppingBag size={36} />
        </span>
        <h1 className="text-2xl font-extrabold">{t("cart.empty")}</h1>
        <p className="text-muted">{t("cart.emptyText")}</p>
        <Link
          href="/products"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
        >
          {t("cta.shopNow")} <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t("cart.title")}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cart.map(({ product, qty }) => {
            const price = product.salePrice ?? product.price;
            return (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-2xl border bg-surface p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-surface-2 text-5xl"
                >
                  {product.emoji}
                </Link>
                <div className="flex-1">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-semibold hover:text-primary"
                  >
                    {tr(product.nameL, locale)}
                  </Link>
                  <p className="text-xs text-muted">
                    {t("product.sku")}: {product.sku}
                  </p>
                  <p className="mt-1 text-sm font-bold text-primary">
                    {formatPrice(price)}{" "}
                    <span className="font-normal text-muted">
                      / {unitLabel(product.unit, locale)}
                    </span>
                  </p>
                </div>
                <div className="flex items-center rounded-xl border">
                  <button
                    onClick={() => updateQty(product.id, qty - 1)}
                    className="grid h-10 w-10 place-items-center hover:bg-surface-2"
                    aria-label="Decrease"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button
                    onClick={() => updateQty(product.id, qty + 1)}
                    className="grid h-10 w-10 place-items-center hover:bg-surface-2"
                    aria-label="Increase"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-3 sm:w-28 sm:justify-end">
                  <span className="font-bold">{formatPrice(price * qty)}</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-muted hover:text-red-500"
                    aria-label="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-sm font-semibold text-muted hover:text-red-500"
          >
            {t("cart.clear")}
          </button>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border bg-surface p-6">
          <h2 className="text-lg font-bold">{t("cart.summary")}</h2>

          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={t("cart.coupon")}
                className="w-full rounded-xl border bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              onClick={applyCoupon}
              className="rounded-xl border px-4 text-sm font-semibold hover:bg-surface-2"
            >
              {t("cart.apply")}
            </button>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{t("cart.subtotal")}</dt>
              <dd className="font-semibold">{formatPrice(cartTotal)}</dd>
            </div>
            {applied > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <dt>{t("cart.discount")} (10%)</dt>
                <dd>-{formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted">{t("cart.shipping")}</dt>
              <dd className="font-semibold">
                {shipping === 0 ? t("cart.free") : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base">
              <dt className="font-bold">{t("cart.total")}</dt>
              <dd className="font-extrabold text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
          >
            {t("cart.checkout")} <ArrowRight size={18} />
          </Link>
          <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted">
            <ShieldCheck size={14} /> {t("cart.secure")}
          </p>
        </aside>
      </div>
    </div>
  );
}
