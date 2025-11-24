"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { Card, Suit, Rank } from "../deck";

function getCardImageUrl(rank: Rank, suit: Suit): string {
  const rankCode = rank === "10" || rank === "T" ? "0" : rank[0];
  const suitCode = suit[0].toUpperCase();
  return `https://deckofcardsapi.com/static/img/${rankCode}${suitCode}.png`;
}

export default function Hand({ cards }: { cards: Card[] }) {
  const suitOrder = ["s", "h", "d", "c"];

  const playerHand = [...cards].sort(
    (a, b) => suitOrder.indexOf(a.suit[0]) - suitOrder.indexOf(b.suit[0])
  );

  const getCardStyle = (index: number, total: number) => {
    const mid = (total - 1) / 2;
    const maxRotation = 20;
    const step = total > 1 ? (maxRotation * 2) / (total - 1) : 0;
    const rotation = -maxRotation + index * step;
    const yOffset = Math.abs(index - mid) * 3 + 2;
    return {
      transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      zIndex: index,
    };
  };

  return (
    <div className="relative w-full flex justify-center items-end overflow-visible py-6 sm:py-8 md:py-10">
      {/* Container that adjusts overlap based on screen size */}
      <div
        className="
          absolute bottom-0 flex justify-center items-end
          space-x-[-20px] sm:space-x-[-30px] md:space-x-[-40x] lg:space-x-[-45px]
        "
      >
        {playerHand.map((card, i) => (
          <img
            key={`${card.rank}-${card.suit}-${i}`}
            src={getCardImageUrl(card.rank, card.suit)}
            alt={`${card.rank} of ${card.suit}`}
            style={getCardStyle(i, playerHand.length)}
            onMouseOver={(e: React.MouseEvent<HTMLImageElement>) => {
              if (window.innerWidth < 768) return; // disable hover lift on mobile
              const el = e.currentTarget;
              gsap.to(el, {
                duration: 0.3,
                y: -80,
                scale: 1.3,
                ease: "power2.out",
              });
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => {
              if (window.innerWidth < 768) return;
              const el = e.currentTarget;
              gsap.to(el, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.inOut",
              });
            }}
            className="
    card
    w-12 sm:w-20 md:w-24 lg:w-30
    scale-100 
    h-auto rounded-md shadow-lg
    transition-transform duration-300
    cursor-pointer select-none touch-none
  "
          />
        ))}
      </div>
    </div>
  );
}
