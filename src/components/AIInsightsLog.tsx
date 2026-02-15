import { useState, useCallback, useEffect } from "react";
import { AlertTriangle, CheckCircle, Clock, Database, ChevronRight, Store, MapPin, Users, TrendingDown, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

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
    id: 1, type: "fraud", title: "Abnormal Redemption Velocity",
    detail: "Triggered by Store #405. Score: 0.92. Action: Freeze points.",
    status: "resolved", timestamp: "2h ago", programName: "Levi's Loyalty Club", region: "West Region",
    storeId: "Store #405", customersAffected: 47, revenueAtRisk: "₹2.3L",
    triggeredBy: "Fraud Sentinel AI", recommendedAction: "Freeze SKU #5592 pending manual review. Contact store manager for verification.", assignedTo: "Risk Team",
  },
  {
    id: 2, type: "churn", title: "Gold Tier Stagnation",
    detail: "West region Gold members show a 12% drop in Recency. Action: Campaign pending.",
    status: "active", timestamp: "4h ago", programName: "Max Fashion Rewards", region: "North Region",
    customersAffected: 1250, revenueAtRisk: "₹8.5L",
    triggeredBy: "Churn Prediction Model", recommendedAction: "Launch 'Win-Back' campaign with 2x points offer. Target via SMS + Push.", assignedTo: "Marketing Team",
  },
  {
    id: 3, type: "anomaly", title: "Invalid SKU in ETL",
    detail: "Daily ETL flagged 5,000 transactions with unmapped SKUs.",
    status: "investigating", timestamp: "6h ago", programName: "Shoppers Stop First Citizen", region: "All Regions",
    customersAffected: 5000, revenueAtRisk: "₹0 (Data Quality)",
    triggeredBy: "ETL Pipeline Monitor", recommendedAction: "Review SKU mapping table. Cross-reference with POS system updates.", assignedTo: "Data Engineering",
  },
  {
    id: 4, type: "fraud", title: "Multi-Account Pattern",
    detail: "3 accounts linked via device fingerprint. Potential points pooling.",
    status: "active", timestamp: "8h ago", programName: "Levi's Loyalty Club", region: "South Region",
    storeId: "Online Channel", customersAffected: 3, revenueAtRisk: "₹45K",
    triggeredBy: "Device Fingerprint Analysis", recommendedAction: "Flag accounts for manual review. Consider temporary freeze pending verification.", assignedTo: "Fraud Investigation",
  },
  {
    id: 5, type: "churn", title: "Platinum Tier Attrition",
    detail: "5 Platinum members triggered 'Lapsed' status. CLTV at risk: ₹8.2L",
    status: "active", timestamp: "12h ago", programName: "Reliance Trends Circle", region: "East Region",
    customersAffected: 5, revenueAtRisk: "₹8.2L",
    triggeredBy: "Tier Health Monitor", recommendedAction: "Personal outreach via Relationship Manager. Offer exclusive preview event invitation.", assignedTo: "VIP Relations",
  },
  {
    id: 6, type: "fraud", title: "Coupon Stacking Exploit",
    detail: "Unusual coupon combinations detected at checkout. 15 transactions flagged.",
    status: "investigating", timestamp: "1h ago", programName: "Shoppers Stop First Citizen", region: "West Region",
    storeId: "Store #218", customersAffected: 15, revenueAtRisk: "₹1.1L",
    triggeredBy: "Promo Abuse Detector", recommendedAction: "Disable coupon combo for SKU group. Escalate to promotions team.", assignedTo: "Risk Team",
  },
  {
    id: 7, type: "churn", title: "New Member Drop-off",
    detail: "30% of members enrolled last month have zero activity since signup.",
    status: "active", timestamp: "3h ago", programName: "Max Fashion Rewards", region: "South Region",
    customersAffected: 820, revenueAtRisk: "₹3.2L",
    triggeredBy: "Onboarding Health AI", recommendedAction: "Trigger welcome series with first-purchase incentive within 48 hours.", assignedTo: "CRM Team",
  },
  {
    id: 8, type: "anomaly", title: "Points Balance Mismatch",
    detail: "Ledger vs. wallet discrepancy detected for 200+ accounts after migration.",
    status: "investigating", timestamp: "5h ago", programName: "Reliance Trends Circle", region: "North Region",
    customersAffected: 215, revenueAtRisk: "₹0 (Reconciliation)",
    triggeredBy: "Balance Reconciler", recommendedAction: "Run full reconciliation job. Compare pre/post migration snapshots.", assignedTo: "Data Engineering",
  },
  {
    id: 9, type: "fraud", title: "Geo-Velocity Anomaly",
    detail: "Same account redeemed points in Mumbai and Delhi within 30 minutes.",
    status: "active", timestamp: "45m ago", programName: "Levi's Loyalty Club", region: "Multi-Region",
    customersAffected: 1, revenueAtRisk: "₹12K",
    triggeredBy: "Geo-Velocity Engine", recommendedAction: "Temporarily lock account. Request identity verification before next redemption.", assignedTo: "Fraud Investigation",
  },
  {
    id: 10, type: "churn", title: "Silver Tier Engagement Dip",
    detail: "Silver members' avg. visit frequency dropped 18% month-over-month.",
    status: "active", timestamp: "7h ago", programName: "Shoppers Stop First Citizen", region: "East Region",
    customersAffected: 3400, revenueAtRisk: "₹15L",
    triggeredBy: "Engagement Tracker", recommendedAction: "Deploy personalized push notifications with category-specific offers.", assignedTo: "Marketing Team",
  },
  {
    id: 11, type: "anomaly", title: "Duplicate Transaction Burst",
    detail: "POS system sent duplicate entries for 340 transactions in batch #7821.",
    status: "resolved", timestamp: "10h ago", programName: "Max Fashion Rewards", region: "West Region",
    storeId: "Store #112", customersAffected: 340, revenueAtRisk: "₹0 (Data Quality)",
    triggeredBy: "ETL Pipeline Monitor", recommendedAction: "Deduplicate batch. Notify POS vendor of integration defect.", assignedTo: "Data Engineering",
  },
  {
    id: 12, type: "fraud", title: "Referral Ring Detected",
    detail: "Cluster of 22 accounts with circular referral patterns. Bonus abuse suspected.",
    status: "investigating", timestamp: "9h ago", programName: "Reliance Trends Circle", region: "South Region",
    customersAffected: 22, revenueAtRisk: "₹68K",
    triggeredBy: "Network Graph Analyzer", recommendedAction: "Suspend referral bonuses for flagged cluster. Review referral policy limits.", assignedTo: "Fraud Investigation",
  },
  {
    id: 13, type: "churn", title: "High-Value Segment Decline",
    detail: "Top 5% spenders showing 25% reduction in basket size over 8 weeks.",
    status: "active", timestamp: "14h ago", programName: "Levi's Loyalty Club", region: "North Region",
    customersAffected: 180, revenueAtRisk: "₹22L",
    triggeredBy: "CLV Prediction Engine", recommendedAction: "Activate VIP concierge outreach. Offer exclusive early-access to new collection.", assignedTo: "VIP Relations",
  },
  {
    id: 14, type: "anomaly", title: "API Rate Limit Breach",
    detail: "Partner API exceeded 10K calls/min threshold. Potential scraping attempt.",
    status: "resolved", timestamp: "16h ago", programName: "Shoppers Stop First Citizen", region: "All Regions",
    customersAffected: 0, revenueAtRisk: "₹0 (Security)",
    triggeredBy: "API Gateway Monitor", recommendedAction: "Throttle partner key. Review API usage agreement and implement stricter rate limits.", assignedTo: "Platform Team",
  },
  {
    id: 15, type: "fraud", title: "Gift Card Laundering Signal",
    detail: "Multiple gift card purchases followed by immediate redemption across 3 stores.",
    status: "active", timestamp: "11h ago", programName: "Max Fashion Rewards", region: "West Region",
    storeId: "Multi-Store", customersAffected: 8, revenueAtRisk: "₹3.5L",
    triggeredBy: "Transaction Pattern AI", recommendedAction: "Flag gift card batch. Implement purchase-to-redeem cool-off period of 24 hours.", assignedTo: "Risk Team",
  },
];

