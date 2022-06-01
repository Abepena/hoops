import EventBanner from "../../components/Events/EventBanner";
import PageWrapper from "../../components/Layout/PageWrapper";
import { server } from "../../config";
import Header from "../../components/Layout/Header";

const Event = ({ event }) => {
  return (
    <PageWrapper>
      <Header />
      <main className="container border-x-2 border-gray-100 mx-auto">
        <EventBanner>
          <h1 className="font-bold text-3xl bg-white p-2 m-2 rounded">{event.name}</h1>
        </EventBanner>
      </main>
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
