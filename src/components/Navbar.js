import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { userStore } from "../lib/userContext";
import { useRouter } from "next/router";
import { AiOutlineUser} from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import styles from "../../styles/Navbar/Navbar.module.css"

//top navbar
export default function Navbar() {
  // const { user, username } = useContext(UserContext);
  const username = userStore((state) => state.username);
  console.log(username);

  return (
    <header className={styles.nav_outer}>
      <div className={styles.nav_inner}>
      <section className={styles.nav_section}>
        <div className={styles.logo}>
          <Link href="/">
          <a>OceanLog</a></Link>
        </div>
        
        <div className={styles.vert_bar}> </div>
        
        <nav className={styles.nav}>
          <ul className={styles.navUL}>
            <li className={styles.navli}><a href="#" className={styles.navlink}>Physical </a></li>
            <li className={styles.navli}><a href="#" className={styles.navlink}>Biological </a></li>
            <li className={styles.navli}><a href="#" className={styles.navlink}>Chemical </a></li>
            <li className={styles.navli}><a href="#" className={styles.navlink}>Geological</a></li>
          </ul>
        </nav>
        
        <div className={styles.nav_icons}>
          <ul className={styles.navUL}>
            <li className={styles.navli}><button className={styles.btn}>
              < RiSearch2Line size={22} />
            </button>
            </li>
            <li className={styles.navli}><button className={styles.btn}>
              < AiOutlineUser size={28} />
            </button>
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
  );
}