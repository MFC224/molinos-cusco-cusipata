import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider, useSmoothScroll } from "@/lib/lenis";

// Relative luminance calculation for WCAG contrast
function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

describe("Sprint 1: Design System & Color Tokens Contrast (WCAG AA)", () => {
  it("satisfies WCAG AA contrast ratio (>= 4.5:1) for primary reading surface", () => {
    const creamBg = "#FAF6F0";
    const darkText = "#1C1917";
    const contrast = getContrastRatio(creamBg, darkText);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  it("satisfies WCAG AA contrast ratio (>= 4.5:1) for primary corporate button", () => {
    const brandRed = "#9E1B1B";
    const creamText = "#FAF6F0";
    const contrast = getContrastRatio(brandRed, creamText);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  it("satisfies WCAG AA contrast ratio (>= 4.5:1) for dark navbar and footer text", () => {
    const surfaceDark = "#1C1917";
    const creamText = "#FAF6F0";
    const contrast = getContrastRatio(surfaceDark, creamText);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });

  it("satisfies WCAG AA contrast ratio for brand gold highlight on dark surface", () => {
    const surfaceDark = "#1C1917";
    const brandGold = "#D99B26";
    const contrast = getContrastRatio(surfaceDark, brandGold);
    expect(contrast).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Sprint 1: Navbar Component", () => {
  it("renders Molinos Cusco branding and navigation links", () => {
    render(
      <SmoothScrollProvider>
        <Navbar />
      </SmoothScrollProvider>
    );

    expect(screen.getByText("MOLINOS CUSCO")).toBeInTheDocument();
    expect(screen.getByText("Fideos Cusipata · Desde 1988")).toBeInTheDocument();
    expect(screen.getByText("Herencia Industrial")).toBeInTheDocument();
    expect(screen.getByText("Alquimia de Granos")).toBeInTheDocument();
    expect(screen.getByText("Calibres de Fideos")).toBeInTheDocument();
    expect(screen.getByText("Planta Km 76 Cusipata")).toBeInTheDocument();
    expect(screen.getByText("Cotizador B2B")).toBeInTheDocument();
  });

  it("toggles mobile menu and handles keyboard Escape to close", () => {
    render(
      <SmoothScrollProvider>
        <Navbar />
      </SmoothScrollProvider>
    );

    const hamburgerBtn = screen.getByRole("button", { name: /abrir menú de navegación/i });
    expect(hamburgerBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(hamburgerBtn);
    expect(hamburgerBtn).toHaveAttribute("aria-expanded", "true");

    const mobileDialog = screen.getByRole("dialog", { name: /menú de navegación móvil/i });
    expect(mobileDialog).toBeInTheDocument();

    // Trigger Escape key
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /menú de navegación móvil/i })).not.toBeInTheDocument();
  });
});

describe("Sprint 1: Industrial Footer Component", () => {
  it("renders exact RUC 20114918718, plant locations and contact information", () => {
    render(<Footer />);

    expect(screen.getByText("20114918718")).toBeInTheDocument();
    expect(screen.getAllByText(/MOLINOS CUSCO S\.A\./i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Planta Industrial Km 76/i)).toBeInTheDocument();
    expect(screen.getByText(/GPS: -14.0492, -71.5033/i)).toBeInTheDocument();
    expect(screen.getByText(/Urb\. Parque Industrial, Cusco/i)).toBeInTheDocument();
    expect(screen.getByText("+51 984 630 970")).toBeInTheDocument();
    expect(screen.getByText("+51 932 331 672")).toBeInTheDocument();
    expect(screen.getByText(/Habilitación DIGESA/i)).toBeInTheDocument();
    expect(screen.getByText(/Directorio PROMPERÚ/i)).toBeInTheDocument();
  });
});

describe("Sprint 1: SmoothScrollProvider and prefers-reduced-motion", () => {
  const TestConsumer = (): React.JSX.Element => {
    const { isReducedMotion, scrollTo } = useSmoothScroll();
    return (
      <div>
        <div data-testid="motion-state">
          {isReducedMotion ? "reduced" : "normal"}
        </div>
        <button onClick={() => scrollTo("#hero")}>Scroll</button>
      </div>
    );
  };

  it("initializes without errors and provides scroll context", () => {
    const { unmount } = render(
      <SmoothScrollProvider>
        <TestConsumer />
      </SmoothScrollProvider>
    );

    expect(screen.getByTestId("motion-state")).toHaveTextContent("normal");

    // Test clean unmount without throwing errors or memory leak
    expect(() => unmount()).not.toThrow();
  });

  it("respects prefers-reduced-motion: reduce cleanly", () => {
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
        <TestConsumer />
      </SmoothScrollProvider>
    );

    expect(screen.getByTestId("motion-state")).toHaveTextContent("reduced");
  });

  it("executes scrollTo callback safely under reduced-motion mode", () => {
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

    window.scrollTo = vi.fn();

    render(
      <SmoothScrollProvider>
        <TestConsumer />
      </SmoothScrollProvider>
    );

    const button = screen.getByRole("button", { name: /scroll/i });
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
