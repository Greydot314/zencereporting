import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Sparkles, MoreHorizontal } from "lucide-react";
import type { DurationKey, KpiCard, BarItem, DurationData } from "@/data/segmentKpiMockData";
import { segmentKpiByDuration } from "@/data/segmentKpiMockData";

interface Props {
  segmentName: string;
}

const durations: { key: DurationKey; label: string }[] = [
  { key: "lifetime", label: "Lifetime" },
  { key: "12m", label: "Last 12M" },
  { key: "6m", label: "Last 6M" },
  { key: "3m", label: "Last 3M" },
];

/* ── tone helpers ── */

const toneClasses = {
  green: "text-[hsl(var(--atlas-success))]",
  amber: "text-[hsl(var(--atlas-warning))]",
  red: "text-[hsl(var(--atlas-error))]",
  neutral: "text-muted-foreground",
} as const;

const accentBorder = {
  primary: "border-l-primary",
  green: "border-l-[hsl(var(--atlas-success))]",
  amber: "border-l-[hsl(var(--atlas-warning))]",
  red: "border-l-[hsl(var(--atlas-error))]",
} as const;

type AccentKey = keyof typeof accentBorder;

/* ── delta sub renderer (detects ↑/↓ or +/-) ── */
const DeltaSub = ({ text, tone }: { text?: string; tone?: KpiCard["subColor"] }) => {
  if (!text) return null;
  const isUp = /^(\+|↑|⇧|↑↑|⬆)/.test(text.trim());
  const isDown = /^(-|↓|⇩|⬇)/.test(text.trim());
  const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : null;
  return (
    <p className={cn("text-[11px] mt-1.5 inline-flex items-center gap-0.5 font-medium", toneClasses[tone ?? "neutral"])}>
      {Icon && <Icon className="h-3 w-3" />}
      <span>{text.replace(/^(\+|↑|⇧|↑↑|⬆|-|↓|⇩|⬇)\s*/, "")}</span>
    </p>
  );
};

/* ── hero card (large) ── */
const HeroCard = ({ card, accent }: { card: KpiCard; accent: AccentKey }) => (
  <div className={cn("bg-muted/40 border border-border p-4 border-l-[3px]", accentBorder[accent])}>
    <p className="text-[11px] text-muted-foreground">{card.label}</p>
    <p className="text-2xl font-semibold text-foreground mt-1 tracking-tight">{card.value}</p>
    <DeltaSub text={card.sub} tone={card.subColor} />
  </div>
);

/* ── mini card ── */
const MiniCard = ({ card }: { card: KpiCard }) => (
  <div className="bg-muted/30 border border-border p-3.5">
    <p className="text-[11px] text-muted-foreground">{card.label}</p>
    <p className="text-base font-semibold text-foreground mt-0.5">{card.value}</p>
    <DeltaSub text={card.sub} tone={card.subColor} />
  </div>
);

/* ── engagement card: mini progress + badge ── */
const toneBg = {
  green: "bg-[hsl(var(--atlas-success))]",
  amber: "bg-[hsl(var(--atlas-warning))]",
  red: "bg-[hsl(var(--atlas-error))]",
  neutral: "bg-primary",
} as const;
const badgeBg = {
  green: "bg-[hsl(var(--atlas-success))]/15 text-[hsl(var(--atlas-success))]",
  amber: "bg-[hsl(var(--atlas-warning))]/15 text-[hsl(var(--atlas-warning))]",
  red: "bg-[hsl(var(--atlas-error))]/15 text-[hsl(var(--atlas-error))]",
  neutral: "bg-primary/10 text-primary",
} as const;

const badgeForCard = (card: KpiCard): { label: string; tone: keyof typeof badgeBg; pct: number } => {
  const v = card.value.toLowerCase();
  const tone: keyof typeof badgeBg = card.subColor ?? "neutral";
  if (card.label.toLowerCase().includes("churn")) {
    const num = parseFloat((card.sub ?? "0").replace(/[^\d.]/g, "")) || 0;
    return { label: v.includes("low") ? "Low" : v.includes("high") ? "High" : "Medium", tone, pct: Math.min(100, num * 3) };
  }
  if (card.label.toLowerCase().includes("recency") || card.label.toLowerCase().includes("latency")) {
    const days = parseFloat(card.value.replace(/[^\d.]/g, "")) || 0;
    const pct = Math.max(10, 100 - days * 1.5);
    return { label: days < 30 ? "Active" : days < 60 ? "Watch" : "Dormant", tone: days < 30 ? "green" : days < 60 ? "amber" : "red", pct };
  }
  if (card.label.toLowerCase().includes("ltv")) {
    const amt = parseFloat(card.value.replace(/[^\d.]/g, "")) || 0;
    return { label: amt > 10000 ? "High value" : amt > 5000 ? "Mid value" : "Low value", tone: amt > 10000 ? "neutral" : "amber", pct: Math.min(100, amt / 200) };
  }
  return { label: card.subColor === "green" ? "Healthy" : card.subColor === "red" ? "Risk" : "Stable", tone, pct: 60 };
};

