import { create } from "zustand";
import { LobbyStoreType } from "../types/storeTypes";

export const useLobbyStore = create<LobbyStoreType>((set) => ({
  selectedGameMode: null,
  setGameMode: (gameMode) => {
    set((state) => ({ selectedGameMode: gameMode }));
  },
}));
