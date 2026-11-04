"use client";

import React from "react";
import { ProductSKU } from "@/lib/products-data";
import { Clock, Scale, FileText, Wheat, Sparkles } from "lucide-react";

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
      className="group relative flex flex-col justify-between rounded-2xl border border-stone-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#D99B26] focus-within:ring-2 focus-within:ring-[#D99B26]"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[11px] font-semibold tracking-wider text-stone-500 uppercase">
            {product.skuCode}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-xs"
            style={{ backgroundColor: product.glowColor }}
          >
            {product.primaryIngredient}
          </span>
        </div>

        {/* Product Visual Mockup Container with Glow Aura */}
        <div className="relative my-5 flex h-40 w-full items-center justify-center rounded-xl bg-stone-50 border border-stone-100 overflow-hidden">
          {/* Subtle Dynamic Ambient Glow Aura */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-60"
            style={{
              background: `radial-gradient(circle at center, ${product.glowColor} 0%, transparent 70%)`,
            }}
          />

          {/* SVG Product Graphic / Package Representation */}
          <svg
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 h-24 w-24 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            aria-hidden="true"
          >
            <rect
              x="20"
              y="15"
              width="80"
              height="90"
              rx="10"
              fill="#1C1917"
              stroke={product.glowColor}
              strokeWidth="2.5"
            />
            {/* Header banner */}
            <path d="M20 25 H100 V40 H20 Z" fill={product.glowColor} />
            <text
              x="60"
              y="35"
              textAnchor="middle"
              fill="#FAF6F0"
              fontSize="8"
              fontFamily="sans-serif"
              fontWeight="bold"
            >
              CUSIPATA
            </text>
            {/* Pasta graphic center */}
            <path
              d="M35 55 Q 60 70 85 55 M 35 68 Q 60 83 85 68 M 35 81 Q 60 96 85 81"
              stroke="#FAF6F0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Small weight badge */}
            <rect x="68" y="85" width="26" height="14" rx="4" fill="#FAF6F0" />
            <text
              x="81"
              y="95"
              textAnchor="middle"
              fill="#1C1917"
              fontSize="7"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {product.format.includes("10kg") ? "10KG" : product.format.includes("5kg") ? "5KG" : "500G"}
            </text>
          </svg>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg font-bold text-[#1C1917] group-hover:text-[#9E1B1B] transition-colors leading-snug">
          {product.name}
        </h3>

        <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Technical Attributes Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-stone-600">
          <span className="flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 border border-stone-200">
            <Scale className="h-3 w-3 text-[#9E1B1B]" />
            {product.format}
          </span>
          {product.cookingTimeMin > 0 && (
            <span className="flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 border border-stone-200">
              <Clock className="h-3 w-3 text-[#D99B26]" />
              {product.cookingTimeMin} min
            </span>
          )}
          {product.calibreCode && (
            <span className="rounded bg-[#FAF6F0] px-2 py-0.5 font-bold text-[#D99B26] border border-[#D99B26]/40">
              {product.calibreCode}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Button */}
      <div className="mt-6 border-t border-stone-100 pt-4">
        <button
          type="button"
          onClick={() => onOpenDrawer(product)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white py-2.5 text-xs font-bold text-[#1C1917] shadow-xs transition-colors hover:border-[#D99B26] hover:bg-[#FAF6F0] hover:text-[#9E1B1B] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
          aria-label={`Ver Ficha Técnica de ${product.name}`}
        >
          <FileText className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
          <span>Ver Ficha Técnica</span>
        </button>
      </div>
    </article>
  );
}
