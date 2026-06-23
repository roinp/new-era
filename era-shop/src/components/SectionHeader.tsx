"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function SectionHeader({
  titleKey,
  title,
  viewAllHref,
  subtitle,
  subtitleKey,
}: {
  titleKey?: string;
  title?: string;
  viewAllHref?: string;
  subtitle?: string;
  subtitleKey?: string;
}) {
  const { t } = useStore();
  const sub = subtitleKey ? t(subtitleKey) : subtitle;
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {titleKey ? t(titleKey) : title}
        </h2>
        {sub && <p className="mt-1 text-sm text-muted">{sub}</p>}
        <span className="mt-2 block h-1 w-16 rounded-full bg-primary" />
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
        >
          {t("cta.viewAll")} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
