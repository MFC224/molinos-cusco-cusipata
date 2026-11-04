import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/lenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1C1917",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Molinos Cusco S.A. | Fideos Cusipata — Tradición Harinera y Fideera Andina",
  description:
    "Plataforma Oficial B2B de Molinos Cusco S.A. (Fideos Cusipata). Manufactura industrial de pastas al huevo, línea andina con quinua y kiwicha en Planta Km 76 Cusipata, Cusco.",
  keywords: [
    "Molinos Cusco",
    "Fideos Cusipata",
    "Pastas Cusco",
    "Tallarines al huevo",
    "Quinua y Kiwicha",
    "Cotizador B2B fideos",
    "Planta Km 76 Cusipata",
    "Harinas y fideos por mayor",
  ],
  authors: [{ name: "Molinos Cusco S.A." }],
  openGraph: {
    title: "Molinos Cusco S.A. | Fideos Cusipata",
    description:
      "Herencia molinera desde 1960. Pastas secas de alta tenacidad producidas a más de 3,300 m.s.n.m. en el Valle de Cusipata, Cusco.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF6F0] text-[#1C1917] antialiased selection:bg-[#D99B26] selection:text-[#FAF6F0]">
        {/* Skip to Main Content Link (WCAG AA accessibility requirement) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-[#9E1B1B] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[#FAF6F0] focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D99B26]"
        >
          Saltar al contenido principal
        </a>

        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
