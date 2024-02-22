import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OrderItem } from "@prisma/client";

interface IOrderStore {
  items: string[];
  setItems: (items: OrderItem) => void;
  resetItems: () => void;
}

export const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    items: [],
    setItems: (item: OrderItem) =>
      set((state) => ({ items: [...state.items, item.id] })),
    resetItems: () => set({ items: [] }),
  }))
);
