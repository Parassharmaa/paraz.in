"use client";

import { motion, useScroll } from "motion/react";

export function ReadingProgress() {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left print:hidden"
			style={{
				scaleX: scrollYProgress,
				background:
					"linear-gradient(90deg, var(--gradient-1), var(--gradient-2), var(--gradient-3))",
			}}
		/>
	);
}
