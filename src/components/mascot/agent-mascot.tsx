"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MascotState = "neutral" | "thinking" | "happy" | "confused";

const CYAN = "hsl(180 95% 55%)";
const BLUE = "hsl(220 90% 65%)";
const MAGENTA = "hsl(320 90% 60%)";
const BODY_FILL = "hsl(230 20% 7%)";
const MUTED = "hsl(210 10% 55%)";

interface AgentMascotProps {
  size?: number;
  state?: MascotState;
  className?: string;
}

export function AgentMascot({ size = 56, state = "neutral", className }: AgentMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeOffsetX = useMotionValue(0);
  const eyeOffsetY = useMotionValue(0);
  const springX = useSpring(eyeOffsetX, { stiffness: 200, damping: 20 });
  const springY = useSpring(eyeOffsetY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 2.5;
      const factor = Math.min(1, 100 / Math.max(dist, 1));
      eyeOffsetX.set((dx / Math.max(dist, 1)) * maxOffset * (1 - factor * 0.5));
      eyeOffsetY.set((dy / Math.max(dist, 1)) * maxOffset * (1 - factor * 0.5));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [eyeOffsetX, eyeOffsetY]);

  const renderEyes = () => {
    if (state === "happy") {
      return (
        <>
          <path d="M17 22 C18 19, 21 19, 22 22" stroke={CYAN} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M28 22 C29 19, 32 19, 33 22" stroke={CYAN} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      );
    }
    if (state === "confused") {
      return (
        <>
          <motion.circle cx={19} cy={21} r={2.5} fill={CYAN} style={{ x: springX, y: springY }}>
            <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
          </motion.circle>
          <motion.g style={{ x: springX, y: springY }}>
            <text x="28" y="24" fontSize="7" fill={MAGENTA} fontFamily="monospace" fontWeight="bold">?</text>
          </motion.g>
        </>
      );
    }
    return (
      <>
        <motion.circle cx={19} cy={21} r={state === "thinking" ? 2 : 2.5} fill={CYAN} style={{ x: springX, y: springY }}>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
        </motion.circle>
        <motion.circle cx={31} cy={21} r={state === "thinking" ? 2 : 2.5} fill={CYAN} style={{ x: springX, y: springY }}>
          <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
        </motion.circle>
        {state === "thinking" && (
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ originX: "25px", originY: "21px" }}
          >
            <circle cx={19} cy={21} r={0.8} fill={BLUE} />
            <circle cx={31} cy={21} r={0.8} fill={BLUE} />
          </motion.g>
        )}
      </>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{ width: size, height: size }}
      whileHover="hover"
    >
      <svg viewBox="0 0 50 56" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mascot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.g
          variants={{ hover: { y: -2 } }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <line x1="25" y1="4" x2="25" y2="12" stroke={MUTED} strokeWidth="1.2" />
          <motion.circle
            cx={25}
            cy={3}
            r={2}
            fill={CYAN}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        <rect x="8" y="12" width="34" height="20" rx="6" ry="6" fill={BODY_FILL} stroke={BLUE} strokeWidth="1.2" />

        <g filter="url(#mascot-glow)">{renderEyes()}</g>

        <path
          d="M14 34 L12 48 Q12 52 16 52 L34 52 Q38 52 38 48 L36 34"
          fill={BODY_FILL}
          stroke={BLUE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        <motion.rect
          x="22"
          y="39"
          width="6"
          height="3"
          rx="1.5"
          fill={CYAN}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
