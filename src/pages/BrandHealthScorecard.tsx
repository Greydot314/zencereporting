import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
  UserPlus,
  Repeat,
  Gift,
  IndianRupee,
  Receipt,
  Coins,
  ShoppingBag,
  Sparkles,
  Download,
  FileDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ----------------------------- Types & helpers ----------------------------- */

type Trend = "up" | "down" | "flat";
type Accent = "primary" | "accent" | "chart-3" | "chart-4" | "chart-5";

interface Metric {
  id: string;
  label: string;
  value: string;
  prev: string;
  delta: number; // %
  trend: Trend;
  spark: { x: string; y: number }[];
  icon: React.ElementType;
  accent: Accent;
}

const accentToHsl: Record<Accent, string> = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  "chart-3": "hsl(var(--chart-3))",
  "chart-4": "hsl(var(--chart-4))",
  "chart-5": "hsl(var(--chart-5))",
};

const buildSpark = (base: number, vol = 0.1, len = 14, downward = false) =>
  Array.from({ length: len }, (_, i) => {
    const drift = downward ? -i * 0.015 : 0;
    return {
      x: `D${i + 1}`,
      y: Math.max(
        0,
        Math.round(
          base * (1 + drift + Math.sin(i / 2) * vol + (Math.random() - 0.5) * vol),
        ),
      ),
    };
  });

/* ----------------------------- Mock data ----------------------------- */

const customerMetrics: Metric[] = [
  {
    id: "transacting",
    label: "Transacting Customers",
    value: "23,339",
    prev: "44,387",
    delta: -47.3,
    trend: "down",
    spark: buildSpark(40000, 0.08, 14, true),
    icon: Users,
    accent: "primary",
  },
  {
    id: "new",
    label: "New Customers",
    value: "12,753",
    prev: "25,223",
    delta: -49.4,
    trend: "down",
    spark: buildSpark(22000, 0.09, 14, true),
    icon: UserPlus,
    accent: "chart-3",
  },
  {
    id: "repeaters",
    label: "Repeaters",
    value: "11,834",
    prev: "22,219",
    delta: -46.7,
    trend: "down",
    spark: buildSpark(20000, 0.08, 14, true),
    icon: Repeat,
    accent: "accent",
  },
  {
    id: "redeemers",
    label: "Redeemers",
    value: "4,115",
    prev: "7,885",
    delta: -47.8,
    trend: "down",
    spark: buildSpark(7000, 0.07, 14, true),
    icon: Gift,
    accent: "chart-4",
  },
];

const salesMetrics: Metric[] = [
  {
    id: "total-sales",
    label: "Total Sales",
    value: "₹19,04,10,875",
    prev: "₹33,80,65,726.46",
    delta: -43.7,
    trend: "down",
    spark: buildSpark(33, 0.07, 14, true),
    icon: IndianRupee,
    accent: "primary",
  },
  {
    id: "loyalty-sales",
    label: "Loyalty Sales",
    value: "₹19,04,10,875",
    prev: "₹30,58,20,713.08",
    delta: -37.7,
    trend: "down",
    spark: buildSpark(30, 0.07, 14, true),
    icon: IndianRupee,
    accent: "chart-3",
  },
  {
    id: "repeat-sales",
    label: "Repeat Sales",
    value: "₹9,71,72,644",
    prev: "₹15,72,70,688.8",
    delta: -38.2,
    trend: "down",
    spark: buildSpark(15, 0.07, 14, true),
    icon: IndianRupee,
    accent: "accent",
  },
  {
    id: "redeemer-sales",
    label: "Redeemer Sales",
    value: "₹2,51,87,320",
    prev: "₹3,72,22,762.72",
    delta: -32.3,
    trend: "down",
    spark: buildSpark(3.7, 0.07, 14, true),
    icon: IndianRupee,
    accent: "chart-4",
  },
];

