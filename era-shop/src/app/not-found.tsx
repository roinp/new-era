"use client";

import Link from "next/link";
import { Construction } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function NotFound() {
  const { locale } = useStore();
  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
        <Construction size={40} />
      </span>
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-muted">
        {L(
          "გვერდი ვერ მოიძებნა ან მშენებლობის პროცესშია.",
          "This page is still under construction or could not be found.",
          "Страница не найдена или ещё в разработке."
        )}
      </p>
      <Link
        href="/"
        className="mt-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-hover"
      >
        {L("მთავარ გვერდზე დაბრუნება", "Back to homepage", "На главную")}
      </Link>
    </div>
  );
}
