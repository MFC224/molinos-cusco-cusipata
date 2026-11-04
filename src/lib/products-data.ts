export type ProductCategory =
  | "Línea Clásica"
  | "Línea Andina"
  | "Pasta Corta"
  | "Molinería y Derivados";

export type IngredientTag =
  | "Huevo"
  | "Trigo Durum"
  | "Quinua"
  | "Kiwicha"
  | "Espinaca"
  | "Agua Mineral";

export type PackagingFormat =
  | "Bolsa 250g"
  | "Bolsa 500g"
  | "Fardo 5kg"
  | "Saco 10kg";

export interface NutritionalAnalysis {
  energyKcal: number;
  proteinsG: number;
  carbohydratesG: number;
  fatG: number;
  fiberG: number;
  sodiumMg: number;
  moisturePercent: number;
  ashPercent: number;
}

export interface ProductSKU {
  id: string;
  skuCode: string;
  name: string;
  category: ProductCategory;
  ingredients: IngredientTag[];
  primaryIngredient: IngredientTag;
  format: PackagingFormat;
  glowColor: string; // Token hex for dynamic ambient glow
  calibreCode?: string;
  cookingTimeMin: number;
  shelfLifeMonths: number;
  sanitaryRegistry: string;
  description: string;
  paletizationUnitsPerPallet: number;
  weightNetKg: number;
  nutrition: NutritionalAnalysis;
}

