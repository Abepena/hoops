import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/Layout/Banner";
import Header from "../components/Layout/Header";
import Main from "../components/Layout/Main";

import PageWrapper from "../components/Layout/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <Head>
        <title>Pure Hoops</title>
        <meta name="description" content="Pure Hoops Basketball Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />
      <Main />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  await fetch("/api/events/upcoming")
    .then((res) => res.json())
    .then((data) => console.log(data));
}
