import EventBanner from "../../components/Events/EventBanner";
import PageWrapper from "../../components/Layout/PageWrapper";
import { server } from "../../config";
import EventDetails from "../../components/Events/EventDetails";
import { useJsApiLoader } from "@react-google-maps/api";

import EventMap from "../../components/Events/EventMap";

const Event = ({ event }) => {
  const center = {
    lat: event.location.lat,
    lng: event.location.lng,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <PageWrapper>
      {console.log(event.location)}
      <div className="container mx-auto">
        <EventBanner>
          <h1 className="transition-all bg-white text-3xl text-black px-10 py-4 shadow-md hover:shadow-orange-600 hover:shadow-2xl rounded -m-6 font-bold">
            {event.name}
          </h1>
        </EventBanner>
        <main className="relative -mt-10 rounded-2xl bg-white shadow-md overflow-clip mx-4">
          <section className="grid min-h-[500px]">
            <section className="grid lg:grid-cols-2 w-full">
              <div className="details">
                <EventDetails event={event} />
                <button className="btn bg-orange-600 text-white px-4 py-2 ml-4 mb-4 rounded-xl">
                  Sign Up {event.cost && `(${event.cost})`}
                </button>
              </div>
              {isLoaded ? <EventMap center={center} /> : <></>}
            </section>
          </section>
        </main>
      </div>
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
