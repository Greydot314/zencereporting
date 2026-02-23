import { Check, Circle } from "lucide-react";

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface ChecklistWidgetProps {
  title: string;
  data: ChecklistItem[];
  colorVar: string;
}

export const ChecklistWidget = ({ title, data, colorVar }: ChecklistWidgetProps) => {
  const doneCount = data.filter((i) => i.done).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <span className="text-[10px] text-muted-foreground">{doneCount}/{data.length} complete</span>
      </div>
      <div className="space-y-1.5">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2 rounded-md hover:bg-muted/30 transition-colors">
            {item.done ? (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
              >
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
            )}
            <span className={`text-xs ${item.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
