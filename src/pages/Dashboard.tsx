import { Sparkles, MessageSquare, AlertTriangle, TrendingUp, Shield, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExecutiveBriefing } from "@/components/ExecutiveBriefing";
import { AIInsightsLog } from "@/components/AIInsightsLog";
import { InterventionDeck } from "@/components/InterventionDeck";
import { LoyaltyHealthMatrix } from "@/components/LoyaltyHealthMatrix";
import { PerformanceSummary } from "@/components/PerformanceSummary";

// Quick action chips with detailed descriptions
const quickActions = [
  { label: "Critical Alerts", description: "View all fraud & risk alerts", icon: AlertTriangle },
  { label: "Revenue Analysis", description: "Loyalty contribution & sales", icon: TrendingUp },
  { label: "Fraud Detection", description: "Anomaly & suspicious activity", icon: Shield },
  { label: "Segment Health", description: "Top & at-risk segments", icon: Users },
  { label: "Campaign ROI", description: "Performance & recommendations", icon: Target },
];

const Dashboard = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);

  return (
    <main className="flex-1 p-6 pt-28 overflow-auto bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 pattern-dots opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Section 1: Executive Morning Briefing */}
        <ExecutiveBriefing />

        <div className="h-px bg-border" />

        {/* Section 2: Performance Summary */}
        <PerformanceSummary />

        <div className="h-px bg-border" />

        {/* Section 3: AI Insight Log */}
        <AIInsightsLog />

        <div className="h-px bg-border" />

        {/* Section 3 & 4: Intervention Deck + Loyalty Health Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Section 3: Intervention Deck (Aggregate Risk Pools) */}
          <div className="p-5 rounded-xl bg-secondary/20 border border-border/50">
            <InterventionDeck />
          </div>
          
          {/* Section 4: Performance Summary (Loyalty Health Matrix) */}
          <div className="p-5 rounded-xl bg-secondary/20 border border-border/50">
            <LoyaltyHealthMatrix />
          </div>
        </div>

        {/* Floating AI Chat Widget */}
        <div className="fixed bottom-6 right-6 z-40">
          {aiChatOpen && (
            <div className="absolute bottom-16 right-0 w-80 surface-elevated p-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Quick Actions</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {quickActions.map((action) => (
                  <Link key={action.label} to="/ai-chat">
                    <Button variant="outline" size="sm" className="w-full text-xs h-auto py-2 px-3 hover:border-primary hover:bg-primary/5 flex items-center gap-3 text-left justify-start">
                      <action.icon className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{action.label}</span>
                        <span className="text-[10px] text-muted-foreground font-normal">{action.description}</span>
                      </div>
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

export default Dashboard;
