// Compile every diagrams/*.d2 source to public/diagrams/*.svg.
// Run via `pnpm diagrams`. Hooked into `pnpm build` so a `vercel build`
// produces fresh SVGs without manual checkin (though we DO commit them
// for fast PR review + offline preview — see diagrams/README.md).
//
// Uses @terrastruct/d2's WASM build so there's no native binary
// dependency; the same package works on macOS / Linux / Vercel.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { D2 } from "@terrastruct/d2";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_DIR = join(ROOT, "diagrams");
const OUT_DIR = join(ROOT, "public", "diagrams");

async function main() {
	await mkdir(OUT_DIR, { recursive: true });
	const entries = await readdir(SRC_DIR);
	const sources = entries.filter((f) => f.endsWith(".d2"));
	if (sources.length === 0) {
		console.log("[d2] no diagrams to build");
		return;
	}
	const d2 = new D2();
	let built = 0;
	for (const src of sources) {
		const inPath = join(SRC_DIR, src);
		const outPath = join(OUT_DIR, src.replace(/\.d2$/, ".svg"));
		const text = await readFile(inPath, "utf8");
		try {
			const result = await d2.compile(text, { themeID: 0, sketch: false });
			const svg = await d2.render(result.diagram, result.renderOptions);
			await writeFile(outPath, svg, "utf8");
			console.log(`[d2] ${src} → ${outPath.replace(`${ROOT}/`, "")}`);
			built++;
		} catch (err) {
			console.error(`[d2] FAIL ${src}:`, err instanceof Error ? err.message : String(err));
			process.exitCode = 1;
		}
	}
	console.log(`[d2] built ${built}/${sources.length}`);
}

await main();
