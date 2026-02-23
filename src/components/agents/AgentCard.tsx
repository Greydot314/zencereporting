import { cn } from "@/lib/utils";
import { Agent, AgentId } from "@/types/agents";
import { AgentStatusIndicator } from "./AgentStatusIndicator";
import { BarChart3, Megaphone, Box } from "lucide-react";

const iconMap = {
  BarChart3,
  Megaphone,
  Box,
};

interface AgentCardProps {
  agent: Agent;
  isActive: boolean;
  onClick: (id: AgentId) => void;
}

export const AgentCard = ({ agent, isActive, onClick }: AgentCardProps) => {
  const Icon = iconMap[agent.iconName];
  const colorVar = agent.color;

  return (
    <button
      onClick={() => onClick(agent.id)}
      className={cn(
        "w-full text-left p-3 rounded-xl border transition-all duration-200 group",
        isActive
          ? "border-transparent shadow-md"
          : "border-border bg-card hover:border-muted-foreground/20"
      )}
      style={
        isActive
          ? {
              backgroundColor: `hsl(var(--${colorVar}) / 0.08)`,
              borderColor: `hsl(var(--${colorVar}) / 0.3)`,
            }
          : undefined
      }
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
            !isActive && "bg-muted"
          )}
          style={
            isActive
              ? { backgroundColor: `hsl(var(--${colorVar}) / 0.15)` }
              : undefined
          }
        >
          <Icon
            className="h-4 w-4"
            style={{ color: `hsl(var(--${colorVar}))` }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "text-sm font-semibold truncate",
                isActive ? "" : "text-foreground"
              )}
              style={isActive ? { color: `hsl(var(--${colorVar}))` } : undefined}
            >
              {agent.name}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
            {agent.role}
          </p>
          <div className="mt-2">
            <AgentStatusIndicator status={agent.status} colorVar={colorVar} />
          </div>
        </div>
      </div>
    </button>
  );
};
