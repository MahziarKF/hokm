"use client";
import { useState } from "react";
import LoadingSuit from "../hokm/components/load/LoadingSuit";
import GameArea from "../game/GameArea";
import type { Card } from "./types/cards";
import { useHokmConnection } from "./hooks/useHokmConnection";
import Lobby from "./Lobby";

export default function HokmPlayground() {
  const [cardsToPass] = useState<Card[] | null>(null);
  const { loadingMessage, loading } = useHokmConnection();

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center">
        <LoadingSuit>{loadingMessage}</LoadingSuit>
      </div>
    );
  }

  return <Lobby />;
}
