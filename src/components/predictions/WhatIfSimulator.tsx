import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { FlaskConical, TrendingUp, TrendingDown, DollarSign, Users, Activity } from "lucide-react";
import { WhatIfData, WhatIfScenario } from "@/types/predictions";

interface WhatIfSimulatorProps {
  data: WhatIfData;
}

export const WhatIfSimulator = ({ data }: WhatIfSimulatorProps) => {
  const [selectedScenario, setSelectedScenario] = useState<WhatIfScenario>(data.scenarios[0]);
  const [variableValues, setVariableValues] = useState<Record<string, number>>(
    Object.fromEntries(selectedScenario.variables.map(v => [v.name, v.value]))
  );

  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const handleScenarioChange = (scenario: WhatIfScenario) => {
    setSelectedScenario(scenario);
    setVariableValues(Object.fromEntries(scenario.variables.map(v => [v.name, v.value])));
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
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-violet-100">
            <FlaskConical className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <CardTitle className="text-lg">What-If Scenario Simulator</CardTitle>
            <p className="text-sm text-muted-foreground">Predict outcomes of strategic changes</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scenario Selector */}
        <div className="flex flex-wrap gap-2">
          {data.scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioChange(scenario)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                selectedScenario.id === scenario.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/30 hover:bg-muted/50 border-border'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>

        {/* Scenario Description */}
        <div className="p-4 rounded-xl border bg-muted/20">
          <p className="text-sm text-muted-foreground">{selectedScenario.description}</p>
        </div>

        {/* Variable Sliders */}
        <div className="space-y-4">
          {selectedScenario.variables.map((variable) => (
            <div key={variable.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{variable.name}</span>
                <Badge variant="secondary" className="text-sm">
                  {variableValues[variable.name]}{variable.unit}
                </Badge>
              </div>
              <Slider
                value={[variableValues[variable.name]]}
                min={variable.min}
                max={variable.max}
                step={variable.step}
                onValueChange={(value) => setVariableValues(prev => ({ ...prev, [variable.name]: value[0] }))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{variable.min}{variable.unit}</span>
                <span>{variable.max}{variable.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Predicted Outcomes */}
        <div>
          <h4 className="text-sm font-medium mb-3">Predicted Outcomes</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Revenue */}
            <div className="p-4 rounded-xl border bg-gradient-to-br from-background to-emerald-50/30">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium text-muted-foreground">Revenue</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {formatCurrency(selectedScenario.predictedOutcome.revenue)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Current: {formatCurrency(data.currentState.revenue)}
                </span>
                {getChangeIndicator(selectedScenario.predictedOutcome.revenueChange)}
              </div>
            </div>

            {/* Churn Rate */}
            <div className="p-4 rounded-xl border bg-gradient-to-br from-background to-red-50/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-red-600" />
                <span className="text-sm font-medium text-muted-foreground">Churn Rate</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {selectedScenario.predictedOutcome.churnRate}%
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Current: {data.currentState.churnRate}%
                </span>
                {getChangeIndicator(selectedScenario.predictedOutcome.churnChange, true)}
              </div>
            </div>

            {/* Engagement */}
            <div className="p-4 rounded-xl border bg-gradient-to-br from-background to-blue-50/30">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-muted-foreground">Engagement</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {selectedScenario.predictedOutcome.engagement}%
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Current: {data.currentState.engagement}%
                </span>
                {getChangeIndicator(selectedScenario.predictedOutcome.engagementChange)}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Note */}
        <div className="p-3 rounded-lg border bg-violet-50/30 text-center">
          <p className="text-sm text-muted-foreground">
            Adjust the slider above to see how changes affect predicted outcomes in real-time
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
