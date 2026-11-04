"use client";

import React, { useState, useEffect, useRef } from "react";
import { CALIBRES, CalibreData, getCalibreByCode, clampCalibreIndex } from "@/lib/calibre-data";
import { Scale, Clock, Droplets, ZoomIn, Utensils, ChevronLeft, ChevronRight, Check } from "lucide-react";

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
      // Safe fallback
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
      aria-label="Acto III: El Arte del Laminado y Comparador Escalar de Calibres"
      className="relative min-h-screen bg-[#1C1917] py-28 px-4 sm:px-6 lg:px-8 text-[#FAF6F0] overflow-hidden border-t border-[#38332E]"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_40%,rgba(217,155,38,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D99B26]/30 bg-[#262220] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#D99B26]">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acto III · Comparador Micrométrico</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF6F0]">
            El Arte del Laminado y <br />
            <span className="text-[#D99B26] italic">Calibres a Escala Real</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
            Del grosor imponente del Tallarín Grueso #40 al hilo sutil del Cabello de Ángel #43.
            Explore diámetros, tiempos de cocción al dente y absorción hídrica calculados para
            cocina profesional y distribución mayorista.
          </p>
        </div>

        {/* Live Region for Screen Readers (WCAG AA requirement ESC-04.08) */}
        <div aria-live="polite" className="sr-only" data-testid="live-region-announcement">
          Calibre seleccionado {currentCalibre.code} {currentCalibre.name}. Espesor:{" "}
          {currentCalibre.thicknessMm.toFixed(2)} milímetros. Tiempo de cocción:{" "}
          {currentCalibre.cookingTimeMin} minutos.
        </div>

        {/* Calibre Selection Buttons / Micrometric Slider */}
        <div className="mt-12 flex flex-col items-center">
          <div
            role="tablist"
            aria-label="Selector de calibre de pastas"
            className="flex flex-wrap justify-center gap-2 rounded-xl border border-[#38332E] bg-[#262220] p-1.5 shadow-xl max-w-full"
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
                  className={`flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm sm:text-base font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none ${
                    isSelected
                      ? "bg-[#D99B26] text-[#1C1917] shadow-[0_0_12px_rgba(217,155,38,0.5)] scale-105"
                      : "text-stone-400 hover:bg-[#38332E]/60 hover:text-[#FAF6F0]"
                  }`}
                >
                  <span>{calibre.code}</span>
                  <span className="hidden sm:inline font-sans text-xs font-semibold">
                    {calibre.name}
                  </span>
                  {isSelected && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
              );
            })}
          </div>

          {/* Stepper controls for mobile touch */}
          <div className="mt-3 flex items-center gap-4 text-xs font-mono text-stone-400 sm:hidden">
            <button
              type="button"
              disabled={selectedIndex === 0}
              onClick={() => setCalibreSafe(selectedIndex - 1)}
              className="p-1 rounded bg-[#262220] disabled:opacity-40"
              aria-label="Calibre anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span>Navegar con flechas</span>
            <button
              type="button"
              disabled={selectedIndex === CALIBRES.length - 1}
              onClick={() => setCalibreSafe(selectedIndex + 1)}
              className="p-1 rounded bg-[#262220] disabled:opacity-40"
              aria-label="Calibre siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Comparator Panel */}
        <div
          id={`panel-${currentCalibre.numericCode}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentCalibre.numericCode}`}
          className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Visual Vector Render (Left / Center - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-[#38332E] bg-[#262220] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Texture Zoom Toggle Button (ESC-04.14) */}
            <div className="flex items-center justify-between border-b border-[#38332E] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#D99B26]">RENDER VECTORIAL</span>
                <span className="text-stone-500">•</span>
                <span className="font-mono text-xs text-stone-400">Escala de Laminado</span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomMode(!isZoomMode)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 font-mono text-xs transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26] ${
                  isZoomMode
                    ? "bg-[#D99B26] text-[#1C1917] font-bold"
                    : "border border-[#38332E] bg-[#1C1917] text-stone-300 hover:border-[#D99B26]"
                }`}
                aria-pressed={isZoomMode}
                aria-label={isZoomMode ? "Desactivar modo textura macro 200%" : "Activar modo textura macro 200%"}
              >
                <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isZoomMode ? "Zoom 200% Activo" : "Ver Rugosidad 200%"}</span>
              </button>
            </div>

            {/* SVG Interactive Render with Dynamic Thickness Interpolation */}
            <div className="relative my-8 flex min-h-[260px] sm:min-h-[300px] items-center justify-center rounded-xl bg-[#1C1917] p-4 sm:p-8 border border-stone-800/80">
              <svg
                viewBox="0 0 600 240"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`w-full max-w-lg transition-transform duration-500 ease-out ${
                  isZoomMode ? "scale-[1.95]" : "scale-100"
                }`}
                style={{ transformOrigin: "center center" }}
              >
                <defs>
                  <linearGradient id="strandGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0.8" />
                    <stop offset="30%" stopColor="#F5C768" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#D99B26" stopOpacity="1" />
                    <stop offset="100%" stopColor="#9E6B18" stopOpacity="0.85" />
                  </linearGradient>

                  <filter id="strandShadow" x="-10%" y="-30%" width="120%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#D99B26" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* Background grid lines for micrometer scale */}
                <g stroke="#38332E" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
                  <line x1="50" y1="40" x2="550" y2="40" />
                  <line x1="50" y1="120" x2="550" y2="120" />
                  <line x1="50" y1="200" x2="550" y2="200" />
                  <line x1="150" y1="20" x2="150" y2="220" />
                  <line x1="300" y1="20" x2="300" y2="220" />
                  <line x1="450" y1="20" x2="450" y2="220" />
                </g>

                {/* Cross section circle on left */}
                <g transform="translate(110, 120)">
                  <circle
                    cx="0"
                    cy="0"
                    r={currentCalibre.strokeWidthPx * 1.8}
                    fill="url(#strandGlow)"
                    stroke="#FAF6F0"
                    strokeWidth="1.5"
                    filter="url(#strandShadow)"
                    className="transition-all duration-300 ease-out"
                  />
                  <text
                    x="0"
                    y={currentCalibre.strokeWidthPx * 1.8 + 24}
                    textAnchor="middle"
                    fill="#D99B26"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    Ø {currentCalibre.thicknessMm.toFixed(2)} mm
                  </text>
                </g>

                {/* Longitudinal Strand Extrusion Curve */}
                <path
                  d="M200,120 C 270,80 340,160 410,100 C 460,60 510,130 550,120"
                  stroke="url(#strandGlow)"
                  strokeWidth={currentCalibre.strokeWidthPx}
                  strokeLinecap="round"
                  filter="url(#strandShadow)"
                  className="transition-all duration-300 ease-out"
                />

                {/* Micro-texture stippling for zoom mode */}
                {isZoomMode && (
                  <g opacity="0.6" stroke="#FAF6F0" strokeWidth="0.8">
                    <line x1="220" y1="116" x2="224" y2="122" />
                    <line x1="260" y1="96" x2="265" y2="102" />
                    <line x1="320" y1="140" x2="324" y2="146" />
                    <line x1="380" y1="112" x2="384" y2="118" />
                    <line x1="440" y1="78" x2="444" y2="84" />
                    <line x1="490" y1="108" x2="494" y2="114" />
                  </g>
                )}
              </svg>
            </div>

            {/* Micro-rugosity descriptor */}
            <p className="mt-2 text-center text-xs text-stone-400 italic font-sans">
              {currentCalibre.macroRugosity}
            </p>
          </div>

          {/* Technical Data & Bromatological Metrics (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Card Header */}
            <div className="rounded-2xl border border-[#38332E] bg-[#262220] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-bold text-[#D99B26]">
                  {currentCalibre.code}
                </span>
                <span className="rounded-md border border-[#38332E] bg-[#1C1917] px-3 py-1 font-mono text-xs text-[#FAF6F0]">
                  {currentCalibre.category}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-2xl font-bold text-[#FAF6F0]">
                {currentCalibre.name}
              </h3>
              <p className="mt-2 text-xs text-stone-300 leading-relaxed font-sans">
                {currentCalibre.culinaryProfile}
              </p>

              {/* Strict Monospaced Metrics (HU-04 Scenario 2 / ESC-04.02) */}
              <div className="mt-6 space-y-3.5 border-t border-[#38332E] pt-5 font-mono text-xs">
                <div className="flex items-center justify-between rounded-lg bg-[#1C1917] p-3 border border-[#38332E]">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Scale className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
                    <span>Espesor Técnico:</span>
                  </span>
                  <strong className="text-base text-[#FAF6F0]">
                    {currentCalibre.thicknessMm.toFixed(2)} mm
                  </strong>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[#1C1917] p-3 border border-[#38332E]">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Clock className="h-4 w-4 text-[#F5C768]" aria-hidden="true" />
                    <span>Cocción al Dente:</span>
                  </span>
                  <strong className="text-base text-[#F5C768]">
                    {currentCalibre.cookingTimeMin} min
                  </strong>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[#1C1917] p-3 border border-[#38332E]">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Droplets className="h-4 w-4 text-sky-400" aria-hidden="true" />
                    <span>Absorción Hídrica:</span>
                  </span>
                  <strong className="text-base text-emerald-400">
                    {currentCalibre.waterAbsorptionPercent}%
                  </strong>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-[#1C1917] p-3 border border-[#38332E]">
                  <span className="flex items-center gap-2 text-stone-400">
                    <Utensils className="h-4 w-4 text-[#B55327]" aria-hidden="true" />
                    <span>Rendimiento HORECA:</span>
                  </span>
                  <strong className="text-xs text-[#FAF6F0]">
                    1 kg rinde ~{currentCalibre.portionsPerKg} porciones
                  </strong>
                </div>
              </div>

              {/* Recommended Sauce Pairing */}
              <div className="mt-5 rounded-lg border border-[#38332E] bg-[#1C1917]/70 p-3.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#D99B26] block">
                  Maridaje y Densidad de Salsa Recomendada
                </span>
                <p className="mt-1 text-xs text-stone-300 font-sans leading-snug">
                  {currentCalibre.recommendedSauces}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
