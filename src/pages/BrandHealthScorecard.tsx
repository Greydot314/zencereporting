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
  AlertTriangle,
  TrendingUp,
  Target,
  Activity,
} from "lucide-react";
import {
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

/* ----------------------------- Types ----------------------------- */

type Direction = "up" | "down" | "flat";
// Whether a positive delta is good (e.g., sales) or bad (e.g., churn)
type Polarity = "positive-good" | "negative-good";

interface Metric {
  id: string;
  label: string;
  value: string;
  prev: string;
  delta: number; // %
  direction: Direction;
  polarity: Polarity;
  icon: React.ElementType;
  context?: string; // short business context line
}

/* ----------------------------- Helpers ----------------------------- */

// Determine if a delta is "good" or "bad" based on polarity
const getSentiment = (delta: number, polarity: Polarity): "good" | "bad" | "neutral" => {
  if (delta === 0) return "neutral";
  const isPositive = delta > 0;
  if (polarity === "positive-good") return isPositive ? "good" : "bad";
  return isPositive ? "bad" : "good";
};

const sentimentClasses = {
  good: {
    text: "text-atlas-success",
    bg: "bg-atlas-success/10",
    border: "border-atlas-success/25",
    dot: "bg-atlas-success",
  },
  bad: {
    text: "text-atlas-error",
    bg: "bg-atlas-error/10",
    border: "border-atlas-error/25",
    dot: "bg-atlas-error",
  },
  neutral: {
    text: "text-muted-foreground",
    bg: "bg-muted/40",
    border: "border-border",
    dot: "bg-muted-foreground",
  },
};

/* ----------------------------- Mock data ----------------------------- */

const customerMetrics: Metric[] = [
  {
    id: "transacting",
    label: "Transacting Customers",
    value: "23,339",
    prev: "44,387",
    delta: -47.3,
    direction: "down",
    polarity: "positive-good",
    icon: Users,
    context: "21,048 fewer active buyers vs March",
  },
  {
    id: "new",
    label: "New Customers",
    value: "12,753",
    prev: "25,223",
    delta: -49.4,
    direction: "down",
    polarity: "positive-good",
    icon: UserPlus,
    context: "Acquisition nearly halved",
  },
  {
    id: "repeaters",
    label: "Repeaters",
    value: "11,834",
    prev: "22,219",
    delta: -46.7,
    direction: "down",
    polarity: "positive-good",
    icon: Repeat,
    context: "Loyal base shrinking sharply",
  },
  {
    id: "redeemers",
    label: "Redeemers",
    value: "4,115",
    prev: "7,885",
    delta: -47.8,
    direction: "down",
    polarity: "positive-good",
    icon: Gift,
    context: "Reward engagement weakening",
  },
];

const salesMetrics: Metric[] = [
  {
    id: "total-sales",
    label: "Total Sales",
    value: "₹19.04 Cr",
    prev: "₹33.81 Cr",
    delta: -43.7,
    direction: "down",
    polarity: "positive-good",
    icon: IndianRupee,
    context: "₹14.77 Cr revenue lost MoM",
  },
  {
    id: "loyalty-sales",
    label: "Loyalty Sales",
    value: "₹19.04 Cr",
    prev: "₹30.58 Cr",
    delta: -37.7,
    direction: "down",
    polarity: "positive-good",
    icon: IndianRupee,
    context: "100% of sales now from loyalty",
  },
  {
    id: "repeat-sales",
    label: "Repeat Sales",
    value: "₹9.72 Cr",
    prev: "₹15.73 Cr",
    delta: -38.2,
    direction: "down",
    polarity: "positive-good",
    icon: IndianRupee,
    context: "51% of total sales",
  },
  {
    id: "redeemer-sales",
    label: "Redeemer Sales",
    value: "₹2.52 Cr",
    prev: "₹3.72 Cr",
    delta: -32.3,
    direction: "down",
    polarity: "positive-good",
    icon: IndianRupee,
    context: "13% of total sales",
  },
];

const billMetrics: Metric[] = [
  {
    id: "total-bills",
    label: "Total Bills",
    value: "26,772",
    prev: "55,283",
    delta: -51.6,
    direction: "down",
    polarity: "positive-good",
    icon: Receipt,
    context: "Steepest decline this month",
  },
  {
    id: "loyalty-bills",
    label: "Loyalty Bills",
    value: "26,772",
    prev: "53,837",
    delta: -50.3,
    direction: "down",
    polarity: "positive-good",
    icon: Receipt,
    context: "All bills tagged to loyalty",
  },
  {
    id: "repeat-bills",
    label: "Repeat Bills",
    value: "14,243",
    prev: "28,717",
    delta: -50.4,
    direction: "down",
    polarity: "positive-good",
    icon: Receipt,
    context: "53% repeat ratio held",
  },
  {
    id: "redeemer-bills",
    label: "Redeemer Bills",
    value: "4,289",
    prev: "8,354",
    delta: -48.7,
    direction: "down",
    polarity: "positive-good",
    icon: Receipt,
    context: "16% of total bills",
  },
];

const pointsMetrics: Metric[] = [
  {
    id: "points-collected",
    label: "Points Collected",
    value: "55,27,548",
    prev: "88,68,740",
    delta: -37.7,
    direction: "down",
    polarity: "positive-good",
    icon: Coins,
    context: "Lower issuance from fewer txns",
  },
  {
    id: "points-spent",
    label: "Points Spent",
    value: "23,61,011",
    prev: "26,66,739",
    delta: -36.1,
    direction: "down",
    polarity: "positive-good",
    icon: Coins,
    context: "43% burn ratio (vs 30% prior)",
  },
];

const atvMetrics: Metric[] = [
  {
    id: "total-atv",
    label: "Total ATV",
    value: "₹7,114",
    prev: "₹6,116",
    delta: 16.3,
    direction: "up",
    polarity: "positive-good",
    icon: ShoppingBag,
    context: "Premium basket strengthening",
  },
  {
    id: "loyalty-atv",
    label: "Loyalty ATV",
    value: "₹7,114",
    prev: "₹5,681",
    delta: 25.2,
    direction: "up",
    polarity: "positive-good",
    icon: ShoppingBag,
    context: "Loyalty value-per-bill up sharply",
  },
  {
    id: "repeat-atv",
    label: "Repeat ATV",
    value: "₹6,822",
    prev: "₹5,476",
    delta: 24.5,
    direction: "up",
    polarity: "positive-good",
    icon: ShoppingBag,
    context: "Returning shoppers spending more",
  },
  {
    id: "redeemer-atv",
    label: "Redeemer ATV",
    value: "₹5,872",
    prev: "₹4,455",
    delta: 31.8,
    direction: "up",
    polarity: "positive-good",
    icon: ShoppingBag,
    context: "Strongest ATV gain in cohort",
  },
];

const cohortData = [
  { name: "VIP", value: 92, fill: "hsl(var(--atlas-success))" },
  { name: "Loyal", value: 78, fill: "hsl(var(--primary))" },
  { name: "Potential", value: 64, fill: "hsl(var(--accent))" },
  { name: "At-Risk", value: 41, fill: "hsl(var(--atlas-warning))" },
  { name: "Churned", value: 18, fill: "hsl(var(--atlas-error))" },
];

/* ----------------------------- Components ----------------------------- */

const TrendBadge = ({ delta, polarity }: { delta: number; polarity: Polarity }) => {
  const sentiment = getSentiment(delta, polarity);
  const tone = sentimentClasses[sentiment];
  const Icon = delta > 0 ? ArrowUpRight : delta < 0 ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold border tabular-nums",
        tone.text,
        tone.bg,
        tone.border,
      )}
    >
      <Icon className="h-2.5 w-2.5" />
      {delta > 0 ? "+" : ""}
      {delta.toFixed(1)}%
    </span>
  );
};

