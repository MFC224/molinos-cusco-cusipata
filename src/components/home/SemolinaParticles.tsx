"use client";

import React, { useEffect, useRef } from "react";
import { useSmoothScroll } from "@/lib/lenis";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  color: string;
}

interface SemolinaParticlesProps {
  particleCount?: number;
  className?: string;
}

export function SemolinaParticles({
  particleCount = 50,
  className = "",
}: SemolinaParticlesProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isReducedMotion } = useSmoothScroll();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = [
      "rgba(217, 155, 38, ", // Brand gold (#D99B26)
      "rgba(245, 199, 104, ", // Light gold (#F5C768)
      "rgba(250, 246, 240, ", // Cream (#FAF6F0)
      "rgba(181, 83, 39, ",   // Andean accent (#B55327)
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const baseAlpha = 0.2 + Math.random() * 0.55;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: 0.15 + Math.random() * 0.45, // Gentle downward drift like sifted semolina
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)] ?? "rgba(217, 155, 38, ",
      };
    });

    const handleResize = (): void => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let lastTime = performance.now();

    const animate = (time: number): void => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p) continue;

        p.x += p.vx * 60 * delta;
        p.y += p.vy * 60 * delta;

        // Wrap around horizontally and vertically
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        // Slight breathing shimmer on alpha
        p.alpha = p.baseAlpha + Math.sin(time * 0.002 + p.x) * 0.12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(0.85, p.alpha))})`;
        ctx.shadowColor = "rgba(217, 155, 38, 0.4)";
        ctx.shadowBlur = 4;
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [particleCount, isReducedMotion]);

  if (isReducedMotion) {
    return <div aria-hidden="true" className="hidden" />;
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="semolina-canvas"
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full will-change-transform ${className}`}
    />
  );
}
