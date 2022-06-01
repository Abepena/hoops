import React from "react";
import Image from "next/image";

function Banner({ children }) {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
      <Image src={"/basketball_court.svg"} layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 -mt-2 w-full text-center">
        {children}
      </div>
    </div>
  );
}

export default Banner;
