"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CurrencyCode, Locale, Product } from "@/lib/types";
import { currencies, translations, DEFAULT_LOCALE } from "@/lib/i18n";
import { products as catalog } from "@/lib/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[]; // product ids
  compare: string[]; // product ids
  theme: "light" | "dark";
  locale: Locale;
  currency: CurrencyCode;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  setTheme: (t: "light" | "dark") => void;
  toggleTheme: () => void;
  setLocale: (l: Locale) => void;
  setCurrency: (c: CurrencyCode) => void;
  t: (key: string) => string;
  formatPrice: (usd: number) => string;
  cartCount: number;
  cartTotal: number;
  hydrated: boolean;
}

const StoreContext = createContext<StoreState | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [currency, setCurrencyState] = useState<CurrencyCode>("GEL");
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    // Refresh persisted cart items against the current catalog so older saved
    // products (missing newer fields like localized names) stay valid.
    const savedCart = load<CartItem[]>("era_cart", []);
    const freshCart = savedCart
      .map((i) => {
        const fresh = catalog.find((p) => p.id === i.product?.id);
        return fresh ? { product: fresh, qty: i.qty } : null;
      })
      .filter((i): i is CartItem => i !== null);
    setCart(freshCart);
    setWishlist(load<string[]>("era_wishlist", []));
    setCompare(load<string[]>("era_compare", []));
    const storedTheme = load<"light" | "dark" | null>("era_theme", null);
    // Dark mode is the default unless the user has explicitly chosen otherwise.
    setThemeState(storedTheme ?? "dark");
    setLocaleState(load<Locale>("era_locale", DEFAULT_LOCALE));
    setCurrencyState(load<CurrencyCode>("era_currency", "GEL"));
    setHydrated(true);
  }, []);

  // Persist + apply theme class.
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_cart", JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_compare", JSON.stringify(compare));
  }, [compare, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_theme", JSON.stringify(theme));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_locale", JSON.stringify(locale));
    document.documentElement.lang = locale;
  }, [locale, hydrated]);
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("era_currency", JSON.stringify(currency));
  }, [currency, hydrated]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 4
          ? prev
          : [...prev, id]
    );
  }, []);

  const setTheme = useCallback((tw: "light" | "dark") => setThemeState(tw), []);
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    []
  );
  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const setCurrency = useCallback((c: CurrencyCode) => setCurrencyState(c), []);

  const t = useCallback(
    (key: string) =>
      translations[locale][key] ?? translations[DEFAULT_LOCALE][key] ?? key,
    [locale]
  );

  const formatPrice = useCallback(
    (usd: number) => {
      const c = currencies.find((x) => x.code === currency)!;
      const value = usd * c.rate;
      return `${c.symbol}${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    [currency]
  );

  const cartCount = cart.reduce((n, i) => n + i.qty, 0);
  const cartTotal = cart.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.qty,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compare,
        theme,
        locale,
        currency,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        toggleCompare,
        setTheme,
        toggleTheme,
        setLocale,
        setCurrency,
        t,
        formatPrice,
        cartCount,
        cartTotal,
        hydrated,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
