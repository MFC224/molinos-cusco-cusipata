"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSmoothScroll } from "@/lib/lenis";
import { Menu, X, ShoppingBag, MapPin, Wheat } from "lucide-react";

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

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 30);
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
            ? "bg-[#1C1917]/90 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.4)] backdrop-blur-md border-b border-[#38332E]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <Link
            href="/"
            onClick={() => handleNavClick("#hero")}
            className="group flex items-center gap-3 text-left focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none rounded-sm"
            aria-label="Molinos Cusco S.A. — Fideos Cusipata Inicio"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9E1B1B] text-[#FAF6F0] shadow-md transition-transform duration-200 group-hover:scale-105">
              <Wheat className="h-6 w-6 text-[#F5C768]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold tracking-wider text-[#FAF6F0] group-hover:text-[#F5C768] transition-colors">
                MOLINOS CUSCO
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D99B26]">
                Fideos Cusipata · Desde 1988
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="hidden items-center gap-6 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group relative text-sm font-medium text-[#FAF6F0]/90 transition-colors hover:text-[#F5C768] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none py-1"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 rounded bg-[#38332E] px-1.5 py-0.5 font-mono text-[10px] text-[#D99B26] border border-[#D99B26]/30">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D99B26] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href="#cotizador"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#cotizador");
              }}
              className="inline-flex items-center gap-2 rounded-md bg-[#9E1B1B] px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-[#FAF6F0] shadow-md transition-all duration-200 hover:bg-[#7D1414] hover:shadow-[0_0_15px_rgba(158,27,27,0.5)] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none active:scale-95"
              aria-label="Abrir Cotizador Mayorista B2B"
            >
              <ShoppingBag className="h-4 w-4 text-[#F5C768]" aria-hidden="true" />
              <span>Cotizador B2B</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#38332E] bg-[#262220] text-[#FAF6F0] lg:hidden hover:border-[#D99B26] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-[#FAF6F0]" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5 text-[#FAF6F0]" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Accessible Backdrop */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#1C1917]/95 backdrop-blur-xl px-6 py-8"
        >
          <div className="flex items-center justify-between border-b border-[#38332E] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9E1B1B] text-[#FAF6F0]">
                <Wheat className="h-5 w-5 text-[#F5C768]" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-[#FAF6F0]">
                  MOLINOS CUSCO
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#D99B26]">
                  Fideos Cusipata
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-[#FAF6F0] hover:bg-[#262220] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
              aria-label="Cerrar menú"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8" aria-label="Enlaces de navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="flex items-center justify-between border-b border-[#262220] pb-3 text-lg font-medium text-[#FAF6F0] hover:text-[#D99B26] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="rounded bg-[#262220] px-2 py-0.5 font-mono text-xs text-[#D99B26] border border-[#D99B26]/30">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-[#38332E] pt-6">
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="h-4 w-4 text-[#D99B26]" aria-hidden="true" />
              <span>Planta Km 76 Cusco-Sicuani, Cusipata (Quispicanchi)</span>
            </div>
            <a
              href="#cotizador"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#cotizador");
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-[#9E1B1B] py-3 text-sm font-bold text-[#FAF6F0] shadow-md hover:bg-[#7D1414] focus-visible:ring-2 focus-visible:ring-[#D99B26] focus-visible:outline-none"
            >
              <ShoppingBag className="h-4 w-4 text-[#F5C768]" aria-hidden="true" />
              <span>Solicitar Cotización B2B</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
