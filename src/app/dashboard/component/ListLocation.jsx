import React from "react";
import { formatNumber } from "../../components/function";

export default function ListLocation({ listLocation }) {
  return (
    <>
      <div className="overflow-x-auto h-[29vh]">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs">
          <thead>
            <tr className="font-semibold">
              <th>No</th>
              <th>Location</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {listLocation.length === 0 ? (
              <tr>
                <td className="text-center p-5" colSpan="3">
                  Data Not Found
                </td>
              </tr>
            ) : (
              listLocation.map((list, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.Name}</td>
                  <td>IDR {formatNumber(list.TotalTariff)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* <button className="w-1/2 bg-gray-300 rounded-md">Show more</button> */}
    </>
  );
}
