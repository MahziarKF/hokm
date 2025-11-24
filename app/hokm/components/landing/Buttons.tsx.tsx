"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../buttons/Button";
import { Spade } from "../khal/hearts";
import ReemKufiText from "../layouts/fonts/reemKufi";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/app/zustand/stores/useUserStore";

export default function Buttons() {
  const user = useUserStore((s) => s.user);
  return (
    <div className="flex flex-col md:flex-row md:flex-nowrap justify-center md:justify-between w-full gap-3 sm:gap-4 pt-4 border-t border-gray-300/40">
      {!user ? (
        <Button className="flex-1 md:flex-auto" callAuthModal={true}>
          <ReemKufiText className="text-base sm:text-lg md:text-[22px]">
            ثبت نام
          </ReemKufiText>
        </Button>
      ) : (
        <Button
          className="flex-1 md:flex-auto bg-gradient-to-tl from-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800"
          navigate={[true, "/lobby"]}
        >
          <ReemKufiText className="text-base sm:text-lg md:text-[22px]">
            لابی حکم
          </ReemKufiText>
          <Spade />
        </Button>
      )}

      <Button
        className="flex-1 md:flex-auto bg-gradient-to-tl from-purple-600 to-purple-700"
        navigate={[true, "/store"]}
      >
        <ReemKufiText className="flex flex-row-reverse items-center justify-center gap-2 text-base sm:text-lg md:text-[22px]">
          <FontAwesomeIcon
            className="w-5 h-5 md:w-6 md:h-6"
            icon={faShoppingCart}
          />
          فروشگاه
        </ReemKufiText>
      </Button>

      <Button
        className="flex-1 md:flex-auto bg-gradient-to-tl from-emerald-600 to-emerald-700"
        navigate={[true, "/profile"]}
      >
        <ReemKufiText className="flex flex-row-reverse items-center justify-center gap-2 text-base sm:text-lg md:text-[22px]">
          <FontAwesomeIcon className="w-5 h-5 md:w-6 md:h-6" icon={faUser} />
          پروفایل
        </ReemKufiText>
      </Button>
    </div>
  );
}
