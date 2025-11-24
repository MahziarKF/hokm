"use client";

import { useEffect, useRef, useState } from "react";
import { Club, Diamond, Heart, Spade } from "../khal/hearts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PropType = {
  children: any;
  onCancel?: () => void; // ⬅ optional cancel handler
};

export default function LoadingSuit({ children, onCancel }: PropType) {
  const [dots, setDots] = useState("");
  const spadeRef = useRef<HTMLDivElement | null>(null);
  const clubRef = useRef<HTMLDivElement | null>(null);
  const diamondRef = useRef<HTMLDivElement | null>(null);
  const heartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    gsap.to(spadeRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.in",
      yoyo: true,
      repeatDelay: 0.35,
      repeat: -1,
    });
    gsap.to(heartRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.35,
      ease: "power1.in",
      yoyo: true,
      repeatDelay: 0.35,
      repeat: -1,
    });
    gsap.to(clubRef.current, {
      opacity: 0,
      delay: 0.35 * 2,
      duration: 0.5,
      ease: "power1.in",
      yoyo: true,
      repeatDelay: 0.35,
      repeat: -1,
    });
    gsap.to(diamondRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.35 * 3,
      ease: "power1.in",
      yoyo: true,
      repeatDelay: 0.35,
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative w-100 h-30 p-[2.5px] flex flex-col rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
      {/* ❌ Cancel Icon */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-1.5 right-2 text-gray-300 hover:text-red-500 transition text-2xl font-bold"
        >
          ×
        </button>
      )}

      <div className="w-full bg-gray-900 h-3/4 flex rounded-t-lg items-center justify-around text-3xl">
        <div ref={spadeRef}>
          <Spade />
        </div>
        <div ref={heartRef}>
          <Heart />
        </div>
        <div ref={clubRef}>
          <Club />
        </div>
        <div ref={diamondRef}>
          <Diamond />
        </div>
      </div>

      <div className="text-center capitalize rounded-b-lg bg-gray-900 text-3xl font-bold text-gray-400">
        {children} {dots}
      </div>
    </div>
  );
}
