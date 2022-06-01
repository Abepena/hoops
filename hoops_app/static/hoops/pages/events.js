import EventList from "../components/Events/EventList";
import Header from "../components/Layout/Header";
import { server } from "../config";

function Events({ events }) {
  return (
    <div className="">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl p-4 font-semibold text-gray-600 border-b-2">
          Events
        </h1>
        <EventList events={events} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/events`);
  const data = await res.json();
  const { events } = data;

  return {
    props: {
      events,
    },
  };
}

export default Events;
