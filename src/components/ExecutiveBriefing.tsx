import { AlertTriangle, TrendingUp, Lightbulb, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedText, FadeInText } from "@/components/ui/animated-text";

interface CriticalAlert {
  type: string;
  message: string;
}

interface BriefingData {
  greeting: string;
  narrative_summary: string;
  critical_alert: CriticalAlert;
  suggested_action: string;
}

// Mock executive briefing data - in production, this would come from AI synthesis
const briefingData: BriefingData = {
  greeting: "Good Morning, Sarah. Business is Growing today.",
  narrative_summary: "Your loyalty program contributed 40% of total sales this week, a 12% increase from last month. However, we detected a latency increase in your 'Gold Tier' customers—average days between purchases rose from 14 to 21 days—putting ₹2.4Cr recurring revenue at risk. This correlates with a 15% drop in campaign open rates for this segment.",
  critical_alert: {
    type: "Fraud",
    message: "High-velocity redemption detected on Item ID #5592 (Ladies Handbag). 47 redemptions in 2 hours from 3 IPs. Recommended: Freeze SKU pending review."
  },
  suggested_action: "Create a 'Win-Back' segment for Gold Tier users using the Segcon 'Lookalike' model. Historical data shows 34% reactivation rate within 7 days of targeted outreach."
};

export const ExecutiveBriefing = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <section className="relative animate-fade-in">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Executive Briefing</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Generated at {currentTime}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0">
          Live Insights
        </Badge>
      </div>

      {/* Greeting */}
      <p className="text-xl font-medium text-foreground mb-4">
        <AnimatedText text={briefingData.greeting} delay={200} speed={30} />
      </p>

      {/* Narrative Summary */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Performance Overview</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-6">
          <AnimatedText text={briefingData.narrative_summary} delay={1500} speed={15} />
        </p>
      </div>

      {/* Critical Alert */}
      <div className="mb-6 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded bg-destructive/10 mt-0.5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-destructive">Critical Alert</span>
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                {briefingData.critical_alert.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {briefingData.critical_alert.message}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Action */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
        <div className="flex items-start gap-3">
          <div className="p-1.5 rounded bg-primary/10 mt-0.5">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground block mb-1">
              Recommended Action
            </span>
            <p className="text-sm text-muted-foreground mb-3">
              {briefingData.suggested_action}
            </p>
            <div className="flex gap-2">
              <Button size="sm" className="text-xs h-7">
                Execute in Segcon
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-7">
                Ask Oliver AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Data Sources</p>
        <div className="flex flex-wrap gap-1.5">
          {['Atlas Prime', 'Segcon', 'Fraud Sentinel', 'Campaigns'].map((source) => (
            <Badge key={source} variant="secondary" className="text-[10px] font-normal">
              {source}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
