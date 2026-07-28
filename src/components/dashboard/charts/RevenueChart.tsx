"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RevenueChartProps {
  data: Array<{
    year: number;
    revenue: number;
    userCount: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const chartData = data.map((item) => ({
    name: `Year ${item.year}`,
    Revenue: item.revenue,
    Users: item.userCount,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis
            dataKey="name"
            stroke="#9E9E9E"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="#8A5CF5"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatCurrency}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#FFC72C"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => val.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              background: "#1A0A3E",
              border: "none",
              borderRadius: "12px",
              color: "#FFF",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", marginTop: "10px" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Revenue"
            stroke="#8A5CF5"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Users"
            stroke="#FFC72C"
            strokeWidth={3}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default RevenueChart;
