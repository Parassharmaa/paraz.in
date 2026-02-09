"use client";

import { useEffect, useState } from "react";

export function GradientMesh() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden print:hidden">
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08] blur-3xl">
        <div
          className="absolute top-0 -left-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 animate-blob"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 animate-blob"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal-400 to-emerald-300 dark:from-teal-600 dark:to-emerald-500 animate-blob"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
}
