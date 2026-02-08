"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { useTheme } from "@/components/theme-provider";

type SkillCategory = "language" | "framework" | "tools" | "ai";

const CATEGORY_COLORS_DARK: Record<SkillCategory, string> = {
  language: "hsl(180 95% 55%)",
  framework: "hsl(220 90% 65%)",
  tools: "hsl(320 90% 60%)",
  ai: "hsl(158 70% 52%)",
};

const CATEGORY_COLORS_LIGHT: Record<SkillCategory, string> = {
  language: "hsl(180 90% 32%)",
  framework: "hsl(220 85% 45%)",
  tools: "hsl(320 80% 42%)",
  ai: "hsl(158 65% 35%)",
};

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  language: "Languages",
  framework: "Frameworks",
  tools: "Tools & Infra",
  ai: "AI & Concepts",
};

const CONNECTIONS: [string, string][] = [
  ["Python", "Django"],
  ["Python", "Machine Learning"],
  ["Python", "Data Science"],
  ["TypeScript", "ReactJS"],
  ["TypeScript", "NextJS"],
  ["JavaScript", "ReactJS"],
  ["ReactJS", "NextJS"],
  ["Machine Learning", "AI Agents"],
  ["Machine Learning", "LLMs"],
  ["AI Agents", "LLMs"],
  ["Docker", "Kubernetes"],
  ["Docker", "AWS"],
  ["MongoDB", "PostgreSQL"],
  ["Rust", "GoLang"],
  ["Flutter", "ReactJS"],
  ["Data Science", "LLMs"],
];

interface Node {
  name: string;
  category: SkillCategory;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function runForceSimulation(initial: Node[], width: number, height: number, iterations = 120): Node[] {
  const nodes = initial.map((n) => ({ ...n }));
  const padding = 50;

  for (let iter = 0; iter < iterations; iter++) {
    const damping = 0.85;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const minDist = 80;
        if (dist < minDist) {
          const force = ((minDist - dist) / dist) * 0.8;
          const fx = dx * force;
          const fy = dy * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }
    }

    for (const [a, b] of CONNECTIONS) {
      const nodeA = nodes.find((n) => n.name === a);
      const nodeB = nodes.find((n) => n.name === b);
      if (nodeA && nodeB) {
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const targetDist = 120;
        if (dist > targetDist) {
          const force = ((dist - targetDist) / dist) * 0.05;
          nodeA.vx += dx * force;
          nodeA.vy += dy * force;
          nodeB.vx -= dx * force;
          nodeB.vy -= dy * force;
        }
      }
    }

    for (const node of nodes) {
      node.vx += (width / 2 - node.x) * 0.002;
      node.vy += (height / 2 - node.y) * 0.002;
      node.vx *= damping;
      node.vy *= damping;
      node.x = Math.max(padding, Math.min(width - padding, node.x + node.vx));
      node.y = Math.max(padding, Math.min(height - padding, node.y + node.vy));
    }
  }

  return nodes;
}

export function SkillsConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();

  const colors = theme === "light" ? CATEGORY_COLORS_LIGHT : CATEGORY_COLORS_DARK;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: Math.max(400, entry.contentRect.width * 0.6),
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  const nodes = useMemo(() => {
    if (isMobile) return [];
    const { width, height } = dimensions;
    const initial: Node[] = RESUME_DATA.skills.map((skill, i) => {
      const angle = (i / RESUME_DATA.skills.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3;
      return {
        name: skill.name,
        category: skill.category as SkillCategory,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
      };
    });
    return runForceSimulation(initial, width, height);
  }, [dimensions, isMobile]);

  // Gentle floating via CSS animation instead of setState per frame
  useEffect(() => {
    if (isMobile || !svgRef.current) return;
    const groups = svgRef.current.querySelectorAll<SVGGElement>("[data-node]");
    let frame: number;
    let t = 0;

    const float = () => {
      t += 0.016;
      groups.forEach((g, i) => {
        const dx = Math.sin(t * 0.5 + i * 1.2) * 2;
        const dy = Math.cos(t * 0.4 + i * 0.9) * 2;
        g.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      frame = requestAnimationFrame(float);
    };

    frame = requestAnimationFrame(float);
    return () => cancelAnimationFrame(frame);
  }, [nodes, isMobile]);

  const connectedNodes = useMemo(() => {
    if (!hoveredNode) return new Set<string>();
    const connected = new Set<string>([hoveredNode]);
    for (const [a, b] of CONNECTIONS) {
      if (a === hoveredNode) connected.add(b);
      if (b === hoveredNode) connected.add(a);
    }
    return connected;
  }, [hoveredNode]);

  if (isMobile) {
    return (
      <div className="space-y-4">
        {(Object.keys(CATEGORY_COLORS_DARK) as SkillCategory[]).map((cat) => (
          <div key={cat}>
            <p className="text-xs font-mono text-muted-foreground mb-2">{CATEGORY_LABELS[cat]}</p>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: colors[cat],
                      color: colors[cat],
                      backgroundColor: `color-mix(in srgb, ${colors[cat]} 10%, transparent)`,
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: dimensions.height }}>
      <div className="absolute top-2 right-2 flex flex-wrap gap-3 z-10">
        {(Object.keys(CATEGORY_COLORS_DARK) as SkillCategory[]).map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: colors[cat] }}
            />
            <span className="text-[10px] font-mono text-muted-foreground">
              {CATEGORY_LABELS[cat]}
            </span>
          </div>
        ))}
      </div>

      <svg ref={svgRef} width={dimensions.width} height={dimensions.height} className="absolute inset-0">
        {CONNECTIONS.map(([a, b]) => {
          const nodeA = nodes.find((n) => n.name === a);
          const nodeB = nodes.find((n) => n.name === b);
          if (!nodeA || !nodeB) return null;
          const isHighlighted = hoveredNode && connectedNodes.has(a) && connectedNodes.has(b);
          const isDimmed = hoveredNode && !isHighlighted;
          return (
            <line
              key={`${a}-${b}`}
              x1={nodeA.x}
              y1={nodeA.y}
              x2={nodeB.x}
              y2={nodeB.y}
              stroke={colors.language}
              strokeWidth={isHighlighted ? 1.5 : 0.8}
              opacity={isDimmed ? 0.05 : isHighlighted ? 0.5 : 0.15}
              style={{ transition: "opacity 0.3s, stroke-width 0.3s" }}
            />
          );
        })}

        {nodes.map((node) => {
          const isHighlighted = !hoveredNode || connectedNodes.has(node.name);
          return (
            <g
              key={node.name}
              data-node
              onMouseEnter={() => setHoveredNode(node.name)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: "pointer", transition: "opacity 0.3s" }}
              opacity={isHighlighted ? 1 : 0.2}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={hoveredNode === node.name ? 20 : 14}
                fill={colors[node.category]}
                opacity={hoveredNode === node.name ? 0.15 : 0.05}
                style={{ transition: "r 0.3s, opacity 0.3s" }}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={hoveredNode === node.name ? 5 : 4}
                fill={colors[node.category]}
                style={{ transition: "r 0.3s" }}
              />
              <text
                x={node.x}
                y={node.y + (hoveredNode === node.name ? 18 : 16)}
                textAnchor="middle"
                fill="currentColor"
                fontSize={hoveredNode === node.name ? 11 : 10}
                fontFamily="var(--font-geist-mono), monospace"
                className="text-foreground"
                opacity={isHighlighted ? 0.9 : 0.4}
                style={{ transition: "opacity 0.3s, font-size 0.3s" }}
              >
                {node.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
