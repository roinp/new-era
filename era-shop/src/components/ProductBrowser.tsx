"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { products as allProducts } from "@/lib/products";
import { categories, brands, tr } from "@/lib/categories";
import { ProductCard } from "./ProductCard";
import { useStore } from "@/context/StoreContext";

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating" | "new" | "popular";

export function ProductBrowser({ initialCategory }: { initialCategory?: string }) {
  const params = useSearchParams();
  const { t, locale } = useStore();

  const [query, setQuery] = useState("");
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [saleOnly, setSaleOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [mobileFilters, setMobileFilters] = useState(false);

  // Sync from URL on mount / param change.
  useEffect(() => {
    setQuery(params.get("q") ?? "");
    const b = params.get("brand");
    if (b) setSelectedBrands([b]);
    const cat = params.get("category");
    if (cat) setSelectedCats([cat]);
    if (params.get("sale")) setSaleOnly(true);
    const s = params.get("sort");
    if (s === "new") setSort("new");
    else if (s === "popular") setSort("popular");
  }, [params]);

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.nameL.ka} ${p.nameL.ru} ${p.sku} ${p.tags.join(" ")} ${p.brandSlug} ${p.categorySlug}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (selectedCats.length && !selectedCats.includes(p.categorySlug)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brandSlug)) return false;
      const effective = p.salePrice ?? p.price;
      if (effective > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (saleOnly && !p.salePrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      const pa = a.salePrice ?? a.price;
      const pb = b.salePrice ?? b.price;
      switch (sort) {
        case "price-asc":
          return pa - pb;
        case "price-desc":
          return pb - pa;
        case "rating":
          return b.rating - a.rating;
        case "new":
          return Number(b.isNew) - Number(a.isNew);
        case "popular":
          return b.reviewCount - a.reviewCount;
        default:
          return 0;
      }
    });
    return list;
  }, [query, selectedCats, selectedBrands, maxPrice, minRating, inStockOnly, saleOnly, sort]);

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) =>
    setList(
      list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
    );

  const reset = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setMaxPrice(500);
    setMinRating(0);
    setInStockOnly(false);
    setSaleOnly(false);
    setQuery("");
  };

  const FiltersPanel = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          {t("filters.category")}
        </h3>
        <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pr-1">
          {categories.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCats.includes(c.slug)}
                onChange={() => toggle(c.slug, selectedCats, setSelectedCats)}
                className="accent-[var(--primary)]"
              />
              {tr(c.name, locale)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          {t("filters.brand")}
        </h3>
        <div className="flex flex-col gap-1.5">
          {brands.map((b) => (
            <label key={b.slug} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b.slug)}
                onChange={() => toggle(b.slug, selectedBrands, setSelectedBrands)}
                className="accent-[var(--primary)]"
              />
              {b.logo} {b.name}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          {t("filters.maxPrice")}: ${maxPrice}
        </h3>
        <input
          type="range"
          min={5}
          max={500}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">
          {t("filters.minRating")}
        </h3>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 2, 0].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="rating"
                checked={minRating === r}
                onChange={() => setMinRating(r)}
                className="accent-[var(--primary)]"
              />
              {r === 0 ? t("filters.anyRating") : `${r}★ ${t("filters.andUp")}`}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          {t("filters.inStockOnly")}
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={saleOnly}
            onChange={(e) => setSaleOnly(e.target.checked)}
            className="accent-[var(--primary)]"
          />
          {t("filters.saleOnly")}
        </label>
      </div>

      <button
        onClick={reset}
        className="rounded-xl border py-2 text-sm font-semibold hover:bg-surface-2"
      >
        {t("filters.reset")}
      </button>
    </div>
  );

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-44 rounded-2xl border bg-surface p-5">{FiltersPanel}</div>
      </aside>

      <div>
        {/* Search + sort bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="w-full rounded-xl border bg-surface py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            onClick={() => setMobileFilters(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border bg-surface px-4 py-2.5 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal size={16} /> {t("filters.title")}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary"
            aria-label="Sort"
          >
            <option value="relevance">{t("sort.relevance")}</option>
            <option value="price-asc">{t("sort.priceAsc")}</option>
            <option value="price-desc">{t("sort.priceDesc")}</option>
            <option value="rating">{t("sort.rating")}</option>
            <option value="new">{t("sort.new")}</option>
            <option value="popular">{t("sort.popular")}</option>
          </select>
        </div>

        <p className="mb-4 text-sm text-muted">
          {filtered.length} {t("filters.found")}
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-surface p-12 text-center text-muted">
            {t("filters.noMatch")}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] overflow-y-auto bg-surface p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{t("filters.title")}</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Close">
                <X />
              </button>
            </div>
            {FiltersPanel}
          </div>
        </div>
      )}
    </div>
  );
}
