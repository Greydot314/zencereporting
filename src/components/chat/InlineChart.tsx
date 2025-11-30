import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface InlineChartProps {
  type: "bar" | "line" | "area";
  data: any[];
  title?: string;
  dataKey?: string;
  nameKey?: string;
}

export const InlineChart = ({ type, data, title, dataKey = "value", nameKey = "name" }: InlineChartProps) => {
  const chartColor = "hsl(199, 89%, 55%)";
  const mutedColor = "hsl(215, 20%, 45%)";
  
  return (
    <Card className="p-4 glass border-border/50">
      {title && (
        <p className="text-xs font-medium text-muted-foreground mb-3">{title}</p>
      )}
      <div className="w-full h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          {type === "bar" ? (
            <BarChart data={data}>
              <XAxis 
                dataKey={nameKey} 
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 10%)",
                  border: "1px solid hsl(222, 47%, 20%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 40%, 98%)"
                }}
                cursor={{ fill: 'hsl(222, 47%, 14%)' }}
              />
              <Bar 
                dataKey={dataKey} 
                fill={chartColor} 
                radius={[4, 4, 0, 0]}
                style={{ filter: 'drop-shadow(0 0 8px hsl(199, 89%, 55%, 0.3))' }}
              />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey={nameKey} 
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: mutedColor, fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(222, 47%, 10%)",
                  border: "1px solid hsl(222, 47%, 20%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 40%, 98%)"
                }}
              />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={chartColor}
                strokeWidth={2}
                fill="url(#chartGradient)"
                style={{ filter: 'drop-shadow(0 0 8px hsl(199, 89%, 55%, 0.3))' }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
