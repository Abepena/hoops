import React from "react";
import Image from "next/image";
import bannerImage from "../assets/basketball-court-banner.png";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
      <Image src={bannerImage} layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 w-full text-center">
          <button className="transition-all bg-red-400 text-white px-10 sm:text-xl py-4 shadow-md hover:shadow-red-600 hover:shadow-2xl rounded -m-6 font-bold">
            Discover new events
          </button>
      </div>
    </div>
  );
}

export default Banner;
