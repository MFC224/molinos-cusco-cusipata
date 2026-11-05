"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSmoothScroll } from "@/lib/lenis";
import { useCartStore } from "@/store/useCartStore";
import { Menu, X, ShoppingBag } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

const navLinks: NavLink[] = [
  { label: "Herencia Industrial", href: "#historia" },
  { label: "Alquimia de Granos", href: "#ingredientes" },
  { label: "Calibres de Fideos", href: "#calibres", badge: "#40-#43" },
  { label: "Catálogo Mayorista", href: "#catalogo" },
  { label: "Planta Km 76 Cusipata", href: "#planta-industrial" },
];

export function Navbar(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { setDrawerOpen, getTotalUnits } = useCartStore();
  const totalUnits = getTotalUnits();

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string): void => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      scrollTo(href, { offset: -70 });
    }
  };

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FBF8F3]/95 py-3 shadow-[0_2px_15px_rgba(35,31,29,0.06)] backdrop-blur-md border-b border-[#E7DFD5]"
            : "bg-[#FBF8F3]/70 py-4 backdrop-blur-xs border-b border-[#E7DFD5]/40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 lg:gap-6 xl:gap-8 px-4 sm:px-6 lg:px-8">
          {/* Brand Identity — Authentic Molinos Cusco Seal */}
          <Link
            href="/"
            onClick={() => handleNavClick("#hero")}
            className="group flex shrink-0 items-center gap-2.5 sm:gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none rounded-sm mr-2 lg:mr-4 xl:mr-6"
            aria-label="Molinos Cusco S.A. — Fideos Cusipata Inicio"
          >
            <img
              src="/images/logo_color.png"
              alt="Logo Oficial Molinos Cusco S.A. - Fideos Cusipata"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg xl:text-xl font-bold tracking-tight text-[#231F1D] group-hover:text-[#8C2318] transition-colors leading-tight">
                MOLINOS CUSCO
              </span>
              <span className="font-serif text-[10px] sm:text-[11px] italic tracking-wide text-[#8C2318] mt-0.5">
                Fideos Cusipata · Desde 1988
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden flex-1 items-center justify-center gap-3.5 xl:gap-6 2xl:gap-7 lg:flex min-w-0"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group relative font-serif text-xs xl:text-sm font-medium text-[#6E6259] transition-colors hover:text-[#8C2318] focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none py-1.5 whitespace-nowrap shrink-0"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 rounded-full bg-[#F2ECE1] px-1.5 py-0.5 font-sans text-[9px] xl:text-[10px] font-semibold text-[#8C2318] border border-[#E7DFD5]">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#8C2318] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex shrink-0 items-center gap-3 ml-2 lg:ml-4 xl:ml-6">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-sm bg-[#8C2318] px-4 sm:px-5 py-2 text-xs sm:text-sm font-serif font-medium tracking-wide text-[#FBF8F3] shadow-xs transition-all duration-200 hover:bg-[#6F1B12] focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none active:scale-95 cursor-pointer"
              aria-label={`Abrir Cotizador Mayorista B2B (${totalUnits} unidades)`}
            >
              <ShoppingBag className="h-4 w-4 text-[#F5E6C8]" aria-hidden="true" />
              <span>Cotizador B2B</span>
              {totalUnits > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#C68B2C] font-mono text-[10px] font-bold text-[#231F1D]">
                  {totalUnits > 99 ? "99+" : totalUnits}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#E7DFD5] bg-[#F2ECE1] text-[#231F1D] lg:hidden hover:border-[#8C2318] focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#8C2318]" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 text-[#231F1D]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#231F1D]/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Sheet */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#FBF8F3] p-6 shadow-2xl border-l border-[#E7DFD5] flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E7DFD5]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/logo_color.png"
                    alt="Logo Fideos Cusipata"
                    className="h-9 w-auto object-contain"
                  />
                  <div className="flex flex-col">
                    <span className="font-serif text-sm font-bold text-[#231F1D]">
                      MOLINOS CUSCO
                    </span>
                    <span className="font-serif text-[10px] italic text-[#8C2318]">
                      Fideos Cusipata
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-sm p-1.5 text-[#6E6259] hover:bg-[#F2ECE1] hover:text-[#231F1D] focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none"
                  aria-label="Cerrar menú"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between rounded-sm px-3.5 py-3 font-serif text-base text-[#231F1D] transition-colors hover:bg-[#F2ECE1] hover:text-[#8C2318]"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-[#F2ECE1] px-2 py-0.5 font-sans text-xs font-semibold text-[#8C2318] border border-[#E7DFD5]">
                        {link.badge}
                      </span>
                    )}
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Area */}
            <div className="border-t border-[#E7DFD5] pt-6 space-y-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDrawerOpen(true);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#8C2318] py-3 font-serif text-sm font-medium text-[#FBF8F3] shadow-xs hover:bg-[#6F1B12] transition-colors"
              >
                <ShoppingBag className="h-4 w-4 text-[#F5E6C8]" aria-hidden="true" />
                <span>Cotizador Mayorista B2B</span>
              </button>

              <div className="text-center font-serif text-xs text-[#6E6259]">
                <p>Planta Industrial Km 76 Cusipata, Cusco</p>
                <p className="mt-1 font-mono text-[11px] text-[#8C2318]">RUC 20114918718</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
