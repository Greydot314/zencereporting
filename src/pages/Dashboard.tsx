import { Settings, FileText, TrendingUp, Shield, Lightbulb, Bell, UserCheck, Users, ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, Clock, Zap, TrendingDown, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const modules = [
  {
    name: "Atlas Prime",
    path: "/module/atlas-prime",
    icon: Settings,
    badge: "PRIME",
    status: "active",
    kpi: { label: "Revenue", value: "₹12.4L", trend: "+8.2%", positive: true },
  },
  {
    name: "Atlas Neo",
    path: "/module/atlas-neo",
    icon: Settings,
    badge: "NEO",
    status: "coming",
    kpi: { label: "Soon", value: "Q2 2024", trend: "", positive: true },
  },
  {
    name: "Clickrev",
    path: "/module/clickrev",
    icon: FileText,
    status: "active",
    kpi: { label: "Rating", value: "4.2⭐", trend: "+0.3", positive: true },
  },
  {
    name: "Segcon",
    path: "/module/segcon",
    icon: TrendingUp,
    status: "active",
    kpi: { label: "Segments", value: "24", trend: "+3", positive: true },
  },
  {
    name: "KPI Alerts",
    path: "/module/kpi-alerts",
    icon: Bell,
    status: "active",
    kpi: { label: "Alerts", value: "7", trend: "+2", positive: false },
  },
  {
    name: "Behavioural",
    path: "/module/behavioural-analytics",
    icon: UserCheck,
    status: "active",
    kpi: { label: "Conversion", value: "3.4%", trend: "-0.2%", positive: false },
  },
  {
    name: "Insights",
    path: "/module/insights",
    icon: Lightbulb,
    status: "active",
    kpi: { label: "New", value: "12", trend: "+5", positive: true },
  },
  {
    name: "Fraud",
    path: "/module/fraud",
    icon: Shield,
    status: "active",
    kpi: { label: "Risk Score", value: "High", trend: "+14%", positive: false },
  },
  {
    name: "Loyalty",
    path: "/module/loyalty-extension",
    icon: Users,
    status: "coming",
    kpi: { label: "Soon", value: "Q3 2024", trend: "", positive: true },
  },
];

const recentAlerts = [
  { id: 1, title: "Revenue dropped 6% vs last week", severity: "high", time: "2h ago", module: "Atlas Prime" },
  { id: 2, title: "Fraud attempts increased by 18%", severity: "high", time: "5h ago", module: "Fraud" },
  { id: 3, title: "Payment funnel drop-off at 31%", severity: "medium", time: "1d ago", module: "Behavioural" },
  { id: 4, title: "Customer segment grew by 8%", severity: "low", time: "1d ago", module: "Segcon" },
];

const Dashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 overflow-auto">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back! 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your business today</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-background border-green-500/20 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Revenue Today</p>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">₹12.4L</p>
            <p className="text-xs text-green-600 mt-1">+8.2% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-background border-blue-500/20 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Store Visits</p>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">2,847</p>
            <p className="text-xs text-red-600 mt-1">-3.1% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-background border-purple-500/20 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Conversion</p>
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">3.4%</p>
            <p className="text-xs text-muted-foreground mt-1">Stable</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-background border-orange-500/20 hover:shadow-md transition-all">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Active Alerts</p>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-foreground">7</p>
            <p className="text-xs text-orange-600 mt-1">+2 new today</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Summary Strip - Enhanced */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20 hover:shadow-lg transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20 animate-pulse">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">AI Business Pulse</h2>
              <p className="text-xs text-muted-foreground">Real-time intelligence • Last updated: Just now</p>
            </div>
          </div>
          <Link to="/ai-chat">
            <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 transition-all">
              Ask AI
              <Sparkles className="h-3 w-3" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
            <p className="text-xs text-muted-foreground mb-1">Yesterday</p>
            <p className="text-sm font-semibold text-foreground">Revenue -6.2%, Fraud +18%</p>
            <div className="mt-2 h-8">
              {/* Mini sparkline could go here */}
              <div className="flex items-end gap-1 h-full">
                {[45, 52, 48, 51, 49, 47, 44].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-primary/30 rounded-t"
                    style={{ height: `${(val / 52) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 transition-all cursor-pointer">
            <p className="text-xs text-muted-foreground mb-1">Last 7 Days</p>
            <p className="text-sm font-semibold text-foreground">Tier 2 stores -12%, Saree category -8%</p>
            <Badge variant="outline" className="mt-2 text-[10px] border-orange-500/30 text-orange-600">
              NEEDS ATTENTION
            </Badge>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-border/50 hover:border-green-500/30 transition-all cursor-pointer">
            <p className="text-xs text-muted-foreground mb-1">Business Health</p>
            <p className="text-sm font-semibold text-green-600">Good</p>
            <p className="text-xs text-muted-foreground mt-1">3 anomalies detected</p>
          </div>
        </div>

        {/* Conversational Quick Actions */}
        <div className="flex gap-2 flex-wrap">
          <p className="text-xs text-muted-foreground w-full mb-1">Quick questions:</p>
          {[
            "Why did revenue drop?",
            "Show fraud hotspots",
            "Compare this week vs last",
            "Analyze sentiment",
          ].map((question) => (
            <Link key={question} to="/ai-chat">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all"
              >
                {question}
              </Badge>
            </Link>
          ))}
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Alerts & Insights</CardTitle>
              <Link to="/ai-insights">
                <Button variant="ghost" size="sm" className="gap-2">
                  View All
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === "high"
                    ? "border-l-red-500 bg-red-500/5"
                    : alert.severity === "medium"
                    ? "border-l-orange-500 bg-orange-500/5"
                    : "border-l-blue-500 bg-blue-500/5"
                } hover:shadow-sm transition-all cursor-pointer`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          alert.severity === "high"
                            ? "border-red-500/30 text-red-600"
                            : alert.severity === "medium"
                            ? "border-orange-500/30 text-orange-600"
                            : "border-blue-500/30 text-blue-600"
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.module}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Business Health</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                    Good
                  </Badge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[78%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Customer Satisfaction</span>
                  <span className="text-xs font-semibold text-foreground">4.2⭐</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[84%]"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Fraud Risk</span>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30">
                    Medium
                  </Badge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[45%]"></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3">Top Categories</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">Premium Sarees</span>
                  <span className="font-semibold text-foreground">₹4.2L (34%)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">Designer Blouses</span>
                  <span className="font-semibold text-foreground">₹2.8L (22%)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">Traditional Wear</span>
                  <span className="font-semibold text-foreground">₹2.1L (17%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Launcher */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Quick Access</h2>
            <p className="text-xs text-muted-foreground">Jump to any analytics module</p>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {modules.map((module) => {
            const Icon = module.icon;
            const isDisabled = module.status === "coming";

            const content = (
              <Card
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-md ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:-translate-y-1 hover:border-primary/30"
                }`}
              >
                <CardContent className="p-3 space-y-2">
                  {module.badge && (
                    <Badge
                      className={`absolute top-1.5 right-1.5 text-[8px] px-1 py-0.5 ${
                        module.badge === "PRIME"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-secondary/20 text-secondary-foreground border-secondary/30"
                      }`}
                    >
                      {module.badge}
                    </Badge>
                  )}

                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-semibold text-xs text-foreground truncate">
                      {module.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            );

            return isDisabled ? (
              <div key={module.name}>{content}</div>
            ) : (
              <Link key={module.name} to={module.path}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { icon: Zap, text: "AI Insight generated for revenue trends", time: "5 min ago", color: "text-primary" },
              { icon: TrendingUp, text: "New customer segment identified", time: "23 min ago", color: "text-green-600" },
              { icon: AlertTriangle, text: "Fraud alert triggered in Zone 3", time: "1h ago", color: "text-orange-600" },
              { icon: Users, text: "847 new customers acquired today", time: "2h ago", color: "text-blue-600" },
            ].map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className={`${activity.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Dashboard;
