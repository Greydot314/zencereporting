import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, TrendingDown, Users, Clock, Zap, Crown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AnimatedNumber, AnimatedPercentage, AnimatedCurrency } from "@/components/ui/animated-number";

interface PredictedImpact {
  revenue: { value: number; unit: string; delta_percent?: number };
  churn_rate: { value: number; unit: string };
  engagement: { value: number; unit: string };
}

interface Strategy {
  strategy_id: string;
  title: string;
  target_segments?: string[];
  time_horizon_days?: number;
  predicted_impact: PredictedImpact;
  confidence: number;
}

interface DecisionImpactRadarData {
  widget_type: string;
  last_updated: string;
  primary_recommendation: Strategy;
  alternative_strategies: Strategy[];
}

interface DecisionImpactRadarProps {
  data: DecisionImpactRadarData;
}

const ImpactMetric = ({ 
  label, 
  value, 
  unit, 
  isPositive, 
  icon: Icon,
  delay = 0
}: { 
  label: string; 
  value: number; 
  unit: string; 
  isPositive: boolean; 
  icon: React.ElementType;
  delay?: number;
}) => (
  <div 
    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 animate-fade-in"
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
  >
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </div>
    <div className={`flex items-center gap-1.5 font-semibold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
      {isPositive ? (
        <ArrowUpRight className="h-4 w-4" />
      ) : (
        <ArrowDownRight className="h-4 w-4" />
      )}
      <span>
        {unit === "Cr" ? (
          <>₹<AnimatedNumber value={value} formatFn={(v) => v.toFixed(2)} /> Cr</>
        ) : (
          <><AnimatedPercentage value={Math.abs(value)} showSign={false} />{unit}</>
        )}
      </span>
    </div>
  </div>
);

const StrategyCard = ({ strategy, isPrimary = false, delay = 0 }: { strategy: Strategy; isPrimary?: boolean; delay?: number }) => {
  const { predicted_impact, confidence } = strategy;
  
  return (
    <div 
      className={`rounded-xl border ${isPrimary ? 'border-primary/50 bg-primary/5' : 'border-border bg-card/50'} p-4 space-y-3 animate-fade-in`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      {isPrimary && (
        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0 gap-1.5 mb-2 animate-scale-in" style={{ animationDelay: `${delay + 100}ms`, animationFillMode: 'backwards' }}>
          <Crown className="h-3 w-3" />
          Primary Recommendation
        </Badge>
      )}
      
      <div className="space-y-1">
        <h4 className={`font-semibold ${isPrimary ? 'text-lg' : 'text-base'} text-foreground`}>
          {strategy.title}
        </h4>
        
        {strategy.target_segments && (
          <div className="flex flex-wrap gap-1.5">
            {strategy.target_segments.map((segment) => (
              <Badge key={segment} variant="secondary" className="text-xs font-normal">
                <Users className="h-3 w-3 mr-1" />
                {segment}
              </Badge>
            ))}
          </div>
        )}
        
        {strategy.time_horizon_days && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            Next {strategy.time_horizon_days} Days
          </div>
        )}
      </div>
      
      <div className="space-y-0">
        <ImpactMetric 
          label="Revenue Impact" 
          value={predicted_impact.revenue.value} 
          unit={predicted_impact.revenue.unit}
          isPositive={predicted_impact.revenue.value > 0}
          icon={TrendingUp}
          delay={delay + 150}
        />
        <ImpactMetric 
          label="Churn Reduction" 
          value={predicted_impact.churn_rate.value} 
          unit={predicted_impact.churn_rate.unit}
          isPositive={predicted_impact.churn_rate.value < 0}
          icon={TrendingDown}
          delay={delay + 200}
        />
        <ImpactMetric 
          label="Engagement Lift" 
          value={predicted_impact.engagement.value} 
          unit={predicted_impact.engagement.unit}
          isPositive={predicted_impact.engagement.value > 0}
          icon={Zap}
          delay={delay + 250}
        />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-muted-foreground">Model Confidence</span>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-sm font-medium text-foreground">
            <AnimatedNumber value={confidence} formatFn={(v) => `${Math.round(v)}%`} />
          </span>
        </div>
      </div>
    </div>
  );
};

export const DecisionImpactRadar = ({ data }: DecisionImpactRadarProps) => {
  const lastUpdated = new Date(data.last_updated).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Decision Impact Radar</CardTitle>
              <CardDescription>
                AI-recommended strategies with predicted business impact
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Updated {lastUpdated}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Primary Recommendation */}
        <StrategyCard strategy={data.primary_recommendation} isPrimary delay={100} />
        
        {/* Alternative Strategies */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2 animate-fade-in" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
            <span className="h-px flex-1 bg-border" />
            Alternative Strategies
            <span className="h-px flex-1 bg-border" />
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.alternative_strategies.map((strategy, index) => (
              <StrategyCard key={strategy.strategy_id} strategy={strategy} delay={500 + index * 150} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
