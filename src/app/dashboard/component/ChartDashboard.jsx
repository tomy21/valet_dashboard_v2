import React from "react";
import { LineChart, Line, XAxis, Tooltip, YAxis } from "recharts";

export default function ChartDashboard({
  detailData = [],
  activeButton = "daily",
}) {
  const chartData = detailData.map((item) => {
    let name;
    if (activeButton === "daily") {
      name = `${item.Hour}:00`;
    } else if (activeButton === "monthly") {
      const formattedDate = item.Date;
      if (formattedDate && formattedDate.length >= 10) {
        const date = formattedDate.substring(8, 10);
        name = date;
      } else {
        const formattedDate = item.Year;
        if (formattedDate && formattedDate.length >= 7) {
          const year = formattedDate.substring(5, 7);
          name = year;
        } else {
          name = "Unknown Month";
        }
      }
    } else {
      name = item.Year;
    }

    return {
      name: name,
      in: item.TotalIn,
      out: item.TotalOut,
      amt: item.TotalTariff,
    };
  });

  const maxValue = Math.max(
    ...chartData.map((data) => Math.max(data.in, data.out))
  );

  return (
    <LineChart
      className="text-xs mt-2 -ml-10"
      width={750}
      height={180}
      data={chartData}
      connectNulls={true}
    >
      <XAxis dataKey="name" />
      <YAxis domain={[0, maxValue]} />
      <Tooltip />
      <Line type="monotone" dataKey="in" stroke="#2b6cb0" />
      <Line type="monotone" dataKey="out" stroke="rgb(178, 34, 34)" />
    </LineChart>
  );
}
