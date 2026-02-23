import { Agent, AgentId } from "@/types/agents";
import { AgentCard } from "./AgentCard";
import { Sparkles } from "lucide-react";

interface AgentSidebarProps {
  agents: Agent[];
  activeAgentId: AgentId;
  onSelectAgent: (id: AgentId) => void;
}

export const AgentSidebar = ({ agents, activeAgentId, onSelectAgent }: AgentSidebarProps) => {
  return (
    <div className="w-64 border-r border-border bg-card flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">AI Agents</h2>
            <p className="text-[10px] text-muted-foreground">Zence 360</p>
          </div>
        </div>
      </div>

      {/* Agent List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isActive={activeAgentId === agent.id}
            onClick={onSelectAgent}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          Select an agent to begin a specialized conversation
        </p>
      </div>
    </div>
  );
};
