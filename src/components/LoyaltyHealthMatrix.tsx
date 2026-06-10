import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Coins, Users, Repeat, Clock, ShoppingBag, Award, Crown, Ticket, BadgePercent, IndianRupee, Info, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

const MetaChips = ({ period, definition }: { period: string; definition: string }) => (
  <div className="flex items-center gap-1 shrink-0">
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-background/60 border border-border/60 text-[9px] uppercase tracking-wide text-muted-foreground cursor-help">
          <CalendarClock className="h-2.5 w-2.5" />
          {period}
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs max-w-[220px]">Time period: {period}</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Definition">
          <Info className="h-3 w-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs max-w-[260px] leading-relaxed">{definition}</TooltipContent>
    </Tooltip>
  </div>
);

interface EngagementMetric {
  label: string;
  value: string;
  change: number;
  status: "healthy" | "warning" | "critical";
  icon: React.ElementType;
}

interface TierData {
  name: string;
  members: number;
  percentage: number;
  color: string;
}

interface LiabilityData {
  earned: number;
  burned: number;
  ratio: number;
  status: "balanced" | "excess" | "bleeding";
}

interface EngagementMetricFull extends EngagementMetric {
  period: string;
  definition: string;
}

// Mock config - this would come from program settings
const programConfig = {
  isTierEnabled: true, // Toggle this to show/hide tier distribution
};

// Tier distribution data
const tierData: TierData[] = [
  { name: "Platinum", members: 12450, percentage: 8, color: "bg-[hsl(var(--chart-1))]" },
  { name: "Gold", members: 34200, percentage: 22, color: "bg-[hsl(var(--chart-2))]" },
  { name: "Silver", members: 58900, percentage: 38, color: "bg-[hsl(var(--chart-3))]" },
  { name: "Bronze", members: 49650, percentage: 32, color: "bg-[hsl(var(--chart-4))]" },
];

// Engagement metrics for all programs
const engagementMetrics: EngagementMetricFull[] = [
  { label: "Repeat Purchase Rate", value: "34.2%", change: 2.8, status: "healthy", icon: Repeat, period: "Last 90 days", definition: "Share of members who made more than one purchase in the period. Formula: (Members with ≥2 orders ÷ Active Members) × 100." },
  { label: "Avg. Time Between Purchases", value: "18 days", change: -3.1, status: "healthy", icon: Clock, period: "Last 90 days", definition: "Mean gap (in days) between consecutive purchases for repeat members in the period. Lower is better." },
  { label: "Basket Size (Members)", value: "₹2,847", change: 5.4, status: "healthy", icon: ShoppingBag, period: "Last 30 days", definition: "Average order value across all member transactions in the period. Formula: Member Sales ÷ Member Orders." },
  { label: "Reward Redemption Rate", value: "68.5%", change: -1.2, status: "warning", icon: Award, period: "Last 30 days", definition: "Share of earned points that members burned in the period. Formula: (Points Burned ÷ Points Earned) × 100." },
];

// Mock liability data
const liabilityData: LiabilityData = {
  earned: 24500000,
  burned: 11200000,
  ratio: 2.19,
  status: "excess",
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-[hsl(var(--atlas-success))]/10 text-[hsl(var(--atlas-success))] border-[hsl(var(--atlas-success))]/20";
    case "warning":
      return "bg-[hsl(var(--atlas-warning))]/10 text-[hsl(var(--atlas-warning))] border-[hsl(var(--atlas-warning))]/20";
    case "critical":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "";
  }
};

const formatPoints = (value: number) => {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
  return value.toLocaleString();
};

const formatMembers = (value: number) => {
  if (value >= 100000) return `${(value / 1000).toFixed(0)}K`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toLocaleString();
};

