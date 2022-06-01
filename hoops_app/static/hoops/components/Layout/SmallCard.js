import Link from "next/link";
import React from "react";
import Moment from "react-moment";

function SmallCard({ img, event: { name, event_date, location, id } }) {
  const date = new Date(event_date).getTime();
  return (
    <Link href={`/events/${id}`}>
      <a className=" p-2 flex items-center my-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:border hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
        <div className="relative h-16 w-16">
          <img src={img} className="rounded-full" />
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
