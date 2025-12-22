import { CampaignData, ChannelMetrics } from "@/types/aiChat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Smartphone, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle,
  Target,
  BarChart3,
  Zap,
  ArrowRight,
  MousePointer,
  Eye,
  DollarSign,
  Users
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

interface CampaignInsightsProps {
  data: CampaignData;
  query?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Mail,
  MessageSquare,
  Bell,
  Smartphone,
};

export const CampaignInsights = ({ data, query }: CampaignInsightsProps) => {
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

  // Calculate totals
  const totalRevenue = data.channels.reduce((acc, c) => acc + c.revenue, 0);
  const totalDeliveries = data.channels.reduce((acc, c) => acc + c.deliveries, 0);
  const avgRoas = data.channels.reduce((acc, c) => acc + c.roas, 0) / data.channels.length;

  // Chart data
  const channelChartData = data.channels.map(c => ({
    name: c.name,
    revenue: c.revenue / 100000, // in Lakhs
    roas: c.roas,
    ctr: c.ctr,
  }));

  const performanceTrendData = [
    { day: 'Mon', RCS: 4.1, Push: 3.6, Email: 3.0, SMS: 2.6 },
    { day: 'Tue', RCS: 4.3, Push: 3.8, Email: 3.1, SMS: 2.7 },
    { day: 'Wed', RCS: 4.0, Push: 3.7, Email: 3.2, SMS: 2.9 },
    { day: 'Thu', RCS: 4.5, Push: 3.9, Email: 3.1, SMS: 2.8 },
    { day: 'Fri', RCS: 4.2, Push: 4.0, Email: 3.3, SMS: 2.7 },
    { day: 'Sat', RCS: 4.4, Push: 3.8, Email: 3.0, SMS: 2.9 },
    { day: 'Sun', RCS: 4.2, Push: 3.8, Email: 3.2, SMS: 2.8 },
  ];

  const renderChannelCard = (channel: ChannelMetrics) => {
    const Icon = iconMap[channel.icon] || MessageSquare;
    
    return (
      <div
        key={channel.name}
        className="p-5 rounded-xl bg-secondary/20 border border-border hover:border-primary/30 transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-foreground">{channel.name}</span>
              <p className="text-xs text-muted-foreground">{formatNumber(channel.deliveries)} deliveries</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px] uppercase tracking-wider",
              channel.performance === "HIGH" && "bg-chart-3/10 text-chart-3",
              channel.performance === "MEDIUM" && "bg-chart-4/10 text-chart-4",
              channel.performance === "LOW" && "bg-destructive/10 text-destructive"
            )}
          >
            {channel.performance}
          </Badge>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Revenue</span>
            </div>
            <p className="text-lg font-bold text-foreground">{formatCurrency(channel.revenue)}</p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">ROAS</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold text-foreground">{channel.roas}x</p>
              {channel.trend > 0 ? (
                <span className="text-xs text-chart-3 flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" />+{channel.trend}%
                </span>
              ) : (
                <span className="text-xs text-destructive flex items-center gap-0.5">
                  <TrendingDown className="h-3 w-3" />{channel.trend}%
                </span>
              )}
            </div>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <MousePointer className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">CTR</span>
            </div>
            <p className="text-lg font-bold text-foreground">{channel.ctr}%</p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-1.5 mb-1">
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Open Rate</span>
            </div>
            <p className="text-lg font-bold text-foreground">{channel.openRate}%</p>
          </div>
        </div>

        {/* Conversions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-chart-3" />
            <span className="text-sm text-foreground font-medium">{formatNumber(channel.conversions)} conversions</span>
          </div>
          <Button size="sm" variant="ghost" className="h-7 text-xs text-primary hover:bg-primary/10">
            View Details <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* AI Insight Header */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">Campaign Performance Analysis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on your query about <span className="text-foreground font-medium">"{query || 'campaign performance'}"</span>, 
            I've analyzed all channels over the last 30 days. Total revenue generated: <span className="text-primary font-semibold">{formatCurrency(totalRevenue)}</span> with 
            an average ROAS of <span className="text-chart-3 font-semibold">{avgRoas.toFixed(1)}x</span>.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-chart-3" />
            <span className="text-xs text-chart-3">+18.5% vs last month</span>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-chart-4" />
            <span className="text-xs text-muted-foreground">Total Deliveries</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatNumber(totalDeliveries)}</p>
          <p className="text-xs text-muted-foreground mt-1">across all channels</p>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-chart-3" />
            <span className="text-xs text-muted-foreground">Average ROAS</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{avgRoas.toFixed(1)}x</p>
          <p className="text-xs text-chart-3 mt-1">Above target (3.0x)</p>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Best Channel</span>
          </div>
          <p className="text-2xl font-bold text-foreground">RCS</p>
          <p className="text-xs text-primary mt-1">4.2x ROAS</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Channel */}
        <div className="p-5 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Revenue by Channel (in Lakhs)</h4>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={channelChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`₹${value.toFixed(1)}L`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ROAS Trend */}
        <div className="p-5 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Weekly ROAS Trend</h4>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
              />
              <YAxis 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                domain={[2, 5]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Legend iconType="circle" iconSize={8} />
              <Line type="monotone" dataKey="RCS" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Push" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Email" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="SMS" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Cards */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          Channel Performance Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.channels.map(renderChannelCard)}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-5 rounded-xl bg-secondary/20 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          AI Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.recommendations.map((rec, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl",
                rec.type === "success" && "bg-chart-3/5 border border-chart-3/20",
                rec.type === "warning" && "bg-chart-4/5 border border-chart-4/20"
              )}
            >
              {rec.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-chart-3 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-chart-4 shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-foreground leading-relaxed">
                {rec.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
