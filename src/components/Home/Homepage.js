import React from "react";
import Banner from "./Banner"
import HomeArticles from "./homearticles";
import styles from "../../../styles/Home/Home.module.css";
import useSWR from "swr";
import HomeSidebar from "../Sidebar/HomeSidebar";
// Full Home page layout

export default function Homepage({data}) {


    return (
        <div className={styles.main}>

            {/*Banner section*/}
            <div className={styles.banner_section}>
                <Banner />
            </div>

            {/*Outer container of rest of the page content section*/}
            <div className={styles.outer_container}>
                <div className={styles.inner_container}>
                    <section className="relative flex flex-auto flex-row flex-nowrap lg:flex-col">
                        <div className="w-[calc(100%-400px)] h-[300%] flex flex-auto flex-wrap ml-auto relative mb-16 mr-16 xl:m-2 md:p-2 lg:w-full lg:">
                            <HomeArticles data={data}/>

                        </div>
                        {/* divider */}
                        <div className="w-[1px] h-auto m-[.4em] p-0 bg-slate-500 opacity-30 md:hidden"></div>

                        {/* sidebar */}
                        <div className="w-[260px] mx-auto ml-8 p-4 lg:m-0 lg:p-0 relative">
                            <HomeSidebar />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}