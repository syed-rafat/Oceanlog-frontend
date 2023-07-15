import React, { useState, useEffect } from "react";
import { useAuthorStore } from "../store/userContext";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Router from "next/router";
import axiosInstance from "../lib/axiosInstance";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Link from "next/link";
import axios from "axios";
import getUserId from "../lib/getUser";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

/**
 * @description Registration Modal used in Navbar.js
 */
export default function RegisterModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState(null);

  const [logged, setLogged] = useState(false);
  const tokenurl = process.env.BACKEND_ROOT + "/api/token/";
  //React hook form

  function authorizer(data) {
    if (data.detail) {
      toast.error("Wrong credentials");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      fetch(`${process.env.BACKEND_URL}user-info/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      }).then((res) => res.json());
    }
  }

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.BACKEND_URL}user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res, "result of register function");

    const login_obj = { username: res.username, password: data.password };
    const login = async (data) => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(tokenurl, JSON.stringify(data), {
          headers: headers,
        });

        console.log("res.data", res.data);

        authorizer(res.data);

        if (res.data.access) {
          setLogged(true);
        }
      } catch (error) {
        toast.error("Wrong credentials entered.");
      }
    };

    login(login_obj);
  };

  useEffect(() => {
    //redirects
    if (logged) {
      console.log("logged in");
      const id = getUserId();
      Router.push(`/author/${id}/`);
    }
  });

  return (
    <div className="transition-all">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-full flex justify-center bg-opacity-80 bg-black fixed z-50 transition-all">
          <div className="w-[25rem] h-[40rem] mx-auto z-50 fixed mt-10 bg-white shadow-white border shadow-sm p-0 flex flex-col justify-items-start">
            {/* Cross button */}
            <button
              className="absolute top-0 right-0 h-8 w-8"
              onClick={closeModal}
            >
              <div className="absolute h-0.5 w-4 bg-gray-500 transform rotate-45 top-4"></div>
              <div className="absolute h-0.5 w-4 bg-gray-500 transform -rotate-45 bottom-4"></div>
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
            <label className="mx-auto text-lg font-merriweather mb-1 mt-8">
              Enter your username
            </label>
            <input
              name="username"
              autoFocus
              {...register("username", {
                required: "Please enter a unique username",
              })}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>

            <label className="mx-auto text-lg font-merriweather mb-1 mt-2">
              Enter your email
            </label>
            <input
              name="email"
              autoFocus
              {...register("email", {
                required: "Please enter an email",
              })}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>

            <label className="mx-auto text-lg font-merriweather mb-1 mt-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              {...register("password")}
              className="border-2 border-neutral-700 border-opacity-60 bg-slate-300 bg-opacity-60 mx-10 my-1 p-2 hover::rounded-md"
            ></input>
            <button className="px-4 py-2 border-2 m-auto border-gray-900 pointer-events-auto">
              Sign up
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
}
