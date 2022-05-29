import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Main from "../components/Main";
import MyEventList from "../components/MyEventList";

export default function Home() {
  return (
    <div className=" h-full pb-10">
      <Head>
        <title>CK Hoops</title>
        <meta name="description" content="CK Hoops Basketball academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <Main />
    </div>
  );
}

// export async function getStaticProps() {
//   await fetch("/api/events/upcoming")
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// }
