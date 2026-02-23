interface FunnelStage {
  stage: string;
  value: number;
  pct: number;
}

interface FunnelWidgetProps {
  title: string;
  data: FunnelStage[];
  colorVar: string;
}

export const FunnelWidget = ({ title, data, colorVar }: FunnelWidgetProps) => {
  const maxValue = data[0]?.value || 1;

  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-2">
        {data.map((stage, i) => {
          const widthPct = Math.max((stage.value / maxValue) * 100, 12);
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{stage.stage}</span>
                <span className="text-muted-foreground">
                  {stage.value >= 1000000
                    ? `${(stage.value / 1000000).toFixed(1)}M`
                    : stage.value >= 1000
                    ? `${(stage.value / 1000).toFixed(0)}K`
                    : stage.value.toLocaleString()}
                </span>
              </div>
              <div className="h-7 rounded-md bg-muted/50 overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-2 text-[10px] font-medium text-primary-foreground transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: `hsl(var(--${colorVar}) / ${1 - i * 0.15})`,
                  }}
                >
                  {stage.pct}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
