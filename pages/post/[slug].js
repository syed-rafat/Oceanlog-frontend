import React from "react";
import styles from '../../styles/post/singleslug.module.css';
import parse from 'html-react-parser';

// TODO: fix data fetching, build is not working.

const articleURL = process.env.BACKEND_URL + "articles/";

export async function getStaticPaths(context) {
  console.log(articleURL)
  const response = await fetch(articleURL);
  const data = await response.json();
  const slugs = data.map((article) => article.slug);
  console.log(slugs)
  const paths = slugs.map((slug) => ({ params: { slug: slug } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {

  console.log('getstaticprops')
  console.log(articleURL + `/${params.slug}`)
  console.log('getstaticpropssssssss 2')
  const response = await fetch(
    articleURL + `${params.slug}`
  );
  const data = await response.json();
  const res = await fetch(
    `${process.env.BACKEND_URL}authors/${data.author}`
  );
  const author = await res.json();

  console.log(data, "data from getstaticprops")

  const allData = { data: data, author: "author" };

  return {
    props: {
      allData,
    },
  };
}

export default function ArticleSingle({ allData }) {
  const article = allData.data;
  // const author = allData.author;

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