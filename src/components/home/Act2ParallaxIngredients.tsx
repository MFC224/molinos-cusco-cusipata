"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/lenis";
import { Wheat, Egg, Sparkles, Droplets, Mountain, Leaf } from "lucide-react";

interface IngredientLayer {
  id: string;
  name: string;
  subtitle: string;
  provenance: string;
  coefficient: number; // 0.2, 0.5, 0.8 as specified in HU-03
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const ingredients: IngredientLayer[] = [
  {
    id: "semola-durum",
    name: "Sémola de Trigo Durum",
    subtitle: "Alta densidad proteica y carotenos",
    provenance: "Trigo durum selecto canadiense y nacional",
    coefficient: 0.2,
    badgeColor: "#D99B26",
    icon: Wheat,
    description:
      "Transformación en Molienda 1 y 2 con separación diferencial de afrecho, asegurando estructura vítrea y retención superior de almidones durante la cocción.",
  },
  {
    id: "huevos-granja",
    name: "Huevos Frescos de Granja",
    subtitle: "Proteína globular y emulsionante natural",
    provenance: "Granjas seleccionadas del valle interandino",
    coefficient: 0.5,
    badgeColor: "#E09F3E",
    icon: Egg,
    description:
      "Aporte de lecitina natural para otorgar tenacidad al laminado tradicional y un dorado cálido característico en fideos #40 al #43.",
  },
  {
    id: "espinaca-tierna",
    name: "Extracto de Espinaca Silvestre",
    subtitle: "Clorofila vegetal e hidratación activa",
    provenance: "Campos de cultivo de Quispicanchi",
    coefficient: 0.5,
    badgeColor: "#2D6A4F",
    icon: Leaf,
    description:
      "Concentrado vegetal prensado en frío para la línea especial de espinaca, aportando notas aromáticas y micro-nutrientes bioactivos.",
  },
  {
    id: "quinua-kiwicha",
    name: "Quinua Real & Kiwicha Perlada",
    subtitle: "Granos ancestrales de alta digestibilidad",
    provenance: "Cooperativas comunales de Quispicanchi y Canchis",
    coefficient: 0.8,
    badgeColor: "#B55327",
    icon: Mountain,
    description:
      "Biocomercio andino sostenible referenciado en investigaciones de la PUCP, incorporando aminoácidos esenciales a las pastas andinas.",
  },
  {
    id: "agua-ausangate",
    name: "Agua de Deshielo del Ausangate",
    subtitle: "Pureza mineral a 3,300+ m.s.n.m.",
    provenance: "Cuenca del nevado sagrado canalizada en Cusipata",
    coefficient: 0.8,
    badgeColor: "#3B82F6",
    icon: Droplets,
    description:
      "Baja dureza cálcica y oxigenación de altura para una hidratación molecular uniforme durante el amasado continuo.",
  },
];

export function Act2ParallaxIngredients(): React.JSX.Element {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerHubRef = useRef<HTMLDivElement | null>(null);
  const { isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Animate each layer based on its specified physical coefficient (0.2, 0.5, 0.8)
      ingredients.forEach((item, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        // Differential movement: coefficient scales translation offset
        const yOffset = 180 * item.coefficient;
        const xOffset = index % 2 === 0 ? -40 * item.coefficient : 40 * item.coefficient;

        gsap.fromTo(
          card,
          {
            y: yOffset,
            x: xOffset,
            opacity: 0.4,
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 30%",
              scrub: 1.2, // Smooth interpolation with Lenis
            },
          }
        );
      });

      // Central Milling Convergence Pulse
      if (centerHubRef.current) {
        gsap.fromTo(
          centerHubRef.current,
          { scale: 0.9, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      // Clean up ScrollTrigger instances to prevent memory leaks
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="ingredientes"
      aria-label="Acto II: Alquimia de los Ingredientes Andinos"
      className="relative min-h-screen bg-[#FAF6F0] py-28 px-4 sm:px-6 lg:px-8 text-[#1C1917] overflow-hidden"
    >
      {/* Decorative ambient aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#D99B26]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#2D6A4F]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B55327]/30 bg-[#FAF6F0] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#B55327] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acto II · Parallax Espacial 2.5D</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917]">
            Alquimia de los <br />
            <span className="text-[#9E1B1B] italic">Ingredientes Andinos</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
            Cinco vertientes naturales convergen hacia los cilindros sincrónicos de Molienda 1 y 2 en
            nuestra planta del Km 76 de Cusipata, fundiendo tradición italiana y botánica andina.
          </p>
        </div>

        {/* Central Milling Hub Landmark */}
        <div
          ref={centerHubRef}
          className="mt-12 mx-auto max-w-xl rounded-2xl border-2 border-dashed border-[#D99B26]/60 bg-[#F4EFE6] p-6 text-center shadow-inner"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#9E1B1B] text-[#FAF6F0] shadow-md">
            <Wheat className="h-6 w-6 text-[#F5C768]" aria-hidden="true" />
          </div>
          <h3 className="mt-3 font-serif text-lg font-bold text-[#1C1917]">
            Punto Central de Molienda y Extrusión Continua
          </h3>
          <p className="mt-1 font-mono text-xs text-[#D99B26] font-semibold">
            Molienda 1 & 2 · Planta Km 76 Cusipata (&gt;3,300 m.s.n.m.)
          </p>
          <p className="mt-2 text-xs text-stone-600">
            Tolvas dosificadoras con calibración gravimétrica exacta que reciben las capas convergentes
            para formar la masa al dente.
          </p>
        </div>

        {/* Parallax Multicapa Grid: 5 Converging Ingredients */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group relative flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:border-[#D99B26] will-change-transform ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Speed Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: item.badgeColor }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tracking-wider text-stone-600 rounded bg-stone-100 px-2 py-0.5 border border-stone-200">
                      Vel. Coef: {item.coefficient}x
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="mt-6 font-serif text-xl font-bold text-[#1C1917] group-hover:text-[#9E1B1B] transition-colors">
                    {item.name}
                  </h4>
                  <p className="mt-1 font-sans text-xs font-semibold text-[#D99B26]">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Provenance Footer */}
                <div className="mt-6 border-t border-stone-100 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-stone-600 block">
                    Procedencia & Acopio
                  </span>
                  <p className="mt-0.5 text-xs font-medium text-stone-800">
                    {item.provenance}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
