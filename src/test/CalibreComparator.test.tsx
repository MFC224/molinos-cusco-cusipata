import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CALIBRES, getCalibreByCode, clampCalibreIndex } from "@/lib/calibre-data";
import { Act3CalibreComparator } from "@/components/home/Act3CalibreComparator";
import { Act5LegacyTimeline } from "@/components/home/Act5LegacyTimeline";
import { SmoothScrollProvider } from "@/lib/lenis";

describe("Sprint 3: Calibre Data Specifications Matrix (CP-04)", () => {
  it("validates technical specifications for all 4 official calibres (#40 - #43)", () => {
    // ESC-04.01: #40 Tallarín Grueso
    const c40 = getCalibreByCode("40");
    expect(c40.thicknessMm).toBe(1.70);
    expect(c40.cookingTimeMin).toBe(11);
    expect(c40.waterAbsorptionPercent).toBe(110);

    // ESC-04.02: #41 Tallarín Mediano
    const c41 = getCalibreByCode("41");
    expect(c41.thicknessMm).toBe(1.45);
    expect(c41.cookingTimeMin).toBe(9);
    expect(c41.waterAbsorptionPercent).toBe(105);

    // ESC-04.03: #42 Tallarín Delgado
    const c42 = getCalibreByCode("42");
    expect(c42.thicknessMm).toBe(1.20);
    expect(c42.cookingTimeMin).toBe(7);
    expect(c42.waterAbsorptionPercent).toBe(100);

    // ESC-04.04: #43 Cabello de Ángel
    const c43 = getCalibreByCode("43");
    expect(c43.thicknessMm).toBe(0.85);
    expect(c43.cookingTimeMin).toBe(3.5);
    expect(c43.waterAbsorptionPercent).toBe(95);
  });

  it("handles boundary checks clamping indices between #40 and #43 (ESC-04.05 & ESC-04.06)", () => {
    expect(clampCalibreIndex(-1)).toBe(0); // Lower bound
    expect(clampCalibreIndex(0)).toBe(0);
    expect(clampCalibreIndex(3)).toBe(3);
    expect(clampCalibreIndex(4)).toBe(3);  // Upper bound
    expect(clampCalibreIndex(99)).toBe(3);
  });

  it("safely falls back to calibre #40 on invalid code input (ESC-04.12)", () => {
    const fallback = getCalibreByCode("99");
    expect(fallback.code).toBe("#40");

    const fallbackNull = getCalibreByCode(null);
    expect(fallbackNull.code).toBe("#40");
  });
});

describe("Sprint 3: Act3CalibreComparator Component", () => {
  it("renders calibre selector tabs and switches calibre data accurately", () => {
    render(
      <SmoothScrollProvider>
        <Act3CalibreComparator />
      </SmoothScrollProvider>
    );

    expect(screen.getByText(/El Arte del Laminado y/i)).toBeInTheDocument();
    expect(screen.getByText(/Calibres a Escala Real/i)).toBeInTheDocument();

    // Default is #40
    expect(screen.getByText("1.70 mm")).toBeInTheDocument();
    expect(screen.getByText("11 min")).toBeInTheDocument();

    // Click on #41 tab
    const tab41 = screen.getByRole("tab", { name: /#41/i });
    fireEvent.click(tab41);

    // Now #41 data must be present (ESC-04.02)
    expect(screen.getByText("1.45 mm")).toBeInTheDocument();
    expect(screen.getByText("9 min")).toBeInTheDocument();
    expect(screen.getByText("105%")).toBeInTheDocument();
  });

  it("toggles 200% texture zoom mode (ESC-04.14)", () => {
    render(
      <SmoothScrollProvider>
        <Act3CalibreComparator />
      </SmoothScrollProvider>
    );

    const zoomBtn = screen.getByRole("button", { name: /activar modo textura macro 200%/i });
    expect(zoomBtn).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(zoomBtn);
    expect(screen.getByRole("button", { name: /desactivar modo textura macro 200%/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("announces updates to aria-live polite region (ESC-04.08)", () => {
    render(
      <SmoothScrollProvider>
        <Act3CalibreComparator />
      </SmoothScrollProvider>
    );

    const liveRegion = screen.getByTestId("live-region-announcement");
    expect(liveRegion).toBeInTheDocument();
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveTextContent(/Calibre seleccionado #40/i);

    // Switch to #43
    const tab43 = screen.getByRole("tab", { name: /#43/i });
    fireEvent.click(tab43);

    expect(liveRegion).toHaveTextContent(/Calibre seleccionado #43/i);
    expect(liveRegion).toHaveTextContent(/0.85 milímetros/i);
  });

  it("navigates calibres using keyboard arrow keys (ESC-04.15)", () => {
    const { container } = render(
      <SmoothScrollProvider>
        <Act3CalibreComparator />
      </SmoothScrollProvider>
    );

    const section = container.querySelector("#calibres");
    expect(section).toBeInTheDocument();

    // Fire ArrowRight
    fireEvent.keyDown(section!, { key: "ArrowRight" });
    // Should switch to #41 (1.45 mm)
    expect(screen.getByText("1.45 mm")).toBeInTheDocument();

    // Fire ArrowLeft
    fireEvent.keyDown(section!, { key: "ArrowLeft" });
    // Should return to #40 (1.70 mm)
    expect(screen.getByText("1.70 mm")).toBeInTheDocument();
  });
});

describe("Sprint 3: Act5LegacyTimeline Component", () => {
  it("renders 1960s, 1988, HOY milestones with SVG typographic mask and RUC", () => {
    render(<Act5LegacyTimeline />);

    expect(screen.getByText(/El Legado de Cusipata/i)).toBeInTheDocument();
    expect(screen.getByText(/Tres Épocas de Solidez/i)).toBeInTheDocument();

    // Check tabs
    expect(screen.getByRole("button", { name: /1960s/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1988/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /HOY/i })).toBeInTheDocument();

    // Default active milestone is 1988
    expect(screen.getByText(/Constitución Formal y Planta Km 76 Cusipata/i)).toBeInTheDocument();
    expect(screen.getByText("20114918718")).toBeInTheDocument();

    // Switch to 1960s
    fireEvent.click(screen.getByRole("button", { name: /1960s/i }));
    expect(screen.getByText(/La Génesis Molinera en los Valles Interandinos/i)).toBeInTheDocument();

    // Switch to HOY
    fireEvent.click(screen.getByRole("button", { name: /HOY/i }));
    expect(screen.getByText(/Vanguardia Industrial, Biocomercio y Red B2B/i)).toBeInTheDocument();
  });
});
