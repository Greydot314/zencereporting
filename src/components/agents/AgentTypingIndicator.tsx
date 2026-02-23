import { AgentId } from "@/types/agents";
import { BarChart3, Megaphone, Box } from "lucide-react";

const icons: Record<AgentId, any> = { data: BarChart3, campaign: Megaphone, product: Box };
const colors: Record<AgentId, string> = { data: "agent-data", campaign: "agent-campaign", product: "agent-product" };

export const AgentTypingIndicator = ({ agentId }: { agentId: AgentId }) => {
  const Icon = icons[agentId];
  const colorVar = colors[agentId];

  return (
    <div className="flex gap-3 animate-fade-in">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.12)` }}
      >
        <Icon className="h-4 w-4 animate-pulse-soft" style={{ color: `hsl(var(--${colorVar}))` }} />
      </div>
      <div className="bg-muted/50 border border-border rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:0ms]" style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.5)` }} />
          <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:150ms]" style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.5)` }} />
          <span className="w-2 h-2 rounded-full animate-bounce [animation-delay:300ms]" style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.5)` }} />
        </div>
      </div>
    </div>
  );
};
