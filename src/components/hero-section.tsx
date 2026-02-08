"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowDownIcon, MailIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RESUME_DATA } from "@/data/resume-data";
import { AnimatedText } from "@/components/motion/animated-text";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { TerminalBoot, RotatingTaglines } from "@/components/terminal-boot";

export function HeroSection() {
	const [bootComplete, setBootComplete] = useState(false);
	const handleBootComplete = useCallback(() => setBootComplete(true), []);

	return (
		<div className="relative flex min-h-[85vh] flex-col justify-center py-20 print:min-h-0 print:py-4">
			<div className="absolute top-4 right-0 flex items-center gap-3 print:hidden">
				<ThemeToggle />
			</div>

			<div className="space-y-8">
				<AnimatePresence mode="wait">
				{!bootComplete ? (
					<TerminalBoot onComplete={handleBootComplete} />
				) : (
					<motion.div
						key="hero-content"
						className="space-y-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
					>
				<AnimatedSection delay={0}>
					<div className="flex items-center gap-4">
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{ type: "spring", stiffness: 400 }}
						>
							<Avatar className="size-16 ring-2 ring-border">
								<AvatarImage
									alt={RESUME_DATA.name}
									src={RESUME_DATA.avatarUrl}
								/>
								<AvatarFallback>
									{RESUME_DATA.initials}
								</AvatarFallback>
							</Avatar>
						</motion.div>
						<div className="space-y-1">
							<p className="text-xs font-mono text-muted-foreground">
								Compiling ideas in
							</p>
							<p className="text-sm text-foreground">
								{RESUME_DATA.location}
							</p>
						</div>
					</div>
				</AnimatedSection>

				<AnimatedText
					text={RESUME_DATA.name}
					className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.9] text-foreground"
				/>

				<AnimatedSection delay={0.6}>
					<RotatingTaglines />
				</AnimatedSection>

				<AnimatedSection delay={0.8}>
					<p className="max-w-lg text-base text-muted-foreground leading-relaxed">
						{RESUME_DATA.summary.split(".").slice(0, 2).join(".")}.
					</p>
				</AnimatedSection>

				<AnimatedSection delay={1.0}>
					<div className="flex flex-wrap items-center gap-3 print:hidden">
						{RESUME_DATA.contact.email && (
							<motion.a
								href={`mailto:${RESUME_DATA.contact.email}`}
								className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<MailIcon className="size-4" />
								Get in touch
							</motion.a>
						)}
						{RESUME_DATA.contact.social.map((social) => (
							<motion.a
								key={social.name}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:bg-accent"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<social.icon className="size-4" />
								{social.name}
							</motion.a>
						))}
					</div>
				</AnimatedSection>

				<div className="hidden flex-col gap-1 text-sm text-muted-foreground print:flex print:text-[12px]">
					{RESUME_DATA.contact.email && (
						<a href={`mailto:${RESUME_DATA.contact.email}`}>
							<span className="underline">
								{RESUME_DATA.contact.email}
							</span>
						</a>
					)}
					{RESUME_DATA.contact.tel && (
						<a href={`tel:${RESUME_DATA.contact.tel}`}>
							<span className="underline">
								{RESUME_DATA.contact.tel}
							</span>
						</a>
					)}
				</div>
					</motion.div>
				)}
				</AnimatePresence>
			</div>

			<motion.div
				className="absolute bottom-8 left-1/2 -translate-x-1/2 print:hidden"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5 }}
			>
				<motion.div
					animate={{ y: [0, 8, 0] }}
					transition={{
						duration: 2,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
				>
					<ArrowDownIcon className="size-5 text-muted-foreground/50" />
				</motion.div>
			</motion.div>
		</div>
	);
}
