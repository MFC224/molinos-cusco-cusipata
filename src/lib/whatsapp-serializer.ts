import { CartItem } from "@/store/useCartStore";

export interface WhatsAppOrderParams {
  businessName: string;
  ruc: string;
  contactPhone: string;
  destinationRegion: string;
  items: CartItem[];
  orderNotes?: string;
  quoteId?: string;
}

export interface WhatsAppSerializerResult {
  url: string;
  destinationPhone: string;
  channelName: string;
  encodedPayload: string;
  rawMessage: string;
}

/**
 * Resolves corporate commercial WhatsApp line according to target destination (CP-05).
 */
export function resolveRegionalPhone(destination: string): { phone: string; channelName: string } {
  const norm = destination.trim().toLowerCase();

  // Sede Planta Cusipata / Canal Sur Altiplano (+51 932 331 672)
  if (norm.includes("sicuani") || norm.includes("cusipata") || norm.includes("canas") || norm.includes("canches")) {
    return { phone: "51932331672", channelName: "Sede Planta Cusipata (Canal Preferente Planta)" };
  }
  if (norm.includes("puno") || norm.includes("juliaca") || norm.includes("altiplano") || norm.includes("ayaviri") || norm.includes("ilave")) {
    return { phone: "51932331672", channelName: "Canal Sur Altiplano (Planta Cusipata)" };
  }

  // Sede Comercial Cusco / Despacho Troncal (+51 984 630 970)
  if (norm.includes("arequipa")) {
    return { phone: "51984630970", channelName: "Canal Arequipa / Costa (Sede Cusco)" };
  }
  if (norm.includes("apurimac") || norm.includes("apurímac") || norm.includes("abancay") || norm.includes("andahuaylas")) {
    return { phone: "51984630970", channelName: "Canal Sierra Central / Abancay (Sede Cusco)" };
  }
  if (norm.includes("lima") || norm.includes("callao")) {
    return { phone: "51984630970", channelName: "Ventas Corporativas Capital (Lima / Cusco)" };
  }

  // Default: Sede Cusco
  return { phone: "51984630970", channelName: "Sede Central Cusco (Distribución)" };
}

/**
 * Generates deterministically formatted WhatsApp payload and wa.me URL (HU-13 / CP-05).
 */
export function buildWhatsAppPayload(params: WhatsAppOrderParams): WhatsAppSerializerResult {
  const { businessName, ruc, contactPhone, destinationRegion, items, orderNotes, quoteId } = params;

  const { phone, channelName } = resolveRegionalPhone(destinationRegion);
  const qId = quoteId || `MC-${Date.now().toString().slice(-6)}`;

  const totalUnits = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalWeightKg = items.reduce((acc, i) => acc + i.quantity * i.unitWeightKg, 0);
  const totalWeightFormatted = totalWeightKg.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const hasFreightDiscount = totalUnits >= 500;

  // Build message lines
  const lines: string[] = [
    `*SOLICITUD DE COTIZACIÓN MAYORISTA B2B*`,
    `*MOLINOS CUSCO S.A. — FIDEOS CUSIPATA*`,
    `_ID Requerimiento: ${qId}_`,
    ``,
    `*1. DATOS FISCALES DEL CLIENTE:*`,
    `• Razón Social: ${businessName}`,
    `• RUC: ${ruc}`,
    `• Celular: ${contactPhone}`,
    `• Destino de Entrega: ${destinationRegion}`,
    ``,
    `*2. DESGLOSE DE PRODUCTOS (SKU):*`,
  ];

  items.forEach((item, idx) => {
    const itemSubtotalKg = (item.quantity * item.unitWeightKg).toFixed(1);
    lines.push(
      `${idx + 1}. [${item.skuCode}] ${item.name} (${item.format}) — *${item.quantity} unid.* [${itemSubtotalKg} kg]`
    );
  });

  lines.push(``);
  lines.push(`*3. RESUMEN LOGÍSTICO:*`);
  lines.push(`• Total Unidades / Bultos: ${totalUnits}`);
  lines.push(`• Peso Total Estimado: ${totalWeightFormatted} kg`);

  if (hasFreightDiscount) {
    lines.push(`• ⭐ *Aplica Descuento de Flete en Ruta* (Pedido ≥ 500 unidades)`);
  }

  if (orderNotes && orderNotes.trim().length > 0) {
    lines.push(``);
    lines.push(`*4. OBSERVACIONES DE DESPACHO:*`);
    lines.push(`${orderNotes.trim()}`);
  }

  lines.push(``);
  lines.push(`_Mensaje emitido desde el portal oficial de Molinos Cusco S.A._`);
  lines.push(`_Planta Industrial Km 76 Cusco-Sicuani, Cusipata · Sede Cusco_`);

  const rawMessage = lines.join("\n");
  const encodedPayload = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${phone}?text=${encodedPayload}`;

  return {
    url,
    destinationPhone: phone,
    channelName,
    encodedPayload,
    rawMessage,
  };
}
