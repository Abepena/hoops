import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import EventList from "../components/Events/EventList";
import Header from "../components/Header";

function Events() {
  return (
    <div className="">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl p-4 font-semibold text-gray-600 border-b-2">
          Events
        </h1>
        <EventList />
      </div>
    </div>
  );
}

export default Events;