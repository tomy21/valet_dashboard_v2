import React from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export default function Card({ title, value, avg, status }) {
  return (
    <div>
      <div className="bg-white shadow-md rounded-md w-48 h-[91px] px-2 py-1">
        <h2 className="text-sm text-stone-500 font-medium">{title}</h2>
        <p className="font-medium mt-2 mb-3 text-lg">{value}</p>
        <div className="flex flex-row justify-start items-center space-x-2">
          <div className="flex flex-row space-x-1">
            {avg > 1 ? (
              <FaArrowTrendUp className="text-green-600" />
            ) : (
              <FaArrowTrendDown className="text-red-600" />
            )}
            <p className="text-xs text-slate-400">{(avg * 100).toFixed(2)}%</p>
          </div>
          <p className="text-xs text-slate-400">Vs last {status}</p>
        </div>
      </div>
    </div>
  );
}
