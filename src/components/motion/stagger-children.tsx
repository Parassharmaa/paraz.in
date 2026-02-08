"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface StaggerChildrenProps {
	children: ReactNode;
	className?: string;
	stagger?: number;
	delay?: number;
}

const container = {
	hidden: { opacity: 0 },
	show: (custom: { stagger: number; delay: number }) => ({
		opacity: 1,
		transition: {
			staggerChildren: custom.stagger,
			delayChildren: custom.delay,
		},
	}),
};

export const staggerItem = {
	hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
	},
};

export function StaggerChildren({
	children,
	className,
	stagger = 0.08,
	delay = 0,
}: StaggerChildrenProps) {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			animate="show"
			custom={{ stagger, delay }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