const EngagementCard = ({ card }: { card: KpiCard }) => {
  const b = badgeForCard(card);
  return (
    <div className="bg-muted/30 border border-border p-3.5 space-y-2">
      <p className="text-[11px] text-muted-foreground">{card.label}</p>
      <p className="text-lg font-semibold text-foreground">{card.value}</p>
      <div className="h-1 w-full bg-muted overflow-hidden">
        <div className={cn("h-full transition-all", toneBg[b.tone])} style={{ width: `${b.pct}%` }} />
      </div>
      <span className={cn("inline-block text-[10px] font-medium px-2 py-0.5", badgeBg[b.tone])}>{b.label}</span>
    </div>
  );
};

/* ── section ── */
const Section = ({
  label,
  cards,
  accent,
  engagement,
}: {
  label: string;
  cards: KpiCard[];
  accent: AccentKey;
  engagement?: boolean;
}) => {
  if (engagement) {
    return (
      <div className="space-y-2.5">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
        <div className="grid grid-cols-3 gap-3">
          {cards.slice(0, 3).map((c, i) => <EngagementCard key={i} card={c} />)}
        </div>
      </div>
    );
  }
  const [a, b, ...rest] = cards;
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {a && <HeroCard card={a} accent={accent} />}
        {b && <HeroCard card={b} accent={accent} />}
      </div>
      {rest.length > 0 && (
        <div className={cn("grid gap-3", rest.length === 1 && "grid-cols-1", rest.length === 2 && "grid-cols-2", rest.length === 3 && "grid-cols-3", rest.length >= 4 && "grid-cols-4")}>
          {rest.map((c, i) => <MiniCard key={i} card={c} />)}
        </div>
      )}
    </div>
  );
};

/* ── horizontal bars (preserved for non-overview tabs) ── */
const HorizontalBars = ({ title, items, barColor }: { title: string; items: BarItem[]; barColor?: string }) => {
  const max = Math.max(...items.map((b) => b.value));
  return (
    <div className="bg-muted/30 border border-border p-4 space-y-3">
      <p className="text-xs font-medium text-foreground">{title}</p>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-28 shrink-0 text-right">{item.label}</span>
          <div className="flex-1 h-5 bg-muted overflow-hidden">
            <div className="h-full" style={{ width: `${(item.value / max) * 100}%`, backgroundColor: barColor || "hsl(var(--primary))" }} />
          </div>
          <span className="text-xs font-medium text-foreground w-12">{item.value}%</span>
        </div>
      ))}
    </div>
  );
};

const AlertBox = ({ text, variant }: { text: string; variant: "amber" | "blue" | "green" }) => {
  const styles = {
    amber: "border-[hsl(var(--atlas-warning))]/30 bg-[hsl(var(--atlas-warning))]/5 text-[hsl(var(--atlas-warning))]",
    blue: "border-primary/30 bg-primary/5 text-primary",
    green: "border-[hsl(var(--atlas-success))]/30 bg-[hsl(var(--atlas-success))]/5 text-[hsl(var(--atlas-success))]",
  };
  return <div className={cn("border p-3 text-xs leading-relaxed", styles[variant])}>{text}</div>;
};

/* ── ring gauge health score ── */
const HealthRing = ({ score, label, percentile }: { score: number; label: string; percentile: number }) => {
  const color = score >= 80 ? "hsl(var(--atlas-success))" : score >= 60 ? "hsl(var(--atlas-warning))" : "hsl(var(--atlas-error))";
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r={r} stroke="hsl(var(--muted))" strokeWidth="5" fill="none" />
          <circle cx="32" cy="32" r={r} stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span className="text-base font-bold" style={{ color }}>{score}</span>
          <span className="text-[8px] text-muted-foreground mt-0.5">/100</span>
        </div>
      </div>
      <div>
        <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: color, color: "white", opacity: 0.9 }}>
          {label}
        </span>
        <p className="text-[10px] text-muted-foreground mt-1">Top {percentile}% of segments</p>
      </div>
    </div>
  );
};

