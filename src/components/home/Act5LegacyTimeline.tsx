"use client";

import React, { useState } from "react";
import { History, Calendar, MapPin, Factory, ShieldCheck, ArrowRight } from "lucide-react";

interface Milestone {
  id: string;
  yearTag: "1960s" | "1988" | "HOY";
  title: string;
  subtitle: string;
  dateStr: string;
  location: string;
  narrative: string;
  keyPoints: string[];
  gradientTheme: string;
}

const milestones: Milestone[] = [
  {
    id: "era-1960s",
    yearTag: "1960s",
    title: "La Génesis Molinera en los Valles Interandinos",
    subtitle: "Pioneros en el procesamiento de trigo duro",
    dateStr: "Década de 1960",
    location: "Valles del Sur Andino / Cusco",
    narrative:
      "Las operaciones técnicas de molienda se remontan a los años 60 durante la era de consolidación industrial en el sur del Perú. Los primeros molinos de rodillos mecánicos sentaron las bases para una extracción de sémola de alta densidad proteica.",
    keyPoints: [
      "Primeros cilindros mecánicos de molienda en la región Cusco.",
      "Separación diferencial de harinas para abasto tradicional de panificación.",
      "Herencia artesanal que definió la receta clásica de fideos al huevo.",
    ],
    gradientTheme: "from-amber-700 via-amber-900 to-stone-900",
  },
  {
    id: "era-1988",
    yearTag: "1988",
    title: "Constitución Formal y Planta Km 76 Cusipata",
    subtitle: "Hito institucional bajo escritura pública",
    dateStr: "28 de Octubre de 1988",
    location: "Distrito de Cusipata, Quispicanchi (>3,300 m.s.n.m.)",
    narrative:
      "El 28 de octubre de 1988 se formaliza bajo escritura pública Molinos Cusco S.A. (RUC 20114918718). Se inicia la construcción e inauguración de la gran planta industrial del Km 76 de la Carretera Cusco–Sicuani, aprovechando el clima andino y las aguas de deshielo.",
    keyPoints: [
      "Inauguración de líneas de extrusión continua y secado barométrico andino.",
      "Registro Único de Contribuyentes formal SUNAT 20114918718.",
      "Nacimiento de la marca insignia 'Fideos Cusipata' con distribución troncal regional.",
    ],
    gradientTheme: "from-[#9E1B1B] via-red-950 to-stone-950",
  },
  {
    id: "era-hoy",
    yearTag: "HOY",
    title: "Vanguardia Industrial, Biocomercio y Red B2B",
    subtitle: "Consolidación de Molienda 1 y 2 con proyección macro-regional",
    dateStr: "Presente Operativo",
    location: "Sede Planta Km 76 Cusipata & Sede Comercial Parque Industrial Cusco",
    narrative:
      "Molinos Cusco S.A. opera hoy con dos líneas continuas de molienda, homologación DIGESA, presencia en PROMPERÚ y desarrollo de pastas enriquecidas con quinua y kiwicha acopiadas a comunidades campesinas, abasteciendo a Cusco, Puno, Juliaca, Arequipa y Lima.",
    keyPoints: [
      "Túneles de secado climáticamente controlados adaptados a la presión de altitud.",
      "Biocomercio sostenible referenciado en investigaciones académicas de la PUCP.",
      "Motor de cotización mayorista B2B con despacho automatizado.",
    ],
    gradientTheme: "from-[#D99B26] via-amber-900 to-stone-950",
  },
];

