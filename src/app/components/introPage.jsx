import React from "react";
import Image from "next/image";

const IntroPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/images1.png"
        width={350}
        height={350}
        alt="image"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,..."
      />
      <div className="flex flex-row gap-3 items-end justify-center mt-2">
        <div className="w-auto h-70">
          <Image
            src="/logo.png"
            width={70}
            height={70}
            alt="image"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,..."
          />
        </div>
        <h1 className="text-2xl font-semibold">SKY Parking Valet </h1>
      </div>
    </div>
  );
};

export default IntroPage;
