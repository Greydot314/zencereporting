import { Sparkles, ArrowRight, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { getInsight } from "./oliverInsightData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

// Variant 3 — Right-side editorial briefing drawer with amber accent
export const OliverBriefingSheet = ({ open, onOpenChange, kpi }: Props) => {
  const navigate = useNavigate();
  const data = getInsight(kpi);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[460px] p-0 bg-white border-l border-border overflow-hidden flex flex-col">
        {/* Editorial header */}
        <div className="px-7 pt-7 pb-5 border-b border-[#F59E0B]/20 bg-gradient-to-br from-[#FFFBEB] to-white">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#B45309] font-semibold">
            <Sparkles className="h-3 w-3" />
            Oliver Briefing
          </div>
          <h2 className="mt-3 text-2xl font-serif font-bold text-[#1F2937] leading-tight">
            {kpi}
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">Issue · May 22 2026 · 1 min read</p>
        </div>

        {/* Editorial body */}
        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          {/* Drop cap paragraph */}
          <p className="text-[15px] text-foreground/85 leading-[1.7] first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#B45309] first-letter:float-left first-letter:mr-2 first-letter:leading-none">
            {data.headline}
          </p>

          {/* Stat callouts */}
          <div className="grid grid-cols-3 gap-3">
            {data.regions.slice(0, 3).map((r) => (
              <div key={r.name} className="border-l-2 border-[#F59E0B] pl-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.name}</div>
                <div className="text-lg font-bold text-foreground">{r.v}<span className="text-xs font-normal text-muted-foreground">Cr</span></div>
              </div>
            ))}
          </div>

          {data.anomaly && (
            <div className="rounded-md bg-[#FEF3C7]/60 border border-[#F59E0B]/30 p-4 flex gap-3">
              <AlertTriangle className="h-4 w-4 text-[#B45309] mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#92400E] mb-1">Anomaly</div>
                <p className="text-sm text-foreground/80">{data.anomaly}</p>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              <TrendingUp className="h-3 w-3" />
              What Oliver noticed
            </div>
            <ol className="space-y-3">
              {data.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
                  <span className="font-serif text-[#B45309] font-bold w-5 shrink-0">{i + 1}.</span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>
          </div>

          {data.recommendation && (
            <div className="rounded-md bg-[#1F2937] text-white p-4 flex gap-3">
              <Lightbulb className="h-4 w-4 text-[#FBBF24] mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#FBBF24] mb-1">Oliver suggests</div>
                <p className="text-sm">{data.recommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Editorial outlined CTA */}
        <div className="px-7 py-4 border-t border-border bg-white">
          <button
            onClick={() => { onOpenChange(false); navigate("/ai-chat"); }}
            className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-md border-2 border-[#1F2937] bg-white hover:bg-[#1F2937] hover:text-white text-[#1F2937] text-sm font-semibold uppercase tracking-wider transition-colors"
          >
            Open in Oliver Workspace
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
