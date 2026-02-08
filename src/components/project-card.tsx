"use client";

import { motion } from "motion/react";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface Props {
	title: string;
	description: string;
	tags: readonly string[];
	link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
	const Wrapper = link ? "a" : "div";
	const wrapperProps = link
		? { href: link, target: "_blank", rel: "noopener noreferrer" }
		: {};

	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ type: "spring", stiffness: 400, damping: 25 }}
		>
			<Wrapper
				{...wrapperProps}
				className="group block h-full rounded-xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-border hover:bg-accent/50 glow-hover"
			>
				<div className="flex flex-col h-full gap-3">
					<div className="flex items-start justify-between">
						<h3 className="font-sans text-sm font-medium leading-tight">
							{title}
						</h3>
						{link && (
							<ArrowUpRightIcon className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2" />
						)}
					</div>
					<p className="text-xs text-muted-foreground leading-relaxed flex-1 print:text-[10px]">
						{description}
					</p>
					<div className="flex flex-wrap gap-1 mt-auto">
						{tags.map((tag) => (
							<Badge
								className="px-1.5 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
								variant="secondary"
								key={tag}
							>
								{tag}
							</Badge>
						))}
					</div>
					<div className="hidden text-xs underline print:visible">
						{link
							?.replace("https://", "")
							.replace("www.", "")
							.replace("/", "")}
					</div>
				</div>
			</Wrapper>
		</motion.div>
	);
}
