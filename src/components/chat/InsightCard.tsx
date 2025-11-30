import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

interface InsightCardProps {
  summary: string;
  confidence?: "high" | "medium" | "low";
  recommendations?: string[];
  relatedModule?: string;
  trend?: "up" | "down" | "stable";
}

export const InsightCard = ({ 
  summary, 
  confidence = "high", 
  recommendations,
  trend 
}: InsightCardProps) => {
  return (
    <Card className="p-4 glass border-primary/20 ai-glow">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-primary">AI Insight</span>
            {trend && (
              trend === "up" ? 
                <TrendingUp className="h-3.5 w-3.5 text-destructive" /> : 
                <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
            )}
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              confidence === 'high' ? 'bg-emerald-500/20 text-emerald-400' :
              confidence === 'medium' ? 'bg-amber-500/20 text-amber-400' :
              'bg-destructive/20 text-destructive'
            }`}>
              {confidence} confidence
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          
          {recommendations && recommendations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-border/50">
              <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-2">
                Recommendations
              </p>
              <ul className="space-y-1.5">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
