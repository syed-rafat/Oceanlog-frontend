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
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Homepage data={data} />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          id="accent-lime-300"
        >
          Powered by Rafat@SUST
        </a>
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