/* ── tabs ── */

const OverviewTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-6 pt-4">
    <Section label="Volume" cards={d.overview.volume} accent="primary" />
    <Section label="Monetary" cards={d.overview.monetary} accent="green" />
    <Section label="Engagement Health" cards={d.overview.engagement} accent="amber" engagement />
    <div className="grid grid-cols-2 gap-3">
      <HorizontalBars title="Gender Split" items={d.overview.genderSplit} />
      <HorizontalBars title="Age Group Split" items={d.overview.ageSplit} />
    </div>
  </div>
);

const LoyaltyTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-6 pt-4">
    <Section label="Points Activity" cards={d.loyalty.pointsActivity} accent="primary" />
    <Section label="Points Risk" cards={d.loyalty.pointsRisk} accent="red" />
    <Section label="Tier Dynamics" cards={d.loyalty.tierDynamics} accent="amber" />
    <AlertBox text={d.loyalty.alert} variant="amber" />
  </div>
);

const TransactionsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-6 pt-4">
    <Section label="Purchase Behaviour" cards={d.transactions.purchaseBehaviour} accent="green" />
    <HorizontalBars title="Category Purchase %" items={d.transactions.categoryAffinity} />
    <Section label="Cross-Sell Signals" cards={d.transactions.crossSell} accent="primary" />
    <AlertBox text={d.transactions.insight} variant="blue" />
  </div>
);

const ChannelsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-6 pt-4">
    <HorizontalBars title="Purchase Channel %" items={d.channels.channelSplit} />
    <Section label="Reachability" cards={d.channels.reachability} accent="primary" />
    <HorizontalBars title="Top Stores by Customer %" items={d.channels.storeConcentration} />
    <AlertBox text={d.channels.recommendation} variant="blue" />
  </div>
);

const CampaignsTab = ({ d }: { d: DurationData }) => (
  <div className="space-y-6 pt-4">
    <Section label="Campaign Response History" cards={d.campaigns.responseHistory} accent="green" />
    <HorizontalBars title="Campaign Response Funnel (%)" items={d.campaigns.bestCampaignType} barColor="hsl(var(--atlas-warning))" />
    <Section label="Communication Health" cards={d.campaigns.communicationHealth} accent="primary" />
    <AlertBox text={d.campaigns.recommendation} variant="green" />
  </div>
);

/* ── main ── */

const SegmentKpiAnalysis = ({ segmentName }: Props) => {
  const [duration, setDuration] = useState<DurationKey>("12m");
  const navigate = useNavigate();
  const data = segmentKpiByDuration[duration];

  const sendPrompt = () => {
    navigate("/ai-chat", {
      state: { prompt: `Help me build a campaign for the "${segmentName}" segment (${data.totalCustomers.toLocaleString()} customers, health ${data.healthScore}/100).` },
    });
  };

  return (
    <div className="space-y-5 pb-24">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-foreground tracking-tight">{segmentName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data.totalCustomers.toLocaleString()} matched customers · Updated 2 min ago
          </p>
        </div>
        <div className="flex items-center gap-3">
          <HealthRing score={data.healthScore} label={data.healthLabel} percentile={data.healthPercentile} />
          <button className="h-8 w-8 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* duration pills */}
      <div className="flex gap-2">
        {durations.map((d) => (
          <button
            key={d.key}
            onClick={() => setDuration(d.key)}
            className={cn(
              "px-3.5 py-1.5 rounded-md text-xs font-medium border transition-colors",
              duration === d.key
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:text-foreground"
            )}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-1">
          {["overview", "loyalty", "transactions", "channels", "campaigns"].map((v) => (
            <TabsTrigger
              key={v}
              value={v}
              className="capitalize text-xs px-3 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            >
              {v}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview"><OverviewTab d={data} /></TabsContent>
        <TabsContent value="loyalty"><LoyaltyTab d={data} /></TabsContent>
        <TabsContent value="transactions"><TransactionsTab d={data} /></TabsContent>
        <TabsContent value="channels"><ChannelsTab d={data} /></TabsContent>
        <TabsContent value="campaigns"><CampaignsTab d={data} /></TabsContent>
      </Tabs>

      {/* footer CTA */}
      <div className="fixed bottom-4 right-6 z-30">
        <Button onClick={sendPrompt} className="gap-2 shadow-lg h-10 px-4">
          <Sparkles className="h-4 w-4" />
          Build campaign for this segment
        </Button>
      </div>
    </div>
  );
};

export default SegmentKpiAnalysis;
