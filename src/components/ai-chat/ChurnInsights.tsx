import { Badge } from "@/components/ui/badge";
import { UserMinus, AlertTriangle, Shield, Clock, Target, ArrowRight } from "lucide-react";
import { ChurnData } from "@/types/predictions";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface ChurnInsightsProps {
  data: ChurnData;
  query: string;
}

export const ChurnInsights = ({ data, query }: ChurnInsightsProps) => {
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

  const getProbabilityBadge = (probability: number) => {
    if (probability >= 0.7) return "bg-red-100 text-red-700";
    if (probability >= 0.5) return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-red-100">
          <UserMinus className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Churn Prediction Analysis</h3>
          <p className="text-sm text-muted-foreground">Analyzing: "{query}"</p>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">
          <Target className="h-3 w-3 mr-1" />
          {data.modelAccuracy}% Accuracy
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg border bg-red-50/50">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-xs text-red-600 font-medium">High Risk</span>
          </div>
          <div className="text-xl font-bold text-red-700">{data.summary.highRisk.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-lg border bg-amber-50/50">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-xs text-amber-600 font-medium">Medium Risk</span>
          </div>
          <div className="text-xl font-bold text-amber-700">{data.summary.mediumRisk.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-lg border bg-emerald-50/50">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-emerald-600 font-medium">Low Risk</span>
          </div>
          <div className="text-xl font-bold text-emerald-700">{data.summary.lowRisk.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-lg border bg-muted/50">
          <div className="text-xs text-muted-foreground font-medium mb-1">Revenue at Risk</div>
          <div className="text-xl font-bold">{formatCurrency(data.summary.revenueAtRisk)}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2 text-center">Risk Distribution</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
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
          <div className="flex justify-center gap-4 text-xs">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2 text-center">Churn Timeline</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.timeline}>
                <XAxis dataKey="period" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
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

      {/* Priority Segments */}
      <div>
        <h4 className="text-sm font-medium mb-3">Intervention Priority Queue</h4>
        <div className="space-y-2">
          {data.segments.slice(0, 3).map((segment) => (
            <div 
              key={segment.id}
              className="p-3 rounded-xl border bg-gradient-to-r from-background to-muted/20"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{segment.name}</span>
                <Badge className={`text-xs ${getProbabilityBadge(segment.probability)}`}>
                  {Math.round(segment.probability * 100)}% risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {segment.count.toLocaleString()} customers · {formatCurrency(segment.revenueAtRisk)} at risk
              </p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="text-primary">{segment.suggestedAction}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
