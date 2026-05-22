import { Sparkles, ArrowRight, X, TrendingUp, AlertTriangle, Lightbulb, BarChart3 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { getInsight } from "./oliverInsightData";
import { ResponsiveContainer, LineChart, Line, XAxis } from "recharts";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

// Variant 4 — Compact insight-card stack with rose/coral accent, ghost CTA
export const OliverCardStackDialog = ({ open, onOpenChange, kpi }: Props) => {
  const navigate = useNavigate();
  const data = getInsight(kpi);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden bg-[#FFFBFB] border border-[#FECDD3]">
        {/* Compact header */}
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-[#E11D48] to-[#F43F5E]">
          <div className="flex items-center gap-2 text-white">
            <div className="h-7 w-7 rounded bg-white/20 backdrop-blur flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="text-sm font-semibold">Oliver · {kpi}</div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-white/80 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Card stack */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {/* Headline card */}
          <div className="rounded-lg bg-white border border-[#FECDD3] p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#E11D48] font-bold mb-2">
              <BarChart3 className="h-3 w-3" /> Snapshot
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">{data.headline}</p>
            <div className="mt-3 h-12 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend}>
                  <Line type="monotone" dataKey="v" stroke="#E11D48" strokeWidth={2} dot={false} />
                  <XAxis dataKey="m" hide />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Anomaly card */}
          {data.anomaly && (
            <div className="rounded-lg bg-white border border-[#FECDD3] p-4 shadow-sm flex gap-3">
              <div className="h-8 w-8 rounded-md bg-[#FEE2E2] flex items-center justify-center shrink-0">
                <AlertTriangle className="h-4 w-4 text-[#E11D48]" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#E11D48] font-bold mb-1">Anomaly</div>
                <p className="text-sm text-foreground/80">{data.anomaly}</p>
              </div>
            </div>
          )}

          {/* Key findings card */}
          <div className="rounded-lg bg-white border border-[#FECDD3] p-4 shadow-sm">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#E11D48] font-bold mb-2">
              <TrendingUp className="h-3 w-3" /> Key findings
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.bullets.slice(0, 4).map((b, i) => (
                <div key={i} className="rounded-md bg-[#FEF2F2] p-2.5 text-xs text-foreground/80 leading-snug">
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation card */}
          {data.recommendation && (
            <div className="rounded-lg bg-gradient-to-br from-[#E11D48] to-[#F43F5E] text-white p-4 shadow-sm flex gap-3">
              <div className="h-8 w-8 rounded-md bg-white/15 flex items-center justify-center shrink-0">
                <Lightbulb className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wider opacity-80 font-bold mb-1">Next best action</div>
                <p className="text-sm">{data.recommendation}</p>
              </div>
            </div>
          )}

          {data.confidence && (
            <div className="flex items-center gap-2 px-1">
              <div className="flex-1 h-1 rounded-full bg-[#FECDD3] overflow-hidden">
                <div className="h-full bg-[#E11D48]" style={{ width: `${data.confidence}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground font-medium">{data.confidence}% confidence</span>
            </div>
          )}
        </div>

        {/* Ghost CTA */}
        <div className="px-4 pb-4 pt-1">
          <button
            onClick={() => { onOpenChange(false); navigate("/ai-chat"); }}
            className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-md bg-transparent text-[#E11D48] hover:bg-[#FEF2F2] text-xs font-semibold border border-transparent hover:border-[#FECDD3]"
          >
            Ask Oliver for more
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
