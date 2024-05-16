import React, { useCallback, useState } from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";

const data01 = [
  { name: "Gopay", value: 4000 },
  { name: "Dana", value: 1000 },
  { name: "Link-Aja", value: 300 },
  { name: "Ovo", value: 200 },
];

const PiePayment = () => {
  return (
    <div className="text-xs">
      <h1 className="text-sm font-semibold">Payment</h1>
      <PieChart width={500} height={190}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx={120}
          cy={100}
          outerRadius={60}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PiePayment;
