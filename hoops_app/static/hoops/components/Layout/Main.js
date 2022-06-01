import React, { useState, useEffect } from "react";
import LargeCard from "./LargeCard";
import MediumCard from "./MediumCard";
import SmallCard from "./SmallCard";

const thumbnails = [
  "basketball_thumb.png",
  "football_thumb.png",
  "soccer_thumb.png",
  "tennis_thumb.png",
  "strength_thumb.png",
  "timer_thumb.png",
  "trophy_thumb.png",
];

const categories = [
  {
    img: "https://source.unsplash.com/t9fHu08z3TI",
    title: "Open gym runs & Pick up games",
  },
  {
    img: "https://source.unsplash.com/yfTnYbNuDJ4",
    title: "Open seminars & practices",
  },
  {
    img: "https://source.unsplash.com/kP1AxmCyEXM",
    title: "Rec League Sign Ups",
  },
  {
    img: "https://source.unsplash.com/buWcS7G1_28",
    title: "Training Programs",
  },
  {
    img: "https://source.unsplash.com/UFIZodJgScQ",
    title: "Men's Leagues",
  },
  { img: "https://source.unsplash.com/NW2AVFgqkAg", title: "Coed Leagues" },
];

const court_img = "/basketball_court.svg";

function Main() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    try {
      fetch("/api/events/upcoming")
        .then((response) => response.json())
        .then((data) => {
          setUpcomingEvents(data.events);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="relative -mt-10 w-11/12 mx-auto">
      <div className="pt-4 pb-2 px-4 -mt-10 bg-white relative rounded-lg shadow mb-8">
        <h2 className="font-semibold text-3xl lg:text-5xl border-b-2 pb-4">
          Upcoming events
        </h2>
        <section className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {upcomingEvents.map((event, index) => (
            <SmallCard key={index} img={thumbnails[index]} event={event} />
          ))}
        </section>
      </div>
      <section>
        <h2 className="text-3xl px-4 pb-4 font-semibold text-gray-600 border-b-2">
          Explore it all
        </h2>
        <div className="flex space-x-3 overflow-scroll scrollbar-hide p-4">
          {categories.map((category, index) => {
            return (
              <MediumCard
                key={index}
                img={category.img}
                title={category.title}
              />
            );
          })}
        </div>
      </section>
      <LargeCard img={court_img} />
    </div>
  );
}

export default Main;
