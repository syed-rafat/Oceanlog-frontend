import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Button } from "@mantine/core";
// import styles from "../../../styles/Home/homearticles.module.css";
import useSWR from "swr";
import axios from "axios";

// This component shows articles list in the front page
//TODO: remove hardcoded link of Cloudinary
/**
 *@name {HomeArticles}
 *@description Grid of 8 articles stacked in 2 column on homepage.  Comp - <UserInfo>
 *@returns {html} article-list div
 */

// building home article component from ground up with new api

export default function HomeArticle({ data }) {
  const [author, setAuthor] = useState("");


  return (
    <div className="flex flex-wrap lg:flex-col lg:w-full lg:p-auto">
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
  );
}
