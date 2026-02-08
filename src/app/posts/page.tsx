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
						<h1 className="text-4xl md:text-5xl italic">Writing</h1>
						<p className="text-muted-foreground max-w-md">
							Thoughts on software engineering, AI, side projects,
							and the things I learn along the way.
						</p>
					</div>
				</AnimatedSection>

				<div className="space-y-4">
					{publishedPosts.map((post, i) => (
						<ScrollReveal key={post.slug} delay={i * 0.05}>
							<Link
								href={`/posts/${post.slug}`}
								className="group block"
							>
								<div className="rounded-xl border border-border/50 px-5 py-4 transition-all duration-300 hover:border-border hover:bg-accent/50 glow-hover">
									<div className="flex items-start justify-between gap-4">
										<div className="space-y-1.5 min-w-0">
											<h3 className="font-sans text-base font-medium truncate group-hover:text-foreground transition-colors">
												{post.title}
											</h3>
											<p className="text-sm text-muted-foreground line-clamp-1">
												{post.description}
											</p>
										</div>
										<div className="flex flex-col items-end gap-2 shrink-0">
											<span className="text-xs font-mono text-muted-foreground">
												{formatDate(post.date)}
											</span>
											<span className="text-muted-foreground opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
												&rarr;
											</span>
										</div>
									</div>
								</div>
							</Link>
						</ScrollReveal>
					))}
				</div>
			</div>
		</main>
	);
}
