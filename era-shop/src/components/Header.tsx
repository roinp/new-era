"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  Phone,
  ChevronDown,
  HardHat,
  User,
  BarChart2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { categories, tr } from "@/lib/categories";
import { locales, currencies } from "@/lib/i18n";
import { CategoryIcon } from "./CategoryIcon";

export function Header() {
  const {
    t,
    theme,
    toggleTheme,
    cartCount,
    wishlist,
    compare,
    locale,
    setLocale,
    currency,
    setCurrency,
    hydrated,
  } = useStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.products") },
    { href: "/categories", label: t("nav.categories") },
    { href: "/brands", label: t("nav.brands") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      {/* Top bar */}
      <div className="hidden border-b bg-surface-2 text-xs text-muted md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone size={12} /> +995 322 00 00 00
            </span>
            <span>{t("header.freeDelivery")}</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as typeof locale)}
              className="cursor-pointer bg-transparent outline-none"
              aria-label="Language"
            >
              {locales.map((l) => (
                <option key={l.code} value={l.code} className="bg-surface text-foreground">
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as typeof currency)}
              className="cursor-pointer bg-transparent outline-none"
              aria-label="Currency"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code} className="bg-surface text-foreground">
                  {c.code} {c.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
            <HardHat size={22} />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            ERA<span className="text-primary">Build</span>
          </span>
        </Link>

        <form onSubmit={submitSearch} className="relative hidden flex-1 md:block">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="w-full rounded-xl border bg-background px-4 py-2.5 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 grid h-8 w-9 -translate-y-1/2 place-items-center rounded-lg bg-primary text-white"
            aria-label="Search"
          >
            <Search size={16} />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-surface-2"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link
            href="/account"
            className="grid h-10 w-10 place-items-center rounded-xl hover:bg-surface-2"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
          <Link
            href="/compare"
            className="relative hidden h-10 w-10 place-items-center rounded-xl hover:bg-surface-2 sm:grid"
            aria-label="Compare"
          >
            <BarChart2 size={20} />
            {hydrated && compare.length > 0 && (
              <Badge>{compare.length}</Badge>
            )}
          </Link>
          <Link
            href="/wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-surface-2"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {hydrated && wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}
          </Link>
          <Link
            href="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-xl hover:bg-surface-2"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {hydrated && cartCount > 0 && <Badge>{cartCount}</Badge>}
          </Link>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={submitSearch} className="relative px-4 pb-3 md:hidden">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search.placeholder")}
          className="w-full rounded-xl border bg-background px-4 py-2.5 pr-11 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="absolute right-5 top-1/2 grid h-8 w-9 -translate-y-1/2 place-items-center rounded-lg bg-primary text-white"
          aria-label="Search"
        >
          <Search size={16} />
        </button>
      </form>

      {/* Desktop nav */}
      <nav className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-2 rounded-t-lg bg-primary px-4 py-3 text-sm font-semibold text-white">
              <Menu size={16} /> {t("nav.categories")}
              <ChevronDown size={14} />
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full z-50 grid w-[680px] grid-cols-2 gap-1 rounded-b-xl border bg-surface p-3 shadow-2xl">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-surface-2"
                  >
                    <CategoryIcon name={c.icon} size={18} className="text-primary" />
                    {tr(c.name, locale)}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t md:hidden">
          <div className="flex flex-col p-2">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-surface-2"
              >
                {l.label}
              </Link>
            ))}
            <div className="my-2 border-t" />
            <div className="flex gap-2 px-3">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as typeof locale)}
                className="flex-1 rounded-lg border bg-background px-2 py-2 text-sm"
                aria-label="Language"
              >
                {locales.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as typeof currency)}
                className="flex-1 rounded-lg border bg-background px-2 py-2 text-sm"
                aria-label="Currency"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} {c.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
      {children}
    </span>
  );
}
