import { AgentMessage, AgentId } from "@/types/agents";
import { cn } from "@/lib/utils";
import { BarChart3, Megaphone, Box, User } from "lucide-react";

const agentIcons: Record<AgentId, any> = {
  data: BarChart3,
  campaign: Megaphone,
  product: Box,
};

const agentNames: Record<AgentId, string> = {
  data: "Data Agent",
  campaign: "Campaign Agent",
  product: "Product Agent",
};

const agentColors: Record<AgentId, string> = {
  data: "agent-data",
  campaign: "agent-campaign",
  product: "agent-product",
};

interface AgentChatMessageProps {
  message: AgentMessage;
}

export const AgentChatMessage = ({ message }: AgentChatMessageProps) => {
  const isUser = message.role === "user";

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // Render markdown-like bold
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  if (isUser) {
    return (
      <div className="flex gap-3 flex-row-reverse animate-fade-in">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="rounded-2xl px-4 py-3 bg-primary text-primary-foreground rounded-br-md max-w-md">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <span className="text-[10px] text-muted-foreground px-1">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  const Icon = agentIcons[message.agentId];
  const colorVar = agentColors[message.agentId];
  const displayContent = message.isStreaming ? (message.streamedContent || "") : message.content;

  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Agent avatar */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.12)` }}
      >
        <Icon className="h-4 w-4" style={{ color: `hsl(var(--${colorVar}))` }} />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold"
            style={{ color: `hsl(var(--${colorVar}))` }}
          >
            {agentNames[message.agentId]}
          </span>
          <span className="text-[10px] text-muted-foreground">{formatTime(message.timestamp)}</span>
        </div>

        {/* Content */}
        <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {renderText(displayContent)}
          {message.isStreaming && (
            <span className="inline-block w-0.5 h-4 ml-0.5 bg-foreground animate-blink align-text-bottom" />
          )}
        </div>
      </div>
    </div>
  );
};
