import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingUp, TrendingDown, Users, Layers, Crown, ArrowRight, BarChart3, Target, Zap, ArrowUpRight, ArrowDownRight } from "lucide-react";

// ── Lifecycle Treemap Data ──
const lifecycleData = [
  { id: "new", label: "New", color: "hsl(221, 83%, 53%)", children: [
    { label: "Emerging Enthusiasts", count: 1467247, sub: "potential_to_grow" },
    { label: "Unsteady Adopters", count: 892340, sub: "potential_to_decline" },
    { label: "Fresh Fanatics", count: 2103221, sub: "already_stable" },
  ]},
  { id: "grow", label: "Grow", color: "hsl(142, 76%, 36%)", children: [
    { label: "Progressive Patrons", count: 634120, sub: "medium" },
    { label: "Budding Rackers", count: 412890, sub: "low" },
    { label: "Ascendant Advocates", count: 298440, sub: "high" },
  ]},
  { id: "declining", label: "Declining", color: "hsl(38, 92%, 50%)", children: [
    { label: "Wobbling Supporters", count: 1023450, sub: "medium" },
    { label: "Faltering Followers", count: 876230, sub: "low" },
    { label: "Resilient Rescuers", count: 543210, sub: "high" },
  ]},
  { id: "stable", label: "Stable", color: "hsl(252, 100%, 67%)", children: [
    { label: "Consistent Contributors", count: 1876540, sub: "medium" },
    { label: "Performers", count: 654320, sub: "high" },
    { label: "Steady Supporters", count: 2345670, sub: "low" },
  ]},
];

// ── KPI Data ──
const kpiCards = [
  { label: "Total Customers", value: "12.1M", change: "+3.2%", trend: "up" as const, icon: Users },
  { label: "Active Segments", value: "47", change: "+5", trend: "up" as const, icon: Layers },
  { label: "Avg. Segment Size", value: "257K", change: "-1.8%", trend: "down" as const, icon: BarChart3 },
  { label: "Reachability Rate", value: "78.4%", change: "+2.1%", trend: "up" as const, icon: Target },
];

// ── Top Movers Data ──
const topMovers = [
  { segment: "Emerging Enthusiasts", from: "New", to: "Grow", moved: 24300, direction: "up" as const },
  { segment: "Wobbling Supporters", from: "Stable", to: "Declining", moved: 18700, direction: "down" as const },
  { segment: "Ascendant Advocates", from: "Grow", to: "Stable", moved: 12100, direction: "up" as const },
  { segment: "Faltering Followers", from: "Declining", to: "Lapsed", moved: 9800, direction: "down" as const },
  { segment: "Budding Rackers", from: "New", to: "Grow", moved: 8400, direction: "up" as const },
];

// ── RFM Summary Data ──
const rfmSummary = [
  { segment: "Champions", count: 12450, pct: 8.2, trend: "up" as const, revenue: "$4.2M" },
  { segment: "Loyal Customers", count: 28900, pct: 19.1, trend: "up" as const, revenue: "$6.8M" },
  { segment: "Potential Loyalists", count: 34200, pct: 22.6, trend: "up" as const, revenue: "$3.1M" },
  { segment: "At Risk", count: 18600, pct: 12.3, trend: "down" as const, revenue: "$2.4M" },
  { segment: "Hibernating", count: 22100, pct: 14.6, trend: "down" as const, revenue: "$0.9M" },
  { segment: "Lost", count: 35000, pct: 23.2, trend: "down" as const, revenue: "$0.3M" },
];

// ── Tier Data ──
const tierData = [
  { tier: "Platinum", count: 5200, pct: 3.4, color: "hsl(220, 13%, 46%)" },
  { tier: "Gold", count: 18900, pct: 12.5, color: "hsl(38, 92%, 50%)" },
  { tier: "Silver", count: 42300, pct: 28.0, color: "hsl(220, 13%, 71%)" },
  { tier: "Bronze", count: 84850, pct: 56.1, color: "hsl(25, 60%, 45%)" },
];