const billMetrics: Metric[] = [
  {
    id: "total-bills",
    label: "Total Bills",
    value: "26,772",
    prev: "55,283",
    delta: -51.6,
    trend: "down",
    spark: buildSpark(50000, 0.08, 14, true),
    icon: Receipt,
    accent: "primary",
  },
  {
    id: "loyalty-bills",
    label: "Loyalty Bills",
    value: "26,772",
    prev: "53,837",
    delta: -50.3,
    trend: "down",
    spark: buildSpark(50000, 0.08, 14, true),
    icon: Receipt,
    accent: "chart-3",
  },
  {
    id: "repeat-bills",
    label: "Repeat Bills",
    value: "14,243",
    prev: "28,717",
    delta: -50.4,
    trend: "down",
    spark: buildSpark(27000, 0.08, 14, true),
    icon: Receipt,
    accent: "accent",
  },
  {
    id: "redeemer-bills",
    label: "Redeemer Bills",
    value: "4,289",
    prev: "8,354",
    delta: -48.7,
    trend: "down",
    spark: buildSpark(8000, 0.08, 14, true),
    icon: Receipt,
    accent: "chart-4",
  },
];

const pointsMetrics: Metric[] = [
  {
    id: "points-collected",
    label: "Points Collected",
    value: "55,27,548",
    prev: "88,68,740",
    delta: -37.7,
    trend: "down",
    spark: buildSpark(85, 0.08, 14, true),
    icon: Coins,
    accent: "primary",
  },
  {
    id: "points-spent",
    label: "Points Spent",
    value: "23,61,011",
    prev: "26,66,739",
    delta: -36.1,
    trend: "down",
    spark: buildSpark(26, 0.06, 14, true),
    icon: Coins,
    accent: "chart-4",
  },
];

const atvMetrics: Metric[] = [
  {
    id: "total-atv",
    label: "Total ATV",
    value: "₹7,114",
    prev: "₹6,116",
    delta: 16.3,
    trend: "up",
    spark: buildSpark(6500, 0.05),
    icon: ShoppingBag,
    accent: "chart-3",
  },
  {
    id: "loyalty-atv",
    label: "Loyalty ATV",
    value: "₹7,114",
    prev: "₹5,681",
    delta: 25.2,
    trend: "up",
    spark: buildSpark(6200, 0.05),
    icon: ShoppingBag,
    accent: "chart-3",
  },
  {
    id: "repeat-atv",
    label: "Repeat ATV",
    value: "₹6,822",
    prev: "₹5,476",
    delta: 24.5,
    trend: "up",
    spark: buildSpark(6000, 0.05),
    icon: ShoppingBag,
    accent: "primary",
  },
  {
    id: "redeemer-atv",
    label: "Redeemer ATV",
    value: "₹5,872",
    prev: "₹4,455",
    delta: 31.8,
    trend: "up",
    spark: buildSpark(5300, 0.05),
    icon: ShoppingBag,
    accent: "accent",
  },
];

const cohortData = [
  { name: "VIP", value: 92, fill: "hsl(var(--chart-3))" },
  { name: "Loyal", value: 78, fill: "hsl(var(--primary))" },
  { name: "Potential", value: 64, fill: "hsl(var(--accent))" },
  { name: "At-Risk", value: 41, fill: "hsl(var(--chart-4))" },
  { name: "Churned", value: 18, fill: "hsl(var(--chart-5))" },
];

/* ----------------------------- Components ----------------------------- */

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
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border tabular-nums",
        tone,
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {delta > 0 ? "+" : ""}
      {delta.toFixed(1)}%
    </span>
  );
};

