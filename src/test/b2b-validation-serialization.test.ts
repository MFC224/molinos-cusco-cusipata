import { describe, it, expect, beforeEach } from "vitest";
import { validatePeruvianRUC, validatePeruvianPhone, RucSchema, PhoneSchema } from "@/lib/validators/rucValidator";
import { useCartStore } from "@/store/useCartStore";
import { buildWhatsAppPayload, resolveRegionalPhone } from "@/lib/whatsapp-serializer";
import { PRODUCTS_CATALOG } from "@/lib/products-data";

describe("Sprint 5: Matriz CP-01 (15 Escenarios de Validación de RUC y Celular)", () => {
  // ESC-01.01: RUC: 20114918718 (Molinos Cusco S.A.), Cel: 984630970
  it("ESC-01.01: approves valid official corporate RUC 20114918718 and cell 984630970", () => {
    const rucRes = validatePeruvianRUC("20114918718");
    expect(rucRes.isValid).toBe(true);
    expect(rucRes.entityType).toBe("Persona Jurídica");

    const phoneRes = validatePeruvianPhone("984630970");
    expect(phoneRes.isValid).toBe(true);
    expect(phoneRes.cleanPhone).toBe("984630970");
  });

  // ESC-01.02: RUC: 10458923411 (Persona Natural con Negocio), Cel: 932331672
  it("ESC-01.02: approves valid natural person RUC prefix 10 and cell 932331672", () => {
    // 1045892341: sum = 1*5 + 0*4 + 4*3 + 5*2 + 8*7 + 9*6 + 2*5 + 3*4 + 4*3 + 1*2
    // 5 + 0 + 12 + 10 + 56 + 54 + 10 + 12 + 12 + 2 = 173 % 11 = 8. 11 - 8 = 3.
    // Let's test a valid prefix 10 RUC:
    // 10458923413 -> sum 173 % 11 = 8 => verifier 3
    const rucRes = validatePeruvianRUC("10458923413");
    expect(rucRes.isValid).toBe(true);
    expect(rucRes.entityType).toBe("Persona Natural con Negocio");

    const phoneRes = validatePeruvianPhone("932331672");
    expect(phoneRes.isValid).toBe(true);
  });

  // ESC-01.03: RUC: 2011491871 (10 dígitos exactos)
  it("ESC-01.03: rejects RUC with 10 digits", () => {
    const res = validatePeruvianRUC("2011491871");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El RUC debe constar de 11 dígitos numéricos");
  });

  // ESC-01.04: RUC: 201149187189 (12 dígitos numéricos)
  it("ESC-01.04: rejects RUC with 12 digits", () => {
    const res = validatePeruvianRUC("201149187189");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El RUC debe constar de 11 dígitos numéricos");
  });

  // ESC-01.05: RUC: 20114918719 (11 dígitos, dígito verificador adulterado)
  it("ESC-01.05: detects altered verification digit via Modulo 11", () => {
    const res = validatePeruvianRUC("20114918719");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("RUC no válido ante SUNAT. Verifique el número ingresado");
  });

  // ESC-01.06: RUC: 15114918718 (Prefijo no asignado / inválido)
  it("ESC-01.06: rejects unassigned SUNAT prefix like 30 or 12", () => {
    const res = validatePeruvianRUC("30114918718");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El RUC debe comenzar con 10, 15, 17 o 20");
  });

  // ESC-01.07: RUC: 20ABC918718 (Caracteres alfabéticos intercalados)
  it("ESC-01.07: sanitizes alphabetical characters safely", () => {
    // 20ABC114918718 -> non-digits stripped -> 20114918718 -> valid!
    const res = validatePeruvianRUC("20ABC114918718");
    expect(res.isValid).toBe(true);
    expect(res.cleanRuc).toBe("20114918718");
  });

  // ESC-01.08: RUC: 00000000000 (Cadena de ceros repetidos)
  it("ESC-01.08: rejects sequence of all zeros", () => {
    const res = validatePeruvianRUC("00000000000");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toContain("RUC no válido ante SUNAT");
  });

  // ESC-01.09: RUC: vacío ""
  it("ESC-01.09: blocks empty string input", () => {
    const res = validatePeruvianRUC("");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("Debe ingresar el RUC de la empresa");
  });

  // ESC-01.10: Celular: 98463097 (8 dígitos exactos)
  it("ESC-01.10: rejects phone number with 8 digits", () => {
    const res = validatePeruvianPhone("98463097");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El celular debe tener 9 dígitos");
  });

  // ESC-01.11: Celular: 9846309701 (10 dígitos exactos)
  it("ESC-01.11: rejects phone number with 10 digits", () => {
    const res = validatePeruvianPhone("9846309701");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El celular debe tener 9 dígitos");
  });

  // ESC-01.12: Celular: 884630970 (Inicia con dígito distinto de 9)
  it("ESC-01.12: rejects mobile phone not starting with 9", () => {
    const res = validatePeruvianPhone("884630970");
    expect(res.isValid).toBe(false);
    expect(res.errorMessage).toBe("El formato móvil de Perú debe comenzar con 9");
  });

  // ESC-01.13: Inyección SQL/XSS en campo RUC
  it("ESC-01.13: sanitizes SQL/XSS injection attempts safely", () => {
    const maliciousInput = "20114918718'; DROP TABLE--";
    const res = validatePeruvianRUC(maliciousInput);
    // Non-digits stripped -> exactly 20114918718
    expect(res.cleanRuc).toBe("20114918718");
    expect(res.isValid).toBe(true);
  });

  // ESC-01.14: RUC con espacios intermedios: 20 114 918 718
  it("ESC-01.14: normalizes RUC with whitespace", () => {
    const res = validatePeruvianRUC("20 114 918 718");
    expect(res.isValid).toBe(true);
    expect(res.cleanRuc).toBe("20114918718");
  });

  // ESC-01.15: RUC válido y Teléfono con prefijo internacional +51984630970
  it("ESC-01.15: strips +51 country code normalizing to 9 digits", () => {
    const res = validatePeruvianPhone("+51 984 630 970");
    expect(res.isValid).toBe(true);
    expect(res.cleanPhone).toBe("984630970");
  });
});

