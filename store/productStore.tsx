import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IProductStore {
  image: any;
  isError: boolean;
  setError: (isError: boolean) => void;
  setImage: (image: any) => void;
}

export const useProductStore = create(
  devtools<IProductStore>((set) => ({
    image: null,
    isError: false,
    setError: (isError: boolean) => set({ isError }),
    setImage: (image: any) => set({ image }),
  }))
);
