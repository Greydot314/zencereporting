import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, Database, CheckCircle, MapPin, Store, Users, CreditCard, Calendar, TrendingDown } from "lucide-react";

interface InsightDetail {
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

interface InsightDetailDialogProps {
  insight: InsightDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const typeConfig = {
  fraud: {
    icon: AlertTriangle,
    color: "text-[hsl(var(--atlas-warning))]",
    bg: "bg-[hsl(var(--atlas-warning))]/10",
    label: "Fraud Alert",
  },
  churn: {
    icon: Clock,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Churn Risk",
  },
  anomaly: {
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10",
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

export const InsightDetailDialog = ({ insight, open, onOpenChange }: InsightDetailDialogProps) => {
  if (!insight) return null;

  const type = typeConfig[insight.type];
  const status = statusConfig[insight.status];
  const Icon = type.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-lg ${type.bg}`}>
              <Icon className={`h-5 w-5 ${type.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px]">{type.label}</Badge>
                <Badge variant="outline" className={`text-[10px] ${status.className}`}>
                  {status.label}
                </Badge>
              </div>
              <DialogTitle className="text-lg">{insight.title}</DialogTitle>
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
              <p className="text-sm font-medium text-foreground">{insight.programName}</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Region</span>
              </div>
              <p className="text-sm font-medium text-foreground">{insight.region}</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Customers Affected</span>
              </div>
              <p className="text-sm font-medium text-foreground">{insight.customersAffected.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                <span className="text-[10px] uppercase tracking-wider text-destructive">Revenue at Risk</span>
              </div>
              <p className="text-sm font-medium text-destructive">{insight.revenueAtRisk}</p>
            </div>
          </div>

          {/* Detail Description */}
          <div className="p-3 rounded-lg border border-border">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Alert Details</p>
            <p className="text-sm text-foreground">{insight.detail}</p>
          </div>

          {/* Triggered By & Assigned To */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Triggered By</span>
              <span className="text-foreground">{insight.triggeredBy}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Assigned To</span>
              <span className="text-foreground">{insight.assignedTo}</span>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Recommended Action</span>
            </div>
            <p className="text-sm text-foreground">{insight.recommendedAction}</p>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Detected {insight.timestamp}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="flex-1">Take Action</Button>
            <Button size="sm" variant="outline" className="flex-1">Dismiss</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export type { InsightDetail };
