import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nudgeContent, NudgePage } from "./nudgeContent";
import { SpotlightNudge } from "./variants/SpotlightNudge";
import { CarouselNudge } from "./variants/CarouselNudge";
import { ChatTeaserNudge } from "./variants/ChatTeaserNudge";
import { ConfettiNudge } from "./variants/ConfettiNudge";

interface Props {
  page: NudgePage;
}

const variantLabels = ["Spotlight", "Carousel", "Chat", "Confetti"];

export const OliverNudgeProvider = ({ page }: Props) => {
  const [variant, setVariant] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const content = nudgeContent[page];

  useEffect(() => {
    setDismissed(false);
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [variant, page]);

  const onCta = (prompt: string) => {
    setVisible(false);
    navigate("/ai-chat", { state: { prompt } });
  };

  const onDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

  return (
    <>
      {visible && !dismissed && (
        <>
          {variant === 0 && <SpotlightNudge content={content} onDismiss={onDismiss} onCta={onCta} />}
          {variant === 1 && <CarouselNudge content={content} onDismiss={onDismiss} onCta={onCta} />}
          {variant === 2 && <ChatTeaserNudge content={content} onDismiss={onDismiss} onCta={onCta} />}
          {variant === 3 && <ConfettiNudge content={content} onDismiss={onDismiss} onCta={onCta} />}
        </>
      )}

      {/* Variant switcher (dev preview) */}
      <div className="fixed bottom-4 left-4 z-[60] rounded-full border border-border bg-card/95 backdrop-blur shadow-lg p-1 flex items-center gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2">Nudge</span>
        {variantLabels.map((label, i) => (
          <button
            key={label}
            onClick={() => setVariant(i)}
            className={`h-7 px-2.5 rounded-full text-[11px] font-medium transition-all ${
              variant === i
                ? "bg-gradient-to-r from-[#5B3FBF] to-[#8B6FE8] text-white shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};
