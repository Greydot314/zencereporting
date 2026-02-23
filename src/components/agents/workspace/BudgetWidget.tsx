interface BudgetItem {
  channel: string;
  current: number;
  recommended: number;
}

interface BudgetWidgetProps {
  title: string;
  data: BudgetItem[];
  colorVar: string;
}

export const BudgetWidget = ({ title, data, colorVar }: BudgetWidgetProps) => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="space-y-3">
        {data.map((item, i) => {
          const diff = item.recommended - item.current;
          return (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{item.channel}</span>
                <span className="text-muted-foreground">
                  {item.current}% → <span className="font-medium text-foreground">{item.recommended}%</span>
                  <span
                    className="ml-1 font-medium"
                    style={{ color: diff > 0 ? "hsl(var(--atlas-success))" : diff < 0 ? "hsl(var(--atlas-error))" : "hsl(var(--muted-foreground))" }}
                  >
                    ({diff > 0 ? "+" : ""}{diff}%)
                  </span>
                </span>
              </div>
              <div className="flex gap-1 h-2">
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: `${item.current}%`,
                    backgroundColor: `hsl(var(--${colorVar}) / 0.3)`,
                  }}
                />
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: `${item.recommended}%`,
                    backgroundColor: `hsl(var(--${colorVar}))`,
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className="flex items-center gap-4 pt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.3)` }} /> Current</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full" style={{ backgroundColor: `hsl(var(--${colorVar}))` }} /> Recommended</span>
        </div>
      </div>
    </div>
  );
};
