"use client";

import React, { useState, useEffect, useRef } from "react";
import { CALIBRES, CalibreData, getCalibreByCode, clampCalibreIndex } from "@/lib/calibre-data";
import {
  Scale,
  Clock,
  Droplets,
  ZoomIn,
  Utensils,
  ChevronLeft,
  ChevronRight,
  Check,
  Wheat,
  Layers,
  Wind,
  Sparkles,
  Timer,
  Flame,
  Award,
} from "lucide-react";

export function Act3CalibreComparator(): React.JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomMode, setIsZoomMode] = useState<boolean>(false);
  const currentCalibre: CalibreData = CALIBRES[selectedIndex] ?? CALIBRES[0]!;
  const containerRef = useRef<HTMLElement | null>(null);

  // Check URL query param on mount (?calibre=41 or invalid ?calibre=99)
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const calibreParam = urlParams.get("calibre");
      if (calibreParam) {
        const resolved = getCalibreByCode(calibreParam);
        const index = CALIBRES.findIndex((c) => c.code === resolved.code);
        if (index !== -1) {
          setSelectedIndex(index);
        }
      }
    } catch {
      setSelectedIndex(0);
    }
  }, []);

  // Keyboard navigation: Left/Right arrows across calibres
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => clampCalibreIndex(prev + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => clampCalibreIndex(prev - 1));
    }
  };

  const setCalibreSafe = (idx: number): void => {
    setSelectedIndex(clampCalibreIndex(idx));
  };

  return (
    <section
      ref={containerRef}
      id="calibres"
      role="region"
      aria-label="El Arte del Laminado y Comparador Escalar de Calibres"
      className="relative min-h-screen bg-[#FBF8F3] py-28 px-4 sm:px-6 lg:px-8 text-[#231F1D] overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Organic Warm Background Blobs (Salvia, Trigo, Terracota - Zero Neon) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20 -left-20 h-96 w-96 rounded-full bg-[#F5E6C8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-24 h-[550px] w-[550px] rounded-full bg-[#DCE6DF]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 -left-24 h-96 w-96 rounded-full bg-[#F2DDD5]/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================================================================
            PARTE 1: EL SECRETO DEL LAMINADO LENTO (3 PASOS GASTRONÓMICOS EN SCROLL)
            ========================================================================= */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#F2ECE1] px-4 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs">
            <Wheat className="h-3.5 w-3.5 text-[#8C2318]" aria-hidden="true" />
            <span>Alquimia Pastelera Tradicional</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231F1D] leading-tight">
            El Secreto del <br />
            <span className="text-[#8C2318] italic font-serif font-normal">Laminado Lento Cusipata</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6E6259] font-sans leading-relaxed max-w-2xl mx-auto">
            ¿Por qué nuestra pasta artesanal sabe diferente? A diferencia del prensado rápido industrial,
            respetamos los tiempos de la sémola, el reposo del huevo y la brisa seca de los Andes.
          </p>
        </div>

        {/* 3 Pasos Visuales en Tarjetas Editoriales */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Paso 1 */}
          <article className="group relative flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1]/80 p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold tracking-widest uppercase text-[#8C2318]">
                  Paso I · Ingrediente Puro
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F5E6C8] text-[#8C2318] shadow-xs">
                  <Wheat className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="mt-6 font-serif text-xl sm:text-2xl font-bold text-[#231F1D] leading-snug">
                Sémola de Trigo Durum + Huevos Frescos
              </h3>

              <p className="mt-3 text-sm text-[#6E6259] leading-relaxed font-sans">
                Color dorado natural, sin colorantes artificiales. Seleccionamos sémola vítrea de alto
                contenido proteico y la amasamos con huevo fresco pasteurizado para lograr un perfume cálido
                y una textura firme que alimenta de verdad.
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7DFD5] pt-4 text-xs font-serif italic text-[#8C2318]">
              Dorado 100% natural de yema · Cero aditivos
            </div>
          </article>

          {/* Paso 2 */}
          <article className="group relative flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1]/80 p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold tracking-widest uppercase text-[#8C2318]">
                  Paso II · Técnica Maestra
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F2DDD5] text-[#8C2318] shadow-xs">
                  <Layers className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="mt-6 font-serif text-xl sm:text-2xl font-bold text-[#231F1D] leading-snug">
                Doble Laminado en Rodillos
              </h3>

              <p className="mt-3 text-sm text-[#6E6259] leading-relaxed font-sans">
                Estiramos la masa suavemente hoja sobre hoja, sin someterla a la fricción térmica que
                destruye la proteína del trigo. El paso paulatino por cilindros crea una superficie
                micro-porosa que abraza la salsa desde el primer bocado.
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7DFD5] pt-4 text-xs font-serif italic text-[#8C2318]">
              Rugosidad artesanal que abraza la salsa
            </div>
          </article>

          {/* Paso 3 */}
          <article className="group relative flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1]/80 p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold tracking-widest uppercase text-[#8C2318]">
                  Paso III · Curado Andino
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCE6DF] text-[#3A6953] shadow-xs">
                  <Wind className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>

              <h3 className="mt-6 font-serif text-xl sm:text-2xl font-bold text-[#231F1D] leading-snug">
                Secado de Altura en Cusipata (3,300 m.s.n.m.)
              </h3>

              <p className="mt-3 text-sm text-[#6E6259] leading-relaxed font-sans">
                El aire puro, seco y la presión de altitud del valle sellan la pasta lentamente a
                temperatura templada. Un curado reposado que garantiza que el fideo conserve su nervio
                y elasticidad: nunca se pega ni se rompe en la olla.
              </p>
            </div>

            <div className="mt-6 border-t border-[#E7DFD5] pt-4 text-xs font-serif italic text-[#3A6953]">
              Firmeza al dente insuperable en olla hirviente
            </div>
          </article>
        </div>

        {/* =========================================================================
            PARTE 2: EL COMPARADOR TÁCTIL DE CALIBRES (#40, #41, #42 y #43)
            ========================================================================= */}
        <div className="mt-28 pt-20 border-t border-[#E7DFD5]">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#F2ECE1] px-4 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs">
              <Scale className="h-3.5 w-3.5 text-[#8C2318]" aria-hidden="true" />
              <span>Calibración de la Pasta Tradicional</span>
            </div>

            <h3 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#231F1D]">
              El Arte del Laminado y <br />
              <span className="text-[#8C2318] italic font-serif font-normal">Calibres a Escala Real</span>
            </h3>

            <p className="mt-4 text-sm sm:text-base text-[#6E6259] font-sans leading-relaxed max-w-2xl mx-auto">
              Del grosor señorial del Tallarín Grueso #40 al hilo sutil del Cabello de Ángel #43.
              Toque y compare el espesor real, el tiempo exacto en olla y el maridaje gastronómico ideal.
            </p>
          </div>

          {/* Live Region for Screen Readers (WCAG AA requirement ESC-04.08) */}
          <div aria-live="polite" className="sr-only" data-testid="live-region-announcement">
            Calibre seleccionado {currentCalibre.code} {currentCalibre.name}. Espesor:{" "}
            {currentCalibre.thicknessMm.toFixed(2)} milímetros. Tiempo de cocción:{" "}
            {currentCalibre.cookingTimeMin} minutos.
          </div>

          {/* Calibre Selector Tabs (Editorial Buttons) */}
          <div className="mt-12 flex flex-col items-center">
            <div
              role="tablist"
              aria-label="Selector de calibre de pastas"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-2xl border border-[#E7DFD5] bg-[#F2ECE1] p-2 shadow-xs w-full max-w-3xl"
            >
              {CALIBRES.map((calibre, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={calibre.code}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls={`panel-${calibre.numericCode}`}
                    id={`tab-${calibre.numericCode}`}
                    type="button"
                    onClick={() => setCalibreSafe(index)}
                    className={`flex flex-col items-center justify-center rounded-xl p-3 sm:p-4 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none cursor-pointer ${
                      isSelected
                        ? "bg-[#8C2318] text-[#FBF8F3] shadow-md scale-102"
                        : "bg-white/80 text-[#231F1D] hover:bg-white hover:text-[#8C2318]"
                    }`}
                  >
                    <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide">
                      {calibre.code}
                    </span>
                    <span className={`text-xs font-serif font-medium mt-0.5 ${isSelected ? "text-[#FBF8F3]" : "text-[#6E6259]"}`}>
                      {calibre.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Touch Stepper Helper */}
            <div className="mt-3 flex items-center gap-4 text-xs font-serif text-[#6E6259] sm:hidden">
              <button
                type="button"
                disabled={selectedIndex === 0}
                onClick={() => setCalibreSafe(selectedIndex - 1)}
                className="p-1.5 rounded-full border border-[#E7DFD5] bg-white disabled:opacity-40"
                aria-label="Calibre anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span>Navegar con flechas o deslizar</span>
              <button
                type="button"
                disabled={selectedIndex === CALIBRES.length - 1}
                onClick={() => setCalibreSafe(selectedIndex + 1)}
                className="p-1.5 rounded-full border border-[#E7DFD5] bg-white disabled:opacity-40"
                aria-label="Calibre siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Main Interactive Stage & Culinary Card */}
          <div
            id={`panel-${currentCalibre.numericCode}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentCalibre.numericCode}`}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left: Realistic Scale Pasta Visual Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              {/* Header inside Stage */}
              <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8C2318]">
                    Laminado al Huevo
                  </span>
                  <span className="text-[#C68B2C]">•</span>
                  <span className="font-serif text-xs italic text-[#6E6259]">
                    Comparativa a Escala Real
                  </span>
                </div>

                {/* Macro Texture Toggle Button (ESC-04.14) */}
                <button
                  type="button"
                  onClick={() => setIsZoomMode(!isZoomMode)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-serif text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C68B2C] cursor-pointer ${
                    isZoomMode
                      ? "bg-[#C68B2C] text-[#231F1D] font-bold shadow-xs"
                      : "border border-[#E7DFD5] bg-white text-[#6E6259] hover:border-[#8C2318] hover:text-[#8C2318]"
                  }`}
                  aria-pressed={isZoomMode}
                  aria-label={isZoomMode ? "Desactivar modo textura macro 200%" : "Activar modo textura macro 200%"}
                >
                  <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{isZoomMode ? "Zoom 200% Activo" : "Ver Rugosidad 200%"}</span>
                </button>
              </div>

              {/* Realistic Visual Stage with 4 Strands Comparative Display */}
              <div className="relative my-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl bg-[#FBF8F3] p-6 border border-[#E7DFD5] overflow-hidden">
                {/* Traditional Kitchen Timer Badge (Overlay Clock) */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#F2ECE1]/90 px-3 py-1.5 shadow-xs">
                  <Timer className="h-4 w-4 text-[#8C2318]" aria-hidden="true" />
                  <span className="font-serif text-xs font-bold text-[#231F1D]">
                    {currentCalibre.cookingTimeMin} min en olla
                  </span>
                </div>

                {/* Comparative Ribbons SVG */}
                <svg
                  viewBox="0 0 600 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-full max-w-lg transition-transform duration-500 ease-out ${
                    isZoomMode ? "scale-[1.85]" : "scale-100"
                  }`}
                  style={{ transformOrigin: "center center" }}
                  aria-hidden="true"
                >
                  <defs>
                    {/* Natural Egg-Yolk Golden Pasta Gradient */}
                    <linearGradient id="eggYolkActive" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E5A83B" />
                      <stop offset="35%" stopColor="#F5C768" />
                      <stop offset="70%" stopColor="#D99B26" />
                      <stop offset="100%" stopColor="#B37D1C" />
                    </linearGradient>

                    <linearGradient id="eggYolkMuted" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#D9CEBA" />
                      <stop offset="100%" stopColor="#C4B79F" />
                    </linearGradient>

                    <filter id="softPastaShadow" x="-10%" y="-30%" width="120%" height="160%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#231F1D" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* Gentle Reference Measurement Lines */}
                  <g stroke="#E7DFD5" strokeWidth="1" strokeDasharray="3 3">
                    <line x1="60" y1="50" x2="540" y2="50" />
                    <line x1="60" y1="120" x2="540" y2="120" />
                    <line x1="60" y1="190" x2="540" y2="190" />
                  </g>

                  {/* 4 Comparative Pasta Strands (#40, #41, #42, #43) shown in harmonious curves */}
                  {CALIBRES.map((cal, idx) => {
                    const isCurrent = idx === selectedIndex;
                    // Y baseline positions for the 4 strands
                    const yOffset = 50 + idx * 45;

                    return (
                      <g key={cal.code} className="transition-all duration-300">
                        {/* Cross section circle on left */}
                        <circle
                          cx="90"
                          cy={yOffset}
                          r={isCurrent ? cal.strokeWidthPx * 0.9 + 2 : cal.strokeWidthPx * 0.6}
                          fill={isCurrent ? "url(#eggYolkActive)" : "url(#eggYolkMuted)"}
                          stroke={isCurrent ? "#8C2318" : "#E7DFD5"}
                          strokeWidth={isCurrent ? 2 : 1}
                          filter="url(#softPastaShadow)"
                        />

                        {/* Calibre Code Label on left */}
                        <text
                          x="55"
                          y={yOffset + 4}
                          fill={isCurrent ? "#8C2318" : "#6E6259"}
                          fontSize="11"
                          fontFamily="serif"
                          fontWeight={isCurrent ? "bold" : "normal"}
                        >
                          {cal.code}
                        </text>

                        {/* Strand Ribbon Wave */}
                        <path
                          d={`M 130,${yOffset} C 220,${yOffset - 18} 340,${yOffset + 18} 430,${yOffset - 6} C 490,${yOffset - 18} 520,${yOffset + 8} 560,${yOffset}`}
                          stroke={isCurrent ? "url(#eggYolkActive)" : "url(#eggYolkMuted)"}
                          strokeWidth={isCurrent ? cal.strokeWidthPx * 1.2 : cal.strokeWidthPx * 0.75}
                          strokeLinecap="round"
                          filter={isCurrent ? "url(#softPastaShadow)" : undefined}
                          opacity={isCurrent ? 1 : 0.4}
                        />

                        {/* Active Indicator Pin */}
                        {isCurrent && (
                          <g transform={`translate(430, ${yOffset - 6})`}>
                            <circle cx="0" cy="0" r="4.5" fill="#8C2318" />
                            <circle cx="0" cy="0" r="8" stroke="#8C2318" strokeWidth="1" opacity="0.5" />
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Micro-porosity texture grains visible in zoom mode */}
                  {isZoomMode && (
                    <g opacity="0.7" stroke="#8C2318" strokeWidth="0.8">
                      <line x1="220" y1="46" x2="223" y2="52" />
                      <line x1="260" y1="92" x2="264" y2="98" />
                      <line x1="320" y1="135" x2="323" y2="141" />
                      <line x1="380" y1="180" x2="383" y2="186" />
                      <line x1="440" y1="72" x2="443" y2="78" />
                      <line x1="490" y1="115" x2="493" y2="121" />
                    </g>
                  )}
                </svg>

                {/* Scale Measurement Badge */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-serif text-[#6E6259]">
                  <span>Espesor de cinta activa: <strong className="text-[#8C2318]">Cinta de {currentCalibre.thicknessMm.toFixed(2)} mm</strong></span>
                  <span>•</span>
                  <span>Absorción hídrica: <strong className="text-[#231F1D]">{currentCalibre.waterAbsorptionPercent}% de absorción</strong></span>
                </div>
              </div>

              {/* Artisanal Rugosity Note */}
              <p className="text-center text-xs text-[#6E6259] italic font-serif">
                {currentCalibre.macroRugosity}
              </p>
            </div>

            {/* Right: Culinary Profile & Technical Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1] p-6 sm:p-8 shadow-xs">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#8C2318]">
                    {currentCalibre.code}
                  </span>
                  <span className="rounded-full border border-[#E7DFD5] bg-[#FBF8F3] px-3.5 py-1 font-serif text-xs text-[#6E6259] shadow-xs">
                    {currentCalibre.category}
                  </span>
                </div>

                <h4 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-[#231F1D]">
                  {currentCalibre.name}
                </h4>

                <p className="mt-2 text-sm text-[#6E6259] leading-relaxed font-sans">
                  {currentCalibre.culinaryProfile}
                </p>

                {/* Key Gastronomic Metrics */}
                <div className="mt-6 space-y-3 border-t border-[#E7DFD5] pt-5">
                  {/* Espesor */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#FBF8F3] p-3.5 border border-[#E7DFD5]">
                    <span className="flex items-center gap-2 text-xs font-serif text-[#6E6259]">
                      <Scale className="h-4 w-4 text-[#8C2318]" aria-hidden="true" />
                      <span>Espesor Técnico:</span>
                    </span>
                    <strong className="font-serif text-base text-[#231F1D]">
                      {currentCalibre.thicknessMm.toFixed(2)} mm
                    </strong>
                  </div>

                  {/* Cocción al dente */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#FBF8F3] p-3.5 border border-[#E7DFD5]">
                    <span className="flex items-center gap-2 text-xs font-serif text-[#6E6259]">
                      <Clock className="h-4 w-4 text-[#C68B2C]" aria-hidden="true" />
                      <span>Cocción al Dente:</span>
                    </span>
                    <strong className="font-serif text-base text-[#8C2318]">
                      {currentCalibre.cookingTimeMin} min
                    </strong>
                  </div>

                  {/* Absorción hídrica */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#FBF8F3] p-3.5 border border-[#E7DFD5]">
                    <span className="flex items-center gap-2 text-xs font-serif text-[#6E6259]">
                      <Droplets className="h-4 w-4 text-[#3A6953]" aria-hidden="true" />
                      <span>Absorción Hídrica:</span>
                    </span>
                    <strong className="font-serif text-base text-[#3A6953]">
                      {currentCalibre.waterAbsorptionPercent}%
                    </strong>
                  </div>

                  {/* Rendimiento HORECA */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#FBF8F3] p-3.5 border border-[#E7DFD5]">
                    <span className="flex items-center gap-2 text-xs font-serif text-[#6E6259]">
                      <Utensils className="h-4 w-4 text-[#8C2318]" aria-hidden="true" />
                      <span>Rendimiento HORECA:</span>
                    </span>
                    <strong className="font-serif text-xs text-[#231F1D]">
                      1 kg rinde ~{currentCalibre.portionsPerKg} porciones
                    </strong>
                  </div>
                </div>

                {/* Maridaje Recomendado */}
                <div className="mt-5 rounded-2xl border border-[#E7DFD5] bg-[#FBF8F3] p-4">
                  <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#8C2318] block">
                    Maridaje Tradicional Recomendado
                  </span>
                  <p className="mt-1.5 text-xs text-[#6E6259] font-sans leading-relaxed">
                    {currentCalibre.recommendedSauces}
                  </p>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="mt-6 pt-4 border-t border-[#E7DFD5] flex items-center justify-between text-xs font-serif text-[#6E6259]">
                <span>Retención elástica: <strong className="text-[#231F1D]">{currentCalibre.elasticRetentionPercent}%</strong></span>
                <span className="text-[#8C2318] italic">Planta Km 76 Cusipata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
