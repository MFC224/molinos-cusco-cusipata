"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/lenis";
import { SemolinaParticles } from "./SemolinaParticles";
import { Wheat, ArrowDown, Sparkles, Scale, ShieldCheck } from "lucide-react";

export function Act1Hero(): React.JSX.Element {
  const heroRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo, isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro entrance animation for elements
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2 },
          "-=0.8"
        );

      // Scroll-driven parallax fade and scale when leaving Act I
      if (heroRef.current && contentRef.current) {
        gsap.to(contentRef.current, {
          y: -80,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        if (visualRef.current) {
          gsap.to(visualRef.current, {
            y: 60,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, heroRef);

    return () => {
      // Strict memory cleanup: revert context and kill triggers
      ctx.revert();
    };
  }, [isReducedMotion]);

  const handleScrollToNext = (targetId: string): void => {
    scrollTo(targetId, { offset: -70 });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Acto I: El Silencio del Origen"
      className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden bg-[#1C1917] pt-28 pb-16 text-[#FAF6F0]"
    >
      {/* Background Ambience & Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(217,155,38,0.18),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-80 w-full max-w-7xl bg-radial from-[#9E1B1B]/15 via-transparent to-transparent blur-2xl"
      />

      {/* Floating Semolina Particles in Canvas 2D */}
      <SemolinaParticles particleCount={55} />

      {/* Hero Visual Presentation (Backlit Extruded Egg Pasta Macro) */}
      <div
        ref={visualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-90 transition-opacity"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-cover select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Backlit Golden Gradient for Pasta Extrusion */}
            <radialGradient id="backlightGlow" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="#F5C768" stopOpacity="0.32" />
              <stop offset="40%" stopColor="#D99B26" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1C1917" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="pastaStrandGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF4D0" stopOpacity="0.95" />
              <stop offset="25%" stopColor="#F5C768" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#D99B26" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#9E6B18" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient id="pastaStrandDepth" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5C768" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#5A3A0B" stopOpacity="0.1" />
            </linearGradient>

            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Backlight Sphere */}
          <circle cx="720" cy="450" r="380" fill="url(#backlightGlow)" />

          {/* Extruded Curving Egg Pasta Strands (Macro Silhouette & Highlights) */}
          <g filter="url(#glowEffect)" opacity="0.85">
            <path
              d="M320,0 C420,250 480,500 520,900"
              stroke="url(#pastaStrandDepth)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M480,0 C540,280 610,540 660,900"
              stroke="url(#pastaStrandGold)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M620,0 C670,260 730,520 780,900"
              stroke="url(#pastaStrandGold)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <path
              d="M740,0 C770,270 820,530 870,900"
              stroke="url(#pastaStrandGold)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M890,0 C920,290 970,550 1020,900"
              stroke="url(#pastaStrandGold)"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M1060,0 C1090,270 1140,530 1190,900"
              stroke="url(#pastaStrandDepth)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </g>

          {/* Shimmer Specular Highlights on Extruded Pasta */}
          <path
            d="M623,20 C672,270 732,525 782,880"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
          <path
            d="M743,20 C772,280 822,535 872,880"
            stroke="#FFF4D0"
            strokeWidth="2.5"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Heritage Pill Tag */}
        <div ref={badgeRef} className="inline-flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#D99B26]/40 bg-[#262220]/85 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#F5C768] shadow-lg backdrop-blur-md">
            <Wheat className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
            <span>MOLINOS CUSCO S.A. · PLANTA KM 76 CUSIPATA</span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-stone-300">RUC 20114918718</span>
          </div>
        </div>

        {/* Main Title & Editorial Typography */}
        <div ref={contentRef} className="space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FAF6F0] leading-[1.08]">
            El Silencio del <br />
            <span className="text-[#D99B26] italic font-serif">Origen Andino</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-xl font-normal leading-relaxed text-stone-300 font-sans">
            A más de 3,300 m.s.n.m. en el Valle de Cusipata, transformamos sémola pura de trigo
            durum y huevos frescos en fideos al huevo de elasticidad y tenacidad insuperable.
          </p>

          {/* Interactive Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleScrollToNext("#calibres")}
              className="inline-flex items-center gap-2.5 rounded-md bg-[#D99B26] px-7 py-3.5 text-sm sm:text-base font-bold text-[#1C1917] shadow-[0_4px_20px_rgba(217,155,38,0.35)] transition-all duration-200 hover:scale-105 hover:bg-[#F5C768] focus-visible:ring-2 focus-visible:ring-[#9E1B1B] active:scale-95"
            >
              <Scale className="h-4 w-4" aria-hidden="true" />
              <span>Ver Calibres (#40 - #43)</span>
            </button>

            <button
              type="button"
              onClick={() => handleScrollToNext("#ingredientes")}
              className="inline-flex items-center gap-2.5 rounded-md border border-stone-400/35 bg-[#262220]/80 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#FAF6F0] shadow-md backdrop-blur-md transition-all duration-200 hover:border-[#D99B26] hover:bg-[#262220] hover:text-[#F5C768] focus-visible:ring-2 focus-visible:ring-[#D99B26]"
            >
              <Sparkles className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
              <span>Alquimia de Ingredientes</span>
            </button>
          </div>

          {/* Industrial Highlights Metric Bar */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div className="rounded-lg border border-[#38332E] bg-[#1C1917]/80 p-3.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#D99B26] uppercase">Presión Andina</span>
              <p className="mt-0.5 font-serif text-xl font-bold text-[#FAF6F0]">3,300+ m</p>
              <p className="text-[11px] text-stone-400">Curvas de secado adaptadas</p>
            </div>
            <div className="rounded-lg border border-[#38332E] bg-[#1C1917]/80 p-3.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#D99B26] uppercase">Tradición Industrial</span>
              <p className="mt-0.5 font-serif text-xl font-bold text-[#FAF6F0]">Desde 1960</p>
              <p className="text-[11px] text-stone-400">Escritura pública en 1988</p>
            </div>
            <div className="col-span-2 sm:col-span-1 rounded-lg border border-[#38332E] bg-[#1C1917]/80 p-3.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-wider text-[#D99B26] uppercase">Inocuidad Bromatológica</span>
              <p className="mt-0.5 font-serif text-xl font-bold text-[#FAF6F0] flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-400 inline" aria-hidden="true" />
                DIGESA
              </p>
              <p className="text-[11px] text-stone-400">Directorio PROMPERÚ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Scroll Cue with Animated Pulse */}
      <div className="relative z-20 flex flex-col items-center justify-center pt-8">
        <button
          type="button"
          onClick={() => handleScrollToNext("#ingredientes")}
          className="group flex flex-col items-center gap-2 text-stone-400 transition-colors hover:text-[#D99B26] focus-visible:ring-1 focus-visible:ring-[#D99B26] focus-visible:outline-none"
          aria-label="Desplazarse hacia el Acto II: Alquimia de Ingredientes"
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">Descubrir Alquimia</span>
          <div className="flex h-8 w-5 justify-center rounded-full border border-stone-500/60 p-1 group-hover:border-[#D99B26]">
            <div className="h-1.5 w-1 rounded-full bg-[#D99B26] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
