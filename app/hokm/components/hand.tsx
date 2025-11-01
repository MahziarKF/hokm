"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, Suit, Rank } from "../deck";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const socketURL = `http://localhost:3001`;

function getCardImageUrl(rank: Rank, suit: Suit): string {
  const rankCode = rank === "10" || rank === "T" ? "0" : rank[0];
  const suitCode = suit[0].toUpperCase();
  console.log(`to render ${rankCode}${suitCode}`);
  return `https://deckofcardsapi.com/static/img/${rankCode}${suitCode}.png`;
}

export default function Hand({ cards }: { cards: Card[] }) {
  useEffect(() => {
    
  }, []);

  console.log(cards);
  const rankOrder = [
    "A",
    "K",
    "Q",
    "J",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const suitOrder = ["s", "h", "d", "c"];
  // console.log(cards);
  const playerHand = [...cards].sort(
    (a, b) => suitOrder.indexOf(a.suit[0]) - suitOrder.indexOf(b.suit[0])
  );

  const hearts = playerHand.filter((c) => c.suit == "hearts");
  console.log(hearts);
  const getCardStyle = (index: number, total: number) => {
    // center index (for both even and odd)
    const mid = (total - 1) / 2;

    // spread angle and vertical offset range
    const maxRotation = 24; // total fan angle spread
    const step = total > 1 ? (maxRotation * 2) / (total - 1) : 0;

    // rotation based on position around center
    const rotation = -maxRotation + index * step;

    // subtle vertical offset to curve the hand
    const yOffset = Math.abs(index - mid) * 3 + 2; // smooth curve

    return {
      transform: `rotate(${rotation}deg) translateY(${yOffset}px)`,
      zIndex: index, // prevent overlapping issues
    };
  };

  return (
    <div className="relative flex justify-center items-end w-full h-[300px] overflow-visible">
      <div className="absolute bottom-0 flex justify-center items-end space-x-[-25px]">
        {playerHand.map((card, i) => {
          // console.log(`rendering ${card.rank}${card.suit}`);
          return (
            <img
              key={`${card.rank}-${card.suit}-${i}`}
              src={getCardImageUrl(card.rank, card.suit)}
              alt={`${card.rank} of ${card.suit}`}
              style={getCardStyle(i, playerHand.length)}
              onMouseOver={(e: React.MouseEvent<HTMLImageElement>) => {
                const el = e.target as HTMLImageElement;
                const tl = gsap.timeline({
                  defaults: { ease: "power1.inOut" },
                });
                tl.to(el, {
                  duration: 0.1,
                  y: 20,
                  scale: 1.2,
                }).to(el, { duration: 0.3, y: -100 });
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLImageElement>) => {
                const el = e.target as HTMLImageElement;
                gsap.to(el, {
                  y: 0,
                  scale: 1,
                  delay: 0.1,
                  duration: 0.5,
                  ease: "power1.in",
                });
              }}
              className="card w-28 h-auto rounded-lg shadow-md transition-transform duration-300"
            />
          );
        })}
      </div>
    </div>
  );
}
