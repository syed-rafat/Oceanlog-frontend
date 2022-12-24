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
import axios from "axios"
import getUserId from "../src/lib/getUser";

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
  const [user, setUser] = useState(null)

  // const setUser = useAuthorStore((state) => state.setUser);
  const username = useAuthorStore((state) => state.username);
  // const user = useAuthorStore((state) => state.user);

  const [logged, setLogged] = useState(false);

  const accessToken = useAuthorStore((state) => state.acessToken);
  const setToken = useAuthorStore((state) => state.setToken);

  const tokenurl = process.env.BACKEND_ROOT + "/api/token/";

  //login function that fetches the api, save them in localstorage then set global variable in store
  const login = async (data) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      }
      const res = await axios.post(
        tokenurl,
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
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      console.warn("authorizer is executed, data here");
      fetch(`${process.env.BACKEND_URL}user-info/`, {
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
      const id = getUserId()
      Router.push(`/author/${id}/`);
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
      <div className="bg-zinc-300 bg-opacity-20 h-full w-full absolute">
      {/* <div className="bg-gray-50 w-full h-full absolute"> */}
      <section className="mt-32 mb-60 relative">
      {/* <img src="/register.svg" className="fixed w-40 top-56 right-3/4"/> */}
        <div className="bg-white shadow-sm max-w-md m-auto h-[40rem] p-4 rounded-lg">
        <h1 className="align-middle text-center mb-7 py-3 border-b font-thin rounded-xl text-3xl pt-6">Login
        </h1>

        <div className="align-middle justify-center h-52 w-80 m-auto p-auto relative">
        {/* <img src="/register.svg" className="fixed w-40 top-56 right-3/4"/> */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col flex-nowrap relative">
          <label className="text-zinc-900 font-semibold text-lg pb-2 font-pangram">Username</label>
          <input
            className="border-solid border-gray-300 border-b py-2  px-4 w-full rounded-lg bg-gray-500 bg-opacity-5 text-lg mt-4 mb-7 font-inter"
            name="title"
            placeholder="Enter username"
            type="text"
            autoFocus
            {...register("username", {
              required: "Please enter a job title",
            })}
          />

          <label className="text-zinc-900 font-semibold text-lg pb-2 font-pangram">Password</label>
          <input
            type="password"
            className="border-solid border-gray-300 border-b py-2 px-4 w-full rounded-lg bg-gray-500 bg-opacity-5 text-lg my-4 font-inter"
            placeholder="password"
            {...register("password")}
          />
          <input type="submit"
           value="Login"
            className="bg-white w-full mx-auto block relative hover:bg-green-600 hover:bg-opacity-20 border-2 border-slate-900 shadow-md border-solid rounded-xl h-11 mt-4 mb-7" />
        </form>
        <h2 className="font-inter text-center opacity-60 underline relative bottom-4">
        <Link href="#">forgot your password</Link></h2>
        <div className="text-2xl mt-8 underline font-inter relative left-12">
        <Link href="/register/">Register an account</Link></div>
      </div>
      </div>
      </section>
      {/* </div> */}
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
