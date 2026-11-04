# Molinos Cusco S.A. — Plataforma Web Corporativa B2B (Fideos Cusipata)

Plataforma Web Corporativa de alto rendimiento visual, Scrollytelling Inmersivo Awwwards y Motor de Cotización B2B mayorista para **Molinos Cusco S.A.** (RUC: 20114918718).

## Sedes Operativas
- **Planta Industrial Km 76:** Carretera Cusco–Sicuani, Distrito de Cusipata, Provincia de Quispicanchi, Cusco (3,300+ m.s.n.m. — Coordenadas GPS: -14.0492, -71.5033).
- **Sede Comercial y Distribución:** Urb. Parque Industrial, Cusco.
- **Canales de Atención Mayorista:** +51 984 630 970 (Sede Cusco) / +51 932 331 672 (Sede Cusipata).

## Stack Tecnológico Oficial
- **Framework Base:** Next.js 15 (App Router, React 19, TypeScript strict mode).
- **Estilos:** Tailwind CSS v4 + Variables CSS nativas para el Dynamic Ambient Glow.
- **Coreografía de Animación:** GSAP 3 (ScrollTrigger) + Lenis Smooth Scroll desacoplado.
- **Micro-interacciones:** Framer Motion.
- **Estado de Negocio B2B:** Zustand con persistencia en `localStorage`.
- **Validación:** Zod con validación algorítmica de RUC peruano (Módulo 11 ponderado SUNAT).
- **Pipeline de Pruebas:** Vitest (Unit) + Playwright (E2E) + axe-core (WCAG 2.1 AA).

## Scripts de Desarrollo
```bash
# Servidor de desarrollo
npm run dev

# Compilación para producción (Híbrido SSR / ISR)
npm run build

# Compilación para exportación estática On-Premise (/out)
NEXT_EXPORT=true npm run build

# Verificación de tipos TypeScript estricto
npm run typecheck

# Suite de pruebas unitarias
npm run test
```
