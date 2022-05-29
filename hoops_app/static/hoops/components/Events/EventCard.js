import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import { CalendarIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/outline";

function EventCard( event ) {
  return (
    <div className="relative border border-gray-200 rounded-md py-2 hover:scale-105 cursor-pointer hover:shadow-md transition-all">
      {console.log(event)}
      <div className="mx-4">
        <h2 className="text-lg">{event.location || "Location Name"}</h2>
        <h2 className="text-sm text-gray-500">{event.type || "Type/Sport"}</h2>
      </div>
      <div className="my-2">
        <img
          src={event.img || "https://source.unsplash.com/Gl0jBJJTDWs"}
          className="object-cover h-24 w-full"
        />
      </div>
      <div className="details mx-4">
        <h3 className="font-semibold text-sm">{event.name || "Event Name"}</h3>
        <h3 className="font-bold text-red-400 flex items-center">
          <CalendarIcon className="h-8 mr-2" />
          <Moment date={event.event_date} format={"LLL"} />
        </h3>
        <h4 className="flex items-center">
          <TicketIcon className="h-8 mr-2" />
          {event.cost || "$10.00"}
        </h4>
        <h4></h4>
        <h4></h4>
      </div>
    </div>
  );
}

export default EventCard;
