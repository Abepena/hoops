import EventBanner from "../../components/Events/EventBanner";
import PageWrapper from "../../components/Layout/PageWrapper";
import { server } from "../../config";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const Event = ({ event }) => {
  return (
    <PageWrapper>
      <Header />
      <EventBanner>
        <h1 className="font-bold text-3xl bg-white p-2 m-2 rounded">
          {event.name}
        </h1>
      </EventBanner>
      <main className="relative container -mt-10 rounded-2xl bg-white border-x-2 border-gray-100 mx-auto overflow-clip">
        <section className="flex min-h-[500px] border border-emerald-500">
          <section className="flex w-full">
            <div className="event-details w-1/2 bg-green-300">Left</div>
            <div className="map w-1/2 bg-blue-500" id="map">
              map
            </div>
          </section>
          <section>
            <div className="description"></div>
          </section>
        </section>
      </main>
      <Footer />
    </PageWrapper>
  );
};
export async function getServerSideProps(ctx) {
  // Get event by id
  const res = await fetch(`${server}/api/events/${ctx.query.id}`);
  const json = await res.json();
  const { event } = json;
  return {
    props: { event },
  };
}

export default Event;
