import { create } from "zustand";
import { AuthDisplayStoreType } from "./storeTypes";

export const useAuthDisplayStore = create<AuthDisplayStoreType>((set) => ({
  show: false,
  toggle: (value?: boolean) =>
    set((state) => ({ show: value ? value : !state.show })),
}));
