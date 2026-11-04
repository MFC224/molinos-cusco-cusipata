import { z } from "zod";

export interface RucValidationResult {
  isValid: boolean;
  cleanRuc: string;
  errorMessage?: string;
  entityType?: "Persona Natural con Negocio" | "Persona Jurídica" | "Otros";
}

export interface PhoneValidationResult {
  isValid: boolean;
  cleanPhone: string;
  errorMessage?: string;
}

/**
 * Validates a Peruvian RUC (11 numeric digits) using SUNAT's weighted Modulo 11 algorithm (HU-12 / CP-01).
 * Valid prefixes: 10, 15, 17, 20.
 * Weights: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
 */
export function validatePeruvianRUC(rawInput: string | null | undefined): RucValidationResult {
  if (!rawInput || typeof rawInput !== "string" || rawInput.trim() === "") {
    return {
      isValid: false,
      cleanRuc: "",
      errorMessage: "Debe ingresar el RUC de la empresa",
    };
  }

  // Sanitization: remove spaces and non-numeric characters (ESC-01.07 & ESC-01.14)
  const clean = rawInput.trim().replace(/\D/g, "");

  // Check character count (ESC-01.03 & ESC-01.04)
  if (clean.length !== 11) {
    return {
      isValid: false,
      cleanRuc: clean,
      errorMessage: "El RUC debe constar de 11 dígitos numéricos",
    };
  }

  // Prevent repeat zeroes (ESC-01.08)
  if (/^0{11}$/.test(clean)) {
    return {
      isValid: false,
      cleanRuc: clean,
      errorMessage: "RUC no válido ante SUNAT. Verifique el número ingresado",
    };
  }

  // Validate SUNAT prefixes: 10, 15, 17, 20 (ESC-01.06)
  const prefix = clean.substring(0, 2);
  const validPrefixes = ["10", "15", "17", "20"];
  if (!validPrefixes.includes(prefix)) {
    return {
      isValid: false,
      cleanRuc: clean,
      errorMessage: "El RUC debe comenzar con 10, 15, 17 o 20",
    };
  }

  // Modulo 11 Weighted Algorithm
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const digit = parseInt(clean.charAt(i), 10);
    const weight = weights[i] ?? 0;
    sum += digit * weight;
  }

  const remainder = sum % 11;
  let expectedVerifier = 11 - remainder;

  if (expectedVerifier === 10) expectedVerifier = 0;
  if (expectedVerifier === 11) expectedVerifier = 1;

  const actualVerifier = parseInt(clean.charAt(10), 10);

  if (actualVerifier !== expectedVerifier) {
    return {
      isValid: false,
      cleanRuc: clean,
      errorMessage: "RUC no válido ante SUNAT. Verifique el número ingresado",
    };
  }

  const entityType =
    prefix === "10"
      ? "Persona Natural con Negocio"
      : prefix === "20"
      ? "Persona Jurídica"
      : "Otros";

  return {
    isValid: true,
    cleanRuc: clean,
    entityType,
  };
}

/**
 * Validates Peruvian Mobile Phone (9 digits starting with 9).
 * Normalizes international prefix +51 (ESC-01.10, ESC-01.11, ESC-01.12, ESC-01.15).
 */
export function validatePeruvianPhone(rawInput: string | null | undefined): PhoneValidationResult {
  if (!rawInput || typeof rawInput !== "string" || rawInput.trim() === "") {
    return {
      isValid: false,
      cleanPhone: "",
      errorMessage: "Debe ingresar el número celular de contacto",
    };
  }

  // Strip international prefix +51, whitespace and symbols
  let clean = rawInput.trim().replace(/\D/g, "");
  if (clean.startsWith("51") && clean.length === 11) {
    clean = clean.substring(2);
  }

  if (clean.length < 9) {
    return {
      isValid: false,
      cleanPhone: clean,
      errorMessage: "El celular debe tener 9 dígitos",
    };
  }

  if (clean.length > 9) {
    return {
      isValid: false,
      cleanPhone: clean,
      errorMessage: "El celular debe tener 9 dígitos",
    };
  }

  if (!clean.startsWith("9")) {
    return {
      isValid: false,
      cleanPhone: clean,
      errorMessage: "El formato móvil de Perú debe comenzar con 9",
    };
  }

  return {
    isValid: true,
    cleanPhone: clean,
  };
}

// Zod Schemas for Form Validation
export const RucSchema = z
  .string()
  .min(1, "Debe ingresar el RUC de la empresa")
  .refine((val) => validatePeruvianRUC(val).isValid, {
    message: "RUC no válido ante SUNAT. Verifique el número ingresado",
  });

export const PhoneSchema = z
  .string()
  .min(1, "Debe ingresar el celular de contacto")
  .refine((val) => validatePeruvianPhone(val).isValid, {
    message: "El formato móvil de Perú debe comenzar con 9 y tener 9 dígitos",
  });

export const B2BQuoteOrderSchema = z.object({
  ruc: RucSchema,
  businessName: z.string().min(2, "La razón social debe tener al menos 2 caracteres"),
  contactPhone: PhoneSchema,
  destinationDepartment: z.string().min(2, "Debe seleccionar la región de entrega"),
  orderNotes: z.string().max(500).optional(),
});

export type B2BQuoteOrderForm = z.infer<typeof B2BQuoteOrderSchema>;
