import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#8A2BE2", "#FFA500", "#FFD700"];

export default function ExpensePieChart({ data }) {
  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
