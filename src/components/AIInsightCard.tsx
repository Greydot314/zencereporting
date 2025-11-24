import { useState } from "react";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AIInsightCardProps {
  title: string;
  summary: string;
  details?: string;
  trend?: "up" | "down" | "neutral";
  metric?: string;
  category?: string;
  modulePath?: string;
}

export const AIInsightCard = ({ title, summary, details, trend, metric, category, modulePath }: AIInsightCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="card-shadow hover:card-shadow-hover transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {category && (
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {trend && (
            <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-100 text-green-600' : trend === 'down' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-5 h-5" /> : trend === 'down' ? <TrendingDown className="w-5 h-5" /> : null}
            </div>
          )}
        </div>
        {metric && (
          <CardDescription className="text-2xl font-bold text-card-foreground mt-2">
            {metric}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{summary}</p>
        
        {details && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show more
                </>
              )}
            </button>
            
            {isExpanded && (
              <div className="mt-4 p-4 rounded-lg bg-accent/50 text-sm text-card-foreground">
                {details}
              </div>
            )}
          </>
        )}
        
        {modulePath && (
          <div className="mt-4 pt-4 border-t border-border">
            <Link to={modulePath}>
              <Button variant="outline" size="sm" className="w-full gap-2">
                View in {category}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
