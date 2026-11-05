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
import { Search, RotateCcw, Filter, Sparkles, PackageSearch, Wheat } from "lucide-react";

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
      className="relative min-h-screen bg-[#FBF8F3] py-28 px-4 sm:px-6 lg:px-8 text-[#231F1D] overflow-hidden"
    >
      {/* Dynamic Ambient Glow Reactive Halo (Warm Matte Backdrop) */}
      <div
        aria-hidden="true"
        data-testid="ambient-glow-halo"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-full max-w-6xl rounded-full blur-[160px] opacity-15 will-change-transform"
        style={{
          backgroundColor: activeGlowColor,
          transition: "background-color 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#F2ECE1] px-4 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs">
            <Wheat className="h-3.5 w-3.5 text-[#8C2318]" aria-hidden="true" />
            <span>Maestría Molinera · Venta Mayorista y Distribución</span>
          </div>

          <h2 className="mt-4 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231F1D] leading-tight">
            Vitrina Industrial de <br />
            <span className="text-[#8C2318] italic font-serif font-normal">Pastas y Molinería</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6E6259] font-sans leading-relaxed max-w-2xl mx-auto">
            Consulte las especificaciones bromatológicas, calibres y formatos de estiba para
            nuestras 24 referencias comerciales elaboradas con agua del Ausangate en Cusipata.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="mt-12 rounded-3xl border border-[#E7DFD5] bg-[#F2ECE1] p-6 sm:p-8 shadow-xs space-y-6">
          {/* Top: Search Input and Quick Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6E6259]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  startTransition(() => {
                    setSearchQuery(e.target.value);
                  });
                }}
                placeholder="Buscar por calibre (#40), fideo, espinaca, quinua o harina..."
                className="w-full rounded-2xl border border-[#E7DFD5] bg-[#FBF8F3] py-3.5 pl-11 pr-4 text-sm text-[#231F1D] placeholder-[#6E6259]/60 transition-colors focus:border-[#8C2318] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C68B2C]/30 font-sans"
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
                className="inline-flex items-center gap-1.5 rounded-2xl border border-[#E7DFD5] bg-white px-5 py-3.5 text-xs font-serif font-bold text-[#6E6259] transition-colors hover:bg-[#FBF8F3] hover:text-[#8C2318] focus-visible:ring-2 focus-visible:ring-[#C68B2C] shrink-0 cursor-pointer shadow-xs"
                aria-label="Limpiar todos los filtros"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Limpiar filtros</span>
              </button>
            )}
          </div>

          {/* Middle: Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-t border-[#E7DFD5] pt-5">
            <span className="font-serif text-xs font-semibold text-[#6E6259] mr-2 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-[#8C2318]" /> Línea:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-serif font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#C68B2C] cursor-pointer ${
                    isSelected
                      ? "bg-[#8C2318] text-[#FBF8F3] shadow-xs scale-102"
                      : "border border-[#E7DFD5] bg-white/80 text-[#6E6259] hover:bg-white hover:text-[#8C2318]"
                  }`}
                  aria-pressed={isSelected}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Bottom: Secondary Filters (Ingredients & Formats) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#E7DFD5] pt-5 text-xs">
            {/* Ingredients Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[#6E6259] font-serif font-semibold mr-1">Ingrediente:</span>
              {INGREDIENTS.map((ing) => {
                const isSelected = selectedIngredient === ing;
                return (
                  <button
                    key={ing}
                    type="button"
                    onClick={() => handleIngredientChange(ing)}
                    className={`rounded-full px-3 py-1 font-serif transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#C68B2C] text-[#231F1D] font-bold shadow-xs"
                        : "border border-[#E7DFD5] bg-white/70 text-[#6E6259] hover:bg-white hover:text-[#231F1D]"
                    }`}
                  >
                    {ing}
                  </button>
                );
              })}
            </div>

            {/* Formats Filter */}
            <div className="flex flex-wrap items-center gap-1.5 sm:justify-end">
              <span className="text-[#6E6259] font-serif font-semibold mr-1">Presentación:</span>
              {FORMATS.map((fmt) => {
                const isSelected = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`rounded-full px-3 py-1 font-serif transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#8C2318] text-[#FBF8F3] font-bold shadow-xs"
                        : "border border-[#E7DFD5] bg-white/70 text-[#6E6259] hover:bg-white hover:text-[#231F1D]"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter and Indicator */}
        <div className="mt-6 flex items-center justify-between text-xs font-serif text-[#6E6259] px-2">
          <span>
            Mostrando <strong className="text-[#231F1D]">{filteredProducts.length}</strong> de{" "}
            <strong className="text-[#231F1D]">{PRODUCTS_CATALOG.length}</strong> productos
          </span>
          <span className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full shadow-xs"
              style={{ backgroundColor: activeGlowColor }}
            />
            <span className="font-serif italic text-[#6E6259]">Tono de línea</span>
          </span>
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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
          /* Empty State (ESC-03.09 & ESC-03.11) */
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#E7DFD5] bg-[#F2ECE1] p-12 text-center shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#8C2318] shadow-xs">
              <PackageSearch className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="mt-4 font-serif text-2xl font-bold text-[#231F1D]">
              No se hallaron productos asociados
            </h3>
            <p className="mt-2 max-w-md text-sm text-[#6E6259] font-sans">
              No encontramos coincidencias para los filtros o el término ingresado. Pruebe
              restablecer los filtros para volver al catálogo maestro completo.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8C2318] px-6 py-2.5 text-xs font-serif font-bold text-[#FBF8F3] shadow-xs transition-transform duration-200 hover:scale-105 hover:bg-[#6F1B12] focus-visible:ring-2 focus-visible:ring-[#C68B2C] cursor-pointer"
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
