import { Spade } from "./khal/hearts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function GameInfo() {
  const [open, setOpen] = useState(true);
  const iconRef = useRef(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.to(boxRef.current, {
      height: open ? 120 : 20,
      duration: 1,
      ease: "power1.out",
    });
    gsap.to(iconRef.current, {
      duration: 0.5,
      rotate: open ? 180 : 0,
      ease: "power1.inOut",
    });
    gsap.to(textContainerRef.current, {
      opacity: open ? 1 : 0,
      duration: 0.5,
      ease: "power3.in",
    });
  }, [open]);

  return (
    <div
      ref={boxRef}
      className="relative bg-gradient-to-r overflow-hidden from-[#0a1e16] via-[#2c261e] to-[#1B120E] rounded-b-2xl w-80 h-30"
    >
      <div
        ref={textContainerRef}
        className="w-full h-full flex flex-col items-center justify-around"
      >
        <h1 className="text-3xl font-semibold text-gray-200">
          <Spade /> : حکم
        </h1>
        <div className="text-gray-200 font-semibold text-3xl">
          <h2>7 : دست</h2>
        </div>
        <div className="flex flex-col justify-between w-full px-4">
          <div className="flex text-xl justify-between gap-2 items-center text-gray-200 font-medium">
            <h2>
              Team 1 <span className="text-2xl">( 2 )</span>
            </h2>
            <h2>-</h2>
            <h2>
              Team 2 <span className="text-2xl">( 4 )</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="absolute text-white font-extrabold text-xl p-2 w-15 h-5.5 bg-gradient-to-r shadow-gray-500 shadow-xs hover:cursor-pointer from-[#1a4735] via-[#393126] to-[#3f2b23] bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl flex items-center justify-center"
      >
        <FontAwesomeIcon ref={iconRef} icon={faArrowUp} />
      </div>
    </div>
  );
}
