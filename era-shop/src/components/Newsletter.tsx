"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Newsletter() {
  const { t } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-orange-600 px-6 py-12 text-white sm:px-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            {t("newsletter.title")}
          </h2>
          <p className="mt-2 text-white/90">{t("newsletter.subtitle")}</p>
        </div>
        {done ? (
          <p className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 font-semibold">
            <CheckCircle2 size={20} /> Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="flex w-full max-w-md gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("newsletter.placeholder")}
              className="w-full rounded-xl border-0 px-4 py-3 text-foreground outline-none ring-2 ring-transparent focus:ring-white"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold transition-transform hover:scale-105"
            >
              {t("newsletter.button")} <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