export const PRODUCTS_CATALOG: readonly ProductSKU[] = [
  // --- LÍNEA CLÁSICA AL HUEVO (8 SKUs) ---
  {
    id: "tallarin-40-500g",
    skuCode: "CUS-40-500",
    name: "Tallarín Grueso #40 al Huevo",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Bolsa 500g",
    glowColor: "#9E1B1B",
    calibreCode: "#40",
    cookingTimeMin: 11,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804918N-NAMOCS",
    description: "Pasta larga de calibre grueso (1.70 mm). Elaborada con sémola de trigo durum y huevo fresco pasteurizado.",
    paletizationUnitsPerPallet: 1200,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 365, proteinsG: 13.5, carbohydratesG: 72.0, fatG: 2.1, fiberG: 3.2, sodiumMg: 25, moisturePercent: 12.0, ashPercent: 0.8 },
  },
  {
    id: "tallarin-40-10kg",
    skuCode: "CUS-40-10K",
    name: "Tallarín Grueso #40 Industrial",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Saco 10kg",
    glowColor: "#9E1B1B",
    calibreCode: "#40",
    cookingTimeMin: 11,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804918N-NAMOCS",
    description: "Saco de polipropileno reforzado para canal mayorista e institucional HORECA.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 365, proteinsG: 13.5, carbohydratesG: 72.0, fatG: 2.1, fiberG: 3.2, sodiumMg: 25, moisturePercent: 12.0, ashPercent: 0.8 },
  },
  {
    id: "tallarin-41-500g",
    skuCode: "CUS-41-500",
    name: "Tallarín Mediano #41 al Huevo",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Bolsa 500g",
    glowColor: "#9E1B1B",
    calibreCode: "#41",
    cookingTimeMin: 9,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804919N-NAMOCS",
    description: "Calibre estándar (1.45 mm) de alta rotación en el sur peruano.",
    paletizationUnitsPerPallet: 1200,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 362, proteinsG: 13.2, carbohydratesG: 72.5, fatG: 2.0, fiberG: 3.0, sodiumMg: 24, moisturePercent: 12.0, ashPercent: 0.8 },
  },
  {
    id: "tallarin-41-10kg",
    skuCode: "CUS-41-10K",
    name: "Tallarín Mediano #41 Industrial",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Saco 10kg",
    glowColor: "#9E1B1B",
    calibreCode: "#41",
    cookingTimeMin: 9,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804919N-NAMOCS",
    description: "Saco industrial para distribución gastronómica masiva.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 362, proteinsG: 13.2, carbohydratesG: 72.5, fatG: 2.0, fiberG: 3.0, sodiumMg: 24, moisturePercent: 12.0, ashPercent: 0.8 },
  },
  {
    id: "tallarin-42-500g",
    skuCode: "CUS-42-500",
    name: "Tallarín Delgado #42 al Huevo",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Bolsa 500g",
    glowColor: "#9E1B1B",
    calibreCode: "#42",
    cookingTimeMin: 7,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804920N-NAMOCS",
    description: "Pasta delgada (1.20 mm) ideal para salsas cremosas y salteados.",
    paletizationUnitsPerPallet: 1200,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 360, proteinsG: 13.0, carbohydratesG: 73.0, fatG: 1.9, fiberG: 2.9, sodiumMg: 22, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "tallarin-42-10kg",
    skuCode: "CUS-42-10K",
    name: "Tallarín Delgado #42 Industrial",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Saco 10kg",
    glowColor: "#9E1B1B",
    calibreCode: "#42",
    cookingTimeMin: 7,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804920N-NAMOCS",
    description: "Saco de 10kg para restaurantes y concesionarias.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 360, proteinsG: 13.0, carbohydratesG: 73.0, fatG: 1.9, fiberG: 2.9, sodiumMg: 22, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "cabello-43-250g",
    skuCode: "CUS-43-250",
    name: "Cabello de Ángel #43 al Huevo",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Bolsa 250g",
    glowColor: "#9E1B1B",
    calibreCode: "#43",
    cookingTimeMin: 3.5,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804921N-NAMOCS",
    description: "Filamento ultrafino (0.85 mm) para sopas tradicionales andinas.",
    paletizationUnitsPerPallet: 2400,
    weightNetKg: 0.25,
    nutrition: { energyKcal: 358, proteinsG: 12.8, carbohydratesG: 73.5, fatG: 1.8, fiberG: 2.8, sodiumMg: 20, moisturePercent: 11.5, ashPercent: 0.7 },
  },
  {
    id: "cabello-43-10kg",
    skuCode: "CUS-43-10K",
    name: "Cabello de Ángel #43 Industrial",
    category: "Línea Clásica",
    ingredients: ["Trigo Durum", "Huevo"],
    primaryIngredient: "Huevo",
    format: "Saco 10kg",
    glowColor: "#9E1B1B",
    calibreCode: "#43",
    cookingTimeMin: 3.5,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2804921N-NAMOCS",
    description: "Saco industrial para programas sociales y comedores.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 358, proteinsG: 12.8, carbohydratesG: 73.5, fatG: 1.8, fiberG: 2.8, sodiumMg: 20, moisturePercent: 11.5, ashPercent: 0.7 },
  },

  // --- LÍNEA ANDINA ESPECIAL (5 SKUs: 3 Quinua, 2 Espinaca) ---
  {
    id: "fideo-quinua-500g",
    skuCode: "CUS-AND-QUI-500",
    name: "Fideo Tallarín con Quinua Real",
    category: "Línea Andina",
    ingredients: ["Trigo Durum", "Quinua"],
    primaryIngredient: "Quinua",
    format: "Bolsa 500g",
    glowColor: "#B55327",
    cookingTimeMin: 8,
    shelfLifeMonths: 18,
    sanitaryRegistry: "DIGESA P2805101N-NAMOCS",
    description: "Enriquecido con harina de quinua real de Quispicanchi. Proteína completa.",
    paletizationUnitsPerPallet: 1200,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 372, proteinsG: 15.2, carbohydratesG: 70.0, fatG: 3.0, fiberG: 4.8, sodiumMg: 18, moisturePercent: 11.0, ashPercent: 1.1 },
  },
  {
    id: "fideo-quinua-fardo",
    skuCode: "CUS-AND-QUI-5K",
    name: "Fideo Quinua Real Fardo 5kg",
    category: "Línea Andina",
    ingredients: ["Trigo Durum", "Quinua"],
    primaryIngredient: "Quinua",
    format: "Fardo 5kg",
    glowColor: "#B55327",
    cookingTimeMin: 8,
    shelfLifeMonths: 18,
    sanitaryRegistry: "DIGESA P2805101N-NAMOCS",
    description: "Fardo mayorista de pasta andina con quinua real.",
    paletizationUnitsPerPallet: 160,
    weightNetKg: 5.0,
    nutrition: { energyKcal: 372, proteinsG: 15.2, carbohydratesG: 70.0, fatG: 3.0, fiberG: 4.8, sodiumMg: 18, moisturePercent: 11.0, ashPercent: 1.1 },
  },
  {
    id: "fideo-quinua-saco",
    skuCode: "CUS-AND-QUI-10K",
    name: "Fideo Quinua Real Saco 10kg",
    category: "Línea Andina",
    ingredients: ["Trigo Durum", "Quinua"],
    primaryIngredient: "Quinua",
    format: "Saco 10kg",
    glowColor: "#B55327",
    cookingTimeMin: 8,
    shelfLifeMonths: 18,
    sanitaryRegistry: "DIGESA P2805101N-NAMOCS",
    description: "Saco institucional para compras públicas y biocomercio andino.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 372, proteinsG: 15.2, carbohydratesG: 70.0, fatG: 3.0, fiberG: 4.8, sodiumMg: 18, moisturePercent: 11.0, ashPercent: 1.1 },
  },
  {
    id: "fideo-espinaca-500g",
    skuCode: "CUS-AND-ESP-500",
    name: "Fideo Tallarín con Espinaca",
    category: "Línea Andina",
    ingredients: ["Trigo Durum", "Espinaca"],
    primaryIngredient: "Espinaca",
    format: "Bolsa 500g",
    glowColor: "#2D6A4F",
    cookingTimeMin: 8.5,
    shelfLifeMonths: 18,
    sanitaryRegistry: "DIGESA P2805202N-NAMOCS",
    description: "Elaborado con concentrado de hojas de espinaca silvestre y sémola durum.",
    paletizationUnitsPerPallet: 1200,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 355, proteinsG: 13.8, carbohydratesG: 71.0, fatG: 1.8, fiberG: 4.2, sodiumMg: 35, moisturePercent: 11.8, ashPercent: 1.2 },
  },
  {
    id: "fideo-espinaca-fardo",
    skuCode: "CUS-AND-ESP-5K",
    name: "Fideo Espinaca Fardo 5kg",
    category: "Línea Andina",
    ingredients: ["Trigo Durum", "Espinaca"],
    primaryIngredient: "Espinaca",
    format: "Fardo 5kg",
    glowColor: "#2D6A4F",
    cookingTimeMin: 8.5,
    shelfLifeMonths: 18,
    sanitaryRegistry: "DIGESA P2805202N-NAMOCS",
    description: "Fardo institucional de pasta verde natural con clorofila pura.",
    paletizationUnitsPerPallet: 160,
    weightNetKg: 5.0,
    nutrition: { energyKcal: 355, proteinsG: 13.8, carbohydratesG: 71.0, fatG: 1.8, fiberG: 4.2, sodiumMg: 35, moisturePercent: 11.8, ashPercent: 1.2 },
  },

  // --- PASTA CORTA (6 SKUs: 4 Industriales 10kg, 2 Retail) ---
  {
    id: "corbata-500g",
    skuCode: "CUS-PC-COR-500",
    name: "Fideo Corbata Cusipata",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Bolsa 500g",
    glowColor: "#D99B26",
    cookingTimeMin: 10,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806301N-NAMOCS",
    description: "Pasta corta en forma de lazo o mariposa con pliegue central tenaz.",
    paletizationUnitsPerPallet: 1000,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "corbata-10kg",
    skuCode: "CUS-PC-COR-10K",
    name: "Fideo Corbata Saco 10kg",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#1C1917",
    cookingTimeMin: 10,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806301N-NAMOCS",
    description: "Saco industrial de polipropileno reforzado con alta resistencia de estiba.",
    paletizationUnitsPerPallet: 75,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "codito-500g",
    skuCode: "CUS-PC-COD-500",
    name: "Fideo Codito Rayado",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Bolsa 500g",
    glowColor: "#D99B26",
    cookingTimeMin: 9,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806302N-NAMOCS",
    description: "Pasta tubular curvada con estriado exterior para retención de caldos.",
    paletizationUnitsPerPallet: 1100,
    weightNetKg: 0.5,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "codito-10kg",
    skuCode: "CUS-PC-COD-10K",
    name: "Fideo Codito Saco 10kg",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#1C1917",
    cookingTimeMin: 9,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806302N-NAMOCS",
    description: "Formato granel industrial de coditos para abastecimiento mayorista.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "tornillo-10kg",
    skuCode: "CUS-PC-TOR-10K",
    name: "Fideo Tornillo Saco 10kg",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#1C1917",
    cookingTimeMin: 9.5,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806303N-NAMOCS",
    description: "Fusilli espiralado de alta tenacidad en presentación industrial.",
    paletizationUnitsPerPallet: 75,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },
  {
    id: "canuto-10kg",
    skuCode: "CUS-PC-CAN-10K",
    name: "Fideo Canuto Saco 10kg",
    category: "Pasta Corta",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#1C1917",
    cookingTimeMin: 11,
    shelfLifeMonths: 24,
    sanitaryRegistry: "DIGESA P2806304N-NAMOCS",
    description: "Macarrón canuto rígido de calibre amplio en saco industrial de 10kg.",
    paletizationUnitsPerPallet: 70,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 360, proteinsG: 12.5, carbohydratesG: 74.0, fatG: 1.5, fiberG: 2.8, sodiumMg: 15, moisturePercent: 12.0, ashPercent: 0.7 },
  },

  // --- MOLINERÍA Y DERIVADOS (5 SKUs: Galletas, Harinas, Agua) ---
  {
    id: "galleta-kiwicha",
    skuCode: "CUS-DER-GAL-KIW",
    name: "Galleta Nutritiva de Kiwicha Cusipata",
    category: "Molinería y Derivados",
    ingredients: ["Kiwicha", "Trigo Durum"],
    primaryIngredient: "Kiwicha",
    format: "Fardo 5kg",
    glowColor: "#D99B26",
    cookingTimeMin: 0,
    shelfLifeMonths: 12,
    sanitaryRegistry: "DIGESA P2807401N-NAMOCS",
    description: "Galleta fortificada con kiwicha expandida y miel de abeja andina.",
    paletizationUnitsPerPallet: 140,
    weightNetKg: 5.0,
    nutrition: { energyKcal: 420, proteinsG: 11.0, carbohydratesG: 68.0, fatG: 12.0, fiberG: 5.5, sodiumMg: 85, moisturePercent: 4.5, ashPercent: 1.5 },
  },
  {
    id: "galleta-quinua",
    skuCode: "CUS-DER-GAL-QUI",
    name: "Galleta Andina de Quinua",
    category: "Molinería y Derivados",
    ingredients: ["Quinua", "Trigo Durum"],
    primaryIngredient: "Quinua",
    format: "Fardo 5kg",
    glowColor: "#B55327",
    cookingTimeMin: 0,
    shelfLifeMonths: 12,
    sanitaryRegistry: "DIGESA P2807402N-NAMOCS",
    description: "Galleta crujiente con quinua perlada tostada para meriendas escolares.",
    paletizationUnitsPerPallet: 140,
    weightNetKg: 5.0,
    nutrition: { energyKcal: 415, proteinsG: 11.5, carbohydratesG: 67.5, fatG: 11.8, fiberG: 5.2, sodiumMg: 80, moisturePercent: 4.8, ashPercent: 1.6 },
  },
  {
    id: "harina-especial-cusipata",
    skuCode: "CUS-DER-HAR-ESP",
    name: "Harina Especial Cusipata",
    category: "Molinería y Derivados",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#D99B26",
    cookingTimeMin: 0,
    shelfLifeMonths: 12,
    sanitaryRegistry: "DIGESA P2808501N-NAMOCS",
    description: "Harina panificable de alta extracción y fuerza elástica w > 280.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 350, proteinsG: 12.0, carbohydratesG: 73.0, fatG: 1.2, fiberG: 2.5, sodiumMg: 10, moisturePercent: 13.5, ashPercent: 0.6 },
  },
  {
    id: "harina-integral-andina",
    skuCode: "CUS-DER-HAR-INT",
    name: "Harina Integral con Salvado de Trigo",
    category: "Molinería y Derivados",
    ingredients: ["Trigo Durum"],
    primaryIngredient: "Trigo Durum",
    format: "Saco 10kg",
    glowColor: "#D99B26",
    cookingTimeMin: 0,
    shelfLifeMonths: 12,
    sanitaryRegistry: "DIGESA P2808502N-NAMOCS",
    description: "Harina 100% integral molida con el germen y salvado original.",
    paletizationUnitsPerPallet: 80,
    weightNetKg: 10.0,
    nutrition: { energyKcal: 340, proteinsG: 13.5, carbohydratesG: 69.0, fatG: 2.0, fiberG: 9.5, sodiumMg: 12, moisturePercent: 13.0, ashPercent: 1.4 },
  },
  {
    id: "agua-mesa-ausangate",
    skuCode: "CUS-DER-AGU-AUS",
    name: "Agua de Mesa Cusipata Ausangate",
    category: "Molinería y Derivados",
    ingredients: ["Agua Mineral"],
    primaryIngredient: "Agua Mineral",
    format: "Fardo 5kg",
    glowColor: "#3B82F6",
    cookingTimeMin: 0,
    shelfLifeMonths: 12,
    sanitaryRegistry: "DIGESA P2809601N-NAMOCS",
    description: "Agua de deshielo andino purificada en planta mediante micro-filtración.",
    paletizationUnitsPerPallet: 120,
    weightNetKg: 5.0,
    nutrition: { energyKcal: 0, proteinsG: 0, carbohydratesG: 0, fatG: 0, fiberG: 0, sodiumMg: 4, moisturePercent: 100, ashPercent: 0 },
  },
] as const;

