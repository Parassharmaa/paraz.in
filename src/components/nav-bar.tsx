"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function NavBar() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const isPostDetail = pathname.startsWith("/posts/");

	return (
		<div className="fixed top-4 left-6 right-6 z-40 flex items-center justify-between print:hidden">
			{!isHome ? (
				<Link
					href={isPostDetail ? "/posts" : "/"}
					className="animated-link text-sm text-muted-foreground"
				>
					&larr; {isPostDetail ? "Back to posts" : "Back"}
				</Link>
			) : (
				<div />
			)}
			<ThemeToggle />
		</div>
	);
}
