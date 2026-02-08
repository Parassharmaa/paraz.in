import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Newsreader, Syne } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import { BackgroundMesh } from "@/components/background-mesh";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type React from "react";

export const metadata: Metadata = {
	title: "",
	description: "",
};

const syne = Syne({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-syne",
});

const newsreader = Newsreader({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-newsreader",
	style: ["normal", "italic"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${syne.variable} ${GeistMono.variable} ${newsreader.variable}`}
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t==='light'){d.classList.add('light')}else if(t==='dark'){d.classList.remove('light')}else if(window.matchMedia('(prefers-color-scheme:light)').matches){d.classList.add('light')}}catch(e){}})()`,
					}}
				/>
			</head>
			<body>
				<ThemeProvider>
					<BackgroundMesh />
					{children}
				</ThemeProvider>
			</body>
			<Analytics />
		</html>
	);
}
