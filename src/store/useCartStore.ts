"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductSKU, PackagingFormat } from "@/lib/products-data";

export interface CartItem {
  productId: string;
  skuCode: string;
  name: string;
  format: PackagingFormat;
  unitWeightKg: number;
  quantity: number;
  glowColor: string;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  // Customer & Shipping Info
  customerRuc: string;
  businessName: string;
  contactPhone: string;
  destinationRegion: string;
  orderNotes: string;

  // Actions
  addItem: (product: ProductSKU, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setCustomerInfo: (info: {
    ruc?: string;
    businessName?: string;
    contactPhone?: string;
    destinationRegion?: string;
    orderNotes?: string;
  }) => void;

  // Metrics
  getTotalUnits: () => number;
  getTotalWeightKg: () => number;
  hasFreightDiscount: () => boolean;
  getEstimatedVolumeM3: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      customerRuc: "",
      businessName: "",
      contactPhone: "",
      destinationRegion: "Cusco",
      orderNotes: "",

      addItem: (product, quantity = 1) => {
        const cleanQty = Math.max(1, Math.min(1000, Math.floor(quantity)));
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, quantity: Math.min(1000, i.quantity + cleanQty) }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                skuCode: product.skuCode,
                name: product.name,
                format: product.format,
                unitWeightKg: product.weightNetKg,
                quantity: cleanQty,
                glowColor: product.glowColor,
              },
            ],
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        const intQty = Math.floor(quantity);
        if (intQty <= 0) {
          // Automatic removal on zero or negative (ESC-02.01, ESC-02.10)
          get().removeItem(productId);
          return;
        }

        const clamped = Math.min(1000, intQty);
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: clamped } : i
          ),
        }));
      },

      incrementQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(1000, i.quantity + 1) }
              : i
          ),
        }));
      },

      decrementQuantity: (productId) => {
        set((state) => {
          const item = state.items.find((i) => i.productId === productId);
          if (!item) return state;

          if (item.quantity <= 1) {
            return {
              items: state.items.filter((i) => i.productId !== productId),
            };
          }

          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      setDrawerOpen: (isOpen) => {
        set({ isDrawerOpen: isOpen });
      },

      setCustomerInfo: (info) => {
        set((state) => ({
          ...state,
          ...(info.ruc !== undefined ? { customerRuc: info.ruc } : {}),
          ...(info.businessName !== undefined ? { businessName: info.businessName } : {}),
          ...(info.contactPhone !== undefined ? { contactPhone: info.contactPhone } : {}),
          ...(info.destinationRegion !== undefined ? { destinationRegion: info.destinationRegion } : {}),
          ...(info.orderNotes !== undefined ? { orderNotes: info.orderNotes } : {}),
        }));
      },

      getTotalUnits: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getTotalWeightKg: () => {
        return get().items.reduce((acc, item) => acc + item.quantity * item.unitWeightKg, 0);
      },

      hasFreightDiscount: () => {
        // Threshold: 500 units qualifies for route freight discount (ESC-02.05)
        return get().getTotalUnits() >= 500;
      },

      getEstimatedVolumeM3: () => {
        // Approximate bulk packing volume: 1000kg ~ 1.8m³
        const weight = get().getTotalWeightKg();
        return parseFloat(((weight / 1000) * 1.8).toFixed(2));
      },
    }),
    {
      name: "molinos-cusco-b2b-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        customerRuc: state.customerRuc,
        businessName: state.businessName,
        contactPhone: state.contactPhone,
        destinationRegion: state.destinationRegion,
      }),
    }
  )
);
