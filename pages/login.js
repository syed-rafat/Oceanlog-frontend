import React, { useState, useEffect } from "react";
import { useAuthorStore } from "../src/store/userContext";
import Banner from "../src/components/Home/Banner";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Router from "next/router";
import axiosInstance from "../src/lib/axiosInstance";
//to test axios, will remove later
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from "next/link";
import axios from "axios";

// const axiosInstance = dynamic(() => import('../src/lib/axiosInstance'), {
//   suspense: true,
// })



export default function Login() {
  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setUser = useAuthorStore((state) => state.setUser);
  const username = useAuthorStore((state) => state.username);
  const user = useAuthorStore((state) => state.user);

  const [logged, setLogged] = useState(false);

  const accessToken = useAuthorStore((state) => state.acessToken);
  const setToken = useAuthorStore((state) => state.setToken);

  //login function that fetches the api, save them in localstorage then set global variable in store
  const login = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      const res = await axios.post(
        "http://localhost:8000/api/token/",
        JSON.stringify(data),
        {
        headers: headers, }
      );
      console.log('res.data', res.data);
    
    console.log("login function is working and global varibale set", res);
    authorizer(res.data);

    if (res.data.access) {
      setLogged(true);
    }
    // console.warn(username);
    // console.warn(user);
  } catch(error){
    console.log('error', error)
  }}
  


  function authorizer(data) {
    if (typeof window !== "undefined") {
      console.log("data passed in authorizer function", data);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      console.warn("authorizer is executed, data here");
      fetch("http://127.0.0.1:8000/content/user-info/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      }).then((res) => res.json()).then(res=> console.log('bearer token is working', res));
    }
  }


  const onSubmit = (d) => {
    login(d);

    // console.log(d)
  };

  useEffect(() => {
    //redirects
    if (logged) {
      Router.push(`/author/${user}/`);
    }
  });
  // setToken(data.access, data.refresh)
  // const actoken = "bearer" + localStorage.getItem("accesstoken")
  // console.log(actoken)

  // const bctoken = localStorage.getItem("refreshtoken")

  return (
    <>
      <Head>
        <title>Oceanlog - Login</title>
      </Head>
      <div className="bg-gray-50 w-full h-full absolute">
      <section className="mt-32 mb-60 relative">
      <img src="/register.svg" className="fixed w-40 top-56 right-3/4"/>
        <div className="bg-white shadow-sm max-w-md m-auto h-[32rem] p-6 rounded-lg">
        <h1 className="text-xl align-middle text-center font-sans mb-7">Welcome back
        </h1>

        <div className="align-middle justify-center h-52 w-80 m-auto p-auto relative">
        <img src="/register.svg" className="fixed w-40 top-56 right-3/4"/>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col flex-nowrap relative">
          <label className="text-zinc-900 font-semibold text-lg pb-4">Username</label>
          <input
            className="border-solid border-gray-300 border py-2 px-4 mb-6 w-full rounded text-gray-700"
            name="title"
            placeholder="Enter username"
            type="text"
            autoFocus
            {...register("username", {
              required: "Please enter a job title",
            })}
          />

          <label className="text-zinc-900 font-semibold text-lg pb-4">Password</label>
          <input
            type="password"
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            placeholder="password"
            {...register("password")}
          />

          <input type="submit" className="h-7 border-black border w-16 bg-teal-100 m-6 rounded" />
        </form>
        <div className="text-2xl mt-8 underline pl-12">
        <Link href="/register/"> Register an account
        </Link></div>
      </div>
      </div>
      </section>
      </div>
    </>
  );
}

// To redirect to profile
// import Router from 'next/router'
//
// ...
// useEffect(() => {
//  const {pathname} = Router
//  if(pathname == '/' ){
//  Router.push('/hello-nextjs')
//  }
//  });
