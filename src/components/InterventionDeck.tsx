import { Users, ShieldAlert, TrendingUp, ArrowUpRight, ArrowDownRight, Gauge, Target, Package, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Churn Risk Triage - Aggregate Segments
interface ChurnSegment {
  id: number;
  segment: string;
  customers: number;
  cltvAtRisk: string;
  percentOfTotal: number;
}

interface ProductCategory {
  name: string;
  purchases: number;
  percentageOfTotal: number;
  trend: number;
}

interface TrendingProduct {
  name: string;
  category: string;
  purchases: number;
  change: number;
}

const churnSegments: ChurnSegment[] = [
  { id: 1, segment: "Gold Tier, 60-90 Day Recency", customers: 3500, cltvAtRisk: "₹1.2Cr", percentOfTotal: 35 },
  { id: 2, segment: "Silver Tier, Low Redemption", customers: 5200, cltvAtRisk: "₹85L", percentOfTotal: 28 },
  { id: 3, segment: "Platinum, Pre-Churn Signal", customers: 450, cltvAtRisk: "₹62L", percentOfTotal: 18 },
  { id: 4, segment: "New Members, No 2nd Purchase", customers: 8100, cltvAtRisk: "₹45L", percentOfTotal: 12 },
  { id: 5, segment: "Dormant, High Historical Value", customers: 2300, cltvAtRisk: "₹38L", percentOfTotal: 7 },
];

// Product purchase behavior data
const topCategories: ProductCategory[] = [
  { name: "Electronics", purchases: 12840, percentageOfTotal: 28, trend: 5.2 },
  { name: "Fashion", purchases: 9650, percentageOfTotal: 21, trend: -2.1 },
  { name: "Home & Living", purchases: 7320, percentageOfTotal: 16, trend: 8.4 },
  { name: "Beauty & Care", purchases: 6180, percentageOfTotal: 14, trend: 3.8 },
];

const trendingProducts: TrendingProduct[] = [
  { name: "Wireless Earbuds Pro", category: "Electronics", purchases: 1240, change: 34 },
  { name: "Premium Silk Scarf", category: "Fashion", purchases: 890, change: 22 },
  { name: "Smart Home Hub", category: "Electronics", purchases: 756, change: 18 },
  { name: "Organic Face Serum", category: "Beauty", purchases: 624, change: 28 },
];

// Operational Metrics
const operationalMetrics = {
  pointsLiquidity: {
    current: 35,
    target: 40,
    status: "warning" as const,
    label: "Redemption Rate",
  },
  fraudScore: {
    current: 4.2,
    baseline: 2.0,
    status: "error" as const,
    label: "Incidents / 1K Txns",
    alert: "Central Region spike in low-value redemption",
  },
};

// Tier Upgrade Opportunity
const upgradeOpportunity = {
  fromTier: "Silver",
  toTier: "Gold",
  poolSize: 4500,
  action: "Target with 'Double Points on Next Purchase' push",
  potentialValue: "₹2.1Cr",
};

export const InterventionDeck = () => {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Intervention Deck
        </h2>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium bg-secondary px-2 py-0.5 rounded-full">
          Priority Actions
        </span>
      </div>
      {/* Widget A: Churn Risk Triage */}
      <section className="animate-fade-in" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-destructive" />
            Churn Risk Triage
          </h3>
          <Badge variant="outline" className="text-[10px] bg-destructive/5 text-destructive border-destructive/20">
            ₹3.5Cr CLTV Exposed
          </Badge>
        </div>
        <div className="space-y-2">
          {churnSegments.map((seg) => (
            <div key={seg.id} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-medium text-foreground truncate">{seg.segment}</span>
                  <span className="text-[10px] text-muted-foreground flex-shrink-0">
                    {seg.customers.toLocaleString()} customers
                  </span>
                </div>
                <span className="text-xs font-semibold text-destructive ml-2">{seg.cltvAtRisk}</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={seg.percentOfTotal} className="h-1.5 flex-1" />
                <span className="text-[10px] text-muted-foreground w-8">{seg.percentOfTotal}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Widget B: Operational & Fraud Sentinel */}
      <section className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
        {/* Points Liquidity */}
        <div className="p-4 rounded-lg bg-secondary/30">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-[hsl(var(--atlas-warning))]/10">
              <Gauge className="h-3.5 w-3.5 text-[hsl(var(--atlas-warning))]" />
            </div>
            <span className="text-xs font-medium text-foreground">Points Liquidity</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold text-foreground">{operationalMetrics.pointsLiquidity.current}%</span>
            <span className="text-xs text-muted-foreground mb-1">/ {operationalMetrics.pointsLiquidity.target}% target</span>
          </div>
          <Progress value={(operationalMetrics.pointsLiquidity.current / operationalMetrics.pointsLiquidity.target) * 100} className="h-1.5 mb-2" />
          <Badge variant="outline" className="text-[9px] bg-[hsl(var(--atlas-warning))]/10 text-[hsl(var(--atlas-warning))] border-[hsl(var(--atlas-warning))]/20">
            Below Target
          </Badge>
        </div>

        {/* Fraud Sentinel */}
        <div className="p-4 rounded-lg bg-secondary/30 border-l-2 border-l-destructive">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-destructive/10">
              <ShieldAlert className="h-3.5 w-3.5 text-destructive" />
            </div>
            <span className="text-xs font-medium text-foreground">Fraud Sentinel</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-2xl font-bold text-destructive">{operationalMetrics.fraudScore.current}</span>
            <span className="text-xs text-muted-foreground mb-1">incidents/1K txns</span>
          </div>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[10px] text-muted-foreground">Baseline: {operationalMetrics.fraudScore.baseline}</span>
            <Badge variant="outline" className="text-[9px] bg-destructive/10 text-destructive border-destructive/20">
              2x Alert
            </Badge>
          </div>
          <p className="text-[10px] text-muted-foreground line-clamp-1">{operationalMetrics.fraudScore.alert}</p>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Widget C: Tier Upgrade Opportunity */}
      <section className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 animate-fade-in" style={{ animationDelay: '500ms', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-foreground">
                  {upgradeOpportunity.fromTier} → {upgradeOpportunity.toTier} Conversion Pool
                </span>
                <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                  {upgradeOpportunity.poolSize.toLocaleString()} Customers
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{upgradeOpportunity.action}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Potential Value</p>
              <p className="text-sm font-semibold text-primary">{upgradeOpportunity.potentialValue}</p>
            </div>
            <Button size="sm" className="h-8 gap-1 text-xs">
              Launch <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Widget D: Product Purchase Behavior */}
      <section className="animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
        <h3 className="text-base font-medium text-foreground flex items-center gap-2 mb-3">
          <Package className="h-4 w-4 text-primary" />
          Product Purchase Behavior
        </h3>
        
        {/* Top Categories */}
        <div className="space-y-2 mb-4">
          <span className="text-xs text-muted-foreground">Top Categories</span>
          {topCategories.map((category) => (
            <div key={category.name} className="flex items-center gap-3">
              <span className="text-xs text-foreground w-24 truncate">{category.name}</span>
              <div className="flex-1">
                <Progress value={category.percentageOfTotal} className="h-1.5" />
              </div>
              <span className="text-xs font-medium text-foreground w-8 text-right">{category.percentageOfTotal}%</span>
              <div className="flex items-center gap-0.5 w-12 justify-end">
                {category.trend > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-[hsl(var(--atlas-success))]" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-destructive" />
                )}
                <span className={`text-[10px] ${category.trend > 0 ? "text-[hsl(var(--atlas-success))]" : "text-destructive"}`}>
                  {category.trend > 0 ? "+" : ""}{category.trend}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Products */}
        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-[hsl(var(--atlas-warning))]" />
            <span className="text-xs text-muted-foreground">Trending This Week</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {trendingProducts.map((product) => (
              <div key={product.name} className="p-2 rounded-md bg-secondary/50">
                <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">{product.purchases} purchases</span>
                  <Badge variant="outline" className="text-[9px] bg-[hsl(var(--atlas-success))]/10 text-[hsl(var(--atlas-success))] border-[hsl(var(--atlas-success))]/20">
                    +{product.change}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 pl-6 border-l-2 border-primary/20">
          Electronics driving 28% of member purchases. Home & Living showing strongest growth at +8.4%.
        </p>
      </section>
    </div>
  );
};
