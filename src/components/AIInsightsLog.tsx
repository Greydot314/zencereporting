import { AlertTriangle, CheckCircle, Clock, Database, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  },
  churn: {
    icon: Clock,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  anomaly: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10",
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
    <Card className="surface border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            AI Insight Log
          </CardTitle>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Last 24h</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[200px] pr-2">
          <div className="space-y-2">
            {insightEntries.map((entry) => {
              const type = typeConfig[entry.type];
              const status = statusConfig[entry.status];
              const Icon = type.icon;

              return (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-lg ${type.bg} flex-shrink-0`}>
                      <Icon className={`h-3.5 w-3.5 ${type.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-foreground truncate">{entry.title}</p>
                        <Badge variant="outline" className={`text-[9px] px-1.5 py-0 h-4 ${status.className}`}>
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{entry.detail}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{entry.timestamp}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
