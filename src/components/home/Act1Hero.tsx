"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/lenis";
import { SemolinaParticles } from "./SemolinaParticles";
import { Wheat, Sparkles, Scale, ShieldCheck } from "lucide-react";

export function Act1Hero(): React.JSX.Element {
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo, isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro entrance animation for elements on initial mount
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
        .fromTo(
          contentRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 1.1 },
          "-=0.7"
        );

      // Scroll-driven parallax:
      // Keep hero content 100% visible during initial reading (0% to 45%).
      // Only when transitioning towards next section (45% to 95%) does it smoothly float up and fade.
      if (heroRef.current && scrollWrapperRef.current) {
        gsap.fromTo(
          scrollWrapperRef.current,
          { y: 0, opacity: 1 },
          {
            y: -70,
            opacity: 0,
            ease: "power1.in",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "45% top",
              end: "95% top",
              scrub: 1,
              immediateRender: false,
            },
          }
        );
      }

      // Parallax on the artisanal pasta ribbon backdrop
      if (heroRef.current && visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { y: 0, scale: 1 },
          {
            y: 60,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
              immediateRender: false,
            },
          }
        );
      }

      // Scroll cue fades out promptly on early scroll (10% to 30%)
      if (heroRef.current && scrollCueRef.current) {
        gsap.to(scrollCueRef.current, {
          opacity: 0,
          y: 15,
          ease: "power1.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "10% top",
            end: "30% top",
            scrub: true,
            immediateRender: false,
          },
        });
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
      aria-label="El Silencio del Origen Andino"
      className="relative min-h-[105vh] flex flex-col justify-between overflow-hidden bg-[#FBF8F3] pt-32 pb-16 text-[#231F1D]"
    >
      {/* Subtle Warm Paper Texture & Sémola Dust */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_15%,rgba(245,230,200,0.5),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-80 w-full max-w-7xl bg-radial from-[#F2ECE1] via-transparent to-transparent opacity-80"
      />

      {/* Floating Semolina Particles in Canvas 2D */}
      <SemolinaParticles particleCount={35} />

      {/* Editorial Artisanal Backplate: Botanical Wheat & Extruded Ribbon Curves (Organic Matte) */}
      <div
        ref={visualRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70 transition-opacity"
      >
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-cover select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Warm Yolk and Amber Matte Gradients — No Neon Glow */}
            <linearGradient id="paperRibbonGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5E6C8" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#C68B2C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#8C2318" stopOpacity="0.15" />
            </linearGradient>

            <linearGradient id="paperRibbonSoft" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E7DFD5" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F2ECE1" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Calming Central Warm Aura */}
          <circle cx="720" cy="440" r="420" fill="#F2ECE1" fillOpacity="0.55" />

          {/* Hand-crafted Pasta Ribbons: Curving Wheat Strands with Subtle Linework */}
          <g opacity="0.85">
            <path
              d="M320,0 C420,250 480,500 520,900"
              stroke="url(#paperRibbonSoft)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M480,0 C540,280 610,540 660,900"
              stroke="url(#paperRibbonGold)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M620,0 C670,260 730,520 780,900"
              stroke="url(#paperRibbonGold)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M740,0 C770,270 820,530 870,900"
              stroke="url(#paperRibbonGold)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M890,0 C920,290 970,550 1020,900"
              stroke="url(#paperRibbonGold)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M1060,0 C1090,270 1140,530 1190,900"
              stroke="url(#paperRibbonSoft)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>

          {/* Delicate Archival Lines */}
          <path
            d="M623,20 C672,270 732,525 782,880"
            stroke="#C68B2C"
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M743,20 C772,280 822,535 872,880"
            stroke="#8C2318"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Foreground Content */}
      <div
        ref={scrollWrapperRef}
        className="relative z-20 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 text-center my-auto will-change-transform"
      >
        {/* Heritage Letterpress Pill Tag */}
        <div ref={badgeRef} className="inline-flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#E7DFD5] bg-[#F2ECE1]/95 px-4 sm:px-5 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs backdrop-blur-xs">
            <Wheat className="h-3.5 w-3.5 text-[#C68B2C]" aria-hidden="true" />
            <span className="font-medium">MOLINOS CUSCO S.A. · PLANTA KM 76 CUSIPATA</span>
            <span className="hidden sm:inline text-[#D4C9BA]">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#6E6259]">RUC 20114918718</span>
          </div>
        </div>

        {/* Main Title & Editorial Typography (Style Kinfolk / De Cecco) */}
        <div ref={contentRef} className="space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#231F1D] leading-[1.06]">
            El Silencio del <br />
            <span className="text-[#8C2318] italic font-serif font-normal">Origen Andino</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-xl font-normal leading-relaxed text-[#6E6259] font-sans">
            A más de 3,300 m.s.n.m. en el Valle de Cusipata, transformamos sémola pura de trigo
            durum y huevos frescos en fideos al huevo de elasticidad y tenacidad insuperable.
          </p>

          {/* Editorial Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleScrollToNext("#calibres")}
              className="inline-flex items-center gap-2.5 rounded-sm bg-[#8C2318] px-7 py-3.5 text-sm sm:text-base font-serif font-medium tracking-wide text-[#FBF8F3] shadow-xs transition-all duration-200 hover:bg-[#6F1B12] focus-visible:ring-2 focus-visible:ring-[#C68B2C] active:scale-95 cursor-pointer"
            >
              <Scale className="h-4 w-4 text-[#F5E6C8]" aria-hidden="true" />
              <span>Ver Calibres (#40 - #43)</span>
            </button>

            <button
              type="button"
              onClick={() => handleScrollToNext("#ingredientes")}
              className="inline-flex items-center gap-2.5 rounded-sm border border-[#E7DFD5] bg-white/70 px-7 py-3.5 text-sm sm:text-base font-serif font-medium tracking-wide text-[#231F1D] shadow-xs transition-all duration-200 hover:bg-[#F2ECE1] hover:border-[#C68B2C] focus-visible:ring-2 focus-visible:ring-[#C68B2C] cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-[#C68B2C]" aria-hidden="true" />
              <span>Alquimia de Ingredientes</span>
            </button>
          </div>

          {/* Editorial Highlights Metric Column Cards (Warm Stone & Paper Plaque) */}
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <div className="rounded-xl border border-[#E7DFD5] bg-[#F2ECE1]/70 p-4 shadow-xs">
              <span className="font-serif text-[11px] font-semibold tracking-wider text-[#C68B2C] uppercase block">
                Presión Andina
              </span>
              <p className="mt-1 font-serif text-2xl font-bold text-[#231F1D]">3,300+ m</p>
              <p className="mt-0.5 text-xs text-[#6E6259]">Curvas de secado adaptadas</p>
            </div>

            <div className="rounded-xl border border-[#E7DFD5] bg-[#F2ECE1]/70 p-4 shadow-xs">
              <span className="font-serif text-[11px] font-semibold tracking-wider text-[#C68B2C] uppercase block">
                Tradición Industrial
              </span>
              <p className="mt-1 font-serif text-2xl font-bold text-[#231F1D]">Desde 1960</p>
              <p className="mt-0.5 text-xs text-[#6E6259]">Escritura pública en 1988</p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#E7DFD5] bg-[#F2ECE1]/70 p-4 shadow-xs">
              <span className="font-serif text-[11px] font-semibold tracking-wider text-[#C68B2C] uppercase block">
                Inocuidad Bromatológica
              </span>
              <p className="mt-1 font-serif text-2xl font-bold text-[#231F1D] flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-[#3A6953] inline" aria-hidden="true" />
                DIGESA
              </p>
              <p className="mt-0.5 text-xs text-[#6E6259]">Directorio PROMPERÚ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Downward Editorial Scroll Cue */}
      <div ref={scrollCueRef} className="relative z-20 flex flex-col items-center justify-center pt-8">
        <button
          type="button"
          onClick={() => handleScrollToNext("#ingredientes")}
          className="group flex flex-col items-center gap-2 text-[#6E6259] transition-colors hover:text-[#8C2318] focus-visible:ring-1 focus-visible:ring-[#C68B2C] focus-visible:outline-none cursor-pointer"
          aria-label="Desplazarse hacia el Acto II: Alquimia de Ingredientes"
        >
          <span className="font-serif text-xs italic tracking-widest text-[#6E6259]">Descubrir Alquimia</span>
          <div className="flex h-7 w-4 justify-center rounded-full border border-[#D4C9BA] p-0.5 group-hover:border-[#8C2318]">
            <div className="h-1.5 w-1 rounded-full bg-[#8C2318] animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
