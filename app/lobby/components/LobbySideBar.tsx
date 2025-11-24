import ReemKufiText from "@/app/hokm/components/layouts/fonts/reemKufi";
import { useLobbyStore } from "@/app/zustand/stores/LobbyStore";
import gsap from "gsap";
import { useRef } from "react";
import { Swords, Sword, Coins, DoorOpen } from "lucide-react";

export default function LobbySideBar() {
  const soloRef = useRef(null);
  const duoRef = useRef(null);
  const coinsRef = useRef(null);
  const doorRef = useRef(null);

  const setGameMode = useLobbyStore((state) => state.setGameMode);
  const show = (ref: any) => {
    gsap.to(ref.current, {
      duration: 0.45,
      y: -20,
      opacity: 1,
      ease: "power3.out",
    });
  };

  const hide = (ref: any) => {
    gsap.to(ref.current, {
      duration: 0.35,
      y: 0,
      opacity: 0,
      ease: "power3.in",
    });
  };

  return (
    <div className="w-24 sm:w-28 md:w-32 lg:w-36 min-h-screen bg-gray-950/70 shadow-gray-900 shadow-2xl flex flex-col items-center justify-around pt-2.5">
      {/* Icon column */}
      <div className="w-full h-2/3 flex flex-col items-center justify-around">
        {/* ICON 1 — SOLO */}
        <div
          onMouseEnter={() => show(soloRef)}
          onMouseLeave={() => hide(soloRef)}
          onClick={() => setGameMode("1v1")}
          className="relative p-4 rounded-xl hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer flex flex-col items-center"
        >
          {/* Animated Label */}
          <div
            ref={soloRef}
            className="absolute -top-6 opacity-0 pointer-events-none"
          >
            <ReemKufiText className="text-white text-lg sm:text-xl">
              <span className="font-extrabold text-2xl sm:text-3xl">1</span> VS{" "}
              <span className="font-extrabold text-2xl sm:text-3xl">1</span>
            </ReemKufiText>
          </div>

          {/* Icon */}
          <Sword className="w-12 h-12 text-gray-200 hover:text-purple-500 transition-colors duration-300" />
        </div>

        {/* ICON 2 — DUO */}
        <div
          onMouseEnter={() => show(duoRef)}
          onMouseLeave={() => hide(duoRef)}
          onClick={() => setGameMode("2v2")}
          className="relative p-4 rounded-xl hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer flex flex-col items-center"
        >
          <div
            ref={duoRef}
            className="absolute -top-6 opacity-0 pointer-events-none"
          >
            <ReemKufiText className="text-white text-lg sm:text-xl">
              <span className="font-extrabold text-2xl sm:text-3xl">2</span> VS{" "}
              <span className="font-extrabold text-2xl sm:text-3xl">2</span>
            </ReemKufiText>
          </div>

          <Swords className="w-12 h-12 text-gray-200 hover:text-purple-500 transition-colors duration-300" />
        </div>

        {/* ICON 3 — COINS */}
        <div
          onMouseEnter={() => show(coinsRef)}
          onMouseLeave={() => hide(coinsRef)}
          onClick={() => setGameMode("poker")}
          className="relative p-4 rounded-xl hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer flex flex-col items-center"
        >
          <div
            ref={coinsRef}
            className="absolute -top-6 opacity-0 pointer-events-none"
          >
            <ReemKufiText className="text-white text-lg sm:text-xl">
              POKER
            </ReemKufiText>
          </div>

          <Coins className="w-12 h-12 text-gray-200 hover:text-purple-500 transition-colors duration-300" />
        </div>
      </div>
      <div className="w-full h-1/3 flex flex-col items-center justify-end">
        <div
          onMouseEnter={() => show(doorRef)}
          onMouseLeave={() => hide(doorRef)}
          className="relative p-4 rounded-xl hover:bg-gray-900/50 transition-colors duration-300 cursor-pointer flex flex-col items-center"
        >
          <div
            ref={doorRef}
            className="absolute -top-6 opacity-0 pointer-events-none"
          >
            <ReemKufiText className="text-white text-lg sm:text-xl">
              LEAVE
            </ReemKufiText>
          </div>

          <DoorOpen className="w-12 h-12 text-gray-200 hover:text-red-500/90 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
}
