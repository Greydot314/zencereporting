import { TrendingUp, TrendingDown } from "lucide-react";

interface KPIItem {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface KPIWidgetProps {
  title: string;
  data: KPIItem[];
  colorVar: string;
}

export const KPIWidget = ({ title, data, colorVar }: KPIWidgetProps) => {
  return (
    <div>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{title}</h4>
      <div className="grid grid-cols-2 gap-3">
        {data.map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-card border border-border">
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
            <p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {item.trend === "up" ? (
                <TrendingUp className="h-3 w-3" style={{ color: `hsl(var(--atlas-success))` }} />
              ) : (
                <TrendingDown className="h-3 w-3" style={{ color: `hsl(var(--atlas-error))` }} />
              )}
              <span
                className="text-[10px] font-medium"
                style={{ color: item.trend === "up" ? `hsl(var(--atlas-success))` : `hsl(var(--atlas-error))` }}
              >
                {item.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
