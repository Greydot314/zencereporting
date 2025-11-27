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
    <Card className="p-4 mt-3 bg-accent/30 border-primary/10">
      <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-md bg-primary/10 flex-shrink-0">
          <Lightbulb className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-foreground">Insight</span>
            {trend && (
              trend === "up" ? 
                <TrendingUp className="h-3 w-3 text-destructive" /> : 
                <TrendingDown className="h-3 w-3 text-emerald-500" />
            )}
            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
              confidence === 'high' ? 'bg-emerald-500/10 text-emerald-600' :
              confidence === 'medium' ? 'bg-amber-500/10 text-amber-600' :
              'bg-destructive/10 text-destructive'
            }`}>
              {confidence} confidence
            </span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          
          {recommendations && recommendations.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-2">Recommendations</p>
              <ul className="space-y-1">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
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
