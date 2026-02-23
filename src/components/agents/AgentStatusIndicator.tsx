import { cn } from "@/lib/utils";
import { AgentStatus } from "@/types/agents";

interface AgentStatusIndicatorProps {
  status: AgentStatus;
  colorVar: string;
}

export const AgentStatusIndicator = ({ status, colorVar }: AgentStatusIndicatorProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          status === "idle" && "bg-muted-foreground/40",
          status === "thinking" && "animate-pulse-soft",
          status === "active" && ""
        )}
        style={
          status !== "idle"
            ? { backgroundColor: `hsl(var(--${colorVar}))` }
            : undefined
        }
      />
      <span className="text-[10px] text-muted-foreground capitalize">{status}</span>
    </div>
  );
};
