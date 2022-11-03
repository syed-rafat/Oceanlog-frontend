import React from "react";
import Banner from "./Banner"
import HomeArticles from "./homearticles";
import styles from "../../../styles/Home/Home.module.css";
import useSWR from "swr";
// Full Home page layout

export default function Homepage() {

    return (
        <div className={styles.main}>

            {/*Banner section*/}
            <div className={styles.banner_section}>
                <Banner />
            </div>

            {/*Outer container of rest of the page content section*/}
            <div className={styles.outer_container}>
                <div className={styles.inner_container}>
                    <section className={styles.container}>
                        <div className={styles.content}>
                            <HomeArticles />
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.sidebar}>sidebar</div>
                    </section>
                </div>
            </div>
        </div>
    )
}