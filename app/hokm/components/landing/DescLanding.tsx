"use client";
import { LinearGradient } from "react-text-gradients";
import Button from "../buttons/Button";
import ReemKufiText from "../layouts/fonts/reemKufi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Spade } from "../khal/hearts";
import JokerCard from "./jokerCard";
import { useUserStore } from "@/app/zustand/stores/useUserStore";
import TestButton from "../test/anyButton";

export default function DescLanding() {
  const user = useUserStore((s) => s.user);
  console.log("User from token:", user);

  return (
    <div className="relative group flex flex-col w-full md:w-2/3 lg:w-3/5 h-auto bg-gradient-to-r from-gray-950 to-gray-900 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] overflow-hidden p-6">
      {/* Neon/Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-3/5 h-full top-[-9rem] -left-2 neon opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col w-full h-full text-base sm:text-lg">
        {/* Intro paragraph (Top Section) */}
        <div className="flex flex-row-reverse justify-center md:justify-end w-full h-auto border-b border-gray-300/40 pb-7.5 mb-4">
          <div className="w-1/3 text-center text-gray-900">
            <LinearGradient
              gradient={["to left", "#f2f3f5 ,#b9c3cc"]}
              dir="rtl"
              className="text-sm sm:text-base md:text-lg descTR font-black leading-relaxed"
            >
              {"سلام !"} آیا آماده‌اید تا با دوستان خود هیجان بازی کارت‌های
              ایرانی حکم را تجربه کنید؟
              <br />
              حکم یک بازی استراتژیک و هیجان‌انگیز است که ترکیبی از مهارت و شانس
              را ارائه می‌دهد. هر دست فرصتی است تا نشان دهید بهترین بازیکن
              هستید!
            </LinearGradient>
          </div>
          <div className="w-2/3"></div>
        </div>

        {/* Steps + Buttons + Joker Card (Bottom Section) */}
        <div className="flex flex-col md:flex-row items-start justify-between w-full h-auto gap-6 pt-4">
          {/* Steps and Buttons Container */}
          <div
            dir="rtl"
            className="flex flex-col justify-between w-full md:w-2/3 h-full font-medium"
          >
            {/* Steps */}
            <div className="w-full flex flex-col gap-y-2 mb-4 md:mb-6">
              <LinearGradient
                gradient={["to left", "#f2f3f5 ,#b9c3cc"]}
                dir="rtl"
                className="font-semibold flex flex-col justify-between items-start h-full text-sm sm:text-base md:text-lg"
              >
                <p>1. اکانتت رو بساز.</p>
                <p>2. دنبال یک اتاق بازی بگرد.</p>
                <p>3. به همه نشون بده بازی به دست نیست.</p>
              </LinearGradient>
            </div>

            {/* Buttons */}
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
                  navigate={[true, "/game"]}
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
                  <FontAwesomeIcon
                    className="w-5 h-5 md:w-6 md:h-6"
                    icon={faUser}
                  />
                  پروفایل
                </ReemKufiText>
              </Button>
            </div>
          </div>

          {/* Joker Card */}
          <div className="relative w-full h-40 md:h-60 md:w-1/3 rounded-2xl overflow-hidden mt-4 md:mt-0">
            <JokerCard />
          </div>
        </div>
      </div>
    </div>
  );
}
