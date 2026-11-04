export type CalibreCode = "#40" | "#41" | "#42" | "#43";

export interface CalibreData {
  code: CalibreCode;
  numericCode: number;
  name: string;
  category: string;
  thicknessMm: number; // exact mm
  strokeWidthPx: number; // SVG render width
  cookingTimeMin: number; // minutes al dente
  waterAbsorptionPercent: number; // %
  portionsPerKg: number; // commercial portions
  recommendedSauces: string;
  culinaryProfile: string;
  elasticRetentionPercent: number;
  macroRugosity: string;
}

export const CALIBRES: readonly CalibreData[] = [
  {
    code: "#40",
    numericCode: 40,
    name: "Tallarín Grueso",
    category: "Línea Clásica al Huevo",
    thicknessMm: 1.70,
    strokeWidthPx: 14,
    cookingTimeMin: 11,
    waterAbsorptionPercent: 110,
    portionsPerKg: 10,
    recommendedSauces: "Estofados tradicionales, ragú de carne, salsas densas de cocción lenta.",
    culinaryProfile: "Máxima tenacidad al mordisco y retención prolongada en mesa de buffet o eventos.",
    elasticRetentionPercent: 98,
    macroRugosity: "Micro-rugosidad de secado en túnel andino con alta adherencia a salsas oleosas.",
  },
  {
    code: "#41",
    numericCode: 41,
    name: "Tallarín Mediano",
    category: "Línea Clásica al Huevo",
    thicknessMm: 1.45,
    strokeWidthPx: 10,
    cookingTimeMin: 9,
    waterAbsorptionPercent: 105,
    portionsPerKg: 10,
    recommendedSauces: "Tallarines verdes al pesto andino, salsa roja de tomate criollo, salteados al wok.",
    culinaryProfile: "Calibre estándar de alta rotación comercial en el sur peruano; equilibrio perfecto de cuerpo.",
    elasticRetentionPercent: 96,
    macroRugosity: "Porosidad superficial controlada por extrusión en molde de bronce técnico.",
  },
  {
    code: "#42",
    numericCode: 42,
    name: "Tallarín Delgado",
    category: "Línea Clásica al Huevo",
    thicknessMm: 1.20,
    strokeWidthPx: 6.5,
    cookingTimeMin: 7,
    waterAbsorptionPercent: 100,
    portionsPerKg: 10,
    recommendedSauces: "Crema huancaína, salsas ligeras a base de mantequilla serrana, quesos madurados.",
    culinaryProfile: "Cocción ágil y textura suave con retención elástica sin reblandecimiento.",
    elasticRetentionPercent: 94,
    macroRugosity: "Textura homogénea con sellado térmico a baja humedad relativa en Cusipata.",
  },
  {
    code: "#43",
    numericCode: 43,
    name: "Cabello de Ángel",
    category: "Línea Clásica al Huevo",
    thicknessMm: 0.85,
    strokeWidthPx: 3,
    cookingTimeMin: 3.5,
    waterAbsorptionPercent: 95,
    portionsPerKg: 10,
    recommendedSauces: "Caldos andinos reconstituyentes, sopa criolla, consomé de ave, dietas ligeras.",
    culinaryProfile: "Filamento ultra-fino de cocción casi instantánea que preserva cuerpo en caldos hirvientes.",
    elasticRetentionPercent: 92,
    macroRugosity: "Filamento continuo de sémola vítrea de rápida hidratación termodinámica.",
  },
] as const;

/**
 * Resolves a calibre safely by string (e.g. "41", "#41") or numeric code (41).
 * If invalid or out of bounds, defaults safely to #40 (ESC-04.12 fallback).
 */
export function getCalibreByCode(input: string | number | null | undefined): CalibreData {
  if (!input) return CALIBRES[0]!;

  const cleaned = String(input).trim().replace("#", "");
  const num = parseInt(cleaned, 10);

  const found = CALIBRES.find((c) => c.numericCode === num);
  if (found) return found;

  // Fallback to standard #40
  return CALIBRES[0]!;
}

/**
 * Clamps calibre index between 0 (#40) and 3 (#43) (ESC-04.05 / ESC-04.06 boundary checks).
 */
export function clampCalibreIndex(index: number): number {
  if (index < 0) return 0;
  if (index >= CALIBRES.length) return CALIBRES.length - 1;
  return index;
}
