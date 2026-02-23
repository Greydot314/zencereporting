import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartWidgetProps {
  title: string;
  data: { name: string; value: number }[];
  colorVar: string;
  chartType?: "area" | "bar" | "pie";
}

const PIE_COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(152, 76%, 36%)",
  "hsl(38, 92%, 50%)",
];

export const ChartWidget = ({ title, data, colorVar, chartType }: ChartWidgetProps) => {
  const color = `hsl(var(--${colorVar}))`;
  // Auto-detect: if all values add near 100, use pie
  const sumValues = data.reduce((s, d) => s + d.value, 0);
  const type = chartType || (sumValues <= 110 && data.length <= 5 ? "pie" : "area");

  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="p-3 rounded-lg bg-card border border-border">
        <ResponsiveContainer width="100%" height={180}>
          {type === "pie" ? (
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} strokeWidth={2}>
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          ) : type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`grad-${colorVar}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="value" stroke={color} fill={`url(#grad-${colorVar})`} strokeWidth={2} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
