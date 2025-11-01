"use client";

import { useState } from "react";
import AuthModal from "../signupModal";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {" "}
      <div className="w-full flex items-center justify- px-10 bg-gradient-to-tr from-gray-800 via-gray-700 to-stone-500 shadow-2xl shadow-black rounded-b-xl h-20">
        <div className="">
          <button
            onClick={() => {
              setOpenModal((prev) => !prev);
            }}
            className="bg-gradient-to-br from-blue-500 to-blue-800 px-5 py-2 rounded-lg text-gray-200 font-semibold text-xl
        hover:from-blue-600 hover:to-blue-900 active:bg-blue-950 cursor-pointer"
          >
            ثبت‌ نام
          </button>
        </div>
        <div></div>
      </div>
      {openModal ? (
        <AuthModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal((prev) => !prev);
          }}
        />
      ) : null}
    </>
  );
}
