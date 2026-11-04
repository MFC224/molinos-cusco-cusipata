import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  PRODUCTS_CATALOG,
  filterProducts,
  normalizeSearchString,
  sanitizeSearchRegex,
} from "@/lib/products-data";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { TechnicalDrawer } from "@/components/catalog/TechnicalDrawer";
import { YieldCalculator } from "@/components/catalog/YieldCalculator";

describe("Sprint 4: Matriz de 15 Escenarios de Prueba (CP-03)", () => {
  // ESC-03.01: Categoría: "Todas", Búsqueda: "" -> Se listan los 24 SKUs. Color base: #D99B26
  it("ESC-03.01: lists all 24 SKUs when no filters are applied", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Todas",
      ingredient: "Todos",
      format: "Todos",
      searchQuery: "",
    });
    expect(results).toHaveLength(24);
  });

  // ESC-03.02: Categoría: "Línea Andina", Ingr: "Quinua" -> 3 productos mostrados. Color ambiental: #B55327
  it("ESC-03.02: filters Línea Andina with Quinua returning exactly 3 products with #B55327 glow", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Línea Andina",
      ingredient: "Quinua",
    });
    expect(results).toHaveLength(3);
    results.forEach((p) => {
      expect(p.ingredients).toContain("Quinua");
      expect(p.glowColor).toBe("#B55327");
    });
  });

  // ESC-03.03: Categoría: "Línea Andina", Ingr: "Espinaca" -> 2 productos mostrados. Color ambiental: #2D6A4F
  it("ESC-03.03: filters Línea Andina with Espinaca returning exactly 2 products with #2D6A4F glow", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Línea Andina",
      ingredient: "Espinaca",
    });
    expect(results).toHaveLength(2);
    results.forEach((p) => {
      expect(p.ingredients).toContain("Espinaca");
      expect(p.glowColor).toBe("#2D6A4F");
    });
  });

  // ESC-03.04: Categoría: "Línea Clásica", Ingr: "Huevo" -> 8 productos mostrados (Tallarines #40-#43). Color: #9E1B1B
  it("ESC-03.04: filters Línea Clásica al Huevo returning exactly 8 products (#40-#43)", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Línea Clásica",
      ingredient: "Huevo",
    });
    expect(results).toHaveLength(8);
    results.forEach((p) => {
      expect(p.glowColor).toBe("#9E1B1B");
    });
  });

  // ESC-03.05: Formato: "Saco 10kg", Categoría: "Pasta Corta" -> 4 productos industriales. Color: #1C1917
  it("ESC-03.05: filters Pasta Corta in Saco 10kg format returning 4 industrial products", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Pasta Corta",
      format: "Saco 10kg",
    });
    expect(results).toHaveLength(4);
    results.forEach((p) => {
      expect(p.format).toBe("Saco 10kg");
    });
  });

  // ESC-03.06 & ESC-03.07: Case and diacritic insensitivity (tallarin vs TALLARÍN)
  it("ESC-03.06 & ESC-03.07: normalizes accents, diacritics and casing deterministically via NFD", () => {
    const withoutAccent = filterProducts(PRODUCTS_CATALOG, { searchQuery: "tallarin" });
    const withAccentUpper = filterProducts(PRODUCTS_CATALOG, { searchQuery: "TALLARÍN" });

    expect(withoutAccent.length).toBeGreaterThan(0);
    expect(withoutAccent.length).toBe(withAccentUpper.length);
    expect(withoutAccent.map((p) => p.id)).toEqual(withAccentUpper.map((p) => p.id));
  });

  // ESC-03.08: Texto: "kiwicha", Categoría: "Molinería y Derivados" -> 1 producto mostrado
  it("ESC-03.08: finds Galleta Nutritiva de Kiwicha Cusipata", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Molinería y Derivados",
      searchQuery: "kiwicha",
    });
    expect(results).toHaveLength(1);
    expect(results[0]?.name).toBe("Galleta Nutritiva de Kiwicha Cusipata");
  });

  // ESC-03.09: Búsqueda sin coincidencias: "arroz extra" -> Estado nulo / 0 productos
  it("ESC-03.09: handles search with no results cleanly", () => {
    const results = filterProducts(PRODUCTS_CATALOG, { searchQuery: "arroz extra" });
    expect(results).toHaveLength(0);
  });

  // ESC-03.10: Filtro contradictorio (Espinaca + Molinería y Derivados) -> 0 productos sin quiebre de JS
  it("ESC-03.10: handles contradictory filters gracefully without throwing", () => {
    const results = filterProducts(PRODUCTS_CATALOG, {
      category: "Molinería y Derivados",
      ingredient: "Espinaca",
    });
    expect(results).toHaveLength(0);
  });

  // ESC-03.12: Rendimiento de filtrado rápido (< 50ms)
  it("ESC-03.12: executes filter operation in less than 50ms", () => {
    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      filterProducts(PRODUCTS_CATALOG, {
        category: "Línea Andina",
        searchQuery: "quinua",
      });
    }
    const duration = performance.now() - start;
    // 100 iterations under 50ms => each iteration < 0.5ms
    expect(duration).toBeLessThan(50);
  });

  // ESC-03.13: Inserción de regex en buscador: ".*" sanitizado
  it("ESC-03.13: sanitizes regex characters treating them literally", () => {
    const maliciousQuery = ".*";
    const sanitized = sanitizeSearchRegex(maliciousQuery);
    expect(sanitized).toBe("\\.\\*");

    const results = filterProducts(PRODUCTS_CATALOG, { searchQuery: sanitized });
    expect(results).toHaveLength(0);
  });
});

