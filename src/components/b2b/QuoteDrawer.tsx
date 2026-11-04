"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { validatePeruvianRUC, validatePeruvianPhone } from "@/lib/validators/rucValidator";
import { buildWhatsAppPayload, resolveRegionalPhone } from "@/lib/whatsapp-serializer";
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  Truck,
  Building2,
  Phone,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const REGIONS = [
  "Cusco (Sede Central / Alrededores)",
  "Sicuani (Planta Cusipata / Canchis)",
  "Puno / Juliaca (Canal Altiplano)",
  "Arequipa (Canal Sur Costa)",
  "Apurímac (Abancay / Andahuaylas)",
  "Lima Metropolitana",
  "Otras Regiones del Sur",
];

export function QuoteDrawer(): React.JSX.Element | null {
  const {
    items,
    isDrawerOpen,
    setDrawerOpen,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    clearCart,
    customerRuc,
    businessName,
    contactPhone,
    destinationRegion,
    orderNotes,
    setCustomerInfo,
    getTotalUnits,
    getTotalWeightKg,
    hasFreightDiscount,
    getEstimatedVolumeM3,
  } = useCartStore();

  const [rucTouched, setRucTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const rucValidation = validatePeruvianRUC(customerRuc);
  const phoneValidation = validatePeruvianPhone(contactPhone);
  const isFormValid = rucValidation.isValid && phoneValidation.isValid && businessName.trim().length >= 2;

  // Regional routing details
  const regionalInfo = resolveRegionalPhone(destinationRegion);

  // Trap focus & handle Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.preventDefault();
        setDrawerOpen(false);
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, setDrawerOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleSendWhatsApp = (): void => {
    if (!isFormValid || items.length === 0) return;

    const { url } = buildWhatsAppPayload({
      businessName,
      ruc: rucValidation.cleanRuc,
      contactPhone: phoneValidation.cleanPhone,
      destinationRegion,
      items,
      orderNotes,
    });

    // Open WhatsApp in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const totalUnits = getTotalUnits();
  const totalWeightKg = getTotalWeightKg();
  const freightDiscount = hasFreightDiscount();
  const volumeM3 = getEstimatedVolumeM3();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cajón de Cotización Mayorista B2B"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Surface */}
      <div
        ref={drawerRef}
        className="relative z-10 flex h-full w-full max-w-xl flex-col bg-[#FAF6F0] text-[#1C1917] shadow-2xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-200 bg-[#FAF6F0]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9E1B1B] text-[#FAF6F0] shadow-md">
              <ShoppingBag className="h-5 w-5 text-[#F5C768]" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                Cotizador Mayorista B2B
              </h3>
              <p className="text-[11px] font-mono text-stone-500">
                Molinos Cusco S.A. · {items.length} {items.length === 1 ? "referencia" : "referencias"}
              </p>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-200 hover:text-black focus-visible:ring-2 focus-visible:ring-[#D99B26]"
            aria-label="Cerrar cotizador"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {items.length === 0 ? (
            /* Empty Cart View */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="mt-4 font-serif text-lg font-bold text-[#1C1917]">
                Su lista de cotización está vacía
              </h4>
              <p className="mt-2 max-w-xs text-xs text-stone-500 font-sans">
                Explore nuestro catálogo de fideos al huevo, línea andina y sacos industriales para
                agregar pedidos por mayor.
              </p>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#9E1B1B] px-5 py-2.5 text-xs font-bold text-[#FAF6F0] shadow-md hover:bg-[#7D1414]"
              >
                <span>Explorar Catálogo</span>
              </button>
            </div>
          ) : (
            <>
              {/* Freight Discount Banner */}
              {freightDiscount && (
                <div className="flex items-center gap-2.5 rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900 shadow-xs">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>
                    ⭐ <strong>¡Flete Bonificado en Ruta Activado!</strong> Su pedido supera las 500
                    unidades y califica para tarifa preferente de despacho.
                  </span>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                  <span>Productos Seleccionados</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-red-700 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" /> Vaciar lista
                  </button>
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-3 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-2 w-2 rounded-full shrink-0"
                          style={{ backgroundColor: item.glowColor }}
                        />
                        <div>
                          <span className="font-mono text-[10px] text-stone-400 block uppercase">
                            {item.skuCode}
                          </span>
                          <strong className="text-xs text-[#1C1917] block leading-snug">
                            {item.name}
                          </strong>
                          <span className="font-mono text-[11px] text-stone-500">
                            {item.format} · {(item.unitWeightKg * item.quantity).toFixed(1)} kg
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.productId)}
                            className="p-1.5 text-stone-500 hover:text-black focus-visible:outline-none"
                            aria-label={`Reducir cantidad de ${item.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            max={1000}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value, 10) || 1)
                            }
                            className="w-12 text-center font-mono text-xs font-bold bg-transparent focus:outline-none"
                            aria-label={`Cantidad de ${item.name}`}
                          />
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.productId)}
                            className="p-1.5 text-stone-500 hover:text-black focus-visible:outline-none"
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          className="p-1 text-stone-400 hover:text-red-700"
                          aria-label={`Eliminar ${item.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fiscal Form: RUC, Business Name, Phone, Destination */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-4">
                <h4 className="font-serif text-sm font-bold text-[#1C1917] flex items-center gap-1.5 border-b border-stone-100 pb-2">
                  <Building2 className="h-4 w-4 text-[#9E1B1B]" />
                  <span>Datos Fiscales para Cotización</span>
                </h4>

                {/* RUC Field with Módulo 11 validation (HU-12 / CP-01) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="customer-ruc" className="block font-mono text-xs text-stone-600">
                      RUC Peruano (11 dígitos):
                    </label>
                    {rucTouched && rucValidation.isValid && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold">
                        <CheckCircle2 className="h-3 w-3" />
                        {rucValidation.entityType}
                      </span>
                    )}
                  </div>
                  <input
                    id="customer-ruc"
                    type="text"
                    maxLength={13}
                    value={customerRuc}
                    onBlur={() => setRucTouched(true)}
                    onChange={(e) => {
                      setCustomerInfo({ ruc: e.target.value });
                    }}
                    placeholder="Ej. 20114918718"
                    className={`w-full rounded-lg border px-3 py-2 font-mono text-xs focus:outline-none ${
                      rucTouched && !rucValidation.isValid
                        ? "border-red-500 bg-red-50 text-red-900"
                        : "border-stone-300 bg-stone-50 text-stone-900 focus:border-[#D99B26]"
                    }`}
                  />
                  {rucTouched && !rucValidation.isValid && (
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-red-700">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>{rucValidation.errorMessage}</span>
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="business-name" className="block font-mono text-xs text-stone-600 mb-1">
                    Razón Social / Nombre Comercial:
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    value={businessName}
                    onChange={(e) => setCustomerInfo({ businessName: e.target.value })}
                    placeholder="Ej. Comercializadora Sur Andino S.A.C."
                    className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-xs text-stone-900 focus:border-[#D99B26] focus:outline-none"
                  />
                </div>

                {/* Phone & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-phone" className="block font-mono text-xs text-stone-600 mb-1">
                      Celular (9 dígitos):
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      maxLength={12}
                      value={contactPhone}
                      onBlur={() => setPhoneTouched(true)}
                      onChange={(e) => setCustomerInfo({ contactPhone: e.target.value })}
                      placeholder="984630970"
                      className={`w-full rounded-lg border px-3 py-2 font-mono text-xs focus:outline-none ${
                        phoneTouched && !phoneValidation.isValid
                          ? "border-red-500 bg-red-50 text-red-900"
                          : "border-stone-300 bg-stone-50 text-stone-900 focus:border-[#D99B26]"
                      }`}
                    />
                    {phoneTouched && !phoneValidation.isValid && (
                      <p className="mt-1 text-[10px] text-red-700">
                        {phoneValidation.errorMessage}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="destination-region" className="block font-mono text-xs text-stone-600 mb-1">
                      Destino de Entrega:
                    </label>
                    <select
                      id="destination-region"
                      value={destinationRegion}
                      onChange={(e) => setCustomerInfo({ destinationRegion: e.target.value })}
                      className="w-full rounded-lg border border-stone-300 bg-stone-50 px-2 py-2 text-xs text-stone-900 focus:border-[#D99B26] focus:outline-none"
                    >
                      {REGIONS.map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Channel Assignment Indicator (CP-05) */}
                <div className="rounded-lg bg-stone-50 p-2.5 border border-stone-200 text-[11px] font-mono text-stone-600 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#9E1B1B]" />
                    <span>Canal Comercial Asignado:</span>
                  </span>
                  <strong className="text-stone-900 font-bold">{regionalInfo.channelName}</strong>
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="rounded-xl border border-[#38332E] bg-[#1C1917] p-4 text-[#FAF6F0] space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Total Bultos / Unidades:</span>
                  <strong className="text-sm text-[#FAF6F0]">{totalUnits} unidades</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Peso Total Consolidado:</span>
                  <strong className="text-base text-[#F5C768] font-bold">
                    {totalWeightKg.toFixed(2)} kg
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Cubicaje Estimado:</span>
                  <strong className="text-stone-300">~{volumeM3} m³</strong>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="sticky bottom-0 z-20 border-t border-stone-200 bg-[#FAF6F0] p-4 space-y-2">
            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleSendWhatsApp}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-lg transition-transform duration-200 ${
                isFormValid
                  ? "bg-[#25D366] text-stone-950 hover:bg-[#20ba5a] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-emerald-700"
                  : "bg-stone-300 text-stone-500 cursor-not-allowed"
              }`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Solicitar Cotización por WhatsApp</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            {!isFormValid && (
              <p className="text-center text-[11px] text-stone-500 font-mono">
                * Ingrese RUC válido (Módulo 11) y celular de 9 dígitos para despachar.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
