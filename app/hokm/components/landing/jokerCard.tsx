"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { LinearGradient } from "react-text-gradients";

gsap.registerPlugin(useGSAP);

export default function JokerCard() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const [hovering, setHovering] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2" } });
    tl.to(cardRef.current, { scale: hovering ? 0.8 : 1 }).to(cardRef.current, {
      y: hovering ? 30 : 0,
    });
    const tl2 = gsap.timeline({
      defaults: { duration: 0.5, ease: "power1.in" },
    });
    tl2.to(textRef.current, {
      opacity: hovering ? 1 : 0,
      delay: hovering ? 0.5 : 0,
    });
  }, [hovering]);
  return (
    <div className="w-full relative h-full flex flex-col gap-y-2 items-center justify-between">
      <LinearGradient
        dir="rtl"
        className="text-lg text-center max-w-40 text-[#101828] font-semibold"
        ref={textRef}
        gradient={["to left", "#f2f3f5 ,#b9c3cc"]}
      >
        بلد نیستی بازی کنی؟{" "}
        <LinearGradient
          gradient={["to left", "#53eafd ,oklch(71.5% 0.143 215.221)"]}
          className="font-bold underline hover:cursor-pointer"
        >
          <Link href="/learn">{" اینجا "}</Link>
        </LinearGradient>
        کلیک کن
      </LinearGradient>
      <div
        ref={cardRef}
        onMouseOver={() => {
          setHovering((prev) => !prev);
        }}
        onMouseLeave={() => {
          setHovering((prev) => !prev);
        }}
        className="w-full absolute h-full joker rounded-2xl"
      ></div>
    </div>
  );
}
