import { TrendingUp, TrendingDown, Users, CreditCard, Target, Percent, Info, CalendarClock } from "lucide-react";
import { AnimatedNumber, AnimatedPercentage, AnimatedCurrency } from "@/components/ui/animated-number";
import { ChartEmptyState } from "@/components/ui/chart-empty-state";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface StatCardProps {
  title: string;
  value: string;
  numericValue: number;
  valueType: "percentage" | "currency" | "number" | "millions";
  change: string;
  changeValue: number;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  period: string;
  definition: string;
  delay?: number;
}

const StatCard = ({ title, value, numericValue, valueType, change, changeValue, changeType, icon: Icon, period, definition, delay = 0 }: StatCardProps) => {
  const changeColor = {
    positive: "text-[hsl(var(--atlas-success))]",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  const TrendIcon = changeType === "positive" ? TrendingUp : changeType === "negative" ? TrendingDown : TrendingUp;

  const renderValue = () => {
    switch (valueType) {
      case "percentage":
        return <><AnimatedNumber value={numericValue} formatFn={(v) => v.toFixed(1)} />%</>;
      case "currency":
        return <AnimatedCurrency value={numericValue} />;
      case "millions":
        return <><AnimatedNumber value={numericValue} formatFn={(v) => v.toFixed(2)} />M</>;
      default:
        return <AnimatedNumber value={numericValue} />;
    }
  };

  return (
    <div
      className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span>
            {changeType === "positive" ? "+" : ""}<AnimatedNumber value={changeValue} formatFn={(v) => v.toFixed(1)} />%
          </span>
        </div>
      </div>
      <p className="text-2xl font-semibold text-foreground mb-1">{renderValue()}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground truncate">{title}</p>
        <div className="flex items-center gap-1 shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-background/60 border border-border/60 text-[9px] uppercase tracking-wide text-muted-foreground cursor-help">
                <CalendarClock className="h-2.5 w-2.5" />
                {period}
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs max-w-[220px]">
              Time period: {period}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={`${title} definition`}>
                <Info className="h-3 w-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs max-w-[260px] leading-relaxed">
              {definition}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const stats: StatCardProps[] = [
  {
    title: "Loyalty Share of Sales",
    value: "42.3%",
    numericValue: 42.3,
    valueType: "percentage",
    change: "+2.1%",
    changeValue: 2.1,
    changeType: "positive",
    icon: Percent,
    period: "Last 30 days",
    definition: "Share of total store sales attributable to identified loyalty members in the period. Formula: (Member Sales ÷ Total Sales) × 100.",
  },
  {
    title: "Active Members",
    value: "1.24M",
    numericValue: 1.24,
    valueType: "millions",
    change: "+4.5%",
    changeValue: 4.5,
    changeType: "positive",
    icon: Users,
    period: "Last 90 days",
    definition: "Unique loyalty members with at least one qualifying transaction or engagement event in the trailing 90 days.",
  },
  {
    title: "Points Redeemed (₹)",
    value: "₹8.2Cr",
    numericValue: 82000000,
    valueType: "currency",
    change: "-1.2%",
    changeValue: 1.2,
    changeType: "negative",
    icon: CreditCard,
    period: "Last 30 days",
    definition: "Monetary value of loyalty points burned by members during the period, converted at the configured redemption rate.",
  },
  {
    title: "Redemption Rate",
    value: "68.5%",
    numericValue: 68.5,
    valueType: "percentage",
    change: "+3.2%",
    changeValue: 3.2,
    changeType: "positive",
    icon: Target,
    period: "Last 30 days",
    definition: "Share of issued points that were redeemed in the period. Formula: (Points Burned ÷ Points Earned) × 100.",
  },
  {
    title: "Avg. CLTV",
    value: "₹24,500",
    numericValue: 24500,
    valueType: "currency",
    change: "+8.2%",
    changeValue: 8.2,
    changeType: "positive",
    icon: TrendingUp,
    period: "Lifetime",
    definition: "Predicted Customer Lifetime Value — expected net revenue from an average member across their full lifecycle, modelled on historical purchase frequency, AOV, and retention.",
  },
];

export const PerformanceSummary = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <section className="animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-base font-medium text-foreground">Performance Summary</h3>
          </div>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Info className="h-3 w-3" /> Hover any KPI for its time window & definition
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.length === 0 ? (
            <div className="col-span-full">
              <ChartEmptyState variant="bar" title="No performance data" description="KPI metrics will appear here once data is available" />
            </div>
          ) : (
            stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 100} />
            ))
          )}
        </div>
      </section>
    </TooltipProvider>
  );
};
