import { useEffect, useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeContent } from "../nudgeContent";

interface Props {
  content: NudgeContent;
  onDismiss: () => void;
  onCta: (prompt: string) => void;
}

export const ChatTeaserNudge = ({ content, onDismiss, onCta }: Props) => {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(content.teaser.slice(0, i));
      if (i >= content.teaser.length) {
        clearInterval(t);
        setDone(true);
      }
    }, 22);
    return () => clearInterval(t);
  }, [content.teaser]);

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div
        className="pointer-events-auto w-[360px] rounded-[22px] border border-orange-100 bg-gradient-to-br from-[#FFF7ED] via-white to-[#F5F0FF] shadow-[0_-8px_32px_-8px_rgba(234,88,12,0.25)] p-4 animate-fade-in"
        style={{ animationDuration: "500ms" }}
      >
        <div className="flex items-start gap-3">
          <div className="relative shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#8B5CF6] flex items-center justify-center shadow-md">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#9A3412] mb-1">Oliver AI</p>
            <div className="rounded-2xl rounded-tl-sm bg-white border border-orange-100 px-3 py-2 text-sm text-foreground leading-snug min-h-[44px]">
              {typed}
              {!done && <span className="inline-block w-1 h-3.5 bg-orange-400 ml-0.5 animate-pulse align-middle" />}
            </div>
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 h-7 w-7 rounded-full hover:bg-black/5 flex items-center justify-center text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex gap-2 pl-[52px]">
          <Button
            onClick={() => onCta(content.prompt)}
            className="h-9 rounded-full bg-gradient-to-r from-[#F97316] to-[#8B5CF6] text-white hover:opacity-90 gap-1.5 px-3.5 text-xs font-semibold"
          >
            Yes, show me
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <button
            onClick={onDismiss}
            className="h-9 px-3 rounded-full text-xs font-medium text-muted-foreground hover:bg-black/5"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
