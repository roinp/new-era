"use client";

import Link from "next/link";
import { ArrowRight, Truck, Percent } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function PromoBanners() {
  const { t } = useStore();
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 md:grid-cols-2">
      <Link
        href="/products?sale=1"
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-orange-700 p-8 text-white"
      >
        <Percent className="absolute -right-4 -top-4 opacity-20" size={120} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
            {t("promo.sale.tag")}
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">{t("promo.sale.title")}</h3>
          <p className="mt-2 max-w-xs text-white/90">{t("promo.sale.text")}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 font-semibold transition-all group-hover:gap-2">
          {t("promo.sale.cta")} <ArrowRight size={18} />
        </span>
      </Link>
      <Link
        href="/contact"
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-white"
      >
        <Truck className="absolute -right-4 -top-4 opacity-20" size={120} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
            {t("promo.bulk.tag")}
          </p>
          <h3 className="mt-2 text-3xl font-extrabold">{t("promo.bulk.title")}</h3>
          <p className="mt-2 max-w-xs text-white/90">{t("promo.bulk.text")}</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 font-semibold transition-all group-hover:gap-2">
          {t("promo.bulk.cta")} <ArrowRight size={18} />
        </span>
      </Link>
    </section>
  );
}
