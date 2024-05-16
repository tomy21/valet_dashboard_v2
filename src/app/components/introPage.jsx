import React from "react";
import Image from "next/image";

const IntroPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src="/images1.png" width={350} height={350} alt="image" />
      <div className="flex flex-row gap-3 items-end justify-center mt-2">
        <Image src="/logo.png" width={50} height={50} alt="image" />
        <h1 className="text-2xl font-semibold">SKY Parking Valet </h1>
      </div>
    </div>
  );
};

export default IntroPage;
