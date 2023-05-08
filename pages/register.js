import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuthorStore } from "../src/store/userContext";

const Registration = () => {
  const { register, errors, handleSubmit } = useForm();
  const setUser = useAuthorStore((state) => state.setUser);

  const onSubmit = async (data) => {
    const response = await fetch(`${process.env.BACKEND_URL}user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //need to use JSON.stringify() before sending data
    });
    const res = await response.json();
    const login_obj = { username: res.username, password: data.password };
    const get_token = await fetch(`${process.env.BACKEND_ROOT}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login_obj), //need to use JSON.stringify() before sending data
    });
    const token = await get_token.json();
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
      <div className="bg-zinc-300 bg-opacity-20 h-full w-full absolute">
        <div className="mt-32 mb-60 relative">
          <img src="/register.svg" className="fixed w-40 top-56 right-3/4" />
          <div className="bg-white shadow-sm max-w-md m-auto h-[40rem] p-4 rounded-xl">
            <h1 className="align-middle text-center font-sans mb-7 py-3 border-b rounded-xl text-3xl pt-6">
              Registration
            </h1>

            <div className="align-middle justify-center h-[28rem] w-80 mx-auto p-auto relative">
              {/* <img
                src="/register.svg"
                className="fixed w-40 top-56 right-3/4"
              /> */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-8 flex flex-col flex-nowrap relative"
              >
                <label className="text-zinc-900 font-semibold text-lg pb-2">
                  Email
                </label>
                <input
                  className="border-solid border-gray-300 border-b py-2  px-4 w-full rounded-lg bg-gray-500 bg-opacity-5 text-lg mt-4 mb-7 font-inter"
                  name="title"
                  placeholder="Enter email"
                  type="text"
                  autoFocus
                  {...register("username", {
                    required: "Please enter a job title",
                  })}
                />

                <label className="text-zinc-900 font-semibold text-lg pb-2">
                  Username
                </label>
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

                <label className="text-zinc-900 font-semibold text-lg pb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="border-solid border-gray-300 border-b py-2  px-4 w-full rounded-lg bg-gray-500 bg-opacity-5 text-lg mt-4 mb-7 font-inter"
                  placeholder="password"
                  {...register("password")}
                />

                <input
                  type="submit"
                  value="Register"
                  className="bg-white w-full mx-auto block relative hover:bg-green-600 hover:bg-opacity-20 border-2 border-slate-900 shadow-md border-solid rounded-xl h-11 mt-4 mb-7"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;

// <!-- HTML !-->
// <button class="button-80" role="button">Button 80</button>

// /* CSS */
// .button-80 {
//   background: #fff;
//   backface-visibility: hidden;
//   border-radius: .375rem;
//   border-style: solid;
//   border-width: .125rem;
//   box-sizing: border-box;
//   color: #212121;
//   cursor: pointer;
//   display: inline-block;
//   font-family: Circular,Helvetica,sans-serif;
//   font-size: 1.125rem;
//   font-weight: 700;
//   letter-spacing: -.01em;
//   line-height: 1.3;
//   padding: .875rem 1.125rem;
//   position: relative;
//   text-align: left;
//   text-decoration: none;
//   transform: translateZ(0) scale(1);
//   transition: transform .2s;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .button-80:not(:disabled):hover {
//   transform: scale(1.05);
// }

// .button-80:not(:disabled):hover:active {
//   transform: scale(1.05) translateY(.125rem);
// }

// .button-80:focus {
//   outline: 0 solid transparent;
// }

// .button-80:focus:before {
//   content: "";
//   left: calc(-1*.375rem);
//   pointer-events: none;
//   position: absolute;
//   top: calc(-1*.375rem);
//   transition: border-radius;
//   user-select: none;
// }

// .button-80:focus:not(:focus-visible) {
//   outline: 0 solid transparent;
// }

// .button-80:focus:not(:focus-visible):before {
//   border-width: 0;
// }

// .button-80:not(:disabled):active {
//   transform: translateY(.125rem);
// }
