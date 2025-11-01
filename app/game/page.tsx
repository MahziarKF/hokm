"use client";
import GameInfo from "../hokm/components/gameInfo";
import Hand from "../hokm/components/hand";
import { Card, Deck } from "../hokm/deck";
import { useRef, useState, useEffect } from "react";

export default function HokmPlayground() {
  const deckRef = useRef<Deck>(null);
  const [cardsToPass, setCardsToPass] = useState<Card[] | null>(null);

  useEffect(() => {
    if (!deckRef.current) {
      deckRef.current = new Deck();
      const cards = deckRef.current.draw(13);
      console.log("Cards drawn ONCE:", cards);
      setCardsToPass(cards);
    }
  }, []);

  if (!cardsToPass) return null; // or a loader

  return (
    <div className="min-h-screen overflow-hidden farsh w-full flex flex-col items-center justify-between pb-10">
      <GameInfo />
      <Hand cards={cardsToPass} />
    </div>
  );
}
