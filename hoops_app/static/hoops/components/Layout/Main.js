import React, { useState, useEffect } from "react";
import LargeCard from "./LargeCard";
import MediumCard from "./MediumCard";
import SmallCard from "./SmallCard";
import useHorizontalScroll from "../useSideScroll";

const thumbnails = [
  "timer_thumb.png",
  "strength_thumb.png",
  "basketball_thumb.png",
  "basketball_thumb.png",
  "trophy_thumb.png",
  "trophy_thumb.png",
  "trophy_thumb.png",
];

const training_categories = [
  { img: "pickup-game.jpg", title: "Open gym runs & Pick up games" },
  { img: "dunk.jpg", title: "Open seminars & practices" },
  { img: "color-court.jpg", title: "Rec League Sign Ups" },
  { img: "training.jpg", title: "Training Programs" },
  { img: "mens-leagues.jpg", title: "Men's Leagues" },
  { img: "womens-basketball.jpg", title: "Coed Leagues" },
];

const court_img = "/basketball_court.svg";

function Main({ upcomingEvents }) {
  const scrollRef = useHorizontalScroll();

  return (
    <div className="relative -mt-10 container w-11/12 mx-auto">
      <div className="p-6 -mt-10 bg-white relative rounded-lg shadow mb-8">
        <h2 className="font-semibold text-gray-600 text-3xl border-b-2 pb-4">
          Upcoming events
        </h2>
        <section className="pt-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {upcomingEvents.map((event, index) => (
            <SmallCard key={index} event={event} />
          ))}
        </section>
      </div>
      <section>
        <h2 className="text-3xl px-4 pb-4 font-semibold text-gray-600 border-b-2">
          Explore it all
        </h2>
        <div
          ref={scrollRef}
          className="flex space-x-3 overflow-scroll scrollbar-hide p-4 scroll-touch"
        >
          {training_categories.map((category, index) => {
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
      <LargeCard img="/lazy-basketball.jpg" />
    </div>
  );
}

export default Main;
