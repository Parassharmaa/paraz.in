import { posts } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-components";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white">
        <div className="space-y-2">
          <Link href="/posts" className="text-sm text-muted-foreground hover:underline">
            &larr; Back to posts
          </Link>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
        </div>
        <article className="prose max-w-none">
          <MDXContent code={post.body} />
        </article>
      </section>
    </main>
  );
}
