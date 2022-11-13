import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
// import { Button } from "@mantine/core";
// import styles from "../../../styles/Home/homearticles.module.css";
import UserInfo from "./components/userInfo";
import useSWR from "swr";
import useArticleget from "../../lib/useArticleget";

// This component shows articles list in the front page

/**
 *@name {HomeArticles}
 *@description Grid of 8 articles stacked in 2 column on homepage.  Comp - <UserInfo>
 *@returns {html} article-list div
 */
// export default function HomeArticles() {
//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(true);
//
//   useEffect(() => {
//     setLoading(true);
//     fetch("http://127.0.0.1:8000/content/list")
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data.results);
//         setLoading(false);
//         console.log(data.results, "data.results >")
//       });
//   }, []);
//
//   if (isLoading) return <p>Loading...</p>;
//   if (!data) return <p>No profile data</p>;
//
//   return (
//     <div className="article-list">
//       {data.map((article) => (
//         <div>
//           <Link href={`/post/${article.slug}`}>
//             <a>
//               <h1 className="title-home">{article.title}</h1>
//             </a>
//           </Link>
//           <UserInfo id={article.author} />
//           <p>{article.content}</p>
//           <img
//             src={"https://res.cloudinary.com/dylqfbsq2/" + article.img}
//             alt={article.img}
//             width={300}
//             height={200}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// building home article component from ground up with new api

export default function HomeArticle() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/content/list")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
        console.log(data.results, "data.results >");
      });
  }, []);

  if (loading) return <p>loading</p>

  return (
    <div className="flex flex-wrap">
      {data.map((article) => (<div key={article.id} className="w-1/2 p-3">
        <Image src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage} width={500} height={300} alt="Cover image of article"/>
        <Link href={`/post/${article.slug}`}>
            <a>
              <h1 className="title-home">{article.title}</h1>
            </a>
            </Link>
      <p>{article.description}</p>
      </div>
      ))}
    </div>
  );
}
