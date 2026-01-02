import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Calendar, Lightbulb, RefreshCw } from "lucide-react";
import { ForecastData } from "@/types/predictions";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface SalesForecastCardProps {
  data: ForecastData;
}

export const SalesForecastCard = ({ data }: SalesForecastCardProps) => {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Sales & Revenue Forecast</CardTitle>
            <p className="text-sm text-muted-foreground">30/60/90-day projections with confidence intervals</p>
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
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Forecast Period Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.predictions.map((prediction, index) => (
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
                  {prediction.confidence}% confidence
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {formatCurrency(prediction.predicted)}
              </div>
              <div className="flex items-center gap-2 text-sm">
                {prediction.growth >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={prediction.growth >= 0 ? "text-emerald-600" : "text-red-600"}>
                  {prediction.growth >= 0 ? "+" : ""}{prediction.growth}% vs last period
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Range: {formatCurrency(prediction.lowerBound)} - {formatCurrency(prediction.upperBound)}
              </div>
            </div>
          ))}
        </div>

        {/* Daily Forecast Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.dailyForecast}>
              <defs>
                <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis 
                tickFormatter={(value) => formatCurrency(value)} 
                className="text-xs" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
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
                dataKey="upper" 
                stroke="none"
                fill="url(#confidenceGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                fill="url(#forecastGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Drivers & Seasonality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-sm">Key Forecast Drivers</span>
            </div>
            <ul className="space-y-2">
              {data.drivers.map((driver, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  {driver}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl border bg-muted/20">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm">Seasonality Pattern</span>
            </div>
            <p className="text-sm text-muted-foreground">{data.seasonality}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
