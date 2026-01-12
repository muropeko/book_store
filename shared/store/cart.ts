import { create } from "zustand";
import { Cart } from "@prisma/client";
import { addCartItem, deleteCartItem, fetchCart, subtractCartItem } from "app/actions";
import { CartWithItems } from "prisma/types";

interface IState {
  cart: CartWithItems | null;
  loading: boolean;
  error: string | null;
  loadCart: () => Promise<void>;
  addItem: (bookItemId: number, quantity?: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  subtractItem: (bookItemId: number, quantity?: number) => Promise<void>
}

export const cartStore = create<IState>((set) => ({
  cart: null,
  loading: false,
  error: null,

  loadCart: async () => {
    set({ loading: true, error: null });
    try {
      const cart = await fetchCart();
      set({ cart, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  addItem: async (bookItemId, quantity = 1) => {
    set({ loading: true, error: null });
    try {
      const updatedCart = await addCartItem(bookItemId, quantity);
      set({ cart: updatedCart, loading: false });
      console.log(updatedCart)
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  removeItem: async (cartItemId) => {
    set({ loading: true, error: null });
    try {
      const updatedCart = await deleteCartItem(cartItemId);
      set({ cart: updatedCart, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  subtractItem: async (bookItemId: number, quantity = 1) => {
    set({ loading: true, error: null });
    try {
      const updatedCart = await subtractCartItem(bookItemId, quantity);
      set({ cart: updatedCart, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));

export const useCart = () => cartStore();