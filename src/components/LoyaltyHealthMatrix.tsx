import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Minus, Coins, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface TierData {
  name: string;
  members: number;
  upgrades: number;
  downgrades: number;
  netMovement: number;
  status: "healthy" | "stagnant" | "declining";
}

interface LiabilityData {
  earned: number;
  burned: number;
  ratio: number;
  status: "balanced" | "excess" | "bleeding";
}

// Mock tier movement data
const tierData: TierData[] = [
  { name: "Platinum", members: 1247, upgrades: 89, downgrades: 12, netMovement: 6.2, status: "healthy" },
  { name: "Gold", members: 8432, upgrades: 156, downgrades: 203, netMovement: -0.6, status: "stagnant" },
  { name: "Silver", members: 24891, upgrades: 312, downgrades: 487, netMovement: -0.7, status: "declining" },
  { name: "Bronze", members: 67234, upgrades: 891, downgrades: 0, netMovement: 1.3, status: "healthy" },
];

// Mock liability data
const liabilityData: LiabilityData = {
  earned: 24500000, // 2.45Cr points earned
  burned: 11200000, // 1.12Cr points burned
  ratio: 2.19,
  status: "excess",
};

const getMovementIcon = (movement: number) => {
  if (movement > 1) return <ArrowUpRight className="h-3 w-3 text-[hsl(var(--atlas-success))]" />;
  if (movement < -1) return <ArrowDownRight className="h-3 w-3 text-destructive" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-[hsl(var(--atlas-success))]/10 text-[hsl(var(--atlas-success))] border-[hsl(var(--atlas-success))]/20";
    case "stagnant":
      return "bg-[hsl(var(--atlas-warning))]/10 text-[hsl(var(--atlas-warning))] border-[hsl(var(--atlas-warning))]/20";
    case "declining":
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

  return (
    <Card className="surface border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Loyalty Health Matrix
          </CardTitle>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium bg-secondary px-2 py-0.5 rounded-full">
            Last 7 days
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-6">
        {/* Tier Movement Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Tier Flow</span>
          </div>
          <div className="space-y-3">
            {tierData.map((tier) => (
              <div key={tier.name} className="flex items-center gap-4">
                <div className="w-20">
                  <span className="text-sm font-medium text-foreground">{tier.name}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">
                      {tier.members.toLocaleString()} members
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-[hsl(var(--atlas-success))]">
                      +{tier.upgrades} ↑
                    </span>
                    <span className="text-xs text-destructive">
                      -{tier.downgrades} ↓
                    </span>
                  </div>
                  <Progress 
                    value={50 + tier.netMovement * 5} 
                    className="h-1.5 bg-secondary"
                  />
                </div>
                <div className="flex items-center gap-2 w-24 justify-end">
                  {getMovementIcon(tier.netMovement)}
                  <span className={`text-xs font-medium ${
                    tier.netMovement > 0 ? "text-[hsl(var(--atlas-success))]" : 
                    tier.netMovement < 0 ? "text-destructive" : "text-muted-foreground"
                  }`}>
                    {tier.netMovement > 0 ? "+" : ""}{tier.netMovement}%
                  </span>
                  <Badge variant="outline" className={`text-[10px] ${getStatusStyle(tier.status)}`}>
                    {tier.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 pl-6 border-l-2 border-primary/20">
            Silver-to-Gold conversion velocity has slowed by 15%. Gold Tier shows stagnation with 0.6% net decline.
          </p>
        </div>

        {/* Liability Section */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Points Liability</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-3">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Earned (7d)</p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-[hsl(var(--atlas-success))]" />
                {formatPoints(liabilityData.earned)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Burned (7d)</p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-1">
                <TrendingDown className="h-4 w-4 text-destructive" />
                {formatPoints(liabilityData.burned)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Earn/Burn Ratio</p>
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
        </div>
      </CardContent>
    </Card>
  );
};