export function Act5LegacyTimeline(): React.JSX.Element {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("era-1988");
  const current = milestones.find((m) => m.id === activeMilestoneId) ?? milestones[1]!;

  return (
    <section
      id="historia"
      aria-label="Acto V: El Legado de Cusipata y Memoria Industrial"
      className="relative min-h-screen bg-[#FAF6F0] py-28 px-4 sm:px-6 lg:px-8 text-[#1C1917] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9E1B1B]/30 bg-[#F4EFE6] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#9E1B1B]">
            <History className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acto V · Memoria e Hitos Industriales</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917]">
            El Legado de Cusipata <br />
            <span className="text-[#9E1B1B] italic">Tres Épocas de Solidez</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Más de seis décadas de manufactura molinera en los Andes peruanos, transitando desde la
            herencia de molienda en los años sesenta hasta la consolidación formal de Molinos Cusco
            S.A. en 1988 y su moderna red logística B2B actual.
          </p>
        </div>

        {/* Monumental Year Tabs */}
        <div className="mt-12 flex justify-center gap-3 sm:gap-6">
          {milestones.map((milestone) => {
            const isActive = milestone.id === activeMilestoneId;
            return (
              <button
                key={milestone.id}
                type="button"
                onClick={() => setActiveMilestoneId(milestone.id)}
                className={`group relative rounded-xl px-4 sm:px-8 py-3 sm:py-4 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#9E1B1B] focus-visible:outline-none ${
                  isActive
                    ? "bg-[#1C1917] text-[#FAF6F0] shadow-2xl scale-105"
                    : "bg-[#F4EFE6] text-stone-600 hover:bg-stone-200"
                }`}
                aria-pressed={isActive}
              >
                <span className="font-serif text-xl sm:text-3xl font-bold tracking-wider block">
                  {milestone.yearTag}
                </span>
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider block mt-1 text-[#D99B26]">
                  {milestone.dateStr}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-[#9E1B1B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card with Monumental Typographic SVG Mask (HU-10 Scenario 1) */}
        <div className="mt-14 rounded-3xl border border-stone-300 bg-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Monumental Typographic Mask Section (Left - 6 cols) */}
          <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px] flex items-center justify-center bg-[#1C1917] p-4 overflow-hidden">
            {/* SVG Mask Container */}
            <svg
              viewBox="0 0 600 350"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full select-none"
              preserveAspectRatio="xMidYMid meet"
              aria-label={`Máscara tipográfica monumental conmemorativa de ${current.yearTag}`}
            >
              <defs>
                {/* Vector Text Clip Path Mask */}
                <clipPath id={`text-mask-${current.yearTag}`}>
                  <text
                    x="50%"
                    y="65%"
                    textAnchor="middle"
                    fontSize="180"
                    fontFamily="Playfair Display, Georgia, serif"
                    fontWeight="900"
                    letterSpacing="-4"
                  >
                    {current.yearTag}
                  </text>
                </clipPath>

                {/* Industrial Atmosphere Pattern inside Mask */}
                <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF6F0" />
                  <stop offset="35%" stopColor="#F5C768" />
                  <stop offset="70%" stopColor="#D99B26" />
                  <stop offset="100%" stopColor="#9E1B1B" />
                </linearGradient>

                <radialGradient id="plantAtmosphere" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F5C768" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#9E1B1B" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#1C1917" stopOpacity="0.9" />
                </radialGradient>
              </defs>

              {/* Masked Content */}
              <g clipPath={`url(#text-mask-${current.yearTag})`}>
                {/* Background visual artwork representing industrial plant & heritage */}
                <rect width="600" height="350" fill="url(#maskGrad)" />
                <circle cx="300" cy="175" r="220" fill="url(#plantAtmosphere)" />

                {/* Industrial machinery & mill graphic silhouettes inside the numbers */}
                <g opacity="0.4" stroke="#1C1917" strokeWidth="3">
                  <line x1="50" y1="50" x2="550" y2="300" />
                  <line x1="550" y1="50" x2="50" y2="300" />
                  <circle cx="300" cy="175" r="90" fill="none" strokeWidth="6" />
                  <circle cx="300" cy="175" r="45" fill="none" strokeWidth="4" />
                </g>
              </g>

              {/* Outline stroke for readability */}
              <text
                x="50%"
                y="65%"
                textAnchor="middle"
                fontSize="180"
                fontFamily="Playfair Display, Georgia, serif"
                fontWeight="900"
                letterSpacing="-4"
                fill="none"
                stroke="#FAF6F0"
                strokeWidth="1.5"
                opacity="0.3"
              >
                {current.yearTag}
              </text>
            </svg>

            {/* Micro Badge floating on top */}
            <div className="absolute bottom-4 left-6 rounded-md bg-[#1C1917]/80 px-3 py-1 text-[11px] font-mono text-[#D99B26] backdrop-blur-md border border-[#38332E]">
              Hito Histórico · Molinos Cusco S.A.
            </div>
          </div>

          {/* Narrative Content (Right - 6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-stone-500 pb-3 border-b border-stone-200">
                <span className="flex items-center gap-1.5 text-[#9E1B1B] font-bold">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{current.dateStr}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-600">
                  <MapPin className="h-3.5 w-3.5 text-stone-400" aria-hidden="true" />
                  <span>{current.location}</span>
                </span>
              </div>

              <h3 className="mt-4 font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                {current.title}
              </h3>
              <p className="mt-1 font-sans text-xs sm:text-sm font-semibold text-[#D99B26]">
                {current.subtitle}
              </p>

              <p className="mt-5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {current.narrative}
              </p>

              {/* Key Architectural & Industrial Points */}
              <div className="mt-6 space-y-2.5">
                {current.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <Factory className="h-4 w-4 text-[#9E1B1B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Bridge to B2B Wholesale Portal */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <span className="font-mono text-xs text-stone-600">
                  RUC: <strong className="text-stone-900">20114918718</strong>
                </span>
              </div>

              <a
                href="#cotizador"
                className="inline-flex items-center gap-2 rounded-lg bg-[#9E1B1B] px-5 py-2.5 text-xs font-bold text-[#FAF6F0] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#7D1414] focus-visible:ring-2 focus-visible:ring-[#D99B26]"
              >
                <span>Ir al Cotizador Mayorista</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
