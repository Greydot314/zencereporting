import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Calendar, Lightbulb } from "lucide-react";
import { ForecastData } from "@/types/predictions";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ForecastInsightsProps {
  data: ForecastData;
  query: string;
}

export const ForecastInsights = ({ data, query }: ForecastInsightsProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Sales & Revenue Forecast</h3>
          <p className="text-sm text-muted-foreground">Analyzing: "{query}"</p>
        </div>
        <Badge variant="outline" className="ml-auto text-xs">
          <Target className="h-3 w-3 mr-1" />
          {data.modelAccuracy}% Accuracy
        </Badge>
      </div>

      {/* Forecast Period Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.predictions.map((prediction) => (
          <div 
            key={prediction.period}
            className="p-4 rounded-xl border bg-gradient-to-br from-background to-muted/30"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">{prediction.period}</span>
              <Badge 
                variant={prediction.confidence >= 80 ? "default" : "secondary"}
                className="text-xs"
              >
                {prediction.confidence}% conf
              </Badge>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {formatCurrency(prediction.predicted)}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-600">+{prediction.growth}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.dailyForecast}>
            <defs>
              <linearGradient id="chatForecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), "Revenue"]}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              fill="url(#chatForecastGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-sm">Key Drivers</span>
          </div>
          <ul className="space-y-1">
            {data.drivers.slice(0, 3).map((driver, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {driver}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl border bg-muted/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-sm">Seasonality</span>
          </div>
          <p className="text-sm text-muted-foreground">{data.seasonality}</p>
        </div>
      </div>
    </div>
  );
};
