import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopExpenseBarChart({ data }) {
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
          >
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 14 }} />
          <Tooltip />
          <Bar
            dataKey="value"
            radius={[10, 10, 10, 10]}
            fill="#9b8cf2"  
            barSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
