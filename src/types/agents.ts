export type AgentId = "data" | "campaign" | "product";

export type AgentStatus = "idle" | "thinking" | "active";

export interface Agent {
  id: AgentId;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  color: string; // tailwind hsl var name
  iconName: "BarChart3" | "Megaphone" | "Box";
}

export interface AgentMessage {
  id: string;
  role: "user" | "agent";
  agentId: AgentId;
  content: string;
  timestamp: string;
  toolAction?: string; // e.g. "Generating dashboard…"
  isStreaming?: boolean;
  followUps?: string[];
}

export interface WorkspaceWidget {
  type: "kpi" | "chart" | "table" | "insight" | "funnel" | "code" | "checklist" | "budget";
  title: string;
  data?: any;
}
