"use client";

import { calculateInterest } from "@/lib/utils";
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
  addToCart: (product: TProduct) => void;
  changeQty: (type: string, product: TCart) => void;
  clearCart: (id?: string) => void;
  showProfileMenu: boolean;
  toggleProfileMenu: () => void;
  category: string;
  changeCategory: (cat: string) => void;
  priceByLocation: number;
  setPriceByLocation: (charge: number, price: number) => void;
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

        //profile menu
        showProfileMenu: false,
        toggleProfileMenu: () =>
          set((state) => ({ showProfileMenu: !state.showProfileMenu })),

        //category
        category: "all",
        changeCategory: (cat: string) => set(() => ({ category: cat })),

        // set the price by location
        priceByLocation: 0,
        setPriceByLocation: (charge: number, price: number) =>
          set(() => {
            const interest = calculateInterest(charge, price);

            const total = price + interest;

            return { priceByLocation: total };
          }),
      }),
      {
        name: "cart-storage",
        partialize: (state) => ({ cart: state.cart }),
      }
    )
  )
);
