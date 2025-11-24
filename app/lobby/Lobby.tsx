"use client";

import ReemKufiText from "../hokm/components/layouts/fonts/reemKufi";

import { useEffect, useRef, useState } from "react";
import { useLobbyStore } from "../zustand/stores/LobbyStore";
import ModalLayout, {
  Button,
  Input,
  Label,
} from "../hokm/components/layouts/layout/ModalLayout";
import LobbySideBar from "./components/LobbySideBar";
import GameSearch from "./components/gameSearchModal";
import LoadingSuit from "../hokm/components/load/LoadingSuit";

export default function Lobby() {
  // Refs for each hover label

  const setGameMode = useLobbyStore((state) => state.setGameMode);
  const selectedGameMode = useLobbyStore((state) => state.selectedGameMode);
  const [ranked, setRanked] = useState(false);
  const [error, setError] = useState("");

  const [searchState, setSearchState] = useState<
    "found" | "searching" | "waiting" | "error"
  >("searching");

  return (
    <div className="min-h-screen w-full bg-gray-800 flex justify-between">
      <LobbySideBar />
      {selectedGameMode ? (
        <ModalLayout
          havePreStyled={searchState !== "searching"}
          widthClass="max-w-lg"
          isOpen={true}
          onClose={() => setGameMode(null)}
        >
          {searchState !== "searching" ? (
            <GameSearch
              setError={setError}
              setRanked={setRanked}
              ranked={ranked}
              gameType={selectedGameMode}
            />
          ) : (
            <LoadingSuit
              onCancel={() => {
                setSearchState("waiting");
              }}
            >
              {searchState}
            </LoadingSuit>
          )}
          {error ? (
            <p className="text-xl text-center text-red-500 font-semibold">
              {error}
            </p>
          ) : null}
        </ModalLayout>
      ) : null}
    </div>
  );
}