type FilterType = "all" | "fraud" | "churn" | "anomaly";

const typeConfig = {
  fraud: {
    icon: AlertTriangle,
    color: "text-white",
    bg: "bg-white/20",
    iconBg: "bg-white/25",
    border: "border-white/20",
    label: "Fraud Alert",
    gradient: "from-[hsl(var(--atlas-warning))] via-[hsl(25,95%,55%)] to-[hsl(15,90%,50%)]",
    statusBg: "bg-white/20 text-white border-white/30",
  },
  churn: {
    icon: Clock,
    color: "text-white",
    bg: "bg-white/20",
    iconBg: "bg-white/25",
    border: "border-white/20",
    label: "Churn Risk",
    gradient: "from-destructive via-[hsl(350,80%,55%)] to-[hsl(340,75%,45%)]",
    statusBg: "bg-white/20 text-white border-white/30",
  },
  anomaly: {
    icon: Database,
    color: "text-white",
    bg: "bg-white/20",
    iconBg: "bg-white/25",
    border: "border-white/20",
    label: "Data Anomaly",
    gradient: "from-primary via-[hsl(220,85%,55%)] to-[hsl(240,70%,50%)]",
    statusBg: "bg-white/20 text-white border-white/30",
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

const filterTabs: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "fraud", label: "Fraud" },
  { key: "churn", label: "Churn" },
  { key: "anomaly", label: "Anomaly" },
];

