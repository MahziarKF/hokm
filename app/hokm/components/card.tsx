"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// types for rank and suit (optional, if not imported)
type Suit = "heart" | "diamond" | "club" | "spade";
type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "T"
  | "J"
  | "Q"
  | "K";

type CardProps = {
  card: { rank: Rank; suit: Suit };
};

function getCardImageUrl(rank: Rank, suit: Suit): string {
  const rankCode = rank === "10" || rank === "T" ? "0" : rank[0];
  const suitCode = suit[0].toUpperCase();
  return `https://deckofcardsapi.com/static/img/${rankCode}${suitCode}.png`;
}

export default function Card({ card }: CardProps) {
  const { rank, suit } = card;

  return (
    <div className="flex justify-center items-center w-full h-[300px]">
      <img
        src={getCardImageUrl(rank, suit)}
        alt={`${rank} of ${suit}`}
        className="w-[120px] h-auto rounded-lg shadow-xl transition-transform duration-300 cursor-pointer"
      />
    </div>
  );
}
