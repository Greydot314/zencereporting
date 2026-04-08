import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import type { DurationKey, KpiCard, BarItem, DurationData } from "@/data/segmentKpiMockData";
import { segmentKpiByDuration } from "@/data/segmentKpiMockData";

interface Props {
  segmentName: string;
}

const durations: { key: DurationKey; label: string }[] = [
  { key: "lifetime", label: "Lifetime" },
  { key: "12m", label: "Last 12 months" },
  { key: "6m", label: "Last 6 months" },
  { key: "3m", label: "Last 3 months" },
];

/* ── tiny sub-components ── */

const KpiCardRow = ({ cards }: { cards: KpiCard[] }) => (
  <div className={cn("grid gap-3", cards.length === 3 ? "grid-cols-3" : "grid-cols-4")}>
    {cards.map((c, i) => (
      <div key={i} className="rounded-lg bg-muted/40 p-4">
        <p className="text-[11px] text-muted-foreground">{c.label}</p>
        <p className="text-lg font-semibold text-foreground mt-1">{c.value}</p>
        {c.sub && (
          <p
            className={cn(
              "text-[11px] mt-1",
              c.subColor === "green" && "text-[hsl(var(--atlas-success))]",
              c.subColor === "amber" && "text-[hsl(var(--atlas-warning))]",
              c.subColor === "red" && "text-[hsl(var(--atlas-error))]",
              (!c.subColor || c.subColor === "neutral") && "text-muted-foreground"
            )}
          >
            {c.sub}
          </p>
        )}
      </div>
    ))}
  </div>
);

const HorizontalBars = ({ title, items, barColor }: { title: string; items: BarItem[]; barColor?: string }) => {
  const max = Math.max(...items.map((b) => b.value));
  return (
    <div className="rounded-lg bg-muted/40 p-4 space-y-3">
      <p className="text-xs font-medium text-foreground">{title}</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-28 shrink-0 text-right">{item.label}</span>
          <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
            <div
              className="h-full rounded"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: barColor || "hsl(var(--primary))",
              }}
            />
          </div>
          <span className="text-xs font-medium text-foreground w-12">{item.value}%</span>
        </div>
      ))}
    </div>
  );
};

const SectionDivider = () => <div className="border-t border-border" />;

const SectionLabel = ({ children }: { children: string }) => (
  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{children}</p>
);

/* ── health score bar ── */
const HealthScore = ({ score, label, percentile }: { score: number; label: string; percentile: number }) => {
  const color =
    score >= 80 ? "hsl(var(--atlas-success))" : score >= 60 ? "hsl(var(--atlas-warning))" : "hsl(var(--atlas-error))";
  return (
    <div className="rounded-lg border border-border bg-card p-3 min-w-[200px]">
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold" style={{ color }}>{score}</span>
        <span className="text-xs text-muted-foreground">/ 100</span>
        <span className="text-xs font-medium ml-1" style={{ color }}>{label}</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full mt-2 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <p className="text-[10px] text-muted-foreground mt-1.5">Top {percentile}% of segments</p>
    </div>
  );
};

/* ── alert boxes ── */
const AlertBox = ({ text, variant }: { text: string; variant: "amber" | "blue" | "green" }) => {
  const styles = {
    amber: "border-[hsl(var(--atlas-warning))]/30 bg-[hsl(var(--atlas-warning))]/5 text-[hsl(var(--atlas-warning))]",
    blue: "border-primary/30 bg-primary/5 text-primary",
    green: "border-[hsl(var(--atlas-success))]/30 bg-[hsl(var(--atlas-success))]/5 text-[hsl(var(--atlas-success))]",
  };
  return (
    <div className={cn("rounded-lg border p-3 text-xs leading-relaxed", styles[variant])}>
      {text}
    </div>
  );
};

/* ── tab content ── */

const OverviewTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-5">
    <SectionLabel>Volume</SectionLabel>
    <KpiCardRow cards={d.overview.volume} />
    <SectionDivider />
    <SectionLabel>Monetary</SectionLabel>
    <KpiCardRow cards={d.overview.monetary} />
    <SectionDivider />
    <SectionLabel>Engagement</SectionLabel>
    <KpiCardRow cards={d.overview.engagement} />
    <SectionDivider />
    <div className="grid grid-cols-2 gap-4">
      <HorizontalBars title="Gender Split" items={d.overview.genderSplit} />
      <HorizontalBars title="Age Group Split" items={d.overview.ageSplit} />
    </div>
  </div>
);

const LoyaltyTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-5">
    <SectionLabel>Points Activity</SectionLabel>
    <KpiCardRow cards={d.loyalty.pointsActivity} />
    <SectionDivider />
    <SectionLabel>Points Risk</SectionLabel>
    <KpiCardRow cards={d.loyalty.pointsRisk} />
    <SectionDivider />
    <SectionLabel>Tier Dynamics</SectionLabel>
    <KpiCardRow cards={d.loyalty.tierDynamics} />
    <AlertBox text={d.loyalty.alert} variant="amber" />
  </div>
);

const TransactionsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-5">
    <SectionLabel>Purchase Behaviour</SectionLabel>
    <KpiCardRow cards={d.transactions.purchaseBehaviour} />
    <SectionDivider />
    <SectionLabel>Category Affinity</SectionLabel>
    <HorizontalBars title="Category Purchase %" items={d.transactions.categoryAffinity} />
    <SectionDivider />
    <SectionLabel>Cross-Sell Signals</SectionLabel>
    <KpiCardRow cards={d.transactions.crossSell} />
    <AlertBox text={d.transactions.insight} variant="blue" />
  </div>
);

const ChannelsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-5">
    <SectionLabel>Channel Split</SectionLabel>
    <HorizontalBars title="Purchase Channel %" items={d.channels.channelSplit} />
    <SectionDivider />
    <SectionLabel>Reachability</SectionLabel>
    <KpiCardRow cards={d.channels.reachability} />
    <SectionDivider />
    <SectionLabel>Store Concentration</SectionLabel>
    <HorizontalBars title="Top Stores by Customer %" items={d.channels.storeConcentration} />
    <AlertBox text={d.channels.recommendation} variant="blue" />
  </div>
);

const CampaignsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-5">
    <SectionLabel>Campaign Response History</SectionLabel>
    <KpiCardRow cards={d.campaigns.responseHistory} />
    <SectionDivider />
    <SectionLabel>Best Performing Campaign Type</SectionLabel>
    <HorizontalBars
      title="Redemption Rate by Campaign Type"
      items={d.campaigns.bestCampaignType}
      barColor="hsl(var(--atlas-warning))"
    />
    <SectionDivider />
    <SectionLabel>Communication Health</SectionLabel>
    <KpiCardRow cards={d.campaigns.communicationHealth} />
    <AlertBox text={d.campaigns.recommendation} variant="green" />
  </div>
);

/* ── main component ── */

const SegmentKpiAnalysis = ({ segmentName }: Props) => {
  const [duration, setDuration] = useState<DurationKey>("12m");

  const data = segmentKpiByDuration[duration];

  return (
    <div className="space-y-5">
      {/* top bar */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-base font-semibold text-foreground">{segmentName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data.totalCustomers.toLocaleString()} matched customers
          </p>
        </div>
        <HealthScore score={data.healthScore} label={data.healthLabel} percentile={data.healthPercentile} />
      </div>

      {/* duration pills */}
      <div className="flex gap-2">
        {durations.map((d) => (
          <button
            key={d.key}
            onClick={() => setDuration(d.key)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              duration === d.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><OverviewTab d={data} /></TabsContent>
        <TabsContent value="loyalty"><LoyaltyTab d={data} /></TabsContent>
        <TabsContent value="transactions"><TransactionsTab d={data} /></TabsContent>
        <TabsContent value="channels"><ChannelsTab d={data} /></TabsContent>
        <TabsContent value="campaigns"><CampaignsTab d={data} /></TabsContent>
      </Tabs>
    </div>
  );
};

export default SegmentKpiAnalysis;
