import Link from "next/link";
import { AgentMascot } from "@/components/mascot/agent-mascot";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <AgentMascot size={80} state="confused" />
        <div className="space-y-2">
          <h1 className="text-6xl font-light gradient-text">404</h1>
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            PAGE_NOT_FOUND
          </p>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          The agent searched everywhere but couldn&apos;t locate this page.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm transition-colors hover:bg-accent"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
