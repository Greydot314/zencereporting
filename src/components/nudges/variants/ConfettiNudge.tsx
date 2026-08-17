import { X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NudgeContent } from "../nudgeContent";

interface Props {
  content: NudgeContent;
  onDismiss: () => void;
  onCta: (prompt: string) => void;
}

const confetti = [
  { c: "rgba(255,255,255,0.85)", l: "4%", t: "22%", s: 5, d: 0 },
  { c: "rgba(251,207,232,0.9)", l: "12%", t: "68%", s: 4, d: 0.4 },
  { c: "rgba(167,243,208,0.85)", l: "20%", t: "28%", s: 6, d: 0.8 },
  { c: "rgba(253,224,71,0.85)", l: "28%", t: "72%", s: 4, d: 1.2 },
  { c: "rgba(255,255,255,0.7)", l: "36%", t: "35%", s: 5, d: 1.6 },
  { c: "rgba(196,181,253,0.9)", l: "64%", t: "25%", s: 4, d: 0.2 },
  { c: "rgba(255,255,255,0.8)", l: "72%", t: "70%", s: 6, d: 0.6 },
  { c: "rgba(167,243,208,0.85)", l: "80%", t: "30%", s: 5, d: 1.0 },
  { c: "rgba(251,207,232,0.9)", l: "88%", t: "68%", s: 4, d: 1.4 },
  { c: "rgba(255,255,255,0.75)", l: "96%", t: "32%", s: 5, d: 1.8 },
];

export const ConfettiNudge = ({ content, onDismiss, onCta }: Props) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div
        className="pointer-events-auto relative w-full rounded-t-[28px] border-t border-white/30 bg-gradient-to-r from-[#5B3FBF] via-[#7C5CE0] to-[#8B6FE8] shadow-[0_-12px_40px_-8px_rgba(91,63,191,0.45)] overflow-hidden animate-fade-in"
        style={{ animationDuration: "500ms" }}
      >
        {/* Subtle diagonal shimmer overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 45%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />

        {/* Floating confetti dots */}
        {confetti.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: d.l,
              top: d.t,
              width: d.s,
              height: d.s,
              background: d.c,
              boxShadow: `0 0 ${d.s + 2}px ${d.c}`,
              animation: `float ${2.5 + (i % 3) * 0.4}s ease-in-out infinite`,
              animationDelay: `${d.d}s`,
            }}
          />
        ))}

        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 px-5 md:px-8 py-4 max-w-[1280px] mx-auto">
          {/* Oliver avatar */}
          <div className="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg shrink-0 animate-float">
            <Sparkles className="h-5 w-5 text-white" />
          </div>

          {/* Text block */}
          <div className="flex-1 min-w-0">
            <p className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight">
              {content.headline}
            </p>
            <p className="text-sm text-white/80 mt-1 font-medium leading-snug">
              {content.sub}
            </p>
          </div>

          {/* Capability buttons */}
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 shrink-0">
            {content.capabilities.map((c) => (
              <button
                key={c.label}
                onClick={() => onCta(c.prompt)}
                className="group h-9 px-3.5 rounded-full text-xs font-semibold bg-white/10 border border-white/30 text-white hover:bg-white hover:text-[#5B3FBF] hover:border-white transition-all duration-200 flex items-center gap-1.5 shadow-sm"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {c.emoji}
                </span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>

          {/* Primary CTA */}
          <Button
            onClick={() => onCta(content.prompt)}
            className="shrink-0 h-10 rounded-full bg-white text-[#5B3FBF] hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.35)] gap-1.5 px-5 text-xs font-bold shadow-lg transition-all duration-200"
          >
            {content.cta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>

          {/* Dismiss */}
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 h-8 w-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
