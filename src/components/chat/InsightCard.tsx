import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, ExternalLink } from "lucide-react";

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
  relatedModule,
  trend 
}: InsightCardProps) => {
  const confidenceColors = {
    high: "bg-green-500/10 text-green-500 border-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    low: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20 my-3">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">AI Insight</span>
        </div>
        <div className="flex items-center gap-2">
          {trend && getTrendIcon()}
          <Badge variant="outline" className={confidenceColors[confidence]}>
            {confidence} confidence
          </Badge>
        </div>
      </div>

      {/* Summary */}
      <p className="text-sm text-foreground leading-relaxed mb-4">
        {summary}
      </p>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Recommendations
          </h5>
          <ul className="space-y-1.5">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Related Module */}
      {relatedModule && (
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          View in {relatedModule}
          <ExternalLink className="h-3 w-3" />
        </Button>
      )}
    </Card>
  );
};