describe("Sprint 5: Matriz CP-02 (Gestión de Cantidades y Volúmenes en Cart Store)", () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  // ESC-02.01: Q = 0 -> Remoción automática
  it("ESC-02.01: removes item when quantity is updated to 0", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 5);
    expect(useCartStore.getState().items).toHaveLength(1);

    useCartStore.getState().updateQuantity(product.id, 0);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  // ESC-02.02: Q = 1 caja (Mínimo absoluto)
  it("ESC-02.02: accepts minimum quantity of 1", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 1);
    expect(useCartStore.getState().getTotalUnits()).toBe(1);
    expect(useCartStore.getState().getTotalWeightKg()).toBe(product.weightNetKg);
  });

  // ESC-02.03: Q = 2 cajas -> Cálculo exacto de peso
  it("ESC-02.03: calculates total weight correctly for 2 items", () => {
    const product = PRODUCTS_CATALOG[1]!; // Saco 10kg
    useCartStore.getState().addItem(product, 2);
    expect(useCartStore.getState().getTotalWeightKg()).toBe(20.0);
  });

  // ESC-02.05: Q = 500 cajas -> Activa flete bonificado en ruta
  it("ESC-02.05: activates freight discount banner at 500 units threshold", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 499);
    expect(useCartStore.getState().hasFreightDiscount()).toBe(false);

    useCartStore.getState().updateQuantity(product.id, 500);
    expect(useCartStore.getState().hasFreightDiscount()).toBe(true);
  });

  // ESC-02.08 & ESC-02.09: Límite superior de 1000 unidades
  it("ESC-02.08: clamps order quantity to 1000 units maximum", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 1500);
    expect(useCartStore.getState().getTotalUnits()).toBe(1000);
  });

  // ESC-02.10: Valor negativo -> Bloqueo / remoción
  it("ESC-02.10: removes item when negative value is supplied", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 10);
    useCartStore.getState().updateQuantity(product.id, -5);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  // ESC-02.11: Decimal Q = 12.5 -> Convertido a entero
  it("ESC-02.11: rounds decimal quantities to integer", () => {
    const product = PRODUCTS_CATALOG[0]!;
    useCartStore.getState().addItem(product, 12.5);
    expect(useCartStore.getState().getTotalUnits()).toBe(12);
  });

  // ESC-02.14: Vaciado total del cotizador
  it("ESC-02.14: clears cart returning to empty state", () => {
    const p1 = PRODUCTS_CATALOG[0]!;
    const p2 = PRODUCTS_CATALOG[1]!;
    useCartStore.getState().addItem(p1, 10);
    useCartStore.getState().addItem(p2, 20);

    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useCartStore.getState().getTotalUnits()).toBe(0);
  });
});

