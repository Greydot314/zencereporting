import { Sparkles, ArrowUpRight, X, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { getInsight } from "./oliverInsightData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

// Variant 2 — Conversational chat layout, teal accent, pill CTA
export const OliverChatDialog = ({ open, onOpenChange, kpi }: Props) => {
  const navigate = useNavigate();
  const data = getInsight(kpi);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-[#0F1419] border-0 text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#06B6D4] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0F1419]" />
            </div>
            <div>
              <div className="text-sm font-semibold">Oliver</div>
              <div className="text-[10px] text-emerald-400">● analyzing {kpi}</div>
            </div>
          </div>
          <button onClick={() => onOpenChange(false)} className="text-white/50 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat body */}
        <div className="max-h-[55vh] overflow-y-auto px-5 py-5 space-y-4 bg-[#0F1419]">
          {/* User bubble */}
          <div className="flex justify-end">
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="rounded-2xl rounded-tr-sm bg-[#1E293B] px-3.5 py-2 text-sm text-white/90">
                What's happening with {kpi}?
              </div>
              <div className="h-7 w-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <User className="h-3.5 w-3.5 text-white/70" />
              </div>
            </div>
          </div>

          {/* Oliver reply */}
          <div className="flex gap-2 max-w-[88%]">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#06B6D4] flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="space-y-2">
              <div className="rounded-2xl rounded-tl-sm bg-[#134E4A]/40 border border-[#14B8A6]/30 px-4 py-3 text-sm leading-relaxed">
                {data.headline}
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-[#134E4A]/40 border border-[#14B8A6]/30 px-4 py-3 text-sm space-y-1.5">
                {data.bullets.slice(0, 3).map((b, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-[#14B8A6]">→</span>
                    <span className="text-white/85">{b}</span>
                  </div>
                ))}
              </div>
              {data.recommendation && (
                <div className="rounded-2xl rounded-tl-sm bg-gradient-to-br from-[#14B8A6]/20 to-[#06B6D4]/10 border border-[#14B8A6]/40 px-4 py-3 text-sm">
                  <div className="text-[10px] uppercase tracking-wider text-[#5EEAD4] font-semibold mb-1">Recommendation</div>
                  {data.recommendation}
                </div>
              )}
            </div>
          </div>

          {/* Suggested chips */}
          <div className="flex flex-wrap gap-2 pt-1 pl-9">
            {["Why the dip?", "Show by region", "Compare last year"].map((s) => (
              <button key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-white/10 hover:text-white">
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Footer pill CTA */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-white/50">Confidence: {data.confidence}%</div>
          <button
            onClick={() => { onOpenChange(false); navigate("/ai-chat"); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#14B8A6] hover:bg-[#0D9488] text-white text-xs font-semibold"
          >
            Continue this chat
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
