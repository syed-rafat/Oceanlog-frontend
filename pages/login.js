import React from "react";
import { useContext } from "react";
import { userStore } from "../src/lib/userContext";
import Banner from "../src/components/Home/Banner";

export default function Login() {
    // const { user, username } = useContext(UserContext);
    const username = userStore((state) => state.username);
    const accessToken = userStore((state) => state.acessToken)
    const setToken = userStore((state) => state.setToken)
    const credential = {username: "rafat",
password: 7898788}

    fetch('http://127.0.0.1:8000/api/token/',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential)
    }).then((res) => res.json())
    .then((data) => {if (typeof window !== 'undefined'){
        localStorage.setItem("accessToken", data.access)
                        localStorage.setItem("refreshToken", data.refresh)}})
    // setToken(data.access, data.refresh)
    // const actoken = "bearer" + localStorage.getItem("accesstoken")
    // console.log(actoken)

    // const bctoken = localStorage.getItem("refreshtoken")

    return(
        <>
        <Banner />
        </>
    )
}