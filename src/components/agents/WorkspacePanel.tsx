import { WorkspaceWidget, AgentId } from "@/types/agents";
import { KPIWidget } from "./workspace/KPIWidget";
import { ChartWidget } from "./workspace/ChartWidget";
import { TableWidget } from "./workspace/TableWidget";
import { InsightWidget } from "./workspace/InsightWidget";
import { FunnelWidget } from "./workspace/FunnelWidget";
import { CodeWidget } from "./workspace/CodeWidget";
import { ChecklistWidget } from "./workspace/ChecklistWidget";
import { BudgetWidget } from "./workspace/BudgetWidget";
import { BarChart3, Megaphone, Box } from "lucide-react";

const agentLabels: Record<AgentId, string> = {
  data: "Data Workspace",
  campaign: "Campaign Workspace",
  product: "Product Workspace",
};
const agentIcons: Record<AgentId, any> = { data: BarChart3, campaign: Megaphone, product: Box };
const agentColors: Record<AgentId, string> = { data: "agent-data", campaign: "agent-campaign", product: "agent-product" };

interface WorkspacePanelProps {
  agentId: AgentId;
  widgets: WorkspaceWidget[];
}

export const WorkspacePanel = ({ agentId, widgets }: WorkspacePanelProps) => {
  const Icon = agentIcons[agentId];
  const colorVar = agentColors[agentId];

  if (widgets.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center p-8">
        <div>
          <div
            className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
            style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.08)` }}
          >
            <Icon className="h-5 w-5" style={{ color: `hsl(var(--${colorVar}))` }} />
          </div>
          <p className="text-sm text-muted-foreground">
            Ask a question to see results here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" style={{ color: `hsl(var(--${colorVar}))` }} />
          <span className="text-sm font-semibold text-foreground">{agentLabels[agentId]}</span>
        </div>
      </div>

      {/* Widgets */}
      <div className="p-4 space-y-5">
        {widgets.map((widget, i) => {
          switch (widget.type) {
            case "kpi":
              return <KPIWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            case "chart":
              return <ChartWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            case "table":
              return <TableWidget key={i} title={widget.title} data={widget.data} />;
            case "insight":
              return <InsightWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            case "funnel":
              return <FunnelWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            case "code":
              return <CodeWidget key={i} title={widget.title} data={widget.data} />;
            case "checklist":
              return <ChecklistWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            case "budget":
              return <BudgetWidget key={i} title={widget.title} data={widget.data} colorVar={colorVar} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};
