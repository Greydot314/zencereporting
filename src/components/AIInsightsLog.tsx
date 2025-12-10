import { AlertTriangle, CheckCircle, Clock, Database, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InsightEntry {
  id: number;
  type: "fraud" | "churn" | "anomaly";
  title: string;
  detail: string;
  status: "resolved" | "active" | "investigating";
  timestamp: string;
}

const insightEntries: InsightEntry[] = [
  {
    id: 1,
    type: "fraud",
    title: "Abnormal Redemption Velocity",
    detail: "Triggered by Store #405. Score: 0.92. Action: Freeze points.",
    status: "resolved",
    timestamp: "2h ago",
  },
  {
    id: 2,
    type: "churn",
    title: "Gold Tier Stagnation",
    detail: "West region Gold members show a 12% drop in Recency. Action: Campaign pending.",
    status: "active",
    timestamp: "4h ago",
  },
  {
    id: 3,
    type: "anomaly",
    title: "Invalid SKU in ETL",
    detail: "Daily ETL flagged 5,000 transactions with unmapped SKUs.",
    status: "investigating",
    timestamp: "6h ago",
  },
  {
    id: 4,
    type: "fraud",
    title: "Multi-Account Pattern",
    detail: "3 accounts linked via device fingerprint. Potential points pooling.",
    status: "active",
    timestamp: "8h ago",
  },
  {
    id: 5,
    type: "churn",
    title: "Platinum Tier Attrition",
    detail: "5 Platinum members triggered 'Lapsed' status. CLTV at risk: ₹8.2L",
    status: "active",
    timestamp: "12h ago",
  },
];

const typeConfig = {
  fraud: {
    icon: AlertTriangle,
    color: "text-[hsl(var(--atlas-warning))]",
    bg: "bg-[hsl(var(--atlas-warning))]/10",
    border: "border-[hsl(var(--atlas-warning))]/20",
  },
  churn: {
    icon: Clock,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  anomaly: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
};

const statusConfig = {
  resolved: {
    label: "Resolved",
    className: "bg-[hsl(var(--atlas-success))]/10 text-[hsl(var(--atlas-success))] border-[hsl(var(--atlas-success))]/20",
  },
  active: {
    label: "Active",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  investigating: {
    label: "Investigating",
    className: "bg-[hsl(var(--atlas-warning))]/10 text-[hsl(var(--atlas-warning))] border-[hsl(var(--atlas-warning))]/20",
  },
};

export const AIInsightsLog = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-foreground flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-primary" />
          AI Insight Log
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Last 24h</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {insightEntries.map((entry) => {
          const type = typeConfig[entry.type];
          const status = statusConfig[entry.status];
          const Icon = type.icon;

          return (
            <Card
              key={entry.id}
              className={`p-4 hover:shadow-md transition-all cursor-pointer group border ${type.border} bg-gradient-to-br from-background to-secondary/30`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${type.bg}`}>
                  <Icon className={`h-4 w-4 ${type.color}`} />
                </div>
                <Badge variant="outline" className={`text-[9px] px-1.5 py-0 h-4 ${status.className}`}>
                  {status.label}
                </Badge>
              </div>
              
              <h4 className="text-sm font-medium text-foreground mb-1 line-clamp-2 min-h-[2.5rem]">
                {entry.title}
              </h4>
              
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3 min-h-[2rem]">
                {entry.detail}
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <span className="text-[10px] text-muted-foreground">{entry.timestamp}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};