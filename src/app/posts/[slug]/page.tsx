import { posts } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx-components";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ReadingProgress } from "@/components/reading-progress";

interface PostPageProps {
	params: Promise<{ slug: string }>;
}

function getPostBySlug(slug: string) {
	return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
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
		<>
			<ReadingProgress />
			<main className="mx-auto max-w-3xl px-6 md:px-8 py-20">
				<div className="space-y-12">
					<AnimatedSection>
						<div className="space-y-6">
							<Link
								href="/posts"
								className="animated-link text-sm text-muted-foreground inline-block"
							>
								&larr; Back to posts
							</Link>
							<div className="space-y-3">
								<h1 className="text-3xl md:text-4xl lg:text-5xl italic leading-tight">
									{post.title}
								</h1>
								<p className="text-sm font-mono text-muted-foreground">
									{formatDate(post.date)}
								</p>
							</div>
						</div>
					</AnimatedSection>
					<AnimatedSection delay={0.2}>
						<article className="prose prose-lg max-w-none">
							<MDXContent code={post.body} />
						</article>
					</AnimatedSection>
				</div>
			</main>
		</>
	);
}
