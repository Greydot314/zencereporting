import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolActionMessageProps {
  actions: string[];
  completedCount: number;
  colorVar: string;
}

export const ToolActionMessage = ({ actions, completedCount, colorVar }: ToolActionMessageProps) => {
  return (
    <div className="space-y-1.5 p-3 rounded-lg bg-muted/50 border border-border text-sm">
      {actions.map((action, i) => {
        const isComplete = i < completedCount;
        const isActive = i === completedCount;
        return (
          <div key={i} className={cn("flex items-center gap-2 transition-opacity", !isComplete && !isActive && "opacity-40")}>
            {isComplete ? (
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
              >
                <Check className="h-2.5 w-2.5 text-primary-foreground" />
              </div>
            ) : isActive ? (
              <Loader2
                className="h-4 w-4 animate-spin"
                style={{ color: `hsl(var(--${colorVar}))` }}
              />
            ) : (
              <div className="w-4 h-4 rounded-full border border-muted-foreground/30" />
            )}
            <span className={cn(isComplete && "text-muted-foreground line-through")}>{action}</span>
          </div>
        );
      })}
    </div>
  );
};
