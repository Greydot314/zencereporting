import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMinus, AlertTriangle, Shield, Clock, Target, RefreshCw, ArrowRight } from "lucide-react";
import { ChurnData } from "@/types/predictions";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { AnimatedNumber, AnimatedCurrency } from "@/components/ui/animated-number";

interface ChurnPredictionCardProps {
  data: ChurnData;
}

export const ChurnPredictionCard = ({ data }: ChurnPredictionCardProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const riskDistribution = [
    { name: "High Risk", value: data.summary.highRisk, color: "hsl(0, 84%, 60%)" },
    { name: "Medium Risk", value: data.summary.mediumRisk, color: "hsl(45, 93%, 47%)" },
    { name: "Low Risk", value: data.summary.lowRisk, color: "hsl(142, 76%, 36%)" },
  ];

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.7) return "text-red-600 bg-red-50";
    if (probability >= 0.5) return "text-amber-600 bg-amber-50";
    return "text-emerald-600 bg-emerald-50";
  };

  return (
    <section className="col-span-full lg:col-span-2 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-100">
            <UserMinus className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Churn Prediction Engine</h2>
            <p className="text-sm text-muted-foreground">Early warning system for customer retention</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1" />
            {data.modelAccuracy}% Accuracy
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />
            {data.lastUpdated}
          </Badge>
        </div>
      </div>
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg border bg-red-50/50">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-red-600 font-medium">High Risk</span>
            </div>
            <div className="text-xl font-bold text-red-700">
              <AnimatedNumber value={data.summary.highRisk} />
            </div>
          </div>
          <div className="p-3 rounded-lg border bg-amber-50/50">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-amber-600 font-medium">Medium Risk</span>
            </div>
            <div className="text-xl font-bold text-amber-700">
              <AnimatedNumber value={data.summary.mediumRisk} />
            </div>
          </div>
          <div className="p-3 rounded-lg border bg-emerald-50/50">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">Low Risk</span>
            </div>
            <div className="text-xl font-bold text-emerald-700">
              <AnimatedNumber value={data.summary.lowRisk} />
            </div>
          </div>
          <div className="p-3 rounded-lg border bg-muted/50">
            <div className="text-xs text-muted-foreground font-medium mb-1">Revenue at Risk</div>
            <div className="text-xl font-bold text-foreground">
              <AnimatedCurrency value={data.summary.revenueAtRisk} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Risk Distribution Pie */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium mb-2">Risk Distribution</h4>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => value.toLocaleString()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 text-xs mt-2">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Churn Timeline */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-medium mb-2">Predicted Churn Timeline</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.timeline}>
                  <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [value.toLocaleString(), "Customers"]}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* At-Risk Segments */}
        <div>
          <h4 className="text-sm font-medium mb-3">Intervention Priority Queue</h4>
          <div className="space-y-3">
            {data.segments.map((segment) => (
              <div 
                key={segment.id}
                className="p-4 rounded-xl border bg-gradient-to-r from-background to-muted/20 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{segment.name}</span>
                      <Badge className={`text-xs ${getProbabilityColor(segment.probability)}`}>
                        {Math.round(segment.probability * 100)}% churn risk
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {segment.count.toLocaleString()} customers · {formatCurrency(segment.revenueAtRisk)} at risk · Expected in {segment.predictedChurnDate}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-primary" />
                      <span className="text-primary font-medium">{segment.suggestedAction}</span>
                      <Badge variant="outline" className="text-xs ml-2">
                        {Math.round(segment.expectedSaveRate * 100)}% save rate
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
