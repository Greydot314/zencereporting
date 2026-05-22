import { Sparkles, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface OliverInsightDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

const insightByKpi: Record<string, { headline: string; bullets: string[]; trend: { m: string; v: number }[]; regions: { name: string; v: number }[] }> = {
  "Total Sales": {
    headline:
      "Total Sales surged from 3.0 Cr in 202502 to 119.6 Cr in 202503 — a 3,886.7% jump indicating strong initial market penetration. It peaked at 174.7 Cr in 202506 then sharply declined to 98.8 Cr in 202508, highlighting significant midyear volatility.",
    bullets: [
      "Pattern: recurring strong growth followed by significant dips — campaign-driven peaks + seasonal lulls.",
      "North leads at 151.0 Cr (40.7%) of total; East underperforms at 29.8 Cr (8.0%).",
      "A 2.8 Cr (0.8%) value is unassigned to any Region — investigate data quality.",
      "Suggestion: replicate successful campaign strategies from 202506 & 202510 during weaker months.",
    ],
    trend: [
      { m: "202502", v: 3 },
      { m: "202503", v: 119 },
      { m: "202504", v: 142 },
      { m: "202505", v: 156 },
      { m: "202506", v: 174 },
      { m: "202507", v: 132 },
      { m: "202508", v: 98 },
      { m: "202509", v: 109 },
      { m: "202510", v: 156 },
    ],
    regions: [
      { name: "North", v: 151 },
      { name: "South", v: 100 },
      { name: "West", v: 86 },
      { name: "East", v: 29 },
    ],
  },
  "Total Customers": {
    headline:
      "Total Customers reached 75.43 Lac with 24.72 Lac transacting and 1.14 Lac redeeming rewards. Engagement-to-base ratio sits at 32.8% — healthy but with clear redemption friction.",
    bullets: [
      "Transacted base grew steadily across the last 6 weeks.",
      "Redemption is concentrated in Gold-tier customers.",
      "Suggestion: nudge Silver tier with low-friction reward unlocks to lift redemption.",
    ],
    trend: [
      { m: "W1", v: 60 },
      { m: "W2", v: 64 },
      { m: "W3", v: 68 },
      { m: "W4", v: 70 },
      { m: "W5", v: 73 },
      { m: "W6", v: 75 },
    ],
    regions: [
      { name: "North", v: 30 },
      { name: "South", v: 20 },
      { name: "West", v: 17 },
      { name: "East", v: 8 },
    ],
  },
};

const fallback = {
  headline:
    "Oliver analyzed this KPI across the selected period. The metric is trending within expected bands with minor weekly variance.",
  bullets: [
    "No critical anomalies detected in the last 6 weeks.",
    "Top contributing region: North.",
    "Suggestion: monitor next 2 weeks for any deviation beyond the control band.",
  ],
  trend: [
    { m: "W1", v: 40 },
    { m: "W2", v: 55 },
    { m: "W3", v: 50 },
    { m: "W4", v: 70 },
    { m: "W5", v: 65 },
    { m: "W6", v: 80 },
  ],
  regions: [
    { name: "North", v: 40 },
    { name: "South", v: 27 },
    { name: "West", v: 23 },
    { name: "East", v: 10 },
  ],
};

export const OliverInsightDialog = ({ open, onOpenChange, kpi }: OliverInsightDialogProps) => {
  const navigate = useNavigate();
  const data = insightByKpi[kpi] ?? fallback;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-[#F4F0FF] to-white">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5B3FBF] to-[#8B6FE8] flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{kpi}</h3>
              <p className="text-[11px] text-muted-foreground">Oliver AI insight</p>
            </div>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            CLOSE <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-5">
          <p className="text-sm text-foreground leading-relaxed">{data.headline}</p>

          <ul className="space-y-2">
            {data.bullets.map((b, i) => (
              <li key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                <span className="text-[#5B3FBF] mt-1">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold mb-3">Trend (last periods)</p>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={data.trend}>
                  <defs>
                    <linearGradient id="oliverArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B3FBF" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#5B3FBF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Area type="monotone" dataKey="v" stroke="#5B3FBF" fill="url(#oliverArea)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold mb-3">Region breakdown</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={data.regions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Bar dataKey="v" fill="#8B6FE8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t bg-gradient-to-r from-[#F4F0FF] via-white to-[#F4F0FF] px-6 py-4">
          <Button
            onClick={() => {
              onOpenChange(false);
              navigate("/ai-chat");
            }}
            className="w-full bg-gradient-to-r from-[#5B3FBF] to-[#8B6FE8] text-white hover:opacity-90 gap-2 h-11"
          >
            <Sparkles className="h-4 w-4" />
            Dive Deeper into this Insight with Oliver AI
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
