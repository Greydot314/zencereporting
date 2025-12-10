import { Users, ShieldAlert, TrendingUp, ArrowUpRight, Gauge, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const churnSegments: ChurnSegment[] = [
  { id: 1, segment: "Gold Tier, 60-90 Day Recency", customers: 3500, cltvAtRisk: "₹1.2Cr", percentOfTotal: 35 },
  { id: 2, segment: "Silver Tier, Low Redemption", customers: 5200, cltvAtRisk: "₹85L", percentOfTotal: 28 },
  { id: 3, segment: "Platinum, Pre-Churn Signal", customers: 450, cltvAtRisk: "₹62L", percentOfTotal: 18 },
  { id: 4, segment: "New Members, No 2nd Purchase", customers: 8100, cltvAtRisk: "₹45L", percentOfTotal: 12 },
  { id: 5, segment: "Dormant, High Historical Value", customers: 2300, cltvAtRisk: "₹38L", percentOfTotal: 7 },
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
      {/* Widget A: Churn Risk Triage */}
      <Card className="surface border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-destructive" />
              Churn Risk Triage
            </CardTitle>
            <Badge variant="outline" className="text-[10px] bg-destructive/5 text-destructive border-destructive/20">
              ₹3.5Cr CLTV Exposed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
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
        </CardContent>
      </Card>

      {/* Widget B: Operational & Fraud Sentinel */}
      <div className="grid grid-cols-2 gap-3">
        {/* Points Liquidity */}
        <Card className="surface border shadow-sm">
          <CardContent className="p-4">
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
          </CardContent>
        </Card>

        {/* Fraud Sentinel */}
        <Card className="surface border shadow-sm border-l-2 border-l-destructive">
          <CardContent className="p-4">
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
          </CardContent>
        </Card>
      </div>

      {/* Widget C: Tier Upgrade Opportunity */}
      <Card className="surface border shadow-sm bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-4">
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
        </CardContent>
      </Card>
    </div>
  );
};
