import React from "react";
import styles from '../../styles/post/singleslug.module.css';
import parse from 'html-react-parser';

// TODO: fix data fetching, build is not working.

const articleURL = process.env.BACKEND_URL + "articles/";

export async function getStaticPaths(context) {
  const response = await fetch(articleURL);
  const data = await response.json();
  const slugs = data.map((article) => article.slug);
  const paths = slugs.map((slug) => ({ params: { slug: slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    articleURL + `/${params.slug}`
  );
  const data = await response.json();
  const res = await fetch(
    `${process.env.BACKEND_URL}authors/${data.author}`
  );
  const author = await res.json();

  const allData = { data: data, author: author };

  return {
    props: {
      allData,
    },
  };
}

export default function ArticleSingle({ allData }) {
  const article = allData.data;
  const author = allData.author;

  console.log(`${process.env.BACKEND_URL}articles/`)

  return (
    <article id={styles.article}>
      <img
        src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage}
        alt={article.img}
        id={styles.img}
      />
      <h1 className="h-7 accent-slate-900">{article.title}</h1>
      <h6>{article.date}</h6>
      {/* <div dangerouslySetInnerHTML={{__html: article.content}}></div> */}
      {parse(article.content)}
    </article>
  );
}
