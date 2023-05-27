import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuthorStore } from "../store/userContext";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import styles from "../../styles/Navbar/Navbar.module.css";
import Image from "next/image";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false)

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
    // event.preventDefault();
    // TODO: add login functionality

  };

  const flipToRegisterModal = () => {
    console.log("flip to register modal")
    setShowLoginModal(false);
    setShowRegisterModal(true);
  }

  const closeRegisterModal = () => setShowRegisterModal(false);

  const closeLoginModal = () => setShowLoginModal(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="relative top-0">
      {/* Login Modal */}

      {showLoginModal && (
        <LoginModal closeModal={closeLoginModal} flipToRegisterModal={flipToRegisterModal} />
      )}

      {showRegisterModal && (
        <RegisterModal closeModal={closeRegisterModal} />
      )}

      {/* Navbar */}

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
                    onClick={() => setShowLoginModal(true)}
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
