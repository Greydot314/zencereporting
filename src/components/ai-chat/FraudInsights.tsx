import { FraudData, FraudRiskSegment } from "@/types/fraud";
import { AlertTriangle, Shield, TrendingUp, TrendingDown, Minus, Activity, DollarSign, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";

interface FraudInsightsProps {
  data: FraudData;
  query: string;
}

export const FraudInsights = ({ data, query }: FraudInsightsProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 100000) return `${(value / 1000).toFixed(0)}K`;
    return value.toLocaleString();
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-destructive" />;
      case "down": return <TrendingDown className="h-3 w-3 text-emerald-500" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  const getAlertColor = (type: "high" | "medium" | "low") => {
    switch (type) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "low": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-destructive/10">
          <Shield className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1">Fraud Risk Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Real-time fraud detection and risk assessment across your loyalty program
          </p>
        </div>
        <Badge variant="outline" className="text-[10px] bg-destructive/5 text-destructive border-destructive/20">
          {data.modelAccuracy}% Accuracy
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Total Transactions</span>
          </div>
          <p className="text-xl font-bold text-foreground">{formatNumber(data.summary.totalTransactions)}</p>
        </div>
        <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Flagged</span>
          </div>
          <p className="text-xl font-bold text-destructive">{formatNumber(data.summary.flaggedTransactions)}</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-muted-foreground">Amount at Risk</span>
          </div>
          <p className="text-xl font-bold text-amber-600">{formatCurrency(data.summary.totalAmountAtRisk)}</p>
        </div>
        <div className="p-4 rounded-xl bg-secondary/30 border border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Fraud Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-foreground">{data.summary.fraudRate}%</p>
            <span className={`text-xs ${data.summary.trend > 0 ? 'text-destructive' : 'text-emerald-500'}`}>
              {data.summary.trend > 0 ? '+' : ''}{data.summary.trend}%
            </span>
          </div>
        </div>
      </div>

      {/* Risk Distribution Chart & Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-4">Risk Distribution</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.riskSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                  nameKey="name"
                >
                  {data.riskSegments.map((segment) => (
                    <Cell key={segment.id} fill={segment.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as FraudRiskSegment;
                      return (
                        <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
                          <p className="font-medium text-sm">{data.name}</p>
                          <p className="text-xs text-muted-foreground">{data.count.toLocaleString()} customers</p>
                          <p className="text-xs text-muted-foreground">Risk Score: {data.riskScore}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {data.riskSegments.map((segment) => (
              <div key={segment.id} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-xs text-muted-foreground">{segment.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Segments Bar Chart */}
        <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
          <h4 className="text-sm font-medium text-foreground mb-4">Amount at Risk by Segment</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.riskSegments} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  width={80}
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as FraudRiskSegment;
                      return (
                        <div className="bg-popover/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
                          <p className="font-medium text-sm">{data.name}</p>
                          <p className="text-xs text-muted-foreground">At Risk: {formatCurrency(data.amountAtRisk)}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="amountAtRisk" 
                  radius={[0, 4, 4, 0]}
                  fill="hsl(var(--destructive))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Segments Table */}
      <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-4">Risk Segment Details</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 text-xs font-medium text-muted-foreground">Segment</th>
                <th className="text-right py-2 text-xs font-medium text-muted-foreground">Customers</th>
                <th className="text-right py-2 text-xs font-medium text-muted-foreground">Risk Score</th>
                <th className="text-right py-2 text-xs font-medium text-muted-foreground">Amount at Risk</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody>
              {data.riskSegments.map((segment) => (
                <tr key={segment.id} className="border-b border-border/30 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: segment.color }} />
                      <span className="font-medium text-foreground">{segment.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 text-muted-foreground">{segment.count.toLocaleString()}</td>
                  <td className="text-right py-3">
                    <span className={`font-medium ${segment.riskScore >= 70 ? 'text-destructive' : segment.riskScore >= 40 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {segment.riskScore}
                    </span>
                  </td>
                  <td className="text-right py-3 font-medium text-foreground">{formatCurrency(segment.amountAtRisk)}</td>
                  <td className="py-3">
                    <div className="flex justify-center">
                      {getTrendIcon(segment.trend)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="p-4 rounded-xl bg-secondary/20 border border-border/50">
        <h4 className="text-sm font-medium text-foreground mb-4">Recent Fraud Alerts</h4>
        <div className="space-y-3">
          {data.recentAlerts.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {alert.affectedCustomers.toLocaleString()} customers affected • {alert.detectedAt}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${getAlertColor(alert.type)}`}>
                  {alert.type.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium text-foreground">AI Recommendations</h4>
        </div>
        <ul className="space-y-2">
          {data.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">→</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground text-center">
        Last updated: {data.lastUpdated} • Model accuracy: {data.modelAccuracy}%
      </p>
    </div>
  );
};
