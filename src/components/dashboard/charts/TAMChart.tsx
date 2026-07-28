"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface TAMChartProps {
  tam: number;
  sam: number;
  som: number;
  eli5Mode?: boolean;
}

export function TAMChart({ tam, sam, som, eli5Mode = false }: TAMChartProps) {
  const data = [
    { name: eli5Mode ? "Total Market" : "TAM", value: tam, fill: "#8A5CF5" },
    { name: eli5Mode ? "Accessible Niche" : "SAM", value: sam, fill: "#C5B8E0" },
    { name: eli5Mode ? "Immediate Target" : "SOM", value: som, fill: "#FFC72C" },
  ];

  const formatCurrency = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="h-60 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            stroke="#9E9E9E"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9E9E9E"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <Tooltip
            formatter={(value: any) => [formatCurrency(value as number), "Market Size"]}
            contentStyle={{
              background: "#1A0A3E",
              border: "none",
              borderRadius: "12px",
              color: "#FFF",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={45}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default TAMChart;