export const LoyaltyHealthMatrix = () => {
  const getLiabilityNarrative = () => {
    if (liabilityData.ratio > 2.0) {
      return {
        text: "Excess liability building—consider accelerating burn campaigns or limiting earn multipliers.",
        color: "text-[hsl(var(--atlas-warning))]",
      };
    }
    if (liabilityData.ratio < 0.5) {
      return {
        text: "Points bleeding faster than accumulation—loyalty value eroding.",
        color: "text-destructive",
      };
    }
    return {
      text: "Earn/Burn ratio within healthy parameters.",
      color: "text-[hsl(var(--atlas-success))]",
    };
  };

  const liabilityNarrative = getLiabilityNarrative();
  const totalMembers = tierData.reduce((sum, tier) => sum + tier.members, 0);

  return (
    <TooltipProvider delayDuration={150}>
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Loyalty Health Matrix
        </h2>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" /> Hover any KPI for its window & definition
        </span>
      </div>

      {/* Tier Distribution Section - Only shown if tiers are enabled */}
      {programConfig.isTierEnabled && (
        <section className="animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center gap-2 mb-3">
            <Crown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Tier Distribution</span>
            <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
              {formatMembers(totalMembers)} members
            </Badge>
          </div>
          <div className="space-y-2">
            {tierData.map((tier) => (
              <div key={tier.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-16">{tier.name}</span>
                <div className="flex-1">
                  <Progress value={tier.percentage} className="h-2" />
                </div>
                <span className="text-xs font-medium text-foreground w-10 text-right">{tier.percentage}%</span>
                <span className="text-xs text-muted-foreground w-14 text-right">{formatMembers(tier.members)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 pl-6 border-l-2 border-primary/20">
            Platinum tier grew 12% MoM. Consider targeted upgrade campaigns for top Silver members.
          </p>
        </section>
      )}

      {programConfig.isTierEnabled && <div className="h-px bg-border" />}

      {/* Member Engagement Section */}
      <section className="animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Member Engagement</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {engagementMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-md bg-primary/10">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className={`text-[10px] ${getStatusStyle(metric.status)}`}>
                      {metric.status}
                    </Badge>
                    <MetaChips period={metric.period} definition={metric.definition} />
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground mb-0.5">{metric.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-1">
                    {metric.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-[hsl(var(--atlas-success))]" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-destructive" />
                    )}
                    <span className={`text-xs font-medium ${
                      metric.change > 0 ? "text-[hsl(var(--atlas-success))]" : "text-destructive"
                    }`}>
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3 pl-6 border-l-2 border-primary/20">
          Repeat purchase rate up 2.8%. Redemption rate slightly declining—consider targeted burn campaigns.
        </p>
      </section>

      <div className="h-px bg-border" />

      {/* Liability Section */}
      <section className="animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-2 mb-3">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Points Liability</span>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Earned (7d)</p>
              <MetaChips period="Last 7 days" definition="Total loyalty points issued to members across all earn rules in the last 7 days." />
            </div>
            <p className="text-lg font-semibold text-foreground flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-[hsl(var(--atlas-success))]" />
              {formatPoints(liabilityData.earned)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Burned (7d)</p>
              <MetaChips period="Last 7 days" definition="Total loyalty points redeemed by members against rewards in the last 7 days." />
            </div>
            <p className="text-lg font-semibold text-foreground flex items-center gap-1">
              <TrendingDown className="h-4 w-4 text-destructive" />
              {formatPoints(liabilityData.burned)}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Earn/Burn Ratio</p>
              <MetaChips period="Last 7 days" definition="Earned ÷ Burned points. >2.0 signals excess liability; <0.5 signals value erosion." />
            </div>
            <p className={`text-lg font-semibold ${
              liabilityData.ratio > 2.0 ? "text-[hsl(var(--atlas-warning))]" :
              liabilityData.ratio < 0.5 ? "text-destructive" : "text-[hsl(var(--atlas-success))]"
            }`}>
              {liabilityData.ratio.toFixed(2)}x
            </p>
          </div>
        </div>
        <p className={`text-xs ${liabilityNarrative.color} pl-6 border-l-2 border-[hsl(var(--atlas-warning))]/20`}>
          {liabilityNarrative.text}
        </p>
      </section>

      <div className="h-px bg-border" />

      {/* Coupon & Sales KPIs Section */}
      <section className="animate-fade-in" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center gap-2 mb-3">
          <Ticket className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Coupon & Sales Metrics</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-md bg-primary/10">
                <Users className="h-3.5 w-3.5 text-primary" />
              </div>
              <MetaChips period="Last 30 days" definition="Unique members who redeemed at least one coupon in the period." />
            </div>
            <p className="text-lg font-semibold text-foreground">18.4K</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Coupon Redeemers</p>
              <div className="flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3 text-[hsl(var(--atlas-success))]" />
                <span className="text-[10px] text-[hsl(var(--atlas-success))]">+12.3%</span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-md bg-[hsl(var(--atlas-success))]/10">
                <IndianRupee className="h-3.5 w-3.5 text-[hsl(var(--atlas-success))]" />
              </div>
              <MetaChips period="Last 30 days" definition="Gross sales from transactions where at least one coupon was applied." />
            </div>
            <p className="text-lg font-semibold text-foreground">₹4.2Cr</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Coupon-Driven Sales</p>
              <div className="flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3 text-[hsl(var(--atlas-success))]" />
                <span className="text-[10px] text-[hsl(var(--atlas-success))]">+8.7%</span>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <div className="flex items-center justify-between mb-2">
              <div className="p-1.5 rounded-md bg-[hsl(var(--atlas-warning))]/10">
                <BadgePercent className="h-3.5 w-3.5 text-[hsl(var(--atlas-warning))]" />
              </div>
              <MetaChips period="Last 30 days" definition="Total discount value given via coupons in the period. Watch vs. coupon-driven sales for margin impact." />
            </div>
            <p className="text-lg font-semibold text-foreground">₹38.5L</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Coupon Discount</p>
              <div className="flex items-center gap-0.5">
                <ArrowDownRight className="h-3 w-3 text-destructive" />
                <span className="text-[10px] text-destructive">+15.2%</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3 pl-6 border-l-2 border-primary/20">
          Coupon redemptions driving ₹4.2Cr in sales. Monitor discount growth to maintain margin health.
        </p>
      </section>
    </div>
    </TooltipProvider>
  );
};
