"use client";

import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/blog";
import { tr } from "@/lib/categories";
import { useStore } from "@/context/StoreContext";

export function BlogArticle({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPost[];
}) {
  const { locale } = useStore();
  const L = (ka: string, en: string, ru: string) =>
    locale === "ka" ? ka : locale === "ru" ? ru : en;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted hover:text-primary"
      >
        <ArrowLeft size={16} /> {L("ბლოგზე დაბრუნება", "Back to blog", "Назад в блог")}
      </Link>

      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-primary">
        {tr(post.category, locale)}
      </span>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {tr(post.title, locale)}
      </h1>
      <div className="mt-3 flex items-center gap-3 text-sm text-muted">
        <span>{tr(post.author, locale)}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} /> {post.readMin} {L("წთ", "min", "мин")}
        </span>
      </div>

      <div className="mt-8 grid aspect-video place-items-center rounded-3xl bg-gradient-to-br from-surface-2 to-background text-8xl">
        {post.emoji}
      </div>

      <div className="prose mt-8 max-w-none space-y-5 text-[15px] leading-relaxed text-foreground/90">
        {post.body.map((p, i) => (
          <p key={i}>{tr(p, locale)}</p>
        ))}
      </div>

      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-extrabold">
          {L("მსგავსი სტატიები", "Related articles", "Похожие статьи")}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="group rounded-2xl border bg-surface p-4 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{r.emoji}</span>
              <h3 className="mt-2 text-sm font-bold group-hover:text-primary">
                {tr(r.title, locale)}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
