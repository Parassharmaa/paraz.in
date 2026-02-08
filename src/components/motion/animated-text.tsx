"use client";

import { motion } from "motion/react";

interface AnimatedTextProps {
	text: string;
	className?: string;
	gradient?: boolean;
}

export function AnimatedText({
	text,
	className,
	gradient = false,
}: AnimatedTextProps) {
	const chars = text.split("");

	return (
		<h1 className={className}>
			{chars.map((char, i) => (
				<motion.span
					key={`${char}-${i}`}
					initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{
						duration: 0.5,
						delay: i * 0.03,
						ease: [0.25, 0.4, 0.25, 1],
					}}
					className={`inline-block ${gradient ? "gradient-text" : ""} ${char === " " ? "mr-[0.25em]" : ""}`}
				>
					{char === " " ? "\u00A0" : char}
				</motion.span>
			))}
		</h1>
	);
}
