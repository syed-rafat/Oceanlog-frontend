import React from "react";
import Image from "next/image";
import Link from "next/link";

const OptionModal = ({ closeModal }) => {
  return (
    <div className="w-full h-full max-h-screen inset-0 fixed flex bg-ocean-50 text-black z-50">
      <div className="w-[98%] h-[96%] max-h-screen m-auto flex bg-black relative z-50">
      <div className="w-calc h-calc m-auto relative bg-ocean-50 z-50">
      <button className="absolute top-0 right-0 h-8 w-8" onClick={closeModal}>
        <div className="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
        <div className="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
      </button>
      <div className="mx-auto pt-8 flex w-1/3">
        {/* <Image
          src="/OCEANLOG_LOGO.svg"
          width={80}
          height={80}
          className="bg-white rounded-full"
        /> */}
        <h1 className="text-4xl pt-8 mx-auto font-pangram">OceanLog</h1>
      </div>
      <div className="w-full p-10 flex">
        {/* inner container */}

        {/* Category */}
        <section className="w-auto mx-auto text-black font-pangram">
          <div className="p-10 border-b border-stone-500">
            <Link
              href="/category/1"
            >
              <a className="text-2xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-orange-200">
              Physical Oceanography
              </a>
            </Link>
          </div>
          <div className="p-10 border-b border-stone-500">
            <Link
              href="/category/3"
            >
              <a className="text-2xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-orange-200">
              Biological Oceanography
              </a>
            </Link>
          </div>
          <div className="p-10 border-b border-stone-500">
            <Link
              href="/category/2"
            >
              <a className="text-2xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-orange-200">
              Chemical Oceanography
              </a>
            </Link>
          </div>
          <div className="p-10 border-b border-stone-500">
            <Link
              href="/category/1"
            >
              <a className="text-2xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-orange-200">
              Geological Oceanography
              </a>
            </Link>
          </div>
        </section>
        <section></section>
      </div>
    </div>
    </div>
    </div>
  );
};

export default OptionModal;
