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

// 🧩 Hydrate from server-injected script if available
if (typeof window !== "undefined") {
  const script = document.getElementById("__USER__");
  if (script?.textContent) {
    try {
      const initialUser = JSON.parse(script.textContent);
      if (initialUser) {
        useUserStore.getState().setUser(initialUser);
      }
    } catch (err) {
      console.error("Failed to hydrate user store:", err);
    }
  }
}
