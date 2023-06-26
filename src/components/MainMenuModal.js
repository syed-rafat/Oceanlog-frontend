import React from "react";
import Image from "next/image";
import Link from "next/link";

const OptionModal = ({ closeModal }) => {
  return (
    <div className="w-full h-full z-50 bg-black fixed text-white">
      <button className="absolute top-0 right-0 h-8 w-8" onClick={closeModal}>
        <div className="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
        <div className="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
      </button>
      <div className="mx-auto pl-20 mb-3 pt-8 flex w-1/3">
        <Image
          src="/OCEANLOG_LOGO.svg"
          width={80}
          height={80}
          className="bg-white rounded-full p-10"
        />
        <h1 className="text-4xl pt-8 pl-5 font-pangram">OceanLog</h1>
      </div>
      <div className="w-full h-[40rem] p-10 flex">
        {/* inner container */}

        {/* Category */}
        <section className="w-auto mx-auto text-cyan-100 font-pangram">
          <div className="p-10 border-b">
            <Link
              href="/category/1"
              className="text-4xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-white"
            >
              Physical Oceanography
            </Link>
          </div>
          <div className="p-10 border-b">
            <Link
              href="/category/3"
              className="text-4xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-white"
            >
              Biological Oceanography
            </Link>
          </div>
          <div className="p-10 border-b">
            <Link
              href="/category/2"
              className="text-4xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-white"
            >
              Chemical Oceanography
            </Link>
          </div>
          <div className="p-10 border-b">
            <Link
              href="/category/1"
              className="text-4xl h-full flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-white"
            >
              Geological Oceanography
            </Link>
          </div>
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default OptionModal;
