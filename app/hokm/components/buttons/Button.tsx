"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "../signupModal";
import { useAuthDisplayStore } from "@/app/zustand/stores/useComponentDisplayStore";
import { useUserStore } from "@/app/zustand/stores/useUserStore";

export default function Button({
  children,
  callAuthModal = false,
  navigate = [false, "/"],
  onClick,
  className = "",
  cookie,
  cookiesPassed,
}: {
  children: Readonly<React.ReactNode>;
  callAuthModal?: boolean;
  navigate?: [boolean, string];
  onClick?: any;
  className?: string;
  cookie?: boolean;
  cookiesPassed?: any;
}) {
  const router = useRouter();
  const show = useAuthDisplayStore((state) => state.show);
  const toggle = useAuthDisplayStore((state) => state.toggle);
  const user = useUserStore((s) => s.user);

  const hasCustomBackground =
    className.includes("bg-") ||
    className.includes("from-") ||
    className.includes("to-");

  const handleClick = () => {
    if (navigate[0]) router.push(navigate[1]);
    else if (callAuthModal) toggle();
    else if (onClick) onClick();
    else if (cookie) console.log(cookiesPassed);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={`
          ${
            hasCustomBackground
              ? ""
              : "bg-gradient-to-br from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 active:bg-blue-950"
          }
          text-gray-200 font-semibold text-xl rounded-xl
          py-5 px-10 min-w-[8.5rem] h-[3.5rem]
          flex items-center justify-center gap-2
          whitespace-nowrap
          transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
          cursor-pointer
          ${className}
        `}
      >
        {children}
      </button>
      {show && <AuthModal isOpen={show} onClose={() => toggle(false)} />}
    </>
  );
}
