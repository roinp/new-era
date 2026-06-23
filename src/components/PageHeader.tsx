"use client";

import { useStore } from "@/context/StoreContext";

export function PageHeader({
  titleKey,
  subtitleKey,
}: {
  titleKey: string;
  subtitleKey?: string;
}) {
  const { t } = useStore();
  return (
    <div className="border-b bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight">{t(titleKey)}</h1>
        {subtitleKey && <p className="mt-1 text-sm text-muted">{t(subtitleKey)}</p>}
      </div>
    </div>
  );
}
