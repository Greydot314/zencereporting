import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, ShoppingCart, TrendingUp, TrendingDown, RefreshCw, Activity, Repeat } from "lucide-react";
import { AnimatedNumber, AnimatedPercentage } from "@/components/ui/animated-number";

interface CustomerActivityData {
  registrations: {
    total: number;
    newThisMonth: number;
    growth: number;
    conversionRate: number;
  };
  transacting: {
    total: number;
    activeRate: number;
    avgTransactions: number;
    change: number;
  };
  retention: {
    repeatPurchaseRate: number;
    avgPurchaseFrequency: number;
    change: number;
  };
  segments: {
    name: string;
    count: number;
    transactionRate: number;
    avgValue: number;
    trend: "up" | "down" | "stable";
  }[];
  lastUpdated: string;
}

interface CustomerActivityCardProps {
  data: CustomerActivityData;
}

const mockCustomerActivityData: CustomerActivityData = {
  registrations: {
    total: 156842,
    newThisMonth: 4520,
    growth: 12.4,
    conversionRate: 68.5
  },
  transacting: {
    total: 89340,
    activeRate: 56.9,
    avgTransactions: 3.2,
    change: 8.7
  },
  retention: {
    repeatPurchaseRate: 42.3,
    avgPurchaseFrequency: 2.8,
    change: 5.2
  },
  segments: [
    { name: "High-Value Regulars", count: 12450, transactionRate: 92.5, avgValue: 8500, trend: "up" },
    { name: "Growing Engaged", count: 28300, transactionRate: 78.2, avgValue: 4200, trend: "up" },
    { name: "Occasional Buyers", count: 35600, transactionRate: 45.8, avgValue: 2100, trend: "stable" },
    { name: "At-Risk Inactive", count: 12990, transactionRate: 18.2, avgValue: 950, trend: "down" }
  ],
  lastUpdated: "2 hours ago"
};

export const CustomerActivityCard = ({ data = mockCustomerActivityData }: Partial<CustomerActivityCardProps>) => {
  const formatCurrency = (value: number) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value.toLocaleString()}`;
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-emerald-500" />;
    if (trend === "down") return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <Activity className="h-3 w-3 text-muted-foreground" />;
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Customer Activity Forecast</h2>
            <p className="text-sm text-muted-foreground">Registration & transaction predictions</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          {data.lastUpdated}
        </Badge>
      </div>
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-lg border bg-blue-50/50">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-blue-600 font-medium">New Registrations</span>
            </div>
            <div className="text-xl font-bold text-blue-700">
              <AnimatedNumber value={data.registrations.newThisMonth} />
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <AnimatedPercentage value={data.registrations.growth} />
            </div>
          </div>
          
          <div className="p-3 rounded-lg border bg-emerald-50/50">
            <div className="flex items-center gap-2 mb-1">
              <ShoppingCart className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">Transacting</span>
            </div>
            <div className="text-xl font-bold text-emerald-700">
              <AnimatedNumber value={data.transacting.total} />
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <AnimatedPercentage value={data.transacting.change} />
            </div>
          </div>
          
          <div className="p-3 rounded-lg border bg-purple-50/50">
            <div className="flex items-center gap-2 mb-1">
              <Repeat className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-purple-600 font-medium">Repeat Rate</span>
            </div>
            <div className="text-xl font-bold text-purple-700">
              <AnimatedPercentage value={data.retention.repeatPurchaseRate} showSign={false} />
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <AnimatedPercentage value={data.retention.change} />
            </div>
          </div>
          
          <div className="p-3 rounded-lg border bg-amber-50/50">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">Active Rate</span>
            </div>
            <div className="text-xl font-bold text-amber-700">
              <AnimatedPercentage value={data.transacting.activeRate} showSign={false} />
            </div>
            <div className="text-xs text-muted-foreground">
              of total registered
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Customer Segment Activity
          </h4>
          <div className="space-y-2">
            {data.segments.map((segment, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getTrendIcon(segment.trend)}
                  <div>
                    <span className="font-medium text-sm">{segment.name}</span>
                    <div className="text-xs text-muted-foreground">
                      <AnimatedNumber value={segment.count} /> customers
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      <AnimatedPercentage value={segment.transactionRate} showSign={false} />
                    </div>
                    <div className="text-xs text-muted-foreground">transaction rate</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{formatCurrency(segment.avgValue)}</div>
                    <div className="text-xs text-muted-foreground">avg. value</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel Summary */}
        <div className="p-4 rounded-xl border bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-foreground">Registration to Transaction</span>
              <p className="text-xs text-muted-foreground">30-day conversion funnel</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                <AnimatedPercentage value={data.registrations.conversionRate} showSign={false} />
              </div>
              <div className="text-xs text-muted-foreground">conversion rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
