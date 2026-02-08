"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

interface ScrollRevealProps {
	children: ReactNode;
	delay?: number;
	className?: string;
	width?: "fit" | "full";
}

export function ScrollReveal({
	children,
	delay = 0,
	className,
	width = "full",
}: ScrollRevealProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
			animate={
				isInView
					? { opacity: 1, y: 0, filter: "blur(0px)" }
					: { opacity: 0, y: 30, filter: "blur(10px)" }
			}
			transition={{
				duration: 0.7,
				delay,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className={className}
			style={{ width: width === "full" ? "100%" : "fit-content" }}
		>
			{children}
		</motion.div>
	);
}
