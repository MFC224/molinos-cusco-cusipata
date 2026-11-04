"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  isReducedMotion: boolean;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; immediate?: boolean; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  isReducedMotion: false,
  scrollTo: () => {},
});

export const useSmoothScroll = (): SmoothScrollContextType => {
  return useContext(SmoothScrollContext);
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps): React.JSX.Element {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin once safely
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Check prefers-reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreferenceChange = (e: MediaQueryListEvent | MediaQueryList): void => {
      const prefersReduced = e.matches;
      setIsReducedMotion(prefersReduced);

      if (prefersReduced) {
        if (lenisRef.current) {
          lenisRef.current.destroy();
          lenisRef.current = null;
          setLenisInstance(null);
        }
      }
    };

    handleMotionPreferenceChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMotionPreferenceChange);

    // If reduced motion is requested by user OS, skip Lenis initialization
    if (mediaQuery.matches) {
      return () => {
        mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      };
    }

    // Initialize Lenis with high-performance 60-120fps decoupling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    const handleLenisScroll = (): void => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleLenisScroll);

    // Connect Lenis to GSAP ticker for synchronous RAF loop without frame jitter
    const tickerUpdate = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange);
      lenis.off("scroll", handleLenisScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ): void => {
    if (isReducedMotion || !lenisRef.current) {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "auto" });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: "auto" });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "auto" });
      }
      return;
    }

    lenisRef.current.scrollTo(target, options);
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, isReducedMotion, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
