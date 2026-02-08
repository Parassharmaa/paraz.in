"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
	children: ReactNode;
	delay?: number;
	className?: string;
}

export function AnimatedSection({
	children,
	delay = 0,
	className,
}: AnimatedSectionProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{
				duration: 0.7,
				delay,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
