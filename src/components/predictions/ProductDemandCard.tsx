import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, TrendingDown, Minus, Calendar, Star, RefreshCw, Lightbulb } from "lucide-react";
import { ProductDemandData } from "@/types/predictions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ProductDemandCardProps {
  data: ProductDemandData;
}

export const ProductDemandCard = ({ data }: ProductDemandCardProps) => {
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-slate-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 10) return "hsl(142, 76%, 36%)";
    if (change < -5) return "hsl(0, 84%, 60%)";
    return "hsl(var(--primary))";
  };

  const chartData = data.products.map(p => ({
    name: p.category.split(" ")[0],
    current: p.currentDemand,
    predicted: p.predictedDemand,
    change: p.change
  }));

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100">
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Product Demand Forecast</h2>
            <p className="text-sm text-muted-foreground">Category-wise redemption predictions</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          {data.lastUpdated}
        </Badge>
      </div>
      <div className="space-y-6">
        {/* Demand Chart */}
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                formatter={(value: number) => value.toLocaleString()}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="predicted" name="Predicted" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getTrendColor(entry.change)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Details */}
        <div className="space-y-2">
          {data.products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-muted/10">
              <div className="flex items-center gap-2">
                {getTrendIcon(product.trend)}
                <span className="text-sm font-medium">{product.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${
                  product.change > 0 ? 'text-emerald-600' : product.change < 0 ? 'text-red-600' : 'text-muted-foreground'
                }`}>
                  {product.change > 0 ? '+' : ''}{product.change}%
                </span>
                <Badge variant="outline" className="text-xs">{product.confidence}% conf</Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Products */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" />
            Top Trending Rewards
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.trendingProducts.slice(0, 4).map((product, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {product.name}
                <span className="ml-1 text-primary">{product.demandScore}</span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Seasonal Events */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            Upcoming Impact Events
          </h4>
          <div className="space-y-2">
            {data.seasonalEvents.slice(0, 2).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-blue-50/30">
                <div>
                  <span className="text-sm font-medium">{event.event}</span>
                  <span className="text-xs text-muted-foreground ml-2">{event.date}</span>
                </div>
                <span className="text-xs text-blue-600">{event.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-3 rounded-lg border bg-amber-50/30">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium">Top Recommendation</span>
          </div>
          <p className="text-sm text-muted-foreground">{data.recommendations[0]}</p>
        </div>
      </div>
    </section>
  );
};
