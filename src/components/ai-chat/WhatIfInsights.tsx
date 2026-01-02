import { Badge } from "@/components/ui/badge";
import { FlaskConical, TrendingUp, TrendingDown, DollarSign, Users, Activity } from "lucide-react";
import { WhatIfData } from "@/types/predictions";

interface WhatIfInsightsProps {
  data: WhatIfData;
  query: string;
}

export const WhatIfInsights = ({ data, query }: WhatIfInsightsProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const getChangeIndicator = (change: number, inverse = false) => {
    const isPositive = inverse ? change < 0 : change > 0;
    return (
      <div className={`flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        <span className="text-sm font-medium">{change > 0 ? '+' : ''}{change.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-violet-100">
          <FlaskConical className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">What-If Scenario Analysis</h3>
          <p className="text-sm text-muted-foreground">Analyzing: "{query}"</p>
        </div>
      </div>

      {/* Current State */}
      <div className="p-4 rounded-xl border bg-muted/20">
        <h4 className="text-sm font-medium mb-3">Current Baseline</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <DollarSign className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
            <div className="text-lg font-bold">{formatCurrency(data.currentState.revenue)}</div>
            <div className="text-xs text-muted-foreground">Revenue</div>
          </div>
          <div className="text-center">
            <Users className="h-5 w-5 text-red-600 mx-auto mb-1" />
            <div className="text-lg font-bold">{data.currentState.churnRate}%</div>
            <div className="text-xs text-muted-foreground">Churn Rate</div>
          </div>
          <div className="text-center">
            <Activity className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold">{data.currentState.engagement}%</div>
            <div className="text-xs text-muted-foreground">Engagement</div>
          </div>
        </div>
      </div>

      {/* Scenarios Comparison */}
      <div>
        <h4 className="text-sm font-medium mb-3">Scenario Outcomes</h4>
        <div className="space-y-4">
          {data.scenarios.map((scenario) => (
            <div key={scenario.id} className="p-4 rounded-xl border bg-gradient-to-r from-background to-violet-50/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-medium">{scenario.name}</span>
                  <p className="text-sm text-muted-foreground">{scenario.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {scenario.variables[0].value}{scenario.variables[0].unit}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-2 rounded-lg bg-background/80">
                  <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                  <div className="text-base font-bold">{formatCurrency(scenario.predictedOutcome.revenue)}</div>
                  {getChangeIndicator(scenario.predictedOutcome.revenueChange)}
                </div>
                <div className="p-2 rounded-lg bg-background/80">
                  <div className="text-xs text-muted-foreground mb-1">Churn</div>
                  <div className="text-base font-bold">{scenario.predictedOutcome.churnRate}%</div>
                  {getChangeIndicator(scenario.predictedOutcome.churnChange, true)}
                </div>
                <div className="p-2 rounded-lg bg-background/80">
                  <div className="text-xs text-muted-foreground mb-1">Engagement</div>
                  <div className="text-base font-bold">{scenario.predictedOutcome.engagement}%</div>
                  {getChangeIndicator(scenario.predictedOutcome.engagementChange)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="p-3 rounded-lg border bg-violet-50/50 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-violet-700">Best option: </span>
          "{data.scenarios[2].name}" delivers highest revenue gain with +{data.scenarios[2].predictedOutcome.revenueChange}%
        </p>
      </div>
    </div>
  );
};
