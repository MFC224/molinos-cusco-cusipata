"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/lenis";
import { History, Calendar, MapPin, Factory, ShieldCheck, ArrowRight, Wheat } from "lucide-react";

interface Milestone {
  id: string;
  yearTag: string;
  displayYear: string;
  title: string;
  subtitle: string;
  dateStr: string;
  location: string;
  narrative: string;
  keyPoints: string[];
  imageSrc: string;
  imageAlt: string;
  blobColor: string;
  align: "left" | "right";
}

const milestones: Milestone[] = [
  {
    id: "era-1960s",
    yearTag: "1960s",
    displayYear: "1960s",
    title: "Raíces Molineras en los Andes",
    subtitle: "La Génesis Molinera en los Valles Interandinos",
    dateStr: "Década de 1960",
    location: "Valles del Sur Andino / Cusco",
    narrative:
      "Los primeros molinos de piedra y cilindros mecánicos sincrónicos en los valles interandinos sentaron la escuela técnica harinera de la región. Extracción diferencial de sémola de alta densidad proteica y una devoción artesanal que definió la receta clásica de fideos al huevo.",
    keyPoints: [
      "Primeros cilindros mecánicos de molienda en la región Cusco.",
      "Separación diferencial de harinas para abasto tradicional de panificación.",
      "Herencia artesanal que definió la receta clásica de fideos al huevo.",
    ],
    imageSrc: "/images/semola_al_huevo.png",
    imageAlt: "Molienda artesanal tradicional de trigo durum",
    blobColor: "#F5E6C8", // Ocre Crema
    align: "left",
  },
  {
    id: "era-1988",
    yearTag: "1988",
    displayYear: "1988",
    title: "Fundación de Molinos Cusco S.A.",
    subtitle: "Constitución Formal y Planta Km 76 Cusipata",
    dateStr: "28 de Octubre de 1988",
    location: "Distrito de Cusipata, Quispicanchi (>3,300 m.s.n.m.)",
    narrative:
      "El 28 de octubre de 1988 se formaliza bajo escritura pública Molinos Cusco S.A. (RUC 20114918718). Se inicia la construcción e inauguración de la gran planta industrial del Km 76 de la Carretera Cusco–Sicuani, aprovechando el clima seco interandino y las aguas puras de deshielo del nevado Ausangate.",
    keyPoints: [
      "Inauguración de líneas de extrusión continua y secado barométrico andino.",
      "Registro Único de Contribuyentes formal SUNAT 20114918718.",
      "Nacimiento de la marca insignia 'Fideos Cusipata' con distribución troncal regional.",
    ],
    imageSrc: "/images/carrusel_1.png",
    imageAlt: "Planta industrial histórica Km 76 Cusipata",
    blobColor: "#F2DDD5", // Terracota Pálido
    align: "right",
  },
  {
    id: "era-1995",
    yearTag: "1995",
    displayYear: "1995",
    title: "Nacimiento de Fideos al Huevo Cusipata",
    subtitle: "Lanzamiento de la Receta Insignia de Calibres #40 al #43",
    dateStr: "Año 1995",
    location: "Planta Industrial Cusipata & Red Sur Andina",
    narrative:
      "Lanzamiento de nuestra formulación maestra de fideos al huevo laminados. Desde el calibre grueso #40 hasta el sutil cabello de ángel #43, las familias del sur adoptaron Cusipata por su elasticidad irrepetible, su dorado cálido natural y su firmeza al dente en caldos y guisos.",
    keyPoints: [
      "Lanzamiento de calibres emblemáticos #40, #41, #42 y #43.",
      "Incorporación de huevo fresco pasteurizado en amasado continuo.",
      "Preferencia líder en mercados tradicionales y comedores cusqueños.",
    ],
    imageSrc: "/images/pasta_al_huevo_40_43.png",
    imageAlt: "Tallarines laminados al huevo Fideos Cusipata",
    blobColor: "#F5E6C8", // Ocre Crema
    align: "left",
  },
  {
    id: "era-2005",
    yearTag: "2005",
    displayYear: "2005",
    title: "Expansión Regional Sur",
    subtitle: "Consolidación de Rutas Troncales de Abasto Mayorista",
    dateStr: "Año 2005",
    location: "Corredor Cusco – Puno – Juliaca – Arequipa – Apurímac",
    narrative:
      "Consolidación de las rutas de distribución troncal mayorista. Flotas dedicadas unen la planta del Km 76 con los centros de acopio y mercados mayoristas de Sicuani, Puno, Juliaca, Arequipa y Abancay, asegurando abastecimiento ininterrumpido en la sierra sur peruana.",
    keyPoints: [
      "Flota de transporte troncal adaptada a la geografía andina.",
      "Introducción de formatos de fardos para abasto mayorista.",
      "Presencia permanente en bodegas y mercados de abasto regional.",
    ],
    imageSrc: "/images/carrusel_3.png",
    imageAlt: "Distribución y logística en el sur andino",
    blobColor: "#DCE8F0", // Azul Andino Pálido
    align: "right",
  },
  {
    id: "era-2016",
    yearTag: "2016",
    displayYear: "2016",
    title: "Alianza con el Biocomercio Andino",
    subtitle: "Incorporación de Granos Nativos y Sostenibilidad",
    dateStr: "Año 2016",
    location: "Comunidades Campesinas de Quispicanchi y Canchis",
    narrative:
      "Integración de Quinua Real, Kiwicha perlada y Espinaca silvestre cosechadas por comunidades campesinas de la cuenca del Vilcanota. Esta sinergia de biocomercio andino sostenible enriquece el perfil proteico de nuestras pastas y preserva la memoria agrícola ancestral.",
    keyPoints: [
      "Acopio directo y precio justo con comunidades campesinas.",
      "Línea especial de fideos con quinua, kiwicha y clorofila vegetal.",
      "Reconocimiento en investigaciones de desarrollo rural sostenible.",
    ],
    imageSrc: "/images/fideos_espinaca_quinua_kiwicha.png",
    imageAlt: "Línea andina de pastas con quinua, kiwicha y espinaca",
    blobColor: "#DCE6DF", // Verde Salvia Suave
    align: "left",
  },
  {
    id: "era-2022",
    yearTag: "2022",
    displayYear: "2022",
    title: "Modernización de Molienda y Extrusión",
    subtitle: "Túneles Barométricos y Nuevos Formatos Industriales",
    dateStr: "Año 2022",
    location: "Molienda 1 & 2 · Planta Km 76 Cusipata",
    narrative:
      "Actualización tecnológica de túneles de secado climáticamente regulados, aprovechando la presión atmosférica de altura para un curado suave de la sémola. Automatización de líneas de envasado en sacos reforzados de 10kg para atención institucional HORECA y programas sociales.",
    keyPoints: [
      "Sensores higrométricos calibrados para altitud (>3,300 m.s.n.m.).",
      "Formatos industriales de alta estiba para distribución masiva.",
      "Homologación y certificación sanitaria DIGESA de última generación.",
    ],
    imageSrc: "/images/galletas_quinua_kiwicha.png",
    imageAlt: "Líneas de empaque y derivados molineros",
    blobColor: "#F5E6C8", // Ocre Crema
    align: "right",
  },
  {
    id: "era-hoy",
    yearTag: "HOY",
    displayYear: "2026",
    title: "De Cusipata para el Perú",
    subtitle: "Vanguardia Industrial, Biocomercio y Red B2B",
    dateStr: "Presente Operativo • 38 Años de Solidez",
    location: "Sede Planta Km 76 Cusipata & Portal Digital B2B",
    narrative:
      "Molinos Cusco S.A. celebra más de 38 años de constitución formal combinando la tradición molinera centenaria con un moderno motor de cotización mayorista B2B. Con 24 SKUs comerciales en pastas secas, harinas y derivados andinos, abastecemos con orgullo a todo el Perú.",
    keyPoints: [
      "Túneles de secado climáticamente controlados adaptados a la presión de altitud.",
      "Biocomercio sostenible referenciado en investigaciones académicas de la PUCP.",
      "Motor de cotización mayorista B2B con despacho automatizado.",
    ],
    imageSrc: "/images/logo_color.png",
    imageAlt: "Molinos Cusco S.A. - Fideos Cusipata",
    blobColor: "#F2DDD5", // Terracota Pálido
    align: "left",
  },
];