const SegconHome = () => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const totalCustomers = lifecycleData.reduce((sum, g) => sum + g.children.reduce((s, c) => s + c.count, 0), 0);

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-8 max-w-[1400px] mx-auto">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Segcon — Home</h1>
            <p className="text-sm text-muted-foreground mt-1">Lifecycle segments, RFM analysis & tier bifurcation</p>
          </div>
          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
            Last refreshed: 2 hours ago
          </Badge>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((kpi) => (
            <Card key={kpi.label}>
              <CardContent className="pt-5 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.trend === "up" ? "text-[hsl(var(--atlas-success))]" : "text-[hsl(var(--atlas-error))]"}`}>
                    {kpi.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── LIFECYCLE TREEMAP ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Lifecycle Segmentation</h2>
            <Tooltip>
              <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent className="max-w-xs">Customers grouped by lifecycle stage. Hover any block for details.</TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-12 gap-1 min-h-[320px]">
            {lifecycleData.map((group) => {
              const groupTotal = group.children.reduce((s, c) => s + c.count, 0);
              const colSpan = Math.max(2, Math.round((groupTotal / totalCustomers) * 12));
              return (
                <div key={group.id} className="flex flex-col gap-0.5 rounded-lg overflow-hidden" style={{ gridColumn: `span ${colSpan}` }}>
                  <div className="px-3 py-2 text-sm font-bold text-white" style={{ backgroundColor: group.color }}>
                    {group.label}
                  </div>
                  {group.children.map((child, idx) => {
                    const blockId = `${group.id}-${idx}`;
                    const isHovered = hoveredBlock === blockId;
                    const childPct = (child.count / groupTotal) * 100;
                    return (
                      <div
                        key={idx}
                        className="relative px-3 py-3 cursor-pointer transition-all duration-200 text-white"
                        style={{ backgroundColor: group.color, opacity: isHovered ? 1 : 0.82, flex: `${childPct} 0 0%`, minHeight: 48 }}
                        onMouseEnter={() => setHoveredBlock(blockId)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        <p className="text-xs font-medium truncate">{group.label.toLowerCase()}-{child.sub}</p>
                        <p className="text-[10px] opacity-80 truncate">{child.label}</p>
                        {isHovered && (
                          <div className="absolute z-20 top-full left-2 mt-1 bg-card border border-border rounded-lg shadow-lg p-3 text-foreground min-w-[220px] animate-fade-in">
                            <p className="font-semibold text-sm">{child.label}</p>
                            <div className="mt-1.5 space-y-1 text-xs text-muted-foreground">
                              <p>Customer Count: <span className="text-foreground font-medium">{child.count.toLocaleString()}</span></p>
                              <p>Last Refresh: <span className="text-foreground">2025-03-01</span></p>
                              <p>Logic: <span className="text-foreground">{group.label} → {child.sub}</span></p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TOP SEGMENT MOVERS ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Top Segment Movers</h2>
            <Tooltip>
              <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent className="max-w-xs">Customers who recently transitioned between lifecycle stages</TooltipContent>
            </Tooltip>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-3 text-xs font-medium text-muted-foreground">Segment</th>
                      <th className="px-4 py-3 text-xs font-medium text-muted-foreground">From</th>
                      <th className="px-4 py-3 text-xs font-medium text-muted-foreground">To</th>
                      <th className="px-4 py-3 text-xs font-medium text-muted-foreground text-right">Customers Moved</th>
                      <th className="px-4 py-3 text-xs font-medium text-muted-foreground text-center">Direction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topMovers.map((m, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{m.segment}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.from}</td>
                        <td className="px-4 py-3 text-muted-foreground">{m.to}</td>
                        <td className="px-4 py-3 text-right font-medium text-foreground">{m.moved.toLocaleString()}</td>
                        <td className="px-4 py-3 text-center">
                          {m.direction === "up" ? (
                            <Badge variant="outline" className="text-[10px] border-[hsl(var(--atlas-success))]/30 text-[hsl(var(--atlas-success))]">↑ Upgrade</Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] border-[hsl(var(--atlas-error))]/30 text-[hsl(var(--atlas-error))]">↓ Downgrade</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="h-px bg-border" />

        {/* ── RFM SEGMENTS ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">RFM Segment Overview</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rfmSummary.map((seg) => (
              <Card key={seg.segment} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-foreground">{seg.segment}</span>
                    {seg.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-[hsl(var(--atlas-success))]" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-[hsl(var(--atlas-error))]" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{seg.count.toLocaleString()}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{seg.pct}% of total</span>
                    <span className="text-xs font-medium text-primary">{seg.revenue}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="h-px bg-border" />

        {/* ── TIER BIFURCATION ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Tier Bifurcation</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tierData.map((tier) => (
              <Card key={tier.tier} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4 text-center">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: tier.color }}>
                    {tier.tier[0]}
                  </div>
                  <p className="font-semibold text-foreground">{tier.tier}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{tier.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{tier.pct}% of customers</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Module Studio Teaser */}
        <Card className="border-primary/20 bg-primary/[0.03]">
          <CardContent className="flex items-center justify-between py-5">
            <div>
              <p className="font-semibold text-foreground">Module Studio</p>
              <p className="text-sm text-muted-foreground">Build custom segmentation models — coming soon</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5" disabled>
              Coming Soon <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SegconHome;
