import Link from "next/link";
import React from "react";
import Moment from "react-moment";

function SmallCard({ event: { name, event_date, location, id, img_url } }) {
  const date = new Date(event_date).getTime();
  return (
    <Link href={`/events/${id}`}>
      <a className="border mb-2 md:mb-0 p-2 flex items-center space-x-4 rounded-xl cursor-pointer hover:shadow-md hover:border hover:opacity-90 transition transform duration-200 ease-in-out">
        <div className="relative h-16 w-16">
          <img src={img_url} className="rounded-full" />
        </div>
        <div>
          <h2 className="">{name || "No date set"}</h2>
          <h3 className="text-gray-600 text-sm">
            {location.name || "No location set"}
          </h3>
          <Moment fromNow className="text-xs text-gray-400" date={date} />
        </div>
      </a>
    </Link>
  );
}

export default SmallCard;
