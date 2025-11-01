import { create } from "zustand";
import { AuthStore, FormTypeSignup, FormTypeLogin } from "./storeTypes";

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
    set((state) => ({ verificationModal: value }));
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

  refreshAccessToken: async () => {
    // placeholder implementation
    return "";
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

      get().setSuccessMessage(data.message || "ورود موفقیت‌آمیز بود.");
      set(() => ({ isLogin: true, accessToken: data.accessToken }));
    } catch (error) {
      console.error(
        `error in zustand store -> auth store -> login(), error: ${error}`
      );
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
      console.log(data);
      if (!res.ok) {
        if (res.status === 500) return;
        get().setErrorMessage(data.error || "Unknown error");
        return;
      }

      get().setSuccessMessage(data.message || "ثبت‌نام موفقیت‌آمیز بود.");
      set(() => ({
        isLogin: true,
        accessToken: data.accessToken,
        verificationModal: true,
      }));
    } catch (error) {
      console.error(
        `error in zustand store -> auth store -> signup(), error: ${error}`
      );
      get().setErrorMessage("Something went wrong");
    }
  },
}));
