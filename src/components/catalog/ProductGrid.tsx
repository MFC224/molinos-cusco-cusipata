"use client";

import React, { useState, useMemo, useTransition } from "react";
import {
  PRODUCTS_CATALOG,
  ProductSKU,
  ProductCategory,
  IngredientTag,
  PackagingFormat,
  filterProducts,
  sanitizeSearchRegex,
} from "@/lib/products-data";
import { ProductCard } from "./ProductCard";
import { TechnicalDrawer } from "./TechnicalDrawer";
import { Search, RotateCcw, Filter, Sparkles, PackageSearch } from "lucide-react";

const CATEGORIES: readonly (ProductCategory | "Todas")[] = [
  "Todas",
  "Línea Clásica",
  "Línea Andina",
  "Pasta Corta",
  "Molinería y Derivados",
];

const INGREDIENTS: readonly (IngredientTag | "Todos")[] = [
  "Todos",
  "Huevo",
  "Quinua",
  "Kiwicha",
  "Espinaca",
  "Trigo Durum",
  "Agua Mineral",
];

const FORMATS: readonly (PackagingFormat | "Todos")[] = [
  "Todos",
  "Bolsa 250g",
  "Bolsa 500g",
  "Fardo 5kg",
  "Saco 10kg",
];

export function ProductGrid(): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "Todas">("Todas");
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientTag | "Todos">("Todos");
  const [selectedFormat, setSelectedFormat] = useState<PackagingFormat | "Todos">("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [, startTransition] = useTransition();

  // Dynamic Ambient Glow active color token (defaults to brand gold #D99B26)
  const [activeGlowColor, setActiveGlowColor] = useState<string>("#D99B26");

  // Selected product for Technical Drawer modal
  const [drawerProduct, setDrawerProduct] = useState<ProductSKU | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Instant in-memory filtering (<50ms execution time)
  const filteredProducts = useMemo(() => {
    const sanitized = sanitizeSearchRegex(searchQuery);
    return filterProducts(PRODUCTS_CATALOG, {
      category: selectedCategory,
      ingredient: selectedIngredient,
      format: selectedFormat,
      searchQuery: sanitized,
    });
  }, [selectedCategory, selectedIngredient, selectedFormat, searchQuery]);

  const handleResetFilters = (): void => {
    setSelectedCategory("Todas");
    setSelectedIngredient("Todos");
    setSelectedFormat("Todos");
    setSearchQuery("");
    setActiveGlowColor("#D99B26");
  };

  const handleCategoryChange = (cat: ProductCategory | "Todas"): void => {
    setSelectedCategory(cat);
    // Update ambient glow according to selected category token
    if (cat === "Línea Andina") setActiveGlowColor("#B55327");
    else if (cat === "Línea Clásica") setActiveGlowColor("#9E1B1B");
    else if (cat === "Pasta Corta") setActiveGlowColor("#1C1917");
    else setActiveGlowColor("#D99B26");
  };

  const handleIngredientChange = (ing: IngredientTag | "Todos"): void => {
    setSelectedIngredient(ing);
    if (ing === "Espinaca") setActiveGlowColor("#2D6A4F");
    else if (ing === "Quinua" || ing === "Kiwicha") setActiveGlowColor("#B55327");
    else if (ing === "Huevo") setActiveGlowColor("#9E1B1B");
    else setActiveGlowColor("#D99B26");
  };

  const handleOpenDrawer = (prod: ProductSKU): void => {
    setDrawerProduct(prod);
    setIsDrawerOpen(true);
  };

  return (
    <section
      id="catalogo"
      aria-label="Catálogo Interactivo y Vitrina Mayorista"
      className="relative min-h-screen bg-[#FAF6F0] py-28 px-4 sm:px-6 lg:px-8 text-[#1C1917] transition-colors duration-700 overflow-hidden"
    >
      {/* Dynamic Ambient Glow Reactive Halo (HU-06) */}
      <div
        aria-hidden="true"
        data-testid="ambient-glow-halo"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-full max-w-6xl rounded-full blur-[140px] opacity-15 will-change-transform"
        style={{
          backgroundColor: activeGlowColor,
          transition: "background-color 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D99B26]/40 bg-[#F4EFE6] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#9E1B1B]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Acto IV · Catálogo Dinámico Multicriterio</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1917]">
            Vitrina Industrial de <br />
            <span className="text-[#9E1B1B] italic">Pastas y Molinería</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
            Consulte las especificaciones bromatológicas, calibres y factores de estiba para
            nuestras 24 referencias comerciales producidas en Cusipata.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="mt-12 rounded-2xl border border-stone-200/90 bg-white p-5 shadow-lg space-y-5">
          {/* Top: Search Input and Quick Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  startTransition(() => {
                    setSearchQuery(e.target.value);
                  });
                }}
                placeholder="Buscar por calibre (#40), fideo, espinaca, quinua o harina..."
                className="w-full rounded-xl border border-stone-300 bg-stone-50 py-3 pl-10 pr-4 text-sm text-[#1C1917] placeholder-stone-400 transition-colors focus:border-[#D99B26] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D99B26]/30"
                aria-label="Buscar productos en el catálogo"
              />
            </div>

            {(selectedCategory !== "Todas" ||
              selectedIngredient !== "Todos" ||
              selectedFormat !== "Todos" ||
              searchQuery.length > 0) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-stone-100 px-4 py-3 text-xs font-bold text-stone-700 transition-colors hover:bg-stone-200 focus-visible:ring-2 focus-visible:ring-[#D99B26] shrink-0"
                aria-label="Limpiar todos los filtros"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          {/* Middle: Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 pt-4">
            <span className="font-mono text-xs font-semibold text-stone-500 mr-2 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" /> Categoría:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#D99B26] ${
                    isSelected
                      ? "bg-[#1C1917] text-[#FAF6F0] shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Bottom: Secondary Filters (Ingredients & Formats) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-100 pt-4 text-xs font-mono">
            {/* Ingredients Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-500 font-semibold mr-1">Ingrediente:</span>
              {INGREDIENTS.map((ing) => {
                const isSelected = selectedIngredient === ing;
                return (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => handleIngredientChange(ing)}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      isSelected
                        ? "bg-[#D99B26] text-[#1C1917] font-bold shadow-xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {ing}
                  </button>
                );
              })}
            </div>

            {/* Formats Filter */}
            <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
              <span className="text-stone-500 font-semibold mr-1">Empaque:</span>
              {FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      isSelected
                        ? "bg-[#9E1B1B] text-[#FAF6F0] font-bold shadow-xs"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter and Active Ambient Indicator */}
        <div className="mt-6 flex items-center justify-between text-xs font-mono text-stone-500 px-2">
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de{" "}
            <strong>{PRODUCTS_CATALOG.length}</strong> productos
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: activeGlowColor }}
            />
            <span className="hidden sm:inline">Atmósfera Activa:</span>
            <strong className="text-stone-800">{activeGlowColor}</strong>
          </span>
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDrawer={handleOpenDrawer}
                onHoverGlow={(color) => setActiveGlowColor(color)}
                onLeaveGlow={() => setActiveGlowColor("#D99B26")}
              />
            ))}
          </div>
        ) : (
          /* Empty State (HU-05 Escenario 2 / ESC-03.09) */
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-white p-12 text-center shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
              <PackageSearch className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-[#1C1917]">
              No se hallaron productos asociados
            </h3>
            <p className="mt-2 max-w-md text-xs sm:text-sm text-stone-500 font-sans">
              No encontramos coincidencias para los filtros o el término ingresado. Pruebe
              restablecer los filtros para volver al catálogo maestro completo.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#9E1B1B] px-5 py-2.5 text-xs font-bold text-[#FAF6F0] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#7D1414] focus-visible:ring-2 focus-visible:ring-[#D99B26]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restablecer Filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Technical Specification Lateral Drawer (HU-07) */}
      <TechnicalDrawer
        product={drawerProduct}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </section>
  );
}
