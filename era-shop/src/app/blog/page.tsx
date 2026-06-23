"use client";

import Link from "next/link";
import { blogPosts } from "@/lib/blog";
import { ArrowRight, Clock } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { tr } from "@/lib/categories";

export default function BlogPage() {
  const { locale } = useStore();
  const [featured, ...rest] = blogPosts;
  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;
  const minLabel = L("წთ", "min", "мин");
  const readLabel = L("სტატიის წაკითხვა", "Read article", "Читать статью");

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        {L("ERA Build ბლოგი", "The ERA Build Blog", "Блог ERA Build")}
      </h1>
      <p className="mt-1 text-muted">
        {L(
          "სამშენებლო რჩევები, პროდუქტის გზამკვლევები, DIY გაკვეთილები და ინდუსტრიის სიახლეები.",
          "Construction tips, product guides, DIY tutorials and industry news.",
          "Советы по стройке, гиды по товарам, DIY-уроки и новости отрасли."
        )}
      </p>

      {/* Featured */}
      <Link
        href={`/blog/${featured.slug}`}
        className="group mt-8 grid overflow-hidden rounded-3xl border bg-surface md:grid-cols-2"
      >
        <div className="grid aspect-video place-items-center bg-gradient-to-br from-surface-2 to-background text-8xl md:aspect-auto">
          {featured.emoji}
        </div>
        <div className="flex flex-col justify-center p-8">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {tr(featured.category, locale)}
          </span>
          <h2 className="mt-2 text-2xl font-extrabold group-hover:text-primary">
            {tr(featured.title, locale)}
          </h2>
          <p className="mt-2 text-muted">{tr(featured.excerpt, locale)}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <span>{tr(featured.author, locale)}</span>
            <span>·</span>
            <span>{featured.date}</span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> {featured.readMin} {minLabel}
            </span>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2">
            {readLabel} <ArrowRight size={16} />
          </span>
        </div>
      </Link>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border bg-surface transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="grid aspect-video place-items-center bg-gradient-to-br from-surface-2 to-background text-6xl">
              {post.emoji}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {tr(post.category, locale)}
              </span>
              <h3 className="mt-2 font-bold group-hover:text-primary">
                {tr(post.title, locale)}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">
                {tr(post.excerpt, locale)}
              </p>
              <div className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readMin} {minLabel}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
