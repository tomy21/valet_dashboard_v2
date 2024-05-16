import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartDashboaard({ detailData }) {
  const chartData = detailData.map((item) => ({
    name: `00:${item.Hour}`,
    in: item.TotalIn,
    out: item.TotalOut,
    amt: item.TotalTariff,
  }));
  return (
    <LineChart
      className="text-xs mt-2"
      width={700}
      height={180}
      data={chartData}
    >
      <XAxis dataKey="name" />
      <Tooltip />
      <Line type="monotone" dataKey="in" stroke="#2b6cb0" />
      <Line type="monotone" dataKey="out" stroke="rgb(178, 34, 34)" />
    </LineChart>
  );
}
