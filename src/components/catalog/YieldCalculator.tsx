"use client";

import React, { useState } from "react";
import { ProductSKU } from "@/lib/products-data";
import { Utensils, Truck, Calculator, Layers, Info } from "lucide-react";

interface YieldCalculatorProps {
  product: ProductSKU;
}

export function YieldCalculator({ product }: YieldCalculatorProps): React.JSX.Element {
  const [calculatorMode, setCalculatorMode] = useState<"horeca" | "logistics">("horeca");
  const [dryPastaKg, setDryPastaKg] = useState<number>(5);
  const [portionSizeG, setPortionSizeG] = useState<number>(200);
  const [palletType, setPalletType] = useState<"americano" | "europeo">("americano");

  // Calculations for HORECA:
  // Hydration factor for egg and durum pasta is 2.1 (1kg dry yields ~2.1kg cooked)
  const hydrationFactor = 2.1;
  const cookedPastaKg = dryPastaKg * hydrationFactor;
  const totalPortions = Math.floor((cookedPastaKg * 1000) / portionSizeG);
  const sauceNeededKg = (cookedPastaKg * 0.35).toFixed(1);

  // Calculations for Wholesale Logistics & Palletization:
  // Pallet Americano: 1000x1200mm (cap: 1200kg) vs Europeo: 800x1200mm (cap: 1000kg)
  const palletMaxKg = palletType === "americano" ? 1200 : 1000;
  const unitWeightKg = product.weightNetKg;
  const maxUnitsPerPallet = Math.floor(palletMaxKg / (unitWeightKg || 1));
  const palletVolumeM3 = palletType === "americano" ? 1.92 : 1.54;
  const safeStackingTiers = product.format === "Saco 10kg" ? 8 : 12;

  return (
    <div className="rounded-xl border border-[#38332E] bg-[#1C1917] p-5 text-[#FAF6F0] shadow-md">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between border-b border-[#38332E] pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
          <h4 className="font-serif text-sm font-bold text-[#FAF6F0]">
            Calculadora de Rendimiento y Despacho
          </h4>
        </div>
        <div className="flex rounded-lg bg-[#262220] p-1 border border-[#38332E]">
          <button
            type="button"
            onClick={() => setCalculatorMode("horeca")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26] ${
              calculatorMode === "horeca"
                ? "bg-[#D99B26] text-[#1C1917]"
                : "text-stone-400 hover:text-[#FAF6F0]"
            }`}
          >
            <Utensils className="h-3 w-3" />
            <span>HORECA</span>
          </button>
          <button
            type="button"
            onClick={() => setCalculatorMode("logistics")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors focus-visible:ring-1 focus-visible:ring-[#D99B26] ${
              calculatorMode === "logistics"
                ? "bg-[#D99B26] text-[#1C1917]"
                : "text-stone-400 hover:text-[#FAF6F0]"
            }`}
          >
            <Truck className="h-3 w-3" />
            <span>Logística</span>
          </button>
        </div>
      </div>

      {calculatorMode === "horeca" ? (
        /* HORECA / Culinary Yield Mode */
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="dry-pasta-input" className="block font-mono text-[11px] text-stone-400">
                Pasta Seca a Preparar (kg):
              </label>
              <input
                id="dry-pasta-input"
                type="number"
                min={1}
                max={500}
                value={dryPastaKg}
                onChange={(e) => setDryPastaKg(Math.max(1, Number(e.target.value)))}
                className="mt-1 w-full rounded-md border border-[#38332E] bg-[#262220] px-3 py-1.5 font-mono text-sm text-[#FAF6F0] focus:border-[#D99B26] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="portion-size-input" className="block font-mono text-[11px] text-stone-400">
                Gramaje por Porción Cocida:
              </label>
              <select
                id="portion-size-input"
                value={portionSizeG}
                onChange={(e) => setPortionSizeG(Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-[#38332E] bg-[#262220] px-3 py-1.5 font-mono text-sm text-[#FAF6F0] focus:border-[#D99B26] focus:outline-none"
              >
                <option value={180}>180 g (Entrada / Porción Liviana)</option>
                <option value={200}>200 g (Plato Principal Estándar)</option>
                <option value={250}>250 g (Plato Fondo Generoso)</option>
              </select>
            </div>
          </div>

          {/* Results Box */}
          <div className="rounded-lg border border-[#38332E] bg-[#262220] p-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Rendimiento tras Cocción (2.1x):</span>
              <strong className="text-[#F5C768] text-sm">{cookedPastaKg.toFixed(1)} kg cocidos</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Platos Totales Servidos:</span>
              <strong className="text-emerald-400 text-base font-bold">~{totalPortions} porciones</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Salsa Recomendada (~35% peso):</span>
              <strong className="text-stone-300">{sauceNeededKg} kg de salsa</strong>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 italic flex items-center gap-1">
            <Info className="h-3 w-3 shrink-0 text-[#D99B26]" />
            Factor de hidratación andino verificado en laboratorio de planta Cusipata.
          </p>
        </div>
      ) : (
        /* Logistics & Palletization Mode */
        <div className="mt-4 space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-stone-400 mb-1">
              Estándar de Tarima / Pallet:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPalletType("americano")}
                className={`rounded-md p-2 text-left font-mono text-xs border transition-colors ${
                  palletType === "americano"
                    ? "border-[#D99B26] bg-[#262220] text-[#D99B26]"
                    : "border-[#38332E] bg-[#1C1917] text-stone-400"
                }`}
              >
                <strong className="block text-[#FAF6F0]">Pallet Americano</strong>
                <span>1000 × 1200 mm</span>
              </button>
              <button
                type="button"
                onClick={() => setPalletType("europeo")}
                className={`rounded-md p-2 text-left font-mono text-xs border transition-colors ${
                  palletType === "europeo"
                    ? "border-[#D99B26] bg-[#262220] text-[#D99B26]"
                    : "border-[#38332E] bg-[#1C1917] text-stone-400"
                }`}
              >
                <strong className="block text-[#FAF6F0]">Pallet Europeo</strong>
                <span>800 × 1200 mm</span>
              </button>
            </div>
          </div>

          {/* Stacking Data */}
          <div className="rounded-lg border border-[#38332E] bg-[#262220] p-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Unidades Máximas por Tarima:</span>
              <strong className="text-emerald-400 text-sm font-bold">
                {maxUnitsPerPallet} {product.format.includes("Saco") ? "sacos" : "unidades"}
              </strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Capacidad Máxima de Carga:</span>
              <strong className="text-[#FAF6F0]">{palletMaxKg} kg brutos</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Apilamiento Seguro en Altura:</span>
              <strong className="text-[#F5C768]">{safeStackingTiers} camadas / estibas</strong>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-stone-400">Cubicaje de Tarima:</span>
              <strong className="text-stone-300">~{palletVolumeM3} m³</strong>
            </div>
          </div>

          <p className="text-[10px] text-stone-400 italic flex items-center gap-1">
            <Layers className="h-3 w-3 shrink-0 text-[#D99B26]" />
            Aprobado para despacho en semirremolques desde el patio de maniobras Cusipata.
          </p>
        </div>
      )}
    </div>
  );
}
