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
  coefficient: number; // 0.2, 0.5, 0.8 physics layer
  pastelTone: string; // Organic pastel color
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  imageSrc: string;
}

const ingredients: IngredientLayer[] = [
  {
    id: "semola-durum",
    name: "Sémola de Trigo Durum",
    subtitle: "Extracción lenta en cilindros estriados",
    provenance: "Trigo durum selecto canadiense y nacional",
    coefficient: 0.2,
    pastelTone: "#F5E6C8", // Ocre Crema
    iconBg: "bg-[#F5E6C8]",
    iconColor: "text-[#8C2318]",
    icon: Wheat,
    imageSrc: "/images/semola_al_huevo.png",
    description:
      "Molienda diferencial de granos vítreos con separación limpia de afrecho. Aporta alta densidad proteica y una estructura tenaz que sella los almidones durante la cocción.",
  },
  {
    id: "huevos-granja",
    name: "Huevos Frescos de Granja",
    subtitle: "Emulsión natural y proteína globular",
    provenance: "Granjas seleccionadas del valle interandino",
    coefficient: 0.5,
    pastelTone: "#F2DDD5", // Terracota Pálido
    iconBg: "bg-[#F2DDD5]",
    iconColor: "text-[#8C2318]",
    icon: Egg,
    imageSrc: "/images/pasta_al_huevo_40_43.png",
    description:
      "Aporte de lecitina pura que confiere elasticidad al laminado tradicional y un dorado cálido característico en fideos #40 al #43, garantizando una mordida al dente irrepetible.",
  },
  {
    id: "espinaca-tierna",
    name: "Extracto de Espinaca Silvestre",
    subtitle: "Clorofila vegetal prensada en frío",
    provenance: "Campos de cultivo de Quispicanchi",
    coefficient: 0.5,
    pastelTone: "#DCE6DF", // Verde Salvia Suave
    iconBg: "bg-[#DCE6DF]",
    iconColor: "text-[#3A6953]",
    icon: Leaf,
    imageSrc: "/images/fideos_espinaca_quinua_kiwicha.png",
    description:
      "Hojas frescas seleccionadas e incorporadas al amasado para nuestra línea verde especial, infundiendo un aroma sutil a huerta y nutrientes bioactivos sin aditivos sintéticos.",
  },
  {
    id: "quinua-kiwicha",
    name: "Quinua Real & Kiwicha Perlada",
    subtitle: "Granos ancestrales de alta digestibilidad",
    provenance: "Cooperativas comunales de Quispicanchi y Canchis",
    coefficient: 0.8,
    pastelTone: "#F5E6C8", // Ocre Crema
    iconBg: "bg-[#F5E6C8]",
    iconColor: "text-[#C68B2C]",
    icon: Mountain,
    imageSrc: "/images/galletas_quinua_kiwicha.png",
    description:
      "Biocomercio andino sostenible que integra aminoácidos esenciales a nuestras pastas nutritivas, honrando la sabiduría agrícola milenaria de los valles del Cusco.",
  },
  {
    id: "agua-ausangate",
    name: "Agua de Deshielo del Ausangate",
    subtitle: "Pureza mineral a 3,300+ m.s.n.m.",
    provenance: "Cuenca del nevado sagrado canalizada en Cusipata",
    coefficient: 0.8,
    pastelTone: "#DCE6DF", // Salvia Glacial Suave
    iconBg: "bg-[#DCE6DF]",
    iconColor: "text-[#3D6E8C]",
    icon: Droplets,
    imageSrc: "/images/carrusel_2.png",
    description:
      "Baja dureza cálcica y oxigenación limpia de montaña que logran una hidratación molecular uniforme y suave en la tolva de mezclado continuo.",
  },
];

