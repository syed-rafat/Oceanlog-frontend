import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthorStore } from "../src/store/userContext";

const Registration = () => {
  const { register, errors, handleSubmit } = useForm();
  const setUser = useAuthorStore((state) => state.setUser);

  const onSubmit = async (data) => {
    const response = await fetch("http://127.0.0.1:8000/content/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //need to use JSON.stringify() before sending data
    });
    const res = await response.json();
    const login_obj = {"username": res.username,
  "password": data.password}
    const get_token = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_obj), //need to use JSON.stringify() before sending data
    }
    )
    const token = await get_token.json()
    console.log("login function is working and global varibale set", res);
    setUser(token.access);

    if (res.access) {
      setLogged(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Oceanlog - Register</title>
      </Head>
      <main className="bg-gray-50 w-full h-full absolute">
        <div className="mt-32 mb-60 relative">
          <img src="/register.svg" className="fixed w-40 top-56 right-3/4" />
          <div className="bg-white shadow-sm max-w-md m-auto h-96 p-6 rounded-lg">
            <h1 className="text-xl align-middle text-center font-sans">
              Create an account
            </h1>

            <div className="align-middle justify-center h-52 w-80 m-auto p-auto relative">
              <img
                src="/register.svg"
                className="fixed w-40 top-56 right-3/4"
              />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 flex flex-col flex-nowrap relative"
              >
                <label className="text-zinc-900 font-semibold text-lg">
                  Email
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="title"
                  placeholder="Enter email"
                  type="text"
                  autoFocus
                  {...register("username", {
                    required: "Please enter a job title",
                  })}
                />

                <label className="text-zinc-900 font-semibold text-lg">
                  Username
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  name="title"
                  placeholder="Enter username"
                  type="text"
                  autoFocus
                  {...register("username", {
                    required: "Please enter a job title",
                  })}
                />

                <label className="text-zinc-900 font-semibold text-lg">
                  Password
                </label>
                <input
                  type="password"
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                  placeholder="password"
                  {...register("password")}
                />

                <input
                  type="submit"
                  className="h-7 border-black border w-16 bg-teal-100 m-6 rounded"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
