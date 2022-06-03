import React from "react";
import Image from "next/image";
import Modal from "../Modal";

function LargeCard({ img }) {
  return (
    <section className="relative h-96 min-w-[300px] w-full">
      <Image
        src={img || "/lazy-basketball.jpg"}
        layout="fill"
        objectFit="cover"
        className="rounded-lg border"
      />
      <div className="absolute top-12 right-12">
        <div className="bg-white shadow-xl p-5 rounded-lg">
          <h3 className="text-2xl">Its time for some fun</h3>
          <h4 className="mb-2 text-gray-600">Reach out to get started</h4>
          <Modal text="Contact Us" />
        </div>
      </div>
    </section>
  );
}

export default LargeCard;
