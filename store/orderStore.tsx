import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { OrderItem } from "@prisma/client";

interface IOrderStore {
  isDisabled: boolean;
  setIsDisabled: () => void;
}

export const useOrderStore = create(
  devtools<IOrderStore>((set) => ({
    isDisabled: false,
    setIsDisabled: () => set((state) => ({ isDisabled: !state.isDisabled })),
  }))
);
