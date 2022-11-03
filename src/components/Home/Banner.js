import React from "react";
import styles from "../../../styles/Home/Banner.module.css"
// TODO: add picture to Banner

export default function Banner() {

    return (
        <div className={styles.banner}>
            <img src="/oceanlife.svg" />
        </div>
    )
}