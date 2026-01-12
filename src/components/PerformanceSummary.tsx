import { TrendingUp, TrendingDown, Users, CreditCard, Target, Percent } from "lucide-react";
import { AnimatedNumber, AnimatedPercentage, AnimatedCurrency } from "@/components/ui/animated-number";

interface StatCardProps {
  title: string;
  value: string;
  numericValue: number;
  valueType: "percentage" | "currency" | "number" | "millions";
  change: string;
  changeValue: number;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  delay?: number;
}

const StatCard = ({ title, value, numericValue, valueType, change, changeValue, changeType, icon: Icon, delay = 0 }: StatCardProps) => {
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
      <p className="text-xs text-muted-foreground">{title}</p>
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
  },
];

export const PerformanceSummary = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-base font-medium text-foreground">Performance Summary</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} delay={index * 100} />
        ))}
      </div>
    </section>
  );
};
