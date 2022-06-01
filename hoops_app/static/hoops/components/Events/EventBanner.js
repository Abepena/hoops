import React from "react";
import Image from "next/image";

function EventBanner({ src, children }) {
  return (
    <div className="relative h-[200px] sm:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] ">
      <Image
        src={src || `/basketball_court.svg`}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute w-full h-full text-center">
        <div className="w-full h-full text-center grid place-items-center ">{children}</div>
      </div>
    </div>
  );
}

export default EventBanner;
