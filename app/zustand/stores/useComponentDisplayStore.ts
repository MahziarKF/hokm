import { create } from "zustand";
import { AuthDisplayStoreType } from "../types/storeTypes";

export const useAuthDisplayStore = create<AuthDisplayStoreType>((set) => ({
  show: false,
  toggle: (value?: boolean) =>
    set((state) => ({ show: value ? value : !state.show })),
}));
