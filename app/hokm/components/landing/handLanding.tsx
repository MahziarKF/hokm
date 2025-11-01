"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReemKufiText from "../layouts/fonts/reemKufi";
import { LinearGradient } from "react-text-gradients";
import GradientHokm from "../layouts/fonts/gradientPinkHokmWord";

function getCardImageUrl(rank: any, suit: any) {
  const rankCode = rank === "10" || rank === "T" ? "0" : rank[0];
  const suitCode = suit[0].toUpperCase();
  return `https://deckofcardsapi.com/static/img/${rankCode}${suitCode}.png`;
}

export default function HandLanding({ cards }: { cards?: any[] }) {
  const playerHand = [
    { suit: "spade", rank: "K" },
    { suit: "spade", rank: "Q" },
    { suit: "spade", rank: "A" },
    { suit: "spade", rank: "10" },
    { suit: "spade", rank: "J" },
  ];

  const getCardStyle = (index: number, total: number) => {
    const mid = (total - 1) / 2;
    const maxRotation = 32; // degrees
    const rotation = ((index - mid) / mid) * maxRotation; // rotate from -max to +max
    const yOffset = Math.abs(index - mid) * 6; // curve effect
    const zIndex = index; // last card on top

    return {
      transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      zIndex,
    };
  };

  useGSAP(() => {
    const glowColors = [
      "rgba(117, 6, 63, 0.8)",
      "rgba(186, 50, 63, 0.6)",
      "rgba(255, 215, 0, 0.8)",
      "rgba(186, 50, 63, 0.6)",
      "rgba(117, 6, 63, 0.8)",
    ];

    playerHand.forEach((_, i) => {
      const index = i + 1;
      const yOffsets = [-35, -70, -140, -70, -35];
      const xOffsets = [-45, -35, 0, 35, 45];

      gsap.to(`#landing-card-${index}`, {
        y: yOffsets[i],
        x: xOffsets[i],
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(`#landing-card-${index}`, {
        delay: 1,
        yoyo: true,
        repeat: -1,
        boxShadow: `0 0 20px 5px ${glowColors[i]}`,
        duration: 1.75,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div className="w-full md:w-1/3 h-auto md:h-3/4 flex flex-col items-center justify-center z-0">
      <div className="relative flex justify-center items-end w-full h-[200px] sm:h-[250px] md:h-[300px] overflow-visible">
        <div className="absolute bottom-0 flex justify-center items-end space-x-[-18px] sm:space-x-[-22px] md:space-x-[-25px]">
          {playerHand.map((card, i) => (
            <img
              key={`${card.rank}-${card.suit}-${i}`}
              id={`landing-card-${i + 1}`}
              src={getCardImageUrl(card.rank, card.suit)}
              alt={`${card.rank} of ${card.suit}`}
              className="card w-20 sm:w-24 md:w-28 h-auto rounded-lg transition-transform duration-300"
              style={{ ...getCardStyle(i, playerHand.length) }}
            />
          ))}
        </div>
      </div>

      <p
        dir="rtl"
        className="text-2xl sm:text-3xl md:text-4xl text-gray-300 max-w-[18ch] text-center font-semibold mt-6"
      >
        بازی های{" "}
        <GradientHokm className="font-extrabold text-3xl sm:text-4xl md:text-5xl">
          حکم
        </GradientHokm>{" "}
        خودتو رو به سطح بالاتری {"ببر!"}
      </p>
    </div>
  );
}
