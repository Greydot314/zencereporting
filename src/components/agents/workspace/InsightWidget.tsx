import { Lightbulb } from "lucide-react";

interface InsightWidgetProps {
  title: string;
  data: {
    text: string;
    confidence: string;
  };
  colorVar: string;
}

export const InsightWidget = ({ title, data, colorVar }: InsightWidgetProps) => {
  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        backgroundColor: `hsl(var(--${colorVar}) / 0.04)`,
        borderColor: `hsl(var(--${colorVar}) / 0.15)`,
      }}
    >
      <div className="flex items-start gap-2.5">
        <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" style={{ color: `hsl(var(--${colorVar}))` }} />
        <div>
          <h4 className="text-xs font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{data.text}</p>
          <span
            className="inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `hsl(var(--${colorVar}) / 0.1)`,
              color: `hsl(var(--${colorVar}))`,
            }}
          >
            {data.confidence} confidence
          </span>
        </div>
      </div>
    </div>
  );
};
