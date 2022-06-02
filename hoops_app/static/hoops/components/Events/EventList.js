import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

function EventList({ events }) {

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[500px] p-4 ">
      {events &&
        events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  );
}

export default EventList;
