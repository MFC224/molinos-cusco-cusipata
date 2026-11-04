"use client";

import React, { useEffect, useRef } from "react";
import { ProductSKU } from "@/lib/products-data";
import { YieldCalculator } from "./YieldCalculator";
import { X, ShieldCheck, Clock, Calendar, Scale, ShoppingBag, Factory } from "lucide-react";

interface TechnicalDrawerProps {
  product: ProductSKU | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToQuote?: (product: ProductSKU) => void;
}

export function TechnicalDrawer({
  product,
  isOpen,
  onClose,
  onAddToQuote,
}: TechnicalDrawerProps): React.JSX.Element | null {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store trigger button that opened the drawer to restore focus on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      // Focus the close button when opened
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  // Handle ESC key to dismiss (HU-07 Escenario 2)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Simple focus trap: Tab and Shift+Tab wrap within drawer
      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha Técnica Oficial: ${product.name}`}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Accessible Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Surface */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-xl flex-col bg-[#FAF6F0] text-[#1C1917] shadow-2xl overflow-y-auto"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-200 bg-[#FAF6F0]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: product.glowColor }}
              aria-hidden="true"
            />
            <span className="font-mono text-xs uppercase tracking-wider text-stone-500">
              {product.skuCode}
            </span>
            <span className="text-stone-300">•</span>
            <span className="font-mono text-xs font-semibold text-[#9E1B1B]">
              {product.category}
            </span>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-stone-200 hover:text-black focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
            aria-label="Cerrar ficha técnica"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Title & Badge */}
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {product.name}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-stone-200 bg-white p-3 font-mono text-xs text-center shadow-sm">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Cocción</span>
              <strong className="text-sm text-[#1C1917] flex items-center justify-center gap-1 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-[#D99B26]" />
                {product.cookingTimeMin > 0 ? `${product.cookingTimeMin} min` : "Directo"}
              </strong>
            </div>
            <div className="border-x border-stone-200">
              <span className="text-[10px] text-stone-400 block uppercase">Presentación</span>
              <strong className="text-sm text-[#1C1917] flex items-center justify-center gap-1 mt-0.5">
                <Scale className="h-3.5 w-3.5 text-[#9E1B1B]" />
                {product.format}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block uppercase">Vida Útil</span>
              <strong className="text-sm text-[#1C1917] flex items-center justify-center gap-1 mt-0.5">
                <Calendar className="h-3.5 w-3.5 text-stone-500" />
                {product.shelfLifeMonths} meses
              </strong>
            </div>
          </div>

          {/* Bromatological Proximate Analysis Table (HU-07) */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h4 className="font-serif text-sm font-bold text-[#1C1917] flex items-center gap-2 border-b border-stone-100 pb-2.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Análisis Proximal Bromatológico (Base 100g)</span>
            </h4>

            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Energía</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.energyKcal} kcal</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Proteínas</span>
                <strong className="text-[#9E1B1B] text-sm">{product.nutrition.proteinsG} g</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Carbohidratos</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.carbohydratesG} g</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Grasas Totales</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.fatG} g</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Fibra Dietaria</span>
                <strong className="text-emerald-700 text-sm">{product.nutrition.fiberG} g</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Sodio</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.sodiumMg} mg</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Humedad Máx.</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.moisturePercent}%</strong>
              </div>
              <div className="rounded-lg bg-stone-50 p-2 text-center border border-stone-100">
                <span className="text-[10px] text-stone-400 block">Cenizas Máx.</span>
                <strong className="text-[#1C1917] text-sm">{product.nutrition.ashPercent}%</strong>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100 font-mono">
              <span>Registro DIGESA: {product.sanitaryRegistry}</span>
              <span className="flex items-center gap-1">
                <Factory className="h-3 w-3 text-stone-400" />
                Planta Km 76 Cusipata
              </span>
            </div>
          </div>

          {/* Integrated Yield & Logistics Calculator */}
          <YieldCalculator product={product} />
        </div>

        {/* Drawer Action Footer */}
        <div className="sticky bottom-0 z-20 border-t border-stone-200 bg-[#FAF6F0] p-4">
          <button
            type="button"
            onClick={() => {
              if (onAddToQuote) onAddToQuote(product);
              onClose();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9E1B1B] py-3 text-sm font-bold text-[#FAF6F0] shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#7D1414] focus-visible:ring-2 focus-visible:ring-[#D99B26]"
          >
            <ShoppingBag className="h-4 w-4 text-[#F5C768]" aria-hidden="true" />
            <span>Agregar a Lista de Cotización B2B</span>
          </button>
        </div>
      </div>
    </div>
  );
}
