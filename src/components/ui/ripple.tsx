"use client";

import { useState, useCallback, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

interface RippleProps {
  children: ReactNode;
  className?: string;
  color?: string;
}

export function Ripple({ children, className, color = "var(--gradient-1)" }: RippleProps) {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const handleClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
