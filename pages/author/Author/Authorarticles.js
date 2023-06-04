import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import UserInfo from "../../../src/components/Home/components/userInfo";

// TODO: remove hardcoded cloudinary link

export default function Authorarticles(props) {
  const pid = props.id;
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  const articlesLink = process.env.BACKEND_URL + "user-articles/" + props.id;

  useEffect((_) => {
    axios
      .get(articlesLink)
      .then((res) => setData(res.data.articles))
      .then((res) => setLoading(false));

      console.log("Article fetching of author is working", data)
  }, []);

  if (loading) {
    return <h3>Loading</h3>;
  }


  return (
    <div className="m-2 p-2">
      {data.map((article) => (
        <div key={article.id} className="flex m-4 my-8 p-3">
          <Image
            src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage}
            width={380}
            height={230}
            className="max-w"
            alt="Cover image of article"
          />
          <div className="mb-3 ml-6 p-3">
            <Link href={`/post/${article.slug}`}>
              <a>
                <h1 className="text-2xl mb-2 font-medium font-merriweather opacity-80">{article.title}</h1>
              </a>
            </Link>
            <Link href={`author/${article.author}`}>
              <a className="relative left-1 font-pangram opacity-50">
                <div className="mb-5">
                <UserInfo id={article.author} />
                </div>
              </a>
            </Link>
            <p className="font-inter font-extralight">{article.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
