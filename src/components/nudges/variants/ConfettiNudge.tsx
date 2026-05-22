import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeContent } from "../nudgeContent";

interface Props {
  content: NudgeContent;
  onDismiss: () => void;
  onCta: (prompt: string) => void;
}

const confetti = [
  { c: "#F472B6", l: "6%", t: "20%", s: 6 },
  { c: "#60A5FA", l: "14%", t: "65%", s: 5 },
  { c: "#34D399", l: "22%", t: "30%", s: 4 },
  { c: "#FBBF24", l: "30%", t: "70%", s: 7 },
  { c: "#A78BFA", l: "70%", t: "25%", s: 5 },
  { c: "#F472B6", l: "78%", t: "65%", s: 6 },
  { c: "#34D399", l: "86%", t: "30%", s: 4 },
  { c: "#FBBF24", l: "94%", t: "70%", s: 5 },
];

export const ConfettiNudge = ({ content, onDismiss, onCta }: Props) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div
        className="pointer-events-auto relative w-full rounded-t-[28px] border-t border-x border-white/40 bg-gradient-to-r from-[#FDE7F3] via-[#EDE7FF] to-[#E0F2FE] shadow-[0_-12px_40px_-8px_rgba(139,92,246,0.3)] overflow-hidden animate-fade-in"
        style={{ animationDuration: "500ms" }}
      >
        {confetti.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-70"
            style={{
              left: d.l,
              top: d.t,
              width: d.s,
              height: d.s,
              background: d.c,
            }}
          />
        ))}

        <div className="relative flex items-center gap-4 px-6 py-4 max-w-[1200px] mx-auto">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-lg shrink-0">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-[#1F1147] leading-tight">{content.headline}</p>
            <p className="text-xs text-[#5B3FBF]/80 mt-0.5">{content.sub}</p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            {content.capabilities.map((c) => (
              <button
                key={c.label}
                onClick={() => onCta(c.prompt)}
                className="h-9 px-3 rounded-full text-xs font-medium bg-white/80 border border-white text-[#5B3FBF] hover:bg-white hover:shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => onCta(content.prompt)}
            className="shrink-0 h-10 rounded-full bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] text-white hover:opacity-90 gap-1.5 px-5 text-xs font-semibold shadow-lg"
          >
            Open Oliver
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>

          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 h-8 w-8 rounded-full hover:bg-white/60 flex items-center justify-center text-[#5B3FBF]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
