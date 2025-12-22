import { CampaignData, ChannelMetrics } from "@/types/aiChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Bell, Smartphone, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignInsightsProps {
  data: CampaignData;
}

const iconMap: Record<string, React.ElementType> = {
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
};

export const CampaignInsights = ({ data }: CampaignInsightsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    return `₹${formatNumber(num)}`;
  };

  const renderChannelCard = (channel: ChannelMetrics) => {
    const Icon = iconMap[channel.icon] || MessageSquare;
    
    return (
      <Card
        key={channel.name}
        className="p-4 bg-card border-border hover:border-primary/20 transition-colors"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">{channel.name}</span>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px]",
              channel.performance === "HIGH" && "bg-chart-3/10 text-chart-3",
              channel.performance === "MEDIUM" && "bg-chart-4/10 text-chart-4",
              channel.performance === "LOW" && "bg-destructive/10 text-destructive"
            )}
          >
            {channel.performance}
          </Badge>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              Deliveries
            </p>
            <p className="text-sm font-medium text-foreground">
              {formatNumber(channel.deliveries)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              Revenue
            </p>
            <p className="text-sm font-medium text-foreground">
              {formatCurrency(channel.revenue)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              CTR
            </p>
            <p className="text-sm font-medium text-foreground">{channel.ctr}%</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
              ROAS
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">
                {channel.roas}x
              </span>
              {channel.trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-chart-3" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
            </div>
          </div>
        </div>

        {/* Open Rate */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Open Rate</span>
          <span className="text-xs font-medium text-foreground">
            {channel.openRate}%
          </span>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-4 w-full max-w-4xl">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
        <p className="text-sm text-muted-foreground">Channel comparison • Last 30 days</p>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.channels.map(renderChannelCard)}
      </div>

      {/* Recommendations */}
      <Card className="p-4 bg-card border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Recommendations</h4>
        <div className="space-y-2">
          {data.recommendations.map((rec, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-2 p-2 rounded-lg text-sm",
                rec.type === "success" && "bg-chart-3/5",
                rec.type === "warning" && "bg-chart-4/5"
              )}
            >
              {rec.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-chart-3 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-chart-4 shrink-0 mt-0.5" />
              )}
              <p className="text-muted-foreground text-xs leading-relaxed">
                {rec.message}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