const KpiTile = ({ m }: { m: Metric }) => {
  const sentiment = getSentiment(m.delta, m.polarity);
  const tone = sentimentClasses[sentiment];
  const Icon = m.icon;

  return (
    <Card className="group relative overflow-hidden bg-card border-border/60 hover:border-border transition-colors">
      {/* Sentiment edge — replaces the meaningless line */}
      <div className={cn("absolute top-0 left-0 h-full w-[3px]", tone.dot)} />

      <div className="p-4 pl-5 flex flex-col gap-3 min-h-[140px]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium truncate">
              {m.label}
            </p>
          </div>
          <TrendBadge delta={m.delta} polarity={m.polarity} />
        </div>

        <div>
          <div className="text-2xl font-semibold text-foreground tabular-nums leading-none">
            {m.value}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1.5 tabular-nums">
            Prev:&nbsp;<span className="text-foreground/70">{m.prev}</span>
          </p>
        </div>

        {m.context && (
          <div className="mt-auto pt-2 border-t border-border/40">
            <p className={cn("text-[10px] leading-snug", tone.text)}>{m.context}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

const SectionHeader = ({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle?: string;
  count: number;
}) => (
  <div className="flex items-end justify-between mb-3">
    <div>
      <h2 className="text-xs uppercase tracking-wider text-foreground font-semibold">{title}</h2>
      {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
    <p className="text-[10px] text-muted-foreground tabular-nums">{count} metrics</p>
  </div>
);

/* ----------------------------- Page ----------------------------- */

const BrandHealthScorecard = () => {
  // Focus KPIs — the "command center" hero strip
  const focusKpis = [
    {
      label: "Composite Health Score",
      value: "42",
      suffix: "/100",
      sentiment: "bad" as const,
      icon: Activity,
      context: "Down 18 points MoM · Threshold: 60",
    },
    {
      label: "Revenue at Risk",
      value: "₹14.77",
      suffix: "Cr",
      sentiment: "bad" as const,
      icon: AlertTriangle,
      context: "Vs March baseline · 43.7% gap",
    },
    {
      label: "Active Customer Base",
      value: "23,339",
      suffix: "",
      sentiment: "bad" as const,
      icon: Users,
      context: "21,048 lost vs March",
    },
    {
      label: "Avg. Transaction Value",
      value: "₹7,114",
      suffix: "",
      sentiment: "good" as const,
      icon: TrendingUp,
      context: "Up 16.3% — only positive signal",
    },
  ];

  const alerts = [
    {
      severity: "critical" as const,
      title: "Bill volume collapsed 51.6%",
      detail: "26,772 bills vs 55,283 in March — single largest contraction",
    },
    {
      severity: "critical" as const,
      title: "Acquisition halved",
      detail: "12,753 new customers vs 25,223 — funnel drying up",
    },
    {
      severity: "warning" as const,
      title: "Reward burn rising",
      detail: "Burn ratio at 43% (vs 30% prior) — points liability building",
    },
    {
      severity: "positive" as const,
      title: "Basket value strengthening",
      detail: "Redeemer ATV up 31.8% — premium intent intact",
    },
  ];

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
                  Brand Health <span className="text-primary">Command Center</span>
                </h1>
                <Badge
                  variant="outline"
                  className="text-[9px] h-4 px-1.5 border-primary/30 text-primary bg-primary/5"
                >
                  LIVE
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Killersignatureclub · April 2026 vs March 2026 · Updated 4 min ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              variant="outline"
              className="text-[10px] h-7 gap-1.5 border-atlas-error/30 text-atlas-error bg-atlas-error/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-atlas-error animate-pulse" />
              Critical · Action Required
            </Badge>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
              <FileDown className="h-3.5 w-3.5" />
              Summary
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 py-6 space-y-6">
        {/* ---- HERO: Focus KPIs ---- */}
        <section>
          <div className="flex items-end justify-between mb-3">
            <div>
              <h2 className="text-xs uppercase tracking-wider text-foreground font-semibold">
                KPIs in Focus
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                The four signals leadership must act on this month
              </p>
            </div>
            <Badge variant="outline" className="text-[10px] h-5 gap-1">
              <Target className="h-2.5 w-2.5" />
              Executive view
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {focusKpis.map((k, i) => {
              const tone = sentimentClasses[k.sentiment];
              const Icon = k.icon;
              return (
                <Card
                  key={i}
                  className={cn(
                    "relative overflow-hidden border bg-card",
                    tone.border,
                  )}
                >
                  <div className={cn("absolute top-0 left-0 h-full w-[3px]", tone.dot)} />
                  <div className="p-5 pl-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={cn(
                          "h-8 w-8 rounded-md flex items-center justify-center border",
                          tone.bg,
                          tone.border,
                        )}
                      >
                        <Icon className={cn("h-4 w-4", tone.text)} />
                      </div>
                      <span
                        className={cn(
                          "text-[9px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded",
                          tone.bg,
                          tone.text,
                        )}
                      >
                        {k.sentiment === "bad"
                          ? "At Risk"
                          : k.sentiment === "good"
                            ? "On Track"
                            : "Stable"}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                        {k.label}
                      </p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-semibold text-foreground tabular-nums leading-none">
                          {k.value}
                        </span>
                        {k.suffix && (
                          <span className="text-sm text-muted-foreground tabular-nums">
                            {k.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className={cn("text-[11px] leading-snug", tone.text)}>{k.context}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ---- Strategic Insight + Alerts ---- */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2 relative overflow-hidden border-border/60">
            <div className="absolute inset-0 bg-gradient-to-br from-atlas-error/[0.06] via-card to-card" />
            <div className="absolute top-0 left-0 h-full w-[3px] bg-atlas-error" />
            <div className="relative p-6 flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-atlas-error/10 border border-atlas-error/25 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-atlas-error" />
              </div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-[10px] h-5 border-primary/30 text-primary bg-primary/5 uppercase tracking-wider"
                  >
                    Strategic Read
                  </Badge>
                  <span className="text-[11px] text-muted-foreground">·</span>
                  <p className="text-[11px] text-muted-foreground">
                    Synthesised from 16 KPIs across customer, sales, bills & rewards
                  </p>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Killersignatureclub is in a{" "}
                  <span className="text-atlas-error font-semibold">concerning state</span>. Volume
                  metrics — bills, customers, acquisition — have all contracted{" "}
                  <span className="font-semibold tabular-nums">~50%</span> month-over-month, while{" "}
                  <span className="text-atlas-success font-semibold">basket value rose 16–32%</span>.
                  This pattern signals a{" "}
                  <span className="font-semibold">narrower but more premium customer base</span> —
                  the brand is losing breadth, not intent.
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed pt-1 border-t border-border/40">
                  Recommended focus: reactivate lapsed loyalty members and accelerate acquisition
                  campaigns before May to prevent compounding revenue loss.
                </p>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card className="bg-card border-border/60 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase tracking-wider text-foreground font-semibold">
                Priority Alerts
              </h3>
              <Badge variant="outline" className="text-[10px] h-5">
                {alerts.length}
              </Badge>
            </div>
            <ul className="space-y-2.5 flex-1">
              {alerts.map((a, i) => {
                const tone =
                  a.severity === "critical"
                    ? sentimentClasses.bad
                    : a.severity === "positive"
                      ? sentimentClasses.good
                      : { ...sentimentClasses.neutral, text: "text-atlas-warning", dot: "bg-atlas-warning" };
                return (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 pb-2.5 border-b border-border/40 last:border-0 last:pb-0"
                  >
                    <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0", tone.dot)} />
                    <div className="min-w-0">
                      <p className={cn("text-[11px] font-semibold", tone.text)}>{a.title}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">
                        {a.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>

        {/* ---- Customer Metrics ---- */}
        <section>
          <SectionHeader
            title="Customer Metrics"
            subtitle="Who is showing up — and how loyal they are"
            count={customerMetrics.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {customerMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* ---- Sales Metrics ---- */}
        <section>
          <SectionHeader
            title="Sales Metrics"
            subtitle="Revenue contribution by cohort"
            count={salesMetrics.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {salesMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* ---- Bill Metrics ---- */}
        <section>
          <SectionHeader
            title="Bill Metrics"
            subtitle="Transaction frequency across the base"
            count={billMetrics.length}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {billMetrics.map((m) => (
              <KpiTile key={m.id} m={m} />
            ))}
          </div>
        </section>

        {/* ---- Points + Cohort ---- */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <SectionHeader
              title="Points Metrics"
              subtitle="Reward issuance vs redemption pressure"
              count={pointsMetrics.length}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pointsMetrics.map((m) => (
                <KpiTile key={m.id} m={m} />
              ))}
            </div>
          </div>

          <Card className="bg-card border-border/60 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-foreground">Cohort Health Index</h3>
              <Badge variant="outline" className="text-[10px] h-5">
                0 – 100
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">
              Composite score per RFM segment
            </p>
            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cohortData}
                  layout="vertical"
                  margin={{ top: 4, right: 24, left: 0, bottom: 0 }}
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
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "hsl(var(--muted-foreground))", fontSize: 10 }}>
                    {cohortData.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ---- ATV Metrics ---- */}
        <section>
          <SectionHeader
            title="ATV Metrics"
            subtitle="Basket value — the only growing dimension"
            count={atvMetrics.length}
          />
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
