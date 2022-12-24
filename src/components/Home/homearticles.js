import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Button } from "@mantine/core";
// import styles from "../../../styles/Home/homearticles.module.css";
import UserInfo from "./components/userInfo";
import useSWR from "swr";
import useArticleget from "../../lib/useArticleget";
import AuthorFinder from "../AuthorProfile";
import axios from "axios";

// This component shows articles list in the front page
//TODO: remove hardcoded link
/**
 *@name {HomeArticles}
 *@description Grid of 8 articles stacked in 2 column on homepage.  Comp - <UserInfo>
 *@returns {html} article-list div
 */

// building home article component from ground up with new api


export default function HomeArticle({ data }) {
  const [author, setAuthor] = useState("");
  console.log("DATaaaaaaaaaaaaaaaaaaaaaaaaaaaaa in homearticle")
  console.log(data)

  const url = process.env.BACKEND_URL;
  const listurl = process.env.BACKEND_URL + "list";

  // useEffect(() => {
  //   // setLoading(true);
  //   console.log(url);
  //   axios.get("https://oclogbackend.azurewebsites.net/content/list")
  //     // .then((res) => res.json())
  //     .then((res) => {
  //       setData(res.data.results);
  //       setLoading(false);
  //       console.log(data, "data.results >");
  //     });
  // }, []);

  // if (loading) return <p>loading</p>;

  // if (!data) return <p>loading</p>;
  // if (data) return <p>loading</p>;

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
                <UserInfo id={article.author} />
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

