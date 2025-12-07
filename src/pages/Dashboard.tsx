import { Sparkles, ChevronRight, Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExecutiveBriefing } from "@/components/ExecutiveBriefing";
// AI Insights data - cross-module intelligence
const aiInsights = [
  {
    id: 1,
    type: "critical",
    title: "Revenue below target by 6%",
    description: "Tier 2 stores showing consistent decline over the past week. Immediate attention required.",
    module: "Atlas Prime",
    action: "Analyze root cause",
    trend: "down",
  },
  {
    id: 2,
    type: "opportunity",
    title: "Premium Shoppers segment grew 8%",
    description: "High-value customer segment expanding. Consider targeted campaigns to maximize conversion.",
    module: "Segcon",
    action: "View segment",
    trend: "up",
  },
  {
    id: 3,
    type: "warning",
    title: "Fraud attempts increased 18%",
    description: "Unusual pattern detected in online transactions. Review flagged transactions.",
    module: "Fraud",
    action: "Review alerts",
    trend: "up",
  },
];

// Priority queue items
const priorityQueue = [
  { id: 1, title: "Review 12 flagged transactions", module: "Fraud", priority: "critical" },
  { id: 2, title: "3 stores need inventory restock", module: "Atlas Neo", priority: "warning" },
  { id: 3, title: "Customer satisfaction dip in Delhi region", module: "Insights", priority: "warning" },
  { id: 4, title: "New loyalty tier candidates identified", module: "Loyalty", priority: "info" },
  { id: 5, title: "Campaign performance report ready", module: "Clickrev", priority: "info" },
];

// Quick action chips
const quickActions = [
  "Show all alerts",
  "Revenue summary",
  "Fraud check",
  "Top segments",
];

const Dashboard = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <main className="flex-1 p-6 pt-20 overflow-auto bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pattern-dots opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-8 relative">
        {/* Executive Morning Briefing */}
        <ExecutiveBriefing />

        {/* Cross-Module AI Insights */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
            <Link to="/ai-insights" className="text-xs text-primary hover:underline">View all insights →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>

        {/* Two Column Layout: Priority Queue + Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Priority Queue */}
          <Card className="surface border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Priority Queue
                </CardTitle>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium bg-secondary px-2 py-0.5 rounded-full">AI-ranked</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {priorityQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.priority === 'critical' ? 'bg-destructive animate-pulse-subtle' :
                    item.priority === 'warning' ? 'bg-[hsl(var(--atlas-warning))]' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.module}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats with AI Annotations */}
          <Card className="surface border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  Performance Summary
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <StatRow 
                label="Revenue Today" 
                value="₹12.4L" 
                annotation="↓6% vs target"
                status="warning"
              />
              <StatRow 
                label="Store Visits" 
                value="2,847" 
                annotation="↓3.1% vs yesterday"
                status="warning"
              />
              <StatRow 
                label="Conversion Rate" 
                value="3.4%" 
                annotation="↑0.2% improvement"
                status="success"
              />
              <StatRow 
                label="Active Alerts" 
                value="7" 
                annotation="2 critical, 5 warnings"
                status="error"
              />
              <StatRow 
                label="AI Health Score" 
                value="92/100" 
                annotation="Good standing"
                status="success"
              />
            </CardContent>
          </Card>
        </div>

        {/* Floating AI Chat Widget */}
        <div className="fixed bottom-6 right-6 z-40">
          {aiChatOpen && (
            <div className="absolute bottom-16 right-0 w-80 surface-elevated p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Quick Actions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Link key={action} to="/ai-chat">
                    <Button variant="outline" size="sm" className="text-xs h-8 hover:border-primary hover:bg-primary/5">
                      {action}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link to="/ai-chat" className="block mt-3">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors cursor-pointer">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Ask Zence AI anything...</span>
                </div>
              </Link>
            </div>
          )}
          <Button
            onClick={() => setAiChatOpen(!aiChatOpen)}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all"
          >
            <Sparkles className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </main>
  );
};

// AI Insight Card Component
const AIInsightCard = ({ insight }: { insight: typeof aiInsights[0] }) => {
  const typeStyles = {
    critical: {
      border: "border-l-destructive",
      icon: AlertTriangle,
      iconColor: "text-destructive",
      iconBg: "bg-destructive/10",
    },
    opportunity: {
      border: "border-l-[hsl(var(--atlas-success))]",
      icon: CheckCircle,
      iconColor: "text-[hsl(var(--atlas-success))]",
      iconBg: "bg-[hsl(var(--atlas-success))]/10",
    },
    warning: {
      border: "border-l-[hsl(var(--atlas-warning))]",
      icon: AlertTriangle,
      iconColor: "text-[hsl(var(--atlas-warning))]",
      iconBg: "bg-[hsl(var(--atlas-warning))]/10",
    },
  };

  const style = typeStyles[insight.type as keyof typeof typeStyles];
  const Icon = style.icon;

  return (
    <Card className={`surface border-l-2 ${style.border} hover:shadow-md transition-all cursor-pointer group`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${style.iconBg} ${style.iconColor}`}>
            <Icon className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{insight.module}</span>
              {insight.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-[hsl(var(--atlas-success))]" />
              ) : (
                <TrendingDown className="h-3 w-3 text-destructive" />
              )}
            </div>
            <p className="text-sm font-medium text-foreground leading-tight">{insight.title}</p>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{insight.description}</p>
            <Link to="/ai-chat">
              <Button variant="ghost" size="sm" className="mt-2 h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5 group-hover:translate-x-1 transition-transform">
                {insight.action} →
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Stat Row Component with AI annotation
const StatRow = ({ 
  label, 
  value, 
  annotation,
  status 
}: { 
  label: string; 
  value: string; 
  annotation: string;
  status: 'success' | 'warning' | 'error';
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
    <div>
      <p className="text-sm text-foreground font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
    <div className={`flex items-center gap-1.5 text-xs font-medium ${
      status === 'success' ? 'text-[hsl(var(--atlas-success))]' :
      status === 'warning' ? 'text-[hsl(var(--atlas-warning))]' : 'text-destructive'
    }`}>
      <span>{annotation}</span>
    </div>
  </div>
);

export default Dashboard;