describe("Sprint 4: ProductGrid Component UI and Dynamic Ambient Glow", () => {
  it("renders the 24 products and responds to category tab switching", () => {
    render(<ProductGrid />);

    expect(screen.getByText(/Vitrina Industrial de/i)).toBeInTheDocument();
    expect(screen.getByText(/Pastas y Molinería/i)).toBeInTheDocument();
    expect(screen.getByText(/Mostrando/i)).toBeInTheDocument();

    // Click on "Línea Andina" category tab
    const andinaTab = screen.getByRole("button", { name: "Línea Andina" });
    fireEvent.click(andinaTab);

    // Verify halo color changes to #B55327
    const halo = screen.getByTestId("ambient-glow-halo");
    expect(halo.style.backgroundColor).toBe("rgb(181, 83, 39)"); // hex #B55327 in rgb
  });

  it("shows empty state and restores catalog with reset button (ESC-03.09 & ESC-03.11)", () => {
    render(<ProductGrid />);

    const searchInput = screen.getByLabelText(/buscar productos en el catálogo/i);
    fireEvent.change(searchInput, { target: { value: "arroz extra" } });

    expect(screen.getByText(/No se hallaron productos asociados/i)).toBeInTheDocument();

    const resetBtn = screen.getByRole("button", { name: /restablecer filtros/i });
    fireEvent.click(resetBtn);

    // Restores catalog
    expect(screen.queryByText(/No se hallaron productos asociados/i)).not.toBeInTheDocument();
  });
});

describe("Sprint 4: TechnicalDrawer & Focus Trap (HU-07)", () => {
  it("opens drawer with accessible aria-modal and handles Escape key", () => {
    const sampleProduct = PRODUCTS_CATALOG[0]!;
    const onCloseMock = vi.fn();

    render(
      <TechnicalDrawer
        product={sampleProduct}
        isOpen={true}
        onClose={onCloseMock}
      />
    );

    const dialog = screen.getByRole("dialog", { name: /ficha técnica oficial/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});

describe("Sprint 4: YieldCalculator Component (Section 6.1)", () => {
  it("calculates HORECA portions accurately based on 2.1x hydration factor", () => {
    const sampleProduct = PRODUCTS_CATALOG[0]!;
    render(<YieldCalculator product={sampleProduct} />);

    // 5kg dry pasta * 2.1 = 10.5 kg cooked
    expect(screen.getByText("10.5 kg cocidos")).toBeInTheDocument();
    // 10.5 kg / 0.200 kg = ~52 portions
    expect(screen.getByText(/~52 porciones/i)).toBeInTheDocument();
  });

  it("toggles between HORECA and logistics palletization mode", () => {
    const sampleProduct = PRODUCTS_CATALOG[1]!; // Saco 10kg
    render(<YieldCalculator product={sampleProduct} />);

    const logisticsTab = screen.getByRole("button", { name: /logística/i });
    fireEvent.click(logisticsTab);

    expect(screen.getByText(/Estándar de Tarima \/ Pallet/i)).toBeInTheDocument();
    expect(screen.getByText(/Pallet Americano/i)).toBeInTheDocument();
    expect(screen.getByText(/120 sacos/i)).toBeInTheDocument(); // 1200kg / 10kg = 120 sacos
  });
});
