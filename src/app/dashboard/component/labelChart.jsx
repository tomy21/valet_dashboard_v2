import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function LabelChart({ title, value, avg }) {
  return (
    <div className="flex flex-col justify-start items-start gap-x-1 text-sm">
      <h1 className="font-semibold">{title}</h1>
      <h1 className="text-slate-400 font-medium">{value}</h1>
      <div className="flex flex-row justify-start items-center space-x-2 text-[10px]">
        <div className="flex flex-row justify-center items-center space-x-1">
          {avg > 1 ? (
            <FaArrowTrendUp className="text-green-600" />
          ) : avg === 0 || avg === null ? (
            ""
          ) : (
            <FaArrowTrendDown className="text-red-600" />
          )}
          <p className="text-xs text-slate-400">
            {avg === null ? "0%" : avg.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
