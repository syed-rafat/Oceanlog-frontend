import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useAuthorStore } from "../store/userContext";
import { useRouter } from "next/router";
import { AiOutlineUser } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import styles from "../../styles/Navbar/Navbar.module.css";

/**
 * TODO: Add hide on scroll to navbar, currently it is not wokring, have to debug the code
 * TODO: Change navbar css to tailwind one
 * @description this is  the nvaigation bar component which is used in _document.js
 */


//top navbar
export default function Navbar() {
  // const { user, username } = useContext(UserContext);
  const [logged, setlogged] = useState(false)
  const isLogged = useAuthorStore(state=> state.logged)
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  
  const handleScroll = () => {

    if(window !== undefined){
      const currentScrollPos = window.scrollY
  
      if(currentScrollPos > prevScrollPos){
        console.warn('visible', visible)
          setVisible(false)
      }else{
          setVisible(true)
      }
  
      setPrevScrollPos(currentScrollPos)
  }}
  
  useEffect( () => {
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <div className={`relative ${visible ? 'top-0' : '-translate-y-full'} `}>
    <header className={styles.nav_outer}>
      <div className={styles.nav_inner}>
        <section className={styles.nav_section}>
          <div className={styles.logo}>
            <Link href="/">
              <a>OceanLog</a>
            </Link>
          </div>

          <div className={styles.vert_bar}> </div>

          <nav className={styles.nav}>
            <ul className={styles.navUL}>
              <li className={styles.navli}>
                <a href="#" className={styles.navlink}>
                  Physical{" "}
                </a>
              </li>
              <li className={styles.navli}>
                <a href="#" className={styles.navlink}>
                  Biological{" "}
                </a>
              </li>
              <li className={styles.navli}>
                <a href="#" className={styles.navlink}>
                  Chemical{" "}
                </a>
              </li>
              <li className={styles.navli}>
                <a href="#" className={styles.navlink}>
                  Geological
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.nav_icons}>
            <ul className={styles.navUL}>
              <li className={styles.navli}>
                <button className={styles.btn}>
                  <RiSearch2Line size={22} />
                </button>
              </li>
              <li className={styles.navli}>
              <Link href="/login/">
                <a>
                <button className={styles.btn}>
                  
                  <AiOutlineUser size={28} />
              
                </button>
                </a>
                </Link>
              </li>
              <li className={styles.hamburger_outer}>
                <div className={styles.hamburger}>
                  <a href="#">
                    <span className={styles.hamburger_bar}></span>
                    <span className={styles.hamburger_bar}></span>
                    <span className={styles.hamburger_bar}></span>
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
