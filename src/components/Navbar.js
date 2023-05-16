import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuthorStore } from "../store/userContext";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import styles from "../../styles/Navbar/Navbar.module.css";
import Image from "next/image";

/**
 * TODO: Add hide on scroll to navbar, currently it is not wokring, have to debug the code
 * TODO: Change navbar css to tailwind one
 * @description this is  the nvaigation bar component which is used in _document.js
 */

//top navbar
export default function Navbar() {
  // const { user, username } = useContext(UserContext);
  const [logged, setlogged] = useState(false);
  const isLogged = useAuthorStore((state) => state.logged);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleScroll = () => {
    if (window !== undefined) {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        console.warn("visible", visible);
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: add login functionality
  };

  const modalClose = () => setShowModal(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="relative top-0">
      {/* Login Modal */}

      {showModal && (
        <div className="w-full h-full flex justify-center bg-opacity-70 bg-black fixed z-50">
          <div className="w-96 h-96 mx-auto z-50 fixed mt-10 bg-white shadow-white border shadow-sm p-0 flex flex-col justify-items-start">
            {/* Cross button */}
            <button className="absolute top-0 right-0 h-8 w-8" onClick={modalClose}>
                <div class="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
                <div class="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
            </button>

            <div className="mx-auto mb-3 pt-10">
              <Image
                src="/OCEANLOG_LOGO.svg"
                width={100}
                height={100}
                className="pt-40"
              />
            </div>
            <div className="w-2/3 h-[1px] mx-auto bg-slate-700 opacity-20 mb-4"></div>
            <div className="mx-auto text-2xl font-merriweather mb-1 mt-8">
              <h1>Enter your Email address</h1>
            </div>
            <input className="border-2 border-neutral-700 bg-zinc-300 bg-opacity-60 mx-5 my-1 p-3 hover::rounded-md"></input>
          </div>
        </div>
      )}

      <header className="h-[80px] max-w-[1220px] mx-auto top-0 left-0 right-0 bottom-0 fixed block transition-top transition transition-duration-[0.4s] z-40 font-openSans">
        <div className="relative h-full">
          <section className="bg-white flex h-full justify-between shadow-lg 34em:h-[80px] 34em:px-[2rem]">
            <div className="flex h-full relative ml-[20px]">
              <Link href="/">
                <a className="text-black text-4xl flex relative items-center text-center h-full">
                  OceanLog
                </a>
              </Link>
            </div>

            <div className="text-neutral-500 m-[1em] mr-[2em] bg-black w-[0.51px] flex relative opacity-20 transition-opacity after:content-none after:block after:h-1/2 after:w-full bg-current after:opacity-20">
              {" "}
            </div>

            <nav className="flex h-full relative">
              <ul className="m-0 p-0 flex relative h-full flex-row pl-[40px] lg:hidden">
                <li className="text-center items-center flex relative h-full">
                  <a
                    href="/category/1"
                    className="text-neutral-800 text-2xl h-full overflow-hidden flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-teal-800"
                  >
                    Physical{" "}
                  </a>
                </li>
                <li className="text-center items-center flex relative h-full">
                  <a
                    href="/category/3"
                    className="text-neutral-800 text-2xl h-full overflow-hidden flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-teal-800"
                  >
                    Biological{" "}
                  </a>
                </li>
                <li className="text-center items-center flex relative h-full">
                  <a
                    href="/category/2"
                    className="text-neutral-800 text-2xl h-full overflow-hidden flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-teal-800"
                  >
                    Chemical{" "}
                  </a>
                </li>
                <li className="text-center items-center flex relative h-full">
                  <a
                    href="/category/4"
                    className="text-neutral-800 text-2xl h-full overflow-hidden flex mx-[0.5em] px-[0.5em] items-center relative transition-colors hover:text-teal-800"
                  >
                    Geological
                  </a>
                </li>
              </ul>
            </nav>
            {/* Navbar icons */}
            <div className="h-full flex relative flex-row basis-[150px] justify-end">
              <ul className="m-0 p-0 flex relative h-full flex-row pl-[40px] items-center justify-end">
                <li className="text-center items-center flex relative h-full ml-[0.5em] mr-[0.5em] justify-center">
                  <button className="border-0 border-r-0 outline-0 p-0 bg-transparent text-inherit cursor-pointer list-none">
                    <RiSearch2Line size={22} />
                  </button>
                </li>

                {/* Login Button */}
                <li className="text-center items-center flex relative h-full ml-[0.5em] mr-[0.5em] justify-center">
                  <button
                    className="border-0 border-r-0 outline-0 p-0 bg-transparent text-inherit cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <AiOutlineUser size={28} />
                  </button>
                </li>
                {/* hamburger menu */}
                <li className="flex relative items-center left-0 right-0 h-full ml-[0.5em] mr-[0.5em] justify-center">
                  <div className="flex relative h-[35px] w-[35px] py-[8px] transition-all duration-200 hover:py-0">
                    <a
                      href="#"
                      className="text-neutral-400 h-full w-[15px] mx-auto z-50 relative flex flex-col justify-around items-center"
                    >
                      <span className="relative bg-neutral-500 text-neutral-400 h-[2px] w-full m-0 leading-[1.15]"></span>
                      <span className="relative bg-neutral-500 text-neutral-400 h-[2px] w-full m-0 leading-[1.15]"></span>
                      <span className="relative bg-neutral-500 text-neutral-400 h-[2px] w-full m-0 leading-[1.15]"></span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
        {/* inner nav */}
      </header>
    </div>
  );
}
