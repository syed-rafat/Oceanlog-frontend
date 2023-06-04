import React, { useEffect, useState } from "react";
// import styles from "../../styyles/author/author_profile.module.css"
import { useRouter } from "next/router";
import styles from "../../styles/author/[pid].module.css";
import { axiosInstance } from "../../src/lib/axiosInstance";
import axios from "axios";
import Image from "next/image";
import Authorarticles from "./Author/Authorarticles";

export default function AuthorProfile() {
  const [data, setData] = useState(0);
  const [loading, setLoader] = useState(true);



  const router = useRouter();
  const { pid } = router.query;
  const profileRoute = process.env.BACKEND_URL + "authors/" + pid;


  useEffect(
    (_) => {
      if (pid) {
        axios
          .get(profileRoute)
          .then((res) => setData(res.data))
          .then((_) => setLoader(false))
          .catch((err) => console.log("error in author/[pid]", err));

      }
    },
    [pid]
  );

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col top-0 relative w-full h-full">
      {/* <div className="w-full h-full absolute bg-transparent"> */}
      <div className="h-[24rem] bg-zinc-300 relative w-full">
        <div className="w-1/2 m-auto p-auto relative block top-12">
          <div className="relative mt-20 pt-10 top-18 flex">
            <Image
              src={"https://res.cloudinary.com/dylqfbsq2/" + data.picture}
              width={150}
              height={150}
              className="rounded-full"
              alt="Author image"
            />
            <div className="flex-row flex-wrap p-8 ml-4">
              <h1 className="text-4xl font-pangram">{data.name}</h1>
              <h2 className="text-lg pl-3 pt-3 font-pangram opacity-75">{data.profession}</h2>
            </div>
          </div>
        </div>
      </div>

      <section className="px-16 mt-16 relative">
        <div className="w-full mx-auto relative max-w-[1160px]">
          <div className="relative flex flex-auto flex-row flex-nowrap lg:flex-col">
            <div className="w-[calc(100%-400px)] h-[300%] flex flex-auto flex-wrap ml-auto relative mb-16 mr-16 xl:m-2 md:p-2 lg:w-full lg:">
              {/* add article list here */}
              <Authorarticles id={pid} />
            </div>
            <div className="w-[1px] h-auto m-[.4em] p-0 bg-slate-500 opacity-30 md:hidden">
              {/* breaker */}
            </div>
            <div className="w-[260px] mx-auto ml-8 p-4 lg:m-0 lg:p-0 relative">
              <div className="mx-3 px-1">
                <h2 className="text-2xl mb-7 font-medium font-pangram">About the author</h2>
                <p className="font-inter text-lg text-left">{data.bio}</p>
                <p className="pt-4 mb-2">{data.email}</p>
                <a href = {`mailto: ${data.email}`} className="shadow-md bg-slate-300 p-2 mt-2" >Send Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
    </div>
  );
}
