import { Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeContent } from "../nudgeContent";

interface Props {
  content: NudgeContent;
  onDismiss: () => void;
  onCta: (prompt: string) => void;
}

export const SpotlightNudge = ({ content, onDismiss, onCta }: Props) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 pointer-events-none">
      <div
        className="pointer-events-auto w-full max-w-[520px] rounded-[24px] border border-white/40 bg-gradient-to-br from-[#F4F0FF] via-white to-[#FFE9F3] p-4 pr-3 shadow-[0_-8px_40px_-8px_rgba(91,63,191,0.35)] animate-fade-in"
        style={{ animationDuration: "500ms" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#5B3FBF] to-[#E94FA1] flex items-center justify-center shadow-lg shadow-purple-300/40">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white animate-pulse" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1F1147] leading-snug">{content.headline}</p>
            <p className="text-xs text-[#5B3FBF]/80 mt-0.5 line-clamp-1">{content.sub}</p>
          </div>
          <Button
            onClick={() => onCta(content.prompt)}
            className="shrink-0 h-10 rounded-full bg-gradient-to-r from-[#5B3FBF] to-[#E94FA1] text-white hover:opacity-90 gap-1.5 px-4 text-xs font-semibold"
          >
            {content.cta}
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
