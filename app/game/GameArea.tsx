import GameInfo from "../hokm/components/gameInfo";
import Hand from "../hokm/components/hand";
import { useUserStore } from "../zustand/stores/useUserStore";

type PropType = {
  cardsToPass: any;
};

export default function GameArea({ cardsToPass }: PropType) {
  const user = useUserStore((state) => state.user);

  return (
    <>
      {" "}
      <div className="w-full flex items-center justify-center">
        <GameInfo />
      </div>
      <div className="w-full pb-17.5">
        <Hand cards={cardsToPass} />
      </div>
    </>
  );
}
