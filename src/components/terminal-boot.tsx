"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BootLine {
  prompt: string;
  text: string;
  delay: number;
  isOutput?: boolean;
}

const BOOT_LINES: BootLine[] = [
  { prompt: "> ", text: "init paraz.in", delay: 0 },
  { prompt: "> ", text: "loading modules... ████████ done", delay: 400 },
  { prompt: "$ ", text: "whoami", delay: 900 },
  { prompt: "  ", text: "Paras Sharma", delay: 1200, isOutput: true },
];

interface TerminalBootProps {
  onComplete: () => void;
}

export function TerminalBoot({ onComplete }: TerminalBootProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const [currentText, setCurrentText] = useState<string>("");

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Check if boot already played
    if (sessionStorage.getItem("bootPlayed")) {
      onComplete();
      return;
    }

    let cancelled = false;
    const typeNextLine = (lineIdx: number) => {
      if (cancelled || lineIdx >= BOOT_LINES.length) {
        if (!cancelled) {
          sessionStorage.setItem("bootPlayed", "true");
          setTimeout(onComplete, 300);
        }
        return;
      }

      const line = BOOT_LINES[lineIdx];
      setTimeout(() => {
        if (cancelled) return;
        setVisibleLines(lineIdx + 1);

        // Typewriter for current line
        const fullText = line.text;
        let charIdx = 0;
        const typeChar = () => {
          if (cancelled) return;
          if (charIdx <= fullText.length) {
            setTypingIndex(lineIdx);
            setCurrentText(fullText.slice(0, charIdx));
            charIdx++;
            setTimeout(typeChar, line.isOutput ? 15 : 25);
          } else {
            typeNextLine(lineIdx + 1);
          }
        };
        typeChar();
      }, lineIdx === 0 ? 200 : BOOT_LINES[lineIdx].delay - BOOT_LINES[lineIdx - 1].delay);
    };

    typeNextLine(0);
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <motion.div
      className="font-mono text-sm md:text-base space-y-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
        <div key={idx} className="flex">
          <span style={{ color: "hsl(180 95% 55%)" }}>{line.prompt}</span>
          <span className={line.isOutput ? "text-foreground" : "text-muted-foreground"}>
            {idx === typingIndex ? currentText : idx < typingIndex ? line.text : ""}
          </span>
          {idx === typingIndex && (
            <motion.span
              className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle"
              style={{ backgroundColor: "hsl(180 95% 55%)" }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}

const TAGLINES = [
  "READ, WRITE, EXECUTE",
  "CODE, SHIP, ITERATE",
  "AI × SYSTEMS × WEB",
  "BUILD, LEARN, SHARE",
];

export function RotatingTaglines() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div
      className="h-6 overflow-hidden relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={TAGLINES[index]}
          className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground absolute"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {TAGLINES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
