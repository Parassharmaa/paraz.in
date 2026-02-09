"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const ATTRACTOR_COUNT = 2;
const PARTICLE_COUNT = 40;
const TRAIL_LENGTH = 20;
const GRAVITY = 600;
const SPAWN_RATE = 1;

const HUES = [180, 220, 320, 158];

interface Attractor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: Float32Array;
  trailLen: number;
  trailHead: number;
  life: number;
  maxLife: number;
  hue: number;
}

export function BackgroundMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  useEffect(() => { themeRef.current = theme; }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let frame: number;
    const attractors: Attractor[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initAttractors = () => {
      attractors.length = 0;
      for (let i = 0; i < ATTRACTOR_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.3;
        attractors.push({
          x: w * 0.2 + Math.random() * w * 0.6,
          y: h * 0.2 + Math.random() * h * 0.6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          mass: 0.8 + Math.random() * 0.6,
        });
      }
    };

    const spawnParticle = (): Particle => {
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.25) { x = Math.random() * w; y = -5; }
      else if (side < 0.5) { x = w + 5; y = Math.random() * h; }
      else if (side < 0.75) { x = Math.random() * w; y = h + 5; }
      else { x = -5; y = Math.random() * h; }

      const angle = Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.5;
      const speed = 0.5 + Math.random() * 1;

      return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        trail: new Float32Array(TRAIL_LENGTH * 2),
        trailLen: 0,
        trailHead: 0,
        life: 0,
        maxLife: 250 + Math.random() * 250,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      };
    };

    const init = () => {
      resize();
      initAttractors();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = spawnParticle();
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.life = Math.random() * 100;
        particles.push(p);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const light = themeRef.current === "light";

      for (const a of attractors) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < w * 0.1 || a.x > w * 0.9) a.vx *= -1;
        if (a.y < h * 0.1 || a.y > h * 0.9) a.vy *= -1;
      }

      for (let s = 0; s < SPAWN_RATE; s++) {
        if (particles.length < PARTICLE_COUNT) {
          particles.push(spawnParticle());
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        for (const a of attractors) {
          const dx = a.x - p.x;
          const dy = a.y - p.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          const minDist = 40;
          if (dist > minDist) {
            const force = (GRAVITY * a.mass) / distSq;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 4;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const idx = (p.trailHead % TRAIL_LENGTH) * 2;
        p.trail[idx] = p.x;
        p.trail[idx + 1] = p.y;
        p.trailHead++;
        if (p.trailLen < TRAIL_LENGTH) p.trailLen++;

        const oob = p.x < -100 || p.x > w + 100 || p.y < -100 || p.y > h + 100;
        if (p.life > p.maxLife || oob) {
          particles[i] = spawnParticle();
        }
      }

      const sat = light ? "70%" : "90%";
      const lum = light ? "45%" : "60%";

      for (const p of particles) {
        if (p.trailLen < 2) continue;

        const lifeFade = Math.min(1, p.life / 40) * Math.min(1, (p.maxLife - p.life) / 50);

        ctx.beginPath();
        const startIdx = ((p.trailHead - p.trailLen) % TRAIL_LENGTH + TRAIL_LENGTH) % TRAIL_LENGTH;
        ctx.moveTo(p.trail[startIdx * 2], p.trail[startIdx * 2 + 1]);

        for (let j = 1; j < p.trailLen; j++) {
          const ti = ((startIdx + j) % TRAIL_LENGTH) * 2;
          ctx.lineTo(p.trail[ti], p.trail[ti + 1]);
        }

        const alpha = (light ? 0.08 : 0.08) * lifeFade;
        ctx.strokeStyle = `hsla(${p.hue}, ${sat}, ${lum}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.lineCap = "round";
        ctx.stroke();

        const headIdx = ((p.trailHead - 1) % TRAIL_LENGTH + TRAIL_LENGTH) % TRAIL_LENGTH * 2;
        const hx = p.trail[headIdx];
        const hy = p.trail[headIdx + 1];
        const headAlpha = (light ? 0.15 : 0.15) * lifeFade;

        ctx.beginPath();
        ctx.arc(hx, hy, 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${sat}, ${lum}, ${headAlpha})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    init();
    frame = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] print:hidden"
      aria-hidden="true"
    />
  );
}
