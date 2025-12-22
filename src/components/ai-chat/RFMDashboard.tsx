import { RFMData } from "@/types/aiChat";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  DollarSign, 
  Zap, 
  Crown, 
  Heart, 
  Star, 
  AlertTriangle, 
  UserMinus, 
  UserPlus,
  Target,
  BarChart3,
  PieChart,
  ArrowRight
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart as RechartsPie,
  Pie,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";

interface RFMDashboardProps {
  data: RFMData;
  query?: string;
}

const segmentIcons: Record<string, React.ElementType> = {
  vip: Crown,
  loyal: Heart,
  potential: Star,
  "at-risk": AlertTriangle,
  churned: UserMinus,
  new: UserPlus,
};

export const RFMDashboard = ({ data, query }: RFMDashboardProps) => {
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

  // Calculate totals for insights
  const totalMonetary = data.segments.reduce((acc, s) => acc + (s.count * s.avgMonetary), 0);
  const vipRevenue = data.segments.find(s => s.id === "vip");
  const atRiskSegment = data.segments.find(s => s.id === "at-risk");

  return (
    <div className="space-y-6 w-full">
      {/* AI Insight Header */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">RFM Segmentation Analysis</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on your query about <span className="text-foreground font-medium">"{query || 'customer segments'}"</span>, 
            I've analyzed <span className="text-primary font-semibold">{formatNumber(data.totalCustomers)}</span> customers 
            over the {data.period.toLowerCase()}. Here's the breakdown with actionable insights.
          </p>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Customers</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatNumber(data.totalCustomers)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-chart-3" />
            <span className="text-xs text-chart-3">+12.4% vs last period</span>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-4 w-4 text-chart-4" />
            <span className="text-xs text-muted-foreground">VIP Contribution</span>
          </div>
          <p className="text-2xl font-bold text-foreground">32%</p>
          <p className="text-xs text-muted-foreground mt-1">of total revenue</p>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">At Risk Value</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(atRiskSegment?.count ? atRiskSegment.count * atRiskSegment.avgMonetary : 0)}</p>
          <p className="text-xs text-destructive mt-1">Needs immediate action</p>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Avg. Order Value</span>
          </div>
          <p className="text-2xl font-bold text-foreground">₹18.2K</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-chart-3" />
            <span className="text-xs text-chart-3">+5.8%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="p-5 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Segment Distribution</h4>
          </div>
          <ResponsiveContainer width="100%" height={220}>
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
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="p-5 rounded-xl bg-secondary/20 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Revenue by Segment</h4>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RechartsPie>
              <Pie
                data={data.chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [formatNumber(value), 'Customers']}
              />
              <Legend 
                iconType="circle" 
                iconSize={8}
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
              />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segment Cards */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Segment Details & Recommendations
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.segments.map((segment) => {
            const SegmentIcon = segmentIcons[segment.id] || Users;
            return (
              <div
                key={segment.id}
                className="p-4 rounded-xl bg-secondary/20 border border-border hover:border-primary/30 transition-all hover:shadow-md group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${segment.color}20` }}
                    >
                      <SegmentIcon className="h-4 w-4" style={{ color: segment.color }} />
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-foreground">
                        {segment.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {formatNumber(segment.count)} customers
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] uppercase tracking-wider",
                      segment.priority === "high" && "bg-destructive/10 text-destructive",
                      segment.priority === "medium" && "bg-chart-4/10 text-chart-4",
                      segment.priority === "low" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {segment.priority} priority
                  </Badge>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-center">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{formatCurrency(segment.avgMonetary)}</p>
                    <p className="text-[10px] text-muted-foreground">Avg. Value</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{segment.avgRecency}d</p>
                    <p className="text-[10px] text-muted-foreground">Recency</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{segment.avgFrequency}x</p>
                    <p className="text-[10px] text-muted-foreground">Frequency</p>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {segment.campaignRecommendation}
                  </p>
                </div>

                {/* Action Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-3 h-9 text-xs text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Create Campaign
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
