"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
	{ id: "writing", label: "Writing" },
	{ id: "research", label: "Research" },
	{ id: "experience", label: "Experience" },
	{ id: "education", label: "Education" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
] as const;

export function SectionNav() {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		function onScroll() {
			const offset = window.innerHeight * 0.4;
			let current = "";
			for (const { id } of SECTIONS) {
				const el = document.getElementById(id);
				if (!el) continue;
				if (el.getBoundingClientRect().top <= offset) {
					current = id;
				}
			}
			setActiveId(current);
		}

		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav className="fixed left-6 top-1/2 z-10 hidden -translate-y-1/2 lg:flex flex-col gap-3 print:hidden">
			{SECTIONS.map(({ id, label }) => (
				<a
					key={id}
					href={`#${id}`}
					onClick={(e) => {
						e.preventDefault();
						const el = document.getElementById(id);
						if (!el) return;
						const top = el.getBoundingClientRect().top + window.scrollY - 96;
						window.scrollTo({ top, behavior: "smooth" });
					}}
					className={`text-xs transition-colors duration-200 ${
						activeId === id
							? "text-foreground"
							: "text-muted-foreground/50 hover:text-muted-foreground"
					}`}
				>
					{label}
				</a>
			))}
		</nav>
	);
}
