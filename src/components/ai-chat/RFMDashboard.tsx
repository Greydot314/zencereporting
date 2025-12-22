import { RFMData } from "@/types/aiChat";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface RFMDashboardProps {
  data: RFMData;
}

export const RFMDashboard = ({ data }: RFMDashboardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };

  return (
    <div className="space-y-4 w-full max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">RFM Segmentation</h3>
          <p className="text-sm text-muted-foreground">
            {formatNumber(data.totalCustomers)} customers • {data.period}
          </p>
        </div>
      </div>

      {/* Chart */}
      <Card className="p-4 bg-card border-border">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data.chartData} layout="vertical">
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              width={70}
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value: number) => [formatNumber(value), 'Customers']}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.segments.slice(0, 4).map((segment) => (
          <Card
            key={segment.id}
            className="p-4 bg-card border-border hover:border-primary/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="font-medium text-sm text-foreground">
                  {segment.name}
                </span>
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px]",
                  segment.priority === "high" && "bg-destructive/10 text-destructive",
                  segment.priority === "medium" && "bg-chart-4/10 text-chart-4",
                  segment.priority === "low" && "bg-muted text-muted-foreground"
                )}
              >
                {segment.priority}
              </Badge>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatNumber(segment.count)} ({segment.percentage}%)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatCurrency(segment.avgMonetary)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {segment.avgRecency}d
                </span>
              </div>
            </div>

            {/* Recommendation */}
            <div className="flex items-start gap-2 p-2 bg-secondary/50 rounded-lg">
              <Zap className="h-3 w-3 text-primary mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {segment.campaignRecommendation}
              </p>
            </div>

            {/* Action */}
            <Button
              size="sm"
              variant="ghost"
              className="w-full mt-3 h-8 text-xs text-primary hover:bg-primary/5"
            >
              Create Campaign
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
