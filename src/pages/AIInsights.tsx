import { TrendingDown, TrendingUp, AlertTriangle, Sparkles, Star, ShoppingCart, Users, Activity, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { AIInsightCard } from "@/components/AIInsightCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartEmptyState } from "@/components/ui/chart-empty-state";

const insightFeed = [
  {
    id: 1,
    type: "critical",
    title: "Revenue dropped 6% yesterday vs last week",
    description: "Primary cause: 12% decrease in store footfall in Tier 2 cities. Category analysis shows saree and ethnic wear segments most affected.",
    module: "Atlas Prime",
    modulePath: "/module/atlas-prime",
    timestamp: "2 hours ago",
    metrics: { current: "₹11.68L", previous: "₹12.4L", change: "-6%" },
    recommendation: "Consider targeted promotional campaigns for Tier 2 stores focusing on saree collection.",
  },
  {
    id: 2,
    type: "positive",
    title: "Footfall spike in Tier 2 stores by 12%",
    description: "Weekend promotional campaign drove 340 additional store visits. Conversion rate improved from 3.2% to 3.8% in targeted locations.",
    module: "Behavioural Analytics",
    modulePath: "/module/behavioural-analytics",
    timestamp: "5 hours ago",
    metrics: { current: "2,847", previous: "2,540", change: "+12%" },
    recommendation: "Extend successful campaign tactics to Tier 1 cities.",
  },
  {
    id: 3,
    type: "warning",
    title: "Fraud attempts increased by 18% this week",
    description: "Pattern detected: Multiple high-value transactions from new accounts in specific pin codes. Risk clustering in payment gateway bypass attempts.",
    module: "Fraud",
    modulePath: "/module/fraud",
    timestamp: "1 day ago",
    metrics: { current: "43 cases", previous: "36 cases", change: "+18%" },
    recommendation: "Enable enhanced verification for transactions above ₹5,000 from new customers.",
  },
  {
    id: 4,
    type: "positive",
    title: "Saree category ratings improved to 4.3⭐",
    description: "Customer sentiment analysis shows 78% positive mentions for new collection. Top keywords: 'quality', 'authentic designs', 'value for money'.",
    module: "Clickrev",
    modulePath: "/module/clickrev",
    timestamp: "1 day ago",
    metrics: { current: "4.3⭐", previous: "4.0⭐", change: "+0.3" },
    recommendation: "Feature saree collection prominently in marketing materials.",
  },
  {
    id: 5,
    type: "warning",
    title: "App funnel drop-off rose at payment screen",
    description: "Checkout abandonment increased from 22% to 31%. Exit rate highest on mobile devices during payment method selection.",
    module: "Behavioural Analytics",
    modulePath: "/module/behavioural-analytics",
    timestamp: "2 days ago",
    metrics: { current: "31%", previous: "22%", change: "+9%" },
    recommendation: "Review payment gateway UX and add one-click payment options.",
  },
  {
    id: 6,
    type: "info",
    title: "Customer segment 'Premium Shoppers' grew by 8%",
    description: "Loyalty program members making 3+ purchases per month increased. Average order value in this segment: ₹8,400 (up 14%).",
    module: "Segcon",
    modulePath: "/module/segcon",
    timestamp: "2 days ago",
    metrics: { current: "1,247", previous: "1,154", change: "+8%" },
    recommendation: "Create exclusive early-access campaigns for this segment.",
  },
];

const AIInsights = () => {
  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Insight Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time intelligence across all your modules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Updated 5 min ago
          </Badge>
        </div>
      </div>

      {/* KPI Monitor */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30 bg-gradient-to-br from-red-500/10 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Critical</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Important</p>
                <p className="text-2xl font-bold text-foreground">4</p>
              </div>
              <TrendingDown className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground">Needs monitoring</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/10 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Positive</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground">Performing well</p>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-background">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Insights</p>
                <p className="text-2xl font-bold text-foreground">11</p>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Insight Feed (Timeline) */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Insight Feed</h2>
        {insightFeed.length === 0 ? (
          <ChartEmptyState variant="general" title="No insights yet" description="AI-generated insights will appear here as they are detected" className="min-h-[200px]" />
        ) : (
        <div className="space-y-3">
          {insightFeed.map((insight) => {
            const typeColors = {
              critical: "border-l-red-500 bg-red-500/5",
              warning: "border-l-orange-500 bg-orange-500/5",
              positive: "border-l-green-500 bg-green-500/5",
              info: "border-l-blue-500 bg-blue-500/5",
            };

            const typeIcons = {
              critical: <AlertTriangle className="h-4 w-4 text-red-500" />,
              warning: <TrendingDown className="h-4 w-4 text-orange-500" />,
              positive: <TrendingUp className="h-4 w-4 text-green-500" />,
              info: <Activity className="h-4 w-4 text-blue-500" />,
            };

            return (
              <Card
                key={insight.id}
                className={`border-l-4 ${typeColors[insight.type]} hover:shadow-md transition-all group`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{typeIcons[insight.type]}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-base text-foreground mb-1">
                            {insight.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {insight.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground pl-7">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {insight.timestamp}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {insight.module}
                        </Badge>
                      </div>

                      {insight.recommendation && (
                        <div className="pl-7 mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                          <p className="text-xs text-foreground">
                            <span className="font-semibold text-primary">Recommended Action:</span>{" "}
                            {insight.recommendation}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="text-lg font-bold text-foreground">{insight.metrics.current}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {insight.metrics.change.startsWith("+") ? (
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-red-600" />
                          )}
                          <span
                            className={`text-xs font-semibold ${
                              insight.metrics.change.startsWith("+") ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {insight.metrics.change}
                          </span>
                        </div>
                      </div>
                      <AIInsightCard
                        title=""
                        description=""
                        trend="stable"
                        modulePath={insight.modulePath}
                        compact
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        )}
      </div>
    </main>
  );
};

export default AIInsights;
