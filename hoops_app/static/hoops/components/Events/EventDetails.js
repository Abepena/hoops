import React from "react";
import { CalendarIcon } from "@heroicons/react/outline";
import Moment from "react-moment";
import { LocationMarkerIcon, TicketIcon } from "@heroicons/react/outline";
import costToString from "/utils/costToString";

function EventDetails({ event }) {
  return (
    <div className="event-details p-2 ">
      <div className="mx-4 flex items-center py-2 border-b-2 mb-2">
        <h2 className="text-2xl font-bold">{event.name || "Event Name"}</h2>
        <h2 className="text-sm text-gray-500">{event.type || ""}</h2>
      </div>
      <div className="details mx-4 flex flex-col gap-3">
        <h3 className="font-semibold text-xl text-orange-600">
          {event.location.name || "Location Name"}
        </h3>
        <h3 className="font-bold flex items-center">
          <CalendarIcon className="h-6 mr-2" />
          <Moment date={event.event_date} format={"LLL"} />
        </h3>

        <h4 className="flex items-center">
          <LocationMarkerIcon className="h-6 mr-2" />
          {`${event.location.address1} 
            ${event.location.city ? `, ${event.location.city}` : ""} 
            ${event.location.state || ""}`}
        </h4>
        <h4 className="flex items-center">
          <TicketIcon className="h-6 mr-2" />
          {costToString(event.cost) || "$10.00"}
        </h4>
      </div>
      <p className="m-4">
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Delectus, ad
        asperiores sunt explicabo a incidunt eius ipsam nulls veritatis
        dignissimos maxime quas assumenda ducimus, molestiae error vitae amet
        recusandae id" Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Alias perferendis quis repellendus quam sunt voluptatum, eligendi
        inventore unde amet obcaecati! Quasi delectus sit labore pariatur est
        iure cupiditate? Sapiente, eaque! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Fugit mollitia doloribus nulla magni quod repudiandae,
        magnam harum sit unde fugiat blanditiis est in sunt, vero iste, quae
        inventore non iusto? Lorem ipsum dolor sit, amet consectetur adipisicing
        elit. Repudiandae deleniti impedit vero, molestiae non rem. Placeat,
        unde. Nemo beatae itaque atque dicta totam assumenda perspiciatis,
        natus, doloremque facilis accusantium qui!
      </p>
    </div>
  );
}

export default EventDetails;
