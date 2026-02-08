"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { Badge } from "@/components/ui/badge";

function TimelineItem({
	work,
	index,
}: {
	work: (typeof RESUME_DATA.work)[number];
	index: number;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, x: -20 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className="relative pl-8 pb-8 last:pb-0 group"
		>
			{/* Timeline line */}
			<div className="absolute left-[7px] top-3 bottom-0 w-px bg-border group-last:hidden" />

			{/* Timeline dot */}
			<motion.div
				className="absolute left-0 top-[6px] size-[15px] rounded-full border-2 border-border bg-background"
				animate={
					isInView
						? {
								borderColor: [
									"var(--border)",
									"var(--gradient-1)",
									"var(--border)",
								],
							}
						: {}
				}
				transition={{ duration: 2, delay: index * 0.1 }}
			/>

			<div className="space-y-2">
				<div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
					<div className="flex items-center gap-2">
						<h3 className="font-sans text-sm font-medium">
							{work.link ? (
								<a
									href={work.link}
									className="animated-link"
									target="_blank"
									rel="noopener noreferrer"
								>
									{work.company}
								</a>
							) : (
								work.company
							)}
						</h3>
						{work.badges.map((badge) => (
							<Badge
								variant="secondary"
								className="text-[10px] px-1.5 py-0"
								key={badge}
							>
								{badge}
							</Badge>
						))}
					</div>
					<span className="text-xs font-mono text-muted-foreground shrink-0">
						{work.start} — {work.end ?? "Present"}
					</span>
				</div>
				<p className="text-xs text-muted-foreground italic">
					{work.title}
				</p>
				<p className="text-sm text-muted-foreground leading-relaxed print:text-[10px]">
					{work.description}
				</p>
			</div>
		</motion.div>
	);
}

export function WorkTimeline() {
	return (
		<div className="relative">
			{RESUME_DATA.work.map((work, i) => (
				<TimelineItem key={work.company} work={work} index={i} />
			))}
		</div>
	);
}
