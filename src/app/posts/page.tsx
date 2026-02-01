import { posts } from "#site/content";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata = {
  title: "Posts",
  description: "Blog posts about software engineering, side projects, and more.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostsPage() {
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white">
        <div className="space-y-2">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            &larr; Back
          </Link>
          <h1 className="text-2xl font-bold">Posts</h1>
        </div>
        <div className="space-y-4">
          {publishedPosts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="block">
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="font-semibold leading-none">{post.title}</h3>
                    <div className="text-sm tabular-nums text-gray-500">
                      {formatDate(post.date)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>{post.description}</CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
