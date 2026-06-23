import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPost } from "@/lib/blog";
import { tr } from "@/lib/categories";
import { BlogArticle } from "@/components/BlogArticle";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: tr(post.title, "ka"), description: tr(post.excerpt, "ka") };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return <BlogArticle post={post} related={related} />;
}