const Sparkline = ({
  data,
  color,
  height = 32,
}: {
  data: { x: string; y: number }[];
  color: string;
  height?: number;
}) => {
  const id = useMemo(() => `spark-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
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
            strokeWidth={1.5}
            fill={`url(#${id})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const KpiTile = ({ m }: { m: Metric }) => {
  const color = accentToHsl[m.accent];
  const Icon = m.icon;
  return (
    <Card className="group relative overflow-hidden bg-secondary/10 border-border/60 hover:border-border transition-colors">
      <div
        className="absolute top-0 left-0 h-[2px] w-full opacity-70"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div
              className="h-7 w-7 rounded-md flex items-center justify-center border flex-shrink-0"
              style={{
                backgroundColor: color.replace("hsl(", "hsla(").replace(")", ", 0.08)"),
                borderColor: color.replace("hsl(", "hsla(").replace(")", ", 0.2)"),
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color }} />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium truncate">
              {m.label}
            </p>
          </div>
          <TrendBadge delta={m.delta} trend={m.trend} />
        </div>

        <div>
          <div className="text-2xl font-semibold text-foreground tabular-nums leading-none">
            {m.value}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 tabular-nums">
            Prev:&nbsp;<span className="text-foreground/70">{m.prev}</span>
          </p>
        </div>

        <Sparkline data={m.spark} color={color} />
      </div>
    </Card>
  );
};

const SectionHeader = ({
  title,
  count,
  bar = "primary",
}: {
  title: string;
  count: number;
  bar?: Accent;
}) => {
  const color = accentToHsl[bar];
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="h-3 w-[3px] rounded-sm" style={{ backgroundColor: color }} />
        <h2 className="text-xs uppercase tracking-wider text-foreground font-semibold">
          {title}
        </h2>
      </div>
      <p className="text-[10px] text-muted-foreground tabular-nums">{count} metrics</p>
    </div>
  );
};

/* ----------------------------- Page ----------------------------- */

const BrandHealthScorecard = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/ai-chat-legacy">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-foreground truncate">
                  Brand Health <span className="text-primary">Scorecard</span>
                </h1>
                <Badge
                  variant="outline"
                  className="text-[9px] h-4 px-1.5 border-primary/30 text-primary bg-primary/5"
                >
                  LIVE
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Monthly Performance Report · April 2026 · Updated 4 min ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className="text-[10px] h-7 gap-1.5 border-chart-4/30 text-chart-4 bg-chart-4/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-chart-4 animate-pulse" />
              Needs Attention
            </Badge>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <FileDown className="h-3.5 w-3.5" />
              Export Summary
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* Strategic Insight */}
        <Card className="relative overflow-hidden border-border/60">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-secondary/10 to-chart-4/[0.05]" />
          <div className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-primary via-accent to-chart-4" />
          <div className="relative p-6 flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="text-[10px] h-5 border-primary/30 text-primary bg-primary/5 uppercase tracking-wider"
                >
                  Strategic Insight
                </Badge>
                <span className="text-[11px] text-muted-foreground">·</span>
                <p className="text-[11px] text-muted-foreground">
                  Composite health score{" "}
                  <span className="text-chart-4 font-medium tabular-nums">42 / 100</span>
                </p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                Killersignatureclub is in a{" "}
                <span className="text-chart-4 font-medium">concerning state</span>, experiencing a
                severe MoM contraction across all key customer and transaction volume metrics.
                Total bills are down over <span className="font-medium tabular-nums">50%</span> and
                new customers nearly halved. While{" "}
                <span className="text-chart-3 font-medium">average transaction value</span> has
                seen a strong double-digit increase, this positive trend is entirely overshadowed
                by the dramatic decline in overall engagement and sales.
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
                Generated from real-time comparative analytics of killersignatureclub's core
                performance metrics against March data.
              </p>
            </div>
          </div>
        </Card>

        {/* Customer Metrics */}
        <section>
          <SectionHeader title="Customer Metrics" count={customerMetrics.length} bar="primary" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {customerMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* Sales Metrics */}
        <section>
          <SectionHeader title="Sales Metrics" count={salesMetrics.length} bar="chart-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {salesMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* Bill Metrics */}
        <section>
          <SectionHeader title="Bill Metrics" count={billMetrics.length} bar="accent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {billMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* Points + Cohort */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <SectionHeader title="Points Metrics" count={pointsMetrics.length} bar="chart-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pointsMetrics.map((m) => (
                <KpiTile key={m.id} m={m} />
              ))}
            </div>
          </div>

          <Card className="bg-secondary/10 border-border/60 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-foreground">Cohort Health Index</h3>
              <Badge variant="outline" className="text-[10px] h-5">
                0 – 100
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Composite score per RFM segment
            </p>
            <div className="flex-1 min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cohortData}
                  layout="vertical"
                  margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                  barCategoryGap={8}
                >
                  <CartesianGrid
                    horizontal={false}
                    stroke="hsl(var(--border))"
                    strokeDasharray="2 4"
                  />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={64}
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

        {/* ATV Metrics */}
        <section>
          <SectionHeader title="ATV Metrics" count={atvMetrics.length} bar="chart-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {atvMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        <p className="text-[11px] text-muted-foreground text-center pt-2 pb-6">
          Data refreshed every 15 minutes · Source: Atlas Prime · RFM Engine · Campaigns
        </p>
      </main>
    </div>
  );
};

export default BrandHealthScorecard;
