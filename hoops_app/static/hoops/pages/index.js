import Head from "next/head";
import Banner from "../components/Layout/Banner";
import Main from "../components/Layout/Main";
import Link from "next/link";
import PageWrapper from "../components/Layout/PageWrapper";
import { server } from "../config";

export default function Home({ events }) {
  return (
    <PageWrapper>
      <Head>
        <title>Pure Hoops</title>
        <meta name="description" content="Pure Hoops Basketball Academy" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Banner>
        <Link href={`/events`}>
          <a className="transition-all bg-white text-black px-10 sm:text-3xl py-4 shadow-md hover:shadow-orange-600 hover:shadow-2xl rounded -m-6 font-bold">
            Discover new events
          </a>
        </Link>
      </Banner>
      <Main upcomingEvents={events} />
    </PageWrapper>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/events/upcoming`);
  const json = await res.json();
  const { events } = json;

  return {
    props: { events },
  };
}
