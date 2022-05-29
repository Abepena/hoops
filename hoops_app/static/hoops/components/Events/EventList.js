import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

function EventList() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    try {
      fetch("/api/events")
        .then((response) => response.json())
        .then((data) => {
          setEvents(data.events);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="grid sm: grid-cols-2 lg:grid-cols-3 gap-3 min-h-[500px] py-4 ">
      {events && events.map((event) => <EventCard event={event} />)}
    </div>
  );
}

export default EventList;
