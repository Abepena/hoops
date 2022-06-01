import React from "react";
import Image from "next/image";

function LargeCard({ img }) {
  return (
    <section className="relative">
      <img
        src={img}
        className="border h-96 min-w-[300px] w-full object-cover rounded-lg relative"
      />
      <div className="absolute top-12 left-12">
        <div
          className="bg-white shadow-xl
             p-5 rounded-lg"
        >
          <h3 className="text-2xl">Its time for some fun</h3>
          <h4 className="mb-2 text-gray-600">Reach out to get started</h4>
          <button className="transition-all rounded-lg bg-red-400 p-2 text-white font-semibold hover:shadow-xl">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default LargeCard;
