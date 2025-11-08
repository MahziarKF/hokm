import { create } from "zustand";
import { AuthStore, FormTypeLogin, FormTypeSignup } from "../types/storeTypes";
import { useUserStore } from "./useUserStore";

export const useAuthStore = create<AuthStore>((set, get) => ({
  isLogin: false,
  verificationModal: false,
  accessToken: "",
  form: {
    error: "",
    success: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as FormTypeSignup,

  setVerificationModal: (value) => {
    set({ verificationModal: value });
  },
  setErrorMessage: (msg: string) => {
    set((state) => ({
      form: { ...state.form, error: String(msg) },
    }));
  },
  setSuccessMessage: (msg: string) => {
    set((state) => ({
      form: { ...state.form, success: String(msg) },
    }));
  },
  refreshAccessToken: async (refreshToken: string) => {
    try {
      const userStore = useUserStore.getState();

      const res = await fetch("/api/refreshAccessToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          refreshToken,
          username: userStore.user?.username,
          role: userStore.user?.role,
          gamesplayed: userStore.user?.gamesplayed,
        }),
      });

      // ✅ Parse response JSON
      const data = await res.json();

      if (!res.ok) {
        console.error("Failed to refresh token:", data.error);
        return "";
      }

      // ✅ Use parsed data
      set({ accessToken: data.accessToken });

      return data.accessToken;
    } catch (error) {
      console.log(
        `error while refreshing access token -> AuthStore.ts -> ${error}`
      );
      return "";
    }
  },
  // --- LOGIN ---
  login: async (form: FormTypeLogin) => {
    try {
      if (!form.username || !form.password) {
        get().setErrorMessage("نام کاربری و رمز عبور الزامی است.");
        return;
      }

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        get().setErrorMessage(data.error || "خطا در ورود.");
        return;
      }

      // ✅ Update user store
      const userStore = useUserStore.getState();
      userStore.setUser(data.user); // data.user should match PublicUser shape

      get().setSuccessMessage(data.message || "ورود موفقیت‌آمیز بود.");
      set(() => ({ isLogin: true, accessToken: data.accessToken }));
    } catch (error) {
      console.error(`error in login(): ${error}`);
      get().setErrorMessage("مشکلی پیش آمده است.");
    }
  },

  // --- SIGNUP ---
  signup: async (form: FormTypeSignup) => {
    try {
      if (form.password !== form.confirmPassword) {
        get().setErrorMessage("رمز عبور و تکرار آن مطابقت ندارند.");
        return;
      }
      if (!form.username || !form.email || !form.password) {
        get().setErrorMessage("لطفا همه فیلدها را پر کنید.");
        return;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 500) return;
        get().setErrorMessage(data.error || "Unknown error");
        return;
      }

      // ✅ Update user store
      const userStore = useUserStore.getState();
      userStore.setUser(data.user);

      get().setSuccessMessage(data.message || "ثبت‌نام موفقیت‌آمیز بود.");
      set(() => ({
        isLogin: true,
        accessToken: data.accessToken,
        verificationModal: true,
      }));
    } catch (error) {
      console.error(`error in signup(): ${error}`);
      get().setErrorMessage("Something went wrong");
    }
  },
}));