export const AIInsightsLog = () => {
  const [selectedInsight, setSelectedInsight] = useState<InsightEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [api, setApi] = useState<CarouselApi>();
  const [scrollProgress, setScrollProgress] = useState(0);

  const filteredEntries = activeFilter === "all"
    ? insightEntries
    : insightEntries.filter((e) => e.type === activeFilter);

  const countByType = {
    all: insightEntries.length,
    fraud: insightEntries.filter((e) => e.type === "fraud").length,
    churn: insightEntries.filter((e) => e.type === "churn").length,
    anomaly: insightEntries.filter((e) => e.type === "anomaly").length,
  };

  const onScroll = useCallback(() => {
    if (!api) return;
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onScroll();
    api.on("scroll", onScroll);
    api.on("reInit", onScroll);
    return () => {
      api.off("scroll", onScroll);
      api.off("reInit", onScroll);
    };
  }, [api, onScroll]);

  const handleCardClick = (entry: InsightEntry) => {
    setSelectedInsight(entry);
    setDialogOpen(true);
  };

  return (
    <>
      <section className="space-y-3 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-foreground flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            AI Insight Log
          </h3>
          <span className="text-[10px] text-muted-foreground font-medium">
            Showing {filteredEntries.length} of {insightEntries.length}
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeFilter === tab.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[10px] ${activeFilter === tab.key ? "opacity-80" : "opacity-60"}`}>
                {countByType[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="px-10">
          <Carousel
            opts={{ align: "start", loop: false, dragFree: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {filteredEntries.map((entry) => {
                const type = typeConfig[entry.type];
                const status = statusConfig[entry.status];
                const Icon = type.icon;

                return (
                  <CarouselItem key={entry.id} className="pl-3 basis-full md:basis-1/2 lg:basis-1/4">
                    <div
                      onClick={() => handleCardClick(entry)}
                      className={`p-3 rounded-xl hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group bg-gradient-to-br ${type.gradient} text-white h-full flex flex-col min-h-0`}
                    >
                      {/* Top row: icon + type label + status */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className={`p-1 rounded-md ${type.iconBg}`}>
                            <Icon className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-[9px] font-semibold uppercase tracking-wider text-white/80">{type.label}</span>
                        </div>
                        <Badge variant="outline" className={`text-[8px] px-1.5 py-0 h-3.5 border ${type.statusBg}`}>
                          {status.label}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-semibold text-white mb-1 line-clamp-1">
                        {entry.title}
                      </h4>

                      {/* Detail */}
                      <p className="text-[10px] text-white/75 line-clamp-1 mb-2">
                        {entry.detail}
                      </p>

                      {/* Metrics row */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 text-[9px] text-white/90">
                          <Users className="h-2.5 w-2.5" />
                          <span>{entry.customersAffected.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-white/90">
                          <TrendingDown className="h-2.5 w-2.5" />
                          <span>{entry.revenueAtRisk}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-white/15 mt-auto">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-medium text-white/80 truncate max-w-[100px]">{entry.programName}</span>
                          <span className="text-[9px] text-white/50">·</span>
                          <span className="text-[9px] text-white/60">{entry.timestamp}</span>
                        </div>
                        <ChevronRight className="h-3 w-3 text-white/50 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-8" />
            <CarouselNext className="-right-8" />
          </Carousel>
        </div>

        {/* Scroll progress bar */}
        <Progress value={scrollProgress} className="h-1 w-full" />
      </section>

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

                {selectedInsight.storeId && (
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Store / Channel</span>
                    <p className="text-sm font-medium text-foreground">{selectedInsight.storeId}</p>
                  </div>
                )}

                <div className="p-3 rounded-lg border border-border">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Alert Details</p>
                  <p className="text-sm text-foreground">{selectedInsight.detail}</p>
                </div>

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

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[10px] uppercase tracking-wider text-primary font-medium">Recommended Action</span>
                  </div>
                  <p className="text-sm text-foreground">{selectedInsight.recommendedAction}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Detected {selectedInsight.timestamp}</span>
                </div>

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