/**
 * Normalizes text removing accents, diacritics and casing for fuzzy resilient matching (ESC-03.06, ESC-03.07).
 */
export function normalizeSearchString(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Sanitizes regex characters to prevent regex injection attacks (ESC-03.13).
 */
export function sanitizeSearchRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export interface FilterCriteria {
  category?: ProductCategory | "Todas";
  ingredient?: IngredientTag | "Todos";
  format?: PackagingFormat | "Todos";
  searchQuery?: string;
}

/**
 * Instant in-memory multi-criteria product filter (HU-05 / CP-03).
 */
export function filterProducts(
  catalog: readonly ProductSKU[],
  criteria: FilterCriteria
): ProductSKU[] {
  const { category, ingredient, format, searchQuery } = criteria;
  const normalizedQuery = searchQuery ? normalizeSearchString(searchQuery) : "";

  return catalog.filter((product) => {
    // Category match
    if (category && category !== "Todas" && product.category !== category) {
      return false;
    }

    // Ingredient match
    if (ingredient && ingredient !== "Todos" && !product.ingredients.includes(ingredient)) {
      return false;
    }

    // Packaging format match
    if (format && format !== "Todos" && product.format !== format) {
      return false;
    }

    // Text search match across name, description, and sku
    if (normalizedQuery.length > 0) {
      const targetText = `${product.name} ${product.description} ${product.skuCode} ${product.ingredients.join(" ")}`;
      const normalizedTarget = normalizeSearchString(targetText);
      if (!normalizedTarget.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });
}
