import Head from "next/head";
import Image from "next/image";
// import styles from '../styles/Home/Home.module.css'
import Homepage from "../src/components/Home/Homepage";
import { useAuthorStore } from "../src/store/userContext";

export default function Home({ data }) {
  const username = useAuthorStore((state) => state.username);

  return (
    <div>
      <Head>
        <title>OceanLog</title>
        <meta name="description" content="Blogging website for everything related Oceanography" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Homepage data={data} />
      </main>

      <footer className="bg-zinc-600 text-amber-50 p-10 mt-16">
        <div className="mx-auto w-1/3">
        <div className="text-sm"> OceanLog - Developed and maintained by </div>
        <h2 className="pt-5 text-lg">Syed Rafat</h2>
        <p className="text-yellow-100">hoqrafat@gmail.com</p>
        <div className="left-0 pt-2 text-sm"> © 2022 OceanLog. All rights reserved. </div>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const listurl = process.env.BACKEND_URL + "list";
  const res = await fetch(listurl);
  const articles = await res.json();
  const data = articles.results;

  // Pass data to the page via props
  return { props: { data } };
}
