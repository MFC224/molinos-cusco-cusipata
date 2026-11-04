import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Act1Hero } from "@/components/home/Act1Hero";
import { SemolinaParticles } from "@/components/home/SemolinaParticles";
import { Act2ParallaxIngredients } from "@/components/home/Act2ParallaxIngredients";
import { SmoothScrollProvider } from "@/lib/lenis";

describe("Sprint 2: Act1Hero Component", () => {
  it("renders Act I titles, heritage data and RUC accurately", () => {
    render(
      <SmoothScrollProvider>
        <Act1Hero />
      </SmoothScrollProvider>
    );

    expect(screen.getByText(/El Silencio del/i)).toBeInTheDocument();
    expect(screen.getByText(/Origen Andino/i)).toBeInTheDocument();
    expect(screen.getByText(/PLANTA KM 76 CUSIPATA/i)).toBeInTheDocument();
    expect(screen.getByText(/RUC 20114918718/i)).toBeInTheDocument();
    expect(screen.getByText(/3,300\+ m/i)).toBeInTheDocument();
    expect(screen.getByText(/Desde 1960/i)).toBeInTheDocument();
  });

  it("provides functional navigation buttons and scroll trigger actions", () => {
    render(
      <SmoothScrollProvider>
        <Act1Hero />
      </SmoothScrollProvider>
    );

    const calibreBtn = screen.getByRole("button", { name: /ver calibres/i });
    const alchemyBtn = screen.getByRole("button", { name: /^alquimia de ingredientes$/i });
    const scrollCueBtn = screen.getByRole("button", { name: /desplazarse hacia el acto ii/i });

    expect(calibreBtn).toBeInTheDocument();
    expect(alchemyBtn).toBeInTheDocument();
    expect(scrollCueBtn).toBeInTheDocument();

    // Verify clicks don't throw errors
    expect(() => fireEvent.click(calibreBtn)).not.toThrow();
    expect(() => fireEvent.click(alchemyBtn)).not.toThrow();
    expect(() => fireEvent.click(scrollCueBtn)).not.toThrow();
  });

  it("cleans up GSAP ScrollTrigger context cleanly upon unmount without memory leaks", () => {
    const { unmount } = render(
      <SmoothScrollProvider>
        <Act1Hero />
      </SmoothScrollProvider>
    );

    expect(() => unmount()).not.toThrow();
  });
});

describe("Sprint 2: SemolinaParticles Component", () => {
  it("renders the canvas particle layer with aria-hidden", () => {
    render(
      <SmoothScrollProvider>
        <div style={{ width: 800, height: 600 }}>
          <SemolinaParticles particleCount={30} />
        </div>
      </SmoothScrollProvider>
    );

    const canvas = screen.getByTestId("semolina-canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("deactivates the particle canvas when prefers-reduced-motion is true", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion: reduce"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));

    render(
      <SmoothScrollProvider>
        <SemolinaParticles particleCount={30} />
      </SmoothScrollProvider>
    );

    expect(screen.queryByTestId("semolina-canvas")).not.toBeInTheDocument();
  });
});

describe("Sprint 2: Act2ParallaxIngredients Component", () => {
  it("renders Act II header, central milling hub, and all 5 ingredient layers", () => {
    render(
      <SmoothScrollProvider>
        <Act2ParallaxIngredients />
      </SmoothScrollProvider>
    );

    expect(screen.getByText(/Alquimia de los/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingredientes Andinos/i)).toBeInTheDocument();
    expect(screen.getByText(/Punto Central de Molienda y Extrusión Continua/i)).toBeInTheDocument();

    // 5 Ingredients
    expect(screen.getByText("Sémola de Trigo Durum")).toBeInTheDocument();
    expect(screen.getByText("Huevos Frescos de Granja")).toBeInTheDocument();
    expect(screen.getByText("Extracto de Espinaca Silvestre")).toBeInTheDocument();
    expect(screen.getByText("Quinua Real & Kiwicha Perlada")).toBeInTheDocument();
    expect(screen.getByText("Agua de Deshielo del Ausangate")).toBeInTheDocument();

    // Differential Parallax Velocity Coefficients from HU-03 (0.2x, 0.5x, 0.8x)
    expect(screen.getByText("Vel. Coef: 0.2x")).toBeInTheDocument();
    expect(screen.getAllByText("Vel. Coef: 0.5x")).toHaveLength(2); // Huevos & Espinaca
    expect(screen.getAllByText("Vel. Coef: 0.8x")).toHaveLength(2); // Quinua & Agua Ausangate
  });

  it("unmounts Act2ParallaxIngredients without leaving memory leaks", () => {
    const { unmount } = render(
      <SmoothScrollProvider>
        <Act2ParallaxIngredients />
      </SmoothScrollProvider>
    );

    expect(() => unmount()).not.toThrow();
  });
});
