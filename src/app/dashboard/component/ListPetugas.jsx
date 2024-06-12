import React from "react";

export default function ListPetugas({ listOfficer }) {
  return (
    <div className="h-full">
      <div className="overflow-x-auto h-[25vh]">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs">
          <thead>
            <tr className="font-semibold">
              <th>No</th>
              <th>Officer Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {listOfficer.length === 0 ? (
              <tr>
                <td className="text-center p-5" colSpan="3">
                  Data Not Found
                </td>
              </tr>
            ) : (
              listOfficer.map((list, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {list.Name} ({list.ShortName})
                  </td>
                  <td>{list.TotalTrx}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* <button className="w-1/2 mt-2 bg-gray-300 rounded-md">Show more</button> */}
    </div>
  );
}
