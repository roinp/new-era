"use client";

import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, Tag, PackageCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Hero() {
  const { t } = useStore();
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium">
            <Tag size={12} className="text-accent" /> {t("hero.badge")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-lg text-base text-slate-300 sm:text-lg">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {t("cta.shopNow")} <ArrowRight size={18} />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 font-semibold backdrop-blur transition-colors hover:bg-white/10"
            >
              {t("nav.categories")}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ["10K+", "hero.stat.products"],
              ["21", "hero.stat.categories"],
              ["5K+", "hero.stat.customers"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-extrabold text-accent">{n}</p>
                <p className="text-xs text-slate-400">{t(l)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="relative hidden gap-4 lg:grid lg:grid-cols-2">
          {[
            { icon: Truck, t: "hero.f1.t", d: "hero.f1.d" },
            { icon: ShieldCheck, t: "hero.f2.t", d: "hero.f2.d" },
            { icon: Tag, t: "hero.f3.t", d: "hero.f3.d" },
            { icon: PackageCheck, t: "hero.f4.t", d: "hero.f4.d" },
          ].map((c, i) => (
            <div
              key={c.t}
              className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-white">
                <c.icon size={24} />
              </span>
              <h3 className="mt-4 font-bold">{t(c.t)}</h3>
              <p className="mt-1 text-sm text-slate-300">{t(c.d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
