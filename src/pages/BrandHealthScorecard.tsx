import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
  Repeat,
  Gift,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  Sparkles,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ----------------------------- Mock data ----------------------------- */

type Trend = "up" | "down" | "flat";

interface MetricCard {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  unit?: string;
  delta: number; // %
  trend: Trend;
  vsLabel: string;
  spark: { x: string; y: number }[];
  icon: React.ElementType;
  accent: "primary" | "accent" | "chart-3" | "chart-4" | "chart-5";
  insight: string;
}

const buildSpark = (base: number, vol = 0.12, len = 14) =>
  Array.from({ length: len }, (_, i) => ({
    x: `D${i + 1}`,
    y: Math.round(base * (1 + Math.sin(i / 2) * vol + (Math.random() - 0.5) * vol)),
  }));

const primaryMetrics: MetricCard[] = [
  {
    id: "transacting",
    label: "Transacting Customers",
    value: "1,84,520",
    rawValue: 184520,
    delta: 8.4,
    trend: "up",
    vsLabel: "vs prev 30 days",
    spark: buildSpark(180000, 0.06),
    icon: Users,
    accent: "primary",
    insight: "Growth led by Tier-1 stores; new-member share up 3.1pp.",
  },
  {
    id: "repeaters",
    label: "Repeaters",
    value: "62,340",
    rawValue: 62340,
    delta: 12.1,
    trend: "up",
    vsLabel: "vs prev 30 days",
    spark: buildSpark(60000, 0.08),
    icon: Repeat,
    accent: "chart-3",
    insight: "Repeat rate at 33.8% — highest in last 6 months.",
  },
  {
    id: "redeemers",
    label: "Redeemers",
    value: "41,210",
    rawValue: 41210,
    delta: -2.6,
    trend: "down",
    vsLabel: "vs prev 30 days",
    spark: buildSpark(42000, 0.07),
    icon: Gift,
    accent: "chart-4",
    insight: "Decline driven by lower Silver-tier redemption velocity.",
  },
  {
    id: "aov",
    label: "Avg Order Value",
    value: "₹3,420",
    rawValue: 3420,
    delta: 4.2,
    trend: "up",
    vsLabel: "vs prev 30 days",
    spark: buildSpark(3300, 0.05),
    icon: ShoppingBag,
    accent: "accent",
    insight: "Premium category mix improving — sarees & jewellery up.",
  },
];

const secondaryMetrics: MetricCard[] = [
  {
    id: "revenue",
    label: "Loyalty Revenue",
    value: "₹12.4 Cr",
    rawValue: 124000000,
    delta: 9.7,
    trend: "up",
    vsLabel: "vs prev period",
    spark: buildSpark(120, 0.08),
    icon: IndianRupee,
    accent: "primary",
    insight: "Loyalty share of total revenue at 64.2%.",
  },
  {
    id: "frequency",
    label: "Purchase Frequency",
    value: "2.34x",
    rawValue: 2.34,
    delta: 5.1,
    trend: "up",
    vsLabel: "per customer / 30d",
    spark: buildSpark(2.3, 0.06),
    icon: Activity,
    accent: "chart-3",
    insight: "Higher repeat cadence among VIP & Loyal segments.",
  },
  {
    id: "redemption",
    label: "Redemption Rate",
    value: "34.2%",
    rawValue: 34.2,
    delta: -1.8,
    trend: "down",
    vsLabel: "of active members",
    spark: buildSpark(35, 0.05),
    icon: TrendingUp,
    accent: "chart-4",
    insight: "Action: refresh reward catalog for Silver tier.",
  },
  {
    id: "nps",
    label: "Loyalty NPS",
    value: "72",
    rawValue: 72,
    delta: 4.5,
    trend: "up",
    vsLabel: "rolling 90 days",
    spark: buildSpark(70, 0.04),
    icon: Sparkles,
    accent: "accent",
    insight: "Sentiment trending positive across all tiers.",
  },
];

const cohortData = [
  { name: "VIP", value: 92, fill: "hsl(var(--chart-3))" },
  { name: "Loyal", value: 78, fill: "hsl(var(--primary))" },
  { name: "Potential", value: 64, fill: "hsl(var(--accent))" },
  { name: "At-Risk", value: 41, fill: "hsl(var(--chart-4))" },
  { name: "Churned", value: 18, fill: "hsl(var(--chart-5))" },
];

/* ----------------------------- Sub components ----------------------------- */

const accentToHsl: Record<MetricCard["accent"], string> = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  "chart-3": "hsl(var(--chart-3))",
  "chart-4": "hsl(var(--chart-4))",
  "chart-5": "hsl(var(--chart-5))",
};

