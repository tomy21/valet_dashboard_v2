import React from "react";
import { ScaleLoader } from "react-spinners";

export function LoadingCard() {
  return (
    <div>
      <div className="bg-white mx-auto shadow-md flex justify-center items-center rounded-md w-48 h-[91px] px-2 py-1">
        <ScaleLoader size={50} color={"#333"} loading={true} />
      </div>
    </div>
  );
}

export function LoadingLable() {
  return (
    <div className="flex flex-col justify-start items-start gap-x-1 text-sm">
      <ScaleLoader size={50} color={"#333"} loading={true} />
    </div>
  );
}
