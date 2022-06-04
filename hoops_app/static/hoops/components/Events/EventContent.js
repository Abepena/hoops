import React from "react";
import EventDetails from "../../components/Events/EventDetails";
import EventMap from "../../components/Events/EventMap";
import Modal from "../../components/Modal";
import { useJsApiLoader } from "@react-google-maps/api";


function EventContent({ event }) {
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
    <main className="relative -mt-10 rounded-2xl bg-white shadow-md overflow-clip mx-4">
      <section className="grid min-h-[500px]">
        <section className="grid lg:grid-cols-2 w-full">
          <div className="details">
            <EventDetails event={event} />
            <div className="mx-4 mb-4">
              <Modal
                text={`Sign Up${
                  event.cost ? ` $${(event.cost / 100).toFixed(2)}` : ""
                }`}
              ></Modal>
            </div>
          </div>
          {isLoaded ? <EventMap center={center} /> : <></>}
        </section>
      </section>
    </main>
  );
}

export default EventContent;
