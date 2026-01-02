import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown, Target, RefreshCw, Lightbulb, Users } from "lucide-react";
import { CLVData } from "@/types/predictions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CLVPredictionCardProps {
  data: CLVData;
}

export const CLVPredictionCard = ({ data }: CLVPredictionCardProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value.toLocaleString()}`;
  };

  const chartData = data.tiers.map(tier => ({
    tier: tier.tier,
    current: tier.currentCLV,
    predicted: tier.predictedCLV,
    change: tier.change
  }));

  const tierColors: Record<string, string> = {
    "Platinum": "hsl(262, 83%, 58%)",
    "Gold": "hsl(45, 93%, 47%)",
    "Silver": "hsl(210, 14%, 53%)",
    "Bronze": "hsl(30, 41%, 48%)"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100">
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-lg">CLV Predictions</CardTitle>
            <p className="text-sm text-muted-foreground">12-month customer lifetime value forecast</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1" />
            {data.modelAccuracy}%
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />
            {data.lastUpdated}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border bg-muted/30">
            <div className="text-xs text-muted-foreground mb-1">Total Predicted Revenue</div>
            <div className="text-xl font-bold">{formatCurrency(data.totalPredictedRevenue)}</div>
          </div>
          <div className="p-3 rounded-lg border bg-red-50/50">
            <div className="text-xs text-red-600 mb-1">Revenue at Risk</div>
            <div className="text-xl font-bold text-red-700">{formatCurrency(data.revenueAtRisk)}</div>
          </div>
        </div>

        {/* CLV by Tier Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis type="category" dataKey="tier" tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }} width={70} />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="current" name="Current CLV" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} />
              <Bar dataKey="predicted" name="Predicted CLV" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={tierColors[entry.tier] || "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Details */}
        <div className="space-y-3">
          {data.tiers.map((tier) => (
            <div key={tier.tier} className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: tierColors[tier.tier] }}
                />
                <div>
                  <span className="font-medium">{tier.tier}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    {tier.customerCount.toLocaleString()} customers
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  {tier.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${tier.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tier.change >= 0 ? '+' : ''}{tier.change}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(tier.currentCLV)} → {formatCurrency(tier.predictedCLV)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="p-4 rounded-xl border bg-amber-50/30">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-sm">AI Recommendations</span>
          </div>
          <ul className="space-y-1">
            {data.recommendations.slice(0, 2).map((rec, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-amber-500">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
