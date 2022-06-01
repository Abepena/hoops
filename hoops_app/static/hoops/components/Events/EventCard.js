import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";
import Link from "next/link";

function EventCard({ event }) {
  return (
    <Link href={`/events/${event.id}`}>
      <a className="relative border border-gray-200 rounded-md py-2 hover:scale-105 cursor-pointer hover:shadow-md transition-all min-h-[300px]">
        <div className="mx-4 flex min-h-[60px] items-center justify-center">
          <h2 className="text-lg text-center">{event.name || "Event Name"}</h2>
          <h2 className="text-sm text-gray-500">{event.type || ""}</h2>
        </div>
        <div className="my-2">
          <img
            src={event.img || "https://source.unsplash.com/Gl0jBJJTDWs"}
            className="object-cover h-24 w-full"
          />
        </div>
        <div className="details mx-4">
          <h3 className="font-semibold text-sm my-1">
            {event.location.name || "Location Name"}
          </h3>
          <h3 className="font-bold text-red-400 flex items-center mb-1">
            <CalendarIcon className="h-6 mr-2" />
            <Moment date={event.event_date} format={"LLL"} />
          </h3>
          <h4 className="flex items-center text-gray-500 mb-1">
            <TicketIcon className="h-6 mr-2" />
            {event.cost || "$10.00"}
          </h4>
          <h4 className="flex items-center text-gray-500">
            <LocationMarkerIcon className="h-6 mr-2" />
            {`${event.location.address1}
            ${event.location.address2 ? `, ${event.location.address2}` : ""} 
            ${event.location.city ? `, ${event.location.city}` : ""} 
            ${event.location.state || ""}`}
          </h4>
          <h4></h4>
        </div>
      </a>
    </Link>
  );
}

export default EventCard;
