"use client";

import { motion } from "motion/react";
import { CommandIcon, MoonIcon, PrinterIcon, SunIcon } from "lucide-react";
import * as React from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";

interface Props {
	links: { url: string; title: string }[];
}

export const CommandMenu = ({ links }: Props) => {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			{/* FAB — always visible */}
			<motion.button
				onClick={() => setOpen(true)}
				className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full border border-border bg-card shadow-lg print:hidden cursor-pointer"
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					type: "spring",
					stiffness: 260,
					damping: 20,
					delay: 1.2,
				}}
				whileHover={{ scale: 1.15, rotate: 15 }}
				whileTap={{ scale: 0.85 }}
			>
				<motion.div
					animate={{ y: [0, -3, 0] }}
					transition={{
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				>
					<CommandIcon className="size-5" />
				</motion.div>
			</motion.button>

			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="What do you need?" />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Actions">
						<CommandItem
							onSelect={() => {
								setOpen(false);
								window.print();
							}}
						>
							<PrinterIcon className="size-4 mr-2" />
							<span>Print / Save as PDF</span>
						</CommandItem>
						<CommandItem
							onSelect={() => {
								const isLight =
									document.documentElement.classList.toggle(
										"light",
									);
								localStorage.setItem(
									"theme",
									isLight ? "light" : "dark",
								);
								setOpen(false);
							}}
						>
							<SunIcon className="size-4 mr-2" />
							<span>Toggle Theme</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Links">
						{links.map(({ url, title }) => (
							<CommandItem
								key={url}
								onSelect={() => {
									setOpen(false);
									window.open(url, "_blank");
								}}
							>
								<span>{title}</span>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};
