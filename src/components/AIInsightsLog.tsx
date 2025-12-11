import { useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Database, ChevronRight, Store, MapPin, Users, TrendingDown, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface InsightEntry {
  id: number;
  type: "fraud" | "churn" | "anomaly";
  title: string;
  detail: string;
  status: "resolved" | "active" | "investigating";
  timestamp: string;
  programName: string;
  region: string;
  storeId?: string;
  customersAffected: number;
  revenueAtRisk: string;
  triggeredBy: string;
  recommendedAction: string;
  assignedTo: string;
}

const insightEntries: InsightEntry[] = [
  {
    id: 1,
    type: "fraud",
    title: "Abnormal Redemption Velocity",
    detail: "Triggered by Store #405. Score: 0.92. Action: Freeze points.",
    status: "resolved",
    timestamp: "2h ago",
    programName: "Levi's Loyalty Club",
    region: "West Region",
    storeId: "Store #405",
    customersAffected: 47,
    revenueAtRisk: "₹2.3L",
    triggeredBy: "Fraud Sentinel AI",
    recommendedAction: "Freeze SKU #5592 pending manual review. Contact store manager for verification.",
    assignedTo: "Risk Team",
  },
  {
    id: 2,
    type: "churn",
    title: "Gold Tier Stagnation",
    detail: "West region Gold members show a 12% drop in Recency. Action: Campaign pending.",
    status: "active",
    timestamp: "4h ago",
    programName: "Max Fashion Rewards",
    region: "North Region",
    customersAffected: 1250,
    revenueAtRisk: "₹8.5L",
    triggeredBy: "Churn Prediction Model",
    recommendedAction: "Launch 'Win-Back' campaign with 2x points offer. Target via SMS + Push.",
    assignedTo: "Marketing Team",
  },
  {
    id: 3,
    type: "anomaly",
    title: "Invalid SKU in ETL",
    detail: "Daily ETL flagged 5,000 transactions with unmapped SKUs.",
    status: "investigating",
    timestamp: "6h ago",
    programName: "Shoppers Stop First Citizen",
    region: "All Regions",
    customersAffected: 5000,
    revenueAtRisk: "₹0 (Data Quality)",
    triggeredBy: "ETL Pipeline Monitor",
    recommendedAction: "Review SKU mapping table. Cross-reference with POS system updates.",
    assignedTo: "Data Engineering",
  },
  {
    id: 4,
    type: "fraud",
    title: "Multi-Account Pattern",
    detail: "3 accounts linked via device fingerprint. Potential points pooling.",
    status: "active",
    timestamp: "8h ago",
    programName: "Levi's Loyalty Club",
    region: "South Region",
    storeId: "Online Channel",
    customersAffected: 3,
    revenueAtRisk: "₹45K",
    triggeredBy: "Device Fingerprint Analysis",
    recommendedAction: "Flag accounts for manual review. Consider temporary freeze pending verification.",
    assignedTo: "Fraud Investigation",
  },
  {
    id: 5,
    type: "churn",
    title: "Platinum Tier Attrition",
    detail: "5 Platinum members triggered 'Lapsed' status. CLTV at risk: ₹8.2L",
    status: "active",
    timestamp: "12h ago",
    programName: "Reliance Trends Circle",
    region: "East Region",
    customersAffected: 5,
    revenueAtRisk: "₹8.2L",
    triggeredBy: "Tier Health Monitor",
    recommendedAction: "Personal outreach via Relationship Manager. Offer exclusive preview event invitation.",
    assignedTo: "VIP Relations",
  },
];

const typeConfig = {
  fraud: {
    icon: AlertTriangle,
    color: "text-[hsl(var(--atlas-warning))]",
    bg: "bg-[hsl(var(--atlas-warning))]/10",
    border: "border-[hsl(var(--atlas-warning))]/20",
    label: "Fraud Alert",
  },
  churn: {
    icon: Clock,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    label: "Churn Risk",
  },
  anomaly: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    label: "Data Anomaly",
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
  const [selectedInsight, setSelectedInsight] = useState<InsightEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = (entry: InsightEntry) => {
    setSelectedInsight(entry);
    setDialogOpen(true);
  };

  return (
    <>
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
                onClick={() => handleCardClick(entry)}
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

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedInsight && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-lg ${typeConfig[selectedInsight.type].bg}`}>
                    {(() => {
                      const Icon = typeConfig[selectedInsight.type].icon;
                      return <Icon className={`h-5 w-5 ${typeConfig[selectedInsight.type].color}`} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px]">{typeConfig[selectedInsight.type].label}</Badge>
                      <Badge variant="outline" className={`text-[10px] ${statusConfig[selectedInsight.status].className}`}>
                        {statusConfig[selectedInsight.status].label}
                      </Badge>
                    </div>
                    <DialogTitle className="text-lg">{selectedInsight.title}</DialogTitle>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Program & Region Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Store className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Program</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedInsight.programName}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedInsight.region}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Customers Affected</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{selectedInsight.customersAffected.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      <span className="text-[10px] uppercase tracking-wider text-destructive">Revenue at Risk</span>
                    </div>
                    <p className="text-sm font-medium text-destructive">{selectedInsight.revenueAtRisk}</p>
                  </div>
                </div>

                {/* Store ID if available */}
                {selectedInsight.storeId && (
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Store / Channel</span>
                    <p className="text-sm font-medium text-foreground">{selectedInsight.storeId}</p>
                  </div>
                )}

                {/* Detail Description */}
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Alert Details</p>
                  <p className="text-sm text-foreground">{selectedInsight.detail}</p>
                </div>

                {/* Triggered By & Assigned To */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Triggered By</span>
                    <span className="text-foreground">{selectedInsight.triggeredBy}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Assigned To</span>
                    <span className="text-foreground">{selectedInsight.assignedTo}</span>
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Recommended Action</span>
                  </div>
                  <p className="text-sm text-foreground">{selectedInsight.recommendedAction}</p>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Detected {selectedInsight.timestamp}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">Take Action</Button>
                  <Button size="sm" variant="outline" className="flex-1">Dismiss</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};