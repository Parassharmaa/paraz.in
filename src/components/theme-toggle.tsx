"use client";

import { motion, AnimatePresence } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [isLight, setIsLight] = useState(false);

	useEffect(() => {
		setIsLight(document.documentElement.classList.contains("light"));
	}, []);

	function toggle() {
		const next = !isLight;
		setIsLight(next);
		document.documentElement.classList.toggle("light", next);
		localStorage.setItem("theme", next ? "light" : "dark");
	}

	return (
		<button
			onClick={toggle}
			aria-label="Toggle theme"
			className="relative size-9 flex items-center justify-center rounded-full border border-border bg-card hover:bg-accent transition-colors"
		>
			<AnimatePresence mode="wait" initial={false}>
				{isLight ? (
					<motion.div
						key="sun"
						initial={{ scale: 0, rotate: -90, opacity: 0 }}
						animate={{ scale: 1, rotate: 0, opacity: 1 }}
						exit={{ scale: 0, rotate: 90, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<SunIcon className="size-4" />
					</motion.div>
				) : (
					<motion.div
						key="moon"
						initial={{ scale: 0, rotate: 90, opacity: 0 }}
						animate={{ scale: 1, rotate: 0, opacity: 1 }}
						exit={{ scale: 0, rotate: -90, opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<MoonIcon className="size-4" />
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
}
