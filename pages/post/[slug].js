import React from "react";
import styles from '../../styles/post/singleslug.module.css';
import parse from 'html-react-parser';
import Link from 'next/link';

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
    articleURL + `${params.slug}`
  );
  const data = await response.json();

  const allData = { data: data };

  return {
    props: {
      data,
    },
  };
}

export default function ArticleSingle({ data }) {
  const article = data;
  const author = data.author.profile;


  return (
    // <article id={styles.article}>
    //   <img
    //     src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage}
    //     alt={article.img}
    //     id={styles.img}
    //   />
    //   <h1 className="h-7 accent-slate-900">{article.title}</h1>
    //   <h6>{article.date}</h6>
    //   <h6>by {author.name}</h6>
    //   {/* <div dangerouslySetInnerHTML={{__html: article.content}}></div> */}
    //   {parse(article.content)}
    // </article>

    <article id="" className="bg-slate-50" >
      <img
        src={"https://res.cloudinary.com/dylqfbsq2/" + article.coverImage}
        alt={article.img}
        id={styles.img}
      />
      <div className="px-4 py-16 md:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="text-base font-medium text-slate-600">
            {article.date}
          </div>
          <div className="my-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {article.title}
          </div>
          <div className="mt-7 prose prose-slate prose-lg text-slate-600 mx-auto">
            {parse(article.content)}
          </div>

          {/* Author Info */}

          <div className="mt-6 prose prose-slate prose-lg text-slate-600 mx-auto border border-t-0 shadow-sm rounded-md h-36 p-8 pt-6 flex">
            <div className="w-auto">
              <img src={"https://res.cloudinary.com/dylqfbsq2/" + author.picture} alt={author.name} className="rounded-full h-24 w-24" />
            </div>
            <div className="ml-4 pl-4 align-middle pt-4 top-1/2">
            <p>by</p>
            <Link href={`/author/${author.account}`}>
            <h6 className="text-sky-900 text-opacity-80">{author.name}</h6>
            </Link>
            </div>
          </div>
          <div>
            <div className="mt-6 prose prose-slate prose-lg text-slate-600 mx-auto">
              <h6>Tags: {article.tags}</h6>
              </div>
          </div>
        </div>
      </div>
    </article>
  );
}