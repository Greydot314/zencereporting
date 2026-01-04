import { useState, useEffect } from "react";
import { CLVData } from "@/types/predictions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign,
  Target,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  AlertTriangle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";
import { cn } from "@/lib/utils";
import { AnimatedCurrency, AnimatedPercentage } from "@/components/ui/animated-number";
import { SkeletonChart } from "@/components/ui/skeleton-chart";
import { toast } from "@/hooks/use-toast";

interface CLVInsightsProps {
  data: CLVData;
  query: string;
}

const tierColors: Record<string, string> = {
  Platinum: "hsl(var(--chart-1))",
  Gold: "hsl(var(--chart-4))",
  Silver: "hsl(var(--muted-foreground))",
  Bronze: "hsl(var(--chart-2))",
};

export const CLVInsights = ({ data, query }: CLVInsightsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const chartData = data.tiers.map((tier) => ({
    name: tier.tier,
    current: tier.currentCLV / 1000,
    predicted: tier.predictedCLV / 1000,
    change: tier.change,
  }));

  const handleTierClick = (tier: string) => {
    setExpandedTier(expandedTier === tier ? null : tier);
  };

  const handleViewDetails = (tierName: string) => {
    toast({
      title: `${tierName} Tier Details`,
      description: `Opening detailed CLV analysis for ${tierName} tier customers...`,
    });
  };

  const handleApplyRecommendation = (recommendation: string) => {
    toast({
      title: "Recommendation Applied",
      description: "Creating campaign based on this recommendation...",
    });
  };

  const handleExportReport = () => {
    toast({
      title: "Exporting CLV Report",
      description: "Your CLV prediction report is being generated...",
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-semibold text-foreground">Customer Lifetime Value Predictions</h3>
            <Badge variant="secondary" className="text-xs">
              {data.modelAccuracy}% accuracy
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            12-month CLV forecast based on your query: <span className="text-foreground font-medium">"{query}"</span>
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-chart-3/5 border border-chart-3/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-chart-3" />
            <span className="text-xs text-muted-foreground">Total Predicted Revenue</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {isLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              <AnimatedCurrency value={data.totalPredictedRevenue} />
            )}
          </div>
          <p className="text-xs text-chart-3 mt-1">12-month projection</p>
        </div>

        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Revenue at Risk</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {isLoading ? (
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            ) : (
              <AnimatedCurrency value={data.revenueAtRisk} />
            )}
          </div>
          <p className="text-xs text-destructive mt-1">From potential churners</p>
        </div>
      </div>

      {/* CLV Chart */}
      <div className="p-5 rounded-xl bg-secondary/20 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">CLV by Tier (in Thousands)</h4>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-xs"
            onClick={handleExportReport}
          >
            Export Report
          </Button>
        </div>
        
        {isLoading ? (
          <SkeletonChart type="bar" className="h-[200px]" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} barGap={8}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
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
                formatter={(value: number, name: string) => [
                  `₹${value.toFixed(1)}K`, 
                  name === 'current' ? 'Current CLV' : 'Predicted CLV'
                ]}
              />
              <Legend 
                iconType="circle" 
                iconSize={8}
                formatter={(value) => value === 'current' ? 'Current CLV' : 'Predicted CLV'}
              />
              <Bar dataKey="current" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} name="current" />
              <Bar dataKey="predicted" radius={[4, 4, 0, 0]} name="predicted">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={tierColors[entry.name] || 'hsl(var(--primary))'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Tier Details */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Tier Breakdown
        </h4>
        
        {data.tiers.map((tier) => (
          <div
            key={tier.tier}
            className={cn(
              "p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md",
              expandedTier === tier.tier 
                ? "bg-secondary/30 border-primary/30" 
                : "bg-secondary/10 border-border hover:border-primary/20"
            )}
            onClick={() => handleTierClick(tier.tier)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: tierColors[tier.tier] }} 
                />
                <div>
                  <span className="font-semibold text-foreground">{tier.tier}</span>
                  <p className="text-xs text-muted-foreground">{tier.customerCount.toLocaleString()} customers</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {isLoading ? (
                      <span className="inline-block w-16 h-4 bg-muted animate-pulse rounded" />
                    ) : (
                      <AnimatedCurrency value={tier.predictedCLV} duration={1000} />
                    )}
                  </p>
                  <div className={cn(
                    "text-xs flex items-center justify-end gap-1",
                    tier.change >= 0 ? "text-chart-3" : "text-destructive"
                  )}>
                    {tier.change >= 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    {isLoading ? (
                      <span className="inline-block w-10 h-3 bg-muted animate-pulse rounded" />
                    ) : (
                      <AnimatedPercentage value={tier.change} duration={1000} />
                    )}
                  </div>
                </div>
                {expandedTier === tier.tier ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
            
            {expandedTier === tier.tier && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current CLV</p>
                    <p className="font-semibold text-foreground">
                      <AnimatedCurrency value={tier.currentCLV} duration={800} />
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Predicted CLV</p>
                    <p className="font-semibold text-foreground">
                      <AnimatedCurrency value={tier.predictedCLV} duration={800} />
                    </p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">Top Drivers</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.topDrivers.map((driver, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {driver}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-full text-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(tier.tier);
                  }}
                >
                  View Full Analysis <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="p-5 rounded-xl bg-secondary/20 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          AI Recommendations
        </h4>
        <div className="space-y-3">
          {data.recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border hover:border-primary/20 transition-colors"
            >
              <Lightbulb className="h-4 w-4 text-chart-4 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{rec}</p>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-7 text-xs text-primary shrink-0"
                onClick={() => handleApplyRecommendation(rec)}
              >
                Apply
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