describe("Sprint 5: Matriz CP-05 (Serialización de Payload y Enrutamiento Regional WhatsApp)", () => {
  // ESC-05.01: Destino Cusco -> asigna 51984630970
  it("ESC-05.01: routes Cusco destination to Sede Central 51984630970", () => {
    const res = resolveRegionalPhone("Cusco");
    expect(res.phone).toBe("51984630970");
  });

  // ESC-05.02: Destino Sicuani -> asigna 51932331672 (Planta Cusipata)
  it("ESC-05.02: routes Sicuani destination to Planta Cusipata 51932331672", () => {
    const res = resolveRegionalPhone("Sicuani");
    expect(res.phone).toBe("51932331672");
    expect(res.channelName).toContain("Planta Cusipata");
  });

  // ESC-05.03: Destino Puno / Juliaca -> asigna 51932331672
  it("ESC-05.03: routes Puno/Juliaca to Canal Sur Altiplano 51932331672", () => {
    const res = resolveRegionalPhone("Puno / Juliaca");
    expect(res.phone).toBe("51932331672");
    expect(res.channelName).toContain("Altiplano");
  });

  // ESC-05.04: Destino Arequipa -> asigna 51984630970
  it("ESC-05.04: routes Arequipa destination to 51984630970", () => {
    const res = resolveRegionalPhone("Arequipa");
    expect(res.phone).toBe("51984630970");
  });

  // ESC-05.06: Destino Lima Metropolitana -> asigna 51984630970
  it("ESC-05.06: routes Lima destination to 51984630970", () => {
    const res = resolveRegionalPhone("Lima Metropolitana");
    expect(res.phone).toBe("51984630970");
  });

  // ESC-05.07: Razón social con ampersand ("Hnos & Cía")
  it("ESC-05.07: encodes business name with ampersand cleanly without breaking parameters", () => {
    const payload = buildWhatsAppPayload({
      businessName: "Hnos & Cía S.A.C.",
      ruc: "20114918718",
      contactPhone: "984630970",
      destinationRegion: "Cusco",
      items: [
        {
          productId: "p1",
          skuCode: "CUS-40-500",
          name: "Tallarín #40",
          format: "Bolsa 500g",
          unitWeightKg: 0.5,
          quantity: 100,
          glowColor: "#9E1B1B",
        },
      ],
    });

    expect(payload.url).toContain("https://wa.me/51984630970?text=");
    expect(payload.encodedPayload).toContain("Hnos%20%26%20C%C3%ADa");
    // Verify decode restores exact string
    const decoded = decodeURIComponent(payload.encodedPayload);
    expect(decoded).toContain("Hnos & Cía S.A.C.");
  });

  // ESC-05.08: Inclusión de saltos de línea estructurados (%0A)
  it("ESC-05.08: formats newlines as %0A in encoded URL", () => {
    const payload = buildWhatsAppPayload({
      businessName: "Distribuidora Andina",
      ruc: "20114918718",
      contactPhone: "984630970",
      destinationRegion: "Cusco",
      items: [],
    });

    expect(payload.encodedPayload).toContain("%0A");
  });

  // ESC-05.09: Verificación de peso total en mensaje ("Peso Total Estimado: X,XXX.XX kg")
  it("ESC-05.09: includes explicit Peso Total Estimado line", () => {
    const payload = buildWhatsAppPayload({
      businessName: "Molinos Cusco Demo",
      ruc: "20114918718",
      contactPhone: "984630970",
      destinationRegion: "Cusco",
      items: [
        {
          productId: "saco-10k",
          skuCode: "CUS-40-10K",
          name: "Tallarín 10kg",
          format: "Saco 10kg",
          unitWeightKg: 10.0,
          quantity: 150,
          glowColor: "#9E1B1B",
        },
      ],
    });

    // 150 * 10kg = 1,500.00 kg
    expect(payload.rawMessage).toContain("Peso Total Estimado: 1,500.00 kg");
  });
});
