import { create } from "zustand";
import type { PublicUser } from "../types/userPublic";

type UserState = {
  user: PublicUser | null;
  setUser: (user: PublicUser | null) => void;
  updateUser: (data: Partial<PublicUser>) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : state.user,
    })),
  clearUser: () => set({ user: null }),
}));
