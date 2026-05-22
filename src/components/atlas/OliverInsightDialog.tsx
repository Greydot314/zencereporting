import { Sparkles, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { getInsight } from "./oliverInsightData";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  kpi: string;
}

// Variant 1 — original purple gradient modal
export const OliverInsightDialog = ({ open, onOpenChange, kpi }: Props) => {
  const navigate = useNavigate();
  const data = getInsight(kpi);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-border">
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
          <button onClick={() => onOpenChange(false)} className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
            CLOSE <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-6 py-5 space-y-5">
          <p className="text-sm text-foreground leading-relaxed">{data.headline}</p>
          <ul className="space-y-2">
            {data.bullets.map((b, i) => (
              <li key={i} className="text-sm text-foreground/80 leading-relaxed flex gap-2">
                <span className="text-[#5B3FBF] mt-1">•</span><span>{b}</span>
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

        <div className="border-t bg-gradient-to-r from-[#F4F0FF] via-white to-[#F4F0FF] px-6 py-4">
          <Button
            onClick={() => { onOpenChange(false); navigate("/ai-chat"); }}
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
