import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, TrendingUp, TrendingDown, Users, Layers, Crown, ArrowRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from "recharts";

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

const segmentTabs = [
  "Stable-Low", "Stable-Medium", "Stable-High", "Declining-Medium", "Declining-High",
  "Grow-Low", "New-Potential_To_Grow", "Lapsed-Lapsed", "Grow-Medium",
  "New-Potential_To_Decline", "Declining-Low", "Grow-High", "New-Already_Stable"
];

const trendData = [
  { date: "2024-09-03", customers: 67000 },
  { date: "2024-10-01", customers: 64000 },
  { date: "2024-11-01", customers: 62500 },
  { date: "2024-12-01", customers: 58000 },
  { date: "2025-01-04", customers: 55000 },
  { date: "2025-02-01", customers: 60000 },
  { date: "2025-02-04", customers: 63000 },
];

const transitionData = [
  { name: "Declining", value: 45.07, color: "hsl(38, 92%, 50%)" },
  { name: "Grow", value: 22.35, color: "hsl(142, 76%, 36%)" },
  { name: "New", value: 20.16, color: "hsl(221, 83%, 53%)" },
  { name: "Stable", value: 12.42, color: "hsl(252, 100%, 67%)" },
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
  const [selectedSegmentTab, setSelectedSegmentTab] = useState("Stable-Low");
  const [segmentBy, setSegmentBy] = useState("lifecycle");

  // Calculate total for treemap proportional sizing
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
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              Last refreshed: 2 hours ago
            </Badge>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            SECTION 1 — LIFECYCLE TREEMAP
        ══════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Lifecycle Segmentation</h2>
              <Tooltip>
                <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent className="max-w-xs">Customers grouped by lifecycle stage: New, Grow, Declining, Stable. Hover any block for details.</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Interactive Treemap */}
          <div className="grid grid-cols-12 gap-1 min-h-[320px]">
            {lifecycleData.map((group) => {
              const groupTotal = group.children.reduce((s, c) => s + c.count, 0);
              const colSpan = Math.max(2, Math.round((groupTotal / totalCustomers) * 12));
              return (
                <div
                  key={group.id}
                  className="flex flex-col gap-0.5 rounded-lg overflow-hidden"
                  style={{ gridColumn: `span ${colSpan}` }}
                >
                  {/* Group header */}
                  <div
                    className="px-3 py-2 text-sm font-bold text-white"
                    style={{ backgroundColor: group.color }}
                  >
                    {group.label}
                  </div>
                  {/* Children blocks */}
                  {group.children.map((child, idx) => {
                    const blockId = `${group.id}-${idx}`;
                    const isHovered = hoveredBlock === blockId;
                    const childPct = (child.count / groupTotal) * 100;
                    return (
                      <div
                        key={idx}
                        className="relative px-3 py-3 cursor-pointer transition-all duration-200 text-white"
                        style={{
                          backgroundColor: group.color,
                          opacity: isHovered ? 1 : 0.82,
                          flex: `${childPct} 0 0%`,
                          minHeight: 48,
                        }}
                        onMouseEnter={() => setHoveredBlock(blockId)}
                        onMouseLeave={() => setHoveredBlock(null)}
                      >
                        <p className="text-xs font-medium truncate">
                          {group.label.toLowerCase()}-{child.sub}
                        </p>
                        <p className="text-[10px] opacity-80 truncate">{child.label}</p>

                        {/* Hover tooltip */}
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

        {/* ── Segment By + Tabs ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Segment by:</span>
              <Tooltip>
                <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                <TooltipContent>Choose the segmentation model</TooltipContent>
              </Tooltip>
            </div>
            <Select value={segmentBy} onValueChange={setSegmentBy}>
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lifecycle">Lifecycle</SelectItem>
                <SelectItem value="rfm">RFM</SelectItem>
                <SelectItem value="tier">Tier</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Segment tabs (scrollable) */}
          <div className="overflow-x-auto scrollbar-thin">
            <div className="flex gap-1">
              {segmentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedSegmentTab(tab)}
                  className={`px-3 py-1.5 text-xs rounded-md whitespace-nowrap transition-colors ${
                    selectedSegmentTab === tab
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Segment Trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Segment Trend — {selectedSegmentTab}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                    <RechartsTooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="customers" stroke="hsl(var(--atlas-warning))" strokeWidth={2} dot={{ fill: "hsl(var(--atlas-warning))", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Segment Transition ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">Segment Transition</h2>
            <Tooltip>
              <TooltipTrigger><Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
              <TooltipContent>Users who moved from other segments</TooltipContent>
            </Tooltip>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Donut */}
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={transitionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={2}>
                    {transitionData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                    formatter={(value: number) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Transition table */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">Declining — 100%</p>
              <p className="text-xs text-muted-foreground mb-3">Users who moved from other segments.</p>
              <div className="space-y-0">
                {transitionData.map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{t.name}</span>
                    <span className="text-sm font-medium text-foreground">{t.value} %</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* ══════════════════════════════════════════
            SECTION 2 — RFM SEGMENTS
        ══════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">RFM Segment Overview</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rfmSummary.map((seg) => (
              <Card key={seg.segment} className="surface-hover">
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

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* ══════════════════════════════════════════
            SECTION 3 — TIER BIFURCATION
        ══════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Tier Bifurcation</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tierData.map((tier) => (
              <Card key={tier.tier} className="surface-hover">
                <CardContent className="pt-5 pb-4 text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: tier.color }}
                  >
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
