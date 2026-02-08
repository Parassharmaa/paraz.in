"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, type MotionStyle } from "motion/react";

export function useMagneticHover(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;
      const maxOffset = 6;
      x.set(Math.max(-maxOffset, Math.min(maxOffset, dx)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, dy)));
    },
    [strength, x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const style: MotionStyle = {
    x: springX,
    y: springY,
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
}
