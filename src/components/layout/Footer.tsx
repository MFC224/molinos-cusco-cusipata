"use client";

import React from "react";
import { Wheat, MapPin, Phone, ShieldCheck, Award, ExternalLink, Clock, Truck } from "lucide-react";

export function Footer(): React.JSX.Element {
  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página corporativo e industrial"
      className="relative bg-[#1C1917] text-[#FAF6F0] border-t border-[#38332E] pt-16 pb-12 overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-7xl bg-radial from-[#D99B26]/5 via-transparent to-transparent opacity-60"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#38332E]">
          {/* Col 1: Corporate Identity & Heritage */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#9E1B1B] text-[#FAF6F0] shadow-md">
                <Wheat className="h-6 w-6 text-[#F5C768]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-wider text-[#FAF6F0]">
                  MOLINOS CUSCO S.A.
                </span>
                <span className="text-xs uppercase font-semibold tracking-widest text-[#D99B26]">
                  Fideos Cusipata
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-stone-300">
              Industria molinera y fideera del sur andino peruano. Constitución formal el 28 de
              octubre de 1988, con herencia operativa y técnica que data de la década de 1960.
              Pioneros en la manufactura con trigo durum y granos ancestrales.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded border border-[#38332E] bg-[#262220] px-3 py-1.5 font-mono text-xs text-[#D99B26]">
              <span>RUC:</span>
              <strong className="text-[#FAF6F0]">20114918718</strong>
            </div>
          </div>

          {/* Col 2: Industrial Plant & Facility Coordinates */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold tracking-wide text-[#F5C768]">
              Planta Industrial Km 76
            </h3>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#D99B26] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Km 76 Carretera Cusco–Sicuani, Distrito de Cusipata, Provincia de Quispicanchi,
                  Cusco (&gt;3,300 m.s.n.m.).
                </span>
              </div>
              <div className="rounded-md border border-[#38332E] bg-[#262220] p-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>GPS: -14.0492, -71.5033</span>
                  <a
                    href="https://maps.google.com/?q=-14.0492,-71.5033"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#D99B26] hover:underline focus-visible:ring-1 focus-visible:ring-[#D99B26]"
                    aria-label="Abrir mapa de navegación satelital hacia Planta Cusipata"
                  >
                    <span>Ruta GPS</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-1.5 text-[10px] text-stone-400 leading-tight">
                  Patio de maniobras apto para semirremolques y transporte de carga pesada.
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="h-4 w-4 text-[#9E1B1B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#FAF6F0] block">Sede Comercial Cusco:</strong>
                  <span>Urb. Parque Industrial, Cusco.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Logistics & Wholesale Commercial Channels */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold tracking-wide text-[#F5C768]">
              Despacho B2B y Cobertura
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-start gap-2">
                <Truck className="h-4 w-4 text-[#D99B26] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Rutas Troncales:</strong> Cusco, Sicuani, Puno, Juliaca, Arequipa,
                  Apurímac y Lima Metropolitana Sur.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D99B26] shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">Sede Central Cusco:</span>
                  <a
                    href="tel:+51984630970"
                    className="font-mono text-[#FAF6F0] hover:text-[#D99B26] transition-colors"
                  >
                    +51 984 630 970
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D99B26] shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-[11px] text-stone-400">Sede Planta Cusipata:</span>
                  <a
                    href="tel:+51932331672"
                    className="font-mono text-[#FAF6F0] hover:text-[#D99B26] transition-colors"
                  >
                    +51 932 331 672
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-[11px] text-stone-400">
                <Clock className="h-3.5 w-3.5 text-stone-400 shrink-0" aria-hidden="true" />
                <span>Atención: Lunes a Sábado 07:00 – 18:00</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality Assurance & Institutional Endorsement */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold tracking-wide text-[#F5C768]">
              Aseguramiento y Biocomercio
            </h3>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5 rounded border border-[#38332E] bg-[#262220] p-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#FAF6F0] block text-[11px]">Habilitación DIGESA</strong>
                  <span className="text-[10px] text-stone-400">
                    Estándares bromatológicos de pureza e inocuidad alimentaria.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded border border-[#38332E] bg-[#262220] p-2.5">
                <Award className="h-4 w-4 text-[#D99B26] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <strong className="text-[#FAF6F0] block text-[11px]">Directorio PROMPERÚ</strong>
                  <span className="text-[10px] text-stone-400">
                    Exportador registrado de pastas secas y sémolas de alta densidad.
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Referenciado en estudios de biocomercio andino sostenible (PUCP) por el acopio
                comunal de quinua y kiwicha en Quispicanchi.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility Links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Molinos Cusco S.A. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="#historia"
              className="hover:text-[#D99B26] transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26]"
            >
              Memoria Industrial 1988
            </a>
            <span>•</span>
            <a
              href="#calibres"
              className="hover:text-[#D99B26] transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26]"
            >
              Calibres #40 al #43
            </a>
            <span>•</span>
            <a
              href="#planta-industrial"
              className="hover:text-[#D99B26] transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26]"
            >
              Sede Cusipata Km 76
            </a>
            <span>•</span>
            <span className="font-mono text-stone-500">WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
