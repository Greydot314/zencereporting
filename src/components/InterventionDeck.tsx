import { AlertTriangle, User, ShoppingBag, Target, ChevronRight, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Intervention {
  id: number;
  type: "churn" | "fraud" | "fatigue";
  customer?: string;
  tier?: string;
  impact: string;
  description: string;
  remediation: string;
}

// Mock intervention data - in production, sourced from Segcon, Fraud Sentinel, and Campaigns
const interventions: Intervention[] = [
  {
    id: 1,
    type: "churn",
    customer: "Priya Sharma",
    tier: "Platinum",
    impact: "₹4.2L",
    description: "Last purchase 47 days ago. Triggered 'Lapsed' tag yesterday.",
    remediation: "Deploy 500-point bonus via SMS within 24 hours",
  },
  {
    id: 2,
    type: "churn",
    customer: "Rajesh Mehta",
    tier: "Gold",
    impact: "₹1.8L",
    description: "Purchase frequency dropped from 3x/month to 0 in 6 weeks.",
    remediation: "Assign to 'Win-Back Gold' campaign in Segcon",
  },
  {
    id: 3,
    type: "fraud",
    customer: "Item #5592",
    impact: "₹2.1L",
    description: "47 redemptions in 2 hours from 3 IP addresses. Velocity rule triggered.",
    remediation: "Freeze SKU pending manual review",
  },
  {
    id: 4,
    type: "churn",
    customer: "Amit Patel",
    tier: "Gold",
    impact: "₹1.4L",
    description: "Zero app opens in 30 days. Previously 12x monthly active.",
    remediation: "Push notification with personalized offer",
  },
  {
    id: 5,
    type: "fatigue",
    customer: "Delhi NCR Segment",
    impact: "₹8.6L",
    description: "Campaign open rate dropped 34% over 3 campaigns. Unsubscribe rate spiking.",
    remediation: "Pause campaigns for 7 days, recalibrate frequency",
  },
];

const typeConfig = {
  churn: {
    label: "High-Value Churn",
    icon: User,
    color: "text-destructive",
    bg: "bg-destructive/10",
    badge: "bg-destructive/10 text-destructive border-destructive/20",
  },
  fraud: {
    label: "Fraud Alert",
    icon: AlertTriangle,
    color: "text-[hsl(var(--atlas-warning))]",
    bg: "bg-[hsl(var(--atlas-warning))]/10",
    badge: "bg-[hsl(var(--atlas-warning))]/10 text-[hsl(var(--atlas-warning))] border-[hsl(var(--atlas-warning))]/20",
  },
  fatigue: {
    label: "Campaign Fatigue",
    icon: Target,
    color: "text-primary",
    bg: "bg-primary/10",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
};

export const InterventionDeck = () => {
  const totalImpact = interventions.reduce((sum, item) => {
    const value = parseFloat(item.impact.replace(/[₹L,]/g, ""));
    return sum + value;
  }, 0);

  return (
    <Card className="surface border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
            <Flame className="h-4 w-4 text-destructive" />
            Intervention Deck
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">At-Risk Value:</span>
            <Badge variant="outline" className="text-xs font-semibold bg-destructive/5 text-destructive border-destructive/20">
              ₹{totalImpact.toFixed(1)}L
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {interventions.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            
            return (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${config.bg}`}>
                    <Icon className={`h-4 w-4 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className={`text-[10px] ${config.badge}`}>
                        {config.label}
                      </Badge>
                      {item.tier && (
                        <Badge variant="secondary" className="text-[10px]">
                          {item.tier}
                        </Badge>
                      )}
                      <span className="text-xs font-semibold text-destructive ml-auto">
                        {item.impact}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {item.customer}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-primary font-medium">
                        → {item.remediation}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
                      >
                        Act <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
