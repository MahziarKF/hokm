import Button from "@/app/hokm/components/buttons/Button";
import ReemKufiText from "@/app/hokm/components/layouts/fonts/reemKufi";
import { Input } from "@/app/hokm/components/layouts/layout/ModalLayout";

type PropType = {
  gameType: "1v1" | "2v2" | "poker" | "bj" | null;
  setRanked: any;
  ranked: boolean;
  setError: any;
};
export default function GameSearch({
  setRanked,
  gameType,
  ranked,
  setError,
}: PropType) {

  return (
    <div className="w-full h-full flex flex-col items-center justify-between py-7.5 gap-y-15">
      <div className="w-full flex items-center justify-around">
        <ReemKufiText className="text-2xl min-w-30">سر چقدر</ReemKufiText>
        <Input
          id="bet-input"
          placeholder="مقدار..."
          className="text-gray-400"
        />
      </div>
      <div className="w-full flex items-center justify-start">
        <div className="flex items-center justify-between">
          <ReemKufiText className="text-2xl min-w-30">Ranked</ReemKufiText>
          <input
            type="checkbox"
            onClick={() => setRanked(!ranked)}
            className="w-5 h-5"
          />
        </div>
      </div>
      <Button>جستجو</Button>
    </div>
  );
}