export function Act2ParallaxIngredients(): React.JSX.Element {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const centerHubRef = useRef<HTMLDivElement | null>(null);
  const { isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Gentle organic parallax translation
      ingredients.forEach((item, index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        const yOffset = 100 * item.coefficient;
        const xOffset = index % 2 === 0 ? -25 * item.coefficient : 25 * item.coefficient;

        gsap.fromTo(
          card,
          {
            y: yOffset,
            x: xOffset,
            opacity: 0.85,
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
              scrub: 1.2,
            },
          }
        );
      });

      // Central Milling Convergence Landmark
      if (centerHubRef.current) {
        gsap.fromTo(
          centerHubRef.current,
          { scale: 0.96, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      id="ingredientes"
      aria-label="Alquimia de los Ingredientes Andinos"
      className="relative min-h-screen bg-[#F2ECE1] py-32 px-4 sm:px-6 lg:px-8 text-[#231F1D] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header — Editorial & Poetic */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#FBF8F3] px-4 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#C68B2C]" aria-hidden="true" />
            <span>Pureza Botánica & Tradición Molinera</span>
            <span className="sr-only">Acto II</span>
          </div>

          <h2 className="mt-5 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231F1D] leading-tight">
            Alquimia de los <br />
            <span className="text-[#8C2318] italic font-serif font-normal">Ingredientes Andinos</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#6E6259] leading-relaxed font-sans max-w-2xl mx-auto">
            Cinco vertientes de pureza convergen hacia los cilindros de Molienda 1 y 2 en nuestra
            planta del Km 76 de Cusipata, donde la tradición harinera abraza la generosidad botánica de los Andes.
          </p>
        </div>

        {/* Central Milling Landmark Plaque */}
        <div
          ref={centerHubRef}
          className="mt-14 mx-auto max-w-2xl rounded-2xl border border-[#E7DFD5] bg-[#FBF8F3] p-7 sm:p-8 text-center shadow-xs"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8C2318] text-[#FBF8F3] shadow-xs">
            <Wheat className="h-6 w-6 text-[#F5E6C8]" aria-hidden="true" />
          </div>
          <h3 className="mt-3.5 font-serif text-xl sm:text-2xl font-bold text-[#231F1D]">
            Punto Central de Molienda y Extrusión Continua
          </h3>
          <p className="mt-1 font-serif text-xs italic tracking-wider text-[#8C2318]">
            Molienda 1 & 2 · Planta Km 76 Cusipata (&gt;3,300 m.s.n.m.)
          </p>
          <p className="mt-2.5 text-xs sm:text-sm text-[#6E6259] leading-relaxed max-w-lg mx-auto">
            Tolvas dosificadoras con balance gravimétrico que reciben cada componente seleccionado,
            fundiendo el grano y la emulsión en una masa elástica de máxima retención almidonosa.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition: 5 Organic Ingredient Stories */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {ingredients.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group relative flex flex-col justify-between rounded-2xl border border-[#E7DFD5] bg-[#FBF8F3] p-6 sm:p-7 shadow-xs transition-all duration-300 hover:shadow-md hover:border-[#C68B2C] will-change-transform ${
                  index === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Organic Photography Frame with Soft Rounded Corners */}
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl border border-[#E7DFD5] bg-white p-3 shadow-inner">
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full shadow-xs"
                      style={{ backgroundColor: item.pastelTone }}
                    >
                      <Icon className="h-4 w-4 text-[#231F1D]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Accessible Physics Tag for Tests & Screen Readers */}
                  <span className="sr-only">Vel. Coef: {item.coefficient}x</span>

                  {/* Header Titles */}
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#231F1D] group-hover:text-[#8C2318] transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <p className="mt-1 font-serif text-xs italic font-medium text-[#8C2318]">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-3.5 text-xs sm:text-sm text-[#6E6259] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Provenance & Sourcing Seal */}
                <div className="mt-6 border-t border-[#E7DFD5] pt-4">
                  <span className="font-serif text-[11px] uppercase tracking-wider text-[#C68B2C] block font-semibold">
                    Procedencia & Acopio
                  </span>
                  <p className="mt-0.5 font-serif text-xs text-[#231F1D]">
                    {item.provenance}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
