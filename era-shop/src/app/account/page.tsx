"use client";

import { useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  FileText,
  LogIn,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

type Tab = "profile" | "orders" | "addresses" | "invoices";

const mockOrders = [
  { id: "ORD-10241", date: "2026-06-12", statusKey: "delivered", total: 1340.5, items: 8 },
  { id: "ORD-10199", date: "2026-05-28", statusKey: "shipped", total: 540.0, items: 3 },
  { id: "ORD-10155", date: "2026-05-10", statusKey: "processing", total: 2210.75, items: 14 },
];

export default function AccountPage() {
  const { wishlist, locale } = useStore();
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<Tab>("profile");

  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;

  const statusLabel: Record<string, string> = {
    delivered: L("მიწოდებულია", "Delivered", "Доставлен"),
    shipped: L("გზაშია", "Shipped", "Отправлен"),
    processing: L("მუშავდება", "Processing", "В обработке"),
  };

  if (!loggedIn) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16">
        <div className="rounded-2xl border bg-surface p-8">
          <h1 className="text-2xl font-extrabold">{L("შესვლა", "Sign in", "Вход")}</h1>
          <p className="mt-1 text-sm text-muted">
            {L(
              "შედი შენს შეკვეთებზე, სასურველებსა და ინვოისებზე.",
              "Access your orders, wishlist and invoices.",
              "Доступ к заказам, избранному и счетам."
            )}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLoggedIn(true);
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="mb-1 block text-sm font-semibold">
                {L("ელ-ფოსტა", "Email", "Email")}
              </label>
              <input
                type="email"
                required
                defaultValue="demo@erabuild.example"
                className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">
                {L("პაროლი", "Password", "Пароль")}
              </label>
              <input
                type="password"
                required
                defaultValue="demo1234"
                className="w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
            >
              <LogIn size={18} /> {L("შესვლა", "Sign in", "Войти")}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-muted">
            {L("არ გაქვს ანგარიში?", "No account?", "Нет аккаунта?")}{" "}
            <span className="font-semibold text-primary">
              {L("რეგისტრაცია", "Register", "Регистрация")}
            </span>
          </p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { key: "profile", label: L("პროფილი", "Profile", "Профиль"), icon: User },
    { key: "orders", label: L("შეკვეთები", "Orders", "Заказы"), icon: Package },
    { key: "addresses", label: L("მისამართები", "Addresses", "Адреса"), icon: MapPin },
    { key: "invoices", label: L("ინვოისები", "Invoices", "Счета"), icon: FileText },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {L("ჩემი ანგარიში", "My Account", "Мой аккаунт")}
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-2xl border bg-surface p-3">
          {tabs.map((tt) => (
            <button
              key={tt.key}
              onClick={() => setTab(tt.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === tt.key ? "bg-primary text-white" : "hover:bg-surface-2"
              }`}
            >
              <tt.icon size={18} /> {tt.label}
            </button>
          ))}
          <Link
            href="/wishlist"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-surface-2"
          >
            <Heart size={18} /> {L("სასურველი", "Wishlist", "Избранное")} ({wishlist.length})
          </Link>
          <button
            onClick={() => setLoggedIn(false)}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-surface-2"
          >
            <LogOut size={18} /> {L("გასვლა", "Sign out", "Выход")}
          </button>
        </aside>

        <div className="rounded-2xl border bg-surface p-6">
          {tab === "profile" && (
            <div className="max-w-lg space-y-4">
              <h2 className="text-lg font-bold">
                {L("პროფილის დეტალები", "Profile details", "Данные профиля")}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info label={L("სრული სახელი", "Full name", "Полное имя")} value="Demo Contractor" />
                <Info label={L("კომპანია", "Company", "Компания")} value="Demo Build LLC" />
                <Info label={L("ელ-ფოსტა", "Email", "Email")} value="demo@erabuild.example" />
                <Info label={L("ტელეფონი", "Phone", "Телефон")} value="+995 599 00 00 00" />
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div>
              <h2 className="mb-4 text-lg font-bold">
                {L("შეკვეთების ისტორია", "Order history", "История заказов")}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted">
                      <th className="py-2">{L("შეკვეთა", "Order", "Заказ")}</th>
                      <th className="py-2">{L("თარიღი", "Date", "Дата")}</th>
                      <th className="py-2">{L("რაოდ.", "Items", "Кол-во")}</th>
                      <th className="py-2">{L("სტატუსი", "Status", "Статус")}</th>
                      <th className="py-2 text-right">{L("ჯამი", "Total", "Итого")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((o) => (
                      <tr key={o.id} className="border-b">
                        <td className="py-3 font-semibold">{o.id}</td>
                        <td className="py-3 text-muted">{o.date}</td>
                        <td className="py-3 text-muted">{o.items}</td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              o.statusKey === "delivered"
                                ? "bg-green-500/15 text-green-600 dark:text-green-400"
                                : o.statusKey === "shipped"
                                  ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                  : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {statusLabel[o.statusKey]}
                          </span>
                        </td>
                        <td className="py-3 text-right font-bold">
                          ${o.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === "addresses" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <AddressCard title={L("ანგარიშფაქტურის მისამართი", "Billing address", "Адрес для счёта")} />
              <AddressCard title={L("მიწოდების მისამართი", "Shipping address", "Адрес доставки")} />
            </div>
          )}

          {tab === "invoices" && (
            <div>
              <h2 className="mb-4 text-lg font-bold">{L("ინვოისები", "Invoices", "Счета")}</h2>
              <ul className="space-y-2">
                {mockOrders.map((o) => (
                  <li
                    key={o.id}
                    className="flex items-center justify-between rounded-xl border p-3 text-sm"
                  >
                    <span className="font-semibold">{L("ინვოისი", "Invoice", "Счёт")} {o.id}</span>
                    <button className="inline-flex items-center gap-1 font-semibold text-primary">
                      <FileText size={14} /> {L("PDF ჩამოტვირთვა", "Download PDF", "Скачать PDF")}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function AddressCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border p-4 text-sm">
      <p className="font-bold">{title}</p>
      <p className="mt-2 text-muted">
        Demo Contractor
        <br />
        12 Industrial Ave
        <br />
        Tbilisi 0190, Georgia
        <br />
        +995 599 00 00 00
      </p>
    </div>
  );
}
