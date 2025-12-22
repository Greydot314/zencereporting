import { DashboardData, KPICard } from "@/types/aiChat";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DashboardCarouselProps {
  data: DashboardData;
}

export const DashboardCarousel = ({ data }: DashboardCarouselProps) => {
  const renderMiniChart = (kpi: KPICard) => {
    const chartData = kpi.chartData.map((value, index) => ({ value, index }));
    const color = kpi.trend >= 0 ? "hsl(var(--chart-3))" : "hsl(var(--destructive))";

    if (kpi.chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={40}>
        <BarChart data={chartData}>
          <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-3 w-full">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Dashboard KPIs</h3>
        <p className="text-sm text-muted-foreground">Key performance metrics • This month</p>
      </div>

      {/* Scrollable KPI Cards */}
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-3 pb-2">
          {data.kpis.map((kpi) => (
            <Card
              key={kpi.id}
              className="flex-shrink-0 w-[220px] p-4 bg-card border-border hover:border-primary/20 transition-colors"
            >
              {/* Title & Trend */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">
                  {kpi.title}
                </span>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    kpi.trend >= 0 ? "text-chart-3" : "text-destructive"
                  )}
                >
                  {kpi.trend >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(kpi.trend)}%</span>
                </div>
              </div>

              {/* Value */}
              <p className="text-2xl font-bold text-foreground mb-3">{kpi.value}</p>

              {/* Mini Chart */}
              <div className="mb-3">{renderMiniChart(kpi)}</div>

              {/* AI Insight */}
              <div className="flex items-start gap-2 p-2 bg-secondary/50 rounded-lg">
                <Sparkles className="h-3 w-3 text-primary mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed whitespace-normal">
                  {kpi.insight}
                </p>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
