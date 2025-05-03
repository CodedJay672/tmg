"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  imgUrl: string;
}

interface TCartState {
  cart: TCart[];
  showPopover: boolean;
  togglePopover: () => void;
  addToCart: (product: TProduct) => void;
  changeQty: (type: string, product: TCart) => void;
  clearCart: (id?: string) => void;
  showDropdown: boolean;
  toggleDropdown: () => void;
}

export const useStore = create<TCartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],

        // add products to cart
        addToCart: (product: TProduct) =>
          set((state) => {
            return { cart: [{ ...product, qty: 1 }, ...state.cart] };
          }),

        //clear the cart
        clearCart: (id?: string) =>
          set((state) => {
            if (!id) return { cart: [] };

            const filteredData = state.cart.filter((item) => item.id !== id);
            return { cart: [...filteredData] };
          }),

        //update product quantity
        changeQty: (type: string, product: TCart) =>
          set((state) => {
            const newCart = state.cart.map((item) => {
              if (item.id === product.id) {
                if (type === "increase")
                  return { ...product, qty: product.qty + 1 };

                return { ...product, qty: product.qty - 1 };
              }

              return item;
            });
            return { cart: [...newCart] };
          }),

        // hide/show popover sheet
        showPopover: false,

        //toggle the popover sheet
        togglePopover: () =>
          set((state) => ({ showPopover: !state.showPopover })),

        //showDropdown
        showDropdown: false,

        //toggle dropdown
        toggleDropdown: () =>
          set((state) => ({ showDropdown: !state.showDropdown })),
      }),
      {
        name: "cart-storage",
        partialize: (state) => ({ cart: state.cart }),
      }
    )
  )
);