export function Act5LegacyTimeline(): React.JSX.Element {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("era-1988");
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const milestoneRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollTo, isReducedMotion } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Draw serpentine connecting path smoothly on scroll
      if (pathRef.current && sectionRef.current) {
        const path = pathRef.current;
        const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 3600;

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 85%",
            scrub: 1.2,
          },
        });
      }

      // Scrollytelling cascade: appear in focus, dissolve when scrolling past
      milestoneRefs.current.forEach((el, index) => {
        if (!el) return;

        // 1. Entrance when entering viewport center from below
        gsap.fromTo(
          el,
          {
            opacity: 0.15,
            y: 55,
            scale: 0.93,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 45%",
              scrub: 1,
              onEnter: () => setActiveMilestoneId(milestones[index]?.id ?? "era-1988"),
              onEnterBack: () => setActiveMilestoneId(milestones[index]?.id ?? "era-1988"),
            },
          }
        );

        // 2. Progressive dissolve and subtle defocus when scrolling up and leaving focus
        gsap.to(el, {
          opacity: 0.2,
          y: -40,
          scale: 0.94,
          filter: "blur(2.5px)",
          ease: "power1.in",
          scrollTrigger: {
            trigger: el,
            start: "top 12%",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isReducedMotion]);

  const handleJumpToMilestone = (id: string): void => {
    setActiveMilestoneId(id);
    const targetElement = document.getElementById(`milestone-${id}`);
    if (targetElement) {
      scrollTo(`#milestone-${id}`, { offset: -90 });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="historia"
      aria-label="El Legado de Cusipata y Memoria Industrial"
      className="relative min-h-screen bg-[#FBF8F3] py-32 px-4 sm:px-6 lg:px-8 text-[#231F1D] overflow-hidden"
    >
      {/* Organic Matte Ambient Background Blobs (Salvia, Trigo, Terracota, Azul Andino - Zero Neon) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 h-96 w-96 rounded-full bg-[#F5E6C8]/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 h-[500px] w-[500px] rounded-full bg-[#DCE6DF]/55 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2/3 -left-32 h-[550px] w-[550px] rounded-full bg-[#DCE8F0]/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-48 -right-28 h-96 w-96 rounded-full bg-[#F2DDD5]/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Editorial Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E7DFD5] bg-[#F2ECE1] px-4 py-1.5 text-xs font-serif tracking-widest text-[#6E6259] shadow-xs">
            <History className="h-3.5 w-3.5 text-[#8C2318]" aria-hidden="true" />
            <span>Memoria e Hitos Industriales</span>
          </div>

          <h2 className="mt-5 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231F1D] leading-tight">
            El Legado de Cusipata <br />
            <span className="text-[#8C2318] italic font-serif font-normal">Tres Épocas de Solidez</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#6E6259] leading-relaxed font-sans max-w-2xl mx-auto">
            Más de seis décadas de maestría molinera en los Andes del Cusco: desde las primeras moliendas
            interandinas hasta la constitución formal de Molinos Cusco S.A. en 1988 y su moderna red logística B2B.
          </p>
        </div>

        {/* Quick Era Jump Bar (Accessible Navigation Pills) */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {milestones.map((m) => {
            const isActive = m.id === activeMilestoneId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleJumpToMilestone(m.id)}
                className={`group relative rounded-full px-4 sm:px-5 py-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#C68B2C] focus-visible:outline-none cursor-pointer ${
                  isActive
                    ? "bg-[#8C2318] text-[#FBF8F3] shadow-xs scale-105"
                    : "border border-[#E7DFD5] bg-white/70 text-[#6E6259] hover:bg-[#F2ECE1] hover:border-[#8C2318] hover:text-[#8C2318]"
                }`}
                aria-pressed={isActive}
                aria-label={`Saltar al hito ${m.yearTag}`}
              >
                <span className="font-serif text-xs sm:text-sm font-bold tracking-wide">
                  {m.yearTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Serpentine Cascading Timeline Spine & Cards */}
        <div className="relative mt-20 sm:mt-28">
          {/* Continuous Serpentine SVG Path Drawn on Scroll (Hidden on small mobile) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block z-0">
            <svg
              viewBox="0 0 1000 3600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                ref={pathRef}
                d="M 500,20 
                   C 500,120 220,160 220,320 
                   C 220,520 780,600 780,820 
                   C 780,1050 220,1150 220,1380 
                   C 220,1620 780,1720 780,1960 
                   C 780,2200 220,2300 220,2520 
                   C 220,2760 780,2860 780,3100 
                   C 780,3320 500,3420 500,3580"
                stroke="#8C2318"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.65"
              />
            </svg>
          </div>

          {/* 7 Cascading Milestones */}
          <div className="relative z-10 flex flex-col gap-24 sm:gap-32 md:gap-36">
            {milestones.map((m, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={m.id}
                  id={`milestone-${m.id}`}
                  ref={(el) => {
                    milestoneRefs.current[index] = el;
                  }}
                  className={`relative flex flex-col items-center transition-all duration-300 will-change-transform ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 sm:gap-12 md:gap-16`}
                >
                  {/* Circular Medallion Photo Frame (Artisanal Ceramic Border) */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div
                      className="absolute -inset-3 rounded-full opacity-60 blur-md transition-opacity duration-300"
                      style={{ backgroundColor: m.blobColor }}
                      aria-hidden="true"
                    />
                    <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-full border-2 border-[#E7DFD5] bg-white p-2.5 shadow-md overflow-hidden flex items-center justify-center">
                      <img
                        src={m.imageSrc}
                        alt={m.imageAlt}
                        className="h-full w-full rounded-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Editorial Card Content */}
                  <div
                    className={`flex-1 rounded-3xl border border-[#E7DFD5] bg-[#FBF8F3]/90 p-7 sm:p-9 shadow-xs backdrop-blur-xs text-left max-w-2xl ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    {/* Header: Monumental Year & Date */}
                    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#E7DFD5] pb-4">
                      <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#231F1D] leading-none">
                        {m.displayYear}
                      </span>
                      <div className="flex items-center gap-2 font-serif text-xs italic text-[#8C2318]">
                        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{m.dateStr}</span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mt-4">
                      <div className="flex items-center gap-1.5 font-serif text-xs text-[#6E6259]">
                        <MapPin className="h-3.5 w-3.5 text-[#C68B2C]" aria-hidden="true" />
                        <span>{m.location}</span>
                      </div>
                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-[#231F1D] leading-snug">
                        {m.title}
                      </h3>
                      <p className="mt-1 font-serif text-xs sm:text-sm italic font-medium text-[#8C2318]">
                        {m.subtitle}
                      </p>
                    </div>

                    {/* Narrative */}
                    <p className="mt-4 text-sm sm:text-base text-[#6E6259] leading-relaxed font-sans">
                      {m.narrative}
                    </p>

                    {/* Key Technical & Historical Points */}
                    <div className="mt-6 space-y-2.5 border-t border-[#E7DFD5] pt-4">
                      {m.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-[#231F1D]">
                          <Factory className="h-3.5 w-3.5 text-[#8C2318] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* RUC & Institutional Stamp for 1988 */}
                    {m.id === "era-1988" && (
                      <div className="mt-6 pt-4 border-t border-[#E7DFD5] flex items-center justify-between text-xs font-serif text-[#6E6259]">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="h-4 w-4 text-[#3A6953]" aria-hidden="true" />
                          <span>SUNAT RUC: <strong className="text-[#231F1D]">20114918718</strong></span>
                        </div>
                        <span className="text-[11px] font-sans font-semibold text-[#8C2318] uppercase tracking-wider">
                          Planta Km 76 Cusipata
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Footer Bridge to Wholesale B2B Quote Section */}
        <div className="mt-28 text-center border-t border-[#E7DFD5] pt-14">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#F2ECE1] border border-[#E7DFD5] text-[#8C2318] mb-4 shadow-xs">
            <Wheat className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231F1D]">
            Tradición Molinera al Servicio de su Empresa
          </h3>
          <p className="mt-2 text-sm sm:text-base text-[#6E6259] max-w-xl mx-auto">
            Abastecemos a distribuidores mayoristas, cadenas de restaurantes y programas institucionales
            con despacho directo desde nuestra planta en Cusipata.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="#cotizador"
              className="inline-flex items-center gap-2.5 rounded-sm bg-[#8C2318] px-7 py-3 text-sm font-serif font-medium text-[#FBF8F3] shadow-xs hover:bg-[#6F1B12] transition-colors"
            >
              <span>Ir al Cotizador Mayorista</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
