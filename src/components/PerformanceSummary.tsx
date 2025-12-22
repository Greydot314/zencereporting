import { TrendingUp, TrendingDown, Users, CreditCard, Target, Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
}

const StatCard = ({ title, value, change, changeType, icon: Icon }: StatCardProps) => {
  const changeColor = {
    positive: "text-[hsl(var(--atlas-success))]",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  const TrendIcon = changeType === "positive" ? TrendingUp : changeType === "negative" ? TrendingDown : TrendingUp;

  return (
    <div className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="p-1.5 rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs ${changeColor}`}>
          <TrendIcon className="h-3 w-3" />
          <span>{change}</span>
        </div>
      </div>
      <p className="text-2xl font-semibold text-foreground mb-1">{value}</p>
      <p className="text-xs text-muted-foreground">{title}</p>
    </div>
  );
};

const stats: StatCardProps[] = [
  {
    title: "Loyalty Share of Sales",
    value: "42.3%",
    change: "+2.1%",
    changeType: "positive",
    icon: Percent,
  },
  {
    title: "Active Members",
    value: "1.24M",
    change: "+4.5%",
    changeType: "positive",
    icon: Users,
  },
  {
    title: "Points Redeemed (₹)",
    value: "₹8.2Cr",
    change: "-1.2%",
    changeType: "negative",
    icon: CreditCard,
  },
  {
    title: "Redemption Rate",
    value: "68.5%",
    change: "+3.2%",
    changeType: "positive",
    icon: Target,
  },
  {
    title: "Avg. CLTV",
    value: "₹24,500",
    change: "+8.2%",
    changeType: "positive",
    icon: TrendingUp,
  },
];

export const PerformanceSummary = () => {
  return (
    <Card className="surface border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Performance Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};