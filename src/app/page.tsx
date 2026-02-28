import { posts } from "#site/content";
import type { Metadata } from "next";
import Link from "next/link";
import { CommandMenu } from "@/components/command-menu";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { RESUME_DATA } from "@/data/resume-data";
import { HeroSection } from "@/components/hero-section";
import { SkillsConstellation } from "@/components/skills-constellation";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionNav } from "@/components/section-nav";
import { WorkTimeline } from "@/components/work-timeline";

export const metadata: Metadata = {
	title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
	description: RESUME_DATA.summary,
};

export default function Page() {
	const publishedPosts = posts
		.filter((p) => p.published)
		.sort(
			(a, b) =>
				new Date(b.date).getTime() - new Date(a.date).getTime(),
		);

	return (
		<main className="relative">
			<SectionNav />
			{/* Hero — full viewport */}
			<div className="mx-auto max-w-3xl px-6 md:px-8">
				<HeroSection />
			</div>

			{/* Content sections */}
			<div className="mx-auto max-w-3xl px-6 md:px-8 pb-32 print:pb-8">
				<div className="space-y-24 print:space-y-6">
					{/* Posts */}
					{publishedPosts.length > 0 && (
						<ScrollReveal>
							<section id="writing" className="scroll-mt-24 space-y-6 print:hidden">
								<div className="flex items-baseline justify-between">
									<h2 className="text-2xl md:text-3xl italic">
										Writing
									</h2>
									<Link
										href="/posts"
										className="animated-link text-sm text-muted-foreground"
									>
										View all
									</Link>
								</div>
								<div className="space-y-4">
									{publishedPosts.slice(0, 3).map((post) => (
										<Link
											key={post.slug}
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
															{new Date(
																post.date,
															).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "short",
																	day: "numeric",
																},
															)}
														</span>
														<span className="text-muted-foreground opacity-0 translate-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
															&rarr;
														</span>
													</div>
												</div>
											</div>
										</Link>
									))}
								</div>
							</section>
						</ScrollReveal>
					)}

					{/* Research */}
					{RESUME_DATA.research && RESUME_DATA.research.length > 0 && (
						<ScrollReveal>
							<section id="research" className="scroll-mt-24 space-y-6 print:break-before-page">
								<h2 className="text-2xl md:text-3xl italic">
									Research
								</h2>
								<div className="space-y-4">
									{RESUME_DATA.research.map((paper) => (
										<div
											key={paper.title}
											className="rounded-xl border border-border/50 px-5 py-4 space-y-3"
										>
											<div className="flex items-start justify-between gap-4">
												<div className="space-y-1.5 min-w-0">
													<h3 className="font-sans text-base font-medium">
														{paper.title}
													</h3>
													<p className="text-sm text-muted-foreground leading-relaxed">
														{paper.description}
													</p>
												</div>
												<span className="text-xs font-mono text-muted-foreground shrink-0">
													{paper.year}
												</span>
											</div>
											<div className="flex items-center gap-4">
												<div className="flex flex-wrap gap-1.5">
													{paper.tags.map((tag) => (
														<Badge
															key={tag}
															variant="secondary"
															className="text-[10px] px-1.5 py-0"
														>
															{tag}
														</Badge>
													))}
												</div>
												<div className="flex items-center gap-3 ml-auto shrink-0">
													{paper.links.paper && (
														<a
															href={paper.links.paper}
															target="_blank"
															rel="noopener noreferrer"
															className="animated-link text-xs text-muted-foreground"
														>
															Paper
														</a>
													)}
													{paper.links.code && (
														<a
															href={paper.links.code}
															target="_blank"
															rel="noopener noreferrer"
															className="animated-link text-xs text-muted-foreground"
														>
															Code
														</a>
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</section>
						</ScrollReveal>
					)}

					{/* Work Experience - Timeline */}
					<ScrollReveal>
						<section id="experience" className="scroll-mt-24 space-y-6">
							<h2 className="text-2xl md:text-3xl italic">
								Experience
							</h2>
							<WorkTimeline />
						</section>
					</ScrollReveal>

					{/* Education */}
					<ScrollReveal>
						<section id="education" className="scroll-mt-24 space-y-6">
							<h2 className="text-2xl md:text-3xl italic">
								Education
							</h2>
							{RESUME_DATA.education.map((edu) => (
								<div
									key={edu.school}
									className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
								>
									<div>
										<h3 className="font-sans text-sm font-medium">
											{edu.school}
										</h3>
										<p className="text-sm text-muted-foreground mt-1 print:text-[12px]">
											{edu.degree}
										</p>
									</div>
									<span className="text-xs font-mono text-muted-foreground shrink-0">
										{edu.start} — {edu.end}
									</span>
								</div>
							))}
						</section>
					</ScrollReveal>

					{/* Skills */}
					<ScrollReveal>
						<section id="skills" className="scroll-mt-24 space-y-6">
							<h2 className="text-2xl md:text-3xl italic">
								Skills
							</h2>
							<div className="print:hidden">
								<SkillsConstellation />
							</div>
							<div className="hidden print:flex print:flex-wrap print:gap-2">
								{RESUME_DATA.skills.map((skill) => (
									<Badge
										key={skill.name}
										className="print:text-[10px]"
									>
										{skill.name}
									</Badge>
								))}
							</div>
						</section>
					</ScrollReveal>

					{/* Projects */}
					{RESUME_DATA.projects && (
						<ScrollReveal>
							<section id="projects" className="scroll-mt-24 space-y-6 print-force-new-page">
								<h2 className="text-2xl md:text-3xl italic">
									Projects
								</h2>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 print:grid-cols-3 print:gap-2">
									{RESUME_DATA.projects.map((project) => (
										<ProjectCard
											key={project.title}
											title={project.title}
											description={project.description}
											tags={project.techStack}
											link={
												"link" in project
													? project.link.href
													: undefined
											}
										/>
									))}
								</div>
							</section>
						</ScrollReveal>
					)}
				</div>
			</div>

			<CommandMenu
				links={[
					{
						url: RESUME_DATA.personalWebsiteUrl,
						title: "Personal Website",
					},
					...RESUME_DATA.contact.social.map((s) => ({
						url: s.url,
						title: s.name,
					})),
					{ url: "/posts", title: "Posts" },
				]}
			/>
		</main>
	);
}
