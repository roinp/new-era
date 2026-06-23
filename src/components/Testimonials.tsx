"use client";

import { testimonials } from "@/lib/i18n";
import { StarRating } from "./StarRating";
import { SectionHeader } from "./SectionHeader";
import { Quote } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export function Testimonials() {
  const { locale } = useStore();
  return (
    <section>
      <SectionHeader titleKey="section.testimonials" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((tm) => {
          const text =
            locale === "ka" ? tm.textKa : locale === "ru" ? tm.textRu : tm.text;
          return (
            <figure
              key={tm.name}
              className="relative flex flex-col rounded-2xl border bg-surface p-6"
            >
              <Quote className="absolute right-5 top-5 text-primary/20" size={36} />
              <StarRating rating={tm.rating} />
              <blockquote className="mt-3 flex-1 text-sm text-muted">
                “{text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 border-t pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-surface-2 text-2xl">
                  {tm.avatar}
                </span>
                <div>
                  <p className="text-sm font-bold">{tm.name}</p>
                  <p className="text-xs text-muted">
                    {tm.role}, {tm.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
