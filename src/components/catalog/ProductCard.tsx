"use client";

import React from "react";
import { ProductSKU } from "@/lib/products-data";
import { Clock, Scale, FileText } from "lucide-react";

interface ProductCardProps {
  product: ProductSKU;
  onOpenDrawer: (product: ProductSKU) => void;
  onHoverGlow?: (colorHex: string) => void;
  onLeaveGlow?: () => void;
}

export function ProductCard({
  product,
  onOpenDrawer,
  onHoverGlow,
  onLeaveGlow,
}: ProductCardProps): React.JSX.Element {
  const handleMouseEnter = (): void => {
    if (onHoverGlow) onHoverGlow(product.glowColor);
  };

  const handleMouseLeave = (): void => {
    if (onLeaveGlow) onLeaveGlow();
  };

  return (
    <article
      data-testid={`product-card-${product.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="group relative flex flex-col justify-between rounded-3xl border border-[#E7DFD5] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#8C2318] focus-within:ring-2 focus-within:ring-[#C68B2C]"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-serif text-[11px] font-semibold tracking-wider text-[#6E6259] uppercase">
            {product.skuCode}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 font-serif text-[10px] font-bold text-white shadow-xs"
            style={{ backgroundColor: product.glowColor }}
          >
            {product.primaryIngredient}
          </span>
        </div>

        {/* Real Product Photography Container with Soft Organic Halo */}
        <div className="relative my-4 flex h-48 w-full items-center justify-center rounded-2xl bg-[#FBF8F3] border border-[#E7DFD5] overflow-hidden p-3 shadow-inner">
          {/* Soft Organic Atmospheric Aura */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-35"
            style={{
              background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* Real Authentic Packaging Photography */}
          <img
            src={product.imageUrl}
            alt={`Fotografía real: ${product.name} - Fideos Cusipata`}
            className="relative z-10 max-h-40 max-w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg font-bold text-[#231F1D] group-hover:text-[#8C2318] transition-colors leading-snug">
          {product.name}
        </h3>

        <p className="mt-2 text-xs text-[#6E6259] line-clamp-2 leading-relaxed font-sans">
          {product.description}
        </p>

        {/* Technical Attributes Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-serif text-[11px] text-[#231F1D]">
          <span className="flex items-center gap-1 rounded-full bg-[#F2ECE1] px-2.5 py-0.5 border border-[#E7DFD5]">
            <Scale className="h-3 w-3 text-[#8C2318]" />
            {product.format}
          </span>
          {product.cookingTimeMin > 0 && (
            <span className="flex items-center gap-1 rounded-full bg-[#F2ECE1] px-2.5 py-0.5 border border-[#E7DFD5]">
              <Clock className="h-3 w-3 text-[#C68B2C]" />
              {product.cookingTimeMin} min
            </span>
          )}
          {product.calibreCode && (
            <span className="rounded-full bg-[#F5E6C8] px-2.5 py-0.5 font-bold text-[#8C2318] border border-[#C68B2C]/40">
              {product.calibreCode}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="mt-6 border-t border-[#E7DFD5] pt-4">
        <button
          type="button"
          onClick={() => onOpenDrawer(product)}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[#E7DFD5] bg-[#FBF8F3] py-2.5 text-xs font-serif font-bold text-[#231F1D] shadow-xs transition-colors hover:border-[#8C2318] hover:bg-[#F2ECE1] hover:text-[#8C2318] focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none cursor-pointer"
          aria-label={`Ver Ficha Técnica de ${product.name}`}
        >
          <FileText className="h-4 w-4 text-[#8C2318]" aria-hidden="true" />
          <span>Ver Ficha Técnica</span>
        </button>
      </div>
    </article>
  );
}
