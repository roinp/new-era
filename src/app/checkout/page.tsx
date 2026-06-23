"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, Building2, Wallet, CheckCircle2, Lock } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { tr } from "@/lib/categories";
import { Locale } from "@/lib/types";

export default function CheckoutPage() {
  const { cart, cartTotal, formatPrice, clearCart, t, locale, hydrated } = useStore();
  const [placed, setPlaced] = useState(false);
  const [method, setMethod] = useState<"card" | "paypal" | "bank">("card");

  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;

  const shipping = cartTotal > 500 || cartTotal === 0 ? 0 : 25;
  const total = cartTotal + shipping;

  if (!hydrated) return <div className="p-16 text-center text-muted">{t("loading")}</div>;

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <CheckCircle2 size={56} className="text-green-500" />
        <h1 className="text-2xl font-extrabold">
          {L("შეკვეთა მიღებულია!", "Order placed!", "Заказ оформлен!")}
        </h1>
        <p className="text-muted">
          {L(
            "გმადლობთ. დადასტურება გამოგზავნილია თქვენს ელ-ფოსტაზე. შეკვეთის ნომერია ",
            "Thank you. A confirmation has been sent to your email. Your order number is ",
            "Спасибо. Подтверждение отправлено на ваш email. Номер заказа "
          )}
          <span className="font-bold text-foreground">ORD-10288</span>.
        </p>
        <Link
          href="/account"
          className="mt-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
        >
          {L("შეკვეთის თვალყურის დევნება", "Track your order", "Отследить заказ")}
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-extrabold">{t("cart.empty")}</h1>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
        >
          {t("cta.shopNow")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {L("გადახდა", "Checkout", "Оформление заказа")}
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          clearCart();
          setPlaced(true);
        }}
        className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
      >
        <div className="space-y-6">
          {/* Shipping */}
          <section className="rounded-2xl border bg-surface p-6">
            <h2 className="mb-4 text-lg font-bold">
              {L("მიწოდების მონაცემები", "Shipping details", "Данные доставки")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={L("სრული სახელი", "Full name", "Полное имя")} locale={locale} required />
              <Field label={L("ელ-ფოსტა", "Email", "Email")} locale={locale} type="email" required />
              <Field label={L("ტელეფონი", "Phone", "Телефон")} locale={locale} type="tel" required />
              <Field label={L("კომპანია (არასავ.)", "Company (optional)", "Компания (необяз.)")} locale={locale} />
              <div className="sm:col-span-2">
                <Field label={L("მისამართი", "Address", "Адрес")} locale={locale} required />
              </div>
              <Field label={L("ქალაქი", "City", "Город")} locale={locale} required />
              <Field label={L("საფოსტო კოდი", "Postal code", "Индекс")} locale={locale} required />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-2xl border bg-surface p-6">
            <h2 className="mb-4 text-lg font-bold">
              {L("გადახდის მეთოდი", "Payment method", "Способ оплаты")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { key: "card", label: L("ბარათი", "Card", "Карта"), icon: CreditCard },
                { key: "paypal", label: "PayPal", icon: Wallet },
                { key: "bank", label: L("ბანკით გადარიცხვა", "Bank transfer", "Банковский перевод"), icon: Building2 },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMethod(m.key as typeof method)}
                  className={`flex items-center gap-2 rounded-xl border p-4 text-sm font-semibold transition-colors ${
                    method === m.key
                      ? "border-primary bg-primary/5 text-primary"
                      : "hover:bg-surface-2"
                  }`}
                >
                  <m.icon size={18} /> {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field label={L("ბარათის ნომერი", "Card number", "Номер карты")} locale={locale} placeholder="4242 4242 4242 4242" required />
                </div>
                <Field label={L("ვადა", "Expiry", "Срок")} locale={locale} placeholder="MM/YY" required />
                <Field label="CVC" locale={locale} placeholder="123" required />
              </div>
            )}
            {method === "bank" && (
              <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-muted">
                {L(
                  "ბანკით გადარიცხვის ინსტრუქცია და პროფორმა ინვოისი გამოგეგზავნებათ შეკვეთის გაფორმების შემდეგ.",
                  "Bank transfer instructions and a proforma invoice will be emailed to you after placing the order.",
                  "Инструкции по переводу и счёт-проформа будут отправлены на email после оформления."
                )}
              </p>
            )}
            {method === "paypal" && (
              <p className="mt-4 rounded-xl bg-surface-2 p-4 text-sm text-muted">
                {L(
                  "გადახდის დასასრულებლად გადამისამართდებით PayPal-ზე.",
                  "You will be redirected to PayPal to complete payment securely.",
                  "Вы будете перенаправлены в PayPal для безопасной оплаты."
                )}
              </p>
            )}
          </section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border bg-surface p-6">
          <h2 className="text-lg font-bold">
            {L("თქვენი შეკვეთა", "Your order", "Ваш заказ")}
          </h2>
          <ul className="mt-4 space-y-3">
            {cart.map(({ product, qty }) => (
              <li key={product.id} className="flex items-center gap-3 text-sm">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface-2 text-xl">
                  {product.emoji}
                </span>
                <span className="flex-1 line-clamp-1">{tr(product.nameL, locale)}</span>
                <span className="text-muted">×{qty}</span>
                <span className="font-semibold">
                  {formatPrice((product.salePrice ?? product.price) * qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{t("cart.subtotal")}</dt>
              <dd className="font-semibold">{formatPrice(cartTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{t("cart.shipping")}</dt>
              <dd className="font-semibold">
                {shipping === 0 ? t("cart.free") : formatPrice(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base">
              <dt className="font-bold">{t("cart.total")}</dt>
              <dd className="font-extrabold text-primary">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
          >
            <Lock size={16} /> {L("შეკვეთის გაფორმება", "Place order", "Оформить заказ")}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  type = "text",
  required,
  placeholder,
  locale,
}: {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  locale: Locale;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        aria-label={label}
        data-locale={locale}
        className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
