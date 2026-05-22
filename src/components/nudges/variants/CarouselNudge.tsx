import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeContent } from "../nudgeContent";

interface Props {
  content: NudgeContent;
  onDismiss: () => void;
  onCta: (prompt: string) => void;
}

export const CarouselNudge = ({ content, onDismiss, onCta }: Props) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % content.capabilities.length), 2800);
    return () => clearInterval(t);
  }, [content.capabilities.length]);
  const cap = content.capabilities[idx];

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto max-w-[1100px] rounded-[20px] border border-indigo-100 bg-white/95 backdrop-blur shadow-[0_-8px_32px_-8px_rgba(79,70,229,0.25)] animate-fade-in overflow-hidden"
        style={{ animationDuration: "500ms" }}
      >
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-indigo-500" />
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-foreground leading-tight">Oliver can</p>
              <p className="text-muted-foreground leading-tight">also help with…</p>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-2 overflow-hidden">
            {content.capabilities.map((c, i) => (
              <button
                key={c.label}
                onClick={() => onCta(c.prompt)}
                className={`shrink-0 h-9 px-3 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  i === idx
                    ? "bg-gradient-to-r from-indigo-50 to-emerald-50 border-indigo-300 text-indigo-700 scale-105 shadow-sm"
                    : "bg-white border-border text-muted-foreground hover:border-indigo-200"
                }`}
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          <Button
            onClick={() => onCta(cap.prompt)}
            className="shrink-0 h-9 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white hover:opacity-90 gap-1.5 px-4 text-xs font-semibold"
          >
            Try it
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 h-8 w-8 rounded-full hover:bg-black/5 flex items-center justify-center text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
