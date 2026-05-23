import { Sparkles, ArrowRight, X, TrendingUp, TrendingDown, AlertTriangle, Lightbulb, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid,
  Tooltip, ReferenceLine, LabelList, Cell,
} from "recharts";
import { getInsight } from "./oliverInsightData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

// Variant 1 — enriched insight modal with hero stats, annotated charts & recommendation
export const OliverInsightDialog = ({ open, onOpenChange, kpi }: Props) => {
  const navigate = useNavigate();
  const data = getInsight(kpi);

  // Derived stats
  const values = data.trend.map((d) => d.v);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const latest = values[values.length - 1] ?? 0;
  const prev = values[values.length - 2] ?? latest;
  const delta = prev === 0 ? 0 : ((latest - prev) / prev) * 100;
  const isUp = delta >= 0;
  const peak = data.trend.reduce((a, b) => (b.v > a.v ? b : a), data.trend[0]);
  const trough = data.trend.reduce((a, b) => (b.v < a.v ? b : a), data.trend[0]);

  const regionTotal = data.regions.reduce((s, r) => s + r.v, 0) || 1;
  const sortedRegions = [...data.regions]
    .sort((a, b) => b.v - a.v)
    .map((r) => ({ ...r, pct: Math.round((r.v / regionTotal) * 100) }));
  const regionColors = ["#5B3FBF", "#8B6FE8", "#B8A4F0", "#D9CDF7"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-[#F4F0FF] to-white">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#5B3FBF] to-[#8B6FE8] flex items-center justify-center shadow-sm">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{kpi}</h3>
              <p className="text-[11px] text-muted-foreground">Oliver AI insight · auto-generated</p>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
            CLOSE <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto">
          {/* Hero stat strip */}
          <div className="px-6 pt-5 pb-4 grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-border/60">
            <div className="rounded-lg bg-gradient-to-br from-[#F4F0FF] to-white border border-[#E5E0F5] p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Latest</div>
              <div className="text-xl font-bold text-foreground mt-0.5">{latest.toLocaleString()}</div>
              <div className={`text-[11px] mt-0.5 inline-flex items-center gap-1 font-medium ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
                {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(delta).toFixed(1)}% vs prev
              </div>
            </div>
            <div className="rounded-lg bg-white border border-border p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">Period Avg</div>
              <div className="text-xl font-bold text-foreground mt-0.5">{avg.toFixed(0)}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">across {data.trend.length} periods</div>
            </div>
            <div className="rounded-lg bg-white border border-border p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-emerald-600" /> Confidence
              </div>
              <div className="text-xl font-bold text-foreground mt-0.5">{data.confidence ?? 80}%</div>
              <div className="h-1.5 bg-muted rounded-full mt-1.5 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.confidence ?? 80}%` }} />
              </div>
            </div>
            <div className="rounded-lg bg-white border border-border p-3">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-amber-500" /> Anomaly
              </div>
              <div className="text-xs font-semibold text-foreground mt-1 leading-snug line-clamp-2">
                {data.anomaly ?? "No anomalies detected"}
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="px-6 py-4 space-y-3">
            <p className="text-sm text-foreground leading-relaxed">{data.headline}</p>
            <ul className="space-y-1.5">
              {data.bullets.map((b, i) => (
                <li key={i} className="text-[13px] text-foreground/80 leading-relaxed flex gap-2">
                  <span className="text-[#5B3FBF] mt-1 shrink-0">▸</span><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Charts */}
          <div className="px-6 pb-4 grid md:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold">Trend</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" />Peak {peak.v}</span>
                  <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500" />Low {trough.v}</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={data.trend} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="oliverArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B3FBF" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#5B3FBF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" vertical={false} />
                  <XAxis dataKey="m" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E0F5" }}
                    formatter={(v: number) => [v.toLocaleString(), kpi]}
                  />
                  <ReferenceLine y={avg} stroke="#8B6FE8" strokeDasharray="4 4" strokeOpacity={0.6}
                    label={{ value: `avg ${avg.toFixed(0)}`, fill: "#5B3FBF", fontSize: 10, position: "insideTopRight" }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#5B3FBF" fill="url(#oliverArea)" strokeWidth={2.5}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      if (payload.m === peak.m) return <circle key={payload.m} cx={cx} cy={cy} r={5} fill="#10b981" stroke="#fff" strokeWidth={2} />;
                      if (payload.m === trough.m) return <circle key={payload.m} cx={cx} cy={cy} r={5} fill="#f43f5e" stroke="#fff" strokeWidth={2} />;
                      return <circle key={payload.m} cx={cx} cy={cy} r={0} />;
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border border-border p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold">Region breakdown</p>
                <span className="text-[10px] text-muted-foreground">% share of total</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={sortedRegions} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F4" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #E5E0F5" }}
                    formatter={(v: number, _n, p: any) => [`${v.toLocaleString()} (${p.payload.pct}%)`, "Value"]}
                  />
                  <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                    {sortedRegions.map((_, i) => (
                      <Cell key={i} fill={regionColors[i] ?? "#D9CDF7"} />
                    ))}
                    <LabelList dataKey="pct" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: 10, fill: "#5B3FBF", fontWeight: 600 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendation callout */}
          {data.recommendation && (
            <div className="mx-6 mb-5 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5 flex gap-3">
              <div className="h-8 w-8 rounded-md bg-emerald-500/15 flex items-center justify-center shrink-0">
                <Lightbulb className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">Oliver's recommendation</div>
                <p className="text-sm text-foreground mt-0.5 leading-snug">{data.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="border-t bg-gradient-to-r from-[#F4F0FF] via-white to-[#F4F0FF] px-6 py-4">
          <Button
            onClick={() => { onOpenChange(false); navigate("/ai-chat", { state: { prompt: `Dive deeper into ${kpi}: ${data.headline}` } }); }}
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