const TrendBadge = ({ delta, trend }: { delta: number; trend: Trend }) => {
  const Icon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : Minus;
  const tone =
    trend === "up"
      ? "text-chart-3 bg-chart-3/10 border-chart-3/20"
      : trend === "down"
      ? "text-chart-4 bg-chart-4/10 border-chart-4/20"
      : "text-muted-foreground bg-muted/30 border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border tabular-nums",
        tone,
      )}
    >
      <Icon className="h-3 w-3" />
      {delta > 0 ? "+" : ""}
      {delta.toFixed(1)}%
    </span>
  );
};

const Sparkline = ({ data, color }: { data: { x: string; y: number }[]; color: string }) => {
  const id = useMemo(() => `spark-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="y"
            stroke={color}
            strokeWidth={1.75}
            fill={`url(#${id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const MetricTile = ({ m }: { m: MetricCard }) => {
  const color = accentToHsl[m.accent];
  const Icon = m.icon;
  return (
    <Card className="group relative overflow-hidden bg-secondary/10 border-border/60 hover:border-border transition-colors">
      {/* accent bar */}
      <div
        className="absolute top-0 left-0 h-[2px] w-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="h-8 w-8 rounded-md flex items-center justify-center border"
              style={{
                backgroundColor: `${color.replace("hsl(", "hsla(").replace(")", ", 0.08)")}`,
                borderColor: `${color.replace("hsl(", "hsla(").replace(")", ", 0.2)")}`,
              }}
            >
              <Icon className="h-4 w-4" style={{ color }} />
            </div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium truncate">
              {m.label}
            </p>
          </div>
          <TrendBadge delta={m.delta} trend={m.trend} />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-3xl font-semibold text-foreground tabular-nums leading-none">
              {m.value}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">{m.vsLabel}</p>
          </div>
        </div>

        <Sparkline data={m.spark} color={color} />

        <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
          {m.insight}
        </p>
      </div>
    </Card>
  );
};

const CompactMetric = ({ m }: { m: MetricCard }) => {
  const color = accentToHsl[m.accent];
  const Icon = m.icon;
  return (
    <Card className="bg-secondary/10 border-border/60 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" style={{ color }} />
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            {m.label}
          </p>
        </div>
        <TrendBadge delta={m.delta} trend={m.trend} />
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="text-2xl font-semibold text-foreground tabular-nums leading-none">
          {m.value}
        </div>
        <div className="w-24">
          <Sparkline data={m.spark} color={color} />
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">{m.vsLabel}</p>
    </Card>
  );
};

/* ----------------------------- Page ----------------------------- */

const BrandHealthScorecard = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/ai-chat-legacy">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-foreground">Brand Health Scorecard</h1>
                <Badge variant="outline" className="text-[10px] h-5 border-primary/30 text-primary bg-primary/5">
                  Live
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Loyalty program vitals · Last 30 days · Updated 4 min ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] h-6 gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-chart-3 animate-pulse" />
              Healthy
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Executive summary */}
        <Card className="bg-gradient-to-br from-primary/[0.06] via-secondary/10 to-accent/[0.04] border-border/60 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[11px] uppercase tracking-wider text-primary font-medium">
                  Executive Summary
                </p>
                <span className="text-[11px] text-muted-foreground">·</span>
                <p className="text-[11px] text-muted-foreground">Composite score 78 / 100</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Brand health is <span className="text-chart-3 font-medium">trending up</span> this
                period. Transacting customers grew <span className="font-medium">8.4%</span> with
                repeater volume reaching a 6-month high. The one watch-area is{" "}
                <span className="text-chart-4 font-medium">redemption velocity</span>, dragged by
                Silver-tier members — refreshing the reward catalog should recover ~2pp within 14
                days.
              </p>
            </div>
          </div>
        </Card>

        {/* Primary KPI grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
              Core Vitals
            </h2>
            <p className="text-[11px] text-muted-foreground">4 metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {primaryMetrics.map((m) => (
              <MetricTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* Secondary + cohort */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Engagement & Value
              </h2>
              <p className="text-[11px] text-muted-foreground">4 metrics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {secondaryMetrics.map((m) => (
                <CompactMetric key={m.id} m={m} />
              ))}
            </div>
          </div>

          {/* Cohort health */}
          <Card className="bg-secondary/10 border-border/60 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-foreground">Cohort Health Index</h3>
              <Badge variant="outline" className="text-[10px] h-5">
                0 – 100
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Composite score per RFM segment
            </p>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cohortData}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  barCategoryGap={10}
                >
                  <CartesianGrid
                    horizontal={false}
                    stroke="hsl(var(--border))"
                    strokeDasharray="2 4"
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={70}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {cohortData.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Footer note */}
        <p className="text-[11px] text-muted-foreground text-center pt-2 pb-6">
          Data refreshed every 15 minutes · Source: Atlas Prime · RFM Engine · Campaigns
        </p>
      </main>
    </div>
  );
};

export default BrandHealthScorecard;
