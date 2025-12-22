import { DashboardData, KPICard } from "@/types/aiChat";
import { 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Target, 
  DollarSign, 
  Users, 
  Gift, 
  Coins, 
  BarChart3, 
  ThumbsUp,
  ArrowRight
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardCarouselProps {
  data: DashboardData;
  query?: string;
}

const kpiIcons: Record<string, React.ElementType> = {
  "Total Revenue": DollarSign,
  "Active Members": Users,
  "Redemption Rate": Gift,
  "Points Liability": Coins,
  "Campaign ROI": BarChart3,
  "NPS Score": ThumbsUp,
};

export const DashboardCarousel = ({ data, query }: DashboardCarouselProps) => {
  const renderMiniChart = (kpi: KPICard) => {
    const chartData = kpi.chartData.map((value, index) => ({ value, index }));
    const color = kpi.trend >= 0 ? "hsl(var(--chart-3))" : "hsl(var(--destructive))";
    const gradientId = `gradient-${kpi.id}`;

    if (kpi.chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={80}>
        <BarChart data={chartData}>
          <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} opacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Calculate some totals for insights
  const revenueKPI = data.kpis.find(k => k.title === "Total Revenue");
  const membersKPI = data.kpis.find(k => k.title === "Active Members");

  return (
    <div className="space-y-6 w-full">
      {/* AI Insight Header */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">Dashboard Overview</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on your query about <span className="text-foreground font-medium">"{query || 'dashboard metrics'}"</span>, 
            here are the key performance indicators for this month. Revenue is at <span className="text-primary font-semibold">{revenueKPI?.value}</span> with 
            <span className="text-chart-3 font-semibold"> {membersKPI?.value}</span> active members.
          </p>
        </div>
      </div>

      {/* KPI Grid - Full Width Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.kpis.map((kpi) => {
          const KPIIcon = kpiIcons[kpi.title] || BarChart3;
          return (
            <div
              key={kpi.id}
              className="p-5 rounded-xl bg-secondary/20 border border-border hover:border-primary/30 transition-all hover:shadow-md group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <KPIIcon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </span>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    kpi.trend >= 0 ? "bg-chart-3/10 text-chart-3" : "bg-destructive/10 text-destructive"
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
              <p className="text-3xl font-bold text-foreground mb-4">{kpi.value}</p>

              {/* Chart */}
              <div className="mb-4">{renderMiniChart(kpi)}</div>

              {/* AI Insight */}
              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {kpi.insight}
                </p>
              </div>

              {/* Action */}
              <Button
                size="sm"
                variant="ghost"
                className="w-full mt-3 h-8 text-xs text-primary hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                View Details <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Summary Insights */}
      <div className="p-5 rounded-xl bg-secondary/20 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Key Takeaways
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-chart-3/5 rounded-lg border border-chart-3/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-chart-3" />
              <span className="text-sm font-medium text-foreground">Strong Growth</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Active member base growing at 12.3%, driven by referral program performance.
            </p>
          </div>
          <div className="p-4 bg-chart-4/5 rounded-lg border border-chart-4/20">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-chart-4" />
              <span className="text-sm font-medium text-foreground">Watch: Redemption</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Redemption rate slightly declining. Consider adding new reward categories.
            </p>
          </div>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Best Quarter</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Campaign ROI at 3.8x - best performing quarter due to personalization efforts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
