import { posts } from "#site/content";
import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

export const metadata = {
	title: "Posts",
	description:
		"Blog posts about software engineering, side projects, and more.",
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
		.sort(
			(a, b) =>
				new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	return (
		<main className="mx-auto max-w-3xl px-6 md:px-8 py-20">
			<div className="space-y-12">
				<AnimatedSection>
					<div className="space-y-4">
						<Link
							href="/"
							className="animated-link text-sm text-muted-foreground inline-block"
						>
							&larr; Back
						</Link>
						<h1 className="text-4xl md:text-5xl italic">Writing</h1>
						<p className="text-muted-foreground max-w-md">
							Thoughts on software engineering, AI, side projects,
							and the things I learn along the way.
						</p>
					</div>
				</AnimatedSection>

				<div className="space-y-1">
					{publishedPosts.map((post, i) => (
						<ScrollReveal key={post.slug} delay={i * 0.05}>
							<Link
								href={`/posts/${post.slug}`}
								className="group block"
							>
								<div className="flex items-baseline justify-between gap-4 rounded-lg px-4 py-4 -mx-4 transition-colors hover:bg-accent/50">
									<div className="space-y-1">
										<h3 className="font-sans text-base font-medium group-hover:text-foreground transition-colors">
											{post.title}
										</h3>
										<p className="text-sm text-muted-foreground line-clamp-1">
											{post.description}
										</p>
									</div>
									<span className="text-xs font-mono text-muted-foreground shrink-0">
										{formatDate(post.date)}
									</span>
								</div>
							</Link>
						</ScrollReveal>
					))}
				</div>
			</div>
		</main>
	);
}
