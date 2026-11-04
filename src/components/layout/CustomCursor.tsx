"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "@/lib/lenis";

export function CustomCursor(): React.JSX.Element | null {
  const { isReducedMotion } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on reduced motion or touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || isReducedMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent): void => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = (): void => {
      setIsVisible(false);
    };

    const handleElementHover = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, select, [role='button']");
      setIsHovered(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", handleElementHover, { passive: true });

    // Smooth animation loop for the outer ring using lerp
    const render = (): void => {
      if (cursorDotRef.current && cursorRingRef.current) {
        // Direct follow for central dot
        cursorDotRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;

        // Smooth lerp for outer ring
        const lerpFactor = 0.15;
        ringRef.current.x += (posRef.current.x - ringRef.current.x) * lerpFactor;
        ringRef.current.y += (posRef.current.y - ringRef.current.y) * lerpFactor;

        cursorRingRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) scale(${
          isHovered ? 1.6 : 1
        })`;
      }
      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, isHovered, isReducedMotion]);

  if (isReducedMotion) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Central precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#D99B26] shadow-[0_0_8px_rgba(217,155,38,0.8)] will-change-transform"
      />
      {/* Outer ambient lag ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border transition-colors duration-200 will-change-transform ${
          isHovered
            ? "border-[#D99B26] bg-[#D99B26]/10 shadow-[0_0_15px_rgba(217,155,38,0.4)]"
            : "border-stone-400/50"
        }`}
      />
    </div>
  );
}
