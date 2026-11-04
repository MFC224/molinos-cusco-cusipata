"use client";

import React from "react";
import { Act1Hero } from "@/components/home/Act1Hero";
import { Act2ParallaxIngredients } from "@/components/home/Act2ParallaxIngredients";
import { Scale, ShieldCheck, Mountain, Truck } from "lucide-react";

export default function HomePage(): React.JSX.Element {
  return (
    <div className="relative w-full">
      {/* Acto I: El Silencio del Origen (Hero Cinematográfico 4K + Semolina Particles) */}
      <Act1Hero />

      {/* Acto II: Alquimia de los Ingredientes Andinos (Parallax Multicapa 2.5D) */}
      <Act2ParallaxIngredients />

      {/* Acto III Anchor: Calibrador de Pastas */}
      <section
        id="calibres"
        aria-label="Acto III: Calibres Técnicos de Pastas"
        className="bg-[#1C1917] text-[#FAF6F0] py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#D99B26]">
              Acto III · Precisión Micrométrica
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-bold text-[#FAF6F0]">
              Gama de Calibres Oficiales Cusipata
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base">
              Especificaciones de espesor, tiempos de cocción al dente y absorción hídrica para cada
              formato gastronómico.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { code: "#40", title: "Tallarín Grueso", gauge: "1.70 mm", cook: "11 min", yield: "110%" },
              { code: "#41", title: "Tallarín Mediano", gauge: "1.45 mm", cook: "9 min", yield: "105%" },
              { code: "#42", title: "Tallarín Delgado", gauge: "1.20 mm", cook: "7 min", yield: "100%" },
              { code: "#43", title: "Cabello de Ángel", gauge: "0.85 mm", cook: "3.5 min", yield: "95%" },
            ].map((item) => (
              <div
                key={item.code}
                className="group relative rounded-xl border border-[#38332E] bg-[#262220] p-6 transition-all duration-300 hover:border-[#D99B26] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-[#D99B26]">{item.code}</span>
                  <Scale className="h-5 w-5 text-stone-400 group-hover:text-[#D99B26] transition-colors" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold text-[#FAF6F0]">{item.title}</h3>
                <div className="mt-4 space-y-2 border-t border-[#38332E] pt-4 font-mono text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Espesor:</span>
                    <strong className="text-[#FAF6F0]">{item.gauge}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Cocción al dente:</span>
                    <strong className="text-[#F5C768]">{item.cook}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Absorción hídrica:</span>
                    <strong className="text-emerald-400">{item.yield}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acto IV & V Anchors: Planta Km 76 & Cotizador Mayorista */}
      <section
        id="planta-industrial"
        aria-label="Planta Industrial Cusipata y Cotizador B2B"
        className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#9E1B1B]">
              Infraestructura Operativa
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
              Planta Industrial Km 76 Carretera Cusco–Sicuani
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              Equipada con molinos de cilindros sincrónicos, extrusión continua y túneles de secado
              climáticamente regulados que preservan la estructura proteica del fideo.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-stone-700">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 border border-stone-300">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Registro Sanitario DIGESA
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 border border-stone-300">
                <Mountain className="h-4 w-4 text-[#B55327]" /> 3,300+ m.s.n.m. Cusipata
              </span>
            </div>
          </div>

          <div id="cotizador" className="rounded-2xl border border-stone-300 bg-[#F4EFE6] p-8 shadow-lg">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Atención Comercial Mayorista B2B
            </h3>
            <p className="mt-2 text-xs text-stone-600 leading-relaxed">
              Despacho consolidado de fardos (5kg a 10kg) y empaques minoristas para distribuidores y
              programas institucionales en el sur del Perú.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-lg bg-white p-3 border border-stone-200">
                <span className="text-[10px] uppercase font-mono text-stone-500">Canal Cusco / Distribución</span>
                <p className="font-mono text-sm font-bold text-[#1C1917]">+51 984 630 970</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-stone-200">
                <span className="text-[10px] uppercase font-mono text-stone-500">Canal Planta Cusipata / Altiplano</span>
                <p className="font-mono text-sm font-bold text-[#1C1917]">+51 932 331 672</p>
              </div>
            </div>
            <a
              href="https://wa.me/51932331672?text=Estimado%20equipo%20comercial%20de%20Molinos%20Cusco%20S.A.%2C%20solicito%20cotizaci%C3%B3n%20mayorista"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#9E1B1B] py-3 text-sm font-bold text-[#FAF6F0] shadow-md transition-colors hover:bg-[#7D1414]"
            >
              <Truck className="h-4 w-4 text-[#F5C768]" aria-hidden="true" />
              <span>Contactar con Despacho de Planta</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
