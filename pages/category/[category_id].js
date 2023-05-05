import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";


export default function CategoryList() {
    const [data, setData] = useState(0);
    const [loading, setLoader] = useState(true);

    const router = useRouter();
    const { category_id } = router.query;
    const categoryRoute = process.env.BACKEND_URL + "list/" + category_id + "/";
    console.log(categoryRoute, "categoryRoute");

    useEffect(
        (_) => {
          async function fetchCategory() {
            const res = await fetch(categoryRoute);
            const data = await res.json();

            setData(data);
            setLoader(false)
          }

          if (category_id) {
            fetchCategory();
          }
        },
        [categoryRoute]
      );

    if (!data) {
        return <h1>Loading</h1>;
    }
    
    return (
      <div className="m-40 h-3/5 w-full border relative">
            <Image src="/sst.svg" layout="fill" className="w-auto h-auto relative"/>
        <div className="flex flex-wrap lg:flex-col lg:w-full lg:p-auto relative">
          {data.map((article) => (
            <div
              key={article.id}
              className="w-1/2 p-3 pr-8 lg:flex-row lg:flex-wrap lg:w-fit lg:p-auto lg:m-auto"
            >
              <Image
                src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage}
                width={500}
                height={300}
                className="max-w"
                alt="Cover image of article"
              />
              <div className="pt-3">
                <Link href={`/post/${article.slug}`}>
                  <a>
                    <h1 className="title-home font-merriweather font-medium opacity-[.9] text-xl">
                      {article.title}
                    </h1>
                  </a>
                </Link>
                <Link href={`author/${article.author}`}>
                  <a className="font-pangram opacity-50">
                    <h4 id={article.author}> {article.author_name} </h4>
                  </a>
                </Link>
                <p className="mt-4 font-inter font-extralight ">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      );
}