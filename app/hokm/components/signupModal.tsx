"use client";

import { useAuthStore } from "@/app/zustand/AuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: any;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const {
    signup,
    login,
    form: storeForm,
    setErrorMessage,
    setSuccessMessage,
    verificationModal,
    setVerificationModal, // ✅ added
  } = useAuthStore();

  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [verificationValue, setVerificationValue] = useState("");
  const [username, setUsername] = useState("");
  const [verifiedMessage, setVerifiedMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await signup({
          ...form,
          error: "",
          success: "",
        });
        setUsername(form.username);
        setVerificationModal(true); // ✅ open verification modal
      } else {
        await login({
          username: form.username,
          password: form.password,
          error: "",
          success: "",
        });
        router.push("/home");
        onClose();
      }

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } finally {
      setLoading(false);
    }
  }

  const verify = async () => {
    setErrorMessage("");
    setVerifiedMessage("");

    if (!/^\d{6}$/.test(verificationValue)) {
      setErrorMessage("کد باید ۶ رقم باشد.");
      return;
    }

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify({ code: Number(verificationValue), username }),
      });

      const result = await res.json();
      if (result.verified) {
        setVerifiedMessage("حساب با موفقیت تایید شد!");
        setTimeout(() => {
          setVerificationModal(false); // ✅ close verification modal
          onClose();
          router.push("/home");
        }, 1500);
      } else {
        setErrorMessage("کد تایید نادرست است.");
      }
    } catch {
      setErrorMessage("خطای تایید. لطفا دوباره تلاش کنید.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-stone-700 text-gray-100 rounded-2xl w-full max-w-md p-8 shadow-2xl border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-4xl font-bold transition"
        >
          &times;
        </button>

        {/* ✅ Conditional rendering using verificationModal */}
        {!verificationModal ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              {mode === "signup" ? "ثبت‌نام کاربر" : "ورود به حساب"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                placeholder="نام کاربری"
                value={form.username}
                onChange={handleChange}
                className="bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />

              {mode === "signup" && (
                <input
                  type="email"
                  name="email"
                  placeholder="ایمیل"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              )}

              <input
                type="password"
                name="password"
                placeholder="رمز عبور"
                value={form.password}
                onChange={handleChange}
                className="bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
              />

              {mode === "signup" && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="تکرار رمز عبور"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-400 p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                />
              )}

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-br from-blue-500 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-900 active:scale-95 transition disabled:opacity-50"
              >
                {loading
                  ? "در حال ارسال..."
                  : mode === "signup"
                  ? "ثبت‌نام"
                  : "ورود"}
              </button>
            </form>

            {storeForm.error && (
              <p className="mt-4 text-red-400 text-center text-sm">
                {storeForm.error}
              </p>
            )}
            {storeForm.success && (
              <p className="mt-4 text-green-400 text-center text-sm">
                {storeForm.success}
              </p>
            )}

            <p className="mt-6 text-center text-gray-300">
              {mode === "signup" ? "حساب دارید؟" : "حساب ندارید؟"}{" "}
              <button
                type="button"
                onClick={() =>
                  setMode((prev) => (prev === "signup" ? "login" : "signup"))
                }
                className="text-blue-400 hover:text-blue-500 hover:underline"
              >
                {mode === "signup" ? "ورود" : "ثبت‌نام"}
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              تایید ایمیل
            </h2>
            <p className="text-center mb-4 text-gray-300">
              لطفا کد ۶ رقمی ارسال شده به ایمیل خود را وارد کنید.
            </p>
            <input
              type="text"
              name="verification"
              placeholder="کد ۶ رقمی"
              value={verificationValue}
              onChange={(e) => setVerificationValue(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-center text-lg text-gray-100 tracking-widest rounded-lg p-3 focus:ring-2 focus:ring-blue-600 outline-none"
              maxLength={6}
              inputMode="numeric"
            />
            <button
              onClick={verify}
              className="w-full bg-gradient-to-br from-blue-500 to-blue-800 text-white mt-4 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-900 active:scale-95 transition"
            >
              تایید
            </button>
            {storeForm.error && (
              <p className="text-red-400 text-center mt-3 text-sm">
                {storeForm.error}
              </p>
            )}
            {verifiedMessage && (
              <p className="text-green-400 text-center mt-3 text-sm">
                {verifiedMessage}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
