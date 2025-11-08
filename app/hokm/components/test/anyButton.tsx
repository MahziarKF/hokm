"use client";
import { useEffect } from "react";

type PropType = {
  // onClick?: any;
  isAsync?: boolean;
  MustRunOnMount?: boolean;
  DependenciePropsOrVars?: any[];
  children: any;
};
export default function TestButton({
  // onClick,
  isAsync = false,
  MustRunOnMount = false,
  DependenciePropsOrVars = [],
  children,
}: PropType) {
  const onClick = async () => {
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  if (MustRunOnMount) {
    useEffect(() => {
      const asyncHelper = async () => {
        const result = await onClick();
        console.log(result);
      };
      if (isAsync) {
        asyncHelper();
      } else {
        onClick();
      }
    }, []);
    if (DependenciePropsOrVars) {
      useEffect(() => {
        const asyncHelper = async () => {
          const result = await onClick();
          console.log(result);
        };
        if (isAsync) {
          asyncHelper();
        } else {
          onClick();
        }
      }, [...DependenciePropsOrVars]);
    }
  }
  async function runOnClick() {
    let result;
    if (isAsync) {
      result = await onClick();
      console.log(result);
      return;
    } else {
      result = onClick();
      console.log(result);
    }
  }
  return (
    <button
      onClick={runOnClick}
      className={`
          bg-gradient-to-br from-blue-500 to-blue-800 hover:from-blue-600 hover:to-blue-900 active:bg-blue-950
          text-gray-200 font-semibold text-xl rounded-xl
          py-5 px-10 min-w-[8.5rem] h-[3.5rem]
          flex items-center justify-center gap-2
          whitespace-nowrap
          transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
          cursor-pointer
        `}
    >
      {children}
    </button>
  );
}
